export interface RequestInit {
	method?: string;
	headers?: HeadersInit;
	body?: string;
	timeout?: number;
	redirect?: 'follow' | 'error';
}

export type HeadersInit =
	| Record<string, string>
	| Array<[string, string]>
	| Headers;

export class Headers {
	private readonly values = new Map<string, string[]>();

	constructor(init?: HeadersInit) {
		if (!init) return;

		if (init instanceof Headers) {
			init.forEach((value, name) => this.append(name, value));
			return;
		}

		if (Array.isArray(init)) {
			for (const [name, value] of init) {
				this.append(name, value);
			}
			return;
		}

		for (const [name, value] of Object.entries(init)) {
			this.append(name, value);
		}
	}

	append(name: string, value: string): void {
		const key = name.toLowerCase();
		const existing = this.values.get(key) ?? [];
		existing.push(String(value));
		this.values.set(key, existing);
	}

	set(name: string, value: string): void {
		this.values.set(name.toLowerCase(), [String(value)]);
	}

	get(name: string): string | null {
		const values = this.values.get(name.toLowerCase());
		return values?.join(', ') ?? null;
	}

	has(name: string): boolean {
		return this.values.has(name.toLowerCase());
	}

	delete(name: string): void {
		this.values.delete(name.toLowerCase());
	}

	forEach(
		callback: (value: string, name: string, headers: Headers) => void
	): void {
		for (const [name, values] of this.values) {
			callback(values.join(', '), name, this);
		}
	}

	entries(): Array<[string, string]> {
		return Array.from(this.values.entries()).map(([name, values]) => [
			name,
			values.join(', '),
		]);
	}
}

export class Response {
	readonly ok: boolean;
	readonly headers: Headers;

	constructor(
		private readonly bodyText: string,
		readonly status: number,
		readonly statusText: string,
		headers?: Headers
	) {
		this.ok = status >= 200 && status < 300;
		this.headers = headers ?? new Headers();
	}

	async text(): Promise<string> {
		return this.bodyText;
	}

	async json<T = unknown>(): Promise<T> {
		return JSON.parse(this.bodyText) as T;
	}
}

// @ts-ignore
const HttpClient = java.net.http.HttpClient;
// @ts-ignore
const HttpRequest = java.net.http.HttpRequest;
// @ts-ignore
const HttpResponse = java.net.http.HttpResponse;
// @ts-ignore
const Duration = java.time.Duration;
// @ts-ignore
const URI = java.net.URI;

const sharedHttpClient = HttpClient.newBuilder()
	.connectTimeout(Duration.ofSeconds(10))
	.followRedirects(HttpClient.Redirect.NORMAL)
	.build();

export function fetch(
	input: string,
	init: RequestInit = {}
): Promise<Response> {
	return new Promise((resolve, reject) => {
		try {
			const method = (init.method ?? 'GET').toUpperCase();
			const headers = new Headers(init.headers);

			const request = HttpRequest.newBuilder()
				.uri(URI.create(input))
				.timeout(Duration.ofMillis(init.timeout ?? 30_000));

			headers.forEach((value, name) => {
				request.header(name, value);
			});

			const bodyPublisher =
				init.body === undefined
					? HttpRequest.BodyPublishers.noBody()
					: HttpRequest.BodyPublishers.ofString(init.body);

			request.method(method, bodyPublisher);

			sharedHttpClient
				.sendAsync(
					request.build(),
					HttpResponse.BodyHandlers.ofString()
				)
				.thenApply(
					__main_thread<any, any>((javaResponse) => {
						try {
							const responseHeaders = new Headers();
							const headerMap = javaResponse.headers().map();

							const iterator = headerMap.entrySet().iterator();

							while (iterator.hasNext()) {
								const entry = iterator.next();
								const name = String(entry.getKey());
								const values = entry.getValue().iterator();

								while (values.hasNext()) {
									responseHeaders.append(
										name,
										String(values.next())
									);
								}
							}

							resolve(
								new Response(
									String(javaResponse.body()),
									javaResponse.statusCode(),
									statusText(javaResponse.statusCode()),
									responseHeaders
								)
							);
						} catch (error) {
							reject(error);
						}

						// thenApply expects a return value.
						return null;
					})
				)
				.exceptionally(
					__main_thread((error) => {
						reject(normalizeJavaError(error));
						return null;
					})
				);
		} catch (error) {
			// Handles synchronous errors such as an invalid URI.
			reject(error);
		}
	});
}

function normalizeJavaError(error: unknown): Error {
	if (error instanceof Error) return error;

	try {
		const cause = (error as any)?.getCause?.();
		const message =
			cause?.getMessage?.() ??
			(error as any)?.getMessage?.() ??
			String(error);

		return new Error(String(message));
	} catch {
		return new Error(String(error));
	}
}

function statusText(status: number): string {
	const values: Record<number, string> = {
		200: 'OK',
		201: 'Created',
		202: 'Accepted',
		204: 'No Content',
		301: 'Moved Permanently',
		302: 'Found',
		304: 'Not Modified',
		400: 'Bad Request',
		401: 'Unauthorized',
		403: 'Forbidden',
		404: 'Not Found',
		409: 'Conflict',
		429: 'Too Many Requests',
		500: 'Internal Server Error',
		502: 'Bad Gateway',
		503: 'Service Unavailable',
	};

	return values[status] ?? '';
}

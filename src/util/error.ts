export function normalizeJavaError(error: unknown): Error {
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

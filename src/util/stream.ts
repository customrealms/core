export function streamEvents<T, H>(
	register: (callback: (event: T) => void) => H | null,
	unregister: (handle: H) => void
): AsyncIterable<T> {
	return {
		[Symbol.asyncIterator]: () => {
			const queue: T[] = [];
			const waiting: ((r: IteratorResult<T>) => void)[] = [];

			let handle = register((event) => {
				if (waiting.length > 0) {
					waiting.shift()?.({
						value: event,
						done: false,
					});
				} else {
					queue.push(event);
				}
			});

			const cleanup = () => {
				if (handle !== null) {
					unregister(handle);
				}
				handle = null;

				while (waiting.length > 0) {
					waiting.shift()?.({
						value: undefined as never,
						done: true,
					});
				}
			};

			return {
				next: async (): Promise<IteratorResult<T>> => {
					if (handle === null) {
						return {
							value: undefined as never,
							done: true,
						};
					}

					if (queue.length > 0) {
						return {
							value: queue.shift()!,
							done: false,
						};
					}

					return new Promise((resolve) => {
						waiting.push(resolve);
					});
				},

				return: async (): Promise<IteratorResult<T>> => {
					cleanup();

					return {
						value: undefined,
						done: true,
					};
				},

				throw: (error: any): never => {
					cleanup();
					throw error;
				},

				[Symbol.asyncIterator]() {
					return this;
				},
			};
		},
	};
}

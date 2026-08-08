export class Iter<T> implements Iterable<T> {
	public static of<T>(iterable: Iterable<T>): Iter<T> {
		return new Iter(iterable);
	}

	public constructor(protected readonly iterable: Iterable<T>) {}

	public *[Symbol.iterator](): IterableIterator<T> {
		yield* this.iterable;
	}

	public filter(predicate: (item: T) => boolean): Iter<T> {
		const iterable = this.iterable;

		return new Iter({
			*[Symbol.iterator]() {
				for (const item of iterable) {
					if (predicate(item)) {
						yield item;
					}
				}
			},
		});
	}

	public map<U>(mapper: (item: T) => U): Iter<U> {
		const iterable = this.iterable;

		return new Iter({
			*[Symbol.iterator]() {
				for (const item of iterable) {
					yield mapper(item);
				}
			},
		});
	}

	public reduce<U>(reducer: (acc: U, item: T) => U, initialValue: U): U {
		let acc = initialValue;

		for (const item of this) {
			acc = reducer(acc, item);
		}

		return acc;
	}

	public forEach(callback: (item: T) => void): void {
		for (const item of this) {
			callback(item);
		}
	}

	public some(predicate: (item: T) => boolean): boolean {
		for (const item of this) {
			if (predicate(item)) return true;
		}
		return false;
	}
}

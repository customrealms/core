export {};

declare global {
    namespace java {
        namespace lang {
            interface Class<T = any> {}
            interface Iterable<T = any> {}
            interface Throwable {}
            interface Runnable {}
            interface Thread {}

            interface Iterable<T = any> {
                forEach(callback: (value: T) => void): void;
                iterator(): java.util.Iterator<T>;
            }
        }
        namespace util {
            interface Collection<T = any> extends java.lang.Iterable<T> {
                add(value: T): boolean;
                addAll(collection: java.util.Collection<T>): boolean;
                clear(): void;
                contains(value: T): boolean;
                containsAll(collection: java.util.Collection<T>): boolean;
                isEmpty(): boolean;
                remove(value: T): boolean;
                removeAll(collection: java.util.Collection<T>): boolean;
                removeIf(predicate: (value: T) => boolean): boolean;
                retainAll(collection: java.util.Collection<T>): boolean;
                size(): number;
            }

            interface List<T = any> extends java.util.Collection<T> {
                get(index: number): T;
                indexOf(value: T): number;
                lastIndexOf(value: T): number;
                subList(fromIndex: number, toIndex: number): java.util.List<T>;
                set(index: number, value: T): T;
            }

            interface ArrayList<T = any> extends List<T> {}

            interface Map<K = any, V = any> {
                clear(): void;
                containsKey(key: K): boolean;
                containsValue(value: V): boolean;
                forEach(callback: (key: K, value: V) => void): void;
                get(key: K): V | null;
                isEmpty(): boolean;
                keySet(): java.util.Set<K>;
                put(key: K, value: V): V | null;
                putAll(map: java.util.Map<K, V>): void;
                remove(key: K): V | null;
                size(): number;
                values(): java.util.Collection<V>;
            }

            interface HashMap<K = any, V = any> extends Map<K, V> {}

            interface Iterator<T = any> {
                forEachRemaining(callback: (value: T) => void): void;
                hasNext(): boolean;
                next(): T;
                remove(): void;
            }

            interface ListIterator<T = any> extends Iterator<T> {
                add(value: T): void;
                hasPrevious(): boolean;
                nextIndex(): number;
                previous(): T;
                previousIndex(): number;
                set(value: T): void;
            }

            interface Set<T = any> extends Collection<T> {}

            namespace UUID {
                function fromString(name: string): java.util.UUID;
                function randomUUID(): java.util.UUID;
            }
            interface UUID {
                clockSequence(): number;
                compareTo(uuid: java.util.UUID): number;
                equals(uuid: any): boolean;
                getLeastSignificantBits(): number;
                getMostSignificantBits(): number;
                node(): number;
                timestamp(): number;
                variant(): number;
                version(): number;
                toString(): string;
            }

            interface Date {}
            interface TimeZone {}
            interface Random {}

            namespace logging {
                interface Logger {}
                interface LogRecord {}
            }

            namespace concurrent {
                interface TimeUnit {}
                interface CompletableFuture<T = any> {}
                interface Callable<T = any> {}
                interface Future<T = any> {}
            }

            namespace stream {
                interface Stream<T = any> {}
            }
        }
    }
}

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

            interface Enum<T = any> {
                compareTo(other: T): number;
                equals(other: any): boolean;
                getDeclaringClass(): java.lang.Class<T>;
                name(): string;
                ordinal(): number;
                toString(): string;
            }
        }
        namespace util {
            class Scanner {
                constructor(source: io.File);
                constructor(source: io.File, charsetName: string);
                constructor(source: string);
            
                close(): void;
                findInLine(pattern: string): string | null;
                findWithinHorizon(pattern: string, horizon: number): string | null;
                hasNext(): boolean;
                hasNext(pattern: string): boolean;
                hasNextBigDecimal(): boolean;
                hasNextBigInteger(): boolean;
                hasNextBigInteger(radix: number): boolean;
                hasNextBoolean(): boolean;
                hasNextByte(): boolean;
                hasNextByte(radix: number): boolean;
                hasNextDouble(): boolean;
                hasNextFloat(): boolean;
                hasNextInt(): boolean;
                hasNextInt(radix: number): boolean;
                hasNextLine(): boolean;
                hasNextLong(): boolean;
                hasNextLong(radix: number): boolean;
                hasNextShort(): boolean;
                hasNextShort(radix: number): boolean;
                next(): string;
                next(pattern: string): string;
                nextBigInteger(): BigInteger;
                nextBigInteger(radix: number): BigInteger;
                nextBoolean(): boolean;
                nextDouble(): number;
                nextFloat(): number;
                nextInt(): number;
                nextInt(radix: number): number;
                nextLine(): string;
                nextLong(): number;
                nextLong(radix: number): number;
                nextShort(): number;
                nextShort(radix: number): number;
                radix(): number;
                remove(): void;
                reset(): Scanner;
                skip(pattern: string): Scanner;
                toString(): string;
                useDelimiter(pattern: string): Scanner;
                useRadix(radix: number): Scanner;
            }

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

            interface EnumSet<T = any> extends Set<T> {}

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

            namespace regex {
                interface Pattern {}
            }
        }
        namespace io {
            class File {
                constructor(parent: File, child: string);
                constructor(pathName: string);
                constructor(parent: string, child: string);
                
                canExecute(): boolean;
                canRead(): boolean;
                canWrite(): boolean;
                compareTo(pathname: File): number;
                createNewFile(): boolean;
                static createTempFile(prefix: string, suffix: string): File;
                static createTempFile(prefix: string, suffix: string, directory: File): File;
                delete(): boolean;
                deleteOnExit(): void;
                exists(): boolean;
                getAbsoluteFile(): File;
                getAbsolutePath(): string;
                getCanonicalFile(): File;
                getCanonicalPath(): string;
                getFreeSpace(): number;
                getName(): string;
                getParent(): string | null;
                getParentFile(): File | null;
                getPath(): string;
                getTotalSpace(): number;
                getUsableSpace(): number;
                hashCode(): number;
                isAbsolute(): boolean;
                isDirectory(): boolean;
                isFile(): boolean;
                isHidden(): boolean;
                lastModified(): number;
                length(): number;
                list(): string[] | null;
                listFiles(): File[] | null;
                static listRoots(): File[];
                mkdir(): boolean;
                mkdirs(): boolean;
                renameTo(dest: File): boolean;
                setExecutable(executable: boolean): boolean;
                setExecutable(executable: boolean, ownerOnly: boolean): boolean;
                setLastModified(time: number): boolean;
                setReadable(readable: boolean): boolean;
                setReadable(readable: boolean, ownerOnly: boolean): boolean;
                setReadOnly(): boolean;
                setWritable(writable: boolean): boolean;
                setWritable(writable: boolean, ownerOnly: boolean): boolean;
                toString(): string;
            }

            class FileWriter {
                constructor(file: File);
                constructor(file: File, append: boolean);
                constructor(fileName: string);
                constructor(fileName: string, append: boolean);

                close(): void;
                flush(): void;
                getEncoding(): string | null;
                write(c: number): void;
                write(str: string, off?: number, len?: number): void;
            }

            class FileReader {
                constructor(file: File);
                constructor(fileName: string);

                close(): void;
                getEncoding(): string;
                read(c: number): number;
                read(cbuf: Uint8Array, off: number, len: number): number;
                ready(): boolean;
            }
        }
    }
}

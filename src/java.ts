export {};

declare global {
    namespace java {
        namespace lang {
            interface Class<T = any> {}
            interface Iterable<T = any> {}
            interface Throwable {}
            interface Runnable {}
            interface Thread {}
        }
        namespace util {
            interface List<T = any> {}
            interface ArrayList<T = any> {}
            interface Map<K = any, V = any> {}
            interface HashMap<K = any, V = any> {}
            interface Collection<T = any> {}
            interface Iterator<T = any> {}
            interface ListIterator<T = any> {}
            interface Set<T = any> {}
            interface UUID {}
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

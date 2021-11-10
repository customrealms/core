export interface ToJava<T = Java.Value> {

    /**
     * Gets the Java binding  backing the object
     */
    toJava(): T;

}

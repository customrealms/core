export interface ToJava<T = any> {

    /**
     * Gets the Java binding  backing the object
     */
    toJava(): T;

}

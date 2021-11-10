import { Constructor } from './Constructor';

/**
 * Class decorator factory that allows the class' dependencies to be injected
 * at runtime.
 * @return {Function} The class decorator
 */
export declare function Service<T = any>(): (target: Constructor<T>) => void;

import { Constructor } from './Constructor';

export type InjectionToken<T = any> = Constructor<T> | string | symbol;

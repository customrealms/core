import { InjectionToken } from './InjectionToken';

/**
 * Parameter decorator factory that allows for interface information to be stored in the constructor's metadata
 * @return {Function} The parameter decorator
 */
export declare function Inject(token: InjectionToken<any>): (target: any, propertyKey: string | symbol, parameterIndex: number) => any;

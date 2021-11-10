import { Constructor } from "./Constructor";
import { InjectionToken } from "./InjectionToken";

/**
 * Acceptable types for providers injected to plugins
 */
export type Provider =
    Constructor<any> |
    {provide: InjectionToken; useValue: any;} |
    {provide: InjectionToken; useClass: any;};

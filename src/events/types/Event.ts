import { ToJava } from "../../runtime/ToJava";

export class Event implements ToJava {

    public constructor(
        protected _event: any) {}

    public toJava(): any {
        return this._event;
    }

}

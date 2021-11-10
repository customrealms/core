import { ToJava } from "../../runtime/ToJava";

export class Event implements ToJava {

    public constructor(
        protected _event: Java.Value,
    ) {}

    public toJava(): Java.Value {
        return this._event;
    }

}

import { Extends } from "../../runtime/Extends";
import { ToJava } from "../../runtime/ToJava";
import { Animals } from "./Animals";

export interface Cow extends Animals {}

@Extends(Animals)
export class Cow implements ToJava {

    private constructor(
        private _cow: Java.Value,
    ) {}

    public toJava(): Java.Value {
        return this._cow;
    }

}

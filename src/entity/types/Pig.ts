import { Extends } from "../../runtime/Extends";
import { ToJava } from "../../runtime/ToJava";
import { Animals } from "./Animals";

export interface Pig extends Animals {}

@Extends(Animals)
export class Pig implements ToJava {

    private constructor(
        private _pig: Java.Value,
    ) {}

    public toJava(): Java.Value {
        return this._pig;
    }

}

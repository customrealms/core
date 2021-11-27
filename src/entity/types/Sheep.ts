import { Extends } from "../../runtime/Extends";
import { Animals } from './Animals';
import { Colorable } from "./Colorable";

export interface Sheep extends Animals, Colorable {}

@Extends(Animals, Colorable)
export class Sheep {

    private constructor(
        private _sheep: Java.Value,
    ) {}

    public toJava(): Java.Value {
        return this._sheep;
    }

    /**
     * Whether the sheep is sheared
     */
    public isSheared(): boolean {
        return this.toJava().isSheared();
    }

    /**
     * Sets whether or not the sheep is sheared
     * @param flag whether to shear the sheep
     */
    public setSheared(flag: boolean): void {
        this.toJava().setSheared(flag);
    }

}

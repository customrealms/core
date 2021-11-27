import { Sittable } from "./Sittable";
import { Extends } from "../../runtime/Extends";
import { Animals } from './Animals';
import { Colorable } from "./Colorable";
import { Tameable } from "./Tameable";

export interface Wolf extends Tameable, Sittable {}

@Extends(Tameable, Sittable)
export class Wolf {

    private constructor(
        private _wolf: Java.Value,
    ) {}

    public toJava(): Java.Value {
        return this._wolf;
    }

    /**
     * Checks if this wolf is angry
     */
    public isAngry(): boolean {
        return this.toJava().isAngry();
    }

    /**
     * Sets the anger of this wolf.
     * An angry wolf cannot be fed or tamed.
     * @param angry whether or not to make the wolf angry
     */
    public setAngry(angry: boolean): void {
        this.toJava().setAngry(angry);
    }

    // /**
    //  * Gets the collar color of this wolf
    //  */
    // public getCollarColor(): DyeColor | null {
    //     const javaColor = this.toJava().getCollarColor();
    //     if (!javaColor) return null;
    //     return DyeColor.fromJava(javaColor);
    // }

    // /**
    //  * Sets the collar color of this wolf
    //  * @param color the color to apply
    //  */
    // public setCollarColor(color: DyeColor): void {
    //     this.toJava().setCollarColor(color.toJava());
    // }

}

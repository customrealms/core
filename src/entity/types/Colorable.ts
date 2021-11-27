import { Extends } from "../../runtime/Extends";
import { ToJava } from "../../runtime/ToJava";

export interface Colorable extends ToJava {}

@Extends()
export class Colorable implements ToJava {

    // /**
    //  * Gets the color of this object.
    //  * This may be null to represent the default color of an object, if the object has a special default color (e.g Shulkers).
    //  */
    // public getColor(): DyeColor | null {
    //     const javaDyeColor = this.toJava().getColor();
    //     if (!javaDyeColor) return null;
    //     return DyeColor.fromJava(javaDyeColor);
    // }

    // /**
    //  * Sets the color of this object to the specified DyeColor.
    //  * This may be null to represent the default color of an object, if the object has a special default color (e.g Shulkers).
    //  * @param color the color of the object
    //  */
    // public setColor(color: DyeColor | null): void {
    //     this.toJava().setColor(color?.toJava() ?? null);
    // }

}

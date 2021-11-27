import { Extends } from "../../runtime/Extends";
import { ToJava } from "../../runtime/ToJava";
import { AbstractSkeleton } from "./AbstractSkeleton";

export interface Skeleton extends AbstractSkeleton {}

@Extends(AbstractSkeleton)
export class Skeleton implements ToJava {

    private constructor(
        private _skeleton: Java.Value,
    ) {}

    public toJava(): Java.Value {
        return this._skeleton;
    }

    /**
     * Gets the amount of ticks until this entity will be converted to a stray as a result of being frozen by a powdered snow block.
     * When this reaches 0, the entity will be converted.
     */
    public getConversionTime(): number {
        return this.toJava().getConversionTime();
    }

    /**
     * Computes whether or not this skeleton is currently in the process of converting to a Stray due to it being frozen by powdered snow.
     */
    public isConverting(): boolean {
        return this.toJava().isConverting();
    }

    /**
     * Sets the amount of ticks until this entity will be converted to a stray as a result of being frozen by a powdered snow block.
     * When this reaches 0, the entity will be converted. A value of less than 0 will stop the current conversion process without converting the current entity.
     * @param time the new conversion time left before the conversion in ticks
     */
    public setConversionTime(time: number): void {
        this.toJava().setConversionTime(time);
    }

}

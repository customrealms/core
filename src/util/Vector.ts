import "../globals";
import { ToJava } from "../runtime/ToJava";

export class Vector implements ToJava {

    /**
     * Constructs a vector from its three components
     * @param x the x-component
     * @param y the y-component
     * @param z the z-component
     */
    public constructor(
        private x: number,
        private y: number,
        private z: number,
    ) {}

    public getX(): number { return this.x; }
    public getY(): number { return this.y; }
    public getZ(): number { return this.z; }

    public toJava(): Java.Value {
        return new (Java.resolve('org.bukkit.util.Vector'))(
            this.x,
            this.y,
            this.z
        );
    }

}

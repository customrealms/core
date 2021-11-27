import { Extends } from "../../runtime/Extends";
import { ToJava } from "../../runtime/ToJava";
import { Location } from "../../util/Location";
import { Animals } from "./Animals";

export interface Bee extends Animals {}

@Extends(Animals)
export class Bee implements ToJava {

    private constructor(
        private _bee: Java.Value,
    ) {}

    public toJava(): Java.Value {
        return this._bee;
    }

    /**
     * Gets the bee's hive location
     */
    public getHive(): Location | null {
        const javaLoc = this.toJava().getHive();
        if (!javaLoc) return null;
        return Location.fromJava(javaLoc);
    }

    /**
     * Sets the bee's hive location
     * @param location the new hive location
     */
    public setHive(location: Location | null): void {
        this.toJava().setHive(location?.toJava() ?? null);
    }

    /**
     * Gets the bee's flower location
     */
     public getFlower(): Location | null {
        const javaLoc = this.toJava().getFlower();
        if (!javaLoc) return null;
        return Location.fromJava(javaLoc);
    }

    /**
     * Sets the bee's flower location
     * @param location the new flower location
     */
    public setFlower(location: Location | null): void {
        this.toJava().setFlower(location?.toJava() ?? null);
    }

    /**
     * Gets if the bee has nectar
     */
    public hasNectar(): boolean {
        return this.toJava().hasNectar();
    }

    /**
     * Sets if the bee has nectar
     * @param nectar whether the entity has nectar
     */
    public setHasNectar(nectar: boolean): void {
        this.toJava().setHasNectar(nectar);
    }

    /**
     * Checks if the bee has stung
     */
    public hasStung(): boolean {
        return this.toJava().hasStung();
    }

    /**
     * Sets if the bee has stung
     * @param stung whether or not the bee has stung
     */
    public setHasStung(stung: boolean): void {
        this.toJava().setHasStung(stung);
    }

    /**
     * Gets the bee's anger level
     */
    public getAnger(): number {
        return this.toJava().getAnger();
    }

    /**
     * Sets the bee's new anger level
     * @param anger the new anger level
     */
    public setAnger(anger: number): void {
        this.toJava().setAnger(anger);
    }

    /**
     * Gets the amount of ticks the bee cannot enter the hive for
     */
    public getCannotEnterHiveTicks(): number {
        return this.toJava().getCannotEnterHiveTicks();
    }

    /**
     * Sets the amount of ticks the bee cannot enter a hive for
     * @param ticks ticks the bee cannot enter a hive for
     */
    public setCannotEnterHiveTicks(ticks: number): void {
        this.toJava().setCannotEnterHiveTicks(ticks);
    }

}

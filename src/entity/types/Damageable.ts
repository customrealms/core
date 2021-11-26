import { Extends } from "../../runtime/Extends";
import { Entity } from "./Entity";

export interface Damageable extends Entity {}

@Extends(Entity)
export class Damageable {

    /**
     * Deals an amount of damage to this entity
     * @param amount the amount of damage to deal
     * @param source the entity to give credit for dealing the damage
     */
    public damage(amount: number, source?: Entity): void {
        if (source) this.toJava().damage(amount, source.toJava());
        else this.toJava().damage(amount);
    }

    /**
     * Gets the entity's absorption amount
     */
    public getAbsorptionAmount(): number {
        return this.toJava().getAbsorptionAmount();
    }

    /**
     * Gets the entity's health from 0 to getMaxHealth()
     */
    public getHealth(): number {
        return this.toJava().getHealth();
    }

    /**
     * Gets the entity's maximum health
     */
    public getMaxHealth(): number {
        return this.toJava().getMxHealth();
    }

    /**
     * Sets the entity's absorption amount
     * @param amount the absorption amount
     */
    public setAbsorptionAmount(amount: number): void {
        this.toJava().setAbsorptionAmount(amount);
    }

    /**
     * Sets the entity's health from 0 to getMaxHealth()
     * @param health the health amount
     */
    public setHealth(health: number): void {
        this.toJava().setHealth(health);
    }

}

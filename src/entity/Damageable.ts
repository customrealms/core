import { ApplyMixins } from "../runtime/ApplyMixins";
import { Entity } from "./Entity";

export class Damageable {

    public damage(amount: number, source?: Entity): void {
        if (source) this.toJava().damage(amount, source.toJava());
        else this.toJava().damage(amount);
    }

    public getAbsorptionAmount(): number {
        return this.toJava().getAbsorptionAmount();
    }

    public getHealth(): number {
        return this.toJava().getHealth();
    }

    public getMaxHealth(): number {
        return this.toJava().getMxHealth();
    }

    public setAbsorptionAmount(amount: number): void {
        this.toJava().setAbsorptionAmount(amount);
    }

    public setHealth(health: number): void {
        this.toJava().setHealth(health);
    }

}

export interface Damageable extends Entity {}
ApplyMixins(Damageable, [Entity]);

import { EntityDamageCause } from "../../entity/EntityDamageCause";
import { EntityEvent } from "./EntityEvent";

export class EntityDamageEvent extends EntityEvent {

    public getCause(): EntityDamageCause {
        return this.toJava().getCause().name();
    }

    public getDamage(): number {
        return this.toJava().getDamage();
    }

    public setDamage(damage: number): void {
        this.toJava().setDamage(damage);
    }

    public getFinalDamage(): number {
        return this.toJava().getFinalDamage();
    }

    public setCancelled(cancel: boolean): void {
        this.toJava().setCancelled(cancel);
    }

    public isCancelled(): boolean {
        return this.toJava().isCancelled();
    }

}

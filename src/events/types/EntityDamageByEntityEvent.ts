import { EntityDamageEvent } from "./EntityDamageEvent";
import { Entity } from "../../entity/Entity";

export class EntityDamageByEntityEvent extends EntityDamageEvent {

    public getDamager(): Entity | null {
        const javaDamager = this.toJava().getDamager();
        if (!javaDamager) return null;
        return Entity.fromJava(javaDamager);
    }

}

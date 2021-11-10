import { Block } from "../../block/Block";
import { EntityDamageEvent } from "./EntityDamageEvent";

export class EntityDamageByBlockEvent extends EntityDamageEvent {

    public static getBukkitClasspath(): string {
        return 'org.bukkit.event.entity.EntityDamageByBlockEvent';
    }

    /**
     * Gets the block that caused the damage
     */
    public getDamager(): Block {
        return Block.fromJava(this.toJava().getDamager());
    }

}

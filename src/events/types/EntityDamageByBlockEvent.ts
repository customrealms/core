import { Block } from "../../block/Block";
import { EntityDamageEvent } from "./EntityDamageEvent";

export class EntityDamageByBlockEvent extends EntityDamageEvent {

    public getDamager(): Block {
        return Block.fromJava(this.toJava().getDamager());
    }

}

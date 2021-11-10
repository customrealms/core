import { EntityType } from "../../entity/EntityType";
import { Entity } from "../../entity/Entity";
import { Event } from "./Event";

export class EntityEvent extends Event {

    public getEntity(): Entity {
        return Entity.fromJava(this.toJava().getEntity());
    }

    public getEntityType(): EntityType {
        return this.toJava().getEntityType().name();
    }

}

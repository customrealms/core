import { EntityType } from "../../../entity/EntityType";
import { Entity } from "../../../entity/Entity";
import { Event } from "../Event";

export class EntityEvent extends Event {

    /**
     * Gets the entity involved in this event
     */
    public getEntity(): Entity {
        return Entity.fromJava(this.toJava().getEntity());
    }

    /**
     * Gets the type of the entity involved in this event
     */
    public getEntityType(): EntityType {
        return this.toJava().getEntityType().name();
    }

}

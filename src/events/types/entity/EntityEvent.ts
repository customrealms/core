import { Entity } from '../../../entity/types/Entity';
import { ConstructEntity } from '../../../entity/EntityConstructors';
import { EntityType } from '../../../entity/EntityType';
import { Event } from '../Event';

export class EntityEvent extends Event {
	/**
	 * Gets the entity involved in this event
	 */
	public getEntity(): Entity {
		return ConstructEntity(this.toJava().getEntity());
	}

	/**
	 * Gets the type of the entity involved in this event
	 */
	public getEntityType(): EntityType {
		return this.toJava().getEntityType().name();
	}
}

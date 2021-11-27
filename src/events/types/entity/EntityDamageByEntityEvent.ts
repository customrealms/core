import { Entity } from '../../../entity/types/Entity'
import { ConstructEntity } from '../../../entity/EntityConstructors'
import { EntityDamageEvent } from './EntityDamageEvent'

export class EntityDamageByEntityEvent extends EntityDamageEvent {
	public static getBukkitClasspath(): string {
		return 'org.bukkit.event.entity.EntityDamageByEntityEvent'
	}

	/**
	 * Gets the entity who caused the damage
	 */
	public getDamager(): Entity | null {
		const javaDamager = this.toJava().getDamager()
		if (!javaDamager) return null
		return ConstructEntity(javaDamager)
	}
}

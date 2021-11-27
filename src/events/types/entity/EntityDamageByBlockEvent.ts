import { Block } from '../../../block/Block'
import { EntityDamageEvent } from './EntityDamageEvent'

export class EntityDamageByBlockEvent extends EntityDamageEvent {
	public static getBukkitClasspath(): string {
		return 'org.bukkit.event.entity.EntityDamageByBlockEvent'
	}

	/**
	 * Gets the block that caused the damage
	 */
	public getDamager(): Block | null {
		const javaDamager: Java.Value | null = this.toJava().getDamager()
		if (!javaDamager) return null
		return Block.fromJava(javaDamager)
	}
}

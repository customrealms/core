import { EntityEvent } from './EntityEvent';
import { Location } from '../../../util/Location';
import { Cancellable } from '../../Cancellable';

export class EntitySpawnEvent extends EntityEvent implements Cancellable {
	public static getBukkitClasspath(): string {
		return 'org.bukkit.event.entity.EntitySpawnEvent';
	}

	/**
	 * Gets the location at which the entity is spawning
	 */
	public getLocation(): Location | null {
		const javaLoc = this.toJava().getLocation();
		if (!javaLoc) return null;
		return Location.fromJava(javaLoc);
	}

	/**
	 * Gets the cancellation state of this event
	 */
	public isCancelled(): boolean {
		return this.toJava().isCancelled();
	}

	/**
	 * Sets the cancellation state of this event
	 */
	public setCancelled(cancel: boolean): void {
		this.toJava().setCancelled(cancel);
	}
}

import { ConstructEntity } from '../../../entity/EntityConstructors'
import { Entity } from '../../../entity/types/Entity'
import { ChunkEvent } from './ChunkEvent'

/**
 * Called when entities are loaded. The provided chunk may or may not be loaded.
 */
export class EntitiesLoadEvent extends ChunkEvent {
	public static getBukkitClasspath(): string {
		return 'org.bukkit.event.world.EntitiesLoadEvent'
	}

	/**
	 * Return whether this chunk will be saved to disk.
	 */
	public getEntities(): readonly Entity[] {
		const loadedEntities: Java.Value[] = this.toJava().getEntities()
		if (!loadedEntities) return Object.freeze([])

		return Object.freeze(loadedEntities.map(ConstructEntity))
	}
}

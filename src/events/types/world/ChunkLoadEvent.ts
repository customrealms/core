import { ChunkEvent } from './ChunkEvent'

/**
 * Called when a chunk is loaded
 */
export class ChunkLoadEvent extends ChunkEvent {
	public static getBukkitClasspath(): string {
		return 'org.bukkit.event.world.ChunkLoadEvent'
	}

	/**
	 * Gets if the chunk was newly created or not
	 *
	 * Note that if this chunk is new, it will not be populated at this time.
	 */
	public isNewChunk(): boolean {
		return this.toJava().isNewChunk()
	}
}

import { ChunkEvent } from './ChunkEvent';

/**
 * Thrown when a new chunk has finished being populated.
 */
export class ChunkPopulateEvent extends ChunkEvent {

  public static getBukkitClasspath(): string {
    return 'org.bukkit.event.world.ChunkPopulateEvent';
  }

}
import { Entity } from '../../../entity/Entity';
import { ChunkEvent } from './ChunkEvent';

/**
 * Called when entities are unloaded. The provided chunk may or may not be loaded.
 */
export class EntitiesUnloadEvent extends ChunkEvent {

  public static getBukkitClasspath(): string {
    return 'org.bukkit.event.world.EntitiesUnloadEvent';
  }

  /**
   * Return whether this chunk will be saved to disk.
   */
  public getEntities(): readonly Entity[] {
    const loadedEntities: Java.Value[] = this.toJava().getEntities();
    if (!loadedEntities) return Object.freeze([]);
    
    return Object.freeze(loadedEntities.map(p => Entity.fromJava(p)));
  }
}
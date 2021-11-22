import { ChunkEvent } from './ChunkEvent';

/**
 * Called when a chunk is unloaded
 */
export class ChunkUnloadEvent extends ChunkEvent {

  public static getBukkitClasspath(): string {
    return 'org.bukkit.event.world.ChunkUnloadEvent';
  }

  /**
   * Return whether this chunk will be saved to disk.
   */
  public isSaveChunk(): boolean {
    return this.toJava().isSaveChunk();
  }

  /**
   * Set whether this chunk will be saved to disk.
   * @param save true if the chunk should be saved
   */
  public setSaveChunk(save: boolean): void {
    this.toJava().setSaveChunk(save);
  }
}
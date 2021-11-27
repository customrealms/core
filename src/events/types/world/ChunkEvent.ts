import { Chunk } from '../../../chunk/Chunk';
import { WorldEvent } from './WorldEvent';

export class ChunkEvent extends WorldEvent {
	/**
	 * Gets the chunk being loaded/unloaded
	 */
	public getChunk(): Chunk {
		return Chunk.fromJava(this.toJava().getChunk());
	}
}

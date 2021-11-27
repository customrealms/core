import { Event } from '../Event';
import { Block } from '../../../block/Block';

export class BlockEvent extends Event {
	/**
	 * Gets the block involved in this event
	 */
	public getBlock(): Block {
		return Block.fromJava(this.toJava().getBlock());
	}
}

import { BlockEvent } from './BlockEvent'

export class BlockExpEvent extends BlockEvent {
	/**
	 * Gets the experience dropped by the block
	 */
	public getExpToDrop(): number {
		return this.toJava().getExpToDrop()
	}

	/**
	 * Sets the experience dropped by the block
	 * @param exp the amount of experience
	 */
	public setExpToDrop(exp: number): void {
		return this.toJava().setExpToDrop(exp)
	}
}

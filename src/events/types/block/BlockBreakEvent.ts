import { Player } from '../../../player/Player'
import { Cancellable } from '../../Cancellable'
import { BlockExpEvent } from './BlockExpEvent'

export class BlockBreakEvent extends BlockExpEvent implements Cancellable {
	public static getBukkitClasspath(): string {
		return 'org.bukkit.event.block.BlockBreakEvent'
	}

	/**
	 * Gets the player who is breaking the block
	 */
	public getPlayer(): Player {
		return Player.fromJava(this.toJava().getPlayer())
	}

	/**
	 * Gets whether or not the block will drop items
	 */
	public isDropItems(): boolean {
		return this.toJava().isDropItems()
	}

	/**
	 * Sets whether or not this block will drop items
	 * @param dropItems the drop items state of this event
	 */
	public setDropItems(dropItems: boolean): void {
		this.toJava().setDropItems(dropItems)
	}

	public isCancelled(): boolean {
		return this.toJava().isCancelled()
	}

	public setCancelled(cancel: boolean): void {
		this.toJava().setCancelled(cancel)
	}
}

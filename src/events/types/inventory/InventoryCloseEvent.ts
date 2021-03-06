import { Player } from '../../../player/Player';
import { Cancellable } from '../../Cancellable';
import { InventoryEvent } from './InventoryEvent';

/**
 * Represents a player related inventory event
 */
export class InventoryCloseEvent extends InventoryEvent implements Cancellable {
	public static getBukkitClasspath(): string {
		return 'org.bukkit.event.inventory.InventoryCloseEvent';
	}

	/**
	 * Get the player who closed the inventory
	 */
	public getPlayer(): Player {
		return Player.fromJava(this.toJava().getPlayer());
	}

	public setCancelled(cancel: boolean): void {
		this.toJava().setCancelled(cancel);
	}

	public isCancelled(): boolean {
		return this.toJava().isCancelled();
	}
}

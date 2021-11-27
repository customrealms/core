import { Player } from '../../../player/Player';
import { Cancellable } from '../../Cancellable';
import { EventResult } from '../../EventResult';
import { InventoryEvent } from './InventoryEvent';

/**
 * An abstract base class for events that describe an interaction between a HumanEntity and the contents of an Inventory.
 */
export class InventoryInteractEvent
	extends InventoryEvent
	implements Cancellable
{
	/**
	 * Gets the player who performed the click.
	 */
	public getWhoClicked(): Player {
		return Player.fromJava(this.toJava().getPlayer());
	}

	/**
	 * Gets the EventResult of this event.
	 */
	public getResult(): EventResult {
		return this.toJava().getResult().name();
	}

	/**
	 * Sets the result of this event.
	 */
	public setResult(result: EventResult): void {
		const javaEventResult = Java.resolve(
			'org.bukkit.event.Event.Result'
		).valueOf(result);
		this.toJava().setResult(javaEventResult);
	}

	/**
	 * Gets whether or not this event is cancelled.
	 */
	public isCancelled(): boolean {
		return this.toJava().isCancelled();
	}

	/**
	 * Proxy method to setResult(org.bukkit.event.Event.Result) for the Cancellable interface.
	 * @param cancelled whether or not this event is cancelled.
	 */
	public setCancelled(cancel: boolean): void {
		this.toJava().setCancelled(cancel);
	}
}

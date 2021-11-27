import { ItemStack } from '../..';
import { Inventory } from '../Inventory';

export class BeaconInventory extends Inventory {
	/**
	 * Get the item powering the beacon.
	 */
	getItem(): ItemStack | null {
		return ItemStack.fromJavaNullable(this.toJava().getItem());
	}

	/**
	 * Set the item powering the beacon.
	 * @param item The new item
	 */
	setItem(item: ItemStack | null): void {
		this.toJava().setItem(item == null ? null : item.toJava());
	}
}

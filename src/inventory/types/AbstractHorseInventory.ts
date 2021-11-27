import { ItemStack } from '../..'
import { Inventory } from '../Inventory'

export class AbstractHorseInventory extends Inventory {
	/**
	 * Gets the item in the horse's saddle slot.
	 */
	getSaddle(): ItemStack | null {
		return ItemStack.fromJavaNullable(this.toJava().getSaddle())
	}

	/**
	 * Sets the item in the horse's saddle slot.
	 * @param item the new item
	 */
	setSaddle(item: ItemStack | null): void {
		this.toJava().setSaddle(item && item.toJava())
	}
}

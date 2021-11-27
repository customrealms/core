import { ItemStack } from '../../material/ItemStack'
import { Inventory } from '../Inventory'

export class EnchantingInventory extends Inventory {
	/**
	 * Set the item being enchanted.
	 */
	setItem(item: ItemStack | null): void {
		this.toJava().setItem(item && item.toJava())
	}

	/**
	 * Get the item being enchanted.
	 */
	getItem(): ItemStack | null {
		return ItemStack.fromJavaNullable(this.toJava().getItem())
	}

	/**
	 * Set the secondary item being used for the enchant.
	 */
	setSecondary(item: ItemStack | null): void {
		this.toJava().setSecondary(item && item.toJava())
	}

	/**
	 * Get the secondary item being used for the enchant.
	 */
	getSecondary(): ItemStack | null {
		return ItemStack.fromJavaNullable(this.toJava().getSecondary())
	}
}

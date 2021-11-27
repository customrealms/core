import { ItemStack } from '../../material/ItemStack';
import { Inventory } from '../Inventory';

export class BrewerInventory extends Inventory {
	/**
	 * Get the current ingredient for brewing.
	 */
	getIngredient(): ItemStack | null {
		return ItemStack.fromJavaNullable(this.toJava().getIngredient());
	}

	/**
	 * Set the current ingredient for brewing.
	 */
	setIngredient(item: ItemStack | null): void {
		this.toJava().setIngredient(item ? item.toJava() : null);
	}

	/**
	 * Get the current fuel for brewing.
	 */
	getFuel(): ItemStack | null {
		return ItemStack.fromJavaNullable(this.toJava().getFuel());
	}

	/**
	 * Set the current fuel for brewing. Generally only Material.BLAZE_POWDER will be of use.
	 */
	setFuel(item: ItemStack | null): void {
		this.toJava().setFuel(item ? item.toJava() : null);
	}
}

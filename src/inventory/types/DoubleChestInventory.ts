import { Inventory } from '../Inventory';
import { ConstructInventory } from '../InventoryConstructors';

export class DoubleChestInventory extends Inventory {
	/**
	 * Get the left half of this double chest.
	 */
	getLeftSide(): Inventory {
		return ConstructInventory(this.toJava().getLeftSide());
	}

	/**
	 * Get the right half of this double chest.
	 */
	getRightSide(): Inventory {
		return ConstructInventory(this.toJava().getRightSide());
	}
}

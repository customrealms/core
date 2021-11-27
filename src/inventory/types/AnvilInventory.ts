import { Inventory } from '../Inventory'

export class AnvilInventory extends Inventory {
	/**
	 * Get the maximum experience cost (in levels) to be allowed by the current repair. If the result of getRepairCost() exceeds the returned value, the repair result will be air to due being "too expensive".
	 *
	 * By default, this level is set to 40. Players in creative mode ignore the maximum repair cost.
	 */
	getMaximumRepairCost(): number {
		return this.toJava().getMaximumRepairCost()
	}

	/**
	 * Get the name to be applied to the repaired item. An empty string denotes the default item name.
	 */
	getRenameText(): string | null {
		return this.toJava().getRenameText()
	}

	/**
	 * Get the experience cost (in levels) to complete the current repair.
	 */
	getRepairCost(): number {
		return this.toJava().getRepairCost()
	}

	/**
	 * Set the maximum experience cost (in levels) to be allowed by the current repair. The default value set by vanilla Minecraft is 40.
	 */
	setMaximumRepairCost(cost: number): void {
		this.toJava().setMaximumRepairCost(cost)
	}

	/**
	 * Set the experience cost (in levels) to complete the current repair.
	 */
	setRepairCost(cost: number): void {
		this.toJava().setRepairCost(cost)
	}
}

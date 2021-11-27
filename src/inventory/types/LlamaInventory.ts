import { AbstractHorseInventory } from '.'
import { ItemStack } from '../../material/ItemStack'

export class LlamaInventory extends AbstractHorseInventory {
	/**
	 * Gets the item in the llama's decor slot.
	 */
	getDecor(): ItemStack | null {
		return ItemStack.fromJavaNullable(this.toJava().getDecor())
	}

	/**
	 * Sets the item in the llama's decor slot.
	 */
	setDecor(item: ItemStack | null): void {
		this.toJava().setDecor(item && item.toJava())
	}
}

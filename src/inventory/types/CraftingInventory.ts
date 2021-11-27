import { ItemStack } from '../../material/ItemStack'
import { Inventory } from '../Inventory'
import { Recipe } from '../Recipe'

export class CraftingInventory extends Inventory {
	/**
	 * Check what item is in the result slot of this crafting inventory.
	 */
	getResult(): ItemStack | null {
		return ItemStack.fromJavaNullable(this.toJava().getResult())
	}

	/**
	 * Get the contents of the crafting matrix.
	 * @returns The contents. Individual entries may be null.
	 */
	getMatrix(): (ItemStack | null)[] {
		const javaContents: Java.Value[] = this.toJava().getMatrix()
		if (!javaContents) return []
		return javaContents.map(ItemStack.fromJavaNullable)
	}

	/**
	 * Set the item in the result slot of the crafting inventory.
	 * @param item The new result item.
	 */
	setResult(item: ItemStack | null): void {
		this.toJava().setResult(item && item.toJava())
	}

	/**
	 * Replace the contents of the crafting matrix
	 *
	 * Must be less than the matrix size or an error will be thrown.
	 * @param items The new contents. Individual entries may be null.
	 */
	setMatrix(items: (ItemStack | null)[]): void {
		this.toJava().setMatrix(items.map((item) => item && item.toJava()))
	}

	/**
	 * Get the current recipe formed on the crafting inventory, if any.
	 * @returns The recipe, or null if the current contents don't match any recipe.
	 */
	getRecipe(): Recipe | null {
		const recipe = this.toJava().getRecipe()
		return recipe && Recipe.fromJava(recipe)
	}
}

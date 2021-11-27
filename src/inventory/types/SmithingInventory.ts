import { ItemStack } from '../../material/ItemStack'
import { Inventory } from '../Inventory'
import { Recipe } from '../Recipe'

export class SmithingInventory extends Inventory {
	/**
	 * Check what item is in the result slot of this smithing table.
	 */
	getResult(): ItemStack | null {
		return ItemStack.fromJavaNullable(this.toJava().getResult())
	}

	/**
	 * Set the item in the result slot of the smithing table
	 */
	setResult(item: ItemStack | null): void {
		this.toJava().setResult(item && item.toJava())
	}

	/**
	 * Get the current recipe formed on the smithing table, if any.
	 * @returns the recipe, or null if the current contents don't match any recipe
	 */
	getRecipe(): Recipe | null {
		const recipe = this.toJava().getRecipe()
		return recipe && Recipe.fromJava(recipe)
	}
}

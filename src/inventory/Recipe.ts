import { ItemStack } from '../material/ItemStack';
import { ToJava } from '../runtime/ToJava';

export class Recipe implements ToJava {
	public static fromJava(_recipe: Java.Value): Recipe {
		return new Recipe(_recipe);
	}

	private constructor(private _recipe: Java.Value) {}

	public toJava(): Java.Value {
		return this._recipe;
	}

	/**
	 * Represents some type of crafting recipe.
	 */
	getResult(): ItemStack | null {
		return ItemStack.fromJavaNullable(this.toJava().getResult());
	}
}

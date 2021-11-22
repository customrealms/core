import { ConstructInventory } from "../../../inventory/InventoryConstructors";
import { Recipe } from "../../../inventory/Recipe";
import { CraftingInventory } from "../../../inventory/types";
import { InventoryEvent } from "./InventoryEvent";

export class PrepareItemCraftEvent extends InventoryEvent {

  public static getBukkitClasspath(): string {
    return 'org.bukkit.event.inventory.PrepareItemCraftEvent';
  }

  getInventory(): CraftingInventory {
    return ConstructInventory<CraftingInventory>(this.toJava().getInventory());
  }

  /**
   * Get the recipe that has been formed. If this event was triggered by a tool repair, this will be a temporary shapeless recipe representing the repair.
   */
  getRecipe(): Recipe | null {
    const recipe = this.toJava().getRecipe();
    return recipe && Recipe.fromJava(recipe);
  }

  /**
   * Check if this event was triggered by a tool repair operation rather than a crafting recipe.
   */
  isRepair(): boolean {
    return this.toJava().isRepair();
  }
}
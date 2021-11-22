import { InventoryEvent } from "./InventoryEvent";
import { Inventory } from "../../../inventory/Inventory";
import { AnvilInventory } from "../../../inventory/types";
import { ItemStack } from "../../../material/ItemStack";

/**
 * Called when an item is put in a slot for upgrade by a Smithing Table.
 */
export class PrepareAnvilEvent extends InventoryEvent {
  getInventory(): AnvilInventory {
    return Inventory.fromJava<AnvilInventory>(this.toJava().getInventory());
  }

  /**
   * Get result item, may be null.
   */
  getResult(): ItemStack | null {
    return ItemStack.fromJavaNullable(this.toJava().getResult());
  }

  /**
   * Set result item
   */
  setResult(result: ItemStack | null): void {
    this.toJava().setResult(result && result.toJava());
  }
}
import { InventoryEvent } from "./InventoryEvent";
import { Inventory } from "../../../inventory/Inventory";
import { SmithingInventory } from "../../../inventory/types";
import { ItemStack } from "../../../material/ItemStack";

/**
 * Called when an item is put in a slot for upgrade by a Smithing Table.
 */
export class PrepareSmithingEvent extends InventoryEvent {
  getInventory(): SmithingInventory {
    return Inventory.fromJava<SmithingInventory>(this.toJava().getInventory());
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
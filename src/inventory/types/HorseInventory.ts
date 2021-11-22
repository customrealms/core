import { AbstractHorseInventory } from ".";
import { ItemStack } from "../../material/ItemStack";

export class HorseInventory extends AbstractHorseInventory {
  /**
   * Gets the item in the horse's armor slot.
   */
  getArmor(): ItemStack | null {
    return ItemStack.fromJavaNullable(this.toJava().getArmor());
  }

  /**
   * Sets the item in the horse's armor slot.
   */
  setArmor(item: ItemStack | null): void {
    this.toJava().setArmor(item && item.toJava());
  }
}
import { ItemStack } from "../../material/ItemStack";
import { Inventory } from "../Inventory";

export class FurnaceInventory extends Inventory {
  /**
   * Get the current item in the result slot.
   */
  getResult(): ItemStack | null {
    return ItemStack.fromJavaNullable(this.toJava().getResult());
  }

  /**
   * Get the current fuel.
   */
  getFuel(): ItemStack | null {
    return ItemStack.fromJavaNullable(this.toJava().getFuel());
  }

  /**
   * Get the item currently smelting.
   */
  getSmelting(): ItemStack | null {
    return ItemStack.fromJavaNullable(this.toJava().getSmelting());
  }

  /**
   * Set the current fuel.
   */
  setFuel(item: ItemStack | null): void {
    this.toJava().setFuel(item && item.toJava());
  }

  /**
   * Set the current item in the result slot.
   */
  setResult(item: ItemStack | null): void {
    this.toJava().setResult(item && item.toJava());
  }

  /**
   * Set the item currently smelting.
   */
  setSmelting(item: ItemStack | null): void {
    this.toJava().setSmelting(item && item.toJava());
  }
}
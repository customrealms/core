import { Inventory } from "../Inventory";

export class DoubleChestInventory extends Inventory {
  /**
   * Get the left half of this double chest.
   */
  getLeftSide(): Inventory {
    return Inventory.fromJava(this.toJava().getLeftSide());
  }

  /**
   * Get the right half of this double chest.
   */
  getRightSide(): Inventory {
    return Inventory.fromJava(this.toJava().getRightSide());
  }
}
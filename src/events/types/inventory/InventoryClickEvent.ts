import { Inventory } from "../../../inventory/Inventory";
import { InventorySlotType } from "../../../inventory/InventorySlotType";
import { InventoryAction } from "../../../inventory/InventoryAction";
import { ClickType } from "../../../inventory/ClickType";
import { ItemStack } from "../../../material/ItemStack";
import { InventoryInteractEvent } from "./InventoryInteractEvent";

/**
 * This event is called when a player clicks in an inventory.
 * 
 * Because InventoryClickEvent occurs within a modification of the Inventory, not all Inventory related methods are safe to use.
 * 
 * The following should never be invoked by an EventHandler for InventoryClickEvent using the HumanEntity or InventoryView associated with this event:
 * - HumanEntity.closeInventory()
 * - HumanEntity.openInventory(Inventory)
 * - HumanEntity.openWorkbench(Location, boolean)
 * - HumanEntity.openEnchanting(Location, boo[]lean)
 * - InventoryView.close()
 * 
 * To invoke one of these methods, schedule a task using setTimeout, which will run the task on the next tick. Also be aware that this is not an exhaustive list, and other methods could potentially create issues as well.
 * Assuming the EntityHuman associated with this event is an instance of a Player, manipulating the MaxStackSize or contents of an Inventory will require an Invocation of Player.updateInventory().
 * 
 * Modifications to slots that are modified by the results of this InventoryClickEvent can be overwritten. To change these slots, this event should be cancelled and all desired changes to the inventory applied. Alternatively, scheduling a task using BukkitScheduler.runTask(Plugin, Runnable), which would execute the task on the next tick, would work as well.
 */
export class InventoryClickEvent extends InventoryInteractEvent {
  
  public static getBukkitClasspath(): string {
    return 'org.bukkit.event.inventory.InventoryClickEvent';
  }

  /**
   * Gets the type of slot that was clicked.
   */
  getSlotType(): InventorySlotType {
    return this.toJava().getSlotType().name();
  }

  /**
   * Gets the current ItemStack on the cursor.
   */
  getCursor(): ItemStack | null {
    return ItemStack.fromJavaNullable(this.toJava().getCursor());
  }

  /**
   * Gets the ItemStack currently in the clicked slot.
   */
  getCurrentItem(): ItemStack | null {
    return ItemStack.fromJavaNullable(this.toJava().getCurrentItem());
  }

  /**
   * Gets whether or not the ClickType for this event represents a right click.
   * @returns true if the ClickType uses the right mouse button.
   */
  isRightClick(): boolean {
    return this.toJava().isRightClick();
  }

  /**
   * Gets whether or not the ClickType for this event represents a left click.
   * @returns true if the ClickType uses the left mouse button.
   */
  isLeftClick(): boolean {
    return this.toJava().isLeftClick();
  }

  /**
   * Gets whether the ClickType for this event indicates that the key was pressed down when the click was made.
   * @returns true if the ClickType uses Shift or Ctrl.
   */
  isShiftClick(): boolean {
    return this.toJava().isShiftClick();
  }

  /**
   * Sets the ItemStack currently in the clicked slot.
   */
  setCurrentItem(item: ItemStack | null): void {
    this.toJava().setCurrentItem(item && item.toJava());
  }

  /**
   * Gets the inventory corresponding to the clicked slot.
   * @returns inventory, or null if clicked outside
   */
  getClickedInventory(): Inventory | null {
    const inv = this.toJava().getClickedInventory();
    return inv && Inventory.fromJava(inv);
  }

  /**
   * The slot number that was clicked, ready for passing to Inventory.getItem(int). Note that there may be two slots with the same slot number, since a view links two different inventories.
   */
  getSlot(): number {
    return this.toJava().getSlot();
  }

  /**
   * The raw slot number clicked. This slot number is unique for the view.
   */
  getRawSlot(): number {
    return this.toJava().getRawSlot();
  }

  /**
   * If the ClickType is NUMBER_KEY, this method will return the index of the pressed key (0-8).
   * @returns the number on the key minus 1 (range 0-8); or -1 if not a NUMBER_KEY action
   */
  getHotbarButton(): number {
    return this.toJava().getHotbarButton();
  }

  /**
   * Gets the InventoryAction that triggered this event.
   * 
   * This action cannot be changed, and represents what the normal outcome of
   * the event will be. To change the behavior of this InventoryClickEvent,
   * changes must be manually applied.
   */
  getAction(): InventoryAction {
    return this.toJava().getAction().name();
  }

  /**
   * Gets the ClickType for this event.
   * 
   * This is insulated against changes to the inventory by other plugins.
   * @todo Give a better explination of what this means
   */
  getClick(): ClickType {
    return this.toJava().getClick().name();
  }
}
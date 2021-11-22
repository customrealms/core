import { ItemStack } from '../../../material/ItemStack';
import { Inventory } from '../../../inventory/Inventory';
import { Cancellable } from '../../Cancellable';
import { Event } from '../Event';

/**
 * Called when some entity or block (e.g. hopper) tries to move items directly from one inventory to another.
 * 
 * When this event is called, the initiator may already have removed the item from the source inventory and is ready to move it into the destination inventory.
 * 
 * If this event is cancelled, the items will be returned to the source inventory, if needed.
 * 
 * If this event is not cancelled, the initiator will try to put the ItemStack into the destination inventory. If this is not possible and the ItemStack has not been modified, the source inventory slot will be restored to its former state. Otherwise any additional items will be discarded.
 */
export class InventoryMoveItemEvent extends Event implements Cancellable {

  public static getBukkitClasspath(): string {
    return 'org.bukkit.event.inventory.InventoryMoveItemEvent';
  }

  /**
   * Gets the Inventory that the ItemStack is being taken from
   */
  getSource(): Inventory {
    return Inventory.fromJava(this.toJava().getSource());
  }

  /**
   * Gets the ItemStack being moved; if modified, the original item will not be removed from the source inventory.
   */
  getItem(): ItemStack {
    return ItemStack.fromJava(this.toJava().getItem());
  }

  /**
   * Sets the ItemStack being moved; if this is different from the original ItemStack, the original item will not be removed from the source inventory
   * @param item The ItemStack
   */
  setItem(item: ItemStack): void {
    this.toJava().setItem(item.toJava());
  }

  /**
   * Gets the Inventory that the ItemStack is being put into
   */
  getDestination(): Inventory {
    return Inventory.fromJava(this.toJava().getDestination());
  }

  /**
   * Gets the Inventory that initiated the transfer. This will always be either the destination or source Inventory.
   */
  getInitiator(): Inventory {
    return Inventory.fromJava(this.toJava().getInitiator());
  }

  public isCancelled(): boolean {
    return this.toJava().isCancelled();
  }

  public setCancelled(cancel: boolean): void {
    this.toJava().setCancelled(cancel);
  }
}

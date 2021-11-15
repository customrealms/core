import { Player } from '../../../player/Player';
import { InventoryEvent } from './InventoryEvent';

/**
 * Represents a player related inventory event
 */
export class InventoryOpenEvent extends InventoryEvent {

  public static getBukkitClasspath(): string {
    return 'org.bukkit.event.inventory.InventoryOpenEvent';
  }

  /**
   * Which button was pressed to initiate the enchanting.
   */
  public getPlayer(): Player {
    return Player.fromJava(this.toJava().getPlayer());
  }

  /**
   * Sets the cancellation state of this event
   * @param cancel the cancellation state of this event
   */
  public setCancelled(cancel: boolean): void {
    this.toJava().setCancelled(cancel);
  }

  /**
   * Checks if this even has been cancelled
   */
  public isCancelled(): boolean {
    return this.toJava().isCancelled();
  }
}
import { Block } from '../../../block/Block';
import { ItemStack } from '../../../material/ItemStack';
import { Player } from '../../../player/Player';
import { Cancellable } from '../../Cancellable';
import { InventoryEvent } from './InventoryEvent';

/**
 * Called when an ItemStack is successfully enchanted (currently at enchantment table)
 */
export class EnchantItemEvent extends InventoryEvent implements Cancellable {

  public static getBukkitClasspath(): string {
    return 'org.bukkit.event.enchantment.EnchantItemEvent';
  }

  /**
   * Gets the block being used to enchant the item
   */
  public getEnchantBlock(): Block {
    return Block.fromJava(this.toJava().getEnchantBlock());
  }

  /**
   * Gets the player enchanting the item
   */
  public getEnchanter(): Player {
    return Player.fromJava(this.toJava().getEnchanter());
  }

  // TODO: implement
  // /**
  //  * Get map of enchantment (levels, keyed by type) to be added to item (modify map returned to change values). Note: Any enchantments not allowed for the item will be ignored
  //  */
  // public getEnchantsToAdd(): Map<Enchantment, number> {
  //   return this.toJava().getEnchantsToAdd();
  // }

  /**
   * Gets the cost (minimum level) which is displayed as a number on the right hand side of the enchantment offer.
   */
  public getExpLevelCost(): number {
    return this.toJava().getExpLevelCost();
  }

  /**
   * Gets the item to be enchanted (can be modified)
   */
  public getItem(): ItemStack {
    return ItemStack.fromJava(this.toJava().getItem());
  }

  public setCancelled(cancel: boolean): void {
    this.toJava().setCancelled(cancel);
  }

  public isCancelled(): boolean {
    return this.toJava().isCancelled();
  }

  /**
   * Sets the cost (minimum level) which is displayed as a number on the right hand side of the enchantment offer.
   * @param level cost in levels
   */
  public setExpLevelCost(level: number): void {
    this.toJava().setExpLevelCost(level);
  }

  /**
   * Which button was pressed to initiate the enchanting.
   */
  public whichButton(): number {
    return this.toJava().whichButton();
  }
}
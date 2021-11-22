import { InventoryEvent } from "./InventoryEvent";
import { Player } from "../../../player/Player";
import { Block } from "../../../block/Block";
import { Inventory } from "../../../inventory/Inventory";
import { EnchantingInventory } from "../../../inventory/types";
import { ItemStack } from "../../../material/ItemStack";
import { Cancellable } from "../../Cancellable";
import { EnchantmentOffer } from "../../../material/EnchantmentOffer";

export class PrepareItemEnchantEvent extends InventoryEvent implements Cancellable {

  public static getBukkitClasspath(): string {
    return 'org.bukkit.event.inventory.PrepareItemEnchantEvent';
  }

  getInventory(): EnchantingInventory {
    return Inventory.fromJava<EnchantingInventory>(this.toJava().getInventory());
  }

  /**
   * Gets the player enchanting the item
   */
  getEnchanter(): Player {
    return Player.fromJava(this.toJava().getEnchanter());
  }

  /**
   * Gets the block being used to enchant the item
   */
  getEnchantBlock(): Block {
    return Block.fromJava(this.toJava().getEnchantBlock());
  }

  /**
   * Gets the item to be enchanted.
   */
  getItem(): ItemStack {
    return ItemStack.fromJava(this.toJava().getItem());
  }

  /**
   * Get a list of available EnchantmentOffer for the player. You can modify
   * the values to change the available offers for the player. An offer may be
   * null, if there isn't a enchantment offer at a specific slot. There are 3
   * slots in the enchantment table available to modify.
   */
  getOffers(): EnchantmentOffer[] {
    return this.toJava().getOffers().map((offer: Java.Value) => offer && EnchantmentOffer.fromJava(offer));
  }

  /**
   * Get enchantment bonus in effect - corresponds to number of bookshelves
   */
  getEnchantmentBonus(): number {
    return this.toJava().getEnchantmentBonus();
  }

  isCancelled(): boolean {
    return this.toJava().isCancelled();
  }

  setCancelled(cancelled: boolean): void {
    this.toJava().setCancelled(cancelled);
  }

}
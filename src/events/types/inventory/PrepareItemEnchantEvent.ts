import { Block } from '../../../block/Block'
import { ConstructInventory } from '../../../inventory/InventoryConstructors'
import { EnchantingInventory } from '../../../inventory/types'
import { EnchantmentOffer } from '../../../material/EnchantmentOffer'
import { ItemStack } from '../../../material/ItemStack'
import { Player } from '../../../player/Player'
import { Cancellable } from '../../Cancellable'
import { InventoryEvent } from './InventoryEvent'

export class PrepareItemEnchantEvent
	extends InventoryEvent
	implements Cancellable
{
	public static getBukkitClasspath(): string {
		return 'org.bukkit.event.enchantment.PrepareItemEnchantEvent'
	}

	getInventory(): EnchantingInventory {
		return ConstructInventory<EnchantingInventory>(
			this.toJava().getInventory()
		)
	}

	/**
	 * Gets the player enchanting the item
	 */
	getEnchanter(): Player {
		return Player.fromJava(this.toJava().getEnchanter())
	}

	/**
	 * Gets the block being used to enchant the item
	 */
	getEnchantBlock(): Block {
		return Block.fromJava(this.toJava().getEnchantBlock())
	}

	/**
	 * Gets the item to be enchanted.
	 */
	getItem(): ItemStack {
		return ItemStack.fromJava(this.toJava().getItem())
	}

	/**
	 * Get a list of available EnchantmentOffer for the player. You can modify non-null
	 * the values to change the available offers for the player. An offer may be
	 * null, if there isn't a enchantment offer at a specific slot. There are 3
	 * slots in the enchantment table available to modify.
	 *
	 * At the moment, setting the array elements with a new enchantment offer will NOT
	 * override the existing offer (even if null).
	 */
	getOffers(): [
		EnchantmentOffer | null,
		EnchantmentOffer | null,
		EnchantmentOffer | null
	] {
		return this.toJava()
			.getOffers()
			.map(
				(offer: Java.Value) => offer && EnchantmentOffer.fromJava(offer)
			)
	}

	/**
	 * Get enchantment bonus in effect - corresponds to number of bookshelves
	 */
	getEnchantmentBonus(): number {
		return this.toJava().getEnchantmentBonus()
	}

	isCancelled(): boolean {
		return this.toJava().isCancelled()
	}

	setCancelled(cancelled: boolean): void {
		this.toJava().setCancelled(cancelled)
	}
}

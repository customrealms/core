import { ConstructInventory } from '../../../inventory/InventoryConstructors'
import { AnvilInventory } from '../../../inventory/types'
import { ItemStack } from '../../../material/ItemStack'
import { InventoryEvent } from './InventoryEvent'

/**
 * Called when an item is put in a slot for upgrade by a Smithing Table.
 */
export class PrepareAnvilEvent extends InventoryEvent {
	public static getBukkitClasspath(): string {
		return 'org.bukkit.event.inventory.PrepareAnvilEvent'
	}

	getInventory(): AnvilInventory {
		return ConstructInventory<AnvilInventory>(this.toJava().getInventory())
	}

	/**
	 * Get result item, may be null.
	 */
	getResult(): ItemStack | null {
		return ItemStack.fromJavaNullable(this.toJava().getResult())
	}

	/**
	 * Set result item
	 */
	setResult(result: ItemStack | null): void {
		this.toJava().setResult(result && result.toJava())
	}
}

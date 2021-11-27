import * as InventoryClasses from '..'
import { Inventory } from '../inventory/Inventory'
import { Constructor } from '../types/Constructor'
import { InventoryType } from './InventoryType'

/**
 * Mapping of InventoryType values to the corresponding class constructor
 * Use Inventory if the type doesn't have a specific constructor.
 */
export const InventoryConstructors: {
	[key in InventoryType]?: Constructor<Inventory>
} = {
	[InventoryType.ANVIL]: InventoryClasses.AnvilInventory,
	[InventoryType.BEACON]: InventoryClasses.BeaconInventory,
	[InventoryType.BLAST_FURNACE]: InventoryClasses.FurnaceInventory,
	[InventoryType.BREWING]: InventoryClasses.BrewerInventory,
	[InventoryType.CARTOGRAPHY]: InventoryClasses.CartographyInventory,
	[InventoryType.ENCHANTING]: InventoryClasses.EnchantingInventory,
	[InventoryType.FURNACE]: InventoryClasses.FurnaceInventory,
	[InventoryType.GRINDSTONE]: InventoryClasses.GrindstoneInventory,
	[InventoryType.LECTERN]: InventoryClasses.LecternInventory,
	[InventoryType.LOOM]: InventoryClasses.LoomInventory,
	[InventoryType.PLAYER]: InventoryClasses.PlayerInventory,
	[InventoryType.SMOKER]: InventoryClasses.FurnaceInventory,
	[InventoryType.STONECUTTER]: InventoryClasses.StonecutterInventory,
	[InventoryType.SMITHING]: InventoryClasses.SmithingInventory,
	[InventoryType.WORKBENCH]: InventoryClasses.CraftingInventory,
}

/**
 * Converts a raw Java handle to an inventory into the wrapped JavaScript subclass of the inventory's type
 * @param _inventory the Java handle to the underlying Inventory
 * @returns the inventory, wrapped in the appropriate subclass for its InventoryType
 */
export function ConstructInventory<T extends Inventory = Inventory>(
	_inventory: Java.Value
): T {
	// Get the string InventoryTypeType string value for the inventory
	const inventoryType: InventoryType = _inventory.getType().name()

	// If the inventory type has a corresponding constructor, construct using that class
	if (inventoryType in InventoryConstructors) {
		const ctor = InventoryConstructors[inventoryType]
		if (ctor) {
			return new ctor(_inventory) as T
		}
	}

	// Fallback to the base InventoryType class if we can't match to a subclass
	return Inventory.fromJava(_inventory) as T
}

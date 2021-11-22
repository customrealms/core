import * as InevntoryClasses from '..';
import { Inventory } from '..';
import { Constructor } from '../types/Constructor';
import { InventoryType } from './InventoryType';

/**
 * Mapping of InventoryType values to the corresponding class constructor
 * Use Inventory if the type doesn't have a specific constructor.
 */
export const InventoryConstructors: { [key in InventoryType]?: Constructor<Inventory> } = {
  [InventoryType.ANVIL]: InevntoryClasses.AnvilInventory,
  [InventoryType.BEACON]: InevntoryClasses.BeaconInventory,
  [InventoryType.BLAST_FURNACE]: InevntoryClasses.FurnaceInventory,
  [InventoryType.BREWING]: InevntoryClasses.BrewerInventory,
  [InventoryType.CARTOGRAPHY]: InevntoryClasses.CartographyInventory,
  [InventoryType.ENCHANTING]: InevntoryClasses.EnchantingInventory,
  [InventoryType.FURNACE]: InevntoryClasses.FurnaceInventory,
  [InventoryType.GRINDSTONE]: InevntoryClasses.GrindstoneInventory,
  [InventoryType.LECTERN]: InevntoryClasses.LecternInventory,
  [InventoryType.LOOM]: InevntoryClasses.LoomInventory,
  [InventoryType.PLAYER]: InevntoryClasses.PlayerInventory,
  [InventoryType.SMOKER]: InevntoryClasses.FurnaceInventory,
  [InventoryType.STONECUTTER]: InevntoryClasses.StonecutterInventory,
  [InventoryType.SMITHING]: InevntoryClasses.SmithingInventory,
  [InventoryType.WORKBENCH]: InevntoryClasses.CraftingInventory,
};
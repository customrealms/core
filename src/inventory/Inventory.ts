import { HumanEntity } from '../entity/types/HumanEntity'
import { ItemStack } from '../material/ItemStack'
import { Material } from '../material/Material'
import { ToJava } from '../runtime/ToJava'
import { Location } from '../util/Location'
import { InventoryType } from './InventoryType'

export class Inventory implements ToJava {
	public constructor(protected _java: Java.Value) {}

	/**
	 * Converts a raw Java handle to an inventory into the wrapped JavaScript subclass of the inventory's type
	 * @param _inventory the Java handle to the underlying Inventory
	 * @returns the inventory, wrapped in the appropriate subclass for its InventoryType
	 */
	public static fromJava(_inventory: Java.Value): Inventory {
		return new Inventory(_inventory)
	}

	public toJava(): Java.Value {
		return this._java
	}

	/**
	 * Stores the given items in the inventory
	 * @param items the items to add
	 */
	public addItem(...items: ItemStack[]): { [key: number]: ItemStack } {
		// items.forEach(item => this.toJava().addItem(item));
		this.toJava().addItem(items.map((item) => item.toJava()))
		return {}
	}

	/**
	 * Finds all slots in the inventory containing a material
	 * @param match the material or item stack type to match
	 */
	public all(match: Material | ItemStack): { [key: number]: ItemStack } {
		// TODO: Not implemented
		return {}
	}

	/**
	 * Clears the whole inventory, or a particular slot index
	 * @param index the optional single index to clear
	 */
	public clear(index?: number): void {
		if (typeof index === 'number') this.toJava().clear(index)
		else this.toJava().clear()
	}

	/**
	 * Checks if the inventory contains a material, and optionally a specific amount or more
	 * @param material the material or item stack type to match
	 * @param amount the optional amount to require
	 */
	public contains(
		material_or_item: Material | ItemStack,
		amount?: number
	): boolean {
		if (material_or_item instanceof Material) {
			if (typeof amount === 'number')
				return this.toJava().contains(material_or_item.toJava(), amount)
			else return this.toJava().contains(material_or_item.toJava())
		} else {
			return this.toJava().contains(material_or_item.toJava())
		}
	}

	/**
	 * Gets the index of the first slot containing a material
	 * @param match the material or item stack to match
	 */
	public first(match: Material | ItemStack): number {
		return this.toJava().first(match.toJava())
	}

	/**
	 * Gets the index of the first empty slot in the inventory
	 */
	public firstEmpty(): number {
		return this.toJava().firstEmpty()
	}

	/**
	 * Gets the array of all inventory items in the inventory
	 */
	public getContents(): (ItemStack | null)[] {
		const javaContents: Java.Value[] = this.toJava().getContents()
		if (!javaContents) return []
		return javaContents.map((i) => (i ? ItemStack.fromJava(i) : null))
	}

	// /**
	//  * Gets the holder of the inventory
	//  */
	// public getHolder(): InventoryHolder | null {
	//     const javaHolder = this.toJava().getHolder();
	//     if (!javaHolder) return null;
	//     return new InventoryHolder(javaHolder);
	// }

	/**
	 * Gets the item in an inventory slot
	 * @param index the index of the slot
	 */
	public getItem(index: number): ItemStack | null {
		const javaStack = this.toJava().getItem(index)
		if (!javaStack) return null
		return ItemStack.fromJava(javaStack)
	}

	/**
	 * Gets the location of the block or entity which corresponds to this inventory
	 */
	public getLocation(): Location | null {
		return Location.fromJava(this.toJava().getLocation())
	}

	/**
	 * Gets the maximum stack size for an itemstack in this inventory
	 */
	public getMaxStackSize(): number {
		return this.toJava().getMaxStackSize()
	}

	/**
	 * Gets the size of the inventory
	 */
	public getSize(): number {
		return this.toJava().getSize()
	}

	/**
	 * Gets the contents from the section of this inventory where items can be expected to be stored
	 */
	public getStorageContents(): (ItemStack | null)[] {
		const javaContents: Java.Value[] = this.toJava().getStorageContents()
		if (!javaContents) return []
		return javaContents.map(ItemStack.fromJavaNullable)
	}

	/**
	 * Gets the type of inventory this is
	 */
	public getType(): InventoryType {
		return this.toJava().getType().name()
	}

	/**
	 * Gets the array of entities currently viewing this inventory
	 */
	public getViewers(): HumanEntity[] {
		// TODO: Not implemented
		return []
	}

	/**
	 * Removes an amount of a material from the inventory
	 * @param material the material
	 * @param amount the amount to remove
	 */
	public remove(
		material_or_item: Material | ItemStack,
		amount?: number
	): void {
		if (material_or_item instanceof Material) {
			if (typeof amount === 'number')
				this.toJava().remove(material_or_item.toJava(), amount)
			else this.toJava().remove(material_or_item.toJava())
		} else {
			this.toJava().remove(material_or_item.toJava())
		}
	}

	/**
	 * Completely replaces the contents of the inventory
	 * @param items the items to set
	 */
	public setContents(items: (ItemStack | null)[]): void {
		const javaContents = items.map((i) => (i ? i.toJava() : null))
		this.toJava().setContents(javaContents)
	}

	/**
	 * Sets the maximum stack size
	 * @param size the maximum stack size
	 */
	public setMaxStackSize(size: number): void {
		this.toJava().setMaxStackSize(size)
	}

	/**
	 * Completely replaces the contents of the storage section of the inventory
	 * @param items the items to set
	 */
	public setStorageContents(items: (ItemStack | null)[]): void {
		const javaContents = items.map((i) => (i ? i.toJava() : null))
		this.toJava().setStorageContents(javaContents)
	}
}

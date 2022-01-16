import { ConstructEntity } from '../../entity/EntityConstructors';
import { HumanEntity } from '../../entity/types/HumanEntity';
import { ItemStack } from '../../material/ItemStack';
import { EquipmentSlot } from '../EquipmentSlot';
import { Inventory } from '../Inventory';

export class PlayerInventory extends Inventory {
	/**
	 * Gets all items from the armor slots
	 */
	public getArmorContents(): ItemStack[] {
		// TODO: Not implemented
		return [];
	}

	/**
	 * Gets the item in the boots slot
	 */
	public getBoots(): ItemStack | null {
		const javaItem = this.toJava().getBoots();
		if (!javaItem) return null;
		return ItemStack.fromJava(javaItem);
	}

	/**
	 * Gets the item in the chestplate slot
	 */
	public getChestplate(): ItemStack | null {
		const javaItem = this.toJava().getChestplate();
		if (!javaItem) return null;
		return ItemStack.fromJava(javaItem);
	}

	/**
	 * Gets all additional items stored in this inventory
	 */
	public getExtraContents(): ItemStack[] {
		// TODO: Not implemented
		return null as any;
	}

	/**
	 * Gets the slot index of the item currently being held
	 */
	public getHeldItemSlot(): number {
		return this.toJava().getHeldItemSlot();
	}

	/**
	 * Gets the item in the helmet slot
	 */
	public getHelmet(): ItemStack | null {
		const javaItem = this.toJava().getHelmet();
		if (!javaItem) return null;
		return ItemStack.fromJava(javaItem);
	}

	/**
	 * Gets the entity owning this inventory
	 */
	public getHolder(): HumanEntity | null {
		const javaHolder = this.toJava().getHolder();
		if (!javaHolder) return null;
		return ConstructEntity<HumanEntity>(javaHolder);
	}

	/**
	 * Gets the item in a specific equipment slot
	 * @param slot the equipment slot
	 */
	public getItemInSlot(slot: EquipmentSlot): ItemStack | null {
		// TODO: Not implemented
		return null as any;
	}

	/**
	 * Gets the item in the main hand
	 */
	public getItemInMainHand(): ItemStack | null {
		const javaItem = this.toJava().getItemInMainHand();
		if (!javaItem) return null;
		return ItemStack.fromJava(javaItem);
	}

	/**
	 * Gets the item in the off hand
	 */
	public getItemInOffHand(): ItemStack | null {
		const javaItem = this.toJava().getItemInOffHand();
		if (!javaItem) return null;
		return ItemStack.fromJava(javaItem);
	}

	/**
	 * Gets the item in the leggings slot
	 */
	public getLeggings(): ItemStack | null {
		const javaItem = this.toJava().getLeggings();
		if (!javaItem) return null;
		return ItemStack.fromJava(javaItem);
	}

	/**
	 * Replaces the full contents of the armor slots
	 * @param items the items to put
	 */
	public setArmorContents(items: ItemStack[] | null): void {
		// TODO: Not implemented
		return null as any;
	}

	/**
	 * Sets the item in the boots slot
	 * @param item the item to set
	 */
	public setBoots(item: ItemStack | null): void {
		this.toJava().setBoots(item?.toJava() ?? null);
	}

	/**
	 * Sets the item in the chestplate slot
	 * @param item the item to set
	 */
	public setChestplate(item: ItemStack | null): void {
		this.toJava().setChestplate(item?.toJava() ?? null);
	}

	/**
	 * Replaces the full contents of the extra contents slots
	 * @param items the items to put
	 */
	public setExtraContents(items: ItemStack[]): void {
		// TODO: Not implemented
		return null as any;
	}

	/**
	 * Sets the index of the slot currently held by the player
	 * @param slot the slit index
	 */
	public setHeldItemSlot(slot: number): void {
		this.toJava().setHeldItemSlot(slot);
	}

	/**
	 * Sets the item in the helmet slot
	 * @param item the item to set
	 */
	public setHelmet(item: ItemStack | null): void {
		this.toJava().setHelmet(item?.toJava() ?? null);
	}

	/**
	 * Sets the item in a specific slot
	 * @param slot the index of the slot
	 * @param item the item to set
	 */
	public setItem(slot: number | EquipmentSlot, item: ItemStack | null): void {
		this.toJava().setItem(slot, item?.toJava() ?? null);
	}

	/**
	 * Sets the item in the player's main hand
	 * @param item the item to set
	 */
	public setItemInMainHand(item: ItemStack | null): void {
		this.toJava().setItemInMainHand(item?.toJava() ?? null);
	}

	/**
	 * Sets the item in the player's off hand
	 * @param item the item to set
	 */
	public setItemInOffHand(item: ItemStack | null): void {
		this.toJava().setItemInOffHand(item?.toJava() ?? null);
	}

	/**
	 * Sets the item in the leggings slot
	 * @param item the item to set
	 */
	public setLeggings(item: ItemStack | null): void {
		this.toJava().setLeggings(item?.toJava() ?? null);
	}
}

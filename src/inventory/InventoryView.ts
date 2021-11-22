import { InventorySlotType } from "./InventorySlotType";
import { InventoryType } from "./InventoryType";
import { InventoryViewProperty } from "./InventoryViewProperty";
import { HumanEntity } from "../entity/HumanEntity";
import { ItemStack } from "../material/ItemStack";
import { ToJava } from "../runtime/ToJava";
import { Inventory } from "./Inventory";

export class InventoryView implements ToJava {

    public constructor(private _java: any) {}

    public toJava(): any {
        return this._java;
    }

    /**
     * Closes the inventory view
     */
    public close(): void {
        this.toJava().close();
    }

    /**
     * Converts a raw slot ID into its local slot ID
     * @param raw_slot the raw slot ID
     */
    public convertSlot(raw_slot: number): number {
        return this.toJava().convertSlot(raw_slot);
    }

    /**
     * Gets the total number of slots in this view, combining the upper and lower inventories
     */
    public countSlots(): number {
        return this.toJava().countSlots();
    }

    /**
     * Gets the lower inventory involved in this transaction
     */
    public getBottomInventory(): Inventory {
        // TODO: Not implemented
        return null as any;
    }

    /**
     * Gets the item o n the cursor of one of the viewing players
     */
    public getCursor(): ItemStack | null {
        // TODO: Not implemented
        return null as any;
    }

    /**
     * Gets an inventory given its raw slot ID
     * @param raw_slot the raw slot ID
     */
    public getInventory(raw_slot: number): Inventory | null {
        // TODO: Not implemented
        return null as any;
    }

    /**
     * Gets the item in this inventory view by its raw slot ID
     * @param raw_slot the raw slot ID
     */
    public getItem(raw_slot: number): ItemStack | null {
        // TODO: Not implemented
        return null as any;
    }

    /**
     * Gets the player viewing the inventory
     */
    public getPlayer(): HumanEntity {
        // return this.toJava().getPlayer();
        // TODO: Not implemented
        return null as any;
    }

    /**
     * Gets the type of slot at a raw slot ID
     * @param raw_slot the raw slot ID
     */
    public getSlotType(raw_slot: number): InventorySlotType {
        return this.toJava().getSlotType(raw_slot).name();
    }

    /**
     * Gets the title of this inventory window
     */
    public getTitle(): string {
        return this.toJava().getTitle();
    }

    /**
     * Gets the upper inventory involved in this transaction
     */
    public getTopInventory(): Inventory {
        const javaInv = this.toJava().getTopInventory();
        return Inventory.fromJava(javaInv);
    }

    /**
     * Gets the type of this inventory view
     */
    public getType(): InventoryType {
        return this.toJava().getType().name();
    }

    /**
     * Sets the item at the player's cursor
     * @param item the item to insert at the cursor
     */
    public setCursor(item: ItemStack | null): void {

    }

    /**
     * Sets the item at a given slot
     * @param raw_slot the raw slot ID
     * @param item the item to insert to the slot
     */
    public setItem(raw_slot: number, item: ItemStack | null): void {

    }

    /**
     * Sets the value for a property on this inventory view
     * @param property the property key
     * @param value the value to set for the property
     */
    public setProperty(property: InventoryViewProperty, value: number): boolean {
        const javaProp = Java
            .resolve('org.bukkit.inventory.InventoryView.Property')
            .valueOf(property);
        if (!javaProp) return false;
        return this.toJava().setProperty(javaProp, value);
    }

}

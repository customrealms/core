import { EquipmentSlot } from "./EquipmentSlot";
import { Entity } from "../entity/Entity";
import "../globals";
import { ItemStack } from "../material/ItemStack";
import { ToJava } from "../runtime/ToJava";

export class EntityEquipment implements ToJava {

    public static fromJava(_java: Java.Value): EntityEquipment {
        return new EntityEquipment(_java);
    }

    public constructor(
        private _java: Java.Value,
    ) {}

    public toJava(): any {
        return this._java;
    }

    /**
     * Clears the entity of all armor and held itels
     */
    public clear(): void {
        return this.toJava().clear();
    }

    // /**
    //  * Gets a copy of all work armor in an array
    //  */
    // public getArmorContents(): ItemStack[] {
    //     // TODO: Not implemented
    //     return [];
    // }

    /**
     * Gets a copy of the boots currently being worn by the entity
     */
    public getBoots(): ItemStack | null {
        const javaItemStack = this.toJava().getBoots();
        return javaItemStack ? ItemStack.fromJava(javaItemStack) : null;
    }

    /**
     * Gets the chance of the boots being dropped upon this entity's death
     */
    public getBootsDropChance(): number {
        return this.toJava().getBootsDropChance();
    }

    /**
     * Gets a copy of the chestplate currently being worn by the entity
     */
    public getChestplate(): ItemStack | null {
        const javaItemStack = this.toJava().getChestplate();
        return javaItemStack ? ItemStack.fromJava(javaItemStack) : null;
    }

    /**
     * Gets the chance of the chestplate being dropped upon this entity's death
     */
    public getChestplateDropChance(): number {
        return this.toJava().getChestplateDropChance();
    }

    /**
     * Gets a copy of the helped currently being worn by this entity
     */
    public getHelmet(): ItemStack | null {
        const javaItemStack = this.toJava().getHelmet();
        return javaItemStack ? ItemStack.fromJava(javaItemStack) : null;
    }

    /**
     * Gets the chance of the helped being dripped upon this entity's death
     */
    public getHelmetDropChance(): number {
        return this.toJava().getHelmetDropChance();
    }

    /**
     * Gets the entity this equipment belongs to
     */
    public getHolder(): Entity | null {
        const javaEntity = this.toJava().getHolder();
        if (!javaEntity) return null;
        return Entity.fromJava(javaEntity);
    }

    /**
     * Gets the item at the given equipment slot
     * @param slot the slot to get
     */
    public getItem(slot: EquipmentSlot): ItemStack | null {
        const javaEquipSlot = Java.resolve('org.bukkit.inventory.EquipmentSlot').valueOf(slot);
        if (!javaEquipSlot) return null;
        const javaItemStack = this.toJava().getItem(javaEquipSlot);
        return javaItemStack ? ItemStack.fromJava(javaItemStack) : null;
    }

    /**
     * Gets a copy of the item in the entity's main hand
     */
    public getItemInMainHand(): ItemStack | null {
        const javaItemStack = this.toJava().getItemInMainHand();
        return javaItemStack ? ItemStack.fromJava(javaItemStack) : null;
    }

    /**
     * Gets the chance of the main hand item being dropped upon the entity's death
     */
    public getItemInMainHandDropChance(): number {
        return this.toJava().getItemInMainHandDropChance();
    }

    /**
     * Gets a copy of the item in the entity's off hand
     */
    public getItemInOffHand(): ItemStack | null {
        const javaItemStack = this.toJava().getItemInOffHand();
        return javaItemStack ? ItemStack.fromJava(javaItemStack) : null;
    }

    /**
     * Gets the chance of the off hand item being dropped upon the entity's death
     */
    public getItemInOffHandDropChance(): number {
        return this.toJava().getItemInOffHandDropChance();
    }

    /**
     * Gets a cpy of the leggings currently being worn by the entity
     */
    public getLeggings(): ItemStack | null {
        const javaItemStack = this.toJava().getLeggings();
        return javaItemStack ? ItemStack.fromJava(javaItemStack) : null;
    }

    /**
     * Gets the chance of the leggings being dropped upon the entity's death
     */
    public getLeggingsDropChance(): number {
        return this.toJava().getLeggingsDropChance();
    }

    // /**
    //  * Sets the contents of the entity's armor
    //  * @param items the array of items
    //  */
    // public setArmorContents(items: ItemStack[]): void {}

    /**
     * Sets the boots worn by the entity
     * @param boots the boots
     */
    public setBoots(boots: ItemStack | null): void {
        this.toJava().setBoots(boots?.toJava() ?? null);
    }

    /**
     * Sets the chance of the leggings being dropped upon the entity's death
     * @param chance the drop chance
     */
    public setBootsDropChance(chance: number): void {
        this.toJava().setBootsDropChance(chance);
    }

    /**
     * Sets the chest plate worn by the entity
     * @param chestplate the chestplate item
     */
    public setChestplate(chestplate: ItemStack | null): void {
        this.toJava().setChestplate(chestplate?.toJava() ?? null);
    }

    /**
     * Sets the chance of the chestplate being dropped upon the entity's death
     * @param chance the drop chance
     */
    public setChestplateDropChance(chance: number): void {
        this.toJava().setChestplateDropChance(chance);
    }

    /**
     * Sets the helped being worn by the entity
     * @param helmet the helmet item
     */
    public setHelmet(helmet: ItemStack | null): void {
        this.toJava().setHelmet(helmet?.toJava() ?? null);
    }

    /**
     * Sets the chance of the helmet being dropped upon the entity's death
     * @param chance the drop chance
     */
    public setHelmetDropChance(chance: number): void {
        this.toJava().setHelmetDropChance(chance);
    }

    /**
     * Sets the item at a given equipment slot
     * @param slot the slot to set
     * @param item the item to set in the slot
     */
    public setItem(slot: EquipmentSlot, item: ItemStack | null): void {
        const javaEquipSlot = Java.resolve('org.bukkit.inventory.EquipmentSlot').valueOf(slot);
        if (!javaEquipSlot) return;
        this.toJava().setItem(javaEquipSlot, item?.toJava() ?? null);
    }

    /**
     * Sets the item in the entity's main hand
     * @param item the item to store in the hand
     */
    public setItemInMainHand(item: ItemStack | null): void {
        this.toJava().setItemInMainHand(item?.toJava() ?? null);
    }

    /**
     * Sets the chance of the main hand item being dropped upon the entity's death
     * @param chance the drop chance
     */
    public setItemInMainHandDropChance(chance: number): void {
        this.toJava().setItemInMainHandDropChance(chance);
    }

    /**
     * Sets the item in entity's off hand
     * @param item the item to store in the off hand
     */
    public setItemInOffHand(item: ItemStack | null): void {
        this.toJava().setItemInOffHand(item?.toJava() ?? null);
    }

    /**
     * Sets the chance of the off hand item being dropped upon the entity's death
     * @param chance the drop chance
     */
    public setItemInOffHandDropChance(chance: number): void {
        this.toJava().setItemInOffHandDropChance(chance);
    }

    /**
     * Sets the leggingsworn by the entity
     * @param leggings the item
     */
    public setLeggings(leggings: ItemStack | null): void {
        this.toJava().setLeggings(leggings?.toJava() ?? null);
    }

    /**
     * Sets the chance of the leggings being dropped upon the entity's death
     * @param chance the drop chance
     */
    public setLeggingsDropChance(chance: number): void {
        this.toJava().setLeggingsDropChance(chance);
    }

}

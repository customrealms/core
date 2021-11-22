import "../globals";
import { ToJava } from '../runtime/ToJava';
import { Enchantment } from "./Enchantment";
import { Material } from "./Material";

export class ItemStack implements ToJava {


    public static fromJava(_itemstack: Java.Value): ItemStack {
        return new ItemStack(_itemstack);
    }

    public static fromJavaNullable(_itemstack: Java.Value): ItemStack | null {
        return _itemstack == null ? null : ItemStack.fromJava(_itemstack);
    }

    /**
     * Deserializes an item stack from a representation
     * @param serialized the serialized string representation
     */
    public static deserialize(serialized: { [key: string]: any }): ItemStack | null {
        const javaItemStack = Java.resolve('org.bukkit.inventory.ItemStack').deserialize(serialized);
        if (!javaItemStack) return null;
        return new ItemStack(javaItemStack);
    }

    /**
     * Creates an item stack with a material and an amount
     * @param material the material for the stack
     * @param amount the amount of the material
     */
    public static create(material: Material, amount: number): ItemStack {
        const _itemstack = new (Java.resolve('org.bukkit.inventory.ItemStack'))(
            material.toJava(),
            amount,
        );
        return ItemStack.fromJava(_itemstack);
    }

    private constructor(
        private _itemstack: Java.Value,
    ) { }

    public toJava(): Java.Value {
        return this._itemstack;
    }

    /**
     * Creates a clone of this item stack
     */
    public clone(): ItemStack {
        const javaItemStack = this.toJava().clone();
        return ItemStack.fromJava(javaItemStack);
    }

    /**
     * Gets the amount of items in this stack
     */
    public getAmount(): number {
        return this.toJava()?.getAmount();
    }

    /**
     * Gets the maximum stack size for the material held in this item stack
     */
    public getMaxStackSize(): number {
        return this.toJava()?.getMaxStackSize();
    }

    /**
     * Gets the material in this item stack
     */
    public getMaterial(): Material {
        const javaMat = this.toJava()?.getType();
        return Material.fromJava(javaMat);
    }

    /**
     * Sets the type of material in this item stack
     * @param material the material
     */
    public setMaterial(material: Material): void {
        this.toJava().setType(material.toJava());
    }

    /**
     * Serializes the item stack to a representation
     */
    public serialize(): { [key: string]: any } {
        return this.toJava()?.serialize();
    }

    /**
     * Gets the display name for the item stack
     */
    public getDisplayName(): string {
        const meta = this.toJava()?.getItemMeta();
        if (!meta) return '';
        return meta.getDisplayName();
    }

    /**
     * Sets the display name for the item stack
     * @param name the display name
     */
    public setDisplayName(name: string): void {
        const meta = this.toJava().getItemMeta();
        if (!meta) return;
        meta.setDisplayName(name);
        this.toJava().setItemMeta(meta);
    }

    /**
     * Checks if this item stack is unbreakable
     */
    public isUnbreakable(): boolean {
        return this.toJava()?.isUnbreakable();
    }

    /**
     * Sets whether or not this item stack is unbreakable
     * @param unbreakable the unbreakable status
     */
    public setUnbreakable(unbreakable: boolean): void {
        this.toJava()?.setUnbreakable(unbreakable);
    }

    /**
     * Checks for the existence of custom model data
     */
    public hasCustomModelData(): boolean {
        return this.toJava()?.hasCustomModelData();
    }

    /**
     * Gets the custom model data for this item stack. Returns null if none
     * if currently set.
     */
    public getCustomModelData(): number | null {
        return this.toJava()?.getCustomModelData();
    }

    /**
     * Sets the custom model data for this item stack. Setting to null will
     * clear the custom model data
     * @param data the data value, or null to clear
     */
    public setCustomModelData(data: number | null): void {
        this.toJava()?.setCustomModelData(data);
    }

    /**
     * Checks if this item stack has any enchantments
     */
    public hasEnchantments(): boolean {
        return this.toJava()?.hasEnchantments();
    }

    /**
     * Checks if this item stack has an enchantment
     * @param ench the enchantment
     */
    public hasEnchantment(ench: Enchantment): boolean {
        return this.toJava()?.hasEnchantment(ench.toJava());
    }

    /**
     * Gets the level of an enchantment on this item stack
     * @param ench the enchantment
     */
    public getEnchantmentLevel(ench: Enchantment): number {
        return this.toJava()?.getEnchantmentLevel(ench.toJava());
    }

    /**
     * Gets all of the enchantments on this item stack
     */
    public getEnchantments(): Enchantment[] {
        return this.toJava()
            ?.getEnchantments()
            //@ts-ignore enchantment constructor is private so we can call it but not exposing it publicly
            .map((javaEnch: any) => new Enchantment(javaEnch));
    }

    /**
     * Adds an enchantment to this item stack
     * @param ench the enchantment to add
     * @param level the level for the enchantment
     * @param ignore_level_restrictions whether or not to ignore the level limit. Defaults to false
     */
    public addEnchantment(ench: Enchantment, level: number, ignore_level_restrictions?: boolean): void {
        const meta = this.toJava().getItemMeta();
        if (!meta) return;
        meta.addEnchant(
            ench.toJava(),
            level,
            ignore_level_restrictions ?? false
        );
        this.toJava().setItemMeta(meta);
    }

    /**
     * Checks if the specified enchantment conflicts with any enchantments on this item stack
     * @param ench the enchantment to check
     */
    public hasConflictingEnchant(ench: Enchantment): boolean {
        return this.toJava()?.hasConflictingEnchant((ench as any)._ench);
    }

}

import "../globals";
import { ToJava } from '../runtime/ToJava';
import { Enchantment } from "./Enchantment";
import { Material } from "./Material";

export class ItemStack implements ToJava {

    private _itemstack: any;

    public static deserialize(serialized: {[key: string]: any}): ItemStack | null {
        const javaItemStack = Java.resolve('org.bukkit.inventory.ItemStack').deserialize(serialized);
        if (!javaItemStack) return null;
        return new ItemStack(javaItemStack);
    }

    public constructor(...args: any[]) {
        if (args.length === 1) this._itemstack = args[0];
        else if (args.length === 2) {
            this._itemstack = new (Java.resolve('org.bukkit.inventory.ItemStack'))(
                (args[0] as Material).toJava(),
                (args[1] as number)
            );
        }
    }

    // public constructor(
    //     private _itemstack: any) {}

    public toJava(): any {
        return this._itemstack;
    }

    public clone(): ItemStack {
        const javaItemStack = this._itemstack.clone();
        return new ItemStack(javaItemStack);
    }

    public getAmount(): number {
        return this._itemstack?.getAmount();
    }

    public getMaxStackSize(): number {
        return this._itemstack?.getMaxStackSize();
    }

    public getMaterial(): Material {
        const javaMat = this._itemstack?.getType();
        return new Material(javaMat);
    }

    public setMaterial(material: Material): void {
        this._itemstack.setType(material.toJava());
    }

    public serialize(): {[key: string]: any} {
        return this._itemstack?.serialize();
    }

    public getDisplayName(): string {
        const meta = this.toJava()?.getItemMeta();
        if (!meta) return '';
        return meta.getDisplayName();
    }

    public setDisplayName(name: string): void {
        const meta = this.toJava().getItemMeta();
        if (!meta) return;
        meta.setDisplayName(name);
        this.toJava().setItemMeta(meta);
    }

    public isUnbreakable(): boolean {
        return this._itemstack?.isUnbreakable();
    }

    public setUnbreakable(unbreakable: boolean): void {
        this._itemstack?.setUnbreakable(unbreakable);
    }

    public hasCustomModelData(): boolean {
        return this._itemstack?.hasCustomModelData();
    }

    public getCustomModelData(): boolean | null {
        return this._itemstack?.getCustomModelData();
    }

    public setCustomModelData(data: number | null): void {
        this._itemstack?.setCustomModelData(data);
    }

    public hasEnchantments(): boolean {
        return this._itemstack?.hasEnchantments();
    }

    public hasEnchantment(ench: Enchantment): boolean {
        return this._itemstack?.hasEnchantment(ench.toJava());
    }

    public getEnchantmentLevel(ench: Enchantment): number {
        return this._itemstack?.getEnchantmentLevel(ench.toJava());
    }

    public getEnchantments(): Enchantment[] {
        return this._itemstack
            ?.getEnchantments()
            //@ts-ignore enchantment constructor is private so we can call it but not exposing it publicly
            .map((javaEnch: any) => new Enchantment(javaEnch));
    }

    public addEnchantment(ench: Enchantment, level: number, ignore_level_restrictions?: boolean): void {
        const meta = this.toJava().getItemMeta();
        if (!meta) return;
        meta.addEnchant(
            ench.toJava(),
            level,
            ignore_level_restrictions ?? false
        );
        this.toJava().setItemMeta(meta);
        // return this._itemstack?.addEnchantment(
        //     ench.toJava(),
        //     level,
        //     ignore_level_restrictions ?? false
        // );
    }

    public hasConflictingEnchant(ench: Enchantment): boolean {
        return this._itemstack?.hasConflictingEnchant((ench as any)._ench);
    }

}

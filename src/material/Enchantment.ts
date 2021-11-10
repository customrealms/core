import "../globals";
import { ToJava } from "../runtime/ToJava";
import { EnchantmentName } from "./EnchantmentName";
import { ItemStack } from "./ItemStack";

export class Enchantment implements ToJava {

    public static withName(name: EnchantmentName): Enchantment | null {
        if (!name || typeof name !== 'string') return null;
        const javaEnch = Java.resolve('org.bukkit.enchantments.Enchantment').getByName(name.toUpperCase());
        if (!javaEnch) return null;
        return new Enchantment(javaEnch);
    }

    public static getAllEnchantments(): Enchantment[] {
        const javaEnchs = Java.resolve('org.bukkit.enchantments.Enchantment').values();
        if (!javaEnchs) return [];
        return javaEnchs.map((e: any) => new Enchantment(e));
    }

    private constructor(
        private _ench: any) {}

    public toJava(): any {
        return this._ench;
    }

    public getName(): string {
        return this.toJava().getName();
    }

    public getMaxLevel(): number {
        return this.toJava().getMaxLevel();
    }

    public getStartLevel(): number {
        return this.toJava().getStartLevel();
    }

    public isTreasure(): boolean {
        return this.toJava().isTreasure();
    }

    public conflictsWith(other: Enchantment): boolean {
        if (!other) return false;
        const javaOther = other.toJava();
        return this.toJava().conflictsWith(javaOther);
    }

    public canEnchantItem(item: ItemStack): boolean {
        if (!item) return false;
        const javaItem = item.toJava();
        return this.toJava().canEnchantItem(javaItem);
    }

}

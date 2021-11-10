import "../globals";
import { ToJava } from "../runtime/ToJava";
import { EnchantmentName } from "./EnchantmentName";
import { ItemStack } from "./ItemStack";

export class Enchantment implements ToJava {

    public static fromJava(_ench: Java.Value): Enchantment {
        return new Enchantment(_ench);
    }

    /**
     * Gets an enchantment by its name
     * @param name the name of the enchantment
     */
    public static withName(name: EnchantmentName): Enchantment | null {
        if (!name || typeof name !== 'string') return null;
        const javaEnch = Java.resolve('org.bukkit.enchantments.Enchantment').getByName(name.toUpperCase());
        if (!javaEnch) return null;
        return Enchantment.fromJava(javaEnch);
    }

    /**
     * Gets all registered enchantments
     */
    public static getAllEnchantments(): Enchantment[] {
        const javaEnchs = Java.resolve('org.bukkit.enchantments.Enchantment').values();
        if (!javaEnchs) return [];
        return javaEnchs.map((e: any) => new Enchantment(e));
    }

    private constructor(
        private _ench: Java.Value,
    ) {}

    public toJava(): Java.Value {
        return this._ench;
    }

    /**
     * Gets the name of this enchantment
     */
    public getName(): string {
        return this.toJava().getName();
    }

    /**
     * Gets the maximum level that this enchantment may become
     */
    public getMaxLevel(): number {
        return this.toJava().getMaxLevel();
    }

    /**
     * Gets the level that this enchantment should start at
     */
    public getStartLevel(): number {
        return this.toJava().getStartLevel();
    }

    /**
     * Checks if this enchantment is a treasure enchantment. Treasure enchantments can only be received via
     * looting, trading, or fishing.
     */
    public isTreasure(): boolean {
        return this.toJava().isTreasure();
    }
    /**
     * Checks if this enchantment conflicts with another enchantment
     * @param other the other enchantment to check against
     */

    public conflictsWith(other: Enchantment): boolean {
        if (!other) return false;
        return this.toJava().conflictsWith(other.toJava());
    }

    /**
     * Checks if this enchantment may be applied to the given item stack
     * @param item the item to test
     */
    public canEnchantItem(item: ItemStack): boolean {
        if (!item) return false;
        return this.toJava().canEnchantItem(item.toJava());
    }

}

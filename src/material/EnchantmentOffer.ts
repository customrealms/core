import { Enchantment } from "..";
import { ToJava } from "../runtime/ToJava";

export class EnchantmentOffer implements ToJava {

  private constructor(
    protected _java: Java.Value,
  ) { }

  public static fromJava(java: Java.Value): EnchantmentOffer {
    return new EnchantmentOffer(java);
  }

  public toJava(): Java.Value {
    return this._java;
  }

  /**
   * Get the type of the enchantment.
   */
  getEnchantment(): Enchantment {
    return Enchantment.fromJava(this.toJava().getEnchantment());
  }

  /**
   * Sets the type of the enchantment.
   */
  setEnchantment(enchantment: Enchantment): void {
    this.toJava().setEnchantment(enchantment.toJava());
  }

  /**
   * Gets the level of the enchantment.
   */
  getEnchantmentLevel(): number {
    return this.toJava().getEnchantmentLevel();
  }

  /**
   * Sets the level of the enchantment.
   */
  setEnchantmentLevel(level: number): void {
    this.toJava().setEnchantmentLevel(level);
  }

  /**
   * Gets the cost (minimum level) which is displayed as a number on the right hand side of the enchantment offer.
   */
  getCost(): number {
    return this.toJava().getCost();
  }

  /**
   * Sets the cost (minimum level) which is displayed as a number on the right hand side of the enchantment offer.
   */
  setCost(cost: number): void {
    this.toJava().setCost(cost);
  }
}
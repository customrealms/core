import '../globals';
import { ToJava } from '../runtime/ToJava';
import { EnchantmentName } from './EnchantmentName';
import { ItemStack } from './ItemStack';

const JAVA_ENCHANTMENT = Java.resolve('org.bukkit.enchantments.Enchantment');

export class Enchantment implements ToJava {
	public static readonly ARROW_DAMAGE: Enchantment = Enchantment.fromJava(
		JAVA_ENCHANTMENT.ARROW_DAMAGE
	);
	public static readonly ARROW_FIRE: Enchantment = Enchantment.fromJava(
		JAVA_ENCHANTMENT.ARROW_FIRE
	);
	public static readonly ARROW_INFINITE: Enchantment = Enchantment.fromJava(
		JAVA_ENCHANTMENT.ARROW_INFINITE
	);
	public static readonly ARROW_KNOCKBACK: Enchantment = Enchantment.fromJava(
		JAVA_ENCHANTMENT.ARROW_KNOCKBACK
	);
	public static readonly BINDING_CURSE: Enchantment = Enchantment.fromJava(
		JAVA_ENCHANTMENT.BINDING_CURSE
	);
	public static readonly CHANNELING: Enchantment = Enchantment.fromJava(
		JAVA_ENCHANTMENT.CHANNELING
	);
	public static readonly DAMAGE_ALL: Enchantment = Enchantment.fromJava(
		JAVA_ENCHANTMENT.DAMAGE_ALL
	);
	public static readonly DAMAGE_ARTHROPODS: Enchantment =
		Enchantment.fromJava(JAVA_ENCHANTMENT.DAMAGE_ARTHROPODS);
	public static readonly DAMAGE_UNDEAD: Enchantment = Enchantment.fromJava(
		JAVA_ENCHANTMENT.DAMAGE_UNDEAD
	);
	public static readonly DEPTH_STRIDER: Enchantment = Enchantment.fromJava(
		JAVA_ENCHANTMENT.DEPTH_STRIDER
	);
	public static readonly DIG_SPEED: Enchantment = Enchantment.fromJava(
		JAVA_ENCHANTMENT.DIG_SPEED
	);
	public static readonly DURABILITY: Enchantment = Enchantment.fromJava(
		JAVA_ENCHANTMENT.DURABILITY
	);
	public static readonly FIRE_ASPECT: Enchantment = Enchantment.fromJava(
		JAVA_ENCHANTMENT.FIRE_ASPECT
	);
	public static readonly FROST_WALKER: Enchantment = Enchantment.fromJava(
		JAVA_ENCHANTMENT.FROST_WALKER
	);
	public static readonly IMPALING: Enchantment = Enchantment.fromJava(
		JAVA_ENCHANTMENT.IMPALING
	);
	public static readonly KNOCKBACK: Enchantment = Enchantment.fromJava(
		JAVA_ENCHANTMENT.KNOCKBACK
	);
	public static readonly LOOT_BONUS_BLOCKS: Enchantment =
		Enchantment.fromJava(JAVA_ENCHANTMENT.LOOT_BONUS_BLOCKS);
	public static readonly LOOT_BONUS_MOBS: Enchantment = Enchantment.fromJava(
		JAVA_ENCHANTMENT.LOOT_BONUS_MOBS
	);
	public static readonly LOYALTY: Enchantment = Enchantment.fromJava(
		JAVA_ENCHANTMENT.LOYALTY
	);
	public static readonly LUCK: Enchantment = Enchantment.fromJava(
		JAVA_ENCHANTMENT.LUCK
	);
	public static readonly LURE: Enchantment = Enchantment.fromJava(
		JAVA_ENCHANTMENT.LURE
	);
	public static readonly MENDING: Enchantment = Enchantment.fromJava(
		JAVA_ENCHANTMENT.MENDING
	);
	public static readonly MULTISHOT: Enchantment = Enchantment.fromJava(
		JAVA_ENCHANTMENT.MULTISHOT
	);
	public static readonly OXYGEN: Enchantment = Enchantment.fromJava(
		JAVA_ENCHANTMENT.OXYGEN
	);
	public static readonly PIERCING: Enchantment = Enchantment.fromJava(
		JAVA_ENCHANTMENT.PIERCING
	);
	public static readonly PROTECTION_ENVIRONMENTAL: Enchantment =
		Enchantment.fromJava(JAVA_ENCHANTMENT.PROTECTION_ENVIRONMENTAL);
	public static readonly PROTECTION_EXPLOSIONS: Enchantment =
		Enchantment.fromJava(JAVA_ENCHANTMENT.PROTECTION_EXPLOSIONS);
	public static readonly PROTECTION_FALL: Enchantment = Enchantment.fromJava(
		JAVA_ENCHANTMENT.PROTECTION_FALL
	);
	public static readonly PROTECTION_FIRE: Enchantment = Enchantment.fromJava(
		JAVA_ENCHANTMENT.PROTECTION_FIRE
	);
	public static readonly PROTECTION_PROJECTILE: Enchantment =
		Enchantment.fromJava(JAVA_ENCHANTMENT.PROTECTION_PROJECTILE);
	public static readonly QUICK_CHARGE: Enchantment = Enchantment.fromJava(
		JAVA_ENCHANTMENT.QUICK_CHARGE
	);
	public static readonly RIPTIDE: Enchantment = Enchantment.fromJava(
		JAVA_ENCHANTMENT.RIPTIDE
	);
	public static readonly SILK_TOUCH: Enchantment = Enchantment.fromJava(
		JAVA_ENCHANTMENT.SILK_TOUCH
	);
	public static readonly SOUL_SPEED: Enchantment = Enchantment.fromJava(
		JAVA_ENCHANTMENT.SOUL_SPEED
	);
	public static readonly SWEEPING_EDGE: Enchantment = Enchantment.fromJava(
		JAVA_ENCHANTMENT.SWEEPING_EDGE
	);
	public static readonly SWIFT_SNEAK: Enchantment = Enchantment.fromJava(
		JAVA_ENCHANTMENT.SWIFT_SNEAK
	);
	public static readonly THORNS: Enchantment = Enchantment.fromJava(
		JAVA_ENCHANTMENT.THORNS
	);
	public static readonly VANISHING_CURSE: Enchantment = Enchantment.fromJava(
		JAVA_ENCHANTMENT.VANISHING_CURSE
	);
	public static readonly WATER_WORKER: Enchantment = Enchantment.fromJava(
		JAVA_ENCHANTMENT.WATER_WORKER
	);

	public static fromJava(_ench: Java.Value): Enchantment {
		return new Enchantment(_ench);
	}

	/**
	 * Gets an enchantment by its name
	 * @param name the name of the enchantment
	 */
	public static withName(name: EnchantmentName): Enchantment | null {
		if (!name || typeof name !== 'string') return null;
		const javaEnch = JAVA_ENCHANTMENT.getByName(name.toUpperCase());
		if (!javaEnch) return null;
		return Enchantment.fromJava(javaEnch);
	}

	/**
	 * Gets all registered enchantments
	 */
	public static getAllEnchantments(): Enchantment[] {
		const javaEnchs = JAVA_ENCHANTMENT.values();
		if (!javaEnchs) return [];
		return javaEnchs.map((e: any) => new Enchantment(e));
	}

	private constructor(private _ench: Java.Value) {}

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

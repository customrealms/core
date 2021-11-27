import '../globals'
import { ToJava } from '../runtime/ToJava'
import { PotionEffect } from './PotionEffect'
import { PotionEffectName } from './PotionEffectName'

export class PotionEffectType implements ToJava {
	public static fromJava(_java: Java.Value): PotionEffectType {
		return new PotionEffectType(_java)
	}

	/**
	 *Gets a potion effect type by its name
	 * @param name the name of the potion effect type
	 */
	public static withName(
		name: PotionEffectName | string
	): PotionEffectType | null {
		const javaEffectType = Java.resolve(
			'org.bukkit.potion.PotionEffectType'
		).getByName(name)
		if (!javaEffectType) return null
		return PotionEffectType.fromJava(javaEffectType)
	}

	private constructor(private _java: Java.Value) {}

	public toJava(): Java.Value {
		return this._java
	}

	/**
	 * Creates a PotionEffect from this effect type
	 * @param duration the duration of the effect
	 * @param amplifier the amplifier of the amplifier
	 */
	public createEffect(duration: number, amplifier: number): PotionEffect {
		const javaEffect = this.toJava().createEffect(duration, amplifier)
		return PotionEffect.fromJava(javaEffect)
	}

	/**
	 * Gets the name of this potion effect type
	 */
	public getName(): string {
		return this.toJava().getName().toLowerCase()
	}

	/**
	 * Checks whether or not this type of effect happens once, immediately
	 */
	public isInstant(): boolean {
		return this.toJava().getName()
	}
}

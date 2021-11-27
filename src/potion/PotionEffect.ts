import '../globals';
import { ToJava } from '../runtime/ToJava';
import { PotionEffectType } from './PotionEffectType';

export class PotionEffect implements ToJava {
	public static fromJava(_java: Java.Value): PotionEffect {
		return new PotionEffect(_java);
	}

	/**
	 * Constructs a new potion effect instance
	 * @param type the type of potion effect
	 * @param duration the duration of the effect
	 * @param amplifier the amplifier amount for the effect
	 * @param ambient makes the effect produce more particles
	 * @param particles whether or not to emit particles
	 * @param icon whether ot not the effect has an icon
	 */
	public static create(
		type: PotionEffectType,
		duration: number,
		amplifier: number,
		ambient: boolean = true,
		particles: boolean = true,
		icon: boolean = true
	): PotionEffect {
		const _java = new (Java.resolve('org.bukkit.potion.PotionEffect'))(
			type.toJava(),
			duration,
			amplifier,
			ambient,
			particles,
			icon
		);
		return PotionEffect.fromJava(_java);
	}

	/**
	 * Constructs a potion effect from its java instance
	 * @param _java the underlying Java instance
	 */
	private constructor(private _java: Java.Value) {}

	public toJava(): Java.Value {
		return this._java;
	}

	/**
	 * Gets the type of the potion effect
	 */
	public getType(): PotionEffectType {
		const javaType = this.toJava().getType();
		return PotionEffectType.fromJava(javaType);
	}

	/**
	 * Gets the duration in ticks that the potion effect will run when
	 * applied to a living entity
	 */
	public getDuration(): number {
		return this.toJava().getDuration();
	}

	/**
	 * Checks if this potion effect displays an icon to the player
	 */
	public hasIcon(): boolean {
		return this.toJava().hasIcon();
	}

	/**
	 * Checks if this potion effect emits particles
	 */
	public hasParticles(): boolean {
		return this.toJava().hasParticles();
	}

	/**
	 * Checks if this potion effect produces more particles
	 */
	public isAmbient(): boolean {
		return this.toJava().isAmbient();
	}
}

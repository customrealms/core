import { Extends } from '../../runtime/Extends';
import { ToJava } from '../../runtime/ToJava';
import { Entity } from './Entity';

export interface LightningStrike extends Entity {}

/**
 * Represents an instance of a lightning strike. May or may not do damage.
 */
@Extends(Entity)
export class LightningStrike implements ToJava {
	/**
	 * Constructs a wrapped entity value from the underlying Java instance of the entity
	 * @param _lightning the underlying Java value
	 * @returns the wrapped entity value
	 */
	public static fromJava(_lightning: Java.Value): LightningStrike {
		return new LightningStrike(_lightning);
	}

	private constructor(private _lightning: Java.Value) {}

	/**
	 * Gets the underlying Java instance of the entity
	 * @returns the underlying Java value
	 */
	public toJava(): Java.Value {
		return this._lightning;
	}

	/**
	 * Returns whether the strike is an effect that does no damage.
	 */
	public isEffect(): boolean {
		return this.toJava().isEffect();
	}
}

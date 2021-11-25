import { Entity } from '../Entity';

/**
 * Represents an instance of a lightning strike.May or may not do damage.
 */
export interface LightningStrike extends Entity {
    /**
     * Returns whether the strike is an effect that does no damage
     * @returns whether the strike is an effect
     */
    isEffect(): boolean;
}
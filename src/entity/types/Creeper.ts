import { Creature, Monster } from '.';
import { Extends } from '../../runtime/Extends';
import { ToJava } from '../../runtime/ToJava';

export interface Creeper extends Monster {}

/**
 * Represents a Creeper.
 */
@Extends(Monster)
export class Creeper implements ToJava {

    /**
     * Checks if this Creeper is powered (electrocuted).
     */
    public isPowered(): boolean {
        return this.toJava().isPowered();
    }

    /**
     * Sets the powered status of this Creeper
     * @param value new powered status
     */
    public setPowered(value: boolean): void {
        this.toJava().setPowered(value);
    }

    /**
     * Set the maximum fuse ticks for this Creeper, where the maximum ticks is the amount of time in which a creeper is allowed to be in the primed state before exploding.
     * @param ticks the new maximum fuse ticks
     */
    public setMaxFuseTicks(ticks: number): void {
        this.toJava().setMaxFuseTicks(ticks);
    }

    /**
     * Get the maximum fuse ticks for this Creeper, where the maximum ticks is the amount of time in which a creeper is allowed to be in the primed state before exploding.
     */
    public getMaxFuseTicks(): number {
        return this.toJava().getMaxFuseTicks();
    }

    /**
     * Set the fuse ticks for this Creeper, where the ticks is the amount of time in which a creeper has been in the primed state.
     * @param ticks the new fuse ticks
     */
    public setFuseTicks(ticks: number): void {
        this.toJava().setFuseTicks(ticks);
    }

    /**
     * Get the maximum fuse ticks for this Creeper, where the ticks is the amount of time in which a creeper has been in the primed state.
     */
    public getFuseTicks(): number {
        return this.toJava().getFuseTicks();
    }

    /**
     * Set the explosion radius in which this Creeper's explosion will affect.
     * @param radius the new explosion radius
     */
    public setExplosionRadius(radius: number): void {
        this.toJava().setExplosionRadius(radius);
    }

    /**
     * Get the explosion radius in which this Creeper's explosion will affect.
     */
    public getExplosionRadius(): number {
        return this.toJava().getExplosionRadius();
    }

    /**
     * Makes this Creeper explode instantly. The resulting explosion can be cancelled by an ExplosionPrimeEvent and obeys the mob griefing gamerule.
     */
    public explode(): void {
        this.toJava().explode();
    }

    /**
     * Ignites this Creeper, beginning its fuse. The amount of time the Creeper takes to explode will depend on what setMaxFuseTicks(int) is set as. The resulting explosion can be cancelled by an ExplosionPrimeEvent and obeys the mob griefing gamerule.
     */
    public ignite(): void {
        this.toJava().ignite();
    }

}

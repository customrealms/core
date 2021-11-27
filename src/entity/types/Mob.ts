import { Extends } from '../../runtime/Extends';
import { ToJava } from '../../runtime/ToJava';
import { ConstructEntity } from '../EntityConstructors';
import { LivingEntity } from './LivingEntity';
import { Lootable } from './Lootable';

export interface Mob extends LivingEntity, Lootable {}

/**
 * Represents a Mob. Mobs are living entities with simple AI.
 */
@Extends(LivingEntity, Lootable)
export class Mob implements ToJava {

    /**
     * Instructs this Mob to set the specified LivingEntity as its target.
     * Hostile creatures may attack their target, and friendly creatures may follow their target.
     * @param target new LivingEntity to target, or null to clear the target
     */
    public setTarget(target: LivingEntity | null): void {
        this.toJava().setTarget(target?.toJava() ?? null);
    }

    /**
     * Gets the current target of this mob
     */
    public getTarget(): LivingEntity | null {
        const javaTarget = this.toJava().getTarget();
        if (!javaTarget) return null;
        return ConstructEntity<LivingEntity>(javaTarget);
    }

    /**
     * Sets whether this mob is aware of its surroundings. Unaware mobs will still move if pushed, attacked, etc. but will not move or perform any actions on their own. Unaware mobs may also have other unspecified behaviours disabled, such as drowning.
     * @param aware whether the mob is aware
     */
    public setAware(aware: boolean): void {
        this.toJava().setAware(aware);
    }

    /**
     * Gets whether this mob is aware of its surroundings. Unaware mobs will still move if pushed, attacked, etc. but will not move or perform any actions on their own. Unaware mobs may also have other unspecified behaviours disabled, such as drowning.
     */
    public isAware(): boolean {
        return this.toJava().isAware();
    }

}

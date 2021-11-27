import { EntityDamageCause } from '../../../entity/EntityDamageCause';
import { Cancellable } from '../../Cancellable';
import { EntityEvent } from './EntityEvent';

export class EntityDamageEvent extends EntityEvent implements Cancellable {
	/**
	 * Gets the cause of the damage to the entity
	 */
	public getCause(): EntityDamageCause {
		return this.toJava().getCause().name();
	}

	/**
	 * Gets the amount of damage inflicted on the entity
	 */
	public getDamage(): number {
		return this.toJava().getDamage();
	}

	/**
	 * Sets the raw amount of damage for the event
	 * @param damage the amount of damage
	 */
	public setDamage(damage: number): void {
		this.toJava().setDamage(damage);
	}

	/**
	 * Gets the total health reduced from the entity after all reducers
	 * are calculated for the event
	 */
	public getFinalDamage(): number {
		return this.toJava().getFinalDamage();
	}

	public setCancelled(cancel: boolean): void {
		this.toJava().setCancelled(cancel);
	}

	public isCancelled(): boolean {
		return this.toJava().isCancelled();
	}
}

import { Event } from '../Event'
import { World } from '../../../world/World'

/** Represents a Weather-related event */
export class WeatherEvent extends Event {
	/**
	 * Returns the World where this event is ocurring
	 * @returns World this event is ocurring in
	 */
	public getWorld(): World {
		return World.fromJava(this.toJava().getWorld())
	}
}

import { World } from '../../../world/World';
import { Event } from '../Event';

export class WorldEvent extends Event {
	/**
	 * Gets the world primarily involved with this event
	 * @returns which caused this event
	 */
	public getWorld(): World {
		return World.fromJava(this.toJava().getWorld());
	}
}

import '../globals';
import { World } from './World';

export class Worlds {
	/**
	 * Gets all the available worlds of the server
	 * @returns the array of all available worlds
	 */
	public static getWorlds(): World[] {
		return (
			Java.resolve('org.bukkit.Bukkit')
				?.getWorlds()
				?.map((p: Java.Value) => World.fromJava(p)) ?? []
		);
	}
}

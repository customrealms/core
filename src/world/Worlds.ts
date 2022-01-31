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

	/**
	 * Gets the world with the given UUID string
	 * @param uuid the uuid string of the world
	 * @returns the world, if found, or null
	 */
	public static getWorldByUUID(uuid: string): World | null {
		const world = Java.resolve('org.bukkit.Bukkit').getWorld(
			Java.resolve('java.util.UUID').fromString(uuid)
		);

		if (!world) return null;

		return World.fromJava(world);
	}

	/**
	 * Gets the world by providing the name
	 * @param name the name of the world, e.g. "world_nether"
	 * @returns the world, if found, or null
	 */
	public static getWorldByName(name: string): World | null {
		const world = Java.resolve('org.bukkit.Bukkit').getWorld(name);

		if (!world) return null;

		return World.fromJava(world);
	}
}

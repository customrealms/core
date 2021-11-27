import '../globals'
import { Player } from '../player/Player'

export class Players {
	/**
	 * Gets all of the players currently on the server
	 * @returns the array of all online players
	 */
	public static getPlayers(): Player[] {
		return (
			Java.resolve('org.bukkit.Bukkit')
				?.getOnlinePlayers()
				?.map((p: Java.Value) => Player.fromJava(p)) ?? []
		)
	}

	/**
	 * Gets the player with the given UUID string
	 * @param uuid the uuid string of the player
	 * @returns the player, if found, or null
	 */
	public static getPlayerByUUID(uuid: string): Player | null {
		const p = Java.resolve('org.bukkit.Bukkit').getPlayer(
			Java.resolve('java.util.UUID').fromString(uuid)
		)
		if (!p) return null
		return Player.fromJava(p)
	}

	/**
	 * Gets the player with the given username string
	 * @param username the username to look for
	 * @param exact whether or not to match the username exactly, or just prefix
	 * @returns the player found, or null if none was found
	 */
	public static getPlayerByUsername(
		username: string,
		exact: boolean = false
	): Player | null {
		const p = exact
			? Java.resolve('org.bukkit.Bukkit').getPlayerExact(username)
			: Java.resolve('org.bukkit.Bukkit').getPlayer(username)
		if (!p) return null
		return Player.fromJava(p)
	}
}

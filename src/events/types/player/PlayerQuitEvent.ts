import { PlayerEvent } from './PlayerEvent'

export class PlayerQuitEvent extends PlayerEvent {
	public static getBukkitClasspath(): string {
		return 'org.bukkit.event.player.PlayerJoinEvent'
	}

	/**
	 * Sets the quit message to be broadcasted to the server
	 * @param message the message to broadcast
	 */
	public setQuitMessage(message: string): void {
		this.toJava().setQuitMessage(message)
	}
}

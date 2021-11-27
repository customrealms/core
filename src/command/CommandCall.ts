import { Player } from '../player/Player'
import { Players } from '../player/Players'

export class CommandCall {
	public constructor(
		private player: Player,
		private placeholders: { [key: string]: string },
		private pattern: string
	) {}

	/**
	 * Gets the player instance for the command call
	 * @return the player calling the command
	 */
	public getPlayer(): Player | undefined {
		// Return the player instance
		return this.player
	}

	/**
	 * Gets the pattern for the command call
	 * @return the pattern string
	 */
	public getPattern(): string | undefined {
		// Return the pattern
		return this.pattern
	}

	/**
	 * Gets the map of placeholder values in the command call
	 * @return the placeholder values
	 */
	public getPlaceholders(): { [key: string]: string } | undefined {
		// Return the placeholders
		return this.placeholders
	}

	/**
	 * Gets the value for a placeholder in the command call
	 * @param key the key for the placeholder
	 * @return the value for the placeholder
	 */
	public getPlaceholder(key: string): string | undefined {
		// Return the value
		return this.placeholders?.[key] ?? undefined
	}

	public getPlayerPlaceholder(key: string): Player | null | undefined {
		// Get the placeholder value
		const username: string | undefined = this.getPlaceholder(key)
		if (!username) return undefined

		// Get the player with the username
		return Players.getPlayerByUsername(username)
	}

	public getNumericPlaceholder(key: string): number | null | undefined {
		// Get the placeholder value
		const value: string | undefined = this.getPlaceholder(key)
		if (!value) return undefined

		try {
			// Parse the value
			const num: number = parseFloat(value)

			// If the value is not finite
			if (!isFinite(num)) return null
			if (isNaN(num)) return null

			// Return the number
			return num
		} catch (err) {
			// Return null if there's an error
			return null
		}
	}
}

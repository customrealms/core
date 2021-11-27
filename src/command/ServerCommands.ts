import { Player } from '../player/Player'
import { Players } from '../player/Players'
import { CommandCall } from './CommandCall'
import { CommandRunner } from './CommandRunner'

export interface CommandHandle {
	release(): void
}

/**
 * The type for command functions
 */
export type CommandFn = (
	player: Player,
	call: CommandCall
) => void | Promise<void>

export class ServerCommands {
	/**
	 * The count of handlers
	 */
	private static root_handle: number | null = null

	/**
	 * The array of registered command runners
	 */
	private static command_runners: CommandRunner[] = []

	public static register(pattern: string, handler: CommandFn): CommandHandle
	public static register(
		patterns: string[],
		handler: CommandFn
	): CommandHandle

	public static register(
		p: string | string[],
		handler: CommandFn
	): CommandHandle {
		// If there are no handlers
		if (this.root_handle === null) {
			this.root_register()
		}

		// Normalize the patterns to an array
		const patterns = Array.isArray(p) ? p : [p]

		// Register the command runner
		const runner = new CommandRunner(patterns, handler)
		this.command_runners.push(runner)

		// Return a handle to remove the
		return {
			release: () => {
				// Remove the runner from the array
				const index = this.command_runners.indexOf(runner)
				if (index > -1) this.command_runners.splice(index, 1)

				// If there are no more runners
				if (this.command_runners.length === 0 && this.root_handle) {
					BukkitCommands.unregister(this.root_handle)
					this.root_handle = null
				}
			},
		}
	}

	/**
	 * Registers the root event handler
	 */
	private static root_register(): void {
		// Register the root handler
		this.root_handle = BukkitCommands.register((_player, message) => {
			// Wrap the player instance
			const player = Player.fromJava(_player)

			// Attempt to run the command
			for (const command of this.command_runners) {
				if (command.attemptExecute(player, message)) return true
			}

			// The command wasn't handled
			return false
		})
	}
}

import { CommandCall } from './CommandCall';
import { CommandParser } from './parser/CommandParser';
import { ICommandPattern } from './parser/CommandPattern';
import { CommandFn } from './ServerCommands';

export class CommandRunner {
	/**
	 * The regular expressions for the command patterns
	 */
	private variations: ICommandPattern[];

	public constructor(
		patterns: string[],
		private command_instance: CommandFn
	) {
		// Loop though the patterns
		this.variations = patterns.map((pattern) => {
			// Parse the command and return the pattern
			const parser = new CommandParser(pattern);
			return parser.parse();
		});
	}

	/**
	 * Attempts to execute the command
	 * @param player the player running the command
	 * @param message the message being executed
	 */
	public attemptExecute(player: org.bukkit.entity.Player, message: string): boolean {
		// Get the matching call
		const call: CommandCall | null = this.getMatchingCommandCall(
			player,
			message
		);
		if (!call) return false;

		// Execute the command
		this.command_instance(player, call);

		// Return true because it matches
		return true;
	}

	private getMatchingCommandCall(
		player: org.bukkit.entity.Player,
		message: string
	): CommandCall | null {
		// Loop through the patterns
		for (let i = 0; i < this.variations.length; i++) {
			// Get the variation
			const variation: ICommandPattern = this.variations[i];

			// Check that there is a regex pattern
			if (!variation.regex) continue;

			// Match against the message
			const match: RegExpMatchArray | null = message.match(
				variation.regex
			);
			if (!match) continue;

			// Create the map for the placeholder values
			const placeholders: { [key: string]: string } = {};

			// Loop through the placeholder names
			let j = 0;
			while (j < variation.placeholder_names.length) {
				// Get the placeholder name
				const key: string = variation.placeholder_names[j];

				// Get the values, or default
				const value: string | null =
					match[j + 1] ??
					variation.default_placeholder_values[key] ??
					null;

				// Add the set to the map
				placeholders[key] = value;

				// Increment the count
				j++;
			}

			// Create the command call object
			const call: CommandCall = new CommandCall(
				player,
				placeholders,
				variation.pattern_string
			);

			// Return the command call
			return call;
		}

		// Return unsuccessfully
		return null;
	}
}

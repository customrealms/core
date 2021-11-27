import { Player } from '../player/Player';
import { CommandCall } from './CommandCall';
import { CommandParser } from './parser/CommandParser';
import { ICommandPattern } from './parser/CommandPattern';
import { CommandFn } from './ServerCommands';

export class CommandRunner {
	/**
	 * The name of the command
	 */
	private name: string | null = null;

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
			// Create the command parser
			const parser = new CommandParser(pattern);

			// Get the command name
			this.name = parser.getCommandName();

			// Parse the command and return the pattern
			return parser.parse();
		});
	}

	/**
	 * Attempts to execute the command
	 * @param player the player running the command
	 * @param message the message being executed
	 */
	public attemptExecute(player: Player, message: string): boolean {
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
		player: Player,
		message: string
	): CommandCall | null {
		// Loop through the patterns
		for (let i = 0; i < this.variations.length; i++) {
			// Get the variation
			const variation: ICommandPattern = this.variations[i];

			// Match against the message
			const match: RegExpMatchArray | null = message.match(
				variation.regex!
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

	/**
	 * Gets the name of this command
	 */
	public getName(): string | null {
		return this.name;
	}

	/**
	 * Gets the description of this command
	 */
	public getDescription(): string | null {
		return null;
	}

	/**
	 * Gets the usage strings for this command
	 */
	public getUsages(): string[] {
		return this.variations
			.map((variation) => variation.usage)
			.filter((usage): usage is string => !!usage);
	}
}

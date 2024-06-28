import { arrayFromJava } from '../java';
import { CommandCall } from './command-call';
import { CommandPattern, parseCommandPattern } from './pattern';

/**
 * The type for command functions
 */
export type CommandFn = (
	sender: org.bukkit.command.CommandSender,
	call: CommandCall
) => void | Promise<void>;

type CommandRunner = (
	sender: org.bukkit.command.CommandSender,
	label: string,
	args: string[]
) => boolean;

export class ServerCommands {
	/**
	 * Map of command name to handlers.
	 */
	private static handlers: { [key: string]: CommandRunner[] } = {};

	/**
	 * Registers a command handler.
	 * @param pattern the command pattern to register
	 * @param handler the handler for the command
	 * @returns true if the command was registered, false if it was not
	 */
	public static register(pattern: string, handler: CommandFn): boolean {
		// Parse the pattern
		const parsedPattern = parseCommandPattern(pattern);

		// Get or create the handler array for this command name
		const runners = this.createExecutor(parsedPattern.name);
		if (!runners) return false;

		// Add the command runner to the array
		runners.push(createRunner(parsedPattern, handler));
		return true;
	}

	private static createExecutor(name: string): CommandRunner[] | null {
		if (name in this.handlers) return this.handlers[name];

		const runners: CommandRunner[] = [];
		this.handlers[name] = runners;

		// Create the executor for this command name
		const ok = __commands_register(name, (sender, label, args) => {
			const argsArray = arrayFromJava(args);
			if (!runners) return false;
			for (const runner of runners) {
				if (runner(sender, label, argsArray)) {
					return true;
				}
			}
			return false;
		});
		if (!ok) {
			console.error(
				`Failed to register command: ${name}. Make sure it's in your plugin.yml.`
			);
			return null;
		}
		return runners;
	}
}

function createRunner(
	pattern: CommandPattern,
	handler: CommandFn
): CommandRunner {
	return (sender, label, args) => {
		// Attempt to match the arguments to fill the placeholders
		const placeholders = pattern.match(args);
		if (!placeholders) return false;

		// Execute the command
		handler(sender, new CommandCall(sender, label, placeholders));
		return true;
	};
}

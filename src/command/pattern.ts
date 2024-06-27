import { parsePlaceholder, PlaceholderType } from './placeholder';

export interface CommandPattern {
	name: string;
	match(args: string[]): { [key: string]: string } | null;
}

interface ArgPattern {
	match(
		args: string[],
		i: number,
		placeholders: { [key: string]: string }
	): number | null;
}

/**
 * Parses a command pattern string
 */
export function parseCommandPattern(pattern: string): CommandPattern {
	// Parse the pattern into command name and arguments
	const match = pattern.match(/^\/([^\s]+)(\s+.+)?/);
	if (!match) throw new Error(`Invalid command pattern: ${pattern}`);
	const [, name, args] = match;

	// Default the args to an empty string
	const argsString = (args ?? '').trim();
	const argsParts = argsString === '' ? [] : argsString.split(/\s+/g);

	// Parse the patterns for each argument
	const arg_patterns: ArgPattern[] = argsParts.map(parseArgPattern);

	// Return the full object
	return {
		name: name,
		match: matchPattern(arg_patterns),
	};
}

// Define the pattern for all the types
const type_patterns: { [key in PlaceholderType]: RegExp } = {
	[PlaceholderType.STRING]: /^\S+$/,
	[PlaceholderType.NUMBER]: /^\d+(?:\.\d+)?$/,
	[PlaceholderType.PLAYER]: /^\S+$/,
	[PlaceholderType.WORLD]: /^\S+$/,
};

function parseArgPattern(part: string): ArgPattern {
	// Construct a placeholder from the part
	const placeholder = parsePlaceholder(part);

	// If it's a constant string, not a placeholder
	if (typeof placeholder === 'string') {
		return {
			match: (args: string[], i: number) => (args[i] === part ? 1 : 0),
		};
	}

	return {
		match: (
			args: string[],
			i: number,
			placeholders: { [key: string]: string }
		) => {
			// If the argument is out of bounds
			if (i >= args.length) {
				if (!placeholder.optional) {
					return null;
				}
				if (placeholder.defaultValue) {
					placeholders[placeholder.name] = placeholder.defaultValue;
				}
				return 0;
			}

			// If it's multipart, take the rest of the arguments
			if (placeholder.multipart) {
				const parts = args.slice(i);
				if (parts.length === 0) return null;
				placeholders[placeholder.name] = parts.join(' ');
				return parts.length;
			}

			// Get the regex pattern for the argument
			const pattern = type_patterns[placeholder.type];

			// If the argument matches the pattern
			if (pattern.test(args[i])) {
				placeholders[placeholder.name] = args[i];
				return 1;
			}

			// If the argument has a default value
			if (placeholder.defaultValue) {
				placeholders[placeholder.name] = placeholder.defaultValue;
			}
			return 0;
		},
	};
}

function matchPattern(arg_patterns: ArgPattern[]) {
	return (args: string[]): { [key: string]: string } | null => {
		const placeholders: { [key: string]: string } = {};
		let i = 0;
		for (const pattern of arg_patterns) {
			const consumed = pattern.match(args, i, placeholders);
			if (consumed === null) return null;
			i += consumed;
		}
		if (i < args.length) return null;
		return placeholders;
	};
}

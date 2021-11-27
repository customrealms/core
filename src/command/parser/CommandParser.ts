import { ICommandPattern } from './CommandPattern';
import { PlaceholderParser, PlaceholderType } from './PlaceholderParser';

export class CommandParser {
	/**
	 * Constructs a command parser from a pattern string
	 * @param pattern the pattern string for the command
	 */
	public constructor(private pattern: string) {}

	/**
	 * Parses the command pattern string to a regex string
	 * @return the corresponding regex value
	 */
	public parse(): ICommandPattern {
		// Create the output pattern data objecg
		const pattern_data: ICommandPattern = {
			pattern_string: this.pattern,
			regex: null,
			placeholder_names: [],
			default_placeholder_values: {},
		};

		// Split the pattern by whitespace
		const pattern_parts: string[] = this.pattern.split(/\s+/g);

		// Create an array for the regex parts
		const regex_parts: string[] = [];

		// Count the number of optionals
		let optional_count = 0;

		// Loop through the parts
		for (let i = 0; i < pattern_parts.length; i++) {
			// Get the part at the index
			const part: string = pattern_parts[i];

			// Construct a placeholder from the part
			const placeholder = new PlaceholderParser(part);

			// The name of the placeholder
			let placeholderName: string | null = null;
			let defaultValue: string | null = null;

			// If it's actually a placeholder
			if (placeholder.isPlaceholder()) {
				// Get the placeholder name
				placeholderName = placeholder.getName();
				defaultValue = placeholder.getDefaultValue();

				// If the placeholder name is an optional
				if (placeholder.isOptional()) {
					// Add the optional tag onto the end of the previous
					regex_parts[i - 1] += '(?:';

					// Increment the optional count
					optional_count++;
				}

				// Define the pattern for all the types
				const type_patterns: { [key in PlaceholderType]: string } = {
					[PlaceholderType.STRING]: '\\S+',
					[PlaceholderType.NUMBER]: '\\d+(?:\\.\\d+)?',
					[PlaceholderType.PLAYER]: '\\S+',
					[PlaceholderType.WORLD]: '\\S+',
				};

				// Get the type indicator
				const type: PlaceholderType = placeholder.getType();

				// Get the part type patterm
				const pattern: string = type_patterns[type];

				// Set the regex part
				regex_parts[i] = placeholder.isMultiPart()
					? '(.+)'
					: `(${pattern})`;
			} else {
				// Set the regex part for any other string
				regex_parts[i] = part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
				// "\\Q" + part + "\\E";
			}

			// Add the placeholder to the list
			if (placeholderName) {
				// Add the placeholder
				pattern_data.placeholder_names.push(placeholderName);

				// Add the default value
				if (defaultValue)
					pattern_data.default_placeholder_values[placeholderName] =
						defaultValue;
			}
		}

		// Repeat the correct number of optional endings
		const optional_ending: string = Array(optional_count)
			.fill(')?')
			.join('');

		// Join the parts to a regex pattern
		pattern_data.regex = new RegExp(
			`^${regex_parts.join('\\s+')}${optional_ending}$`
		);

		// Return the full object
		return pattern_data;
	}
}

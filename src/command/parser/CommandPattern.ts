export interface ICommandPattern {
	/**
	 * The string in the code used to define this command
	 */
	pattern_string: string;

	/**
	 * The regular expression matching for the command
	 */
	regex: RegExp | null;

	/**
	 * The names of the placeholders in the pattern
	 */
	placeholder_names: string[];

	/**
	 * The default values for named placeholders
	 */
	default_placeholder_values: { [key: string]: string };

	/**
	 * The usage string for the command
	 */
	usage: string | null;
}

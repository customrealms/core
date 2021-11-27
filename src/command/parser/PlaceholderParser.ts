export enum PlaceholderType {
	STRING = 'string',
	NUMBER = 'number',
	PLAYER = 'player',
	WORLD = 'world',
}

export class PlaceholderParser {
	/**
	 * The regex pattern for placeholders
	 */
	// private static readonly placeholderPattern: RegExp = /^\{(.+?)(?:(\?)?|(?:(#)?=(.+))?)\}(\.{3})?$/;
	private static readonly PLACEHOLDER_REGEX: RegExp =
		/^\{(?:(#|S|P|W):)?(\w+)(\?|=(.*))?\}(\.{3})?$/i

	/**
	 * Whether or not the provided string matches the pattern
	 */
	private matches_pattern: boolean = false

	/**
	 * The pattern string
	 */
	private pattern: string | null = null

	/**
	 * Determines if the placeholder matches
	 */
	// private matches: boolean = false;

	/**
	 * The name of the placeholder
	 */
	private name: string | null = null

	/**
	 * The type indicator mask for values
	 */
	// private typeIndicator: string | null = null;
	private type: PlaceholderType = PlaceholderType.STRING

	/**
	 * Is the placeholder optional
	 */
	private optional: boolean = false

	/**
	 * The default value for the placeholder
	 */
	private defaultValue: string | null = null

	/**
	 * Is the placeholder multiple parts long
	 */
	private multiPart: boolean = false

	/**
	 * Constructs a placeholder object from its component in the pattern
	 * @param pattern the pattern string component
	 */
	public constructor(pattern: string) {
		// Match on the pattern
		const match: RegExpMatchArray | null = pattern.match(
			PlaceholderParser.PLACEHOLDER_REGEX
		)

		// If there is no match, return here
		if (!match) return

		// It matches the pattern
		this.matches_pattern = true

		// Get the type string
		const type: string | undefined = match[1]?.toUpperCase?.()
		if (type === 'S') this.type = PlaceholderType.STRING
		else if (type === '#') this.type = PlaceholderType.NUMBER
		else if (type === 'P') this.type = PlaceholderType.PLAYER
		else if (type === 'W') this.type = PlaceholderType.WORLD
		else this.type = PlaceholderType.STRING

		// Get the name of the placeholder
		this.name = match[2]

		// Get the default value
		this.defaultValue = match[4]

		// Is the placeholder optional
		this.optional = !!this.defaultValue || '?' === match[3]

		// Determine if it allows multiple parts
		this.multiPart = match[5] === '...'
	}

	/**
	 * Determines if the pattern used in the constructor is even a placeholder
	 * @return the placeholder status of the pattern
	 */
	public isPlaceholder(): boolean {
		// Return the match status
		return this.matches_pattern
	}

	/**
	 * Gets the name for the placeholder
	 * @return the name string
	 */
	public getName(): string | null {
		// Return the name
		return this.name
	}

	/**
	 * Determines if the placeholder is optional
	 * @return the optional status
	 */
	public isOptional(): boolean {
		// Return the optional status
		return this.optional
	}

	/**
	 * Gets the default value for the placeholder
	 * @return the default value string
	 */
	public getDefaultValue(): string | null {
		// Return the default value
		return this.defaultValue
	}

	/**
	 * Gets the type indicator for the placeholder
	 * @return the type indicator
	 */
	public getType(): PlaceholderType {
		// Return the type indicator
		return this.type
	}

	/**
	 * Determines if this placeholder allows multiple part entry
	 * @return the multi-part status
	 */
	public isMultiPart(): boolean {
		// Return the status
		return this.multiPart
	}

	/**
	 * Gets the version of this placeholder string used for usage
	 * @return the usage string output
	 */
	public getUsageString(): string {
		// If it's not a placeholder
		if (!this.matches_pattern) {
			// Simply return the pattern
			return this.pattern!
		}

		// Create the string for the inside
		let inside: string = this.name!

		// If there is a default value
		if (this.defaultValue != null) inside += `=${this.defaultValue}`

		// Return the formatted string
		return this.optional ? `[${inside}]` : `<${inside}>`
	}
}

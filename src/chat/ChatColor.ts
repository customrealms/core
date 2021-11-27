const COLOR_CHAR: string = '\u00A7'

export enum ChatColor {
	/**
	 * Represents black
	 */
	BLACK = (COLOR_CHAR + '0') as any,

	/**
	 * Represents dark blue
	 */
	DARK_BLUE = (COLOR_CHAR + '1') as any,

	/**
	 * Represents dark green
	 */
	DARK_GREEN = (COLOR_CHAR + '2') as any,

	/**
	 * Represents dark blue (aqua)
	 */
	DARK_AQUA = (COLOR_CHAR + '3') as any,

	/**
	 * Represents dark red
	 */
	DARK_RED = (COLOR_CHAR + '4') as any,

	/**
	 * Represents dark purple
	 */
	DARK_PURPLE = (COLOR_CHAR + '5') as any,

	/**
	 * Represents gold
	 */
	GOLD = (COLOR_CHAR + '6') as any,

	/**
	 * Represents gray
	 */
	GRAY = (COLOR_CHAR + '7') as any,

	/**
	 * Represents dark gray
	 */
	DARK_GRAY = (COLOR_CHAR + '8') as any,

	/**
	 * Represents blue
	 */
	BLUE = (COLOR_CHAR + '9') as any,

	/**
	 * Represents green
	 */
	GREEN = (COLOR_CHAR + 'a') as any,

	/**
	 * Represents aqua
	 */
	AQUA = (COLOR_CHAR + 'b') as any,

	/**
	 * Represents red
	 */
	RED = (COLOR_CHAR + 'c') as any,

	/**
	 * Represents light purple
	 */
	LIGHT_PURPLE = (COLOR_CHAR + 'd') as any,

	/**
	 * Represents yellow
	 */
	YELLOW = (COLOR_CHAR + 'e') as any,

	/**
	 * Represents white
	 */
	WHITE = (COLOR_CHAR + 'f') as any,

	/**
	 * Represents magical characters that change around randomly
	 */
	MAGIC = (COLOR_CHAR + 'k') as any,

	/**
	 * Makes the text bold.
	 */
	BOLD = (COLOR_CHAR + 'l') as any,

	/**
	 * Makes a line appear through the text.
	 */
	STRIKETHROUGH = (COLOR_CHAR + 'm') as any,

	/**
	 * Makes the text appear underlined.
	 */
	UNDERLINE = (COLOR_CHAR + 'n') as any,

	/**
	 * Makes the text italic.
	 */
	ITALIC = (COLOR_CHAR + 'o') as any,

	/**
	 * Resets all previous chat colors or formats.
	 */
	RESET = (COLOR_CHAR + 'r') as any,
}

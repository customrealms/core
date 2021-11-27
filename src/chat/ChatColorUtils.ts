import { ChatColor } from './ChatColor';

/**
 * The rules of ChatColors:
 *  - Attributes must be added after colors
 *  - Setting a color clears all previous colors and attributes
 */

interface IPartStyle {
	value: string;
	color?: string;
	attrs: string[];
}

export class ChatColorUtils {
	private static readonly COLORCODE_TO_HEX: { [key: string]: string } = {
		'&4': '#be0000', // DARK_RED
		'&c': '#fe3f3f', // RED
		'&6': '#d9a334', // GOLD
		'&e': '#fefe3f', // YELLOW
		'&2': '#00be00', // DARK_GREEN
		'&a': '#3ffe3f', // GREEN
		'&b': '#3ffefe', // AQUA
		'&3': '#00bebe', // DARK_AQUA
		'&1': '#0000be', // DARK_BLUE
		'&9': '#3f3ffe', // BLUE
		'&d': '#fe3ffe', // LIGHT_PURPLE
		'&5': '#be00be', // DARK_PURPLE
		'&f': '#ffffff', // WHITE
		'&7': '#bebebe', // GRAY
		'&8': '#3f3f3f', // DARK_GRAY
		'&0': '#000000', // BLACK
	};

	private static readonly ATTRIBUTE_CODES: { [key: string]: string } = {
		'&l': 'bold',
		'&o': 'italic',
		'&n': 'underline',
		'&k': 'magic',
		'&m': 'strike',
		'&r': 'reset',
	};

	public static parseColorsToMinecraft(str: string): string {
		for (const find in ChatColorUtils.COLORCODE_TO_HEX) {
			str = str.replace(new RegExp(find, 'g'), '\u00A7' + find.substr(1));
		}
		for (const find in ChatColorUtils.ATTRIBUTE_CODES) {
			str = str.replace(new RegExp(find, 'g'), '\u00A7' + find.substr(1));
		}
		return str;
	}

	/**
	 * Strips all color codes (using ampersand) from the input string
	 * @param str the input string
	 */
	public static stripColorCodes(str: string): string {
		return this.parseColorsToParts(str)
			.map((part) => part.value)
			.join('');
	}

	/**
	 * Converts a string with color codes into its HTML representation
	 * @param str the input string
	 */
	public static parseColorsToHtml(str: string): string {
		return this.parseColorsToParts(str)
			.filter((part) => part.value.length > 0)
			.map((part) => {
				// Clean the value to strip HTML
				const clean_value: string = part.value
					.replace(/&/g, '&amp;')
					.replace(/</g, '&lt;')
					.replace(/>/g, '&gt;')
					.replace(/"/g, '&quot;')
					.replace(/'/g, '&#039;');

				// If there is no color and no attributes
				if (!part.color && part.attrs.length === 0) return clean_value;

				// Create the object for the styles
				const styles: { [key: string]: string } = {};

				// Add the color
				if (part.color) styles['color'] = part.color;

				// Add the attributes
				if (part.attrs.includes('bold')) styles['font-weight'] = 'bold';
				if (part.attrs.includes('italic'))
					styles['font-style'] = 'italic';
				if (part.attrs.includes('underline')) {
					if (!styles['text-decoration'])
						styles['text-decoration'] = '';
					styles['text-decoration'] += ' underline';
				}
				if (part.attrs.includes('strike')) {
					if (!styles['text-decoration'])
						styles['text-decoration'] = '';
					styles['text-decoration'] += ' line-through';
				}

				// Convert the styles to a CSS string
				const styles_str: string = Object.keys(styles)
					.map((key) => `${key}: ${styles[key]}`)
					.join(';');

				// Return the full HTML string
				return `<span style="${styles_str}">${clean_value}</span>`;
			})
			.join('');
	}

	/**
	 * Converts a string with color codes and converts it to an array of parts with
	 * styling for each part
	 * @param str the input string containing color codes with ampersand (&)
	 */
	private static parseColorsToParts(str: string): IPartStyle[] {
		// The style of the current part
		const parts: IPartStyle[] = [
			{
				value: '',
				attrs: [],
			},
		];

		// Split by the ampersands
		str.split('&').forEach((part: string, index: number) => {
			// If this is the first part
			if (index === 0 || part.length === 0) {
				// Add the part to the string
				parts[parts.length - 1].value += (index > 0 ? '&' : '') + part;
				return;
			}

			// Get the first character
			const code: string = part[0];
			part = part.substr(1);

			// Get the color and attribute values
			const color_val: string | undefined =
				ChatColorUtils.COLORCODE_TO_HEX[`&${code}`];
			const attr_val: string | undefined =
				ChatColorUtils.ATTRIBUTE_CODES[`&${code}`];

			// If this is just an innocent ampersand, not a code
			if (!color_val && !attr_val) {
				// Add the string to the latest part
				parts[parts.length - 1].value += `&${code}${part}`;
				return;
			}

			// If it's a color code
			if (color_val) {
				// Create a new section
				parts.push({
					value: part,
					color: color_val,
					attrs: [],
				});
			}

			// If it's an attribute value
			else if (attr_val) {
				// If the attribute is 'reset'
				if (attr_val === 'reset') {
					// Add the new part
					parts.push({
						value: part,
						attrs: [],
					});
				} else {
					// Get the previous part
					const prev_part: IPartStyle = parts[parts.length - 1];

					// Add the new part
					parts.push({
						value: part,
						color: prev_part.color,
						attrs: [...prev_part.attrs, attr_val],
					});
				}
			}
		});

		// Return the parts
		return parts;
	}

	/**
	 * Determines if the provided chat color is for formatting
	 * @param color the color value
	 */
	public static isFormat(color: ChatColor): boolean {
		return [
			ChatColor.MAGIC,
			ChatColor.BOLD,
			ChatColor.STRIKETHROUGH,
			ChatColor.UNDERLINE,
			ChatColor.ITALIC,
		].includes(color);
	}

	/**
	 * Determines if the provided chat color is for color
	 * @param color the color value
	 */
	public static isColor(color: ChatColor): boolean {
		return [
			ChatColor.BLACK,
			ChatColor.DARK_BLUE,
			ChatColor.DARK_GREEN,
			ChatColor.DARK_AQUA,
			ChatColor.DARK_RED,
			ChatColor.DARK_PURPLE,
			ChatColor.GOLD,
			ChatColor.GRAY,
			ChatColor.DARK_GRAY,
			ChatColor.BLUE,
			ChatColor.GREEN,
			ChatColor.AQUA,
			ChatColor.RED,
			ChatColor.LIGHT_PURPLE,
			ChatColor.YELLOW,
			ChatColor.WHITE,
		].includes(color);
	}

	/**
	 * Parses a string containing chat color codes, denoted using ampersands (&), into a string
	 * with embedded chat codes ready for use in Minecraft.
	 * @param str the string value to parse
	 */
	public static parse(str: string): string {
		return ChatColorUtils.parseColorsToMinecraft(str) + ChatColor.RESET;
	}

	/**
	 * Strips all chat color codes, denoted using ampersands (&), from a string
	 * @param str the string value to clean
	 */
	public static strip(str: string): string {
		return ChatColorUtils.stripColorCodes(str);
	}
}

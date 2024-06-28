export interface Placeholder {
	type: PlaceholderType;
	name: string;
	defaultValue?: string;
	optional: boolean;
	multipart: boolean;
}

export enum PlaceholderType {
	STRING = 'string',
	NUMBER = 'number',
	PLAYER = 'player',
	WORLD = 'world',
}

/**
 * The regex pattern for placeholders
 */
const PLACEHOLDER_REGEX = /^\{(?:(#|S|P|W):)?(\w+)(\.{3}|\?|=(.*))?\}$/i;

export function parsePlaceholder(pattern: string): Placeholder | string {
	// Match on the pattern. If it doesn't match, it's a static string
	const match: RegExpMatchArray | null = pattern.match(PLACEHOLDER_REGEX);
	if (!match) return pattern;

	// Get the type constraint
	const typeStr: string | undefined = match[1]?.toUpperCase?.();
	let type: PlaceholderType;
	switch (typeStr) {
		case 'S':
			type = PlaceholderType.STRING;
			break;
		case '#':
			type = PlaceholderType.NUMBER;
			break;
		case 'P':
			type = PlaceholderType.PLAYER;
			break;
		case 'W':
			type = PlaceholderType.WORLD;
			break;
		default:
			type = PlaceholderType.STRING;
			break;
	}

	return {
		type: type,
		name: match[2],
		defaultValue: match[4],
		optional: !!match[4] || '?' === match[3],
		multipart: match[3] === '...',
	};
}

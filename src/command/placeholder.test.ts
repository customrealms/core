import { Placeholder, PlaceholderType, parsePlaceholder } from './placeholder';

describe('parse command placeholder', () => {
	test('constant string placeholder', () => {
		const placeholder = parsePlaceholder('give');
		expect(typeof placeholder).toBe('string');
		expect(placeholder).toBe('give');
	});
	test('string argument', () => {
		const placeholder = parsePlaceholder('{target}') as Placeholder;
		expect(typeof placeholder).toBe('object');
		expect(placeholder.name).toBe('target');
		expect(placeholder.type).toBe(PlaceholderType.STRING);
		expect(placeholder.multipart).toBe(false);
		expect(placeholder.optional).toBe(false);
		expect(placeholder.defaultValue).toBeUndefined();
	});
	test('string argument (optional)', () => {
		const placeholder = parsePlaceholder('{target?}') as Placeholder;
		expect(typeof placeholder).toBe('object');
		expect(placeholder.name).toBe('target');
		expect(placeholder.type).toBe(PlaceholderType.STRING);
		expect(placeholder.multipart).toBe(false);
		expect(placeholder.optional).toBe(true);
		expect(placeholder.defaultValue).toBeUndefined();
	});
	test('string argument (default value)', () => {
		const placeholder = parsePlaceholder('{target=abc123}') as Placeholder;
		expect(typeof placeholder).toBe('object');
		expect(placeholder.name).toBe('target');
		expect(placeholder.type).toBe(PlaceholderType.STRING);
		expect(placeholder.multipart).toBe(false);
		expect(placeholder.optional).toBe(true);
		expect(placeholder.defaultValue).toBe('abc123');
	});
	test('multipart argument', () => {
		const placeholder = parsePlaceholder('{message...}') as Placeholder;
		expect(typeof placeholder).toBe('object');
		expect(placeholder.name).toBe('message');
		expect(placeholder.type).toBe(PlaceholderType.STRING);
		expect(placeholder.multipart).toBe(true);
		expect(placeholder.optional).toBe(false);
		expect(placeholder.defaultValue).toBeUndefined();
	});
});

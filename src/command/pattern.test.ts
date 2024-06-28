import { parseCommandPattern } from './pattern';

describe('parse command pattern', () => {
	test('command with no args', () => {
		const pattern = parseCommandPattern('/gmc');
		expect(pattern.match([])).toStrictEqual({});
		expect(pattern.match(['more', 'args'])).toBeNull();
	});
	test('command with 1 arg', () => {
		const pattern = parseCommandPattern('/tp {target}');
		expect(pattern.match([])).toBeNull();
		expect(pattern.match(['conner_douglass'])).toStrictEqual({
			target: 'conner_douglass',
		});
		expect(pattern.match(['more', 'args'])).toBeNull();
	});
	test('command with 2 args', () => {
		const pattern = parseCommandPattern('/give {target} {item}');
		expect(pattern.match([])).toBeNull();
		expect(pattern.match(['conner_douglass'])).toBeNull();
		expect(
			pattern.match(['conner_douglass', 'diamond_sword'])
		).toStrictEqual({
			target: 'conner_douglass',
			item: 'diamond_sword',
		});
		expect(pattern.match(['Notch', 'diamond_sword', 'foobar'])).toBeNull();
	});
	test('command with 3 args, one optional', () => {
		const pattern = parseCommandPattern(
			'/give {target} {item} {#:amount?}'
		);
		expect(pattern.match([])).toBeNull();
		expect(pattern.match(['conner_douglass'])).toBeNull();
		expect(
			pattern.match(['conner_douglass', 'diamond_sword'])
		).toStrictEqual({
			target: 'conner_douglass',
			item: 'diamond_sword',
		});
		expect(
			pattern.match(['conner_douglass', 'diamond_sword', '2'])
		).toStrictEqual({
			target: 'conner_douglass',
			item: 'diamond_sword',
			amount: '2',
		});
		expect(
			pattern.match(['Notch', 'diamond_sword', 'not-a-number'])
		).toBeNull();
	});
	test('command with multipart arg', () => {
		const pattern = parseCommandPattern('/msg {target} {message...}');
		expect(pattern.match([])).toBeNull();
		expect(pattern.match(['conner_douglass'])).toBeNull();
		expect(
			pattern.match(['conner_douglass', 'this', 'is', 'a', 'message'])
		).toStrictEqual({
			target: 'conner_douglass',
			message: 'this is a message',
		});
	});
});

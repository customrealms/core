module.exports = {
	transform: { '^.+\\.ts?$': 'ts-jest' },
	testEnvironment: 'node',
	testRegex: '/src/.*\\.(test|spec)?\\.ts$',
	moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};

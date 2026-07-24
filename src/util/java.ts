/**
 * Converts a Java array to a JavaScript array.
 * @param array the Java array to convert
 * @returns the converted JavaScript array
 */
export function arrayFromJava<T>(array: JavaArray<T>): T[] {
	const result: T[] = [];
	for (let i = 0; i < array.length; i++) {
		result.push((array as any)[i]);
	}
	return result;
}

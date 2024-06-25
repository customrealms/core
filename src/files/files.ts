import { arrayFromJava } from '../java';

export interface FileStat {
	/**
	 * The size of the file in bytes.
	 */
	size: number;

	/**
	 * Whether or not this file is a directory.
	 */
	isDirectory: boolean;
}

/**
 * A module for reading and writing files.
 */
export const Files = {
	/**
	 * Checks if a file exists.
	 * @param filename the name of the file to check
	 * @returns true if the file exists, false otherwise
	 */
	exists: (filename: string): boolean => {
		const file = new java.io.File(filename);
		return file.exists();
	},

	/**
	 * Gets stats about a file.
	 * @param filename the name of the file to stat
	 * @returns the stats of the file, or null if the file doesn't exist
	 */
	stat: (filename: string): FileStat | null => {
		const file = new java.io.File(filename);
		if (!file.exists()) return null;
		return {
			size: file.length(),
			isDirectory: file.isDirectory(),
		};
	},

	/**
	 * Lists the contents of a directory.
	 * @param dirname the name of the directory to read
	 */
	readdir: (dirname: string): string[] => {
		const file = new java.io.File(dirname);
		if (!file.exists() || !file.isDirectory())
			throw new Error(`Not a directory: ${dirname}`);
		return arrayFromJava(file.list() ?? []);
	},

	/**
	 * Gets the name of the directory containing a file.
	 * @param filename the name of the file to get the directory name of
	 * @returns the directory name of the file, or null if the file doesn't exist
	 */
	dirname: (filename: string): string | null => {
		const file = new java.io.File(filename);
		return file.getParent();
	},

	/**
	 * Creates a directory.
	 * @param dirname the name of the directory to create
	 * @param recursive whether or not to create parent directories if they don't exist
	 */
	mkdir: (dirname: string, recursive = false): void => {
		const file = new java.io.File(dirname);
		if (recursive) {
			file.mkdirs();
		} else {
			file.mkdir();
		}
	},

	/**
	 * Removes a file or directory. Directories must be empty to be removed.
	 * @param filename the name of the file or directory to remove
	 */
	remove: (filename: string): void => {
		const file = new java.io.File(filename);
		if (!file.exists()) return;
		file.delete();
	},

	/**
	 * Reads the contents of a file and returns it as a string.
	 * @param filename the name of the file to read
	 * @returns the contents of the file as a string, or null if the file doesn't exist
	 */
	readString: (filename: string): string | null => {
		const file = new java.io.File(filename);
		if (!file.exists() || !file.isFile()) return null;
		const scanner = new java.util.Scanner(file).useDelimiter('\\Z');
		return scanner.next();
	},

	/**
	 * Writes a string to a file.
	 * @param filename the name of the file to write
	 * @param content the content to write to the file
	 */
	writeString: (filename: string, content: string): void => {
		const file = new java.io.File(filename);
		const writer = new java.io.FileWriter(file);
		writer.write(content);
		writer.close();
	},
};

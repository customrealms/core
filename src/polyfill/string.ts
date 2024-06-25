if (!String.prototype.includes) {
	String.prototype.includes = function (
		searchString: string,
		position?: number
	): boolean {
		return this.indexOf(searchString, position) !== -1;
	};
}

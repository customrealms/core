if (!Array.prototype.includes) {
    Array.prototype.includes = function(searchElement: any, fromIndex?: number): boolean {
        return this.indexOf(searchElement, fromIndex) !== -1;
    };
}

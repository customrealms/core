export function ApplyMixins(derivedCtor: any, baseCtors: any[]) {
	const definedNames = Object.getOwnPropertyNames(derivedCtor.prototype)
	baseCtors.forEach((baseCtor) => {
		Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
			// Don't redefine existing properties
			if (definedNames.indexOf(name) > -1) return
			definedNames.push(name)

			Object.defineProperty(
				derivedCtor.prototype,
				name,
				Object.getOwnPropertyDescriptor(baseCtor.prototype, name) as any
			)
		})
	})
}

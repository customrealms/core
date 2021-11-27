import { ApplyMixins } from './ApplyMixins'

export function Extends(...basetypes: any[]) {
	return (subclass: any) => {
		ApplyMixins(subclass, basetypes)
		return subclass
	}
}

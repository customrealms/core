import { ToJava } from '../runtime/ToJava'

export class Material implements ToJava {
	public static fromJava(_material: Java.Value): Material {
		return new Material(_material)
	}

	/**
	 * Finds a material with the provided name, if one exists
	 * @param name the name of the material
	 * @param exact whether or not to require an exact match
	 */
	public static withName(
		name: string,
		exact: boolean = false
	): Material | null {
		const javaMat = exact
			? Java.resolve('org.bukkit.Material').getMaterial(name)
			: Java.resolve('org.bukkit.Material').matchMaterial(name)
		// const javaMat = JavaBindings.org.bukkit.Material[name];
		if (!javaMat) return null
		return Material.fromJava(javaMat)
	}

	/**
	 * Gets all of the materials available
	 */
	public static all(): Material[] {
		return Java.resolve('org.bukkit.Material')
			.values()
			.map((javaMat: Java.Value) => Material.fromJava(javaMat))
	}

	private constructor(private _material: Java.Value) {}

	public toJava(): Java.Value {
		return this._material
	}

	/**
	 * Gets the name of the material
	 */
	public getName(): string {
		return this.toJava().name()
	}

	/**
	 * Gets the blast resistance (durability) of this material
	 */
	public getBlastResistance(): number {
		return this.toJava()?.getBlastResistance()
	}

	/**
	 * Gets the hardness (strength) of this material. This corresponds to the amount of time
	 * it takes a player to break the material.
	 */
	public getHardness(): number {
		return this.toJava()?.getHardness()
	}

	/**
	 * Gets the maximum durability of this material
	 */
	public getMaxDurability(): number {
		return this.toJava()?.getMaxDurability()
	}

	/**
	 * Gets the maximum amount of this material that can be held in a stack
	 */
	public getMaxStackSize(): number {
		return this.toJava()?.getMaxStackSize()
	}

	/**
	 * Determines if this material is affected by gravity
	 */
	public hasGravity(): boolean {
		return this.toJava()?.hasGravity()
	}

	/**
	 * Checks if the material is air
	 */
	public isAir(): boolean {
		return this.toJava()?.isAir()
	}

	/**
	 * Checks if the material is a block (can be placed in the world)
	 */
	public isBlock(): boolean {
		return this.toJava()?.isBlock()
	}

	/**
	 * Checks if the material is edible
	 */
	public isEdible(): boolean {
		return this.toJava()?.isEdible()
	}

	/**
	 * Checks if this material is a block and can catch on fire
	 */
	public isFlammable(): boolean {
		return this.toJava()?.isFlammable()
	}

	/**
	 * Checks if this block can be used as fuel in a furnace
	 */
	public isFuel(): boolean {
		return this.toJava()?.isFuel()
	}

	/**
	 * Checks if the player can interact with this material
	 */
	public isInteractable(): boolean {
		return this.toJava()?.isInteractable()
	}

	/**
	 * Checks if this material is an obtainable item
	 */
	public isItem(): boolean {
		return this.toJava()?.isItem()
	}

	/**
	 * Checks if this material is a block which completely occludes vision (you can't see through it)
	 */
	public isOccluding(): boolean {
		return this.toJava()?.isOccluding()
	}

	/**
	 * Checks if this material is a record
	 */
	public isRecord(): boolean {
		return this.toJava()?.isRecord()
	}

	/**
	 * Checks if this material is a block and is solid (can be build upon)
	 */
	public isSolid(): boolean {
		return this.toJava()?.isSolid()
	}

	/**
	 * Determines if this material is the same as another
	 * @param other the other material
	 */
	public equals(other: Material): boolean {
		if (!other || !(other instanceof Material)) return false
		return other.getName() === this.getName()
	}
}

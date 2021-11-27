import '../globals'
import { Biome } from '../biome/Biome'
import { Chunk } from '../chunk/Chunk'
import { ItemStack } from '../material/ItemStack'
import { Material } from '../material/Material'
import { ToJava } from '../runtime/ToJava'
import { Location } from '../util/Location'
import { World } from '../world/World'

export class Block implements ToJava {
	public static fromJava(_block: Java.Value): Block {
		return new Block(_block)
	}

	private constructor(private _block: Java.Value) {}

	public toJava(): Java.Value {
		return this._block
	}

	/**
	 * Breaks the block ans spawns items as if a player had broken it
	 */
	public breakNaturally(): boolean {
		return this._block?.breakNaturally()
	}

	/**
	 * Gets the biome that this block is in
	 */
	public getBiome(): Biome {
		const javaBiome = this._block?.getBiome()
		return javaBiome.name()
	}

	/**
	 * Sets the biome for this block
	 * @param biome the biome
	 */
	public setBiome(biome: Biome): void {
		const javaBiome = Java.resolve('org.bukkit.block.Biome').valueOf(biome)
		this._block?.setBiome(javaBiome)
	}

	// /**
	//  * Gets the block data for this block
	//  */
	// public getBlockData(): BlockData;

	/**
	 * Gets the redstone power being provided to this block
	 */
	public getBlockPower(): number {
		return this._block?.getBlockPower()
	}

	/**
	 * Checks if this block is being powered by redstone
	 */
	public isBlockPowered(): boolean {
		return this._block?.isBlockPowered()
	}

	/**
	 * Checks if this block is being indirectly powered by redstone
	 */
	public isBlockIndirectlyPowered(): boolean {
		return this._block?.isBlockIndirectlyPowered()
	}

	// /**
	//  * Gets the bounding box for this block
	//  */
	// public getBoundingBox(): BoundingBox;

	/**
	 * Gets the chunk that contains this block
	 */
	public getChunk(): Chunk {
		const javaChunk = this._block?.getChunk()
		//@ts-ignore Chunk constructor is private
		return new Chunk(javaChunk)
	}

	/**
	 * Gets the items that would drop if this block were broken
	 */
	public getDrops(): ItemStack[] {
		const javaDrops: Java.Value[] = this._block.getDrops()
		return javaDrops.map((item) => ItemStack.fromJava(item))
	}

	/**
	 * Gets the temperature of this block
	 */
	public getTemperature(): number {
		return this._block?.getTemperature()
	}

	/**
	 * Gets the material of this block
	 */
	public getMaterial(): Material {
		const javaMat = this._block?.getType()
		return Material.fromJava(javaMat)
	}

	/**
	 * Sets the material of this block
	 * @param material the material
	 */
	public setMaterial(material: Material): void {
		if (!material || !(material instanceof Material)) return
		if (!material.isBlock() && !material.isAir()) return
		this._block.setType(material.toJava())
	}

	/**
	 * Gets the location of this block
	 */
	public getLocation(): Location {
		return new Location(
			this.getWorld(),
			this.getX(),
			this.getY(),
			this.getZ()
		)
	}

	/**
	 * Gets the world containing this block
	 */
	public getWorld(): World {
		const javaWorld = this._block?.getWorld()
		//@ts-ignore because we need to construct worlds without exposing a public constructor
		return new World(javaWorld)
	}

	/**
	 * Gets the x-coordinate of this block
	 */
	public getX(): number {
		return this._block?.getX()
	}

	/**
	 * Gets the y-coordinate of this block
	 */
	public getY(): number {
		return this._block?.getY()
	}

	/**
	 * Gets the z-coordinate of this block
	 */
	public getZ(): number {
		return this._block?.getZ()
	}

	/**
	 * Checks if this block is empty
	 */
	public isEmpty(): boolean {
		return this._block?.isEmpty()
	}

	/**
	 * Checks if this block is liquid
	 */
	public isLiquid(): boolean {
		return this._block?.isLiquid()
	}

	/**
	 * Checks if this block is passable
	 */
	public isPassable(): boolean {
		return this._block?.isPassable()
	}

	/**
	 * Checks if this block is the same as another
	 * @param other the other block to compare to
	 */
	public equals(other: Block): boolean {
		if (!other) return false
		return (
			this.getX() === other.getX() &&
			this.getY() === other.getY() &&
			this.getZ() === other.getZ()
		)
	}
}

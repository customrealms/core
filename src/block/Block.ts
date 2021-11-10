import "../globals";
import { Biome } from '../biome/Biome';
import { Chunk } from '../chunk/Chunk';
import { Material } from '../material/Material';
import { Location } from '../util/Location';
import { World } from '../world/World';
import { ItemStack } from '../material/ItemStack';

export class Block {

    public constructor(
        private _block: any) {}

    public breakNaturally(): boolean {
        return this._block?.breakNaturally();
    }

    public getBiome(): Biome {
        const javaBiome = this._block?.getBiome();
        return javaBiome.name();
    }

    public setBiome(biome: Biome): void {
        const javaBiome = Java.resolve('org.bukkit.block.Biome').valueOf(biome);
        this._block?.setBiome(javaBiome);
    }

    // /**
    //  * Gets the block data for this block
    //  */
    // public getBlockData(): BlockData;

    public getBlockPower(): number {
        return this._block?.getBlockPower();
    }

    public isBlockPowered(): boolean {
        return this._block?.isBlockPowered();
    }

    public isBlockIndirectlyPowered(): boolean {
        return this._block?.isBlockIndirectlyPowered();
    }

    // /**
    //  * Gets the bounding box for this block
    //  */
    // public getBoundingBox(): BoundingBox;

    public getChunk(): Chunk {
        const javaChunk = this._block?.getChunk();
        //@ts-ignore Chunk constructor is private
        return new Chunk(javaChunk);
    }

    /**
     * Gets the items that would drop if this block were broken
     */
    public getDrops(): ItemStack[] {
        const javaDrops = this._block.getDrops();
        return javaDrops.map((item: any) => new ItemStack(item));
    }

    public getTemperature(): number {
        return this._block?.getTemperature();
    }

    public getMaterial(): Material {
        const javaMat = this._block?.getType();
        return new Material(javaMat);
    }

    public setMaterial(material: Material): void {
        if (!material || !(material instanceof Material)) return;
        if (!material.isBlock() && !material.isAir()) return;
        this._block.setType(material.toJava());
    }

    public getLocation(): Location {
        return new Location(
            this.getWorld(),
            this.getX(),
            this.getY(),
            this.getZ()
        );
    }

    public getWorld(): World {
        const javaWorld = this._block?.getWorld();
        //@ts-ignore because we need to construct worlds without exposing a public constructor
        return new World(javaWorld);
    }

    public getX(): number {
        return this._block?.getX();
    }

    public getY(): number {
        return this._block?.getY();
    }

    public getZ(): number {
        return this._block?.getZ();
    }

    public isEmpty(): boolean {
        return this._block?.isEmpty();
    }

    public isLiquid(): boolean {
        return this._block?.isLiquid();
    }

    public isPassable(): boolean {
        return this._block?.isPassable();
    }

    public equals(other: Block): boolean {
        if (!other) return false;
        return this.getX() === other.getX() && this.getY() === other.getY() && this.getZ() === other.getZ();
    }

}

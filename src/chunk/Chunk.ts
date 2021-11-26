import { Block } from "../block/Block";
import { ConstructEntity } from '../entity/EntityConstructors';
import { Entity } from "../entity/types/Entity";
import { World } from "../world/World";

export class Chunk {

    public static fromJava(_chunk: Java.Value): Chunk {
        return new Chunk(_chunk);
    }

    private constructor(
        private _chunk: Java.Value,
    ) {}

    /**
     * Gets the world containing this chunk
     */
    public getWorld(): World {
        return World.fromJava(this._chunk.getWorld());
    }

    /**
     * Gets the x-coordinate of this chunk
     */
    public getX(): number {
        return this._chunk?.getX();
    }

    /**
     * Gets the z-coordinate of this chunk
     */
    public getZ(): number {
        return this._chunk?.getZ();
    }

    /**
     * Checks if a block is contained in this chunk
     * @param block the block to check
     */
    public contains(block: Block): boolean {
        return this._chunk?.contains(block.toJava());
    }

    /**
     * Gets the block in the chunk at a relative location
     * @param x the chunk-relative x-coordinate
     * @param y the chunk-relative y-coordinate
     * @param z the chunk-relative z-coordinate
     */
    public getBlock(x: number, y: number, z: number): Block {
        return Block.fromJava(this._chunk?.getBlock(x, y, z));
    }

    /**
     * Gets all of the entities in the chunk
     */
    public getEntities(): Entity[] {
        const javaEntities: Java.Value[] = this._chunk.getEntities();
        if (!javaEntities) return [];
        return javaEntities.map(ConstructEntity);
    }

    /**
     * Checks if this chunk has been loaded
     */
    public isLoaded(): boolean {
        return this._chunk?.isLoaded();
    }

    /**
     * Checks if this chunk is force loaded. Force loaded chunks will not be unloaded
     * automatically due to player inactivity.
     */
    public isForceLoaded(): boolean {
        return this._chunk?.isForceLoaded();
    }

    /**
     * Sets whether or not this chunk is force loaded. Force loaded chunks will not be unloaded
     * automatically due to player inactivity.
     * @param force_loaded the force loaded status
     */
    public setForceLoaded(force_loaded: boolean): void {
        this._chunk?.setForceLoaded(force_loaded);
    }

    // /**
    //  * Loads the chunk into memory, including generating it optionally. Returns true if the
    //  * chunk was loaded successfully.
    //  * @param generate whether or not to generate the chunk, if it's new. Defaults to true
    //  */
    // public load(generate?: boolean): boolean {
    //     return true;
    // }

    // /**
    //  * Unloads and optionally saves the chunk. Returns true if the chunk unloads successfully.
    //  * @param save whether or not to save the chunk. Defaults to true
    //  */
    // public unload(save?: boolean): boolean {
    //     return true;
    // }

    /**
     * Gets the amount of time, in ticks, that this chunk has been inhabited by a player.
     */
    public getInhabitedTime(): number {
        return this._chunk?.getInhabitedTime();
    }

    /**
     * Checks if this chunk is the same chunk as another
     * @param other the other chunk to compare to
     */
    public equals(other: Chunk): boolean {
        if (!other) return false;
        return this.getX() === other.getX() && this.getZ() === other.getZ();
    }

}

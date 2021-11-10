import { Block } from "../block/Block";
import { World } from "../world/World";
import { Entity } from "../entity/Entity";

export class Chunk {

    private constructor(
        private _chunk: any) {}

    /**
     * Gets the world containing this chunk
     */
    public getWorld(): World {
        //@ts-ignore because we need to construct worlds without exposing a public constructor
        return new World(this._chunk?.getWorld());
    }

    public getX(): number {
        return this._chunk?.getX();
    }

    public getZ(): number {
        return this._chunk?.getZ();
    }

    public contains(block: Block): boolean {
        return this._chunk?.contains((block as any)._block);
    }

    public getBlock(x: number, y: number, z: number): Block {
        return new Block(this._chunk?.getBlock(x, y, z));
    }

    /**
     * Gets all of the entities in the chunk
     */
    public getEntities(): Entity[] {
        const javaEntities = this._chunk.getEntities();
        if (!javaEntities) return [];
        return javaEntities.map((e: any) => new Entity(e));
    }

    public isLoaded(): boolean {
        return this._chunk?.isLoaded();
    }

    public isForceLoaded(): boolean {
        return this._chunk?.isForceLoaded();
    }

    public setForceLoaded(force_loaded: boolean): void {
        this._chunk?.setForceLoaded(force_loaded);
    }

    public load(generate?: boolean): boolean {
        return true;
    }

    public unload(save?: boolean): boolean {
        return true;
    }

    public getInhabitedTime(): number {
        return this._chunk?.getInhabitedTime();
    }

    public equals(other: Chunk): boolean {
        if (!other) return false;
        return this.getX() === other.getX() && this.getZ() === other.getZ();
    }

}

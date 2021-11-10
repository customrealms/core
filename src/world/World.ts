import { Biome } from '../biome/Biome';
import { Block } from '../block/Block';
import { Chunk } from '../chunk/Chunk';
import { Entity } from "../entity/Entity";
import { EntityType } from "../entity/EntityType";
import "../globals";
import { ItemDrop } from '../material/ItemDrop';
import { ItemStack } from '../material/ItemStack';
import { TreeType } from '../material/TreeType';
import { Player } from '../player/Player';
import { Location } from '../util/Location';

export interface IWorldExplosionOptions {

    /**
     * Whether or not the explosion should set fire to nearby blocks. Defaults to false
     */
    set_fire?: boolean;

    /**
     * Whether or not the explosion should break blocks. Defaults to true
     */
    break_blocks?: boolean;

}

export interface IWorldSoundOptions {

    // category?: SoundCategory;

    volume?: string;

    pitch?: string;

}

export interface IWorldParticleOptions {
    offset_x?: number;
    offset_y?: number;
    offset_z?: number;
    count?: number;
    extra?: number;
}

export class World {

    private constructor(
        private _world: any) {}

    public toJava(): any {
        return this._world;
    }

    public getUUID(): string {
        return this._world?.getUID()?.toString();
    }

    public getName(): string {
        return this._world?.getName();
    }

    public canGenerateStructures(): boolean {
        return this._world?.canGenerateStructures();
    }

    public createExplosion(location: Location, power: number, options?: IWorldExplosionOptions): boolean {
        return this._world?.createExplosion(
            location.getX(),
            location.getY(),
            location.getZ(),
            power,
            options?.set_fire ?? false,
            options?.break_blocks ?? true
        );
    }

    public dropItem(location: Location, item_stack: ItemStack, natural?: boolean): ItemDrop {

        return new ItemDrop(this._world?.dropItem())
    }

    public generateTree(location: Location, tree_type?: TreeType): boolean {
        // const javaBiome = JavaBindings.resolve('org.bukkit.block.Biome').valueOf(biome);
        // this._block?.setBiome(javaBiome);
        return false;
    }

    public getAllowAnimals(): boolean {
        return this._world?.getAllowAnimals();
    }

    public getAllowMonsters(): boolean {
        return this._world?.getAllowAnimals();
    }

    public getAmbientSpawnLimit(): number {
        return this._world?.getAmbientSpawnLimit();
    }

    public setAmbientSpawnLimit(limit: number): void {
        this._world?.setAmbientSpawnLimit(limit);
    }

    public getAnimalSpawnLimit(): number {
        return this._world?.getAnimalSpawnLimit();
    }

    public setAnimalSpawnLimit(limit: number): void {
        this._world?.setAnimalSpawnLimit(limit);
    }

    public getWaterAnimalSpawnLimit(): number {
        return this._world?.getWaterAnimalSpawnLimit();
    }

    public setWaterAnimalSpawnLimit(limit: number): void {
        this._world?.setWaterAnimalSpawnLimit(limit);
    }

    public getMonsterSpawnLimit(): number {
        return this._world?.getMonsterSpawnLimit();
    }

    public setMonsterSpawnLimit(limit: number): void {
        this._world?.setMonsterSpawnLimit(limit);
    }

    public getBiome(x: number, y: number, z: number): Biome {
        return null as any;
    }

    public setBiome(x: number, y: number, z: number, biome: Biome): void {

    }

    public getBlockAt(...args: any[]): Block {
        if (args.length === 3 &&
            typeof args[0] === 'number' &&
            typeof args[1] === 'number' &&
            typeof args[2] === 'number') {

            const x: number = args[0];
            const y: number = args[1];
            const z: number = args[2];
            const javaBlock = this._world?.getBlockAt(x, y, z);
            return new Block(javaBlock);

        }
        else if (
            args.length ===  1 &&
            typeof args[0] === 'object') {

            const location: Location = args[0];
            return this.getBlockAt(
                location.getX(),
                location.getY(),
                location.getZ()
            );

        }
        return null as any;
    }

    public getChunkAt(...args: any[]): Chunk {
        if (args.length === 2 &&
            typeof args[0] === 'number' &&
            typeof args[1] === 'number') {

            const x: number = args[0];
            const y: number = args[1];
            //@ts-ignore chunk constructor is private, but we can still call it internally
            return new Chunk(this._world?.getChunkAt(x, y));

        }
        else if (
            args.length ===  1 &&
            typeof args[0] === 'object') {

            const location: Location = args[0];
            return this.getChunkAt(
                location.getX(),
                location.getZ()
            );

        }
        return null as any;
    }

    public isHardcore(): boolean {
        return this._world?.isHardcore();
    }

    public setHardcore(hardcore: boolean): void {
        this._world?.setHardcore(hardcore);
    }

    // /**
    //  * Gets the difficulty of this world
    //  */
    // getDifficulty(): Difficulty;

    // /**
    //  * Sets the difficulty of this world
    //  * @param difficulty the difficulty value
    //  */
    // setDifficulty(difficulty: Difficulty): void;

    /**
     * Gets all of the entities in this world
     */
    public getEntities(): Entity[] {
        const javaEntities = this._world.getEntities();
        if (!javaEntities) return [];
        //@ts-ignore entity constructor is private, but we can still call it internally
        return javaEntities.map((e: any) => new Entity(e));
    }

    // /**
    //  * Gets the environment for this world
    //  */
    // getEnvironment(): WorldEnvironment;

    public getFullTime(): number {
        return this._world?.getFullTime();
    }

    public setFullTime(full_time: number): void {
        this._world?.setFullTime(full_time);
    }

    public getTime(): number {
        return this._world?.getTime();
    }

    public setTime(time: number): void {
        this._world?.setTime(time);
    }

    public getGameRuleNames(): string[] {
        return [];
    }

    public getGameRule<T = any>(name: string): T {
        return null as any;
    }

    public getHighestBlockAt(x: number, z: number): Block {
        const javaBlock = this._world?.getHighestBlockAt(x, z);
        return new Block(javaBlock);
    }

    public getHumidity(x: number, y: number, z: number): number {
        return this._world.getHumidity(x, y, z);
    }

    public getPlayers(): Player[] {
        //@ts-ignore player constructor is private, but we can still call it internally
        return this._world?.getPlayers()?.map((p: any) => new Player(p));
    }

    public isPvpEnabled(): boolean {
        return this._world?.getPVP();
    }

    public setPvpEnabled(enabled: boolean): void {
        this._world?.setPVP(enabled);
    }

    public getSeaLevel(): number {
        return this._world.getSeaLevel();
    }

    public getSeed(): number {
        return this._world.getSeed();
    }

    public getTemperature(x: number, y: number, z: number): number {
        return this._world?.getTemperature(x, y, z);
    }

    public getSpawnLocation(): Location {
        const javaLoc = this._world?.getSpawnLocation();
        return new Location(
            this,
            javaLoc.getX(),
            javaLoc.getY(),
            javaLoc.getZ()
        );
    }

    public setSpawnLocation(location: Location): void {
        const javaLoc = new (Java.resolve('org.bukkit.Location'))(
            this._world,
            location.getX(),
            location.getY(),
            location.getZ()
        );
        this._world?.setSpawnLocation(javaLoc);
    }

    // /**
    //  * Plays an effect in the world
    //  * @param location the location of the center of the effect
    //  * @param effect the effect to play
    //  * @param radius the radius over which to play the effect
    //  */
    // playEffect(location: Location, effect: Effect, radius: number): void;

    public playSound(location: Location, sound: string, options?: IWorldSoundOptions): void {

    }

    /**
     * Saves the world to disk
     */
    public save(): void {
        this._world.save();
    }

    /**
     * Spawns an entity at a location in the world
     * @param location the location at which to spawn the entity
     * @param entity_type the type of entity to spawn
     */
    public spawnEntity(location: Location, entity_type: EntityType): Entity | null {
        const javaEntityType = Java.resolve('org.bukkit.entity.EntityType').fromName(entity_type);
        if (!javaEntityType) return null;
        const javaEntity = this.toJava().spawnEntity(location.toJava(), javaEntityType);
        if (!javaEntity) return null;
        //@ts-ignore entity constructor is private, but we can still call it internally
        return new Entity(javaEntity);
    }

    // /**
    //  * Spawns particles in the world at a location
    //  * @param location the location of the center of the particle spawner
    //  * @param particle the particle to spawn
    //  * @param options options for the particles spawned
    //  */
    // spawnParticle(location: Location, particle: Particle, options?: IWorldParticleOptions): void;

    public strikeLightning(location: Location, do_damage: boolean = true): void {

        const javaLoc = location.toJava();

        if (do_damage) this._world.strikeLightning(javaLoc);
        else this._world.strikeLightningEffect(javaLoc);

    }

}

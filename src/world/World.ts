import { Block } from '../block/Block';
import { Chunk } from '../chunk/Chunk';
import { ConstructEntity } from '../entity/EntityConstructors';
import { EntityType } from '../entity/EntityType';
import { Entity } from '../entity/types/Entity';
import { ItemDrop } from '../material/ItemDrop';
import { ItemStack } from '../material/ItemStack';
import { Player } from '../player/Player';
import { ToJava } from '../runtime/ToJava';
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

export class World implements ToJava {
	public static fromJava(_world: Java.Value): World {
		return new World(_world);
	}

	private constructor(private _world: Java.Value) {}

	public toJava(): Java.Value {
		return this._world;
	}

	/**
	 * Gets the UUID of the world
	 */
	public getUUID(): string {
		return this._world?.getUID()?.toString();
	}

	/**
	 * Gets the name of the world
	 */
	public getName(): string {
		return this._world?.getName();
	}

	/**
	 * Checks if structures are currently generated in the world
	 */
	public canGenerateStructures(): boolean {
		return this._world?.canGenerateStructures();
	}

	/**
	 * Creates an explosion in the world
	 * @param location the location of the center of the explosion
	 * @param power the power of the explosion
	 * @param options options for the explosion
	 */
	public createExplosion(
		location: Location,
		power: number,
		options?: IWorldExplosionOptions
	): boolean {
		return this._world?.createExplosion(
			location.getX(),
			location.getY(),
			location.getZ(),
			power,
			options?.set_fire ?? false,
			options?.break_blocks ?? true
		);
	}

	/**
	 * Drops items in a location
	 * @param location the location to drop the items
	 * @param item_stack the items to drop
	 * @param natural whether or not to add a random offset, as if the items
	 *        were dropped naturally. Defaults to false.
	 */
	public dropItem(
		location: Location,
		item_stack: ItemStack,
		natural = false
	): ItemDrop {
		const javaItemDrop = this.toJava().dropItem(
			location.toJava(),
			item_stack.toJava(),
			natural
		);
		return ItemDrop.fromJava(javaItemDrop);
	}

	// /**
	//  * Generates a tree at a location
	//  * @param location the location of the tree
	//  * @param tree_type the type of tree. Defaults to a basic tree
	//  */
	// public generateTree(location: Location, tree_type?: TreeType): boolean {
	//     // const javaBiome = JavaBindings.resolve('org.bukkit.block.Biome').valueOf(biome);
	//     // this._block?.setBiome(javaBiome);
	//     return false;
	// }

	/**
	 * Gets whether animals can spawn in this world
	 */
	public getAllowAnimals(): boolean {
		return this._world?.getAllowAnimals();
	}

	/**
	 * Gets whether monsters can spawn in this world
	 */
	public getAllowMonsters(): boolean {
		return this._world?.getAllowAnimals();
	}

	/**
	 * Gets the limit for the number of ambient mobs that can spawn in a chunk in this world
	 */
	public getAmbientSpawnLimit(): number {
		return this._world?.getAmbientSpawnLimit();
	}

	/**
	 * Sets the limit for the number of ambient mobs that can spawn in a chunk in this world
	 * @param limit the limit
	 */
	public setAmbientSpawnLimit(limit: number): void {
		this._world?.setAmbientSpawnLimit(limit);
	}

	/**
	 * Gets the limit for the number of animals that can spawn in a chunk in this world
	 */
	public getAnimalSpawnLimit(): number {
		return this._world?.getAnimalSpawnLimit();
	}

	/**
	 * Sets the limit for the number of animals that can spawn in a chunk in this world
	 * @param limit the limit
	 */
	public setAnimalSpawnLimit(limit: number): void {
		this._world?.setAnimalSpawnLimit(limit);
	}

	/**
	 * Gets the limit for the number of water animals that can spawn in a chunk in this world
	 */
	public getWaterAnimalSpawnLimit(): number {
		return this._world?.getWaterAnimalSpawnLimit();
	}

	/**
	 * Sets the limit for the number of water animals that can spawn in a chunk in this world
	 * @param limit the limit
	 */
	public setWaterAnimalSpawnLimit(limit: number): void {
		this._world?.setWaterAnimalSpawnLimit(limit);
	}

	/**
	 * Gets the limit for the number of monsters that can spawn in a chunk in this world
	 */
	public getMonsterSpawnLimit(): number {
		return this._world?.getMonsterSpawnLimit();
	}

	/**
	 * Sets the limit for the number of monsters that can spawn in a chunk in this world
	 * @param limit the limit
	 */
	public setMonsterSpawnLimit(limit: number): void {
		this._world?.setMonsterSpawnLimit(limit);
	}

	// /**
	//  * Gets the biome at a given block coordinate in the world
	//  * @param x the x-coordinate
	//  * @param y the y-coordinate
	//  * @param z the z-coordinate
	//  */
	// public getBiome(x: number, y: number, z: number): Biome {
	//     return null as any;
	// }

	// /**
	//  * Sets the biome at a given block coordinate in the world
	//  * @param x the x-coordinate
	//  * @param y the y-coordinate
	//  * @param z the z-coordinate
	//  * @param biome the biome to set
	//  */
	// public setBiome(x: number, y: number, z: number, biome: Biome): void {
	// }

	/**
	 * Gets the block at a given coordinate in the world
	 * @param x the x-coordinate
	 * @param y the y-coordinate
	 * @param z the z-coordinate
	 */
	public getBlockAt(x: number, y: number, z: number): Block;

	/**
	 * Gets the block at a given location in the world
	 * @param location the location of the block
	 */
	public getBlockAt(location: Location): Block;

	public getBlockAt(...args: any[]): Block {
		if (
			args.length === 3 &&
			typeof args[0] === 'number' &&
			typeof args[1] === 'number' &&
			typeof args[2] === 'number'
		) {
			const x: number = args[0];
			const y: number = args[1];
			const z: number = args[2];
			const javaBlock = this._world?.getBlockAt(x, y, z);
			return Block.fromJava(javaBlock);
		} else if (args.length === 1 && typeof args[0] === 'object') {
			const location: Location = args[0];
			return this.getBlockAt(
				location.getX(),
				location.getY(),
				location.getZ()
			);
		}
		return null as any;
	}

	/**
	 * Gets the chunk at a given block coordinate in the world
	 * @param x the x-coordinate in block-space
	 * @param z the z-coordinate in block-space
	 */
	public getChunkAt(x: number, z: number): Chunk;

	/**
	 * Gets the chunk containing a given location in the world
	 * @param location the location in the world
	 */
	public getChunkAt(location: Location): Chunk;

	public getChunkAt(...args: any[]): Chunk {
		if (
			args.length === 2 &&
			typeof args[0] === 'number' &&
			typeof args[1] === 'number'
		) {
			const x: number = args[0];
			const z: number = args[1];
			return Chunk.fromJava(this._world.getChunkAt(x, z));
		} else if (args.length === 1 && typeof args[0] === 'object') {
			const location: Location = args[0];
			return this.getChunkAt(location.getX(), location.getZ());
		}
		return null as any;
	}

	/**
	 * Checks if this world is in hardcore mode
	 */
	public isHardcore(): boolean {
		return this._world?.isHardcore();
	}

	/**
	 * Sets whether or not this world is hardcore
	 * @param hardcore the hardcore status of the world
	 */
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
		return javaEntities.map((e: any) => ConstructEntity(e));
	}

	// /**
	//  * Gets the environment for this world
	//  */
	// getEnvironment(): WorldEnvironment;

	/**
	 * Gets the full in-game time on this world
	 */
	public getFullTime(): number {
		return this._world?.getFullTime();
	}

	/**
	 * Sets the full in-game time of this world
	 * @param full_time the full in-game time value
	 */
	public setFullTime(full_time: number): void {
		this._world?.setFullTime(full_time);
	}

	/**
	 * Gets the relative in-game time for this world
	 */
	public getTime(): number {
		return this._world?.getTime();
	}

	/**
	 * Sets the relative in-game time for this world
	 * @param time the relative in-game time
	 */
	public setTime(time: number): void {
		this._world?.setTime(time);
	}

	// /**
	//  * Gets the names of all the available game rules
	//  */
	// public getGameRuleNames(): string[] {
	//     return [];
	// }

	// /**
	//  * Gets the value for a game rule
	//  * @param name the name of the rule to get
	//  */
	// public getGameRule<T = any>(name: string): T {
	//     return null as any;
	// }

	/**
	 * Gets the highest solid block a given location
	 * @param x the x-coordinate
	 * @param z the z-coordinate
	 */
	public getHighestBlockAt(x: number, z: number): Block {
		const javaBlock = this._world?.getHighestBlockAt(x, z);
		return Block.fromJava(javaBlock);
	}

	/**
	 * Gets the humidity at a location in the world
	 * @param x the x-coordinate of the block
	 * @param y the y-coordinate of the block
	 * @param z the y-coordinate of the block
	 */
	public getHumidity(x: number, y: number, z: number): number {
		return this._world.getHumidity(x, y, z);
	}

	/**
	 * Gets all of the players in this world
	 */
	public getPlayers(): Player[] {
		return this._world
			?.getPlayers()
			?.map((p: Java.Value) => Player.fromJava(p));
	}

	/**
	 * Checks if PVP is enabled in this world
	 */
	public isPvpEnabled(): boolean {
		return this._world?.getPVP();
	}

	/**
	 * Sets whether or not PVP is enabled in this world
	 * @param enabled the PVP enabled status
	 */
	public setPvpEnabled(enabled: boolean): void {
		this._world?.setPVP(enabled);
	}

	/**
	 * Gets the sea level for this world
	 */
	public getSeaLevel(): number {
		return this._world.getSeaLevel();
	}

	/**
	 * Gets the seed for this world
	 */
	public getSeed(): number {
		return this._world.getSeed();
	}

	/**
	 * Gets the temperature of a block in the world
	 * @param x the x-coordinate of the block
	 * @param y the y-coordinate of the block
	 * @param z the z-coorsinate of the block
	 */
	public getTemperature(x: number, y: number, z: number): number {
		return this._world?.getTemperature(x, y, z);
	}

	/**
	 * Gets the spawn location of the world
	 */
	public getSpawnLocation(): Location {
		const javaLoc = this._world?.getSpawnLocation();
		return new Location(
			this,
			javaLoc.getX(),
			javaLoc.getY(),
			javaLoc.getZ()
		);
	}

	/**
	 * Sets the spawn location of this world
	 * @param location the location for the new spawn
	 */
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

	// /**
	//  * Plays a sound in the world at a location
	//  * @param location the location to play the sound
	//  * @param sound the name of the sound to play
	//  * @param options the options for the sound
	//  */
	// public playSound(location: Location, sound: string, options?: IWorldSoundOptions): void {}

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
	public spawnEntity<T extends Entity = Entity>(
		location: Location,
		entity_type: EntityType
	): T | null {
		const javaEntityType = Java.resolve(
			'org.bukkit.entity.EntityType'
		).fromName(entity_type);
		if (!javaEntityType) return null;
		const javaEntity = this.toJava().spawnEntity(
			location.toJava(),
			javaEntityType
		);
		if (!javaEntity) return null;
		return ConstructEntity<T>(javaEntity);
	}

	// /**
	//  * Spawns particles in the world at a location
	//  * @param location the location of the center of the particle spawner
	//  * @param particle the particle to spawn
	//  * @param options options for the particles spawned
	//  */
	// spawnParticle(location: Location, particle: Particle, options?: IWorldParticleOptions): void;

	/**
	 * Strikes lightning in the world at a location
	 * @param location the target location of the strike
	 * @param do_damage whether or not to do damage to entities struck. Defaults to true
	 */
	public strikeLightning(location: Location, do_damage = true): void {
		if (do_damage) this._world.strikeLightning(location.toJava());
		else this._world.strikeLightningEffect(location.toJava());
	}
}

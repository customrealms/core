import '../globals';
import { Block } from '../block/Block';
import { Chunk } from '../chunk/Chunk';
import { ToJava } from '../runtime/ToJava';
import { World } from '../world/World';

export class Location implements ToJava {
	public static fromJava(javaLoc: Java.Value): Location {
		const javaWorld = javaLoc.getWorld();
		return new Location(
			javaWorld ? World.fromJava(javaWorld) : null,
			javaLoc.getX(),
			javaLoc.getY(),
			javaLoc.getZ()
		);
	}

	public constructor(
		private world: World | null,
		private x: number,
		private y: number,
		private z: number,
		private yaw: number = 0,
		private pitch: number = 0
	) {}

	public getWorld(): World | null {
		return this.world;
	}
	public setWorld(world: World | null): void {
		this.world = world;
	}

	public getX(): number {
		return this.x;
	}
	public setX(x: number): void {
		this.x = x;
	}

	public getY(): number {
		return this.y;
	}
	public setY(y: number): void {
		this.y = y;
	}

	public getZ(): number {
		return this.z;
	}
	public setZ(z: number): void {
		this.z = z;
	}

	public getPitch(): number {
		return this.pitch;
	}
	public setPitch(pitch: number): void {
		this.pitch = pitch;
	}

	public getYaw(): number {
		return this.yaw;
	}
	public setYaw(yaw: number): void {
		this.yaw = yaw;
	}

	/**
	 * Gets the block present at this location
	 */
	public getBlock(): Block | null {
		if (!this.world) return null;
		return this.world.getBlockAt(this.x, this.y, this.z);
	}

	/**
	 * Gets the chunk containing this location
	 */
	public getChunk(): Chunk | null {
		return this.getBlock()?.getChunk() ?? null;
	}

	public toJava(): Java.Value {
		return new (Java.resolve('org.bukkit.Location'))(
			(this.world as World)?.toJava() ?? null,
			this.x,
			this.y,
			this.z,
			this.yaw,
			this.pitch
		);
	}
}

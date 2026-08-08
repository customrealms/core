import { Iter } from './iterators';

/**
 * Represents a collection of blocks that can be iterated and modified.
 *
 * Block collections may be backed by a region, a filtered view, an outline,
 * a floor, or any other lazily-generated set of blocks.
 */
export class BlockIterator extends Iter<org.bukkit.block.Block> {
	/**
	 * Iterates over the blocks in this collection.
	 */
	public blocks(): IterableIterator<org.bukkit.block.Block> {
		return this[Symbol.iterator]();
	}

	/**
	 * Checks whether a block belongs to this collection.
	 */
	public contains(
		block: org.bukkit.block.Block | org.bukkit.Location
	): boolean {
		return this.some(
			(current) =>
				current.getWorld() === block.getWorld() &&
				current.getX() === block.getX() &&
				current.getY() === block.getY() &&
				current.getZ() === block.getZ()
		);
	}

	/**
	 * Sets every block in this collection to the given material.
	 */
	public fill(material: org.bukkit.Material): this {
		this.forEach((block) => block.setType(material));
		return this;
	}

	/**
	 * Replaces blocks matching the given predicate.
	 */
	public replace(
		matcher: (block: org.bukkit.block.Block) => boolean,
		replacement: org.bukkit.Material
	): this {
		this.filter(matcher).forEach((block) => block.setType(replacement));
		return this;
	}

	/**
	 * Returns the number of blocks in this collection.
	 *
	 * Note that this iterates the collection.
	 */
	public count(): number {
		return this.reduce((acc) => acc + 1, 0);
	}

	/**
	 * Filters the blocks in this collection with the given predicate.
	 * @param predicate - The predicate to filter the blocks with.
	 * @returns A new BlockIterator containing the filtered blocks.
	 */
	public override filter(
		predicate: (block: org.bukkit.block.Block) => boolean
	): BlockIterator {
		const iterable = this.iterable;
		return new BlockIterator({
			*[Symbol.iterator]() {
				for (const block of iterable) {
					if (predicate(block)) {
						yield block;
					}
				}
			},
		});
	}
}

/**
 * Represents a cuboid region within a single world.
 */
export class Region extends BlockIterator {
	private constructor(
		private readonly world: org.bukkit.World,
		private readonly minX: number,
		private readonly minY: number,
		private readonly minZ: number,
		private readonly maxX: number,
		private readonly maxY: number,
		private readonly maxZ: number
	) {
		super({
			*[Symbol.iterator]() {
				for (let x = minX; x <= maxX; x++) {
					for (let y = minY; y <= maxY; y++) {
						for (let z = minZ; z <= maxZ; z++) {
							yield world.getBlockAt(x, y, z);
						}
					}
				}
			},
		});
	}

	public static between(
		pos1: org.bukkit.Location,
		pos2: org.bukkit.Location
	): Region {
		const world1 = pos1.getWorld();
		const world2 = pos2.getWorld();

		if (world1 === null || world2 === null) {
			throw new Error('Region corners must have a world');
		}

		if (world1 !== world2) {
			throw new Error('Region corners must be in the same world');
		}

		const x1 = pos1.getBlockX();
		const y1 = pos1.getBlockY();
		const z1 = pos1.getBlockZ();

		const x2 = pos2.getBlockX();
		const y2 = pos2.getBlockY();
		const z2 = pos2.getBlockZ();

		return new Region(
			world1,
			Math.min(x1, x2),
			Math.min(y1, y2),
			Math.min(z1, z2),
			Math.max(x1, x2),
			Math.max(y1, y2),
			Math.max(z1, z2)
		);
	}

	/**
	 * Width of the region along the X axis.
	 */
	public width(): number {
		return this.maxX - this.minX + 1;
	}

	/**
	 * Height of the region along the Y axis.
	 */
	public height(): number {
		return this.maxY - this.minY + 1;
	}

	/**
	 * Depth of the region along the Z axis.
	 */
	public depth(): number {
		return this.maxZ - this.minZ + 1;
	}

	/**
	 * Number of blocks contained by the region.
	 */
	public volume(): number {
		return this.width() * this.height() * this.depth();
	}

	/**
	 * Gets the center of the region.
	 */
	public center(): org.bukkit.Location {
		return new org.bukkit.Location(
			this.world,
			(this.minX + this.maxX + 1) / 2,
			(this.minY + this.maxY + 1) / 2,
			(this.minZ + this.maxZ + 1) / 2
		);
	}

	/**
	 * Checks whether a location lies inside the region.
	 */
	public containsLocation(location: org.bukkit.Location): boolean {
		if (location.getWorld() !== this.world) {
			return false;
		}

		const x = location.getBlockX();
		const y = location.getBlockY();
		const z = location.getBlockZ();

		return (
			x >= this.minX &&
			x <= this.maxX &&
			y >= this.minY &&
			y <= this.maxY &&
			z >= this.minZ &&
			z <= this.maxZ
		);
	}

	/**
	 * Checks whether a block lies inside the region.
	 *
	 * Region can do this in constant time rather than iterating.
	 */
	public override contains(block: org.bukkit.block.Block): boolean {
		if (block.getWorld() !== this.world) {
			return false;
		}

		return (
			block.getX() >= this.minX &&
			block.getX() <= this.maxX &&
			block.getY() >= this.minY &&
			block.getY() <= this.maxY &&
			block.getZ() >= this.minZ &&
			block.getZ() <= this.maxZ
		);
	}

	/**
	 * Returns the bottom layer of the region.
	 */
	public floor(): Region {
		return new Region(
			this.world,
			this.minX,
			this.minY,
			this.minZ,
			this.maxX,
			this.minY,
			this.maxZ
		);
	}

	/**
	 * Returns the top layer of the region.
	 */
	public ceiling(): Region {
		return new Region(
			this.world,
			this.minX,
			this.maxY,
			this.minZ,
			this.maxX,
			this.maxY,
			this.maxZ
		);
	}

	/**
	 * Returns the four vertical walls of the region.
	 */
	public walls(): BlockIterator {
		const { minX, maxX, minY, maxY, minZ, maxZ, world } = this;

		return new BlockIterator({
			*[Symbol.iterator]() {
				for (let y = minY; y <= maxY; y++) {
					for (let x = minX; x <= maxX; x++) {
						yield world.getBlockAt(x, y, minZ);

						if (maxZ !== minZ) {
							yield world.getBlockAt(x, y, maxZ);
						}
					}

					for (let z = minZ + 1; z < maxZ; z++) {
						yield world.getBlockAt(minX, y, z);

						if (maxX !== minX) {
							yield world.getBlockAt(maxX, y, z);
						}
					}
				}
			},
		});
	}

	/**
	 * Returns only blocks along the edges of the cuboid.
	 */
	public outline(): BlockIterator {
		return this.filter((block) => {
			const x = block.getX();
			const y = block.getY();
			const z = block.getZ();

			let boundaries = 0;

			if (x === this.minX || x === this.maxX) {
				boundaries++;
			}

			if (y === this.minY || y === this.maxY) {
				boundaries++;
			}

			if (z === this.minZ || z === this.maxZ) {
				boundaries++;
			}

			// An edge belongs to at least two cuboid faces.
			return boundaries >= 2;
		});
	}
}

export class Shapes {
	public static sphere(
		center: org.bukkit.Location,
		radius: number
	): BlockIterator {
		return Region.between(
			center.clone().add(radius, radius, radius),
			center.clone().subtract(radius, radius, radius)
		).filter((block) => {
			const dx = block.getX() - center.getX();
			const dy = block.getY() - center.getY();
			const dz = block.getZ() - center.getZ();
			return dx * dx + dy * dy + dz * dz <= radius * radius;
		});
	}
}

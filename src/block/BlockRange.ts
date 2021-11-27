import { Block } from './Block'
import { Location } from '../util/Location'
import { World } from '../world/World'

export class BlockRange {
	private world: World | null = null
	private x1: number = 0
	private y1: number = 0
	private z1: number = 0
	private x2: number = 0
	private y2: number = 0
	private z2: number = 0

	public constructor(...args: any[]) {
		// If it's the first constructor
		if (
			args.length === 2 &&
			typeof args[0] === 'object' &&
			typeof args[1] === 'object'
		) {
			// Cast them to locations
			const loc1: Location = args[0] as Location
			const loc2: Location = args[1] as Location

			// Pull the range values
			this.world = loc1.getWorld()
			this.x1 = loc1.getX()
			this.y1 = loc1.getY()
			this.z1 = loc1.getZ()
			this.x2 = loc2.getX()
			this.y2 = loc2.getY()
			this.z2 = loc2.getZ()
		} else if (
			args.length === 7 &&
			typeof args[0] === 'object' &&
			typeof args[1] === 'number' &&
			typeof args[2] === 'number' &&
			typeof args[3] === 'number' &&
			typeof args[4] === 'number' &&
			typeof args[5] === 'number' &&
			typeof args[6] === 'number'
		) {
			// Pull all the values
			this.world = args[0] as World
			this.x1 = args[1] as number
			this.y1 = args[2] as number
			this.z1 = args[3] as number
			this.x2 = args[4] as number
			this.y2 = args[5] as number
			this.z2 = args[6] as number
		}
	}

	/**
	 * Loops through the range of blocks and executes a handler for each
	 * block in the range. If the callback function returns `false`, the iteration
	 * will stop;
	 * @param callback the callback function
	 */
	public forEach(callback: (block: Block) => boolean | void): void {
		// Calculate the bounds
		const min_x: number = Math.min(this.x1, this.x2)
		const max_x: number = Math.max(this.x1, this.x2)
		const min_y: number = Math.min(this.y1, this.y2)
		const max_y: number = Math.max(this.y1, this.y2)
		const min_z: number = Math.min(this.z1, this.z2)
		const max_z: number = Math.max(this.z1, this.z2)

		// Loop through the coordinates
		for (let x = min_x; x <= max_x; x++) {
			for (let y = min_y; y <= max_y; y++) {
				for (let z = min_z; z <= max_z; z++) {
					// Create the location
					const location: Location = new Location(this.world, x, y, z)

					// Get the block at this location
					const block: Block | null = location.getBlock()
					if (!block) continue

					// Execute the handler
					if (callback(block) === false) return
				}
			}
		}
	}

	/**
	 * Gets the total number of blocks contained in the range
	 */
	public count(): number {
		// Return the total
		return (
			(1 + Math.abs(this.x1 - this.x2)) *
			(1 + Math.abs(this.y1 - this.y2)) *
			(1 + Math.abs(this.z1 - this.z2))
		)
	}

	/**
	 * Gets the block at a provided index in the range. If the index is out of bounds,
	 * the method returns null.
	 * @param index the index to fetch
	 */
	public get(index: number): Block | null {
		// Calculate the bounds
		const min_x: number = Math.min(this.x1, this.x2)
		const max_x: number = Math.max(this.x1, this.x2)
		const min_y: number = Math.min(this.y1, this.y2)
		const max_y: number = Math.max(this.y1, this.y2)
		const min_z: number = Math.min(this.z1, this.z2)
		const max_z: number = Math.max(this.z1, this.z2)

		// Count the length on each axis
		// const size_x: number = max_x - min_x + 1;
		const size_y: number = max_y - min_y + 1
		const size_z: number = max_z - min_z + 1

		// Calculate the components
		const x: number = Math.floor(index / (size_y * size_z))
		const yz: number = index % (size_y * size_z)
		const y: number = Math.floor(yz / size_z)
		const z: number = yz % size_z

		// Create the location
		const location: Location = new Location(
			this.world,
			min_x + x,
			min_y + y,
			min_z + z
		)

		// Get the block at this location
		return location.getBlock()
	}
}

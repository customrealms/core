export class BlockFace {
	public static readonly DOWN: BlockFace = new BlockFace('DOWN')!
	public static readonly EAST: BlockFace = new BlockFace('EAST')!
	public static readonly EAST_NORTH_EAST: BlockFace = new BlockFace(
		'EAST_NORTH_EAST'
	)!
	public static readonly EAST_SOUTH_EAST: BlockFace = new BlockFace(
		'EAST_SOUTH_EAST'
	)!
	public static readonly NORTH: BlockFace = new BlockFace('NORTH')!
	public static readonly NORTH_EAST: BlockFace = new BlockFace('NORTH_EAST')!
	public static readonly NORTH_NORTH_EAST: BlockFace = new BlockFace(
		'NORTH_NORTH_EAST'
	)!
	public static readonly NORTH_NORTH_WEST: BlockFace = new BlockFace(
		'NORTH_NORTH_WEST'
	)!
	public static readonly NORTH_WEST: BlockFace = new BlockFace('NORTH_WEST')!
	public static readonly SELF: BlockFace = new BlockFace('SELF')!
	public static readonly SOUTH: BlockFace = new BlockFace('SOUTH')!
	public static readonly SOUTH_EAST: BlockFace = new BlockFace('SOUTH_EAST')!
	public static readonly SOUTH_SOUTH_EAST: BlockFace = new BlockFace(
		'SOUTH_SOUTH_EAST'
	)!
	public static readonly SOUTH_SOUTH_WEST: BlockFace = new BlockFace(
		'SOUTH_SOUTH_WEST'
	)!
	public static readonly SOUTH_WEST: BlockFace = new BlockFace('SOUTH_WEST')!
	public static readonly UP: BlockFace = new BlockFace('UP')!
	public static readonly WEST: BlockFace = new BlockFace('WEST')!
	public static readonly WEST_NORTH_WEST: BlockFace = new BlockFace(
		'WEST_NORTH_WEST'
	)!
	public static readonly WEST_SOUTH_WEST: BlockFace = new BlockFace(
		'WEST_SOUTH_WEST'
	)!

	/**
	 * Gets the block face with a given name
	 * @param name the name of the block face
	 */
	public static named(name: string): BlockFace | null {
		// Convert the name to upper case
		name = name.toUpperCase()

		// If the name is in the class
		if (name in BlockFace && (BlockFace as any)[name] instanceof BlockFace)
			return (BlockFace as any)[name]

		// Return null otherwise
		return null
	}

	private constructor(private name: string) {}

	/**
	 * Gets the face opposite to this one
	 */
	public getOppositeFace(): BlockFace {
		// Get the opposite name
		const opposite_name: string = this.name
			.split('_')
			.map((part) => {
				if (part === 'NORTH') return 'SOUTH'
				if (part === 'SOUTH') return 'NORTH'
				if (part === 'EAST') return 'WEST'
				if (part === 'WEST') return 'EAST'
				return part
			})
			.join('_')

		// Find the direction with the name
		return BlockFace.named(opposite_name)!
	}
}

/** Causes that generate lightning strikes  */
export enum LightningStrikeEventCause {
	/**
	 * Triggered by the /summon command.
	 */
	COMMAND = 'COMMAND',
	/**
	 * Triggered by a Plugin.
	 */
	CUSTOM = 'CUSTOM',
	/**
	 * Triggered by a Spawner.
	 */
	SPAWNER = 'SPAWNER',
	/**
	 * Triggered by a skeleton horse trap.
	 */
	TRAP = 'TRAP',
	/**
	 * Triggered by an enchanted trident.
	 */
	TRIDENT = 'TRIDENT',
	/**
	 * Unknown trigger.
	 */
	UNKNOWN = 'UNKNOWN',
	/**
	 * Triggered by weather.
	 */
	WEATHER = 'WEATHER',
}

import { Inventory } from '../../inventory/Inventory'
import { ConstructInventory } from '../../inventory/InventoryConstructors'
import { InventoryView } from '../../inventory/InventoryView'
import { InventoryViewProperty } from '../../inventory/InventoryViewProperty'
import { PlayerInventory } from '../../inventory/types'
import { ItemStack } from '../../material/ItemStack'
import { Material } from '../../material/Material'
import { GameMode } from '../../player/GameMode'
import { Extends } from '../../runtime/Extends'
import { Location } from '../../util/Location'
import { LivingEntity } from './LivingEntity'

export interface HumanEntity extends LivingEntity {}

@Extends(LivingEntity)
export class HumanEntity {
	/**
	 * Closes the currently-open inventory for this player
	 */
	public closeInventory(): void {
		this.toJava().closeInventory()
	}

	/**
	 * Gets the current cooldown for a player's attack
	 */
	public getAttackCooldown(): number {
		return this.toJava().getAttackCooldown()
	}

	/**
	 * Gets the location of the bed the player is currently sleeping in
	 */
	public getBedLocation(): Location | null {
		return Location.fromJava(this.toJava().getBedLocation())
	}

	/**
	 * Gets the location where the player will spawn at their bed. Returns null if they
	 * have not slept in a bed, or if their current bed spawn is invalid
	 */
	public getBedSpawnLocation(): Location {
		return Location.fromJava(this.toJava().getBedLocation())!
	}

	/**
	 * Gets the remaining cooldown (in ticks) for the specified material
	 * @param material the material to check
	 */
	public getCooldown(material: Material): number {
		return this.toJava().getCooldown(material.toJava())
	}

	/**
	 * Gets the player's ender chest inventory
	 */
	public getEnderChest(): Inventory {
		const javaInv = this.toJava().getEnderChest()
		return ConstructInventory(javaInv)
	}

	/**
	 * Gets the total amount of experience required for the player to level up
	 */
	public getExpToLevel(): number {
		return this.toJava().getExpToLevel()
	}

	/**
	 * Gets the game mode of the player
	 */
	public getGameMode(): GameMode {
		return this.toJava().getGameMode().name()
	}

	/**
	 * Gets the inventory of the player
	 */
	public getInventory(): PlayerInventory {
		const javaInv = this.toJava().getInventory()
		return new PlayerInventory(javaInv)
	}

	/**
	 * Gets the item currently on the player's cursor. Can be empty
	 */
	public getItemOnCursor(): ItemStack {
		const javaItemStack = this.toJava().getItemOnCursor()
		return ItemStack.fromJava(javaItemStack)
	}

	/**
	 * Gets the main hand of the player
	 */
	public getMainHand(): 'left' | 'right' {
		const javaMainHand = this.toJava().getMainHand()
		return javaMainHand.name().toLowerCase()
	}

	/**
	 * Gets the name of the player
	 */
	public getName(): string {
		return this.toJava().getName()
	}

	/**
	 * Gets the inventory that the player is currently viewing
	 */
	public getOpenInventory(): InventoryView | null {
		const javaInvView = this.toJava().getOpenInventory()
		if (!javaInvView) return null
		return new InventoryView(javaInvView)
	}

	/**
	 * Gets the sleep ticks of the player
	 */
	public getSleepTicks(): number {
		return this.toJava().getSleepTicks()
	}

	/**
	 * Checks if a material has a cooldown
	 * @param material the material to check
	 */
	public hasCooldown(material: Material): boolean {
		return this.toJava().hasCooldown(material.toJava())
	}

	/**
	 * Checks if the player is currently blocking with a shield
	 */
	public isBlocking(): boolean {
		return this.toJava().isBlocking()
	}

	/**
	 * Checs if the player currently has their hand raised, like when about to
	 * begin blocking.
	 */
	public isHandRaised(): boolean {
		return this.toJava().isHandRaised()
	}

	/**
	 * Opens an empty enchanting inventory window with the player's inventory on bottom
	 * @param location the location to attach to, or null to use the player's location
	 * @param force set to true to open even if there is no enchanting table nearby
	 */
	public openEnchanting(
		location: Location | null,
		force: boolean
	): InventoryView | null {
		// TODO: Not implemented
		return null as any
	}

	/**
	 * Opens an inventory window to the specified inventory view
	 * @param inventory the inventory view to open
	 */
	public openInventory(
		inventory: InventoryView | Inventory
	): void | InventoryView {
		return this.toJava().openInventory(inventory.toJava())
	}

	// /**
	//  * Starts a trade between the player and a villager. Only one player may trade with a villager
	//  * at a time.
	//  * @param trader the merchant to trade with
	//  * @param force set to true to open even if another player if trading
	//  */
	// openMerchant(trader: Villager | Merchant, force: boolean): InventoryView | null;

	/**
	 * Opens a workbench for the player
	 * @param location the location of the workbench, or null to use the player's location
	 * @param force set to true to open even if there is no workbench nearby
	 */
	public openWorkbench(
		location: Location | null,
		force: boolean
	): InventoryView | null {
		// TODO: Not implemented
		return null as any
	}

	/**
	 * Sets the location where the player will spawn at their bed
	 * @param location the location of the bed
	 * @param force set true to set even if no valid bed is present
	 */
	public setBedSpawnLocation(
		location: Location | null,
		force?: boolean
	): void {
		this.toJava().setBedSpawnLocation(
			location?.toJava() ?? null,
			force ?? false
		)
	}

	/**
	 * Sets the cooldown of a material for this player
	 * @param material the material to set
	 * @param ticks the number of ticks remaining in the cooldown
	 */
	public setCooldown(material: Material, ticks: number): void {
		this.toJava().setCooldown(material.toJava(), ticks)
	}

	/**
	 * Sets the game mode of the player
	 * @param mode the game mode to use
	 */
	public setGameMode(gamemode: GameMode): void {
		const javaGameMode = Java.resolve('org.bukkit.GameMode').valueOf(
			gamemode
		)
		this.toJava().setGameMode(javaGameMode)
	}

	/**
	 * Sets the item on the player's cursor. Will replace whatever the user was moving
	 * @param item the item to set
	 */
	public setItemOnCursor(item: ItemStack | null): void {
		this.toJava().setItemOnCursor(item?.toJava() ?? null)
	}

	/**
	 * If the player has an inventory window open, this method sets a property of that window,
	 * such as the state of a progress bar
	 * @param property the property to set
	 * @param value the value to set
	 */
	public setWindowProperty(
		property: InventoryViewProperty,
		value: number
	): boolean {
		const javaProp = Java.resolve(
			'org.bukkit.inventory.InventoryView.Property'
		).valueOf(property)
		if (!javaProp) return false
		return this.toJava().setWindowProperty(javaProp, value)
	}

	/**
	 * Attempts to make the entity sleep at a given location
	 * @param location the location to sleep at
	 * @param force set to true to sleep even if there is no valid bed
	 */
	public sleep(location: Location, force: boolean): boolean {
		return this.toJava().sleep(location.toJava(), force)
	}

	/**
	 * Wakes up the player if they are currently sleeping
	 * @param set_spawn whether or not to set the spawn location
	 */
	public wakeup(set_spawn?: boolean): void {
		this.toJava().wakeup(set_spawn ?? false)
	}
}

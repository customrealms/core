import { ServerEvents } from './events/ServerEvents';

/**
 * Factory for creating inventory menu builders.
 */
export class Menus {
	/**
	 * Creates a new inventory menu builder.
	 * @param title the menu title
	 * @param rows the number of inventory rows (defaults to 3)
	 * @returns a new menu builder
	 */
	public static create<T>(title: string, rows = 3): MenuBuilder<T> {
		return new MenuBuilder<T>(title, rows);
	}
}

const INVENTORY_ROWS_MIN = 1;
const INVENTORY_ROWS_MAX = 6;
const INVENTORY_COLUMNS = 9;

/**
 * Fluent menu builder for creating asynchronous inventory selection UIs.
 */
export class MenuBuilder<T> {
	private readonly values = new Map<number, T>();
	private readonly items = new Map<number, org.bukkit.inventory.ItemStack>();
	private fillItem: org.bukkit.inventory.ItemStack | null = null;

	constructor(private readonly title: string, private readonly rows: number) {
		if (!Number.isInteger(rows)) {
			throw new Error(`rows must be an integer, got: ${rows}`);
		}
		if (rows < INVENTORY_ROWS_MIN || rows > INVENTORY_ROWS_MAX) {
			throw new Error(
				`rows must be between ${INVENTORY_ROWS_MIN} and ${INVENTORY_ROWS_MAX}, got: ${rows}`
			);
		}
	}

	/**
	 * Registers a button in a menu slot and associates it with a value.
	 * @param slot the inventory slot index
	 * @param item the item to display in the slot
	 * @param value the value to resolve when the button is clicked
	 * @returns this builder for fluent chaining
	 */
	public button(
		slot: number,
		item: org.bukkit.inventory.ItemStack,
		value: T
	): this {
		this.assertSlotInBounds(slot);
		this.items.set(slot, item);
		this.values.set(slot, value);
		return this;
	}

	/**
	 * Fills all currently empty slots with the given item.
	 * @param item the filler item
	 * @returns this builder for fluent chaining
	 */
	public fill(item: org.bukkit.inventory.ItemStack): this {
		this.fillItem = item;
		return this;
	}

	/**
	 * Opens the menu for a player and waits for a selection.
	 * @param player the player to open the menu for
	 * @returns the selected value, or null if the inventory is closed without selecting
	 */
	public async open(player: org.bukkit.entity.Player): Promise<T | null> {
		const size = this.rows * INVENTORY_COLUMNS;
		const inventory = org.bukkit.Bukkit.createInventory(
			null,
			size,
			this.title
		);

		for (const [slot, item] of this.items.entries()) {
			inventory.setItem(slot, item);
		}

		if (this.fillItem !== null) {
			for (let slot = 0; slot < size; slot++) {
				if (!this.items.has(slot)) {
					inventory.setItem(slot, this.fillItem);
				}
			}
		}

		player.openInventory(inventory);

		const event = await ServerEvents.waitFor(
			[
				org.bukkit.event.inventory.InventoryClickEvent,
				org.bukkit.event.inventory.InventoryDragEvent,
				org.bukkit.event.inventory.InventoryCloseEvent,
			],
			(rawEvent: org.bukkit.event.inventory.InventoryEvent) => {
				if (
					rawEvent instanceof
					org.bukkit.event.inventory.InventoryClickEvent
				) {
					const clickEvent = rawEvent;
					if (clickEvent.getWhoClicked() !== player) return false;
					if (clickEvent.getView().getTopInventory() !== inventory)
						return false;

					// Block all interaction while this menu is open.
					clickEvent.setCancelled(true);

					// Only top-inventory button clicks resolve a selection.
					if (clickEvent.getClickedInventory() !== inventory) {
						return false;
					}
					return this.values.has(clickEvent.getSlot());
				}

				if (
					rawEvent instanceof
					org.bukkit.event.inventory.InventoryDragEvent
				) {
					const dragEvent = rawEvent;
					if (dragEvent.getWhoClicked() !== player) return false;
					if (dragEvent.getView().getTopInventory() !== inventory)
						return false;

					// Prevent dragging items in or out of the menu.
					dragEvent.setCancelled(true);
					return false;
				}

				if (
					rawEvent instanceof
					org.bukkit.event.inventory.InventoryCloseEvent
				) {
					const closeEvent = rawEvent;
					if (closeEvent.getPlayer() !== player) return false;
					return closeEvent.getInventory() === inventory;
				}

				return false;
			}
		);

		if (event instanceof org.bukkit.event.inventory.InventoryClickEvent) {
			const selectedValue = this.values.get(event.getSlot());
			player.closeInventory();
			return selectedValue ?? null;
		}

		return null;
	}

	private assertSlotInBounds(slot: number): void {
		const size = this.rows * INVENTORY_COLUMNS;
		if (!Number.isInteger(slot)) {
			throw new Error(`slot must be an integer, got: ${slot}`);
		}
		if (slot < 0 || slot >= size) {
			throw new Error(
				`slot must be between 0 and ${size - 1}, got: ${slot}`
			);
		}
	}
}

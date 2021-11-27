/** An estimation of what the result will be. */
export enum InventoryAction {
	/** A max-size stack of the clicked item is put on the cursor. */
	CLONE_STACK = 'CLONE_STACK',
	/** The inventory is searched for the same material, and they are put on the cursor up to Material.getMaxStackSize(). */
	COLLECT_TO_CURSOR = 'COLLECT_TO_CURSOR',
	/** The entire cursor item is dropped. */
	DROP_ALL_CURSOR = 'DROP_ALL_CURSOR',
	/** The entire clicked slot is dropped. */
	DROP_ALL_SLOT = 'DROP_ALL_SLOT',
	/** One item is dropped from the cursor. */
	DROP_ONE_CURSOR = 'DROP_ONE_CURSOR',
	/** One item is dropped from the clicked slot */
	DROP_ONE_SLOT = 'DROP_ONE_SLOT',
	/** The clicked item is moved to the hotbar, and the item currently there is re-added to the player's inventory. */
	HOTBAR_MOVE_AND_READD = 'HOTBAR_MOVE_AND_READD',
	/** The clicked slot and the picked hotbar slot are swapped. */
	HOTBAR_SWAP = 'HOTBAR_SWAP',
	/** The item is moved to the opposite inventory if a space is found */
	MOVE_TO_OTHER_INVENTORY = 'MOVE_TO_OTHER_INVENTORY',
	/** Nothing will happen from the click */
	NOTHING = 'NOTHING',
	/** All of the items on the clicked slot are moved to the cursor */
	PICKUP_ALL = 'PICKUP_ALL',
	/** Half of the items on the clicked slot are moved to the cursor */
	PICKUP_HALF = 'PICKUP_HALF',
	/** One of the items on the clicked slot are moved to the cursor */
	PICKUP_ONE = 'PICKUP_ONE',
	/** Some of the items on the clicked slot are moved to the cursor */
	PICKUP_SOME = 'PICKUP_SOME',
	/** All of the items on the cursor are moved to the clicked slot */
	PLACE_ALL = 'PLACE_ALL',
	/** A single item from the cursor is moved to the clicked slot */
	PLACE_ONE = 'PLACE_ONE',
	/** Some of the items from the cursor are moved to the clicked slot (usually up to the max stack size) */
	PLACE_SOME = 'PLACE_SOME',
	/** The clicked item and the cursor are exchanged */
	SWAP_WITH_CURSOR = 'SWAP_WITH_CURSOR',
	/** An unrecognized ClickType */
	UNKNOWN = 'UNKNOWN',
}

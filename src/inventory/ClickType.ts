/** What the client did to trigger this action (not the result). */
export enum ClickType {
  /** Holding Ctrl while pressing the "Drop" key (defaults to Q) */
  CONTROL_DROP = 'CONTROL_DROP',
  /** Any action done with the Creative inventory open */
  CREATIVE = 'CREATIVE',
  /** Pressing the left mouse button twice in quick succession */
  DOUBLE_CLICK = 'DOUBLE_CLICK',
  /** The "Drop" key (defaults to Q) */
  DROP = 'DROP',
  /** The left (or primary) mouse button */
  LEFT = 'LEFT',
  /** The middle mouse button, or a "scrollwheel click" */
  MIDDLE = 'MIDDLE',
  /** One of the number keys 1-9, correspond to slots on the hotbar */
  NUMBER_KEY = 'NUMBER_KEY',
  /** The right mouse button */
  RIGHT = 'RIGHT',
  /** Holding shift while pressing the left mouse button */
  SHIFT_LEFT = 'SHIFT_LEFT',
  /** Holding shift while pressing the right mouse button */
  SHIFT_RIGHT = 'SHIFT_RIGHT',
  /** The "swap item with offhand" key (defaults to F) */
  SWAP_OFFHAND = 'SWAP_OFFHAND',
  /** A type of inventory manipulation not yet recognized by CustomRealms */
  UNKNOWN = 'UNKNOWN',
  /** Clicking the left mouse button on the grey area around the inventory */
  WINDOW_BORDER_LEFT = 'WINDOW_BORDER_LEFT',
  /** Clicking the right mouse button on the grey area around the inventory */
  WINDOW_BORDER_RIGHT = 'WINDOW_BORDER_RIGHT',
}

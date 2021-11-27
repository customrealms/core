export interface Cancellable {
	/**
	 * Gets the cancellation state of this event
	 */
	isCancelled(): boolean

	/**
	 * Sets the cancellation state of this event
	 * @param cancelled whether or not to cancel the event
	 */
	setCancelled(cancelled: boolean): void
}

export interface EventHandle {
	release(): void;
}

export class ServerEvents {
	/**
	 * Registers a server event handler function
	 * @param event_class the class for the type of event to register for
	 * @param handler the handler function to be triggered when the event occurs
	 * @returns a handle that can be released
	 */
	public static register<T extends org.bukkit.event.Event>(
		classpath: string,
		handler: (event: T) => void
	): EventHandle | null {
		// Register the handler
		const handle = __events_register<T>(classpath, handler);

		// Return the wrapped handle
		return {
			release: () => __events_unregister(handle),
		};
	}
}

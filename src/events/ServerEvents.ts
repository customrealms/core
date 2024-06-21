export interface EventHandle {
	release(): void;
}

type EventClass<T extends org.bukkit.event.Event> = {
	new (...args: any[]): T;
};

export class ServerEvents {
	/**
	 * Registers a server event handler function
	 * @param event_class the class for the type of event to register for
	 * @param handler the handler function to be triggered when the event occurs
	 * @returns a handle that can be released
	 */
	public static register<T extends org.bukkit.event.Event>(
		event_class: EventClass<T>,
		handler: (event: T) => void
	): EventHandle | null {
		// Get the Java classpath for the event
		const classpath = (event_class as any).class.getCanonicalName();

		// Register the handler
		const handle = __events_register<T>(classpath, handler);

		// Return the wrapped handle
		return {
			release: () => __events_unregister(handle),
		};
	}
}

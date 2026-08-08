import { streamEvents } from '../util/stream';

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

	/**
	 * Waits for a server event to occur and returns a promise that resolves with the event.
	 * @param event_class the class for the type of event to wait for
	 * @param matcher the matcher function to determine if the event should be resolved
	 * @param timeout the timeout in milliseconds
	 * @returns a promise that resolves with the event
	 */
	public static waitFor<T extends org.bukkit.event.Event>(
		event_class: EventClass<T>,
		matcher?: (event: T) => boolean,
		timeout?: number
	): Promise<T>;
	/**
	 * Waits for one of several server events and resolves with the first matching event.
	 * @param event_classes the classes for event types to wait for
	 * @param matcher the matcher function to determine if an event should be resolved
	 * @param timeout the timeout in milliseconds
	 * @returns a promise that resolves with the first matching event
	 */
	public static waitFor<T extends org.bukkit.event.Event>(
		event_classes: Array<EventClass<T>>,
		matcher?: (event: T) => boolean,
		timeout?: number
	): Promise<T>;
	public static waitFor<T extends org.bukkit.event.Event>(
		event_class_or_classes: EventClass<T> | Array<EventClass<T>>,
		matcher?: (event: T) => boolean,
		timeout?: number
	): Promise<T> {
		if (!matcher) matcher = () => true;

		return new Promise((resolve, reject) => {
			try {
				const eventClasses = Array.isArray(event_class_or_classes)
					? event_class_or_classes
					: [event_class_or_classes];
				if (eventClasses.length === 0) {
					reject(new Error('event_classes must not be empty'));
					return;
				}

				// Set a timeout for the promise
				let timeoutID: number | undefined;
				const handles: EventHandle[] = [];

				// Cleanup function
				const cleanup = () => {
					if (timeoutID !== undefined) {
						clearTimeout(timeoutID);
						timeoutID = undefined;
					}
					for (const handle of handles) {
						handle.release();
					}
					handles.length = 0;
				};

				if (timeout) {
					timeoutID = setTimeout(() => {
						reject(new Error('Timeout waiting for event'));
						cleanup();
					}, timeout);
				}

				// Register handlers
				for (const eventClass of eventClasses) {
					const handle = this.register(eventClass, (event) => {
						try {
							if (matcher(event)) {
								cleanup();
								resolve(event);
							}
						} catch (err) {
							cleanup();
							reject(err);
						}
					});
					if (handle !== null) {
						handles.push(handle);
					}
				}
			} catch (err) {
				reject(err);
			}
		});
	}

	/**
	 * Streams server events asynchronously.
	 * @param event_class the class for the type of event to stream
	 * @returns an async iterable that emits the events
	 */
	public static stream<T extends org.bukkit.event.Event>(
		event_class: EventClass<T>
	): AsyncIterable<T> {
		return streamEvents(
			(callback) => ServerEvents.register(event_class, callback),
			(handle) => handle?.release()
		);
	}
}

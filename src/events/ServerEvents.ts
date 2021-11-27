import { Constructor } from '../types/Constructor'
import { BukkitEventWrapper } from './BukkitEventWrapper'
import { Event } from './types/Event'

export interface EventHandle {
	release(): void
}

export class ServerEvents {
	/**
	 * Registers a server event handler function
	 * @param event_class the class for the type of event to register for
	 * @param handler the handler function to be triggered when the event occurs
	 * @returns a handle that can be released
	 */
	public static register<T extends Event>(
		event_class: Constructor<T> & BukkitEventWrapper,
		handler: (event: T) => void
	): EventHandle | null {
		// Find the mapping for the type
		const classpath = event_class?.getBukkitClasspath?.()
		if (!classpath) return null

		// Register the handler
		const handle = BukkitEvents.register(
			classpath,
			(_event: Java.Value) => {
				// Create the wrapped, cleaner event instance
				const event = new event_class(_event) as T

				// Call the function
				handler(event)
			}
		)

		// Return the wrapped handle
		return {
			release: () => BukkitEvents.unregister(handle),
		}
	}
}

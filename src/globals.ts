export {};

// The globals found in this file are documented here, but implemented in Java in the `bukkit-runtime` project.
// They are dynamically inserted as global variables / functions in the CustomRealms runtime

declare global {
	namespace Java {
		/**
		 * Gets a Java type (class, enum, etc.) by its classpath.
		 * @param classpath the Java classpath to the type being requested
		 */
		function type<T = any>(classpath: string): T;

		type Value = any;
	}

	/**
	 * Registers an event handler, responding to a specific type of event as defined by the Java classpath
	 * to the corresponding Event class in the Bukkit API. This function returns a handle number that can
	 * be used to unregister the event listener.
	 *
	 * The event value passed to the handler is the raw Java.Value object for the underlying Bukkit event
	 * object.
	 *
	 * @param event_classpath the Java classpath to the Bukkit event being listened for
	 * @param handler the handler function that will be triggered each time the event occurs
	 */
	function __events_register<T extends org.bukkit.event.Event>(
		event_classpath: string,
		handler: (event: T) => void
	): number;

	/**
	 * Unregisters an event handler, so it will stop receiving events
	 * @param handle the handle number of the previously-registered event handler
	 */
	function __events_unregister(handle: number): void;

	/**
	 * Registers a command handler, which is a function that is called each time a command is issued by a player. The function you
	 * provide should return true if the command is recognized as corresponding to your plugin. If you don't recognize the command,
	 * return false so that another plugin on the server will be able to respond to it.
	 * @param handler the handler function to be called
	 */
	function __commands_register(
		name: string,
		handler: (
			sender: org.bukkit.command.CommandSender,
			label: string,
			args: JavaArray<string>
		) => boolean
	): boolean;
}

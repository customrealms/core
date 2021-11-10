export {};

// The globals found in this file are documented here, but implemented in Java in the `bukkit-runtime` project.
// They are dynamically inserted as global variables / functions in the CustomRealms runtime

declare global {

    /**
     * Java namespace contains functions for interacting with Java objects / types from within the JavaScript runtime
     */
    namespace Java {

        /**
         * Java.Value represents a wrapped Java object that is returned by the Java.resolve type
         */
        type Value = any;

        /**
         * Resolves a Java class or value in order to perform operations on it from within your JavaScript code
         * @param classpath the Java classpath to the class or value you wish to resolve
         */
        function resolve<T = Java.Value>(classpath: string): T | undefined;

    }

    /**
     * ServerEvents namespace contains functions that enable the caller to listen for Minecraft server events
     */
    namespace ServerEvents {

        /**
         * Registers an event handler, responding to a specific type of event as defined by the Java classpath
         * to the corresponding Event class in the Bukkit API. This function returns a handle number that can
         * be used to unregister the event listener.
         * @param event_classpath the Java classpath to the Bukkit event being listened for
         * @param handler the handler function that will be triggered each time the event occurs
         */
        function register<T>(event_classpath: string, handler: (event: T) => void): number;

        /**
         * Unregisters an event handler, so it will stop receiving events
         * @param handle the handle number of the previously-registered event handler
         */
        function unregister(handle: number): void;

    }

    /**
     * ServerCommands namespace contains functions for responding to player-issued commands
     */
    namespace ServerCommands {

        /**
         * Registers a command handler, which is a function that is called each time a command is issued by a player. The function you
         * provide should return true if the command is recognized as corresponding to your plugin. If you don't recognize the command,
         * return false so that another plugin on the server will be able to respond to it.
         * @param handler the handler function to be called
         */
        function register(handler: (player_uuid: string, message: string) => boolean): number;

        /**
         * Unregisters a command handler, so it will stop receiving command events
         * @param handle the handle numbe of the previously-registered command handler
         */
        function unregister(handle: number): void;

    }

}

# @customrealms/core

<img src="https://github.com/customrealms/brand/blob/master/icon-solid/icon-solid.png" width="200" alt="CustomRealms Logo" />

This repo contains the core library for CustomRealms, the JavaScript runtime for Minecraft server plugins.

### Installation

```sh
npm install --save @customrealms/core
```

### Example #1 - Events

```ts
import { ServerEvents } from '@customrealms/core';

// Send a welcome message when a player joins the server
ServerEvents.register(org.bukkit.event.player.PlayerJoinEvent, (event) => {
	const player = event.getPlayer();
	event.setJoinMessage(`${player.getName()} joined the server!`);
});
```

### Example #2 - Commands

```ts
import { ServerCommands } from '@customrealms/core';

// Strike lightning where the player is looking
ServerCommands.register('/strike', (player) => {
	const block = player.getTargetBlockExact(100);
	if (!block) return;
	const location = block.getLocation();
	location.getWorld()?.strikeLightning(location);
});
```

## How it works

By default, without this library, the CustomRealms JavaScript runtime has access to all of the Java and Bukkit classes and functions.

This library serves several important purposes:

-   Provides TypeScript type declarations for the native Java / Bukkit types.
-   Implements a clean abstraction layer to make certain common tasks easier (such as commands, events, etc.)
-   Adds polyfills to support modern ES6+ features.

## Contributing

We need your help to implement new features, fix bugs, and optimize the entire system. If you want to help, please join our [Discord](https://discord.gg/bsTearKQsm) and/or check out the [Issues tab](https://github.com/customrealms/core/issues).

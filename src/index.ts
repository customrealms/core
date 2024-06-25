export * from './java';
export * from './bukkit';
export * from './globals';

// Polyfills for ES6 features that are not available in Nashorn
import './polyfill/array';

// Convenience exports of some common classes
export const Bukkit = org.bukkit.Bukkit;

export * from './command/CommandCall';
export * from './command/ServerCommands';
export * from './events/ServerEvents';

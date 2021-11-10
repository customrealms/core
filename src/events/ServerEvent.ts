// import 'reflect-metadata';
// import { Constructor } from '../types/Constructor';
// import { initialize_service_prototype, IServiceBindings } from '../types/Service';
// import { BlockBreakEvent } from './types/BlockBreakEvent';
// import { EntityDamageByBlockEvent } from './types/EntityDamageByBlockEvent';
// import { EntityDamageByEntityEvent } from './types/EntityDamageByEntityEvent';
// import { Event } from './types/Event';
// import { PlayerChatEvent } from './types/PlayerChatEvent';
// import { PlayerInteractEvent } from './types/PlayerInteractEvent';
// import { PlayerJoinEvent } from './types/PlayerJoinEvent';
// import { PlayerMoveEvent } from './types/PlayerMoveEvent';
// import { PlayerQuitEvent } from './types/PlayerQuitEvent';

// interface IBukkitEventMapping {
//     classpath: string;
//     event: Constructor<Event>;
// }

// const bukkit_event_types: IBukkitEventMapping[] = [
//     {
//         classpath: 'org.bukkit.event.player.PlayerJoinEvent',
//         event: PlayerJoinEvent
//     },
//     {
//         classpath: 'org.bukkit.event.player.PlayerQuitEvent',
//         event: PlayerQuitEvent
//     },
//     {
//         classpath: 'org.bukkit.event.block.BlockBreakEvent',
//         event: BlockBreakEvent
//     },
//     {
//         classpath: 'org.bukkit.event.player.PlayerChatEvent',
//         event: PlayerChatEvent
//     },
//     {
//         classpath: 'org.bukkit.event.player.PlayerInteractEvent',
//         event: PlayerInteractEvent
//     },
//     {
//         classpath: 'org.bukkit.event.entity.EntityDamageByEntityEvent',
//         event: EntityDamageByEntityEvent
//     },
//     {
//         classpath: 'org.bukkit.event.entity.EntityDamageByBlockEvent',
//         event: EntityDamageByBlockEvent
//     },
//     {
//         classpath: 'org.bukkit.event.player.PlayerMoveEvent',
//         event: PlayerMoveEvent
//     }
// ];

// export function ServerEvent(target: any, propertyKey: string, descriptor?: PropertyDescriptor) {

//     // Get the parameters for the function
//     const paramTypes: any[] = Reflect.getMetadata('design:paramtypes', target, propertyKey) ?? [];
//     if (paramTypes.length === 0) return;

//     // Find the mapping for the type
//     const mapping: IBukkitEventMapping | undefined = bukkit_event_types.find(m => {
//         return !!paramTypes.find(pt => pt === m.event);
//     });
//     if (!mapping) return;

//     // Get the bindings for the class
//     const bindings: IServiceBindings = initialize_service_prototype(target);

//     // Add the event handler
//     bindings.server_events.push({
//         target: target,
//         propertyKey: propertyKey,
//         java_classpath: mapping.classpath,
//         js_class: mapping.event,
//         method: target[propertyKey]
//     });

// }

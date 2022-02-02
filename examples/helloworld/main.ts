import { PlayerChatEvent, ServerCommands, ServerEvents } from "../../dist";

console.log('Plugin started!');

// Say hello to everyone on the server, every 5 seconds
let i = 0;
setInterval(() => {
    i++;
    Java.resolve('org.bukkit.Bukkit').broadcastMessage('Hello #' + i);
}, 5000);

ServerEvents.register(PlayerChatEvent, event => {

    console.log('Chat event!');
    event.getPlayer().sendTitle('NICE CHAT', 'yep', 20, 20, 20);

});

ServerCommands.register('/hello {name}...', (player, call) => {

    const name = call.getPlaceholder('name')!;

    player.sendTitle('You said:', name, 20, 20, 20);

});
import { PlayerChatEvent, Players, ServerEvents } from "../../dist";

console.log('Plugin started!');

// Say hello to everyone on the server, every 5 seconds
let i = 0;
setInterval(() => {
    i++;
    Java.resolve('org.bukkit.Bukkit').broadcastMessage('Hello #' + i);
}, 5000);

// Listen for server commands types by all players
BukkitCommands.register((player_uuid, message) => {
    if (message == '/hello') {
        console.log('Received the /hello command!');
        const player = Players.getPlayerByUUID(player_uuid)
        player?.sendTitle("Your /hello was received", null, 20, 20, 20);
        return true;
    }
    return false;
});

ServerEvents.register(PlayerChatEvent, event => {

    console.log('Chat event!');
    event.getPlayer().sendTitle('NICE CHAT', 'yep', 20, 20, 20);

});

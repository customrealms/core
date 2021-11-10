import "../../dist";

console.log('Plugin started!');

// Say hello to everyone on the server, every 5 seconds
let i = 0;
setInterval(() => {
    i++;
    Java.resolve('org.bukkit.Bukkit').broadcastMessage('Hello #' + i);
}, 5000);

// Listen for server commands types by all players
ServerCommands.register((player_uuid, message) => {
    if (message == '/hello') {
        console.log('Received the /hello command!');
        return true;
    }
    return false;
});

import { PlayerEvent } from "./PlayerEvent";

export class PlayerJoinEvent extends PlayerEvent {

    public static getBukkitClasspath(): string {
        return 'org.bukkit.event.player.PlayerJoinEvent';
    }

    /**
     * Sets the join message to be broadcasted to the server
     * @param message the message to broadcast
     */
    public setJoinMessage(message: string): void {
        this.toJava().setJoinMessage(message);
    }

}

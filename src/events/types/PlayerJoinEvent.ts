import { Player } from "../../player/Player";
import { Event } from "./Event";

export class PlayerJoinEvent extends Event {

    public static getBukkitClasspath(): string {
        return 'org.bukkit.event.player.PlayerJoinEvent';
    }

    /**
     * Gets the player who joined the server
     */
    public getPlayer(): Player {
        return Player.fromJava(this.toJava().getPlayer());
    }

    /**
     * Sets the join message to be broadcasted to the server
     * @param message the message to broadcast
     */
    public setJoinMessage(message: string): void {
        this.toJava().setJoinMessage(message);
    }

}

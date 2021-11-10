import { Player } from "../../player/Player";
import { Event } from "./Event";

export class PlayerQuitEvent extends Event {

    public static getBukkitClasspath(): string {
        return 'org.bukkit.event.player.PlayerJoinEvent';
    }

    /**
     * Gets the player who quit the server
     */
    public getPlayer(): Player {
        return Player.fromJava(this.toJava().getPlayer());
    }

    /**
     * Sets the quit message to be broadcasted to the server
     * @param message the message to broadcast
     */
    public setQuitMessage(message: string): void {
        this.toJava().setQuitMessage(message);
    }

}

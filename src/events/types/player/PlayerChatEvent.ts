import { Player } from "../../../player/Player";
import { PlayerEvent } from "./PlayerEvent";

export class PlayerChatEvent extends PlayerEvent {

    public static getBukkitClasspath(): string {
        return 'org.bukkit.event.player.PlayerChatEvent';
    }

    /**
     * Gets the format string for the message displayed
     */
    public getFormat(): string {
        return this.toJava().getFormat();
    }

    /**
     * Gets the message contents to display
     */
    public getMessage(): string {
        return this.toJava().getMessage();
    }

    /**
     * Gets the cancellation state of this event
     */
    public isCancelled(): boolean {
        return this.toJava().isCancelled();
    }

    /**
     * Sets the cancellation state of this event
     * @param cancelled whether or not to cancel the event
     */
    public setCancelled(cancelled: boolean): void {
        this.toJava().setCancelled(cancelled);
    }

    /**
     * Sets the format string for the message displayed
     * @param format the format string
     */
    public setFormat(format: string): void {
        this.toJava().setFormat(format);
    }

    /**
     * Sets the message contents to display
     * @param message the message contents
     */
    public setMessage(message: string): void {
        this.toJava().setMessage(message);
    }

    /**
     * Sets the player to be credited for the message in chat
     * @param player the player
     */
    public setPlayer(player: Player): void {
        this.toJava().setPlayer(player.toJava());
    }

}

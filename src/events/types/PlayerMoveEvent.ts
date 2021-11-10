import { Player } from "../../player/Player";
import { Location } from "../../util/Location";
import { Event } from "./Event";

export class PlayerMoveEvent extends Event {

    public static getBukkitClasspath(): string {
        return 'org.bukkit.event.player.PlayerMoveEvent';
    }

    /**
     * Gets the player for the event
     */
    public getPlayer(): Player {
        return Player.fromJava(this.toJava().getPlayer());
    }

    /**
     * Sets the cancellation state of this event
     * @param cancel the cancellation state of this event
     */
    public setCancelled(cancel: boolean): void {
        this.toJava().setCancelled(cancel);
    }

    /**
     * Checks if the event has been cancelled
     */
    public isCancelled(): boolean {
        return this.toJava().isCancelled();
    }

    /**
     * Gets the location the player is moving from
     */
    public getFrom(): Location {
        return Location.fromJava(this.toJava().getFrom())!;
    }

    /**
     * Gets the location the player is moving to
     */
    public getTo(): Location {
        return Location.fromJava(this.toJava().getTo())!;
    }

    /**
     * Sets the location the player is moving from
     * @param from the new from location to use
     */
    public setFrom(from: Location): void {
        this.toJava().setFrom(from.toJava());
    }

    /**
     * Sets the location the player is moving to
     * @param to the new to location to use
     */
    public setTo(to: Location): void {
        this.toJava().setTo(to.toJava());
    }

}

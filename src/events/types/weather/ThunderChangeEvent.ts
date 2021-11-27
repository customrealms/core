import { Cancellable } from "../../Cancellable";
import { WeatherEvent } from "./WeatherEvent";

/** Stores data for thunder state changing in a world */
export class ThunderChangeEvent extends WeatherEvent implements Cancellable{

    public static getBukkitClasspath(): string {
        return 'org.bukkit.event.weather.ThunderChangeEvent';
    }
    /**
     * Gets the state of thunder that the world is being set to
     * @returns true if the weather is being set to thundering, false otherwise
     */
    public toThunderState(): boolean {
        return this.toJava().toThunderState();
    }

    /**
     * Sets the cancellation state of this event. A cancelled event will not be executed in
     * the sever, but will still pass to other plugins
     * @param cancel 
     */
     public setCancelled(cancel: boolean): void {
        this.toJava().setCancelled(cancel);
    }
    
    /**
     * Gets the cancellation state of this event.A cancelled event will not be executed in the server,
     * but will still pass to other plugins
     * @returns true if this event is cancelled
     */
    public isCancelled(): boolean {
      return this.toJava().isCancelled();
    }

}
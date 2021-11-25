import { Cancellable } from "../../Cancellable";
import { WeatherEvent } from "./WeatherEvent";

/**
* Stores data for weather changing in a world
*/
export class WeatherChangeEvent extends WeatherEvent implements Cancellable {
    
    public static getBukkitClasspath(): string {
        return 'org.bukkit.event.weather.WeatherChangeEvent';
    }

    /**
    * Gets the state of weather that the world is being set to
    * @returns true if the weather is being set to raining, false otherwise
    */
    public toWeatherState(): boolean {
        return this.toJava().toWeatherState();
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
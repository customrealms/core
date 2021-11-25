import { Cancellable } from "../../Cancellable";
import { LightningStrikeEventCause } from "./LightningStrikeEventCause";
import { WeatherEvent } from "./WeatherEvent";

/**
 * Stores data for lightning striking
 */
export class LightningStrikeEvent extends WeatherEvent implements Cancellable {
    
    public static getBukkitClasspath(): string {
        return 'org.bukkit.event.weather.LightningStrikeEvent';
    }
   
    /**
    * Gets the cause of this lightning strike
    * @returns strike cause
    */
    public getCause():LightningStrikeEventCause {
        return this.toJava().getCause();
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

    
    /*
    * Gets the bolt which is striking the earth
    * @returns 
    */
        
    /*
    ---------- LightningStrike entity needs to be added -----------

    public getLightning():LightningStrike {
        return this.toJava().getLightning();
    }
*/
}
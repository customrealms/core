import { Player } from "../../../player/Player";
import { Event } from "../Event";

export class PlayerEvent extends Event {

  public static getBukkitClasspath(): string {
    return 'org.bukkit.event.player.PlayerJoinEvent';
  }

  /**
   * Gets the player who joined the server
   */
  public getPlayer(): Player {
    return Player.fromJava(this.toJava().getPlayer());
  }
}

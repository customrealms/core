import { Player } from "../../../player/Player";
import { Cancellable } from "../../Cancellable";
import { BlockExpEvent } from "./BlockExpEvent";

export class BlockBreakEvent extends BlockExpEvent implements Cancellable {

    public static getBukkitClasspath(): string {
        return 'org.bukkit.event.block.BlockBreakEvent';
    }

    /**
     * Gets the player who is breaking the block
     */
    public getPlayer(): Player {
        return Player.fromJava(this.toJava().getPlayer());
    }

    /**
     * Gets the cancellation state of this event
     */
    public isCancelled(): boolean {
        return this.toJava().isCancelled();
    }

    /**
     * Gets whether or not the block will drop items
     */
    public isDropItems(): boolean {
        return this.toJava().isDropItems();
    }

    public setCancelled(cancel: boolean): void {
        this.toJava().setCancelled(cancel);
    }

    public setDropItems(drop_items: boolean): void {
        this.toJava().setDropItems(drop_items);
    }

}

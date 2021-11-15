import { Player } from "../../../player/Player";
import { BlockExpEvent } from "./BlockExpEvent";

export class BlockBreakEvent extends BlockExpEvent {

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

    /**
     * Sets the cancellation state of this event
     * @param cancel the cancellation state of this event
     */
    public setCancelled(cancel: boolean): void {
        this.toJava().setCancelled(cancel);
    }

    /**
     * Sets whether or not this block will drop items
     * @param drop_items the drop items state of this event
     */
    public setDropItems(drop_items: boolean): void {
        this.toJava().setDropItems(drop_items);
    }

}

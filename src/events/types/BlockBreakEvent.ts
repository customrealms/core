import { Player } from "../../player/Player";
import { BlockExpEvent } from "./BlockExpEvent";

export class BlockBreakEvent extends BlockExpEvent {

    public getPlayer(): Player {
        return Player.fromJava(this._event.getPlayer());
    }

    public isCancelled(): boolean {
        return this._event.isCancelled();
    }

    public isDropItems(): boolean {
        return this._event.isDropItems();
    }

    public setCancelled(cancel: boolean): void {
        this._event.setCancelled(cancel);
    }

    public setDropItems(drop_items: boolean): void {
        this._event.setDropItems(drop_items);
    }

}

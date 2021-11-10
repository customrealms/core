import { Player } from "../../player/Player";
import { Event } from "./Event";

export class PlayerQuitEvent extends Event {

    public getPlayer(): Player {
        return new Player(this._event.getPlayer());
    }

    public setQuitMessage(message: string): void {
        this._event.setQuitMessage(message);
    }

}

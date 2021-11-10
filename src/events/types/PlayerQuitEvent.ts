import { Player } from "../../player/Player";
import { Event } from "./Event";

export class PlayerQuitEvent extends Event {

    public getPlayer(): Player {
        return Player.fromJava(this._event.getPlayer());
    }

    public setQuitMessage(message: string): void {
        this._event.setQuitMessage(message);
    }

}

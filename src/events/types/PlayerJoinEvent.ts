import { Player } from "../../player/Player";
import { Event } from "./Event";

export class PlayerJoinEvent extends Event {

    public getPlayer(): Player {
        return new Player(this._event.getPlayer());
    }

    public setJoinMessage(message: string): void {
        this._event.setJoinMessage(message);
    }

}

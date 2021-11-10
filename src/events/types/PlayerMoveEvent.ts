import { Player } from "../../player/Player";
import { Location } from "../../util/Location";
import { Event } from "./Event";

export class PlayerMoveEvent extends Event {

    public getPlayer(): Player {
        return Player.fromJava(this._event.getPlayer());
    }

    public setCancelled(cancel: boolean): void {
        this._event.setCancelled(cancel);
    }

    public isCancelled(): boolean {
        return this._event.isCancelled();
    }

    public getFrom(): Location {
        return Location.fromJava(this._event.getFrom())!;
    }

    public getTo(): Location {
        return Location.fromJava(this._event.getTo())!;
    }

    public setFrom(from: Location): void {
        this._event.setFrom(from.toJava());
    }

    public setTo(to: Location): void {
        this._event.setTo(to.toJava());
    }

}

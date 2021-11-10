import { Player } from "../../player/Player";
import { Event } from "./Event";

export class PlayerChatEvent extends Event {

    public getPlayer(): Player {
        return new Player(this._event.getPlayer());
    }

    public getFormat(): string {
        return this._event.getFormat();
    }

    public getMessage(): string {
        return this._event.getMessage();
    }

    public isCancelled(): boolean {
        return this._event.isCancelled();
    }

    public setCancelled(cancelled: boolean): void {
        this._event.setCancelled(cancelled);
    }

    public setFormat(format: string): void {
        this._event.setFormat(format);
    }

    public setMessage(message: string): void {
        this._event.setMessage(message);
    }

    public setPlayer(player: Player): void {
        this._event.setPlayer(player.toJava());
    }

}

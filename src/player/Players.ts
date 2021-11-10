import "../globals";
import { Player } from '../player/Player';
import { Service } from '../types/Service';

export class Players {

    public static getPlayers(): Player[] {
        return Java
            .resolve('org.bukkit.Bukkit')
            ?.getOnlinePlayers()
            ?.map((p: any) => new Player(p)) ?? [];
    }

    public static getPlayerByUUID(uuid: string): Player | null {
        const p = Java.resolve('org.bukkit.Bukkit').getPlayer(
            Java.resolve('java.util.UUID').fromString(uuid)
        );
        if (!p) return null;
        return new Player(p);
    }

    public static getPlayerByUsername(username: string, exact: boolean = false): Player | null {
        const p = exact
            ? Java.resolve('org.bukkit.Bukkit').getPlayerExact(username)
            : Java.resolve('org.bukkit.Bukkit').getPlayer(username);
        if (!p) return null;
        return new Player(p);
    }

}

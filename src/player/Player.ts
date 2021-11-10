import { ChatColor } from '../chat/ChatColor';
import { Entity } from '../entity/Entity';
import { HumanEntity } from '../entity/HumanEntity';
import '../globals';
import { Enchantment } from "../material/Enchantment";
import { EnchantmentName } from '../material/EnchantmentName';
import { ItemStack } from "../material/ItemStack";
import { Material } from "../material/Material";
import { ApplyMixins } from '../runtime/ApplyMixins';
import { Instrument } from '../sound/Instrument';
import { Note } from '../sound/Note';
import { Pitch } from '../sound/Pitch';
import { Location } from '../util/Location';
import { World } from '../world/World';

export class Player extends Entity {

    public sendMessage(...message: (string | ChatColor)[]): void {
        this.toJava().sendMessage(message.join(''));
    }

    public isOnline(): boolean {
        return this.toJava().isOnline();
    }

    public getAllowFlight(): boolean {
        return this.toJava().getAllowFlight();
    }

    public setAllowFlight(allow_flight: boolean): void {
        this.toJava().setAllowFlight(allow_flight);
    }

    public kick(reason?: string): void {
        this.toJava().kickPlayer(reason ?? 'You have been kicked');
    }

    public hasPlayedBefore(): boolean {
        return this.toJava().hasPlayedBefore();
    }

    public canSee(other: Player): boolean {
        return this.toJava().canSee(other.toJava());
    }

    public getClientViewDistance(): number {
        return this.toJava().getClientViewDistance();
    }

    public getCompassTarget(): Location {
        const javaLoc = this.toJava().getCompassTarget();
        const javaWorld = javaLoc.getWorld();
        return new Location(
            //@ts-ignore World constructor is private intentionally
            javaWorld ? new World(javaWorld) : null,
            javaLoc.getX(),
            javaLoc.getY(),
            javaLoc.getZ(),
            javaLoc.getYaw(),
            javaLoc.getPitch()
        );
    }

    public setCompassTarget(location: Location): void {
        this.toJava().setCompassTarget(location.toJava());
    }

    public getDisplayName(): string {
        return this.toJava().getDisplayName();
    }

    public setDisplayName(name: string): void {
        this.toJava().setDisplayName(name);
    }

    public getExhaustion(): number {
        return this.toJava().getExhaustion();
    }

    public setExhaustion(exhaustion: number): void {
        this.toJava().setExhaustion(exhaustion);
    }

    public getExp(): number {
        return this.toJava().getExp();
    }

    public setExp(exp: number): void {
        this.toJava().setExp(exp);
    }

    public setFlying(flying: boolean): void {
        this.toJava().setFlying(flying);
    }

    public getFlySpeed(): number {
        return this.toJava().getFlySpeed();
    }

    public setFlySpeed(speed: number): void {
        this.toJava().setFlySpeed(speed);
    }

    public getFoodLevel(): number {
        return this.toJava().getFoodLevel();
    }

    public setFoodLevel(food_level: number): void {
        this.toJava().setFoodLevel(food_level);
    }

    public getHealthScale(): number {
        return this.toJava().getHealthScale();
    }

    public setHealthScale(scale: number): void {
        this.toJava().setHealthScale(scale);
    }

    public setHealthScaled(scaled: boolean): void {
        this.toJava().setHealthScaled(scaled);
    }

    public getLevel(): number {
        return this.toJava().getLevel();
    }

    public setLevel(level: number): void {
        this.toJava().setLevel(level);
    }

    public getPlayerListFooter(): string | null {
        return this.toJava().getPlayerListFooter();
    }

    public setPlayerListFooter(footer: string | null): void {
        this.toJava().setPlayerListFooter(footer);
    }

    public getPlayerListHeader(): string | null {
        return this.toJava().getPlayerListHeader();
    }

    public setPlayerListHeader(header: string | null): void {
        this.toJava().setPlayerListHeader(header);
    }

    public getPlayerListName(): string {
        return this.toJava().getPlayerListName();
    }

    public setPlayerListName(name: string | null): void {
        this.toJava().setPlayerListName(name);
    }

    public getPlayerTime(): number {
        return this.toJava().getPlayerTime();
    }

    public setPlayerTime(player_time: number, relative: boolean): void {
        this.toJava().setPlayerTime(player_time, relative);
    }

    public getPlayerTimeOffset(): number {
        return this.toJava().getPlayerTimeOffset();
    }

    // getPlayerWeather(): WeatherType;
    // setPlayerWeather(weather: Weather): void;

    public setResourcePack(url: string, hash?: string): void {
        if (hash) this.toJava().setResourcePack(url, hash);
        else this.toJava().setResourcePack(url);
    }

    public getSaturation(): number {
        return this.toJava().getSaturation();
    }

    public setSaturation(saturation: number): void {
        this.toJava().setSaturation(saturation);
    }

    // getScoreboard(): Scoreboard;
    // setScoreboard(scoreboard: Scoreboard): void;

    // /**
    //  * Gets the entity which is followed by the camera when the player is in spectator mode
    //  */
    // getSpectatorTarget(): Entity;

    // /**
    //  * Sets the spectator target for this player
    //  * @param target the entity to spectate
    //  */
    // setSpectatorTarget(target: Entity): void;

    public getTotalExperience(): number {
        return this.toJava().getTotalExperience();
    }

    public setTotalExperience(experience: number): void {
        this.toJava().setTotalExperience(experience);
    }

    public getWalkSpeed(): number {
        return this.toJava().getWalkSpeed();
    }

    public setWalkSpeed(speed: number): void {
        this.toJava().setWalkSpeed(speed);
    }

    public giveExp(amount: number): void {
        this.toJava().giveExp(amount);
    }

    public giveExpLevels(amount: number): void {
        this.toJava().giveExpLevels(amount);
    }

    public isFlying(): boolean {
        return this.toJava().isFlying();
    }

    public isHealthScaled(): boolean {
        return this.toJava().isHealthScaled();
    }

    public isSleepingIgnored(): boolean {
        return this.toJava().isSleepingIgnored();
    }

    public setSleepingIgnored(ignored: boolean): void {
        this.toJava().setSleepingIgnored(ignored);
    }

    public isSneaking(): boolean {
        return this.toJava().isSneaking();
    }

    public setSneaking(sneaking: boolean): void {
        this.toJava().setSneaking(sneaking);
    }

    public isSprinting(): boolean {
        return this.toJava().isSprinting();
    }

    public setSprinting(sprinting: boolean): void {
        this.toJava().setSprinting(sprinting);
    }

    // /**
    //  * Plays an effect to just this player
    //  * @param location the location of the effect
    //  * @param effect the effect to play for the player
    //  * @param data extra data
    //  */
    // playEffect(location: Location, effect: Effect, data?: number): void;

    public playNote(instrument: Instrument, note: Note): void {
        const noteFactory =
            note.pitch === Pitch.FLAT ? Java.resolve('org.bukkit.Note').flat :
            note.pitch === Pitch.SHARP ? Java.resolve('org.bukkit.Note').sharp :
            Java.resolve('org.bukkit.Note').natural;
        const javaNote = noteFactory(
            note.octave,
            Java.resolve('org.bukkit.Note.Tone').valueOf(note.tone)
        );
        this.toJava().playNode(
            this.getLocation().toJava(),
            Java.resolve('org.bukkit.Instrument').valueOf(instrument),
            javaNote
        );
    }

    public playSound(location: Location, sound: string, volume: number, pitch: number): void {
        this.toJava().playSound(
            location.toJava(),
            sound,
            volume,
            pitch
        );
    }

    public resetTitle(): void {
        this.toJava().resetTitle();
    }

    public sendTitle(
        title: string | null,
        subtitle: string | null,
        fadeIn: number,
        stay: number,
        fadeOut: number
    ): void {
        this.toJava().sendTitle(title, subtitle, fadeIn, stay, fadeOut);
    }

    /**
     * Gives the player full netherite armor, with the given enchantments applied.
     * @param enchantments names of enchantments to add to the armor
     */
    public fullNetheriteArmor(enchantments?: EnchantmentName[]): void {
        const items = [
            'netherite_helmet',
            'netherite_chestplate',
            'netherite_leggings',
            'netherite_boots',
        ];
        for (let item_name of items) {
            const mat = Material.withName(item_name);
            if (!mat) continue;
            const item = new ItemStack(mat, 1);
            enchantments
                ?.map(ench_name => Enchantment.withName(ench_name))
                ?.filter((ench): ench is Enchantment => !!ench)
                ?.forEach(ench => item.addEnchantment(ench, ench.getMaxLevel()));
            if (item_name.endsWith('_helmet')) this.getInventory().setHelmet(item);
            else if (item_name.endsWith('_chestplate')) this.getInventory().setChestplate(item);
            else if (item_name.endsWith('_leggings')) this.getInventory().setLeggings(item);
            else if (item_name.endsWith('_boots')) this.getInventory().setBoots(item);
        }
    }

}

export interface Player extends HumanEntity {}
ApplyMixins(Player, [HumanEntity]);

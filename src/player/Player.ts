import '../globals';
import { ChatColor } from '../chat/ChatColor';
import { HumanEntity } from '../entity/HumanEntity';
import { Enchantment } from "../material/Enchantment";
import { EnchantmentName } from '../material/EnchantmentName';
import { ItemStack } from "../material/ItemStack";
import { Material } from "../material/Material";
import { ApplyMixins } from '../runtime/ApplyMixins';
import { ToJava } from '../runtime/ToJava';
import { Instrument } from '../sound/Instrument';
import { Note } from '../sound/Note';
import { Pitch } from '../sound/Pitch';
import { Location } from '../util/Location';
import { World } from '../world/World';

export class Player implements ToJava {

    public static fromJava(_player: Java.Value): Player {
        return new Player(_player);
    }

    private constructor(
        private _player: Java.Value,
    ) {}

    public toJava(): Java.Value {
        return this._player;
    }

    /**
     * Sends a message to the player in chat
     * @param message the message to send (parts concatenated)
     */
    public sendMessage(...message: (string | ChatColor)[]): void {
        this.toJava().sendMessage(message.join(''));
    }

    /**
     * Determines if the player is currently online
     */
    public isOnline(): boolean {
        return this.toJava().isOnline();
    }

    /**
     * Determines if flight is enabled for the player
     */
    public getAllowFlight(): boolean {
        return this.toJava().getAllowFlight();
    }

    /**
     * Sets the flight-allowed status of the player
     * @param allow_flight whether or not to allow flight
     */
    public setAllowFlight(allow_flight: boolean): void {
        this.toJava().setAllowFlight(allow_flight);
    }

    /**
     * Kicks the player from the server
     * @param reason the reason to show to the player
     */
    public kick(reason?: string): void {
        this.toJava().kickPlayer(reason ?? 'You have been kicked');
    }

    /**
     * Checks if the player has played on the server before
     */
    public hasPlayedBefore(): boolean {
        return this.toJava().hasPlayedBefore();
    }

    /**
     * Checks to see if another player is hidden from this player
     * @param other the other player
     */
    public canSee(other: Player): boolean {
        return this.toJava().canSee(other.toJava());
    }

    /**
     * Gets the view distance of the client
     */
    public getClientViewDistance(): number {
        return this.toJava().getClientViewDistance();
    }

    /**
     * Gets the most recently set compass target
     */
    public getCompassTarget(): Location {
        const javaLoc = this.toJava().getCompassTarget();
        const javaWorld = javaLoc.getWorld();
        return new Location(
            javaWorld ? World.fromJava(javaWorld) : null,
            javaLoc.getX(),
            javaLoc.getY(),
            javaLoc.getZ(),
            javaLoc.getYaw(),
            javaLoc.getPitch()
        );
    }

    /**
     * Sets the target location for the player's compass
     * @param location the target location
     */
    public setCompassTarget(location: Location): void {
        this.toJava().setCompassTarget(location.toJava());
    }

    /**
     * Gets the current display name of the player
     */
    public getDisplayName(): string {
        return this.toJava().getDisplayName();
    }

    /**
     * Sets the player's display name
     * @param name the name to display
     */
    public setDisplayName(name: string): void {
        this.toJava().setDisplayName(name);
    }

    /**
     * Gets the current exhaustion level of the player
     */
    public getExhaustion(): number {
        return this.toJava().getExhaustion();
    }

    /**
     * Sets the exhaustion level of the player
     * @param exhaustion the exhaustion level
     */
    public setExhaustion(exhaustion: number): void {
        this.toJava().setExhaustion(exhaustion);
    }

    /**
     * Gets the player's current experience points toward the next level
     */
    public getExp(): number {
        return this.toJava().getExp();
    }

    /**
     * Sets the player's experience points tward the next level
     * @param exp the exp points
     */
    public setExp(exp: number): void {
        this.toJava().setExp(exp);
    }

    /**
     * Makes this player start or stop flying
     * @param flying the flying status
     */
    public setFlying(flying: boolean): void {
        this.toJava().setFlying(flying);
    }

    /**
     * Gets the current maximum fly speed of the player
     */
    public getFlySpeed(): number {
        return this.toJava().getFlySpeed();
    }

    /**
     * Sets the maximum fly speed of the player
     * @param speed the flying speed
     */
    public setFlySpeed(speed: number): void {
        this.toJava().setFlySpeed(speed);
    }

    /**
     * Gets the player's current food level
     */
    public getFoodLevel(): number {
        return this.toJava().getFoodLevel();
    }

    /**
     * Sets the player's current food level
     * @param food_level the food level
     */
    public setFoodLevel(food_level: number): void {
        this.toJava().setFoodLevel(food_level);
    }

    /**
     * Gets the number that health is scaled to for the client
     */
    public getHealthScale(): number {
        return this.toJava().getHealthScale();
    }

    /**
     * Sets the number to scale health for the client
     * @param scale the scale value
     */
    public setHealthScale(scale: number): void {
        this.toJava().setHealthScale(scale);
    }

    /**
     * Sets whether or not the player is displayed a scaled health
     * @param scaled the scaled status
     */
    public setHealthScaled(scaled: boolean): void {
        this.toJava().setHealthScaled(scaled);
    }

    /**
     * Gets the player's current experience level
     */
    public getLevel(): number {
        return this.toJava().getLevel();
    }

    /**
     * Sets the player's current experience level
     * @param level the experience level
     */
    public setLevel(level: number): void {
        this.toJava().setLevel(level);
    }

    /**
     * Gets the currently displayed player list footer for this player
     */
    public getPlayerListFooter(): string | null {
        return this.toJava().getPlayerListFooter();
    }

    /**
     * Sets the currently displayed player list footer for this player
     * @param footer the footer string
     */
    public setPlayerListFooter(footer: string | null): void {
        this.toJava().setPlayerListFooter(footer);
    }

    /**
     * Gets the currently displayed player list header for this player
     */
    public getPlayerListHeader(): string | null {
        return this.toJava().getPlayerListHeader();
    }

    /**
     * Sets the currently displayed player list header for this player
     * @param header the header string
     */
    public setPlayerListHeader(header: string | null): void {
        this.toJava().setPlayerListHeader(header);
    }

    /**
     * Gets the name that is shown on the player list for this player
     */
    public getPlayerListName(): string {
        return this.toJava().getPlayerListName();
    }

    /**
     * Sets the name of the player shown in the player list
     * @param name the player name
     */
    public setPlayerListName(name: string | null): void {
        this.toJava().setPlayerListName(name);
    }

    /**
     * Gets the player's current timestamp
     */
    public getPlayerTime(): number {
        return this.toJava().getPlayerTime();
    }

    /**
     * Sets the player's current timestamp
     * @param player_time the time to use
     * @param relative whether or not the player time is relative
     */
    public setPlayerTime(player_time: number, relative: boolean): void {
        this.toJava().setPlayerTime(player_time, relative);
    }

    /**
     * Gets the player's current time offset relative to the server
     */
    public getPlayerTimeOffset(): number {
        return this.toJava().getPlayerTimeOffset();
    }

    // getPlayerWeather(): WeatherType;
    // setPlayerWeather(weather: Weather): void;

    /**
     * Sets the resource pack for the player
     * @param url the url for the resource pack
     * @param hash the checksum for the resource pack
     */
    public setResourcePack(url: string, hash?: string): void {
        if (hash) this.toJava().setResourcePack(url, hash);
        else this.toJava().setResourcePack(url);
    }

    /**
     * Gets the player's current saturation level
     */
    public getSaturation(): number {
        return this.toJava().getSaturation();
    }

    /**
     * Sets the current saturation level for the player
     * @param saturation the saturation level
     */
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

    /**
     * Gets the total experience points for the player
     */
    public getTotalExperience(): number {
        return this.toJava().getTotalExperience();
    }

    /**
     * Sets the total experience points for the player
     * @param experience the total experience points
     */
    public setTotalExperience(experience: number): void {
        this.toJava().setTotalExperience(experience);
    }

    /**
     * Gets the current maximum walk speed for the player
     */
    public getWalkSpeed(): number {
        return this.toJava().getWalkSpeed();
    }

    /**
     * Sets the current maximum walk speed for the player
     * @param speed the speed value
     */
    public setWalkSpeed(speed: number): void {
        this.toJava().setWalkSpeed(speed);
    }

    /**
     * Gives the player the amount of experience specified
     * @param amount the amount of experience to award
     */
    public giveExp(amount: number): void {
        this.toJava().giveExp(amount);
    }

    /**
     * Gives the player a number of experience levels
     * @param amount the number of levels to award
     */
    public giveExpLevels(amount: number): void {
        this.toJava().giveExpLevels(amount);
    }

    /**
     * Checks if this player is currently flying
     */
    public isFlying(): boolean {
        return this.toJava().isFlying();
    }

    /**
     * Checks if the player's health is displayed on a scale from 0 to getHealthScale()
     */
    public isHealthScaled(): boolean {
        return this.toJava().isHealthScaled();
    }

    /**
     * Returns whether the player is sleeping ignored
     */
    public isSleepingIgnored(): boolean {
        return this.toJava().isSleepingIgnored();
    }

    /**
     * Sets whether or not to ignore this player when checking if all players are sleeping. Setting
     * to true means that if all other players sleep, night will be skipped, even if this player
     * stays awake.
     * @param ignored the ignored status
     */
    public setSleepingIgnored(ignored: boolean): void {
        this.toJava().setSleepingIgnored(ignored);
    }

    /**
     * Checks if the player is currently in sneak mode
     */
    public isSneaking(): boolean {
        return this.toJava().isSneaking();
    }

    /**
     * Sets the sneak more for the player
     * @param sneaking the sneaking status
     */
    public setSneaking(sneaking: boolean): void {
        this.toJava().setSneaking(sneaking);
    }

    /**
     * Checks if the player is currently sprinting
     */
    public isSprinting(): boolean {
        return this.toJava().isSprinting();
    }

    /**
     * Sets the sneak mode for the player
     * @param sprinting the sprinting status
     */
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

    /**
     * Plays a note to just this player
     * @param instrument the instrument to use
     * @param note the note to play
     */
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

    /**
     * Plays a sound for just this player
     * @param location the location of the sound
     * @param sound the name of the sound to play
     * @param volume the volume for the sound
     * @param pitch the pitch of the sound
     */
    public playSound(location: Location, sound: string, volume: number, pitch: number): void {
        this.toJava().playSound(
            location.toJava(),
            sound,
            volume,
            pitch
        );
    }

    /**
     * Resets the title displayed to the player
     */
    public resetTitle(): void {
        this.toJava().resetTitle();
    }

    /**
     * Sends a title and subtitle to the player
     * @param title the title to display
     * @param subtitle the subtitle to display
     * @param fadeIn the number of ticks to fade in
     * @param stay the number of ticks to display the title
     * @param fadeOut the number of ticks to fade out
     */
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
     * Checks if the player has a permission set
     * @param permission name of the permission
     */
    public hasPermission(permission: string): boolean {
        return this.toJava().hasPermission(permission);
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
            const item = ItemStack.create(mat, 1);
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

import { BlockFace } from "../block/BlockFace";
import { PistonMoveReaction } from "../block/PistonMoveReaction";
import { EntityType } from "./EntityType";
import { Pose } from "./Pose";
import { EntityDamageEvent } from "../events/types/entity/EntityDamageEvent";
import { ToJava } from "../runtime/ToJava";
import { Location } from "../util/Location";
import { Vector } from "../util/Vector";
import { World } from "../world/World";

export class Entity implements ToJava {

    public static fromJava(_entity: Java.Value): Entity {
        return new Entity(_entity);
    }

    private constructor(
        private _java: any,
    ) {}

    public toJava(): Java.Value {
        return this._java;
    }

    /**
     * Adds a passenger to this entity
     * @param passenger the passenger to add
     */
    public addPassenger(passenger: Entity): boolean {
        return this.toJava().addPassenger(passenger.toJava());
    }

    /**
     * Adds a tag to this entity. Returns if it was successful or not
     * @param tag the tag
     */
    public addScoreboardTag(tag: string): boolean {
        return this.toJava().addScoreboardTag(tag);
    }

    /**
     * Ejects any passenger, at random
     */
    public eject(): boolean {
        return this.toJava().eject();
    }

    // /**
    //  * Gets the current bounding box for this entity
    //  */
    // getBoundingBox(): BoundingBox;

    /**
     * Returns a unique identifier for this entity
     */
    public getEntityId(): number {
        return this.toJava().getEntityId();
    }

    /**
     * Gets the closest cardinal direction this entity is facing
     */
    public getFacing(): BlockFace {
        return BlockFace.named(this.toJava().getFacing().name())!;
    }

    /**
     * Gets the distance this entity has fallen
     */
    public getFallDistance(): number {
        return this.toJava().getFallDistance();
    }

    /**
     * Gets the number of ticks before this entity stops being on fire
     */
    public getFireTicks(): number {
        return this.toJava().getFireTicks();
    }

    /**
     * Gets the height of the entity
     */
    public getHeight(): number {
        return this.toJava().getHeight();
    }

    /**
     * Gets the last damage event inflicted on this entity
     */
    public getLastDamageCause(): EntityDamageEvent | null {
        const javaEvent = this.toJava().getLastDamageCause();
        if (!javaEvent) return null;
        return new EntityDamageEvent(javaEvent);
    }

    /**
     * Gets the current location of the entity
     */
    public getLocation(): Location {
        const javaLoc = this.toJava().getLocation();
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
     * Gets the maximum fire ticks for this entity
     */
    public getMaxFireTicks(): number {
        return this.toJava().getMaxFireTicks();
    }

    // /**
    //  * Gets an array of all entites within a box centered on this entity
    //  * @param x distance on the x-axis
    //  * @param y distance on the y-axis
    //  * @param z distance on the z-axis
    //  */
    // public getNearbyEntities(x: number, y: number, z: number): Entity[] {
    //     // TODO: Not implemented
    //     return [];
    // }

    /**
     * Gets the array of passengers to this entity
     */
    public getPassengers(): Entity[] {
        const javaPassengers: Java.Value[] = this.toJava().getPassengers();
        if (!javaPassengers) return [];
        return javaPassengers.map(p => Entity.fromJava(p));
    }

    /**
     * Gets the reaction of this entity when moved by a piston
     */
    public getPistonMoveReaction(): PistonMoveReaction {
        return this.toJava().getPistonMoveReaction().name();
    }

    /**
     * Gets the number of ticks before this entity can use a portal
     */
    public getPortalCooldown(): number {
        return this.toJava().getPortalCooldown();
    }

    /**
     * Gets the entity's current pose
     */
    public getPose(): Pose {
        // TODO: check that this actually works
        return this.toJava().getPose();
    }

    // /**
    //  * Gets the array of scoreboard tags for this entity
    //  */
    // public getScoreboardTags(): string[] {
    //     // TODO: Not implemented
    //     return [];
    // }

    /**
     * Gets the number of ticks that this entity has lived
     */
    public getTicksLived(): number {
        return this.toJava().getTicksLived();
    }

    /**
     * Gets the type of this entity
     */
    public getType(): EntityType {
        return this.toJava().getType().name();
    }

    /**
     * Gets the UUID of this entity
     */
    public getUUID(): string {
        return this.toJava().getUniqueId().toString();
    }

    /**
     * Gets the vehicle of which this entity is a passenger
     */
    public getVehicle(): Entity | null {
        const javaEntity = this.toJava().getVehicle();
        if (!javaEntity) return null;
        return Entity.fromJava(javaEntity);
    }

    /**
     * Gets the current velocity of this vector
     */
    public getVelocity(): Vector {
        const javaVelocity = this.toJava().getVelocity();
        return new Vector(
            javaVelocity.getX(),
            javaVelocity.getY(),
            javaVelocity.getZ()
        );
    }

    /**
     * Gets the width of this entity
     */
    public getWidth(): number {
        return this.toJava().getWidth();
    }

    /**
     * Gets the world in which this entity currently resides
     */
    public getWorld(): World {
        const javaWorld = this.toJava().getWorld();
        return World.fromJava(javaWorld);
    }

    /**
     * Determines whether or not this entity is affected by gravity
     */
    public hasGravity(): boolean {
        return this.toJava().hasGravity();
    }

    /**
     * Checks whether or not the entity's custom name is displayed
     */
    public isCustomNameVisible(): boolean {
        return this.toJava().isCustomNameVisible();
    }

    /**
     * Checks if this entity is currently dead
     */
    public isDead(): boolean {
        return this.toJava().isDead();
    }

    /**
     * Checks if the entity has any passengers
     */
    public hasPassengers(): boolean {
        return this.toJava().hasPassengers();
    }

    /**
     * Checks if the entity is glowing
     */
    public isGlowing(): boolean {
        return this.toJava().isGlowing();
    }

    /**
     * Checks if this entity is currently a passenger to another entity
     */
    public isPassenger(): boolean {
        return Boolean(this.getVehicle());
    }

    /**
     * Checks if this entity is invulnerable, unable to take damage
     */
    public isInvulnerable(): boolean {
        return this.toJava().isInvulnerable();
    }

    /**
     * Checks if this entity is currently standing on a solid block
     */
    public isOnGround(): boolean {
        return this.toJava().isOnGround();
    }

    /**
     * Checks if this entity is currently silent
     */
    public isSilent(): boolean {
        return this.toJava().isSilent();
    }

    /**
     * Returns false if this entity has died or despawned
     */
    public isValid(): boolean {
        return this.toJava().isValid();
    }

    /**
     * Leaves the vehicle, if the entity is currently in one
     */
    public leaveVehicle(): boolean {
        return this.toJava().leaveVehicle();
    }

    // /**
    //  * Perform an effect for this entity
    //  * @param effect the effect to perform
    //  */
    // playEffect(effect: EntityEffect): void;

    /**
     * Marks this entity for removal
     */
    public remove(): void {
        this.toJava().remove();
    }

    /**
     * Removes a specific passenger from this entity
     * @param passenger the passenger entity
     */
    public removePassenger(passenger: Entity): boolean {
        return this.toJava().removePassenger(passenger.toJava());
    }

    /**
     * Removes a scoreboard tag from this entity
     * @param tag the tag to remove
     */
    public removeScoreboardTag(tag: string): boolean {
        return this.toJava().removeScoreboardTag(tag);
    }

    /**
     * Sets whether or not this entity's custom name is visible
     * @param visible the visibility state
     */
    public setCustomNameVisible(visible: boolean): void {
        this.toJava().setCustomNameVisible(visible);
    }

    /**
     * Sets the fall distance of this entity
     * @param distance the fall distance
     */
    public setFallDistance(distance: number): void {
        this.toJava().setFallDistance(distance);
    }

    /**
     * Sets the number of ticks remaining until this eneity stops being on fire
     * @param ticks the number ot ticks
     */
    public setFireTicks(ticks: number): void {
        this.toJava().setFireTicks(ticks);
    }

    /**
     * Sets whether or not this entity is glowing
     * @param glowing the glowing status
     */
    public setGlowing(glowing: boolean): void {
        this.toJava().setGlowing(glowing);
    }

    /**
     * Sets whether or not this entity is affected by gravity
     * @param gravity the enabled status
     */
    public setGravity(gravity: boolean): void {
        this.toJava().setGravity(gravity);
    }

    /**
     * Sets whether or not this entity is invulnerable, not damageable
     * @param invulnerable the invulnerable statue
     */
    public setInvulnerable(invulnerable: boolean): void {
        this.toJava().setInvulnerable(invulnerable);
    }

    /**
     * Sets the most recent damage event inflicted on the entity
     * @param event the event
     */
    public setLastDamageCause(event: EntityDamageEvent | null): void {
        this.toJava().setLastDamageCause(event?.toJava() ?? null);
    }

    /**
     * Sets the number of ticks before this entity can use a portal
     * @param cooldown the cooldown in ticks
     */
    public setPortalCooldown(cooldown: number): void {
        this.toJava().setPortalCooldown(cooldown);
    }

    /**
     * Sets the rotation of the entity
     * @param yaw the yaw (y-axis, looking left/right rotation)
     * @param pitch the pitch (x-axis, looking up and down)
     */
    public setRotation(yaw: number, pitch: number): void {
        this.toJava().setRotation(yaw, pitch);
    }

    /**
     * Sets whether or not this entity is silent
     * @param silent the silent status
     */
    public setSilent(silent: boolean): void {
        this.toJava().setSilent(silent);
    }

    /**
     * Sets the number of ticks that this entity has lived
     * @param ticks the number of ticks
     */
    public setTicksLived(ticks: number): void {
        this.toJava().setTicksLived()
    }

    /**
     * Sets the velocity of the entity
     * @param velocity the velocity value
     */
    public setVelocity(velocity: Vector): void {
        this.toJava().setVelocity(velocity.toJava());
    }

    /**
     * Teleports the entity to another location
     * @param location the location to teleport to
     */
    public teleport(location: Location): void {
        this.toJava().teleport(location.toJava());
    }

}

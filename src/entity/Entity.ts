import { BlockFace } from "../block/BlockFace";
import { PistonMoveReaction } from "../block/PistonMoveReaction";
import { EntityType } from "./EntityType";
import { Pose } from "./Pose";
import { EntityDamageEvent } from "../events/types/EntityDamageEvent";
import { ToJava } from "../runtime/ToJava";
import { Location } from "../util/Location";
import { Vector } from "../util/Vector";
import { World } from "../world/World";

export class Entity implements ToJava {

    public constructor(
        private _java: any) {}

    public toJava(): any {
        return this._java;
    }

    public addPassenger(passenger: Entity): boolean {
        return this.toJava().addPassenger(passenger.toJava());
    }

    public addScoreboardTag(tag: string): boolean {
        return this.toJava().addScoreboardTag(tag);
    }

    public eject(): boolean {
        return this.toJava().eject();
    }

    // /**
    //  * Gets the current bounding box for this entity
    //  */
    // getBoundingBox(): BoundingBox;

    public getEntityId(): number {
        return this.toJava().getEntityId();
    }

    public getFacing(): BlockFace {
        return BlockFace.named(this.toJava().getFacing().name())!;
    }

    public getFallDistance(): number {
        return this.toJava().getFallDistance();
    }

    public getFireTicks(): number {
        return this.toJava().getFireTicks();
    }

    public getHeight(): number {
        return this.toJava().getHeight();
    }

    public getLastDamageCause(): EntityDamageEvent | null {
        const javaEvent = this.toJava().getLastDamageCause();
        if (!javaEvent) return null;
        return new EntityDamageEvent(javaEvent);
    }

    public getLocation(): Location {
        const javaLoc = this.toJava().getLocation();
        const javaWorld = javaLoc.getWorld();
        return new Location(
            //@ts-ignore because we need to construct worlds without exposing a public constructor
            javaWorld ? new World(javaWorld) : null,
            javaLoc.getX(),
            javaLoc.getY(),
            javaLoc.getZ(),
            javaLoc.getYaw(),
            javaLoc.getPitch()
        );
    }

    public getMaxFireTicks(): number {
        return this.toJava().getMaxFireTicks();
    }

    public getNearbyEntities(x: number, y: number, z: number): Entity[] {
        // TODO: Not implemented
        return [];
    }

    public getPassengers(): Entity[] {
        const javaPassengers = this.toJava().getPassengers();
        if (!javaPassengers) return [];
        return javaPassengers.map((p: any) => new Entity(p));
    }

    public getPistonMoveReaction(): PistonMoveReaction {
        return this.toJava().getPistonMoveReaction().name();
    }

    public getPortalCooldown(): number {
        return this.toJava().getPortalCooldown();
    }

    public getPose(): Pose {
        return this.toJava().getPose();
    }

    public getScoreboardTags(): string[] {
        // TODO: Not implemented
        return [];
    }

    public getTicksLived(): number {
        return this.toJava().getTicksLived();
    }

    public getType(): EntityType {
        return this.toJava().getType().name();
    }

    public getUUID(): string {
        return this.toJava().getUniqueId().toString();
    }

    public getVehicle(): Entity | null {
        const javaEntity = this.toJava().getVehicle();
        if (!javaEntity) return null;
        return new Entity(javaEntity);
    }

    public getVelocity(): Vector {
        const javaVelocity = this.toJava().getVelocity();
        return new Vector(
            javaVelocity.getX(),
            javaVelocity.getY(),
            javaVelocity.getZ()
        );
    }

    public getWidth(): number {
        return this.toJava().getWidth();
    }

    public getWorld(): World {
        const javaWorld = this.toJava().getWorld();
        //@ts-ignore because we need to construct worlds without exposing a public constructor
        return new World(javaWorld);
    }

    public hasGravity(): boolean {
        return this.toJava().hasGravity();
    }

    public isCustomNameVisible(): boolean {
        return this.toJava().isCustomNameVisible();
    }

    public isDead(): boolean {
        return this.toJava().isDead();
    }

    public hasPassengers(): boolean {
        return this.toJava().hasPassengers();
    }

    public isGlowing(): boolean {
        return this.toJava().isGlowing();
    }

    public isPassenger(): boolean {
        return Boolean(this.getVehicle());
    }

    public isInvulnerable(): boolean {
        return this.toJava().isInvulnerable();
    }

    public isOnGround(): boolean {
        return this.toJava().isOnGround();
    }

    public isSilent(): boolean {
        return this.toJava().isSilent();
    }

    public isValid(): boolean {
        return this.toJava().isValid();
    }

    public leaveVehicle(): boolean {
        return this.toJava().leaveVehicle();
    }

    // /**
    //  * Perform an effect for this entity
    //  * @param effect the effect to perform
    //  */
    // playEffect(effect: EntityEffect): void;

    public remove(): void {
        this.toJava().remove();
    }

    public removePassenger(passenger: Entity): boolean {
        return this.toJava().removePassenger(passenger.toJava());
    }

    public removeScoreboardTag(tag: string): boolean {
        return this.toJava().removeScoreboardTag(tag);
    }

    public setCustomNameVisible(visible: boolean): void {
        this.toJava().setCustomNameVisible(visible);
    }

    public setFallDistance(distance: number): void {
        this.toJava().setFallDistance(distance);
    }

    public setFireTicks(ticks: number): void {
        this.toJava().setFireTicks(ticks);
    }

    public setGlowing(glowing: boolean): void {
        this.toJava().setGlowing(glowing);
    }

    public setGravity(gravity: boolean): void {
        this.toJava().setGravity(gravity);
    }

    public setInvulnerable(invulnerable: boolean): void {
        this.toJava().setInvulnerable(invulnerable);
    }

    public setLastDamageCause(event: EntityDamageEvent | null): void {
        this.toJava().setLastDamageCause(event?.toJava() ?? null);
    }

    public setPortalCooldown(cooldown: number): void {
        this.toJava().setPortalCooldown(cooldown);
    }

    public setRotation(yaw: number, pitch: number): void {
        this.toJava().setRotation(yaw, pitch);
    }

    public setSilent(silent: boolean): void {
        this.toJava().setSilent(silent);
    }

    public setTicksLived(ticks: number): void {
        this.toJava().setTicksLived()
    }

    public setVelocity(velocity: Vector): void {
        this.toJava().setVelocity(velocity.toJava());
    }

    public teleport(location: Location): void {
        this.toJava().teleport(location.toJava());
    }

}

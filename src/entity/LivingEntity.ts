import { Block } from "../block/Block";
import { EntityEquipment } from "../inventory/EntityEquipment";
import { Player } from "../player/Player";
import { PotionEffect } from "../potion/PotionEffect";
import { PotionEffectType } from "../potion/PotionEffectType";
import { ApplyMixins } from "../runtime/ApplyMixins";
import { Location } from "../util/Location";
import { World } from "../world/World";
import { Damageable } from "./Damageable";
import { Entity } from "./Entity";
import { ConstructEntity } from "./EntityConstructors";

export class LivingEntity {

    /**
     * Adds a potion effect to this living entity
     * @param effect the potion effect
     */
     addPotionEffect(effect: PotionEffect): boolean;
    public addPotionEffect(effect: PotionEffect): boolean {
        return this.toJava().addPotionEffect(effect.toJava());
    }

    /**
     * Adds multiple potion effects to this living entity
     * @param effects the array of potion effects
     */
    public addPotionEffects(effects: PotionEffect[]): boolean {
        return effects
            .map(pot => this.addPotionEffect(pot))
            .reduce((prev, current) => prev && current, true);
    }

    /**
     * Makes this entity attack the given entity with a melee attack
     * @param target the target entity to be attacked
     */
    public attack(target: Entity): void {
        this.toJava().attack(target.toJava());
    }

    /**
     * Gets the array of all potion effects currently active on this entity
     */
    public getActivePotionEffects(): PotionEffect[] {
        const javaPots: Java.Value[] = this.toJava().getActivePotionEffects()
        return javaPots.map(pot => PotionEffect.fromJava(pot));
    }

    /**
     * Determines if this entity is able to pick up items
     */
    public canPickupItems(): boolean {
        return this.toJava().canPickupItems();
    }

    /**
     * Gets all of the equipment worn by the living entity
     */
    public getEquipment(): EntityEquipment | null {
        const javaEquip = this.toJava().getEquipment();
        if (!javaEquip) return null;
        return new EntityEquipment(javaEquip);
    }

    /**
     * Gets the height of the living entity's eyes above its location
     * @param ignore_pose whether or not to ignore the pose
     */
    public getEyeHeight(ignore_pose?: boolean): number {
        if (typeof ignore_pose === 'boolean') return this.toJava().getEyeHeight(ignore_pose);
        else return this.toJava().getEyeHeight();
    }

    /**
     * Gets the current location of the entity's eyes
     */
    public getEyeLocation(): Location {
        const javaLoc = this.toJava().getEyeLocation();
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
     * Gets the player who most recently killed this entity
     */
    public getKiller(): Player | null {
        const javaPlayer = this.toJava().getKiller();
        if (!javaPlayer) return null;
        return Player.fromJava(javaPlayer);
    }

    /**
     * Gets the amount of damage most recently dealt to the player
     */
    public getLastDamage(): number {
        return this.toJava().getLastDamage();
    }

    /**
     * Checks if this entity is currently leashed
     */
    public isLeashed(): boolean {
        return this.toJava().isLeashed();
    }

    /**
     * Gets the entity that is currently leading this entity
     */
    public getLeashHolder(): Entity | null {
        if (!this.isLeashed()) return null;
        const javaEntity = this.toJava().getLeashHolder();
        if (!javaEntity) return null;
        return ConstructEntity(javaEntity);
    }

    /**
     * Gets the maximum amount of air the living entity can have, in ticks
     */
    public getMaximumAir(): number {
        return this.toJava().getMaximumAir();
    }

    /**
     * Gets the entity's current maximum no damage ticks
     */
    public getMaximumNoDamageTicks(): number {
        return this.toJava().getMaximumNoDamageTicks();
    }

    /**
     * Gets the living entity's current no damage ticks
     */
    public getNoDamageTicks(): number {
        return this.toJava().getNoDamageTicks();
    }

    /**
     * Gets the active potion effect of the specified type
     * @param type the type of effect
     */
    public getPotionEffect(type: PotionEffectType): PotionEffect | null {
        const javaEffectType = this.toJava().getPotionEffect(type.toJava());
        if (!javaEffectType) return null;
        return PotionEffect.fromJava(javaEffectType);
    }

    /**
     * Gets the remaining number of ticks of air for this entity
     */
    public getRemainingAir(): number {
        return this.toJava().getRemainingAir();
    }

    /**
     * Determines if this entitydespawns when far away from players
     */
    public getRemoveWhenFarAway(): boolean {
        return this.toJava().getRemoveWhenFarAway();
    }

    /**
     * Gets the block that the player is looking at
     * @param max_distance the maximum distance to scan
     */
    public getTargetBlock(max_distance?: number): Block | null {
        const javaBlock = this.toJava().getTargetBlockExact(max_distance ?? 10000);
        if (!javaBlock) return null;
        return Block.fromJava(javaBlock);
    }

    /**
     * Checks if this entity has an AI
     */
    public hasAI(): boolean {
        return this.toJava().hasAI();
    }

    /**
     * Determines if this entity has a line of sight to another entity
     * @param other the other entity
     */
    public hasLineOfSight(other: Entity): boolean {
        if (!other) return false;
        const javaOther = other.toJava();
        if (!javaOther) return false;
        return this.toJava().hasLineOfSight(javaOther);
    }

    /**
     * Checks if this entity has a particular type of potion effect
     * @param type the type of potion effect
     */
    public hasPotionEffect(type: PotionEffectType): boolean {
        return this.toJava().hasPotionEffect(type.toJava());
    }

    /**
     * Checks if this entity is subject to collisions with other entities
     */
    public isCollidable(): boolean {
        return this.toJava().isCollidable();
    }

    /**
     * Checks if this entity is gliding, such as using an elytra
     */
    public isGliding(): boolean {
        return this.toJava().isGliding();
    }

    /**
     * Checks if this entity is currently using the riptide enchantment
     */
    public isRiptiding(): boolean {
        return this.toJava().isRiptiding();
    }

    /**
     * Checks if this entity is currently sleeping
     */
    public isSleeping(): boolean {
        return this.toJava().isSleeping();
    }

    /**
     * Checks if this entity is currently swimming
     */
    public isSwimming(): boolean {
        return this.toJava().isSwimming();
    }

    /**
     * Removes the potion effect with the given type from the entity
     * @param type the type of potion effect
     */
    public removePotionEffect(type: PotionEffectType): void {
        this.toJava().removePotionEffect(type.toJava());
    }

    /**
     * Sets whether or not the entity uses AI
     * @param use_ai the AI status
     */
    public setAI(use_ai: boolean): void {
        this.toJava().setAI(use_ai);
    }

    /**
     * Sets whether or not this entity can pick up items
     * @param pickup the pickup status
     */
    public setCanPickupItems(pickup: boolean): void {
        this.toJava().setCanPickupItems(pickup);
    }

    /**
     * Sets whether or not this entity can collide with other entities
     * @param collidable the collidable status
     */
    public setCollidable(collidable: boolean): void {
        this.toJava().setCollidable(collidable);
    }

    /**
     * Sets whether or not this entity is gliding, like using an elytra
     * @param gliding the gliding status
     */
    public setGliding(gliding: boolean): void {
        this.toJava().setGliding(gliding);
    }

    /**
     * Sets the latest amount of damage dealt to this entity
     * @param damage the amount of damage
     */
    public setLastDamage(damage: number): void {
        this.toJava().setLastDamage(damage);
    }

    /**
     * Sets the entity holding a leash to this entity
     * @param holder the leadh holder
     */
    public setLeashHolder(holder: Entity | null): void {
        this.toJava().setLeashHolder(holder ? holder.toJava() : null)
    }

    /**
     * Sets the maximum number of ticks the entity can be underwater prior
     * to taking damage
     * @param ticks the maximum amount of air
     */
    public setMaximumAir(ticks: number): void {
        this.toJava().setMaximumAir(ticks);
    }

    /**
     * Sets the entity's maximum no damage ticks
     * @param ticks the number of ticks
     */
    public setMaximumNoDamageTicks(ticks: number): void {
        this.toJava().setMaximumNoDamageTicks(ticks);
    }

    /**
     * Sets the entity's no damage ticks
     * @param ticks the number of ticks
     */
    public setNoDamageTicks(ticks: number): void {
        this.toJava().setNoDamageTicks(ticks);
    }

    /**
     * Sets the amount of air remaining, in ticks
     * @param ticks the number of ticks
     */
    public setRemainingAir(ticks: number): void {
        this.toJava().setRemainingAir(ticks);
    }

    /**
     * Sets whether or not to remove this entity when it is far away from players
     * @param remove the remove status
     */
    public setRemoveWhenFarAway(remove: boolean): void {
        this.toJava().setRemoveWhenFarAway(remove);
    }

    /**
     * Sets whether or not this entity is currently swimming
     * @param swimming thr swimming flag
     */
    public setSwimming(swimming: boolean): void {
        return this.toJava().setSwimming(swimming);
    }

    /**
     * Makes the entity swing its main hand
     */
    public swingMainHand(): void {
        this.toJava().swingMainHand();
    }

    /**
     * Makes this entity swing its off hand
     */
    public swingOffHand(): void {
        this.toJava().swingOffHand();
    }

}

export interface LivingEntity extends Entity, Damageable {}
ApplyMixins(LivingEntity, [Entity, Damageable]);

import { EntityEquipment } from "../inventory/EntityEquipment";
import { Player } from "../player/Player";
import { PotionEffect } from "../potion/PotionEffect";
import { PotionEffectType } from "../potion/PotionEffectType";
import { ApplyMixins } from "../runtime/ApplyMixins";
import { Location } from "../util/Location";
import { World } from "../world/World";
import { Damageable } from "./Damageable";
import { Entity } from "./Entity";
import { Block } from "../block/Block";

export class LivingEntity extends Entity {

    public addPotionEffect(effect: PotionEffect): boolean {
        return this.toJava().addPotionEffect(effect.toJava());
    }

    public addPotionEffects(effects: PotionEffect[]): boolean {
        return effects
            .map(pot => this.addPotionEffect(pot))
            .reduce((prev, current) => prev && current, true);
    }

    public attack(target: Entity): void {
        this.toJava().attack(target.toJava());
    }

    public getActivePotionEffects(): PotionEffect[] {
        const javaPots = this.toJava().getActivePotionEffects()
        return javaPots.map((pot: any) => new PotionEffect(pot));
    }

    public canPickupItems(): boolean {
        return this.toJava().canPickupItems();
    }

    public getEquipment(): EntityEquipment | null {
        const javaEquip = this.toJava().getEquipment();
        if (!javaEquip) return null;
        return new EntityEquipment(javaEquip);
    }

    public getEyeHeight(ignore_pose?: boolean): number {
        if (typeof ignore_pose === 'boolean') return this.toJava().getEyeHeight(ignore_pose);
        else return this.toJava().getEyeHeight();
    }

    public getEyeLocation(): Location {
        const javaLoc = this.toJava().getEyeLocation();
        const javaWorld = javaLoc.getWorld();
        return new Location(
            //@ts-ignore World constructor is private
            javaWorld ? new World(javaWorld) : null,
            javaLoc.getX(),
            javaLoc.getY(),
            javaLoc.getZ(),
            javaLoc.getYaw(),
            javaLoc.getPitch()
        );
    }

    public getKiller(): Player | null {
        const javaPlayer = this.toJava().getKiller();
        if (!javaPlayer) return null;
        return new Player(javaPlayer);
    }

    public getLastDamage(): number {
        return this.toJava().getLastDamage();
    }

    public isLeashed(): boolean {
        return this.toJava().isLeashed();
    }

    public getLeashHolder(): Entity | null {
        if (!this.isLeashed()) return null;
        const javaEntity = this.toJava().getLeashHolder();
        if (!javaEntity) return null;
        return new Entity(javaEntity);
    }

    public getMaximumAir(): number {
        return this.toJava().getMaximumAir();
    }

    public getMaximumNoDamageTicks(): number {
        return this.toJava().getMaximumNoDamageTicks();
    }

    public getNoDamageTicks(): number {
        return this.toJava().getNoDamageTicks();
    }

    public getPotionEffect(type: PotionEffectType): PotionEffect | null {
        const javaEffectType = this.toJava().getPotionEffect(type.toJava());
        if (!javaEffectType) return null;
        return new PotionEffect(javaEffectType);
    }

    public getRemainingAir(): number {
        return this.toJava().getRemainingAir();
    }

    public getRemoveWhenFarAway(): boolean {
        return this.toJava().getRemoveWhenFarAway();
    }

    public getTargetBlock(max_distance?: number): Block | null {
        const javaBlock = this.toJava().getTargetBlockExact(max_distance ?? 10000);
        if (!javaBlock) return null;
        return new Block(javaBlock);
    }

    public hasAI(): boolean {
        return this.toJava().hasAI();
    }

    public hasLineOfSight(other: Entity): boolean {
        if (!other) return false;
        const javaOther = other.toJava();
        if (!javaOther) return false;
        return this.toJava().hasLineOfSight(javaOther);
    }

    public hasPotionEffect(type: PotionEffectType): boolean {
        return this.toJava().hasPotionEffect(type.toJava());
    }

    public isCollidable(): boolean {
        return this.toJava().isCollidable();
    }

    public isGliding(): boolean {
        return this.toJava().isGliding();
    }

    public isRiptiding(): boolean {
        return this.toJava().isRiptiding();
    }

    public isSleeping(): boolean {
        return this.toJava().isSleeping();
    }

    public isSwimming(): boolean {
        return this.toJava().isSwimming();
    }

    public removePotionEffect(type: PotionEffectType): void {
        this.toJava().removePotionEffect(type.toJava());
    }

    public setAI(use_ai: boolean): void {
        this.toJava().setAI(use_ai);
    }

    public setCanPickupItems(pickup: boolean): void {
        this.toJava().setCanPickupItems(pickup);
    }

    public setCollidable(collidable: boolean): void {
        this.toJava().setCollidable(collidable);
    }

    public setGliding(gliding: boolean): void {
        this.toJava().setGliding(gliding);
    }

    public setLastDamage(damage: number): void {
        this.toJava().setLastDamage(damage);
    }

    public setLeashHolder(holder: Entity | null): void {
        this.toJava().setLeashHolder(holder ? holder.toJava() : null)
    }

    public setMaximumAir(ticks: number): void {
        this.toJava().setMaximumAir(ticks);
    }

    public setMaximumNoDamageTicks(ticks: number): void {
        this.toJava().setMaximumNoDamageTicks(ticks);
    }

    public setNoDamageTicks(ticks: number): void {
        this.toJava().setNoDamageTicks(ticks);
    }

    public setRemainingAir(ticks: number): void {
        this.toJava().setRemainingAir(ticks);
    }

    public setRemoveWhenFarAway(remove: boolean): void {
        this.toJava().setRemoveWhenFarAway(remove);
    }

    public setSwimming(swimming: boolean): void {
        return this.toJava().setSwimming(swimming);
    }

    public swingMainHand(): void {
        this.toJava().swingMainHand();
    }

    public swingOffHand(): void {
        this.toJava().swingOffHand();
    }

}

export interface LivingEntity extends Damageable {}
ApplyMixins(LivingEntity, [Damageable]);

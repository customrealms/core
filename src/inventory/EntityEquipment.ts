import { EquipmentSlot } from "./EquipmentSlot";
import { Entity } from "../entity/Entity";
import "../globals";
import { ItemStack } from "../material/ItemStack";
import { ToJava } from "../runtime/ToJava";

export class EntityEquipment implements ToJava {

    public constructor(
        private _java: any) {}

    public toJava(): any {
        return this._java;
    }

    public clear(): void {
        return this.toJava().clear();
    }

    public getArmorContents(): ItemStack[] {
        // TODO: Not implemented
        return [];
    }

    public getBoots(): ItemStack | null {
        const javaItemStack = this.toJava().getBoots();
        return javaItemStack ? new ItemStack(javaItemStack) : null;
    }

    public getBootsDropChance(): number {
        return this.toJava().getBootsDropChance();
    }

    public getChestplate(): ItemStack | null {
        const javaItemStack = this.toJava().getChestplate();
        return javaItemStack ? new ItemStack(javaItemStack) : null;
    }

    public getChestplateDropChance(): number {
        return this.toJava().getChestplateDropChance();
    }

    public getHelmet(): ItemStack | null {
        const javaItemStack = this.toJava().getHelmet();
        return javaItemStack ? new ItemStack(javaItemStack) : null;
    }

    public getHelmetDropChance(): number {
        return this.toJava().getHelmetDropChance();
    }

    public getHolder(): Entity | null {
        const javaEntity = this.toJava().getHolder();
        if (!javaEntity) return null;
        return new Entity(javaEntity);
    }

    public getItem(slot: EquipmentSlot): ItemStack | null {
        const javaEquipSlot = Java.resolve('org.bukkit.inventory.EquipmentSlot').valueOf(slot);
        if (!javaEquipSlot) return null;
        const javaItemStack = this.toJava().getItem(javaEquipSlot);
        return javaItemStack ? new ItemStack(javaItemStack) : null;
    }

    public getItemInMainHand(): ItemStack | null {
        const javaItemStack = this.toJava().getItemInMainHand();
        return javaItemStack ? new ItemStack(javaItemStack) : null;
    }

    public getItemInMainHandDropChance(): number {
        return this.toJava().getItemInMainHandDropChance();
    }

    public getItemInOffHand(): ItemStack | null {
        const javaItemStack = this.toJava().getItemInOffHand();
        return javaItemStack ? new ItemStack(javaItemStack) : null;
    }

    public getItemInOffHandDropChance(): number {
        return this.toJava().getItemInOffHandDropChance();
    }

    public getLeggings(): ItemStack | null {
        const javaItemStack = this.toJava().getLeggings();
        return javaItemStack ? new ItemStack(javaItemStack) : null;
    }

    public getLeggingsDropChance(): number {
        return this.toJava().getLeggingsDropChance();
    }

    public setArmorContents(items: ItemStack[]): void {

    }

    public setBoots(boots: ItemStack | null): void {
        this.toJava().setBoots(boots?.toJava() ?? null);
    }

    public setBootsDropChance(chance: number): void {
        this.toJava().setBootsDropChance(chance);
    }

    public setChestplate(chestplate: ItemStack | null): void {
        this.toJava().setChestplate(chestplate?.toJava() ?? null);
    }

    public setChestplateDropChance(chance: number): void {
        this.toJava().setChestplateDropChance(chance);
    }

    public setHelmet(helmet: ItemStack | null): void {
        this.toJava().setHelmet(helmet?.toJava() ?? null);
    }

    public setHelmetDropChance(chance: number): void {
        this.toJava().setHelmetDropChance(chance);
    }

    public setItem(slot: EquipmentSlot, item: ItemStack | null): void {
        const javaEquipSlot = Java.resolve('org.bukkit.inventory.EquipmentSlot').valueOf(slot);
        if (!javaEquipSlot) return;
        this.toJava().setItem(javaEquipSlot, item?.toJava() ?? null);
    }

    public setItemInMainHand(item: ItemStack | null): void {
        this.toJava().setItemInMainHand(item?.toJava() ?? null);
    }

    public setItemInMainHandDropChance(chance: number): void {
        this.toJava().setItemInMainHandDropChance(chance);
    }

    public setItemInOffHand(item: ItemStack | null): void {
        this.toJava().setItemInOffHand(item?.toJava() ?? null);
    }

    public setItemInOffHandDropChance(chance: number): void {
        this.toJava().setItemInOffHandDropChance(chance);
    }

    public setLeggings(leggings: ItemStack | null): void {
        this.toJava().setLeggings(leggings?.toJava() ?? null);
    }

    public setLeggingsDropChance(chance: number): void {
        this.toJava().setLeggingsDropChance(chance);
    }

}

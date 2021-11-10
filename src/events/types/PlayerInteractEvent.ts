import { BlockAction } from "../../block/BlockAction";
import { BlockFace } from "../../block/BlockFace";
import { Block } from "../../block/Block";
import { ItemStack } from "../../material/ItemStack";
import { Material } from "../../material/Material";
import { Player } from "../../player/Player";
import { Event } from "./Event";
import { EquipmentSlot } from "../../inventory/EquipmentSlot";

export class PlayerInteractEvent extends Event {

    public getPlayer(): Player {
        return new Player(this._event.getPlayer());
    }

    public getAction(): BlockAction {
        const javaBlockAction = this._event.getAction();
        return javaBlockAction.name();
    }

    public setCancelled(cancel: boolean): void {
        this._event.setCancelled(cancel);
    }

    public getItem(): ItemStack | null {
        const javaItemStack = this._event.getItem();
        if (!javaItemStack) return null;
        return new ItemStack(javaItemStack);
    }

    public getMaterial(): Material {
        const javaMaterial = this._event.getMaterial();
        return new Material(javaMaterial);
    }

    public hasBlock(): boolean {
        return this._event.hasBlock();
    }

    public hasItem(): boolean {
        return this._event.hasItem();
    }

    public isBlockInHand(): boolean {
        return this._event.isBlockInHand();
    }

    public getClickedBlock(): Block | null {
        const javaBlock = this._event.getClickedBlock();
        if (!javaBlock) return null;
        return new Block(javaBlock);
    }

    public getBlockFace(): BlockFace {
        const javaBlockFace = this._event.getBlockFace();
        return BlockFace.named(javaBlockFace.name())!;
    }

    public useInteractedBlock(): void {
        this._event.useInteractedBlock();
    }

    public useItemInHand(): void {
        this._event.useItemInHand();
    }

    public getHand(): EquipmentSlot | null {
        const javaEquipSlot = this._event.getHand();
        if (!javaEquipSlot) return null;
        return javaEquipSlot.name();
    }

}

import { BlockAction } from '../../../block/BlockAction';
import { BlockFace } from '../../../block/BlockFace';
import { Block } from '../../../block/Block';
import { ItemStack } from '../../../material/ItemStack';
import { Material } from '../../../material/Material';
import { EquipmentSlot } from '../../../inventory/EquipmentSlot';
import { PlayerEvent } from './PlayerEvent';
import { Cancellable } from '../../Cancellable';

export class PlayerInteractEvent extends PlayerEvent implements Cancellable {
	public static getBukkitClasspath(): string {
		return 'org.bukkit.event.player.PlayerInteractEvent';
	}

	/**
	 * Gets the action performed by the player
	 */
	public getAction(): BlockAction {
		const javaBlockAction = this.toJava().getAction();
		return javaBlockAction.name();
	}

	public setCancelled(cancel: boolean): void {
		this.toJava().setCancelled(cancel);
	}

	public isCancelled(): boolean {
		return this.toJava().isCancelled();
	}

	/**
	 * Gets the item in the player's hand. Returns null if this event does not involve a
	 * player hand, such as stepping on a pressure plate.
	 */
	public getItem(): ItemStack | null {
		const javaItemStack = this.toJava().getItem();
		if (!javaItemStack) return null;
		return ItemStack.fromJava(javaItemStack);
	}

	/**
	 * Gets the material of the item used in the player's hand
	 */
	public getMaterial(): Material {
		const javaMaterial = this.toJava().getMaterial();
		return Material.fromJava(javaMaterial);
	}

	/**
	 * Checks if this event involved a block
	 */
	public hasBlock(): boolean {
		return this.toJava().hasBlock();
	}

	/**
	 * Checks if this event involved an item
	 */
	public hasItem(): boolean {
		return this.toJava().hasItem();
	}

	/**
	 * Determines if this was an attempted block placement event
	 */
	public isBlockInHand(): boolean {
		return this.toJava().isBlockInHand();
	}

	/**
	 * Gets the clock that was clicked
	 */
	public getClickedBlock(): Block | null {
		const javaBlock = this.toJava().getClickedBlock();
		if (!javaBlock) return null;
		return Block.fromJava(javaBlock);
	}

	/**
	 * Gets the face of the block that was clicked
	 */
	public getBlockFace(): BlockFace {
		const javaBlockFace = this.toJava().getBlockFace();
		return BlockFace.named(javaBlockFace.name()) as BlockFace;
	}

	/**
	 * Allows the player to use the block being interacted with, if possible
	 */
	public useInteractedBlock(): void {
		this._event.useInteractedBlock();
	}

	/**
	 * Allows the player to use the item in their hand, if possible
	 */
	public useItemInHand(): void {
		this._event.useItemInHand();
	}

	/**
	 * Gets the hand used to perform the interaction. Returns null in the case where
	 * the action is BlockAction.PHYSICAL (stepping on a pressure plate, etc.)
	 */
	public getHand(): EquipmentSlot | null {
		const javaEquipSlot = this._event.getHand();
		if (!javaEquipSlot) return null;
		return javaEquipSlot.name();
	}
}

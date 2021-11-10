import { ToJava } from "../runtime/ToJava";
import { ItemStack } from "./ItemStack";

export class ItemDrop implements ToJava {

    public static fromJava(_item: Java.Value): ItemDrop {
        return new ItemDrop(_item);
    }

    private constructor(
        private _item: Java.Value,
    ) {}

    public toJava(): Java.Value {
        return this._item;
    }

    /**
     * Gets the item stack associated with this item drop. This is the stack that
     * would be picked up by a player.
     */
    public getItemStack(): ItemStack | null {
        const javaItemStack = this._item?.getItemStack();
        if (!javaItemStack) return null;
        return ItemStack.fromJava(javaItemStack);
    }

    /**
     * Sets the item stack associated with this item drop
     * @param item_stack the item stack
     */
    public setItemStack(item_stack: ItemStack | null): void {
        this._item?.setItemStack((item_stack as any)?._itemstack ?? null);
    }

    /**
     * Gets the delay before this item drop is available to be picked up by players
     */
    public getPickupDelay(): number {
        return this._item?.getPickupDelay();
    }

    /**
     * Sets the delay before this item drop is available to be picked up by players
     * @param delay the delay in ticks
     */
    public setPickupDelay(delay: number): void {
        this._item?.setPickupDelay(delay);
    }

}

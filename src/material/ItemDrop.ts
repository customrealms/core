import { ItemStack } from "./ItemStack";

export class ItemDrop {

    public constructor(
        private _item: any) {}

    public getItemStack(): ItemStack | null {
        const javaItemStack = this._item?.getItemStack();
        if (!javaItemStack) return null;
        return new ItemStack(javaItemStack);
    }

    public setItemStack(item_stack: ItemStack | null): void {
        this._item?.setItemStack((item_stack as any)?._itemstack ?? null);
    }

    public getPickupDelay(): number {
        return this._item?.getPickupDelay();
    }

    public setPickupDelay(delay: number): void {
        this._item?.setPickupDelay(delay);
    }

}

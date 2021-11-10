import { ToJava } from '../runtime/ToJava';

export class Material implements ToJava {

    public static withName(name: string, exact: boolean = false): Material | null {
        const javaMat = exact
            ? Java.resolve('org.bukkit.Material').getMaterial(name)
            : Java.resolve('org.bukkit.Material').matchMaterial(name);
        // const javaMat = JavaBindings.org.bukkit.Material[name];
        if (!javaMat) return null;
        return new Material(javaMat);
    }

    public static all(): Material[] {
        return Java.resolve('org.bukkit.Material')
            .values()
            .map((javaMat: any) => new Material(javaMat));
    }

    public constructor(
        private _material: any) {}

    public toJava(): any {
        return this._material;
    }

    public getName(): string {
        return this._material.name();
    }

    public getBlastResistance(): number {
        return this._material?.getBlastResistance();
    }

    public getHardness(): number {
        return this._material?.getHardness();
    }

    public getMaxDurability(): number {
        return this._material?.getMaxDurability();
    }

    public getMaxStackSize(): number {
        return this._material?.getMaxStackSize();
    }

    public hasGravity(): boolean {
        return this._material?.hasGravity();
    }

    public isAir(): boolean {
        return this._material?.isAir();
    }

    public isBlock(): boolean {
        return this._material?.isBlock();
    }

    public isEdible(): boolean {
        return this._material?.isEdible();
    }

    public isFlammable(): boolean {
        return this._material?.isFlammable();
    }

    public isFuel(): boolean {
        return this._material?.isFuel();
    }

    public isInteractable(): boolean {
        return this._material?.isInteractable();
    }

    public isItem(): boolean {
        return this._material?.isItem();
    }

    public isOccluding(): boolean {
        return this._material?.isOccluding();
    }

    public isRecord(): boolean {
        return this._material?.isRecord();
    }

    public isSolid(): boolean {
        return this._material?.isSolid();
    }

    /**
     * Determines if this material is the same as another
     * @param other the other material
     */
    public equals(other: Material): boolean {
        if (!other || !(other instanceof Material)) return false;
        return other.getName() === this.getName();
    }

}

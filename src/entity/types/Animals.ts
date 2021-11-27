import { ItemStack } from '../../material/ItemStack';
import { Material } from '../../material/Material';
import { Extends } from '../../runtime/Extends';
import { ToJava } from '../../runtime/ToJava';
import { Breedable } from './Breedable';

export interface Animals extends Breedable {}

/**
 * Represents an Animal.
 */
@Extends(Breedable)
export class Animals implements ToJava {

    /**
     * Get the UUID of the entity that caused this entity to enter the Breedable.canBreed() state.
     */
    public getBreedCause(): string | null {
        return this.toJava().getBreedCause()?.toString() ?? null;
    }

    /**
     * Set the UUID of the entity that caused this entity to enter the Breedable.canBreed() state.
     */
    public setBreedCause(uuid: string | null): void {
        this.toJava().setBreedCause(
            uuid ? Java.resolve('java.util.UUID').fromString(uuid) : null
        );
    }

    /**
     * Get whether or not this entity is in love mode and will produce offspring with another entity in love mode. Will return true if and only if getLoveModeTicks() is greater than 0.
     */
    public isLoveMode(): boolean {
        return this.toJava().isLoveMode();
    }

    /**
     * Get the amount of ticks remaining for this entity in love mode. If the entity is not in love mode, 0 will be returned.
     */
    public getLoveModeTicks(): number {
        return this.toJava().getLoveModeTicks();
    }

    /**
     * Set the amount of ticks for which this entity should be in love mode. Setting the love mode ticks to 600 is the equivalent of a player feeding the entity their breeding item of choice.
     * @param ticks the love mode ticks. Must be positive
     */
    public setLoveModeTicks(ticks: number): void {
        this.toJava().setLoveModeTicks(ticks);
    }

    /**
     * Check if the provided ItemStack is the correct item used for breeding this entity.
     * @param stack the item stack to check
     */
    public isBreedItem(stack: ItemStack): boolean;

    /**
     * Check if the provided ItemStack is the correct item used for breeding this entity.
     * @param material the material to check
     */
    public isBreedItem(material: Material): boolean;

    public isBreedItem(stackOrMaterial: ItemStack | Material): boolean {
        // The Bukkit API will take either an ItemStack or a Material
        return this.toJava().isBreedItem(stackOrMaterial.toJava());
    }

}

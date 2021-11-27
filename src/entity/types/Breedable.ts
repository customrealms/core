import { Extends } from '../../runtime/Extends';
import { ToJava } from '../../runtime/ToJava';
import { Ageable } from './Ageable';

export interface Breedable extends Ageable {}

/**
 * Represents an entity that can age and breed.
 */
@Extends(Ageable)
export class Breedable implements ToJava {

    /**
     * Return the ability to breed of the animal.
     */
    public canBreed(): boolean {
        return this.toJava().canBreed();
    }

    /**
     * Gets the current age lock.
     */
    public getAgeLock(): boolean {
        return this.toJava().getAgeLock();
    }

    /**
     * Lock the age of the animal, setting this will prevent the animal from maturing or getting ready for mating.
     * @param lock new lock
     */
    public setAgeLock(lock: boolean): void {
        this.toJava().setAgeLock(lock);
    }

    /**
     * Set breedability of the animal, if the animal is a baby and set to breed it will instantly grow up.
     * @param breed breedability of the animal
     */
    public setBreed(breed: boolean): void {
        this.toJava().setBreed(breed);
    }

}

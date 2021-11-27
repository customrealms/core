import { Extends } from '../../runtime/Extends';
import { ToJava } from '../../runtime/ToJava';
import { Monster } from './Monster';

export interface Tameable extends ToJava {}

@Extends(Monster)
export class Tameable implements ToJava {

    /**
     * Check if this is tamed
     * If something is tamed then a player can not tame it through normal methods, even if it does not belong to anyone in particular.
     */
    public isTamed(): boolean {
        return this.toJava().isTamed();
    }

    /**
     * Sets if this has been tamed. Not necessary if the method setOwner has been used, as it tames automatically.
     * If something is tamed then a player can not tame it through normal methods, even if it does not belong to anyone in particular.
     * @param tame whether or not to tame the animal
     */
    public setTamed(tame: boolean): void {
        this.toJava().setTamed(tame);
    }

    // /**
    //  * Gets the current owning AnimalTamer
    //  */
    // public getOwner(): AnimalTamer | null {
    //     const javaAnimalTamer = this.toJava().getOwner();
    //     if (!javaAnimalTamer) return null;
    //     return ConstructEntity<AnimalTamer>(javaAnimalTamer);
    // }

    // /**
    //  * Set this to be owned by given AnimalTamer.
    //  * If the owner is not null, this will be tamed and will have any current path it is following removed. If the owner is set to null, this will be untamed, and the current owner removed.
    //  * @param tamer the AnimalTamer who should own this entity
    //  */
    // public setOwner(tamer: AnimalTamer | null): void {
    //     this.toJava().setOwner(tamer?.toJava() ?? null);
    // }

}

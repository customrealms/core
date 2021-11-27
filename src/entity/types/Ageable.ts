import { Extends } from '../../runtime/Extends';
import { ToJava } from '../../runtime/ToJava';
import { Creature } from './Creature';

export interface Ageable extends Creature {}

/**
 * Represents an entity that can age.
 */
@Extends(Creature)
export class Ageable implements ToJava {

    /**
     * Gets the age of this mob
     */
    public getAge(): number {
        return this.toJava().getAge();
    }

    /**
     * Sets the age of this mob
     * @param age new age
     */
    public setAge(age: number): void {
        this.toJava().setAge(age);
    }

    /**
     * Sets the age of the mob to a baby
     */
    public setBaby(): void {
        this.toJava().setBaby();
    }

    /**
     * Sets the age of the mob to an adult
     */
    public setAdult(): void {
        this.toJava().setAdult();
    }

    /**
     * Returns true if the mob is an adult
     */
    public isAdult(): boolean {
        return this.toJava().isAdult();
    }

}

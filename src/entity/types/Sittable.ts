import { Extends } from '../../runtime/Extends';
import { ToJava } from '../../runtime/ToJava';
import { Monster } from './Monster';

export interface Sittable extends ToJava {}

/**
 * An animal that can sit still.
 */
@Extends(Monster)
export class Sittable implements ToJava {

    /**
     * Checks if this animal is sitting
     */
    public isSitting(): boolean {
        return this.toJava().isSitting();
    }

    /**
     * Sets if this animal is sitting. Will remove any path that the animal was following beforehand.
     * @param sitting whether or not the animal is sitting
     */
    public setSitting(sitting: boolean): void {
        this.toJava().setSitting(sitting);
    }

}

import { Extends } from '../../runtime/Extends';
import { ToJava } from '../../runtime/ToJava';
import { Creature } from './Creature';

export interface Monster extends Creature {}

/**
 * Represents a Monster.
 */
@Extends(Creature)
export class Monster implements ToJava {}

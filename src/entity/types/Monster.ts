import { Creature } from '.';
import { Extends } from '../../runtime/Extends';
import { ToJava } from '../../runtime/ToJava';

export interface Monster extends Creature {}

/**
 * Represents a Monster.
 */
@Extends(Creature)
export class Monster implements ToJava {}

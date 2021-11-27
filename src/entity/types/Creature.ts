import { Extends } from '../../runtime/Extends';
import { ToJava } from '../../runtime/ToJava';
import { Mob } from './Mob';

export interface Creature extends Mob {}

/**
 * Represents a Creature. Creatures are non-intelligent monsters or animals which have very simple abilities.
 */
@Extends(Mob)
export class Creature implements ToJava {}

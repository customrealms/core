import { Player } from '../player/Player';
import { EntityType } from './EntityType';


/**
 * Mapping of EntityType values to the corresponding class constructor. We use any instead of
 * Constructor<Entity> because Entity subclasses have private constructors.
 */
export const EntityConstructors: {[key in EntityType]?: any } = {
    [EntityType.PLAYER]: Player,
};

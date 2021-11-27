import { Player } from '../player/Player';
import { EntityType } from './EntityType';
import { Bee, Cow, Creeper, Sheep, Wolf } from './types';
import { Entity } from './types/Entity';
import { LightningStrike } from './types/LightningStrike';

/**
 * Mapping of EntityType values to the corresponding class constructor. We use any instead of
 * Constructor<Entity> because Entity subclasses have private constructors.
 * 
 * Classes listed as values here MUST have a constructor and must implement ToJava!
 */
export const EntityConstructors: {[key in EntityType]?: any } = {
    [EntityType.BEE]: Bee,
    [EntityType.COW]: Cow,
    [EntityType.CREEPER]: Creeper,
    [EntityType.LIGHTNING]: LightningStrike,
    [EntityType.PLAYER]: Player,
    [EntityType.SHEEP]: Sheep,
    [EntityType.WOLF]: Wolf,
};

/**
 * Converts a raw Java handle to an entity into the wrapped JavaScript subclass of the entity's type
 * @param _entity the Java handle to the underlying Entity
 * @returns the entity, wrapped in the appropriate subclass for its EntityType
 */
export function ConstructEntity<T extends Entity = Entity>(_entity: Java.Value): T {

    // Get the string EntityType string value for the entity
    const entityType: EntityType = _entity.getType().name();

    // If the entity type has a corresponding constructor, construct using that class
    if ((entityType in EntityConstructors)) {
        return new (EntityConstructors[entityType]!)(_entity) as T;
    }

    // Fallback to the base Entity class if we can't match to a subclass
    return Entity.fromJava(_entity) as T;

}

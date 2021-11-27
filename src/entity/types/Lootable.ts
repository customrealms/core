import { Extends } from '../../runtime/Extends';
import { ToJava } from '../../runtime/ToJava';

export interface Lootable extends ToJava {}

/**
 * Represents a Container or a Mob that can have a loot table.
 * Container loot will only generate upon opening, and only when the container is first opened.
 * Entities will only generate loot upon death.
 */
@Extends()
export class Lootable implements ToJava {

    // /**
    //  * Set the loot table for a container or entity.
    //  * To remove a loot table use null. Do not use LootTables.EMPTY to clear a LootTable.
    //  * @param table the Loot Table this Container or Mob will have
    //  */
    // public setLootTable(table: LootTable | null): void {
    //     this.toJava().setLootTable(table?.toJava() ?? null);
    // }

    // /**
    //  * Gets the Loot Table attached to this block or entity.
    //  * If an block/entity does not have a loot table, this will return null, NOT an empty loot table.
    //  */
    // public getLootTable(): LootTable | null {
    //     const javaLootTable = this.getLootTable();
    //     if (!javaLootTable) return null;
    //     return LootTable.fromJava(javaLootTable);
    // }

    /**
     * Set the seed used when this Loot Table generates loot
     * @param seed the seed to use to generate loot. Default is 0
     */
    public setSeed(seed: number): void {
        this.toJava().setSeed(seed);
    }

    /**
     * Get the Loot Table's seed
     */
    public getSeed(): number {
        return this.toJava().getSeed();
    }

}

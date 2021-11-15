import { Player } from '../../..';
import { HumanEntity } from '../../../entity/HumanEntity';
import { Inventory } from '../../../inventory/Inventory';
import { InventoryView } from '../../../inventory/InventoryView';
import { Event } from '../Event';

export class InventoryEvent extends Event {
  /**
   * Gets the primary Inventory involved in this transaction
   */
  public getInventory(): Inventory {
    return new Inventory(this.toJava().getInventory());
  }

  /**
   * Gets the list of players viewing the primary (upper) inventory involved in this event
   */
  public getViewers(): readonly Player[] {
    return Object.freeze(this.toJava().getViewers().map((entity: any) => Player.fromJava(entity)));
  }

  /**
   * Gets the view object itself
   */
  public getView(): InventoryView {
    return new InventoryView(this.toJava().getView());
  }
}

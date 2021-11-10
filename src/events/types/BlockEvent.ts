import { Event } from "./Event";
import { Block } from "../../block/Block";

export class BlockEvent extends Event {

    public getBlock(): Block {
        return Block.fromJava(this.toJava().getBlock());
    }

}

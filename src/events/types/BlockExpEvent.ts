import { BlockEvent } from "./BlockEvent";

export class BlockExpEvent extends BlockEvent {

    public getExpToDrop(): number {
        return this.toJava().getExpToDrop();
    }

    public setExpToDrop(exp: number): void {
        return this.toJava().setExpToDrop(exp);
    }

}

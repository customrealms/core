import { Extends } from "../../runtime/Extends";
import { ToJava } from "../../runtime/ToJava";
import { Monster } from "./Monster";

export interface AbstractSkeleton extends Monster {}

@Extends(Monster)
export class AbstractSkeleton implements ToJava {}

import { ItemStack } from "../..";
import { ToJava } from "../../runtime/ToJava";

export class FileConfiguration implements ToJava {
    
	public static fromJava(_fileConfiguration: Java.Value): FileConfiguration {
		return new FileConfiguration(_fileConfiguration);
	}

	private constructor(private _fileConfiguration: Java.Value) {}

	public toJava(): Java.Value {
		return this._fileConfiguration;
	}

    public getString(path: string): string | null {
        return this.toJava().getString(path)

    }

    public getBoolean(path: string): boolean | null {
        return this.toJava().getBoolean(path)

    }

    public getInt(path: string): number | null {
        return this.toJava().getInt(path)

    }

    public getItemStack(path: string): ItemStack | null{
        return ItemStack.fromJava(this.toJava().getItemStack(path))

    }

    public set(path: string, object: any) {
        this.toJava().set(path, object instanceof Object && object.toJava != null ? object.toJava() : object)

    }

}
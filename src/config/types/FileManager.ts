import { ToJava } from "../../runtime/ToJava";
import { FileConfiguration } from './FileConfiguration'

export class FileManager implements ToJava {

    public static fromJava(_file_manager: Java.Value) {
		return new FileManager(_file_manager);
	}

	private constructor(private _file_manager: Java.Value) {}

	public toJava(): Java.Value {
		return this._file_manager;
	}

    public getConfig() {
        return FileConfiguration.fromJava(this.toJava().getConfig())

    }

    public saveConfig() {
        this.toJava().saveConfig()
    
    }
    
    public reloadConfig() {
        this.toJava().reloadConfig()
    
    }

}

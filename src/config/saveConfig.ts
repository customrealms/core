import { FileManager } from "./types/FileManager"

export const saveConfig = (file?: string) => { return FileManager.fromJava(Config.save(file || 'config')) }
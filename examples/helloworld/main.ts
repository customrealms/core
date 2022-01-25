import { saveConfig, Material, ItemStack } from '../../dist'

const config = saveConfig()

const item = ItemStack.create(Material.withName('dirt')!, 1)

config.getConfig().set('savedItem', item)
config.getConfig().set('savedItemName', item.getMaterial().getName())

console.log(`Saved ${config.getConfig().getItemStack('savedItem')?.getMaterial().getName()}`)

config.saveConfig()

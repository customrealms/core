import { saveConfig } from '../../dist'

const config = saveConfig('config')

config.getConfig().set('numbers', [ 0, 1, 3, 4, 5, 6, 7, 8, 9, 10 ])
config.getConfig().getIntegerList('numbers')?.forEach((number) => {
    console.log(number)

})

config.saveConfig()

const { Wechaty } = require('wechaty')
const terminal = require('qrcode-terminal')

const { init } = require('./findData')

const bot = new Wechaty()

bot.on('scan', (url, code) => {
  if (!/201|200/.test(String(code))) {
    terminal.generate(url, { small: true })  
  }
})

bot.on('login', async user => {
  console.log(`User ${user} logined`)
  init(bot)
})

// bot.on('message', message => console.log(`Message: ${message}`))

bot.start()
const superagent = require('superagent')
const cheerio = require('cheerio')

const { time, filmName, sendUsers } = require('./config')

let timer = null

let bot = null

const intervalFunc = () => {
  superagent.get('https://maoyan.com/films?sortId=2').end((err, res) => {
    if (err) {
      console.log(` - ${err}`)
    } else {
      getFilms(res)
    }
  });
}

const init = wetchy => {
  bot = wetchy
  intervalFunc()
  timer = setInterval(intervalFunc, time);
}

const sendUsersFunc = () => {
  sendUsers.forEach(async item => {
    const contact = await bot.Contact.find({ name: item.name }) || await bot.Contact.find({ alias: item.alias })
    contact && contact.say('开映啦！！！')
  })
}

const getFilms = res => {
  let $ = cheerio.load(res.text);
  var isOn = false
  $('.channel-detail').each((idx, ele) => {
    if ($(ele).text().indexOf(filmName) != -1) {
      isOn = true
    }
  });
  if (isOn) {
    sendUsersFunc()
    console.log('上映')
    clearInterval(timer)
  } else {
    console.log("影片未上映....")
  }
}

module.exports = {
  init,
}
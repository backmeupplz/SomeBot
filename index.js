require('dotenv').config({ path: `${__dirname}/.env` })

const TelegramBot = require('node-telegram-bot-api')
const bot = new TelegramBot(process.env.TOKEN, { polling: true })

thxm = /жаль|🌮|тако|значит так|благодар|мерси|сяб|təşəkkür|faleminderit|አመሰግናለሁ|thanks|شكر|շնորհակալություն|dankie|eskerrik|дзякуй|дякую|আপনাকে ধন্যবাদ|ကျေးဇူးတင်ပါတယ်|благодаря|aitäh|hvala|diolch|köszönöm|cảm ơn|mahalo|grazas|ευχαριστώ|მადლობა|આભાર|tak|ngiyabonga|תודה|daalụ|דאַנקען דיר|terima kasih|go raibh maith agat|takk fyrir|gracias|grazie|ṣeun|рахмет|ಧನ್ಯವಾದಗಳು|gràcies|рахмат|謝謝你|谢谢你|고마워|grazie|mèsi|spas|សូមអរគុណ|enkosi|ຂອບໃຈ|gratias|paldies|ačiū|merci|благодарам|misaotra|terima kasih|നന്ദി|grazzi|mihi|धन्यवाद|баярлалаа|Dank|धन्यवाद|dank|takk|ଧନ୍ୟବାଦ|ਧੰਨਵਾਦ|ممنون|dziękuję|obrigada|مننه|murakoze|multumesc|спасибо|faafetai|salamat|хвала|leboha|ස්තූතියි|مهرباني|ďakujem|hvala|mahadsanid|asante|hatur|ташаккур|ขอบคุณ|நன்றி|рәхмәт|ధన్యవాదాలు|teşekkür|sag bol|Rahmat|رەھمەت سىزگە|Дякуємо|شکریہ|Salamat|Kiitos|merci|betanke|godiya|धन्यवाद|tsaug|hvala|zikomo|díky|tack|ndatenda|taing|dankon|tänan|matur|ありがとう|א דאנק/i

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Хто, я?')
})


rt = []
rn = []

bot.on('text', (msg) => {
  let t = msg.text.toLowerCase()
  let chid = msg.chat.id

  rt[chid] = rt[chid] || ''
  rn[chid] = rn[chid] || 0

  if (t == rt[chid] && t != thxm) rn[chid]++
  else rn[chid] = 0

  rt[chid] = t

  if (rn[chid] == 2) {
    bot.sendMessage(chid, msg.text)
    rn[chid] = 0
    rt[chid] = ''
  }
})

bot.onText(thxm, (msg) => {
  let t = msg.text.toLowerCase()
  let txt = ''
  
t.split(' ').forEach(function (i){
       if (i.indexOf('спасибо') != -1 || i.indexOf('благодар') != -1) txt += 'Спасибо! '
  else if (i.indexOf('thanks') != -1) txt += 'О! Вы из Англии! '
  else if (i.indexOf('дякую') != -1) txt += 'Слава Украине! '
  else if (i.indexOf('danke') != -1) txt += 'Sehr dankbar! '
  else if (i.indexOf('dank') != -1) txt += '0/ '
  else if (i.indexOf('grazie') != -1) txt += 'Mamma mia! Pizza mozzarella! '
  else if (i.indexOf('merci') != -1 || i.indexOf('мерси') != -1) txt += '🥐☕ '
  
  else if (i.indexOf('жаль') != -1) txt += 'Сейчас ужалю! '
  
  else if (i.indexOf('москва') != -1) txt += 'А Москва то потонула! '
  else if (i.indexOf('путин') != -1) txt += 'Вы, наверное, хотели сказать Гитлер? '
  else if (i.indexOf('тако') != -1) txt += '🌮 '
  else if (i.indexOf('🌮') != -1) txt += 'Значит так... '
  else if (i.indexOf('значит так') != -1) txt += 'Это не тако! '
  else if (i.match(thxm)) txt += 'Спасибо!!! '
  
});
  if (txt.length > 500) txt = 'а всё!';
  if (txt != '') bot.sendMessage(msg.chat.id, txt)
});

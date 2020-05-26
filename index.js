require('dotenv').config({ path: `${__dirname}/.env` })

const TelegramBot = require('node-telegram-bot-api')
const bot = new TelegramBot(process.env.TOKEN, { polling: true })

thxm = /жал|благодар|мерси|сяб|təşəkkür|faleminderit|አመሰግናለሁ|thanks|شكرا لك|շնորհակալություն|dankie|eskerrik|дзякуй|আপনাকে ধন্যবাদ|ကျေးဇူးတင်ပါတယ်|благодаря|hvala|diolch|köszönöm|cảm ơn|mahalo|grazas|ευχαριστώ|მადლობა|આભાર|tak|ngiyabonga|תודה|daalụ|דאַנקען דיר|terima kasih|go raibh maith agat|takk fyrir|gracias|grazie|ṣeun|рахмет|ಧನ್ಯವಾದಗಳು|gràcies|рахмат|謝謝你|谢谢你|고마워|grazie|mèsi|spas|សូមអរគុណ|enkosi|ຂອບໃຈ|gratias|paldies|ačiū|merci|благодарам|misaotra|terima kasih|നന്ദി|grazzi|mihi|धन्यवाद|баярлалаа|Dank|धन्यवाद|dank|takk|ଧନ୍ୟବାଦ|ਧੰਨਵਾਦ|ممنون|dziękuję|obrigada|مننه|murakoze|multumesc|спасибо|faafetai|salamat|хвала|leboha|ස්තූතියි|مهرباني|ďakujem|hvala|mahadsanid|asante|hatur|ташаккур|ขอบคุณ|நன்றி|рәхмәт|ధన్యవాదాలు|teşekkür|sag bol|Rahmat|رەھمەت سىزگە|Дякуємо|شکریہ|Salamat|Kiitos|merci|betanke|godiya|धन्यवाद|tsaug|hvala|zikomo|díky|tack|ndatenda|taing|dankon|tänan|matur|ありがとう|א דאנק/i

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Хто, я?')
})

bot.onText(/тако/i, (msg) => {
  bot.sendMessage(msg.chat.id, '🌮')
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
  let txtq = '0'
  let txtw = '0'

  if (t.indexOf('спасибо') != -1 || t.indexOf('благодар') != -1)
    txtq = 'Спасибо!'
  else if (t.indexOf('thanks') != -1) txtq = 'О! Вы из Англии!'
  else if (t.indexOf('дякую') != -1) txtq = 'Слава Украине!'
  else if (t.indexOf('danke') != -1) txtq = 'Sehr dankbar!'
  else if (t.indexOf('dank') != -1) txtq = '0/!'
  else if (t.indexOf('grazie') != -1) txtq = 'Mamma mia! Pizza mozzarella!'
  else if (t.indexOf('merci') != -1 || t.indexOf('мерси') != -1)
    txtq = '🥐☕'
  else if (t.indexOf('жал') == -1) txtq = 'Спасибо!!!'

  if (t.indexOf('жаль') != -1) txtw = 'Сейчас ужалю!'
  else if (t.indexOf('жалк') != -1) txtw = 'Жалко у пчелки в попке'

  if (txtq != '0' && txtq != msg.text && txtw != '0' && txtw != msg.text)
    bot.sendMessage(msg.chat.id, txtq + ' ' + txtw)
  else if (txtq != '0') bot.sendMessage(msg.chat.id, txtq)
  else if (txtw != '0') bot.sendMessage(msg.chat.id, txtw)
})

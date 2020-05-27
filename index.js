require('dotenv').config({ path: `${__dirname}/.env` })

const TelegramBot = require('node-telegram-bot-api')
const bot = new TelegramBot(process.env.TOKEN, { polling: true })

thxm = /жал|тако|благодар|мерси|сяб|təşəkkür|faleminderit|አመሰግናለሁ|thanks|شكرا لك|շնորհակալություն|dankie|eskerrik|дзякуй|আপনাকে ধন্যবাদ|ကျေးဇူးတင်ပါတယ်|благодаря|hvala|diolch|köszönöm|cảm ơn|mahalo|grazas|ευχαριστώ|მადლობა|આભાર|tak|ngiyabonga|תודה|daalụ|דאַנקען דיר|terima kasih|go raibh maith agat|takk fyrir|gracias|grazie|ṣeun|рахмет|ಧನ್ಯವಾದಗಳು|gràcies|рахмат|謝謝你|谢谢你|고마워|grazie|mèsi|spas|សូមអរគុណ|enkosi|ຂອບໃຈ|gratias|paldies|ačiū|merci|благодарам|misaotra|terima kasih|നന്ദി|grazzi|mihi|धन्यवाद|баярлалаа|Dank|धन्यवाद|dank|takk|ଧନ୍ୟବାଦ|ਧੰਨਵਾਦ|ممنون|dziękuję|obrigada|مننه|murakoze|multumesc|спасибо|faafetai|salamat|хвала|leboha|ස්තූතියි|مهرباني|ďakujem|hvala|mahadsanid|asante|hatur|ташаккур|ขอบคุณ|நன்றி|рәхмәт|ధన్యవాదాలు|teşekkür|sag bol|Rahmat|رەھمەت سىزگە|Дякуємо|شکریہ|Salamat|Kiitos|merci|betanke|godiya|धन्यवाद|tsaug|hvala|zikomo|díky|tack|ndatenda|taing|dankon|tänan|matur|ありがとう|א דאנק/i

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
  let txtq = ''
  let txtw = ''
  
while (result = thxm.exec(t)) {
  if(result[0] != 'жал' && result[0] != 'тако'){  
         if (result[0] == 'спасибо' || result[0] == 'благодар') txtq += 'Спасибо! ';
    else if (result[0] == 'thanks') txtq += 'О! Вы из Англии! ';
    else if (result[0] == 'дякую') txtq += 'Слава Украине! ';
    else if (result[0] == 'danke') txtq += 'Sehr dankbar! ';
    else if (result[0] == 'dank') txtq += '0/ ';
    else if (result[0] == 'grazie') txtq += 'Mamma mia! Pizza mozzarella! ';
    else if (result[0] == 'merci' || result[0] == 'мерси') txtq += '🥐☕ ';
    else txtq += 'Спасибо! '
    }
       if (result[0] == 'тако') txtq += '🌮 ';
       if (result[0] == 'жаль') txtq += 'Сейчас ужалю! '
  else if (result[0] == 'жалк') txtq += 'Жалко у пчелки в попке. ';
  }
  
  bot.sendMessage(msg.chat.id, txtq)
})


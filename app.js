
let textStock = [
  "Для, современного. мира выбранный нами инновационный путь однозначно определяет каждого участника как способного принимать собственные решения касаемо приоритизации разума над эмоциями. Противоположная точка зрения подразумевает, что независимые государства будут представлены в исключительно положительном свете.",
  "С улыбкой, потому что муж - каменная стена. А изнутри еще и с подогревом. Стена окружает ее кольцом. Ей так удобно засыпать у него на плече, вдыхая запах его волос и кожи, чувствуя тепло его большого сильного тела. Она не допускает и мысли о том, что с ним что-нибудь может случиться.",
  "Бросок, оглушительный взрыв, и щита больше не существовало. Обгоревшие тела трех ситов валялись рядом с разбитым генератором поля. Я вложил в кобуру пистолет и, выйдя в другую комнату, вызвал охрану. Взвод бойцов прибыл секунд через двадцать.",
  "Вокруг нас простиралось бесконечное степное море. Трава, мелкие синие цветочки, чахлые кустики. Воздух тихо звенел - какие-то насекомые устроили вечерний концерт. Из-под ног иногда вспархивали птицы. Настоящий рай для энтомологов и орнитологов, желающих изучить степь в ее первозданном виде.",
  "Лориклаксоз, громко топая сапогами, убрался вон, а Гриша кинулся к блюду. Не сказать, чтобы он был силен в иностранных языках, но отдельные слова разобрать мог. Вот если бы они еще были напечатаны... Насладившись звуками знакомой, но малопонятной речи, Гриша принялся барабанить по блюду на все лады.",
  "Ворона хотела сделать еще один заход, но мужчина уже ушел слишком далеко. Оно и понятно, ему было не до ворон. Он торопился к своей возлюбленной. Торопился, потому что знал, она ждет его. И обязательно захочет его поцеловать, едва он переступит порог ее небольшой, но такой уютной квартирки.",
  'Сергей прислушался - из детской комнаты доносились смех и веселая возня. "Маша... Ма-аша! Я же сказала - не трожь. Не трожь, говорю!" - Голос старшенькой, Саши, был требовательно-назидательным. Раздался звучный шлепок и тут же обиженный рев младшенькой Маши.',
  "После долгого и бесплодного ожидания я решил написать тебе сам, и ради тебя, и ради меня: не хочу вспоминать, что за два долгих года, проведенных в заключении, я не получил от тебя ни одной строчки, до меня не доходили ни послания, ни вести о тебе, кроме тех, что причиняли мне боль.",
  "Брат сыграет роль наживки, он выбежит из леса, словно волк на охотника. Колл Омсворд во власти злых чар, он раб темной силы, из ее магической ткани соткан его плащ. Беглец похитил плащ, закутавшись в него, чтобы остаться неузнанным, но именно этого и добивался Риммер Дэлл.",
  "Фотомонтаж из нескольких снимков тоже был выполнен на уровне - скупо, но эффектно, ничего не выпячивается, но все как на ладони. Пять Манхаринов, застывших тесным кольцом, чуть ли не спина к спине, и пять механических монстров вокруг.",
  "Пуго ответил не сразу - Гик, конечно, свой в доску, но язык при нем распускать не стоит. Да и было бы из-за чего - да, постоялец мрачноватый, но человек проверенный, и пакостей от него пока не было. Частенько здесь останавливается, да и друзья его тоже нередко заглядывают.",
  'Лететь им предстояло на древнем спин-звездолете "Олег", ржавом корыте без искусственной гравитации, иллюминаторов и прогулочных палуб. Чтобы удержать пассажиров в гамаках и на фуга-ложах, фантопликаторы подключили прямо к информационной сети.',
  'Привет, Мир!'
];


// ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
const helpLetter = '<span class="help_letter">s</span>'
let runingTyping = false


//PROXY ДЛЯ НАБЛЮДЕНИЯ ЗА СПИСКОМ ЗАЖАТЫХ КЛАВИШЬ
const kayBoardListCode = {}
const proxyCode = new Proxy(kayBoardListCode, {
  set(target, prop, value) {
    if (target[prop] === value) return false
    target[prop] = value
    backLight(value)
    return true
  },
  deleteProperty(target, prop) {
    delete target[prop]
    backLight(prop)
    return true
  }
})


//ОБРАБОТЧИК KEYDOWN
document.addEventListener('keydown', event => {
  event.preventDefault()
  proxyCode[event.code] = event.code
  if (event.code === 'ShiftLeft' && !event.repeat) {
    swapSymbol()
  }
})


//ОБРАБОТЧИК KEYUP 
document.addEventListener('keyup', event => {
  delete proxyCode[event.code]
  if (event.code === 'ShiftLeft') {
    swapSymbol()
  }
  if (event.code === 'Enter') {
    if (!runingTyping) startProgramm()
  }
})


// ОБРАБОТЧИК КЛИКОВ
document.addEventListener('click', (e) => {
  if (e.target.dataset.reset === 'reset' && runingTyping) {
    resetText()
  }
  if (e.target.className === 'close' || !e.target.closest('.result')) {
    showResult('hidden')
  }
})


// СТАРТ ПРОГРАММЫ
const previewText = document.querySelector('.previewText')
const startProgramm = () => {
  previewText.style.display = 'none'
  cursorBlick()
  randomText()
}


// МИГАНИЕ КУРСОРА
let timerIdCursor
const cursor = document.querySelector('.cursor')
const cursorBlick = () => {
  timerIdCursor = setInterval(() => {
    cursor.style.visibility = cursor.style.visibility === 'hidden' ? 'visible' : 'hidden'
  }, 500)
}


// РАНДОМНЫЙ ТЕКСТ
const randomText = () => {
  const quantitiTextsInArray = textStock.length
  const randomText = textStock[Math.floor(Math.random() * quantitiTextsInArray)]
  runTyping(randomText)
}


// ЛОГИКА ПЕЧАТИ
const errorKey = document.querySelectorAll('[data-value-key]')
const currentText = document.querySelector('.currentText')
const textOpacity = document.querySelector('.textOpacity')
const errorCounter = document.querySelector('#errors')
const runTyping = (randomText) => {
  runingTyping = true
  currentText.innerText = randomText
  const currentTextArray = randomText.split('');
  сharacterСount(randomText.length)

  document.body.onkeydown = (event) => {
    for (let letter of currentTextArray) {
      if (!timerCheck) {
        timerStart()
        timerCheck = true
      }
      if (event.key === letter && !event.repeat) {
        currentTextArray.shift()
        textOpacity.insertAdjacentHTML('beforeend', letter + helpLetter)
        currentText.innerText = currentTextArray.join('')
        сharacterСount(randomText.length, currentTextArray.length)
        return
      }
      for (let key of errorKey) {
        if (event.code === key.id && !event.repeat) {
          errorCounter.innerText++
          return
        }
      }
    }
  }
}


// ТАЙМЕР
let timerId
let timeResult
let timerCheck = false
function timerStart() {
  timerId = setInterval(timerPrint, 1000)
}

const seconds = document.querySelector('.seconds')
const minutes = document.querySelector('.minutes')
const times = { ss: 0, mm: 0 }
const timerPrint = () => {
  times.ss++
  if (times.ss < 10) {
    seconds.innerText = '0' + times.ss
  }
  if (times.ss >= 10) {
    seconds.innerText = times.ss
  }
  if (times.ss >= 60) {
    seconds.innerText = '00'
    times.ss = 0
    times.mm++
  }
  if (times.mm < 10) {
    minutes.innerText = '0' + times.mm
  }
  if (times.mm >= 10) {
    minutes.innerText = times.mm
  }
}

function timerStop() {
  clearInterval(timerId)
  timeResult = `${minutes.innerText}:${seconds.innerText}`
  timerCheck = false
  seconds.innerText = '00'
  minutes.innerText = '00'
  times.ss = 0
  times.mm = 0
}


//CЧЕТЧИК СИМВОЛОВ
const controlsCharacters = document.querySelector('.controls_сharacters')
const сharacterСount = (textLength, textLengthСhanged = textLength) => {
  controlsCharacters.innerText = `${textLength - textLengthСhanged} / ${textLengthСhanged}`
  if (textLengthСhanged === 0) completeGame()
}


// КОНЕЦ ПЕЧАТИ
const completeGame = () => {
  timerStop()
  showResult('visible')
  runingTyping = false
  textOpacity.innerText = ''
  errorCounter.innerText = '0'
  controlsCharacters.innerText = ''
  cursor.style.visibility = 'hidden'
  previewText.style.display = 'block'
  clearInterval(timerIdCursor)
}


// СМЕНА ТЕКСТА
function resetText() {
  randomText()
  timerStop()
  errorCounter.innerText = 0
  textOpacity.innerText = ''
}


// ОКНО РЕЗУЛЬТАТОВ
const resultErroes = document.querySelector('.result_errors')
const resultSpeed = document.querySelector('.result_speed')
const result = document.querySelector('.result')
function showResult (visibility) {
  result.style.visibility = visibility
  resultErroes.innerText = errorCounter.innerText
  resultSpeed.innerText = timeResult
}


//МИГАНИЕ ВИРТУАЛЬНЫХ КЛАВИШЬ
const keyList = document.querySelectorAll('.row div')
const backLight = (keyCode) => {
  for (let key of keyList) {
    if (keyCode === key.id) {
      key.classList.toggle('back_light')
    }
  }
}


// ЗАМЕНА СИМВОЛОВ
const keyboardChars = document.querySelectorAll('[data-value]')
const keyboard = document.querySelector('.Keyboard')
function swapSymbol() {
  let dataChar, innerChar;
  for (let key of keyboardChars) {
    dataChar = key.dataset.value
    innerChar = key.innerText

    key.innerText = dataChar
    key.dataset.value = innerChar
  }
  keyboard .classList.toggle('keyAllUpper')
}
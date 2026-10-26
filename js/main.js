'use strict'
/*
 * Projektuppgift - Kaffe Grus
 * Namn: Paul Yashouh
 */

/**
 *  Validera Formulärt Inmatning
 *@return {Boolean}
 */

// Hämta ELEMENT från DOM
const visaVarmMeny = document.querySelector('#meny-varm-sektion')
const visaKallMeny = document.querySelector('#meny-kall-sektion')
const API_URL = 'https://api.sampleapis.com/'
//SÄTT EN BEGRÄNSNING FÖR ANTAL PRODUKTER SOM SKA VISAS
const DATA_LIMIT = 4

// Kör koden först när hela HTML dokumentet har laddats in i webbläsaren
document.addEventListener('DOMContentLoaded', () => {
  // Anropa funktionen för att generera menyn
  skapaNavigeringsMeny()

  // Anropa funktionen för mobilmenyn interaktivitet
  hanteraMobilmeny()
})

// FUNKTION: Generera navigationsmeny
function skapaNavigeringsMeny() {
  // Hämta listelementet från HTML-Koden
  const menyLista = document.querySelector('#meny-lista')

  if (!menyLista) return
  // Array med webbplats sidor
  const sidor = [
    { namn: 'Startsida', lank: 'index.html' },
    { namn: 'Meny', lank: 'meny.html' },
    { namn: 'Kontakt', lank: 'kontakt.html' },
    { namn: 'Om Oss', lank: 'om-oss.html' },
  ]

  // Hämta aktuella filnam för att kunna markera aktiv sida med index.html fallback
  const nuvarandesida =
    window.location.pathname.split('/').pop() || 'index.html'
  // Mappa genom arrayen och bygg meny alternativen
  sidor.forEach((sida) => {
    // Skapa nytt list element <li>
    const listElement = document.createElement('li')
    // Skapa en ny länk <a>
    const lankElement = document.createElement('a')
    lankElement.href = sida.lank
    lankElement.textContent = sida.namn

    // Kontrollera om länken matchar sidan användaren besöker
    if (nuvarandesida === sida.lank) {
      lankElement.classList.add('aktiv')
    }
    // Lägg till länken inuti listelementet och listelementet inuti menyen
    listElement.appendChild(lankElement)
    menyLista.appendChild(listElement)
  })
}

// FUNKTION: Generera navigationsmeny
function hanteraMobilmeny() {
  const menyKnapp = document.querySelector('#meny-knapp')
  const navigering = document.querySelector('#navigering')

  if (!menyKnapp || !navigering) return

  // Lyssna efter klick på hamburgarknappen
  menyKnapp.addEventListener('click', () => {
    // Växla klassen 'öppen' på både knappen och navigeringen
    menyKnapp.classList.toggle('oppen')
    navigering.classList.toggle('oppen')
  })
}

// Hämta Vram dryckor
async function getVarmKaffe() {
  try {
    const response = await fetch(`${API_URL}coffee/hot`)
    if (!response.ok) {
      throw new Error(`HTTP-fel status: ${response.status}`)
    }
    // Konvert json till javascript object
    const data = await response.json()
    // VISA ENDAST FÖRSTA FEM PRODUKTER FRÅN API_URL(data)
    const limitData = data.slice(0, DATA_LIMIT)

    visaData(limitData, visaVarmMeny)
  } catch (error) {
    console.error('error :>> ', error)
    // Visa fel meddlande om data kunde inte hämtas
    if (visaVarmMeny) {
      visaVarmMeny.innerHTML = `
    <h2>Varma Drycker</h2>
    <p class="felmeddelande" style="color:#f20000; padding:20px; text-align:center">Kunde inte ladda menyn just nu. Vänligen försök lite senare</p>
    `
    }
  }
}
// Hämta kalla dryckor
async function getKallKaffe() {
  try {
    const response = await fetch(`${API_URL}coffee/iced`)
    // Konvert json till javascript object
    const data = await response.json()
    if (!response.ok) {
      throw new Error(`HTTP-fe status: ${response.status}`)
    }
    // VISA ENDAST FÖRSTA FEM PRODUKTER FRÅN API_URL(data)
    const limitData = data.slice(0, DATA_LIMIT)

    visaData(limitData, visaKallMeny)
  } catch (error) {
    console.error('error :>> ', error)
    if (visaKallMeny) {
      visaKallMeny.innerHTML = `
      <h2>Kalla Drycker</h2>
      <p class="felmeddelande" style="color:#f20000; padding:20px; text-align:center">Kunde inte ladda menyn just nu. Vänligen försök lite senare</p>
      `
    }
  }
}

function visaData(kaffeArray, targetElement) {
  if (!targetElement) return
  kaffeArray.forEach((coffee) => {
    // Closure guard
    if (coffee.title === 'BRPROBE') return
    // För att undvika långa text sätter vi max karactär
    const maxCharacters = 120
    const description =
      coffee.description.length > maxCharacters
        ? coffee.description.substring(0, maxCharacters) + '...'
        : coffee.description

    // SKAPA SEKTION (section) ELEMENT MED KLASSNAMN
    const innerSektion = document.createElement('section')
    innerSektion.className = 'meny-sektion'
    // SKAPA DIV (div) ELEMENT MED KLASSNAMN
    const innerDiv = document.createElement('div')
    innerDiv.className = 'meny-card'

    /* noerror körs om bildlänken är trasig
    byts till reserbilden*/
    innerDiv.innerHTML = `
  <img src="${coffee.image}" onerror="this.onerror=null; this.src='./assets/images/is-matcha.webp'" alt="${coffee.title}" >
  <h3>${coffee.title}</h3>
 <p>${description}</p>
   `
    innerSektion.appendChild(innerDiv)
    targetElement.appendChild(innerSektion)
  })
}
// Ska Köras endast på menysidan
if (visaKallMeny && visaVarmMeny) {
  getKallKaffe()
  getVarmKaffe()
}

// KONTAKT SEKTION (contact section)
const kontaktSektion = document.querySelector('#kontakt-sektion')

//Skapa formuläretElement Globalt EN gång
if (kontaktSektion) {
  let formSektion = document.createElement('form')
  formSektion.className = 'form'
  const namnLabel = document.createElement('label')
  namnLabel.className = 'label-namn'
  namnLabel.innerText = 'Förnamn'
  namnLabel.htmlFor = 'namn-felt'
  // SKAPA Input Med sina Attributer
  const förNamn = document.createElement('input')
  förNamn.id = 'namn-felt'
  förNamn.placeholder = 'Förnanm'
  förNamn.type = 'text'
  förNamn.className = 'namn-input'

  const mailLabel = document.createElement('label')
  mailLabel.className = 'label-mail'
  mailLabel.innerText = 'E-Post'
  mailLabel.htmlFor = 'mail-felt'

  const mail = document.createElement('input')
  mail.id = 'mail-felt'
  mail.placeholder = 'E-Post'
  mail.type = 'email'
  mail.className = 'mail-input'

  const submitKnapp = document.createElement('button')
  submitKnapp.type = 'submit'
  submitKnapp.className = 'submit-btn'
  submitKnapp.innerText = 'Submit'

  const errorMessage = document.createElement('p')

  errorMessage.innerText = ''
  errorMessage.style.color = 'red'
  // Bygg och lägg förmuläret på sidan
  formSektion.appendChild(namnLabel)
  formSektion.appendChild(förNamn)
  formSektion.appendChild(mailLabel)
  formSektion.appendChild(mail)
  formSektion.appendChild(submitKnapp)
  formSektion.appendChild(errorMessage)
  kontaktSektion.appendChild(formSektion)

  function skapaOchValideraFrom() {
    let errors = []
    // Rensa gamla fel meddelande
    errorMessage.innerText = ''

    if (förNamn.value.trim() === '') {
      errors.push('Du måste ange ditt namn')
    }
    if (mail.value.trim() === '') {
      errors.push('Du måste ange en e-postadress')
    }
    // Visa error meddelande pm fel finns coh avbryt
    if (errors.length > 0) {
      errorMessage.innerText = errors.join(', ')
      return false
    }
    // Om inga fel finns
    console.log('True: ', true)
    formSektion.reset()
    return true
  }

  // HändelseLyssnare anropa skapaOchValideraFrom vid inskickninig
  formSektion.addEventListener('submit', (e) => {
    // Förhindra sidan från att ladda om
    e.preventDefault()
    const isValid = skapaOchValideraFrom()
    if (!isValid) {
      console.log('Is From Valid :>> ', isValid)
      return
    }
  })
}

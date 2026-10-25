// Kör koden först när hela HTML dokumentet har laddats in i webbläsaren
document.addEventListener('DOMContentLoaded', () => {
  // Anropa funktionen för att generera menyn
  skapaNavigeringsMeny()

  // Anropa funktionen för mobilmenyn interaktivitet
  hanteraMobilmeny()
})

// FUNKTION: Generera navigationsmeny
function skapaNavigeringsMeny() {
  // Array med webbplats sidor
  const sidor = [
    { namn: 'Startsida', lank: 'index.html' },
    { namn: 'Meny', lank: 'meny.html' },
    { namn: 'Kontakt', lank: 'kontakt.html' },
    { namn: 'Om Oss', lank: 'om-oss.html' },
  ]

  // Hämta listelementet från HTML-Koden
  const menyLista = document.querySelector('#meny-lista')

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
// Hämta
const visaVarmMeny = document.querySelector('#meny-varm-sektion')
const visaKallMeny = document.querySelector('#meny-kall-sektion')
const API_URL = 'https://api.sampleapis.com/'
//SÄTT EN BEGRÄNSNING FÖR ANTAL PRODUKTER SOM SKA VISAS
const DATA_LIMIT = 4
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
    // Töma kantinen först
    visaVarmMeny.innerHTML = ''

    // Skapa och lägg till dynamisk h2
    const headerVarmDryckor = document.createElement('h2')
    headerVarmDryckor.innerText = 'Vamra Dryker'
    visaVarmMeny.appendChild(headerVarmDryckor)

    visaData(limitData, visaVarmMeny)
  } catch (error) {
    console.error('error :>> ', error)
    // Visa fel meddlande om data kunde inte hämtas
    visaVarmMeny.innerHTML = `
    <h2>Varma Drycker</h2>
    <p class="felmeddelande" style="color:#f20000; padding:20px; text-align:center">Kunde inte ladda menyn just nu. Vänligen försök lite senare</p>
    `
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
    // Töma kantinen först
    visaKallMeny.innerHTML = ''
    // Skapa och lägg till dynamisk h2
    const headerkallaDrykor = document.createElement('h2')
    headerkallaDrykor.innerText = 'Kalla Drykor'
    visaKallMeny.appendChild(headerkallaDrykor)

    visaData(limitData, visaKallMeny)
  } catch (error) {
    console.error('error :>> ', error)
    visaKallMeny.innerHTML = `
     <h2>Kalla Drycker</h2>
    <p class="felmeddelande" style="color:#f20000; padding:20px; text-align:center">Kunde inte ladda menyn just nu. Vänligen försök lite senare</p>
    `
  }
}

function visaData(kaffeArray, targetElement) {
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

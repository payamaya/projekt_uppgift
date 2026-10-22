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
    { namn: 'Om Oss', lank: 'om-oss.html' },
    { namn: 'Kontakt', lank: 'kontakt.html' },
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

export const environment = {
  /* Firebase Config */
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDXdvaY2YWylI9eA4Q66PqtJP4v-AI_uNs",
    authDomain: "tarkir-dragon-s-land.firebaseapp.com",
    projectId: "tarkir-dragon-s-land",
    storageBucket: "tarkir-dragon-s-land.firebasestorage.app",
    messagingSenderId: "938089539079",
    appId: "1:938089539079:web:6fe16792419db0400aaca2",
    measurementId: "G-6MP0MN7XQT"
  },

  /* Endpoints API Scryfall */
  baseUrl: "https://api.scryfall.com",
  endpointSet: "https://api.scryfall.com/sets/tdm",
  endpointAllCards: "https://api.scryfall.com/cards/search?include_extras=true&include_variations=true&order=set&q=e%3Atdm&unique=prints",
  endpointOneCard: "https://api.scryfall.com/cards",

}

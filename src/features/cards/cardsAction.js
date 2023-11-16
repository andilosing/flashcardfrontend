import { addCardApi, translateTextApi, getCardsForDeckApi, updateCardApi } from "./cardsApi";
import { addCardToDeck, fetchCardsForDeck, updateCardInDeck } from "./cardsSlice";


export const addCardAction = (deckId, frontText, backText) => async (dispatch) => {
    try {        
      if(!deckId || frontText === "" || backText === ""){
        throw new Error("Daten fehlen um Karte hinzuzufügen in Action")
      }

      const formattedFrontText = formatTextForHtml(frontText);
      const formattedBackText = formatTextForHtml(backText);

      const card = await addCardApi(deckId, frontText, backText)
      dispatch(addCardToDeck(deckId, card));

    } catch (error) {
      console.error("Fehler hinzufügen einer Karteikarte in Action", error);
      throw Error
    }
  };

  const formatTextForHtml = (text) => {
    return text.replace(/\n/g, '<br>');
};

export const translateTextAction = async (text, sourceLang, targetLang)  => {
  try {
    if(text === "" || sourceLang === " " || targetLang === ""){
      throw new Error("Daten fehlen um Text zu übersetzen")
    }

    const translatedText = await translateTextApi(text, sourceLang, targetLang)
    return translatedText

    
  } catch (error) {
    console.error("Fehler beim Übersetzen", error);
      throw Error
  }
}

export const getCardsForDeckAction = (deckId) => async (dispatch) => {
  try {        
    const cards = await getCardsForDeckApi(deckId)
    dispatch(fetchCardsForDeck({deckId, cards}));
  } catch (error) {
    console.error("Fehler beim Abrufen der Eigenschaften:", error);
    throw Error
  }
};


export const updateCardAction = (deckId, cardId, frontText, backText) => async (dispatch) => {
  try {        
    if(!deckId || !cardId || frontText === "" || backText === ""){
      throw new Error("Daten fehlen um Karte hinzuzufügen in Action")
    }

    const formattedFrontText = formatTextForHtml(frontText);
    const formattedBackText = formatTextForHtml(backText);

    const updatedCard = await updateCardApi(cardId, frontText, backText)
    console.log("ich")
    dispatch(updateCardInDeck({deckId, cardId, updatedCard}));

  } catch (error) {
    console.error("Fehler hinzufügen einer Karteikarte in Action", error);
    throw Error
  }
};

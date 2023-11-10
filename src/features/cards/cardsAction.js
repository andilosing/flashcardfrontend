import { addCardApi } from "./cardsApi";
import { addNewCard} from "./cardsSlice";


export const addCardAction = (deckId, frontText, backText) => async (dispatch) => {
    try {        
      if(!deckId || frontText === "" || backText === ""){
        throw new Error("Daten fehlen um Karte hinzuzufügen in Action")
      }

      const formattedFrontText = formatTextForHtml(frontText);
      const formattedBackText = formatTextForHtml(backText);

      const card = await addCardApi(deckId, frontText, backText)
      dispatch(addNewCard(card));

    } catch (error) {
      console.error("Fehler hinzufügen einer Karteikarte in Action", error);
      throw Error
    }
  };

  const formatTextForHtml = (text) => {
    return text.replace(/\n/g, '<br>');
};
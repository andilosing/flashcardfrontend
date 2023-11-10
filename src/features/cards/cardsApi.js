import { baseFetch } from "../../api/api";

const ENDPOINT = "/cards/";

export const addCardApi = async (deck_id, front_content, back_content) => {
  try {
    const cardData = {
      deck_id,
      front_content,
      back_content,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardData),
    };

    const result = await baseFetch(ENDPOINT, options);

    if (result.data && result.data.card) {
      return result.data.card;
    } else {
      throw new Error("card not added");
    }

  } catch (error) {
    console.error("Fehler beim hinzufügen der Card in Api:", error);
    throw error;
  }
};


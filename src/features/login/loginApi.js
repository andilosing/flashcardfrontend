import { baseFetch } from "../../api/api";

const ENDPOINT = "/auth/";

export const loginUserApi = async (username, password) => {
    try {
        const loginData = {
           username,
           password
          };
      
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
          };


        const result = await baseFetch(`${ENDPOINT}login/`, options);

        if (result.data && result.data.user) {
            if(result.data.token && result.data.expires_at){
                console.log("Glückwunsch! Token mit ablaufdatum erhalten.")
                const tokenInfo = {
                    token: result.data.token,
                    expires_at: result.data.expires_at
                };
        
                localStorage.setItem('tokenInfo', JSON.stringify(tokenInfo));
                window.dispatchEvent(new Event('loginStatusChanged'));
            }
            return result.data.user;
        } else {
            throw new Error("fehler beim Login")
        }

    } catch (error) {
        console.error("Fehler beim Abrufen der Eigenschaften:", error);
        throw error
    }
};
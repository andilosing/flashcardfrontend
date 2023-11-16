const BASE_URL =   "http://localhost:8080"     //     "https://flashcardbackendgopnik.onrender.com"

async function baseFetch(endpoint, options = {}, dispatch, getState) {

  const storedTokenInfo = localStorage.getItem('tokenInfo');
  let token;
  if (storedTokenInfo) {
    const tokenInfo = JSON.parse(storedTokenInfo);

    const now = new Date();
    const expiresAt = new Date(tokenInfo.expires_at);
    if (now >= expiresAt) {
      localStorage.removeItem('hfWetCaEr');
    } else {
      token = tokenInfo.token;
    }
  }

  const config = {
    method: 'GET', 
    ...options,
    headers: {
      'Content-Type': 'application/json', 
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers,
    },
    credentials: "include",
  };
  
  const response = await fetch(`${BASE_URL}${endpoint}`, config);  
  
  if (response.status === 401) {
    console.log("error 401")
    localStorage.removeItem('tokenInfo');
    window.location.reload();
    return
  } else if (response.status === 403) {
    console.log("error 403")
    localStorage.removeItem('tokenInfo');
    window.location.reload();
    return
  } else if (!response.ok) {
    const errorData = await response.json();
    throw {
      message: errorData.error || 'An error occurred',
      status: response.status,
    };
  }

  return await response.json()
  
}

export { baseFetch };


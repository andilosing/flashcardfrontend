const BASE_URL = "http://localhost:8080";

async function baseFetch(endpoint, options = {}, dispatch, getState) {

  const config = {
    method: 'GET', 
    ...options,
    headers: {
      'Content-Type': 'application/json', 
      ...options.headers,
    },
    credentials: "include",
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  

  if (!response.ok) {
    const errorData = await response.json();
    throw {
      message: errorData.error || 'An error occurred',
      status: response.status,
    };
  }
  return await response.json()
  
}

export { baseFetch };


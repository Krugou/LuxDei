const baseUrl = 'https://jakfilms.northeurope.cloudapp.azure.com/backend/';

const doFetch = async (url, options) => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (!response.ok) {
    const message = json.error
      ? `${json.message}: ${json.error}`
      : json.message;
    throw new Error(message || response.statusText);
  }
  return json;
};

const useUser = () => {
  const postUser = async (inputs) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    console.log('meni läpi');
    return await doFetch(baseUrl + 'users', options);
  };

  const getCheckUser = async (username) => {
    const response = await doFetch(baseUrl + 'users/username/' + username);
    return response;
  };

  return {
    postUser,
    getCheckUser,
  };
};
export { useUser };

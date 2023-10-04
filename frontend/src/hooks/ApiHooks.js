const baseUrl = 'https://jakfilms.northeurope.cloudapp.azure.com/backend/';

const doFetch = async (url, options) => {
  const response = await fetch(url, options);
  const json = await response.json();
  console.log(json, 'dofetch json');
  console.log(response, 'dofetch response');
  if (!response.ok) {
    const message = json.error ? `${json.error}` : json.message;
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
    console.debug('ApiHooks.js - handleInputChange: Inputs:', inputs);
    return await doFetch(baseUrl + 'users', options);
  };

  const postLogin = async (inputs) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    return await doFetch(baseUrl + 'auth/login', options);
  };

  const getUserInfoByToken = async (token) => {
    console.log(token);
    const options = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    console.log(await doFetch(baseUrl + 'secure/', options));
    return await doFetch(baseUrl + 'secure/', options);
  };

  return {
    postUser,
    postLogin,
    getUserInfoByToken,
  };
};
export { useUser };

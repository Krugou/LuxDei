const baseUrl = 'https://jakfilms.northeurope.cloudapp.azure.com/backend/';

const doFetch = async (url, options) => {
  console.log('jpejep');
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
    console.log('meni läpi');
    console.log(inputs);
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

  return {
    postUser,
    postLogin,
  };
};
export { useUser };

const httpError = (message, status) => {
  console.log('error used');
  const err = new Error(message);
  err.status = status;
  return err;
};

export default httpError;

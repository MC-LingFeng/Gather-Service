
const access = (req: any) => {
  const accessToken = req.headers.token;
  const nameToken = req.headers.tokenname;

  if (accessToken === 'undefined' || nameToken === 'undefined' || accessToken === 'null' || nameToken === 'null') {
    return false;
  } else {
    return true;
  }
};

export default access;


const userAccess = (name, router, value) => {
  router.use(name, (req, res, next) => {
    const accessToken = req.headers.token;
    const nameToken = req.headers.tokenname;

    if (accessToken === 'undefined' || nameToken === 'undefined' || accessToken === 'null' || nameToken === 'null') {
      res.json({ code: 0, message: '没有权限，请登录', data: value });
    } else {
      next();
    }
  });
};

export default userAccess;

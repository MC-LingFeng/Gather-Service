import express from 'express';

const router = express.Router();

router.post('/loginout', (req, res) => {
  const username = req.body.username;
  if (req.session) {
    res.header('Access-Token', undefined);
    req?.session[`${username}`] = undefined;
  }
  res.json({ code: 200, message: '退出登录', data: null });
});

export default router;

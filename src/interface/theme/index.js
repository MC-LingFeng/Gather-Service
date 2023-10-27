
import express from 'express'
import app from "../../../app.js";

const router = express.Router();

router.route('/theme')
      .get(function (req, res) {
        res.json({ theme: 'white'})
      });

export default router
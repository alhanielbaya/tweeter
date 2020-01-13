require('dotenv').config();

const express = require('express');
const router = express.Router();

const auth = require('../middlewares/session-auth');

const tweetModel = require('../Models/Tweet');

router.get('/latest', (req, res) => {
  const limit = req.query.limit;
  const offset = req.query.offset;
  tweetModel
    .queryLatestTweets(limit, offset)
    .then(tweets => {
      res.json({ tweets: tweets });
    })
    .catch(err => {
      res.json({ error: err });
    });
});
router.get('/followed', auth, (req, res) => {
  const limit = req.query.limit;
  const offset = req.query.offset;
  const uid = req.session.user.uid;

  tweetModel
    .queryFollowedTweets(limit, offset, uid)
    .then(tweets => {
      res.json({ tweets: tweets });
    })
    .catch(err => {
      res.sendStatus(500);
      res.json({ error: err });
    });
});

router.post('/post', auth, (req, res) => {
  const profile = { uid: req.session.user.uid, ...req.body.profile };
  const post = req.body.post;

  tweetModel.addTweet(profile, post).catch(err => {
    res.json({ error: err });
  });
  res.sendStatus(200);
});

module.exports = router;

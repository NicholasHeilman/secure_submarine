const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        queryText=(`SELECT "username" FROM "person";`)            
        pool.query(queryText).then(results => res.send(results.rows))
        .catch(error => {
            console.log('Get Error userList:', error);
            res.sendStatus(500);
            res.send(req.user);
        });
    } else {
      // They are not authenticated.
      res.sendStatus(403); // 403 user should not be there
    }
  });

module.exports = router;
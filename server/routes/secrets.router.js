const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// router.get('/', (req, res) => {
//     console.log('req.user:', req.user);
//     pool.query('SELECT * FROM "secret";')
//         .then(results => res.send(results.rows))
//         .catch(error => {
//             console.log('Error making SELECT for secrets:', error);
//             res.sendStatus(500);
//         });
// });

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
         // They were authenticated! User may do the next thing
          // Note! They may not be Authorized to do all things
        queryText=(`SELECT * FROM "secret"
                     where secrecy_level < $1;`)
        pool.query(queryText,[req.user.clearance_level] ).then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for secrets:', error);
            res.sendStatus(500);
            res.send(req.user);
        });
    } else {
      // They are not authenticated.
      res.sendStatus(403); // 403 user should not be there
    }
  });

module.exports = router;
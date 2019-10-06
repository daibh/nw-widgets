var express = require('express');
var router = express.Router();
const fs = require('fs');
var Rx = require('rxjs');
var RxOp = require('rxjs/operators');

/* GET persons listing. */
router.get('/', function (req, res, next) {
  fs.open('public/data/person.json', fs.constants.R_OK, (err, fd) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.error('data/person.json does not exist');
      }

      console.log(JSON.stringify(err));
      res.json(null)
    } else {
      const query = req.query;
      const page = query ? (query.page || 1) : 1;
      const q = query ? query.q || '' : '';
      let totalRecords = 0;
      let startIndex = 0;
      let size = 5;
      fs.readFile('public/data/person.json', { encoding: 'utf-8' }, (err, data) => {
        if (err !== null) {
          console.log(JSON.stringify(err));
          res.json(null)
        } else {
          totalRecords = data ? data.length : 0;
          size = query ? (query.size || size) : size;
          startIndex = (page - 1) * size;
          Rx.of(JSON.parse(data)).pipe(
            // filter search
            RxOp.map(data => data.filter(item => {
              let isSelected = !(q != undefined && q != null);
              if (isSelected) {
                return isSelected;
              }
              return item.name.toLowerCase().includes(q.trim().toLowerCase());
            })),
            RxOp.tap((data) => {
              totalRecords = data ? data.length : 0;
            }),
            // filter paging
            RxOp.map(data => data.filter((item, index) => {
              return index >= startIndex && index < startIndex + size;
            })),
          ).subscribe(items => {
            res.json({
              totalRecords,
              startIndex,
              items,
              q
            });
          });
        }
      });
    }
  });
});

module.exports = router;

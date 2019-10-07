var express = require('express');
var router = express.Router();
const fs = require('fs');
var Rx = require('rxjs');
var RxOp = require('rxjs/operators');
const pathResource = 'public/data/person.json';
const resourceNotFound = 'resource is not existed. please contact administrator.';
/**
 * GET persons listing.
 */
router.get('/', function (req, res, next) {
  console.log('[GET] api/persons');
  fs.open(pathResource, fs.constants.R_OK, (err, fd) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.error(resourceNotFound);
      }
      console.error(JSON.stringify(err));
      res.json(null)
    } else {
      const query = req.query;
      const page = query ? (query.page || 1) : 1;
      const q = query ? query.q || '' : '';
      let totalRecords = 0;
      let startIndex = 0;
      let size = 5;
      fs.readFile(pathResource, { encoding: 'utf-8' }, (err, data) => {
        if (err !== null) {
          console.error(JSON.stringify(err));
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

/**
 * POST new person listing
 */
router.post('/', function (req, res, next) {
  console.log('[POST] api/persons');
  fs.open(pathResource, fs.constants.R_OK | fs.constants.W_OK, (err, fd) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.error(resourceNotFound);
      }
      console.error(JSON.stringify(err));
      res.json(null)
    } else {
      fs.readFile(pathResource, { encoding: 'utf-8' }, (err, data) => {
        if (err !== null) {
          console.error(JSON.stringify(err));
          return null;
        }
        const persons = JSON.parse(data) || [];
        const reqBody = req.body;
        if (!reqBody.id || reqBody.id === '') {
          const newPerson = {
            id: persons.reduce((x, y) => x > parseInt(y.id) ? x : parseInt(y.id), 0) + 1,
            name: reqBody.name,
            email: reqBody.email,
            address: reqBody.address,
          }
          persons.push(newPerson);
        }
        fs.writeFile(pathResource, JSON.stringify(persons), (err) => {
          if (err !== null) {
            console.error(JSON.stringify(err));
            res.json(null)
          } else {
            res.json(persons);
          }
        });
      });
    }
  });
});

/**
 * PUT existed person listing
 */
router.put('/', function (req, res, next) {
  console.log('[PUT] api/persons');
  fs.open(pathResource, fs.constants.R_OK | fs.constants.W_OK, (err, fd) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.error(resourceNotFound);
      }
      console.error(JSON.stringify(err));
      res.json(null)
    } else {
      fs.readFile(pathResource, { encoding: 'utf-8' }, (err, data) => {
        if (err !== null) {
          console.error(JSON.stringify(err));
          return null;
        }
        const persons = JSON.parse(data) || [];
        const reqBody = req.body;
        let editPerson = null;
        if (reqBody.id && (editPerson = persons.find(p => p.id === reqBody.id)) != null) {
          editPerson.name = reqBody.name;
          editPerson.email = reqBody.email;
          editPerson.address = reqBody.address;
        }
        fs.writeFile(pathResource, JSON.stringify(persons), (err) => {
          if (err !== null) {
            console.error(JSON.stringify(err));
            res.json(null)
          } else {
            res.json(persons);
          }
        });
      });
    }
  });
});

/**
 * DELETE existed person listing
 */
router.delete('/:id', function (req, res, next) {
  console.log('[DELETE] api/persons', req.params['id']);
  fs.open(pathResource, fs.constants.R_OK | fs.constants.W_OK, (err, fd) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.error(resourceNotFound);
      }
      console.error(JSON.stringify(err));
      res.json(null)
    } else {
      fs.readFile(pathResource, { encoding: 'utf-8' }, (err, data) => {
        if (err !== null) {
          console.log(JSON.stringify(err));
          return null;
        }
        const persons = JSON.parse(data) || [];
        const deleteId = req.params['id'];
        let index = null;
        if (deleteId && (index = persons.findIndex(p => p.id == deleteId)) !== -1) {
          persons.splice(index, 1);
        }
        fs.writeFile(pathResource, JSON.stringify(persons), (err) => {
          if (err !== null) {
            console.error(JSON.stringify(err));
            res.json(null)
          } else {
            res.json(persons);
          }
        });
      });
    }
  });
});

module.exports = router;

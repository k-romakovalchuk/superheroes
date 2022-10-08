const heroController = require('../controllers/superhero.js');
const express = require('express');


const router = express.Router();

router.get('/', heroController.getAll)
  .get('/:heroId', heroController.getById)
  .post('/', heroController.create)
  .delete('/:heroId', heroController.remove)
  .put('/:heroId', heroController.update);

module.exports.router = router;

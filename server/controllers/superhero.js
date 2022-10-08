const heroService = require('../services/superhero.js');
const ApiError = require('../error/ApiError.js');

class HeroController {
  async getAll(req, res, next) {
    try {
      const {limit, page} = req.query;
      const heroes = await heroService.getAll(limit,page);
  
      res.statusCode = 201;
      res.send(heroes);
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
  
  async getById(req, res, next) {
    try {
      const { heroId } = req.params;
      const hero = await heroService.getById(heroId);
      if (!hero) {
        return next(ApiError.badRequest('Не заданий ID'));
      }
    
      res.statusCode = 201;
      res.send(hero);
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
  
  async create(req, res, next) {
    try {
      const {nickname,realName,originDescription,superpowers,catchPhrase} = req.body;
      const {images} = req.files;
      const newHero = await heroService.create({nickname,realName,originDescription,superpowers,catchPhrase, images});
    
      res.statusCode = 201;
      res.send(newHero);
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
  
  async remove (req, res, next) {
    try {
      const { heroId } = req.params;
      const foundHero = await heroService.getById(heroId);
    
      if (!foundHero) {
        return next(ApiError.badRequest('Не заданий ID'));
      }
      await heroService.remove(heroId);
      res.sendStatus(204);
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
  
  async update (req, res, next) {
    try {
      const { heroId } = req.params;
      const foundHero = await heroService.getById(heroId);

      if (!foundHero) {
        return next(ApiError.badRequest('Не заданий ID'));
      }
    
      const {nickname,realName,originDescription,superpowers,catchPhrase, deleteImage} = req.body;
      let img = null;
      if (req.files) {
        const {images} = req.files;
        img = images;
      }
      await heroService.update({id: heroId,nickname,realName,originDescription,superpowers,catchPhrase, images: img,deleteImage});
      res.send(foundHero);
    } catch (error) {
      next(ApiError.badRequest(error.message))
    }
  }
}

module.exports = new HeroController()
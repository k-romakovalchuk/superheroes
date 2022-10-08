'use strict'
const {Superhero} = require('../models/superhero.js')
const path = require('path');

class HeroService {
  async getAll(limit = 5, page = 1) {
    const offset = page * limit - limit;
    const result = await Superhero.findAndCountAll({
      limit, offset, order: [['created_at', 'DESC']]
    });
    return result;
  }
  
  async getById(heroId) {
    return await Superhero.findByPk(heroId);
  }
  
  async create({nickname,realName,originDescription,superpowers,catchPhrase,images}) {
    try {
      const names = [];
      if (Array.isArray(images)) {
        images.forEach(item => {
          names.push(item.name);
          item.mv(path.resolve(__dirname, '..', 'static', item.name))
          console.log(item.name);
        })
      } else {
        images.mv(path.resolve(__dirname, '..', 'static', images.name))
        names.push(images.name)
      }
      return await Superhero.create({nickname,realName,originDescription,superpowers,catchPhrase, images: names});
    } catch (error) {
      console.log(error.message);
    }
  }
  
  async remove(heroId) {
    return await Superhero.destroy({
      where: {id: heroId},
    })
  }
  
  async update({id,nickname,realName,originDescription,superpowers,catchPhrase,images: img,deleteImage}) {

    const {images} = await this.getById(id);
    let names = [...images];
    
    if (img) {
      console.log(img);
      if (Array.isArray(img)) {
        img.forEach(item => {
          names.push(item.name);
          item.mv(path.resolve(__dirname, '..', 'static', item.name))
        })
      } else {
        img.mv(path.resolve(__dirname, '..', 'static', img.name))
        names.push(img.name)
      }
    }

    names = names.filter(item => item !== deleteImage)
    return await Superhero.update({nickname,realName,originDescription,superpowers,catchPhrase,images: names}, {
      where: { id },
    });
  }
}

module.exports = new HeroService()
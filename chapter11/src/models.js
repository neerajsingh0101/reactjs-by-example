import Backbone from 'backbone';
import Faker from 'faker';
import _ from 'underscore';

const PictureModel = Backbone.Model.extend({
  defaults: {
    src: 'http://lorempixel.com/601/600/cats/',
    name: 'Pusheen',
    details: 'Pusheen is a Cat',
    faved: false
  }
});

class CatGenerator {
  constructor() {
    this.Cats = new Backbone.Collection;
    [600, 601, 602, 603, 604, 605].map( (height)=>{
      this.createCat(height, 600);
    })
  }

  createCat(height = _.random(600, 650), width = 600) {
    console.log('Adding new cat');
    this.Cats.add(new PictureModel({
      src: `http://lorempixel.com/${height}/${width}/cats/`,
      name: Faker.Name.findName(),
      details: Faker.Lorem.paragraph()
    }));
  }

  randRange() {
    return _.random(5000, 10000);
  }

}

module.exports = {PictureModel, CatGenerator};

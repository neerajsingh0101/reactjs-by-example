import Backbone from 'backbone';
import Faker from 'faker';

const PictureModel = Backbone.Model.extend({
  defaults: {
    src: 'http://lorempixel.com/601/600/cats/',
    name: 'Pusheen',
    details: 'Pusheen is a Cat'
  }
});

class CatGenerator {
  constructor() {
    this.timeArray = new Array(2000, 3000, 1500, 2500, 1000, 4000, 5000, 3500);
    this.Cats = new Backbone.Collection;
    [600, 601, 602, 603, 604, 605].map( (height)=>{
      this.createCat(height, 600);
    })
  }

  createCat(height = 601, width = 600) {
    console.log('Adding new cat');
    this.Cats.add(new PictureModel({
      src: `http://lorempixel.com/${height}/${width}/cats/`,
      name: Faker.Name.findName(),
      details: Faker.Lorem.paragraph()
    }));
  }

  randRange() {
    return this.timeArray[Math.floor(this.timeArray.length * Math.random())];
  }

}

module.exports = {PictureModel, CatGenerator};

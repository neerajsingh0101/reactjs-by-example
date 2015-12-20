import Backbone from 'backbone';
import Faker from 'faker';

const PictureModel = Backbone.Model.extend({
  defaults: {
    src: 'http://lorempixel.com/601/600/cats/',
    name: 'Pusheen',
    details: 'Pusheen is a Cat'
  }
});

const Cats = new Backbone.Collection;
Cats.add(new PictureModel({src: "http://lorempixel.com/601/600/cats/", name: Faker.Name.findName(), details: Faker.Lorem.paragraph()}));
Cats.add(new PictureModel({src: "http://lorempixel.com/602/600/cats/", name: Faker.Name.findName(), details: Faker.Lorem.paragraph()}));
Cats.add(new PictureModel({src: "http://lorempixel.com/603/600/cats/", name: Faker.Name.findName(), details: Faker.Lorem.paragraph()}));
Cats.add(new PictureModel({src: "http://lorempixel.com/604/600/cats/", name: Faker.Name.findName(), details: Faker.Lorem.paragraph()}));
Cats.add(new PictureModel({src: "http://lorempixel.com/605/600/cats/", name: Faker.Name.findName(), details: Faker.Lorem.paragraph()}));
Cats.add(new PictureModel({src: "http://lorempixel.com/606/600/cats/", name: Faker.Name.findName(), details: Faker.Lorem.paragraph()}));

console.log(Cats.first().get('name'));
console.log(Cats.first().get('details'));

module.exports = {Cats, PictureModel};



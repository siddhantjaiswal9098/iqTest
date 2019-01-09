const Realm = require('realm');

// Define your models and their properties
const CarSchema = {
  name: 'Car',
  properties: {
    make: 'string',
    model: 'string',
    miles: { type: 'int', default: 0 },
  }
};
const PersonSchema = {
  name: 'Person',
  properties: {
    name: 'string',
    birthday: 'string',
    // cars: 'Car[]',
    // picture: 'data?' // optional property
  }
};

export default class FinRealmService {
  constructor(props) {
    this.props = props;
  }

  jaduWalarealm() {
    Realm.open({ schema: [CarSchema, PersonSchema] })
      .then((realm) => {
      // Create Realm objects and write to local storage
        realm.write(() => {
          const myCar = realm.create('Car', {
            make: 'Honda',
            model: 'Civic',
            miles: 1000,
          });
          myCar.miles += 20; // Update a property value
        });
        realm.write(() => {
          const person = realm.create('Person', {
            name: 'Siddhant',
            birthday: '16/05/1996',
            // cars: ['verna', 'audi', 'bmw'],
            
          });
          console.log('Realm person', person); // Update a property value
        });
        // // Query Realm for all cars with a high mileage
        // const cars = realm.objects('Car').filtered('miles > 1000');
        // // Will return a Results object with our 1 car
        // cars.length; // => 1

        // Add another car
        realm.write(() => {
          const myCar = realm.create('Car', {
            make: 'Ford',
            model: 'Focus',
            miles: 2000,
          });
          console.log('Realm values car1', myCar);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

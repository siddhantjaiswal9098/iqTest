const Realm = require('realm');

// Define your models and their properties
const Result = {
  name: 'Result',
  properties: {
    percentage: 'float',
    TestId: 'float',
    date: 'date'
  }
};

export default class FinRealmService {
  constructor(props) {
    this.props = props;
  }

  Createrealm(data) {
    console.log('Reaml obj data', data);
    Realm.open({ schema: [Result] })
      .then((realm) => {
      // Create Realm objects and write to local storage
        realm.write(() => {
          const myResult = realm.create('Result', {
            percentage: data.percentage,
            TestId: data.TestId,
            date: data.date
          });
          console.log('Reaml obj', myResult);
        });
        console.log('create db:', Realm.defaultPath);
        // cars.length; // => 1
      })
      .catch((error) => {
        console.log(error);
      });
  }

  realmGetAllData(id) {
    return Realm.open({ schema: [Result] })
      .then((realm) => {
        return realm.objects('Result').filtered(`TestId == ${id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteAll() {
    Realm.open({ schema: [Result] })
      .then((realm) => {
        const ResultObj = realm.objects('Result');
        realm.write(() => realm.delete(ResultObj));
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

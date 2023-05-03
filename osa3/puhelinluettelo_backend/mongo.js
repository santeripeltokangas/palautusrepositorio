const osoite = 'mongodb+srv://santeripe:<salasana>@cluster0.tsg0prv.mongodb.net/puhelinluettelo?retryWrites=true&w=majority';

const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Kirjoita näin: node mongo.js <salasana>');
  process.exit(1);
}

const Henkilo = mongoose.model(
  'Henkilo',
  new mongoose.Schema({
    nimi: String,
    numero: String,
  })
);

mongoose.set('strictQuery', true);

mongoose.connect(osoite).then(() => {
  switch (process.argv.length){
  case 3:
    Henkilo.find().then((tiedot) => {
      console.log('Puhelinluettelo:');
      tiedot.forEach((henkilo) => console.log(henkilo.nimi, henkilo.numero));
      mongoose.connection.close();
    });
    break;
  case 5:{
    const nimi = process.argv[3],
      numero = process.argv[4];

    const henkilo = new Henkilo({ name: nimi, number: numero });

    henkilo.save().then(() => {
      console.log(`lisätty ${nimi} numerolla ${numero} puhelinluetteloon!`);
      mongoose.connection.close(); });
    break;
  }
  default: mongoose.connection.close(); }
});
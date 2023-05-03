require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const portti = process.env.PORT || 3001;
const app = express();

const Henkilo = require('./mallit/henkilo');

morgan.token('body', (pyynto) =>
  pyynto.method === 'POST' ? JSON.stringify(pyynto.body) : null
);

const virheenKasittelija = (virhe, _pyynto, vastaus, seuraava) => {
  if (virhe.name === 'CastError')
    return vastaus.status(400).send({ error: 'väärän muotoinen ID' });
  else if (virhe.name === 'ValidationError')
    return vastaus.status(400).json({ error: virhe.message });

  console.error(virhe.message);

  seuraava(virhe);
};

app.use(express.json());

app.use(express.static('build'));

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

app.use(express.static('public'));

app.get('/info', (_pyynto, vastaus, seuraava) =>
  Henkilo.countDocuments()
    .then((maara) =>
      vastaus.send(
        `Puhelinluettelossa on ${maara} henkilön tiedot.<br>${new Date()}`
      )
    )
    .catch((virhe) => seuraava(virhe))
);

app.post('/api/persons', async (pyynto, vastaus, seuraava) => {
  const { name, number } = pyynto.body;

  if (await Henkilo.exists({ name: name }))
    return vastaus.status(400).json({ error: 'Nimen pitää olla alkuperäinen!' });

  new Henkilo({ name, number })
    .save()
    .then((data) => vastaus.json(data))
    .catch((error) => seuraava(error));
});

app.get('/api/persons', (_pyynto, vastaus) =>
  Henkilo.find().then((tiedot) => vastaus.json(tiedot))
);

app.get('/api/persons/:id', (pyynto, vastaus, seuraava) =>
  Henkilo.findById(pyynto.params.id)
    .then((henkilo) =>
      henkilo ? vastaus.json(henkilo) : vastaus.status(404).end()
    )
    .catch((error) => seuraava(error))
);

app.put('/api/persons/:id', (pyynto, vastaus, seuraava) => {
  const { name, number } = pyynto.body;

  Henkilo.findByIdAndUpdate(
    pyynto.params.id,
    { name, number },
    { new: true, runValidators: true }
  )
    .then((person) => vastaus.json(person))
    .catch((error) => seuraava(error));
});

app.delete('/api/persons/:id', (pyynto, vastaus, seuraava) => {
  Henkilo.findByIdAndRemove(pyynto.params.id)
    .then(() => vastaus.status(204).end())
    .catch((error) => seuraava(error));
});

app.use(virheenKasittelija);

app.listen(portti, () => console.log(`Serveri kuuntelee portissa ${portti}.`));
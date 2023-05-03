const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Yhdistetty MongoDB:hen.'))
  .catch((error) => console.log('Virhe yhdistäessä MongoDB:hen:', error.message));

const malli = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      required: true,
    },
    number: {
      type: String,
      validate: {
        validator: (v) => /^\d{2}-\d{6,}|\d{3}-\d{5,}|(?<!-)\d{8,}$/.test(v),
        message: (arvot) => `\`${arvot.value}\` ei ole oikeanmuotoinen puhelinnumero.`,
      },
      minlength: 8,
      required: true,
    },
  },
  {
    toJSON: {
      transform: (_doc, tulos) => {
        tulos.id = tulos._id.toString();
        delete tulos._id;
        delete tulos.__v;
      },
    },
  }
);

module.exports = mongoose.model('Henkilö', malli);
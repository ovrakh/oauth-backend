const mongoose = require('mongoose');
const fs = require('fs');
const config =require('jconf');

fs.readdirSync(__dirname).forEach(fileName => {
    if (fileName === 'index.js') {
        return;
    }

    require(`${__dirname}/${fileName}`);
});

module.exports = new Promise((resolve, reject) => {
    mongoose.connect(config.mongodbPath, { useNewUrlParser: true });
    mongoose.connection
        .once('open', resolve)
        .on('error', reject);
});
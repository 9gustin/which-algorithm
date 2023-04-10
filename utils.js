const fs = require('fs');

const DATASET = `./dataset.txt`;
const CLEAR_DATASET = `./clear_dataset.txt`;

const getFile = name => fs.readFileSync(name, 'utf8');

const format = file => {
  const rows = file.split("\n");
  return rows.map(card => card.split(',').map(str => str.toLowerCase().trim())) 
}

module.exports = {
  getFile: () => getFile(DATASET),
  getClearFile: () => getFile(CLEAR_DATASET),
  getData: () => {
    const file = getFile(DATASET);
    return format(file);
  },
  getClearData: () => {
    const file = getFile(CLEAR_DATASET);
    return format(file);
  }
}

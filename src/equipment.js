const fs = require('fs');

const { setOriginAndSet } = require('./utils');

function addEquipment(category, body) {
    const filePath = `data/${category}.json`;
    setOriginAndSet(body);
    let data = {};
    let area = body['origin'];
    let id = body['id'];
    delete body['origin'];
    delete body['id'];

    const fileExists = fs.existsSync(filePath);
    if (fileExists) {
        let rawData = fs.readFileSync(filePath);
        data = JSON.parse(rawData);
    }
    if (!data[area])
        data[area] = {};
    data[area][id] = body;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), { encoding: 'utf8', flag: 'w' }, function (err) {
        if (err) throw err;
    });

    return data;
}

function getEquipment(category, id) {
    const filePath = `data/${category}.json`;

    let data = {};

    const fileExists = fs.existsSync(filePath);
    if (!fileExists) {
        return data;
    }

    let armourRawData = fs.readFileSync(filePath);
    let armourData = JSON.parse(armourRawData);

    if (!id || !armourData[id]) {
        throw new Error(`${id} found`);
    }
    return armourData[id];
}

function removeEquipment(category, id) {
    const filePath = `data/${category}.json`;

    let data = {};

    const fileExists = fs.existsSync(filePath);
    if (!fileExists) {
        return data;
    }

    let armourRawData = fs.readFileSync(filePath);
    let armourData = JSON.parse(armourRawData);

    if (armourData[id] !== undefined)
        delete armourData[id];

    fs.writeFileSync(filePath, JSON.stringify(armourData, null, 4), { encoding: 'utf8', flag: 'w' }, function (err) {
        if (err) throw err;
        console.log("It's saved!");
    });

    return data;
}

function getEveryGear() {
    let data = [];
    let dataFolder = 'data';
    let dateFiles = [ 'armours.json', 'weapons.json' ];
    for (let file of dateFiles) {
        let rawData = fs.readFileSync(`${dataFolder}/${file}`);
        let fileData = JSON.parse(rawData);
        for (let id in fileData) {
            data.push(fileData[id]);
        }
    }
    return data;
}

module.exports = { addEquipment, getEquipment, removeEquipment, getEveryGear };
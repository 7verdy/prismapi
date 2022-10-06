const fs = require('fs');

const armourPath = `equipment/armours.json`;

function addEquipment(id, body) {

    let data = {};
    let equipmentId = id;

    const fileExists = fs.existsSync(armourPath);
    if (!fileExists) {

        data[equipmentId] = body;

        fs.writeFile(armourPath, JSON.stringify(data, null, 4), { encoding: 'utf8', flag: 'wx' }, function (err) {
            if (err) throw err;
            console.log("It's saved!");
        });
    }
    else {

        let armourRawData = fs.readFileSync(armourPath);
        let armourData = JSON.parse(armourRawData);

        armourData[equipmentId] = body;

        data = armourData[equipmentId];

        fs.writeFile(armourPath, JSON.stringify(armourData, null, 4), { encoding: 'utf8', flag: 'w' }, function (err) {
            if (err) throw err;
            console.log("It's saved!");
        });
    }

    return data;
}

function getEquipment(id, level) {
    const armourPath = `equipment/armours.json`;

    let data = {};

    const fileExists = fs.existsSync(armourPath);
    if (!fileExists) {
        return data;
    }

    let armourRawData = fs.readFileSync(armourPath);
    let armourData = JSON.parse(armourRawData);

    if (id !== undefined) {
        if (armourData[id] !== undefined)
            data = armourData[id];
    }
    else {
        data = armourData;
    }

    return data;
}

function removeEquipment(id) {
    const armourPath = `equipment/armours.json`;

    let data = {};

    const fileExists = fs.existsSync(armourPath);
    if (!fileExists) {
        return data;
    }

    let armourRawData = fs.readFileSync(armourPath);
    let armourData = JSON.parse(armourRawData);

    if (armourData[id] !== undefined)
        delete armourData[id];

    fs.writeFile(armourPath, JSON.stringify(armourData, null, 4), { encoding: 'utf8', flag: 'w' }, function (err) {
        if (err) throw err;
        console.log("It's saved!");
    });

    return data;
}

module.exports = { addEquipment, getEquipment, removeEquipment };
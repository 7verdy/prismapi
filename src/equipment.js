const fs = require('fs');

function addEquipment(category, id, body) {
    const filePath = `equipment/${category}.json`;

    let data = {};
    let equipmentId = id;

    const fileExists = fs.existsSync(filePath);
    if (!fileExists) {

        data[equipmentId] = body;

        fs.writeFileSync(filePath, JSON.stringify(data, null, 4), { encoding: 'utf8', flag: 'wx' }, function (err) {
            if (err) throw err;
            console.log("It's saved!");
        });
    }
    else {

        let equipmentRawData = fs.readFileSync(filePath);
        let equipmentData = JSON.parse(equipmentRawData);

        equipmentData[equipmentId] = body;

        data = equipmentData[equipmentId];

        fs.writeFileSync(filePath, JSON.stringify(equipmentData, null, 4), { encoding: 'utf8', flag: 'w' }, function (err) {
            if (err) throw err;
            console.log("It's saved!");
        });
    }

    return data;
}

function getEquipment(category, id) {
    const filePath = `equipment/${category}.json`;

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
    const filePath = `equipment/${category}.json`;

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

module.exports = { addEquipment, getEquipment, removeEquipment };
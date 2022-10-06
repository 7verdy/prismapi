const fs = require('fs');

const armourPath = `equipment/armours.json`;

function addEquipment(body) {

    let data = {};

    const fileExists = fs.existsSync(armourPath);
    if (!fileExists) {

        let equipmentId = body.id;
        data[equipmentId] = body;

        fs.writeFile(armourPath, JSON.stringify(data, null, 4), { encoding: 'utf8', flag: 'wx' }, function (err) {
            if (err) throw err;
            console.log("It's saved!");
        });
    }
    else {

        let armourRawData = fs.readFileSync(armourPath);
        let armourData = JSON.parse(armourRawData);

        let equipmentId = body.id;
        console.log(Array.isArray(armourData));

        armourData[equipmentId] = body;

        data = armourData[equipmentId];

        fs.writeFile(armourPath, JSON.stringify(armourData, null, 4), { encoding: 'utf8', flag: 'w' }, function (err) {
            if (err) throw err;
            console.log("It's saved!");
        });
    }

    return data;
}

function getEquipment(body) {
    const armourPath = `equipment/armours.json`;

    let data = {};

    const fileExists = fs.existsSync(armourPath);
    if (!fileExists) {
        return data;
    }

    let armourRawData = fs.readFileSync(armourPath);
    let armourData = JSON.parse(armourRawData);

    if (body.id !== undefined) {
        if (armourData[body.id] !== undefined)
            data = armourData[body.id];
    }
    else {
        data = armourData;
    }

    return data;
}

function removeEquipment(body) {
    const armourPath = `equipment/armours.json`;

    let data = {};

    const fileExists = fs.existsSync(armourPath);
    if (!fileExists) {
        return data;
    }

    let armourRawData = fs.readFileSync(armourPath);
    let armourData = JSON.parse(armourRawData);

    if (armourData[body.id] !== undefined)
        delete armourData[body.id];

    fs.writeFile(armourPath, JSON.stringify(armourData, null, 4), { encoding: 'utf8', flag: 'w' }, function (err) {
        if (err) throw err;
        console.log("It's saved!");
    });

    return data;
}

module.exports = { addEquipment, getEquipment, removeEquipment };
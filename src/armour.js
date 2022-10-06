const fs = require('fs');

const armourPath = `equipment/armours.json`;

function addArmour(id, body) {

    let data = {};
    let equipmentId = id;

    const fileExists = fs.existsSync(armourPath);
    if (!fileExists) {

        data[equipmentId] = body;

        fs.writeFileSync(armourPath, JSON.stringify(data, null, 4), { encoding: 'utf8', flag: 'wx' }, function (err) {
            if (err) throw err;
            console.log("It's saved!");
        });
    }
    else {

        let armourRawData = fs.readFileSync(armourPath);
        let armourData = JSON.parse(armourRawData);

        armourData[equipmentId] = body;

        data = armourData[equipmentId];

        fs.writeFileSync(armourPath, JSON.stringify(armourData, null, 4), { encoding: 'utf8', flag: 'w' }, function (err) {
            if (err) throw err;
            console.log("It's saved!");
        });
    }

    return data;
}

function getArmour(id) {
    const armourPath = `equipment/armours.json`;

    let data = {};

    const fileExists = fs.existsSync(armourPath);
    if (!fileExists) {
        return data;
    }

    let armourRawData = fs.readFileSync(armourPath);
    let armourData = JSON.parse(armourRawData);

    if (!id || !armourData[id]) {
        throw new Error(`${id} found`);
    }
    return armourData[id];
}

function removeArmour(id) {
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

    fs.writeFileSync(armourPath, JSON.stringify(armourData, null, 4), { encoding: 'utf8', flag: 'w' }, function (err) {
        if (err) throw err;
        console.log("It's saved!");
    });

    return data;
}

module.exports = { addArmour, getArmour, removeArmour };
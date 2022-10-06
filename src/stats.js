const fs = require('fs');

const { getArmour } = require('./armour');

function calculateStats(body) {
    /*
    ** Body format:
    ** {
    **   "armour": { "set_name": level (int) },
    **   "helmet": { "set_name": level (int) },
    ** }
    ** Example: curl -X GET "localhost:7070/api/stats/new" -H "Content-Type: application/json" -d '{ "armour" : { "HEAD_S1" : 5 } }'
    */
    let stats = {}

    // TODO: add weapon, accessories?
    const armour = body.armour; // this should include both Armoury and Helmet

    for (const key in armour) {

        const armourData = getArmour(key);
        const armourStats = armourData['stats'][armour[key] - 1];

        for (const stat in armourStats) {
            if (stat in stats) {
                stats[stat] += armourStats[stat];
            } else {
                stats[stat] = armourStats[stat];
            }
        }
    }

    return stats;
}

function isFullSet(body) {
    // TODO: implement logics
    return false;
}

module.exports = { calculateStats };
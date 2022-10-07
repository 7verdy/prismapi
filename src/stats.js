const fs = require('fs');

const { getEquipment } = require('./equipment');
const MULTIPLIER_STRING = "_mul";

function calculateStats(body) {
    /*
    ** Body format:
    ** {
    **   "armours": { "BODY_..": level (int), "HEAD_.." : level (int) }
    ** }
    ** Example: curl -X GET "localhost:7070/api/stats/new" -H "Content-Type: application/json" -d '{ "armours" : { "BODY_S1" : 4, "HEAD_S1" : 4 } }'
    */
    let stats = getStats();
    let multiplierStats = getMultiplierStats();

    for (const category in body) {

        // possible `category`:
        // - armours
        // - weapons
        // - accessories
        const equipment = body[category];
        for (const itemId in equipment) {

            try {
                const equipmentData = getEquipment(category, itemId);
                const equipmentStats = equipmentData['stats'][equipment[itemId] - 1];

                for (const stat in equipmentStats) {

                    // skip any stats that's not a multiplier
                    // example: `hit_point_mul`
                    if (!stat.includes(MULTIPLIER_STRING))
                        continue;

                    // modify the stat string to be the same as base stats,
                    // so that the stats can be matched
                    // example: `hit_point_mul` -> `hit_point`
                    var localStat = stat.replace(MULTIPLIER_STRING, "");

                    // sum up all of the multiplication values
                    // base of 1 - retrieved from `getMultiplierStats()`
                    if (localStat in multiplierStats) {
                        multiplierStats[localStat] += equipmentStats[stat];
                    } else {
                        multiplierStats[localStat] = equipmentStats[stat];
                    }
                }

                for (const stat in equipmentStats) {

                    // skip any stats that IS a multiplier
                    if (stat.includes(MULTIPLIER_STRING))
                        continue;

                    if (stat in stats) {
                        // assuming every stats only appear once, will then multiply it right away
                        // possible bug when a stat appear twice - it will then get multiplied twice
                        stats[stat] += equipmentStats[stat];
                        stats[stat] *= multiplierStats[stat];
                    } else {
                        stats[stat] = equipmentStats[stat];
                        stats[stat] *= multiplierStats[stat];
                    }
                }
            } catch (err) {
                throw err;
            }
        }
    }



    return stats;
}

function getStats() {
    let stats = {
        "hit_point": 0,
        "attack": 0,
        "physical_damage": 0,
        "ranged_physical_damage": 0,
        "magic_damage": 0,
        "dodge_rate": 0,
        "critical_rate": 0,
        "critical_damage": 0,
        "physical_damage_reduction": 0,
        "magic_damage_reduction": 0,
        "healing_bonus": 0
    }

    return stats;
}

function getMultiplierStats() {
    let stats = {
        "hit_point": 1,
        "attack": 1,
        "physical_damage": 1,
        "ranged_physical_damage": 1,
        "magic_damage": 1,
        "dodge_rate": 1,
        "critical_rate": 1,
        "critical_damage": 1,
        "physical_damage_reduction": 1,
        "magic_damage_reduction": 1,
        "healing_bonus": 1
    }

    return stats;
}

function isFullSet(body) {
    // TODO: implement logics
    return false;
}

module.exports = { calculateStats };
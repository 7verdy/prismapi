const fs = require('fs');

const { getArmour } = require('./armour');

function calculateStats(body) {
    /*
    ** Body format:
    ** {
    **   "armour": { "BODY_..": level (int), "HEAD_.." : level (int) }
    ** }
    ** Example: curl -X GET "localhost:7070/api/stats/new" -H "Content-Type: application/json" -d '{ "armour" : { "BODY_S1" : 4, "HEAD_S1" : 4 } }'
    */
    let stats = getStats();
    let multiplierStats = getMultiplierStats();

    // TODO: add weapon, accessories?
    const armour = body.armour; // this should include both Armoury and Helmet
    for (const key in armour) {

    try {
        const armourData = getArmour(key);
        const armourStats = armourData['stats'][armour[key] - 1];

        for (const stat in armourStats) {
            if (!stat.includes("_mul"))
                continue;

            var localStat = stat.replace("_mul", "");
            if (localStat in multiplierStats) {
                multiplierStats[localStat] += armourStats[stat];
            } else {
                multiplierStats[localStat] = armourStats[stat];
            }
        }

        for (const stat in armourStats) {
            if (stat.includes("_mul"))
                continue;

            if (stat in stats) {
                stats[stat] += armourStats[stat];
                stats[stat] *= multiplierStats[stat];
            } else {
                stats[stat] = armourStats[stat];
                stats[stat] *= multiplierStats[stat];
            }
        } catch (err) {
            throw err;
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
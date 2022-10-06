const fs = require('fs');

function getStatsFromRequest(body) {
    /*
    ** Body format:
    ** {
    **   "armour": { "set_name": level (int) },
    **   "helmet": { "set_name": level (int) },
    **   "weapon_type": "sns" | "heavy" | "daggers",
    **   "weapon": { "set_name": level (int) } | { "sword" : { "set_name": level (int) }, "shield" { "set_name": level (int) } },
    ** }
    ** Example: curl -X POST "localhost:5000/api/stats" -H "Content-Type: application/json" -d '{ "armour" : { "adventurer" : 5 },
    ** "helmet" : { "adventurer" : 5 }, "weapon_type" : "sns", "weapon" : { "sword" : { "adventurer" : 5 }, "shield" : { "adventurer" : 5 } } }'
    */
    let stats = {}

    const armour = body.armour;
    const helmet = body.helmet;
    const weapon_type = body.weapon_type;
    const weapon = body.weapon;

    if (!armour || !helmet || !weapon_type || !weapon) {
        return null;
    }

    const armour_set = Object.keys(armour)[0];
    const armour_level = armour[armour_set];

    const helmet_set = Object.keys(helmet)[0];
    const helmet_level = helmet[helmet_set];

    const armourFile = fs.readFileSync(`equipment/armours/${armour_set}.json`);
    const helmetFile = fs.readFileSync(`equipment/helmets/${helmet_set}.json`);

    const armourData = JSON.parse(armourFile);
    const helmetData = JSON.parse(helmetFile);

    const armourStats = armourData['stats'][armour_level - 1];
    const helmetStats = helmetData['stats'][helmet_level - 1];

    for (const stat in armourStats) {
        if (stat in stats) {
            stats[stat] += armourStats[stat];
        } else {
            stats[stat] = armourStats[stat];
        }
    }

    for (const stat in helmetStats) {
        if (stat in stats) {
            stats[stat] += helmetStats[stat];
        } else {
            stats[stat] = helmetStats[stat];
        }
    }

    if (weapon_type === "heavy" || weapon_type === "daggers") {
        const data = fs.readFileSync(`equipment/weapons/heavies/${Object.keys(weapon)[0]}.json`);
        const weapon_data = JSON.parse(data);
        const weapon_level = weapon[weapon[0]];
        const weapon_stats = weapon_data['stats'][weapon_level];
        for (const stat in weapon_stats) {
            if (stat in stats) {
                stats[stat] += weapon_stats[stat];
            } else {
                stats[stat] = weapon_stats[stat];
            }
        }
    } else {
        const sword_set = Object.keys(weapon.sword)[0];
        const shield_set = Object.keys(weapon.shield)[0];

        const sword = fs.readFileSync(`equipment/weapons/swords/${sword_set}.json`);
        const shield = fs.readFileSync(`equipment/weapons/shields/${shield_set}.json`);

        const sword_data = JSON.parse(sword);
        const shield_data = JSON.parse(shield);

        const sword_level = weapon.sword[sword_set];
        const shield_level = weapon.shield[shield_set];

        const sword_stats = sword_data['stats'][sword_level - 1];
        const shield_stats = shield_data['stats'][shield_level - 1];

        for (const stat in sword_stats) {
            if (stats[stat]) {
                stats[stat] += sword_stats[stat];
            } else {
                stats[stat] = sword_stats[stat];
            }
        }
        for (const stat in shield_stats) {
            if (stats[stat]) {
                stats[stat] += shield_stats[stat];
            } else {
                stats[stat] = shield_stats[stat];
            }
        }
    }

    return stats;
}

module.exports = { getStatsFromRequest };
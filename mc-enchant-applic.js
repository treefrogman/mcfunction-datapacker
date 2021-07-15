const applicabilities = {
	sets: [ // bitstring represents the sets of which the given set is a subset
		["All", 0b10000000000000],
		["Breakables", 0b11000000000000],
		["Wearables", 0b10100000000000],
		["Armor", 0b11110000000000],
		["Helmets", 0b11111000000000],
		["Boots", 0b11110100000000],
		["Swords", 0b11000010000000],
		["Axes", 0b11000001000110],
		["Bow", 0b11000000100000],
		["Crossbow", 0b11000000010000],
		["Trident", 0b11000000001000],
		["Breakers", 0b11000000000110],
		["Miners", 0b11000000000010],
		["Fishrod", 0b11000000000001]
	],
	table: [ // bitstring represents the sets to which the enchant is applicable
		["Aqua Affinity", 0b00001000000000],
		["Bane of Arthropods", 0b00000011000000],
		["Blast Protection", 0b00010000000000],
		["Channeling", 0b00000000001000],
		["Curse of Binding", 0b00100000000000],
		["Curse of Vanishing", 0b10000000000000],
		["Depth Strider", 0b00000100000000],
		["Efficiency", 0b00000000000100],
		["Feather Falling", 0b00000100000000],
		["Fire Aspect", 0b00000010000000],
		["Fire Protection", 0b00010000000000],
		["Flame", 0b00000000100000],
		["Fortune", 0b00000000000010],
		["Frost Walker", 0b00000100000000],
		["Impaling", 0b00000000001000],
		["Infinity", 0b00000000100000],
		["Knockback", 0b00000010000000],
		["Looting", 0b00000010000000],
		["Loyalty", 0b00000000001000],
		["Luck of the Sea", 0b00000000000001],
		["Lure", 0b00000000000001],
		["Mending", 0b01000000000000],
		["Multishot", 0b00000000010000],
		["Piercing", 0b00000000010000],
		["Power", 0b00000000100000],
		["Projectile Protection", 0b00010000000000],
		["Protection", 0b00010000000000],
		["Punch", 0b00000000100000],
		["Quick Charge", 0b00000000010000],
		["Respiration", 0b00001000000000],
		["Riptide", 0b00000000001000],
		["Sharpness", 0b00000011000000],
		["Silk Touch", 0b00000000000010],
		["Smite", 0b00000011000000],
		["Soul Speed", 0b00000100000000],
		["Sweeping Edge", 0b00000010000000],
		["Thorns", 0b00010000000000],
		["Unbreaking", 0b01000000000000]
	]
};

function getApplicableEnchants(setIndex) {
	console.log("Enchants applicable to all " + applicabilities.sets[setIndex][0]);
	return applicabilities.table.filter((enchant) => {
		return enchant[1] & applicabilities.sets[setIndex][1];
	}).map((enchant) => {
		return enchant[0];
	}).join(`
`);
}

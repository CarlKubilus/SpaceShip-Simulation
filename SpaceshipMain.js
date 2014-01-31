// JavaScript Document
//<script language="javascript" type="text/javascript">

/* NEED TO DO:
1: Add player current weapon(s)/active cards;
3: Make it so multiple players can fight multiple hostiles (a super event outside calling multiple "planetary combat" calls)
5: Add exotic/skills/allies decks
6: Fix "Select Weapon" prompts/alerts. Requires GUI.
7: Add armor to "deactivate item"
8: Fix damage received by hostiles and players. Currently not adding up correctly with negatives/positives from armor
9: Fix hostiletargetselect. A hostile would not select a player with resistence to their weapon.
*/

/* Test Variable */
var turnCount = 0;
var turnButtonClicks = 0;

/* Important Data */
var players = [];
var hostiles = [];
var pCombatPlayerTargetSelectCheck = false;
var battleContinue = true;
var numPlayers, numHostiles;
var currentPlayers, currentHostiles;
var activePlayer = 0;

/* Weapons Definition Arrays */
/* Weapons have a name, combat modifier, ap cost, damage, damage type, refreshrate(0 for no exhaust, 1 for single exhaust, 2+ for more) and number of hands used. */
/* Each weapon uses 7 slots in the array */
//var commonWeaponsArray = ["Six Shooter", -1, 1, 1, "physical", 0, 1, "Hand Cannon", 2, 2, 2, "physical", 0, 1, "Mark 1", -1, 2, 1, "energy", 0, 1];
//var exoticWeaponsArray = ["Balmoen Quantum Disruptor", 3, 4, 5, "energy", 1, 2];
var commonGearDeck = [];

/* Common Gear Creation */
var commonGearGenerator = function (){
    var returnArray = [];
    var curCard = new Object();
    // None
    curCard.name = "None";
    curCard.type = "commonGear";
    curCard.type2 = "None";
    curCard.switchable = false;
    curCard.effectCount = 0;
    curCard.effect1 = 0;
    curCard.effect1type = "None";
    curCard.effect2 = "None";
    curCard.effect2type = "None";
    curCard.effect3 = "None";
    curCard.effect3type = "None";
    curCard.effect4 = "None";
    curCard.effect4type = "None";
    curCard.hands = 0;
    curCard.combatMod = 0;
    curCard.APCost = 0;
    curCard.dmg = 0;
    curCard.dmgType = "None";
    curCard.refreshRate = 0;
    returnArray.push(curCard);
    curCard = new Object();
    // ARMOR
    curCard.name = "Titanium Weave Vest";
    curCard.type = "commonGear";
    curCard.type2 = "armor";
    curCard.switchable = false;
    curCard.effectCount = 1;
    curCard.effect1 = -1;
    curCard.effect1type = "physical";
    curCard.effect2 = "None";
    curCard.effect2type = "None";
    curCard.effect3 = "None";
    curCard.effect3type = "None";
    curCard.effect4 = "None";
    curCard.effect4type = "None";
    curCard.hands = 0;
    returnArray.push(curCard);
    //document.getElementById("pCombatOutput").a.value +=(returnArray[0].name + '\n');
    curCard = new Object();
    curCard.name = "Power Suit";
    curCard.type = "commonGear";
    curCard.type2 = "armor";
    curCard.effectCount = 2;
    curCard.effect1 = -2;
    curCard.effect1type = "physical";
    curCard.effect2 = 1;
    curCard.effect2type = "energy";
    curCard.effect3 = "None";
    curCard.effect3type = "None";
    curCard.effect4 = "None";
    curCard.effect4type = "None";
    curCard.hands = 0;
    returnArray.push(curCard);
    //document.getElementById("pCombatOutput").a.value +=(returnArray[0].name + '\n');
    //document.getElementById("pCombatOutput").a.value +=(returnArray[1].name + '\n');
    curCard = new Object();
    curCard.name = "Carbon Nano-mesh Skin";
    curCard.type = "commonGear";
    curCard.type2 = "armor";
    curCard.effectCount = 1;
    curCard.effect1 = -3;
    curCard.effect1type = "physical";
    curCard.effect2 = "None";
    curCard.effect2type = "None";
    returnArray.push(curCard);
    curCard = new Object();
    curCard.name = "Tesla Suit";
    curCard.type = "commonGear";
    curCard.type2 = "armor";
    curCard.effectCount = 2;
    curCard.effect1 = -3;
    curCard.effect1type = "energy";
    curCard.effect2 = 1;
    curCard.effect2type = "physical";
    returnArray.push(curCard);
    curCard = new Object();
    curCard.name = "Ol' Brown Duster";
    curCard.type = "commonGear";
    curCard.type2 = "armor";
    curCard.effectCount = 2;
    curCard.effect1 = 1;
    curCard.effect1type = "charisma";
    curCard.effect2 = 1;
    curCard.effect2type = "cunning";
    returnArray.push(curCard);
    curCard = new Object();
    curCard.name = "Accelerator Suit";
    curCard.type = "commonGear";
    curCard.type2 = "armor";
    curCard.effectCount = 4;
    curCard.effect1 = 1;
    curCard.effect1type = "physical";
    curCard.effect2 = 1;
    curCard.effect2type = "energy";
    curCard.effect3 = 1;
    curCard.effect3type = "agility";
    curCard.effect4 = 1;
    curCard.effect4type = "expertise";
    returnArray.push(curCard);
    curCard = new Object();
    curCard.effect3 = "None";
    curCard.effect3type = "None";
    curCard.effect4 = "None";
    curCard.effect4type = "None";
    curCard.name = "Exo-Skeleton MkIII";
    curCard.type = "commonGear";
    curCard.type2 = "armor";
    curCard.switchable = true;
    curCard.effectCount = 2;
    curCard.effect1 = 2;
    curCard.effect1type = "endurance";
    curCard.effect2 = 2;
    curCard.effect2type = "agility";
    returnArray.push(curCard);
    curCard = new Object();
    curCard.switchable = false;
    curCard.effectCount = 0;
    curCard.effect1 = "None";
    curCard.effect1type = "None";
    curCard.effect2 = "None";
    curCard.effect2type = "None";
    curCard.effect3 = "None";
    curCard.effect3type = "None";
    curCard.effect4 = "None";
    curCard.effect4type = "None";
    
    // WEAPONS
    // name, combat modifier, ap cost, damage, damage type, refreshrate(0 for no exhaust, 1 for single exhaust, 2+ for more) and number of hands used.
    curCard.name = "Six Shooter";
    curCard.type = "commonGear";
    curCard.type2 = "weapon";
    curCard.combatMod = -1;
    curCard.APCost = 1;
    curCard.dmg = 1;
    curCard.dmgType = "physical";
    curCard.refreshRate = 0;
    curCard.hands = 1;
    returnArray.push(curCard);
    curCard = new Object();
    curCard.name = "Hand Cannon";
    curCard.type = "commonGear";
    curCard.type2 = "weapon";
    curCard.combatMod = 2;
    curCard.APCost = 2;
    curCard.dmg = 2;
    curCard.dmgType = "physical";
    curCard.refreshRate = 0;
    curCard.hands = 1;
    returnArray.push(curCard);
    curCard = new Object();
    curCard.name = "Mark 1";
    curCard.type = "commonGear";
    curCard.type2 = "weapon";
    curCard.combatMod = -1;
    curCard.APCost = 2;
    curCard.dmg = 1;
    curCard.dmgType = "energy";
    curCard.refreshRate = 0;
    curCard.hands = 1;
    returnArray.push(curCard);
    curCard = new Object();
    curCard.name = "Plasma Rifle";
    curCard.type = "commonGear";
    curCard.type2 = "weapon";
    curCard.combatMod = 2;
    curCard.APCost = 3;
    curCard.dmg = 4;
    curCard.dmgType = "energy";
    curCard.refreshRate = 0;
    curCard.hands = 2;
    curCard.effectCount = 1;
    curCard.effect1 = 1;
    curCard.effect1type = "bonus die";
    returnArray.push(curCard);
    curCard = new Object();
    curCard.effectCount = 0;
    curCard.effect1 = "None";
    curCard.effect1type = "None";
    
    //name, combat modifier, ap cost, damage, damage type, refreshrate(0 for no exhaust, 1 for single exhaust, 2+ for more) and number of hands used.
    return returnArray;
};

/* Create player function*/
var player = function(name, apMax, hpMax, refresh, agility, endurance, expertise, cunning, intelligence, charisma) {
    var  p = new Object();
    p.type = "player";
    p.playerName = name;
    p.playerHitNumber = 0;
    p.playerAPMax = apMax;
    p.playerAPCurrent = apMax;
    p.playerHPMax = hpMax;
    p.playerHPCurrent = hpMax;
    p.playerRefresh = refresh;
    p.playerWeaponName = "None";
    p.playerWeaponModifier = 0;
    p.playerWeaponAP = 0;
    p.playerWeaponDMG = 0;
    p.playerWeaponDMGType = "None";
    p.playerWeaponRefresh = 0;
    //p.playerWeaponHands;
    p.playerCombatModifier = 0;
    p.playerAgility = agility;
    p.playerEndurance = endurance;
    p.playerExpertise = expertise;
    p.playerCunning = cunning;
    p.playerIntelligence = intelligence;
    p.playerCharisma = charisma;
    p.playerPhysicalDefenseModifier = 0;
    p.playerEnergyDefenseModifier = 0;
    p.playerItems = [];
    p.playerActiveItems = [];
    p.playerWeapons = [];
    p.handsUsed = 0;
    p.armorCount = 0;
    return p;
};

/* Create hostile */
var hostile = function(name, apMax, hpMax, refresh, combatMod, physicalDefenseMod, energyDefenseMod, APcost, DMG, DMGType, agility, endurance, expertise) {
    var h = new Object();
    h.type = "hostile";
    h.hostileName = name;
    h.hostileHitNumber = 0;
    h.hostileAPMax = apMax;
    h.hostileAPCurrent = apMax;
    h.hostileHPMax = hpMax;
    h.hostileHPCurrent = hpMax;
    h.hostileRefresh = refresh;
    h.hostileWeaponAP = APcost;
    h.hostileWeaponDMG = DMG;
    h.hostileWeaponDMGType = DMGType;
    h.hostileAgility = agility;
    h.hostileEndurance = endurance;
    h.hostileExpertise = expertise;
    h.hostilePhysicalDefenseModifier = physicalDefenseMod;
    h.hostileEnergyDefenseModifier = energyDefenseMod;
    h.hostileCombatModifier = combatMod;
    return h;
};

/* Select Weapon */
var selectWeapon = function () {
    //var count = 0;
    //var choice;
    var player = currentPlayers[activePlayer];
    var currWeapon = new Object();
    initPlayersWeaponListOption("pCombatPlayerWeaponSelectOptionsList", player);
    toggle_visibility("pCombatPlayerWeaponSelectDiv");
    //document.getElementById("pCombatOutput").a.value += "Select a weapon by number" + '\n';
    document.getElementById("pCombatPlayerWeaponSelectButton").addEventListener('click', function(event) {
        currWeapon = playerWeaponSelection(player);
        document.getElementById("pCombatOutput").a.value = (player.playerName + " chose " + currWeapon.name + '\n');
        player.playerWeaponName = currWeapon.name;
        player.playerWeaponModifier = currWeapon.combatMod;
        player.playerWeaponAP = currWeapon.APCost;
        player.playerWeaponDMG = currWeapon.dmg;
        player.playerWeaponDMGType = currWeapon.dmgType;
        player.playerWeaponRefresh = currWeapon.refreshRate;
        //player.playerWeaponHands = currWeapon.hands;
        player.playerCombatModifier = player.playerCombatModifier + player.playerWeaponModifier;
        toggle_visibility("pCombatPlayerWeaponSelectDiv");
        resetPlayersWeaponListOption("pCombatPlayerWeaponSelectOptionsList");
        showListOfHostiles();
    });
    return;
    //choice = prompt("Which will you choose to use?", "Select a weapon by number.");
    //choice = parseInt(choice);
    /*
    if (isNaN(choice) || choice > player.playerWeapons.length){
        document.getElementById("pCombatOutput").a.value +=("You did not choose a valid number!<br>");
        return false;
    }
    */
};

var playerWeaponSelection = function (player) {
    var currentWeaponName;
    var currentWeapon;
    var i;
    // Sets current Weapon to be the selection from list
    currentWeaponName = document.getElementById("pCombatPlayerWeaponSelectOptionsList").options[document.getElementById("pCombatPlayerWeaponSelectOptionsList").selectedIndex].text;
    for (i = 0; i < player.playerWeapons.length; i++){
        if (currentWeaponName === player.playerWeapons[i].name){
            currentWeapon = player.playerWeapons[i];
            i = player.playerWeapons.length;
        }
    }
    //document.getElementById("pCombatOutput").a.value += "Current Player's Weapon: " + currentPlayerTarget.hostileName + '\n';
    return currentWeapon;
};

// Initialize list of weapons for player to select.
var initPlayersWeaponListOption = function(id, player) {
    var select, i, option;
    select = document.getElementById(id);
    for ( i = 0; i < player.playerWeapons.length; i++) {
        option = document.createElement("option");
        option.value = player.playerWeapons[i].name;
        option.text = option.value;
        select.appendChild(option);
    }
    //document.getElementById("pCombatOutput").a.value += "Weapon Init Hello!" + '\n';
    return;
};

// Reset weapons list
var resetPlayersWeaponListOption = function(id) {
    var select, i;
    select = document.getElementById(id);
    for(i=select.options.length-1;i>=0;i--)
    {
        select.remove(i);
    }
    //document.getElementById("pCombatOutput").a.value += "Weapon Reset Hello!" + '\n';
    return;
};

/* Remove Item */
var removeItem = function (player, item){
    var count = 0;
    deactivateItem(player, item);
    for (count; count < player.playerItems.length; count++){
        if (player.playerItems[count].name === item){
            player.playerItems.splice(count, 1);
            return true;
        }
    }
    document.getElementById("pCombatOutput").a.value +=(player.playerName + " does not have the " + item + '\n');
    return false;
};

/* Deactivate Items */
var deactivateItem = function (player, item){
    var count = 0;
    for (count; count < player.playerActiveItems.length; count++){
        if (player.playerActiveItems[count].name === item){
            if (player.playerActiveItems[count].type2 === "weapon") {
                player.handsUsed = player.handsUsed - player.playerActiveItems[count].hands;
                player.playerActiveItems.splice(count, 1);
                var count2 = 0;
                for (count2; count2 <player.playerWeapons.length; count2++){
                    if (player.playerWeapons[count2].name === item){
                        player.playerWeapons.splice(count2, 1);
                        return true;
                    } 
                }
                document.getElementById("pCombatOutput").a.value +=(player.playerName + " does not have the " + item + '\n');
                return false;
            }
            else {
                player.handsUsed = player.handsUsed - player.playerAtiveItems[count].hands;
                player.playerActiveItems.splice(count, 1);
                return true;
            }
        }
    }
    document.getElementById("pCombatOutput").a.value +=(player.playerName + " does not have the " + item + " active!<br>");
    return false;
};

/* Activate Items */
var activateItem = function (player, item){
    var count = 0;
    var count2 = 0;
    //document.getElementById("pCombatOutput").a.value +=("Current Player: " + player.playerName + '\n');
    for (count; count < player.playerItems.length; count++){
        //document.getElementById("pCombatOutput").a.value +=("currItem: " + player.playerItems[count].name + '\n');
        if (player.playerItems[count].name === item){
            var currItem = player.playerItems[count];
            if (currItem.type2 === "weapon") {
                if (currItem.hands > 0) {
                    if (player.handsUsed === 2) {
                        document.getElementById("pCombatOutput").a.value +=(player.playerName + " does not have enough free hands!<br>");
                        return false;
                    }
                    else if (player.handsUsed === 1 && currItem.hands === 1){
                        player.playerActiveItems.push(currItem);
                        player.handsUsed++;
                        player.playerWeapons.push(currItem);
                        return true;
                    }
                    else if (player.handsUsed === 1 && currItem.hands === 2){
                        document.getElementById("pCombatOutput").a.value +=(player.playerName + " does not have enough free hands!<br>");
                        return false;
                    }
                    else {
                        player.playerActiveItems.push(currItem);
                        player.handsUsed = player.handsUsed + currItem.hands;
                        player.playerWeapons.push(currItem);
                        return true;
                    }
                }
                else {
                    player.playerActiveItems.push(currItem);
                    player.playerWeapons.push(currItem);
                    return true;
                }
            }
            else if (currItem.type2 === "armor"){
                if (player.armorCount <= 4){
                    player.armorCount++;
                    player.playerActiveItems.push(currItem);
                    if (currItem.effect1type === "physical"){
                        player.playerPhysicalDefenseModifier = currItem.effect1;
                    }
                    if (currItem.effect1type === "energy"){
                        player.playerEnergyDefenseModifier = currItem.effect1;
                    }
                    if (currItem.effect1type === "energy"){
                        player.playerEnergyDefenseModifier = currItem.effect1;
                    }
                    if (currItem.effect1type === "agility"){
                        player.playerAgility += currItem.effect1;
                    }
                    if (currItem.effect1type === "endurance"){
                        player.playerEndurance += currItem.effect1;
                    }
                    if (currItem.effect1type === "expertise"){
                        player.playerExpertise += currItem.effect1;
                    }
                    if (currItem.effect1type === "cunning"){
                        player.playerCunning += currItem.effect1;
                    }
                    if (currItem.effect1type === "intelligence"){
                        player.playerIntelligence += currItem.effect1;
                    }
                    if (currItem.effect1type === "charisma"){
                        player.playerCharisma += currItem.effect1;
                    }
                    if (currItem.effect1type === "HP"){
                        player.playerHPMax += currItem.effect1;
                        player.playerHPCurrent += currItem.effect1;
                    }
                    if (currItem.effect1type === "AP"){
                        player.playerAPMax += currItem.effect1;
                        player.playerAPCurrent += currItem.effect1;
                    }
                    if (currItem.effect2type === "physical"){
                        player.playerPhysicalDefenseModifier = currItem.effect2;
                    }
                    if (currItem.effect2type === "energy"){
                        player.playerEnergyDefenseModifier = currItem.effect2;
                    }
                    if (currItem.effect2type === "energy"){
                        player.playerEnergyDefenseModifier = currItem.effect2;
                    }
                    if (currItem.effect2type === "agility"){
                        player.playerAgility += currItem.effect2;
                    }
                    if (currItem.effect2type === "endurance"){
                        player.playerEndurance += currItem.effect2;
                    }
                    if (currItem.effect2type === "expertise"){
                        player.playerExpertise += currItem.effect2;
                    }
                    if (currItem.effect2type === "cunning"){
                        player.playerCunning += currItem.effect2;
                    }
                    if (currItem.effect2type === "intelligence"){
                        player.playerIntelligence += currItem.effect2;
                    }
                    if (currItem.effect2type === "charisma"){
                        player.playerCharisma += currItem.effect2;
                    }
                    if (currItem.effect2type === "HP"){
                        player.playerHPMax += currItem.effect2;
                        player.playerHPCurrent += currItem.effect2;
                    }
                    if (currItem.effect2type === "AP"){
                        player.playerAPMax += currItem.effect2;
                        player.playerAPCurrent += currItem.effect2;
                    }
                    if (currItem.effect3type === "physical"){
                        player.playerPhysicalDefenseModifier = currItem.effect3;
                    }
                    if (currItem.effect3type === "energy"){
                        player.playerEnergyDefenseModifier = currItem.effect3;
                    }
                    if (currItem.effect3type === "energy"){
                        player.playerEnergyDefenseModifier = currItem.effect3;
                    }
                    if (currItem.effect3type === "agility"){
                        player.playerAgility += currItem.effect3;
                    }
                    if (currItem.effect3type === "endurance"){
                        player.playerEndurance += currItem.effect3;
                    }
                    if (currItem.effect3type === "expertise"){
                        player.playerExpertise += currItem.effect3;
                    }
                    if (currItem.effect3type === "cunning"){
                        player.playerCunning += currItem.effect3;
                    }
                    if (currItem.effect3type === "intelligence"){
                        player.playerIntelligence += currItem.effect3;
                    }
                    if (currItem.effect3type === "charisma"){
                        player.playerCharisma += currItem.effect3;
                    }
                    if (currItem.effect3type === "HP"){
                        player.playerHPMax += currItem.effect3;
                        player.playerHPCurrent += currItem.effect3;
                    }
                    if (currItem.effect3type === "AP"){
                        player.playerAPMax += currItem.effect3;
                        player.playerAPCurrent += currItem.effect3;
                    }
                    if (currItem.effect4type === "physical"){
                        player.playerPhysicalDefenseModifier = currItem.effect4;
                    }
                    if (currItem.effect4type === "energy"){
                        player.playerEnergyDefenseModifier = currItem.effect4;
                    }
                    if (currItem.effect4type === "energy"){
                        player.playerEnergyDefenseModifier = currItem.effect4;
                    }
                    if (currItem.effect4type === "agility"){
                        player.playerAgility += currItem.effect4;
                    }
                    if (currItem.effect4type === "endurance"){
                        player.playerEndurance += currItem.effect4;
                    }
                    if (currItem.effect4type === "expertise"){
                        player.playerExpertise += currItem.effect4;
                    }
                    if (currItem.effect4type === "cunning"){
                        player.playerCunning += currItem.effect4;
                    }
                    if (currItem.effect4type === "intelligence"){
                        player.playerIntelligence += currItem.effect4;
                    }
                    if (currItem.effect4type === "charisma"){
                        player.playerCharisma += currItem.effect4;
                    }
                    if (currItem.effect4type === "HP"){
                        player.playerHPMax += currItem.effect4;
                        player.playerHPCurrent += currItem.effect4;
                    }
                    if (currItem.effect4type === "AP"){
                        player.playerAPMax += currItem.effect4;
                        player.playerAPCurrent += currItem.effect4;
                    }
                    return true;
                }
                else {
                    document.getElementById("pCombatOutput").a.value +=(player.playerName + " has too much armor active!<br>");
                    return false;
                }
            }
        }
    }
    document.getElementById("pCombatOutput").a.value +=(player.playerName + " does not have the " + item + " to activate!<br>");
    return false;
};

/* Common Gear Lookup */
var commonGearLookup = function (name){
    // document.getElementById("pCombatOutput").a.value +=("Checkpoint 8!");
    // var w = new Object();
    var index = 0;
    var deckLength = commonGearDeck.length;
    //document.getElementById("pCombatOutput").a.value +=("Length is: " + deckLength + '\n');
    for (index; index < deckLength; index++){
        //document.getElementById("pCombatOutput").a.value +=("Current Common Gear: " + commonGearDeck[index].name + '\n');
        if (commonGearDeck[index].name === name){
            //document.getElementById("pCombatOutput").a.value +=("Current Common Gear: " + commonGearDeck[index].name + '\n');
            return commonGearDeck[index];
        }
    }
    document.getElementById("pCombatOutput").a.value +=("No weapon found!<br>");
    return "None";
}; 

/* Weapon Lookup OLD 
var weaponLookup = function (name){
    // document.getElementById("pCombatOutput").a.value +=("Checkpoint 8!");
    // var w = new Object();
    var index = 0;
    var returnArray = [];
    var commonWeaponsArrayLength = commonWeaponsArray.length;
    //document.getElementById("pCombatOutput").a.value +=("Length is: " + commonWeaponsArrayLength);
    var exoticWeaponsArrayLength = exoticWeaponsArray.length;
    for (index = 0; index < commonWeaponsArrayLength; index = index + 7){
        //document.getElementById("pCombatOutput").a.value +=("Index is: " + index);
        if (commonWeaponsArray[index] === name){
            //document.getElementById("pCombatOutput").a.value +=("Name is: " + name);
            //document.getElementById("pCombatOutput").a.value +=("array[0] is: " + commonWeaponsArray[index]);
            //document.getElementById("pCombatOutput").a.value +=("array[1] is: " + commonWeaponsArray[index+1]);
            //document.getElementById("pCombatOutput").a.value +=("array[2] is: " + commonWeaponsArray[index+2]);
            //document.getElementById("pCombatOutput").a.value +=("array[3] is: " + commonWeaponsArray[index+3]);
            //document.getElementById("pCombatOutput").a.value +=("array[4] is: " + commonWeaponsArray[index+4]);
            //document.getElementById("pCombatOutput").a.value +=("array[5] is: " + commonWeaponsArray[index+5]);
            //document.getElementById("pCombatOutput").a.value +=("array[6] is: " + commonWeaponsArray[index+6]);
            returnArray[0] = commonWeaponsArray[index];
            returnArray[1] = commonWeaponsArray[index+1];
            returnArray[2] = commonWeaponsArray[index+2];
            returnArray[3] = commonWeaponsArray[index+3];
            returnArray[4] = commonWeaponsArray[index+4];
            returnArray[5] = commonWeaponsArray[index+5];
            returnArray[6] = commonWeaponsArray[index+6];
            //document.getElementById("pCombatOutput").a.value +=(returnArray);
            //document.getElementById("pCombatOutput").a.value +=("Checkpoint 9!");
            return  returnArray;
        }
        else {
            //document.getElementById("pCombatOutput").a.value +=("No weapon found! " + index);
        }
    }
    
    for (index = 0; index < exoticWeaponsArrayLength; index = index + 7){
        if (exoticWeaponsArray[index] === name){
            returnArray[0] = exoticWeaponsArray[index];
            returnArray[1] = exoticWeaponsArray[index+1];
            returnArray[2] = exoticWeaponsArray[index+2];
            returnArray[3] = exoticWeaponsArray[index+3];
            returnArray[4] = exoticWeaponsArray[index+4];
            returnArray[5] = exoticWeaponsArray[index+5];
            returnArray[6] = exoticWeaponsArray[index+6];
            return  returnArray;
            }
        else {
            //document.getElementById("pCombatOutput").a.value +=("No weapon found! " + index);
        }
    }
}; */

/* Display player/hostile information */
var displayInfo = function (name){
    var count = 0;
    var count2 = 0;
    var currentPlayer = new Object();
    var currentHostile = new Object();
    var returnString = "";
    for (count = 0; count < players.length; count++){
        if (name === players[count].playerName){
            currentPlayer = players[count];
            returnString = returnString.concat("Player Name: " + currentPlayer.playerName);
            returnString = returnString.concat('\n');
            returnString = returnString.concat("Max AP : " + currentPlayer.playerAPMax);
            returnString = returnString.concat('\n');
            returnString = returnString.concat("Current AP : " + currentPlayer.playerAPCurrent);
            returnString = returnString.concat('\n');
            returnString = returnString.concat("Max HP: " + currentPlayer.playerHPMax);
            returnString = returnString.concat('\n');
            returnString = returnString.concat("Current HP : " + currentPlayer.playerHPCurrent);
            returnString = returnString.concat('\n');
            returnString = returnString.concat("Refresh: " + currentPlayer.playerRefresh);
            returnString = returnString.concat('\n');
            returnString = returnString.concat("Combat Modifier: " + currentPlayer.playerCombatModifier);
            returnString = returnString.concat('\n');
            returnString = returnString.concat("Physical Defense Modifier: " + currentPlayer.playerPhysicalDefenseModifier);
            returnString = returnString.concat('\n');
            returnString = returnString.concat("Energy Defense Modifier: " + currentPlayer.playerEnergyDefenseModifier);
            returnString = returnString.concat('\n');
            returnString = returnString.concat("Hands Used: " + currentPlayer.handsUsed);
            returnString = returnString.concat('\n');
            returnString = returnString.concat("Agility: " + currentPlayer.playerAgility);
            returnString = returnString.concat('\n');
            returnString = returnString.concat("Endurance: " + currentPlayer.playerEndurance);
            returnString = returnString.concat('\n');
            returnString = returnString.concat("Cunning: " + currentPlayer.playerCunning);
            returnString = returnString.concat('\n');
            returnString = returnString.concat("Intelligence: " + currentPlayer.playerIntelligence);
            returnString = returnString.concat('\n');
            returnString = returnString.concat("Charisma: " + currentPlayer.playerCharisma);
            returnString = returnString.concat('\n');
            returnString = returnString.concat("Cards: ");
            returnString = returnString.concat('\n');
            returnString = returnString.concat("-------------------------------------");
            returnString = returnString.concat('\n');
            for (count2 = 0; count2 < currentPlayer.playerItems.length; count2++){
                returnString = returnString.concat((count2+1) + ") " + currentPlayer.playerItems[count2].name);
                returnString = returnString.concat('\n');
            }
            
            returnString = returnString.concat("-------------------------------------");
            returnString = returnString.concat('\n');
            returnString = returnString.concat("Active Cards: ");
            returnString = returnString.concat('\n');
            returnString = returnString.concat("-------------------------------------");
            returnString = returnString.concat('\n');
            for (count2 = 0; count2 < currentPlayer.playerActiveItems.length; count2++){
                returnString = returnString.concat((count2+1) + ") " + currentPlayer.playerActiveItems[count2].name);
                returnString = returnString.concat('\n');
            }
            returnString = returnString.concat("-------------------------------------");
            returnString = returnString.concat('\n');
            returnString = returnString.concat("Weapons: ");
            returnString = returnString.concat('\n');
            returnString = returnString.concat("-------------------------------------");
            returnString = returnString.concat('\n');
            for (count2 = 0; count2 < currentPlayer.playerWeapons.length; count2++){
                returnString = returnString.concat((count2+1) + ") " + currentPlayer.playerWeapons[count2].name);
                returnString = returnString.concat('\n');
            }
            returnString = returnString.concat("-------------------------------------");
            returnString = returnString.concat('\n');
            returnString = returnString.concat("Weapon Name: " + currentPlayer.playerWeaponName);
            returnString = returnString.concat('\n');
            returnString = returnString.concat("Weapon Modifier: " + currentPlayer.playerWeaponModifier);
            returnString = returnString.concat('\n');
            returnString = returnString.concat("Weapon AP Cost: " + currentPlayer.playerWeaponAP);
            returnString = returnString.concat('\n');
            returnString = returnString.concat("Weapon Damage: " + currentPlayer.playerWeaponDMG);
            returnString = returnString.concat('\n');
            returnString = returnString.concat("Weapon Damage Type: " + currentPlayer.playerWeaponDMGType);
            returnString = returnString.concat('\n');
            returnString = returnString.concat("Weapon Refresh: " + currentPlayer.playerWeaponRefresh);
            returnString = returnString.concat('\n');
            return returnString;
        }
        else {
            //document.getElementById("pCombatOutput").a.value +=("No players found!");
        }
    }
    for (count = 0; count < hostiles.length; count++){
        if (name === hostiles[count].hostileName){
            currentHostile = hostiles[count];
            returnString = returnString.concat("Hostile Name: " + currentHostile.hostileName);
            returnString = returnString.concat('\n');
            returnString = returnString.concat("Max AP: " + currentHostile.hostileAPMax);
            returnString = returnString.concat('\n');
            returnString = returnString.concat("Current AP : " + currentHostile.hostileAPCurrent);
            returnString = returnString.concat('\n');
            returnString = returnString.concat("Max HP: " + currentHostile.hostileHPMax);
            returnString = returnString.concat('\n');
            returnString = returnString.concat("Current HP: " + currentHostile.hostileHPCurrent);
            returnString = returnString.concat('\n');
            returnString = returnString.concat("Refresh: " + currentHostile.hostileRefresh);
            returnString = returnString.concat('\n');
            returnString = returnString.concat("Combat Modifier: " + currentHostile.hostileCombatModifier);
            returnString = returnString.concat('\n');
            returnString = returnString.concat("Physical Defense Modifier: " + currentHostile.hostilePhysicalDefenseModifier);
            returnString = returnString.concat('\n');
            returnString = returnString.concat("Energy Defense Modifier: " + currentHostile.hostileEnergyDefenseModifier);
            returnString = returnString.concat('\n');
            returnString = returnString.concat("AP Cost: " + currentHostile.hostileWeaponAP);
            returnString = returnString.concat('\n');
            returnString = returnString.concat("Damage: " + currentHostile.hostileWeaponDMG);
            returnString = returnString.concat('\n');
            returnString = returnString.concat("Damage Type: " + currentHostile.hostileWeaponDMGType);
            returnString = returnString.concat('\n');
            returnString = returnString.concat("Agility: " + currentHostile.hostileAgility);
            returnString = returnString.concat('\n');
            returnString = returnString.concat("Endurance: " + currentHostile.hostileEndurance);
            returnString = returnString.concat('\n');
            returnString = returnString.concat("Expertise: " + currentHostile.hostileExpertise);
            returnString = returnString.concat('\n');
            return returnString;
        }
        else {
            //document.getElementById("pCombatOutput").a.value +=("No hostiles found!");
        }
    }
    return;
};

/* OLD VERSION BELOW 
var displayInfo = function (name){
    var count = 0;
    var currentPlayer = new Object();
    var currentHostile = new Object();
    for (count = 0; count < players.length; count++){
        if (name === players[count].playerName){
            currentPlayer = players[count];
            document.getElementById("pCombatOutput").a.value +=("Player Name: " + currentPlayer.playerName + '\n');
            document.getElementById("pCombatOutput").a.value +=("AP Max: " + currentPlayer.playerAPMax + '\n');
            document.getElementById("pCombatOutput").a.value +=("AP Current: " + currentPlayer.playerAPCurrent + '\n');
            document.getElementById("pCombatOutput").a.value +=("HP Max: " + currentPlayer.playerHPMax + '\n');
            document.getElementById("pCombatOutput").a.value +=("HP Current: " + currentPlayer.playerHPCurrent + '\n');
            document.getElementById("pCombatOutput").a.value +=("Refresh: " + currentPlayer.playerRefresh + '\n');
            document.getElementById("pCombatOutput").a.value +=("Hands Used: " + currentPlayer.handsUsed + '\n');
            document.getElementById("pCombatOutput").a.value +=("Agility: " + currentPlayer.playerAgility + '\n');
            document.getElementById("pCombatOutput").a.value +=("Endurance: " + currentPlayer.playerEndurance + '\n');
            document.getElementById("pCombatOutput").a.value +=("Expertise: " + currentPlayer.playerExpertise + '\n');
            document.getElementById("pCombatOutput").a.value +=("Cunning: " + currentPlayer.playerCunning + '\n');
            document.getElementById("pCombatOutput").a.value +=("Intelligence: " + currentPlayer.playerIntelligence + '\n');
            document.getElementById("pCombatOutput").a.value +=("Charisma: " + currentPlayer.playerCharisma + '\n');
            document.getElementById("pCombatOutput").a.value +=("Items: <br>");
            document.getElementById("pCombatOutput").a.value +=("_______________________________________________<br>");
            var count2 = 0;
            for (count2 = 0; count2 < currentPlayer.playerItems.length; count2++){
                document.getElementById("pCombatOutput").a.value +=((count2+1) + ") " + currentPlayer.playerItems[count2].name  + '\n');
            }
            document.getElementById("pCombatOutput").a.value +=("_______________________________________________<br>");
            document.getElementById("pCombatOutput").a.value +=("Active Items: <br>");
            document.getElementById("pCombatOutput").a.value +=("_______________________________________________<br>");
            for (count2 = 0; count2 < currentPlayer.playerActiveItems.length; count2++){
                document.getElementById("pCombatOutput").a.value +=((count2+1) + ") " + currentPlayer.playerActiveItems[count2].name  + '\n');
            }
            document.getElementById("pCombatOutput").a.value +=("_______________________________________________<br>");
            document.getElementById("pCombatOutput").a.value +=("Weapons: <br>");
            document.getElementById("pCombatOutput").a.value +=("_______________________________________________<br>");
            for (count2 = 0; count2 < currentPlayer.playerWeapons.length; count2++){
                document.getElementById("pCombatOutput").a.value +=((count2+1) + ") " + currentPlayer.playerWeapons[count2].name  + '\n');
            }
            document.getElementById("pCombatOutput").a.value +=("_______________________________________________<br>");
            document.getElementById("pCombatOutput").a.value +=("Weapon Name: " + currentPlayer.playerWeaponName + '\n');
            document.getElementById("pCombatOutput").a.value +=("Weapon Modifier: " + currentPlayer.playerWeaponModifier + '\n');
            document.getElementById("pCombatOutput").a.value +=("Weapon AP Cost: " + currentPlayer.playerWeaponAP + '\n');
            document.getElementById("pCombatOutput").a.value +=("Weapon Damage: " + currentPlayer.playerWeaponDMG + '\n');
            document.getElementById("pCombatOutput").a.value +=("Weapon Damage Type: " + currentPlayer.playerWeaponDMGType + '\n');
            document.getElementById("pCombatOutput").a.value +=("Weapon Refresh: " + currentPlayer.playerWeaponRefresh + '\n');
            document.getElementById("pCombatOutput").a.value +=("Combat Modifier: " + currentPlayer.playerCombatModifier + '\n');
            document.getElementById("pCombatOutput").a.value +=("Physical Defense Modifier: " + currentPlayer.playerPhysicalDefenseModifier + '\n');
            document.getElementById("pCombatOutput").a.value +=("Energy Defense Modifier: " + currentPlayer.playerEnergyDefenseModifier + "<br><br>");
            return;
        }
        else {
            //document.getElementById("pCombatOutput").a.value +=("No players found!");
        }
    }
    for (count = 0; count < hostiles.length; count++){
        if (name === hostiles[count].hostileName){
            currentHostile = hostiles[count];
            document.getElementById("pCombatOutput").a.value +=("Player Name: " + currentHostile.hostileName + '\n');
            document.getElementById("pCombatOutput").a.value +=("AP Max: " + currentHostile.hostileAPMax + '\n');
            document.getElementById("pCombatOutput").a.value +=("AP Current: " + currentHostile.hostileAPCurrent + '\n');
            document.getElementById("pCombatOutput").a.value +=("HP Max: " + currentHostile.hostileHPMax + '\n');
            document.getElementById("pCombatOutput").a.value +=("HP Current: " + currentHostile.hostileHPCurrent + '\n');
            document.getElementById("pCombatOutput").a.value +=("Refresh: " + currentHostile.hostileRefresh + '\n');
            document.getElementById("pCombatOutput").a.value +=("AP Cost: " + currentHostile.hostileWeaponAP + '\n');
            document.getElementById("pCombatOutput").a.value +=("Damage: " + currentHostile.hostileWeaponDMG + '\n');
            document.getElementById("pCombatOutput").a.value +=("Damage Type: " + currentHostile.hostileWeaponDMGType + '\n');
            document.getElementById("pCombatOutput").a.value +=("Agility: " + currentHostile.hostileAgility + '\n');
            document.getElementById("pCombatOutput").a.value +=("Endurance: " + currentHostile.hostileEndurance + '\n');
            document.getElementById("pCombatOutput").a.value +=("Expertise: " + currentHostile.hostileExpertise + '\n');
            document.getElementById("pCombatOutput").a.value +=("Combat Modifier: " + currentHostile.hostileCombatModifier + '\n');
            document.getElementById("pCombatOutput").a.value +=("Physical Defense Modifier: " + currentHostile.hostilePhysicalDefenseModifier + '\n');
            document.getElementById("pCombatOutput").a.value +=("Energy Defense Modifier: " + currentHostile.hostileEnergyDefenseModifier + "<br><br>");
            return;
        }
        else {
            //document.getElementById("pCombatOutput").a.value +=("No hostiles found!");
        }
    }
    return;
};
OLD VERSION ABOVE */
/* 12-sided Die */
var dieRoll = function () {
    var roll = Math.round(Math.random() * 12) % 12 + 1;
    //document.getElementById("pCombatOutput").a.value +=("Roll: " + roll + '\n');
    return roll;
};


/* Generate To Hit */
var toHit = function (attacker, defender){
    var offense = 0;
    var defense = 0;
    var result = 0;
    var curDie;
    if (attacker.type === "player"){
        //document.getElementById("pCombatOutput").a.value +=("player Expertise: " + attacker.playerExpertise + '\n');
        //document.getElementById("pCombatOutput").a.value +=("player weapon mod: " + attacker.playerWeaponModifier + '\n');
        document.getElementById("pCombatOutput").a.value += (attacker.playerName + "'s Combat Mod: " + attacker.playerCombatModifier + '\n');
        document.getElementById("pCombatOutput").a.value += (attacker.playerName + "'s Expertise: " + attacker.playerExpertise + '\n');
        offense = attacker.playerExpertise + attacker.playerCombatModifier;
        defense = defender.hostileAgility;
        curDie = dieRoll();
        result = offense + curDie - defense;
        document.getElementById("pCombatOutput").a.value += "Dieroll: " + curDie + '\n';
        document.getElementById("pCombatOutput").a.value += "Offense: " + offense + '\n';
        document.getElementById("pCombatOutput").a.value += "Defense: " + defense + '\n';
        document.getElementById("pCombatOutput").a.value += "Result: " + result + '\n';
        if (result >= 10){
            document.getElementById("pCombatOutput").a.value += (attacker.playerName + " hit " + defender.hostileName + "!" + '\n');
            //document.getElementById("pCombatOutput").a.value +=("Player successfully hit hostile!<br>");
            return true;
        }
        else {
            return false;
        }
    }
    else {
        //document.getElementById("pCombatOutput").a.value +=("hostile Expertise: " + attacker.hostileExpertise + '\n');
        //document.getElementById("pCombatOutput").a.value +=("hostile weapon mod: " + attacker.hostileWeaponModifier + '\n');
        offense = attacker.hostileExpertise + attacker.hostileCombatModifier;
        defense = defender.playerAgility;
        curDie = dieRoll();
        result = offense + curDie - defense;
        //document.getElementById("pCombatOutput").a.value +=("Dieroll: " + curDie + '\n');
        //document.getElementById("pCombatOutput").a.value +=("Offense: " + offense + '\n');
        //document.getElementById("pCombatOutput").a.value +=("Defense: " + defense + '\n');
        //document.getElementById("pCombatOutput").a.value +=("Result: " + result + '\n');
        if (result >= 10){
            document.getElementById("pCombatOutput").a.value += (attacker.hostileName + " hit " + defender.playerName + "!" + '\n');
            //document.getElementById("pCombatOutput").a.value +=("Hostile successfully hit player!<br>");
            return true;
        }
        else {
            return false;
        }
    }
};

/* Planetary Combat Function */
var planetaryCombat = function (attacker, defender){
    // Need to add SELECT WEAPON!
    var damageDealt = 0;
    var damageReduction = 0;
    if (APCheck(attacker)){
        if (toHit(attacker, defender) === true){
            if (attacker.type === "player"){
                if (attacker.playerWeaponDMGType === "physical" && defender.hostilePhysialDefenseModifier !== 0 ){
                    damageReduction = defender.hostilePhysicalDefenseModifier;
                }
                if (attacker.hostileWeaponDMGType === "energy" && defender.hostileEnergyDefenseModifier !== 0 ){
                    damageReduction = defender.hostileEnergyDefenseModifier;
                }
                if (attacker.playerWeaponDMG <= defender.hostileEndurance){
                    damageDealt = 1 + damageReduction;
                    if (damageDealt < 0) {
                        damageDealt = 0;
                    }
                    document.getElementById("pCombatOutput").a.value += "Damage Dealt: " + damageDealt + '\n';
                    document.getElementById("pCombatOutput").a.value += "player weapon dmg: " + attacker.playerWeaponDMG + '\n';
                    document.getElementById("pCombatOutput").a.value += "hostile endurance: " + defender.hostileEndurance + '\n';
                    defender.hostileHPCurrent = defender.hostileHPCurrent - damageDealt;
                    if (deathCheck(defender)){
                        return false;
                    }
                    else {
                        document.getElementById("pCombatOutput").a.value += (defender.hostileName + " current HP: " + defender.hostileHPCurrent + '\n');
                        //document.getElementById("pCombatOutput").a.value +=("Hostile Current HP: " + defender.hostileHPCurrent + '\n');
                        return true;
                    }
                }
                else {
                    damageDealt = attacker.playerWeaponDMG - defender.hostileEndurance + damageReduction;
                    document.getElementById("pCombatOutput").a.value += "Damage Dealt: " + damageDealt + '\n';
                    document.getElementById("pCombatOutput").a.value += "player weapon dmg: " + attacker.playerWeaponDMG + '\n';
                    document.getElementById("pCombatOutput").a.value += "hostile endurance: " + defender.hostileEndurance + '\n';
                    defender.hostileHPCurrent = defender.hostileHPCurrent - damageDealt;
                    if (deathCheck(defender)){
                        return false;
                    }
                    else{
                        document.getElementById("pCombatOutput").a.value += (defender.hostileName + " current HP: " + defender.hostileHPCurrent + '\n');
                        //document.getElementById("pCombatOutput").a.value +=("Hostile Current HP: " + defender.hostileHPCurrent + '\n');
                        return true;
                    }
                }
            }
            else {
                if (attacker.hostileWeaponDMGType === "physical" && defender.playerPhysialDefenseModifier !== 0 ){
                    damageReduction = defender.playerPhysicalDefenseModifier;
                }
                if (attacker.hostileWeaponDMGType === "energy" && defender.playerEnergyDefenseModifier !== 0 ){
                    damageReduction = defender.playerEnergyDefenseModifier;
                }
                if (attacker.hostileWeaponDMG <= defender.playerEndurance){
                    damageDealt = 1 + damageReduction;
                    if (damageDealt < 0) {
                        damageDealt = 0;
                    }
                    document.getElementById("pCombatOutput").a.value += "Damage Dealt: " + damageDealt + '\n';
                    document.getElementById("pCombatOutput").a.value += "hostile weapon dmg: " + attacker.hostileWeaponDMG + '\n';
                    document.getElementById("pCombatOutput").a.value += "player endurance: " + defender.playerEndurance + '\n';
                    defender.playerHPCurrent = defender.playerHPCurrent - damageDealt;
                    if (deathCheck(defender)){
                        return false;
                    }
                    else {
                        document.getElementById("pCombatOutput").a.value += (defender.playerName + " current HP: " + defender.playerHPCurrent + '\n');
                        //document.getElementById("pCombatOutput").a.value +=("Player Current HP: " + defender.playerHPCurrent + '\n');
                        return true;
                    }
                }
                else {
                    damageDealt = attacker.hostileWeaponDMG - defender.playerEndurance + damageReduction;
                    document.getElementById("pCombatOutput").a.value += "Damage Dealt: " + damageDealt + '\n';
                    document.getElementById("pCombatOutput").a.value += "hostile weapon dmg: " + attacker.hostileWeaponDMG + '\n';
                    document.getElementById("pCombatOutput").a.value += "player endurance: " + defender.playerEndurance + '\n';
                    defender.playerHPCurrent = defender.playerHPCurrent - damageDealt;
                    if (deathCheck(defender)){
                        return false;
                    }
                    else{
                        document.getElementById("pCombatOutput").a.value += (defender.playerName + " current HP: " + defender.playerHPCurrent + '\n');
                        //document.getElementById("pCombatOutput").a.value +=("Player Current HP: " + defender.playerHPCurrent + '\n');
                        return true;
                    }
                }
            }
        }
        else {
            if(attacker.type === "player"){
                document.getElementById("pCombatOutput").a.value += (attacker.playerName + " missed " + defender.hostileName + "!" + '\n');
            }
            else {
                document.getElementById("pCombatOutput").a.value += (attacker.hostileName + " missed " + defender.playerName + "!" + '\n');
            }
            //document.getElementById("pCombatOutput").a.value += ("Missed!" + '\n');
            //document.getElementById("pCombatOutput").a.value +=("Missed!<br>");
            return true;
        }
    }
    else {
        return;
    }
};

/* AP Check */
var APCheck = function (attacker) {
    if(attacker.type === "player"){
        if (attacker.playerAPCurrent >= attacker.playerWeaponAP){
            attacker.playerAPCurrent = attacker.playerAPCurrent - attacker.playerWeaponAP;
            document.getElementById("pCombatOutput").a.value += (attacker.playerName + " current AP after attack: " + attacker.playerAPCurrent + '\n');
            //document.getElementById("pCombatOutput").a.value +=("Player's Current AP after attack: " + attacker.playerAPCurrent + '\n');
            return true;
        }
        else {
            document.getElementById("pCombatOutput").a.value += (attacker.playerName + " does not have enough AP!" + '\n');
            //document.getElementById("pCombatOutput").a.value +=("Player does not have enough AP!<br>");
            return false;
        }
    }
    else {
        if (attacker.hostileAPCurrent >= attacker.hostileWeaponAP){
            attacker.hostileAPCurrent = attacker.hostileAPCurrent - attacker.hostileWeaponAP;
            document.getElementById("pCombatOutput").a.value += (attacker.hostileName + " current AP after attack: " + attacker.hostileAPCurrent + '\n');
            //document.getElementById("pCombatOutput").a.value +=("Hostile's Current AP after attack: " + attacker.hostileAPCurrent + '\n');
            return true;
        }
        else {
            document.getElementById("pCombatOutput").a.value += (attacker.hostileName + " does not have enough AP!" + '\n');
            //document.getElementById("pCombatOutput").a.value +=("Hostile does not have enough AP!<br>");
            return false;
        }
    }
};

/* Refresh AP */
var APRefresh = function (user) {
    if (user.type === "player"){
        user.playerAPCurrent = user.playerAPCurrent + user.playerRefresh;
        if (user.playerAPCurrent > user.playerAPMax) {
            user.playerAPCurrent = user.playerAPMax;
        }
        document.getElementById("pCombatOutput").a.value += (user.playerName + " is Refreshed! Current AP is: " + user.playerAPCurrent + '\n');
        //document.getElementById("pCombatOutput").a.value +=("Player is Refreshed! Current AP is: " + user.playerAPCurrent + '\n');
    }
    else{
        user.hostileAPCurrent = user.hostileAPCurrent + user.hostileRefresh;
        if (user.hostileAPCurrent > user.hostileAPMax) {
            user.hostileAPCurrent = user.hostileAPMax;
        }
        document.getElementById("pCombatOutput").a.value += (user.hostileName + " is Refreshed! Current AP is: " + user.hostileAPCurrent + '\n');
        //document.getElementById("pCombatOutput").a.value +=("Hostile is Refreshed! Current AP is: " + user.hostileAPCurrent + '\n');
    }
};

/* Check Death */
var deathCheck = function (user) {
    if (user.type === "player"){
        if (user.playerHPCurrent <= 0){
            document.getElementById("pCombatOutput").a.value += (user.playerName + " has died!" + '\n');
            //document.getElementById("pCombatOutput").a.value +=("Player has died!");
            return true;
        }
        else {
            return false;
        }
    }
    else {
        if (user.hostileHPCurrent <= 0){
            document.getElementById("pCombatOutput").a.value += (user.hostileName + " has died!" + '\n');
            //document.getElementById("pCombatOutput").a.value +=("Hostile has died!<br>");
            return true;
        }
        else {
            return false;  
        }
    }
};

/* Planetary Combat Arena */
var planetaryCombatArena = function (ps2, hs2) {
    var tempPlayers = ps2.split(", ");
    var tempHostiles = hs2.split(", ");
    //document.getElementById("pCombatOutput").a.value += "Hello1" + '\n';
    var tpCount = 0;
    var pCount = 0;
    var hCount = 0;
    //var currentPlayers = [];
    //var currentHostiles = [];
    //var currentPlayer = new Object(); 
    //var currentHostile = new Object();
    //var numPlayers, numHostiles = 0;
    //var battleContinue = true;
    //var hold = false;
    //var tempArray = [];
    //var i, j;
    //var currentPlayerTarget = new Object();
    //var currentPlayerTargetName = "";
    //var currentHostileTarget = new Object();
    numPlayers = 0;
    numHostiles = 0;
    currentPlayers = [];
    currentHostiles = [];
    for (tpCount = 0; tpCount < tempPlayers.length; tpCount++){
        if (tempPlayers[tpCount] === players[pCount].playerName){
            currentPlayers.push(players[pCount]);
            pCount = 0;
        }
        else {
            pCount++;
            tpCount--;
            if (pCount >= players.length) {
                pCount = 0;
                tpCount++;
                document.getElementById("pCombatOutput").a.value += "" + tempPlayers[tpCount] + " is not a valid player name. '\n";
            }
        }
    }
    for (tpCount = 0; tpCount < tempHostiles.length; tpCount++){
        if (tempHostiles[tpCount] === hostiles[hCount].hostileName){
            currentHostiles.push(hostiles[hCount]);
            hCount = 0;
        }
        else {
            hCount++;
            tpCount--;
            if (hCount >= hostiles.length) {
                hCount = 0;
                tpCount++;
                document.getElementById("pCombatOutput").a.value += "" + tempHostiles[tpCount] + " is not a valid hostile name. '\n";
            }
        }
    }
    //document.getElementById("pCombatOutput").a.value += "Hello2" + '\n';
    document.getElementById("pCombatOutput").a.value += '\n' + "ROUND " + turnCount + '\n' + '\n';
    turnCount++;
    document.getElementById("pCombatOutput").a.value += "Current Player: " + currentPlayers[0].playerName + '\n';
    // Combat Arena
    numPlayers = currentPlayers.length;
    numHostiles = currentHostiles.length;
    document.getElementById("pCombatOutput").a.value += "Number of Players: " + numPlayers + '\n';
    document.getElementById("pCombatOutput").a.value += "Number of Hostiles: " + numHostiles + '\n';
    gameLoop();
    /*
    gameLoop = setInterval(function(){ 
        //document.getElementById("pCombatOutput").a.value += "Hello3" + '\n';
        // Player's turn
        if (hold === false){
            hold = true;
            for (i=0;i<numPlayers;i++){
                currentPlayer = currentPlayers[i];
                document.getElementById("pCombatOutput").a.value += "Current Player: " + currentPlayer.playerName + '\n';
                if (battleContinue === true){
                    initHostilesSelectListOption("pCombatPlayerTargetSelectOptionsList", 0, numHostiles, currentHostiles);
                    document.getElementById("pCombatOutput").a.value += "Hello4" + '\n';
                    toggle_visibility("pCombatPlayerTargetSelectDiv");
                    document.getElementById("pCombatOutput").a.value += "Hello5" + '\n';
                    gameLoop2 = setInterval(function(){
                        if (pCombatPlayerTargetSelectCheck === true){
                            document.getElementById("pCombatOutput").a.value += "Hello7" + '\n';
                            currentPlayerTargetName = document.getElementById("pCombatPlayerTargetSelectOptionsList").options[document.getElementById("pCombatPlayerTargetSelectOptionsList").selectedIndex].text;
                            for (hCount = 0; hCount < numHostiles; hCount++){
                                if (currentPlayerTargetName === currentHostiles[hCount].hostileName){
                                    currentPlayerTarget = hostiles[hCount];
                                    hCount = numHostiles;
                                }
                            }
                            document.getElementById("pCombatOutput").a.value += "Current Player's Target: " + currentPlayerTarget.hostileName + '\n';
                            toggle_visibility("pCombatPlayerTargetSelectDiv");
                            resetHostilesSelectListOption("pCombatPlayerTargetSelectOptionsList");
                            battleContinue = planetaryCombat(currentPlayer, currentPlayerTarget);
                            document.getElementById("pCombatOutput").a.value += "battleContinue: " + battleContinue + '\n';
                            if (battleContinue === false){
                                currentHostiles.remove(currentPlayerTarget);
                                hostiles.remove(currentPlayerTarget);
                                if (currentHostiles.length > 0){
                                    battleContinue = true;
                                }
                                else {
                                    clearInterval(gameLoop);
                                    i = numPlayers;
                                }
                            }
                            pCombatPlayerTargetSelectCheck = false;
                            clearInterval(gameLoop2);
                        }
                    }, 100);
                }
                
            }
            document.getElementById("pCombatOutput").a.value += "i: " + i + '\n';
            if (i === numPlayers){
                tempArray = pCombatHostilesTurn(currentHostiles, currentPlayers);
                currentHostiles = tempArray[0];
                currentPlayers = tempArray[1];
                hold = false;
            }
        }
    }, 100);
    */
    return;
};

/*
var playerTurn = function(player, callGL) {
    showListOfHostiles(function(currentPlayerTarget) {
        battleContinue = planetaryCombat(currentPlayer, currentPlayerTarget);
        document.getElementById("pCombatOutput").a.value += "battleContinue: " + battleContinue + '\n';
        if (battleContinue === false){
            currentHostiles.remove(currentPlayerTarget);
            hostiles.remove(currentPlayerTarget);
            if (currentHostiles.length > 0){
                battleContinue = true;
            }
        }
       callGL();
    });
};
*/
var showListOfHostiles = function(){
    var currentPlayerTarget;
    // Generate Hostiles List and makes it visible
    initHostilesSelectListOption("pCombatPlayerTargetSelectOptionsList", 0, numHostiles, currentHostiles);
    toggle_visibility("pCombatPlayerTargetSelectDiv");
    document.getElementById("pCombatPlayerTargetSelectButton").addEventListener('click', function(event) {
        //Reset Hostiles List and make it invisible
        turnButtonClicks++;
        currentPlayerTarget = playerHostileSelection();
        toggle_visibility("pCombatPlayerTargetSelectDiv");
        resetHostilesSelectListOption("pCombatPlayerTargetSelectOptionsList");
        playerTurnFC(currentPlayerTarget);
        pCombatPlayerTargetSelectCheck = true;
    });
    return true;
};

var playerHostileSelection = function () {
    var currentPlayerTargetName;
    var currentPlayerTarget;
    // Sets current Hostile to be the selection from list
    currentPlayerTargetName = document.getElementById("pCombatPlayerTargetSelectOptionsList").options[document.getElementById("pCombatPlayerTargetSelectOptionsList").selectedIndex].text;
    for (hCount = 0; hCount < hostiles.length; hCount++){
        if (currentPlayerTargetName === hostiles[hCount].hostileName){
            currentPlayerTarget = hostiles[hCount];
            hCount = hostiles.length;
        }
    }
    document.getElementById("pCombatOutput").a.value += "Current Player's Target: " + currentPlayerTarget.hostileName + '\n';
    return currentPlayerTarget;
};

var waiter = function() {
    var gLoopInterval = setInterval(function(){
        if (pCombatPlayerTargetSelectCheck === true){
            //document.getElementById("pCombatOutput").a.value += '\n' + "GAMELOOPFC CALL!" + '\n' + '\n';
            gameLoopFC();
            pCombatPlayerTargetSelectCheck = false;
            clearInterval(gLoopInterval);
        }
    },1000);
};

var playerTurn = function() {
    selectWeapon();
    //showListOfHostiles();
    waiter();
    return;
};

var playerTurnFC = function(currentPlayerTarget) {
    var currentPlayer = currentPlayers[activePlayer];
    battleContinue = planetaryCombat(currentPlayer, currentPlayerTarget);
    //document.getElementById("pCombatOutput").a.value += "battleContinue: " + battleContinue + '\n';
    if (battleContinue === false){
        currentHostiles.remove(currentPlayerTarget);
        hostiles.remove(currentPlayerTarget);
        if (currentHostiles.length > 0){
            battleContinue = true;
        }
    }
    return;
};

var gameLoopFC = function () {
    var player = currentPlayers[activePlayer];
    // Must reset player's combat modifier or playerWeaponMod is added every turn.
    player.playerCombatModifier = player.playerCombatModifier - player.playerWeaponModifier;
    activePlayer += 1;
    if (activePlayer >= currentPlayers.length) {
       activePlayer = 0;
       // Run Hostiles turn after all players have gone
       pCombatHostilesTurn();
       // Run Refresh at the end of the round
       pCombatRefreshRound();
       if (battleContinue === true){
            document.getElementById("pCombatOutput").a.value += "Current Player: " + currentPlayers[activePlayer].playerName + '\n';
            //document.getElementById("pCombatOutput").a.value += "Turn Button Clicks 1: " + turnButtonClicks + '\n';
            gameLoop();
       }
    }
    else {
        document.getElementById("pCombatOutput").a.value += "Current Player: " + currentPlayers[activePlayer].playerName + '\n';
        //document.getElementById("pCombatOutput").a.value += "Turn Button Clicks 2: " + turnButtonClicks + '\n';
        gameLoop();
    }
    return;
};

var gameLoop = function () {
   playerTurn();
   return;
};

var sleep = function (milliSeconds){
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
}

var pCombatHostilesTurn = function () {
    // Hostile's turn
    //var currentHostiles = chs;
    //var currentPlayers = cps;
    //var battleContinue = true;
    for (j=0;j<numHostiles;j++){
        currentHostile = currentHostiles[j];
        document.getElementById("pCombatOutput").a.value += "Current Hostile: " + currentHostile.hostileName + '\n';
        if (battleContinue === true){
            currentHostileTarget = hostileTargetSelect(currentPlayers);
            //document.getElementById("pCombatOutput").a.value += "Hello9" + '\n';
            battleContinue = planetaryCombat(currentHostile, currentHostileTarget);
            if (battleContinue === false){
                document.getElementById("pCombatOutput").a.value += "Hello10" + '\n';
                currentPlayers.remove(currentHostileTarget);
                players.remove(currentHostileTarget);
                if (currentPlayers.length > 0){
                    battleContinue = true;
                }
            }
        }
    }
    return;
};

var pCombatRefreshRound = function () {
    // Refresh Players/Hostiles
    for (i=0;i<numPlayers;i++){
        APRefresh(currentPlayers[i]);
    }
    for (i=0;i<numHostiles;i++){
        APRefresh(currentHostiles[i]);
    }
    document.getElementById("pCombatOutput").a.value += '\n' + "ROUND " + turnCount + '\n' + '\n';
    turnCount++;
    return;
};

var pCombatPlayerTargetSelectCheckFC = function () {
    pCombatPlayerTargetSelectCheck = true;
};

// Initialize list of hostiles for player to select as a target.
var initHostilesSelectListOption = function(id, min, max, group) {
    var select, i, option;
    select = document.getElementById(id);
    for ( i = min; i < max; i++) {
        option = document.createElement("option");
        option.value = group[i].hostileName;
        option.text = option.value;
        select.appendChild(option);
    }
    //document.getElementById("pCombatOutput").a.value += "Init Hello!" + '\n';
    return;
};

// Reset hostiles list
var resetHostilesSelectListOption = function(id) {
    var select, i;
    select = document.getElementById(id);
    for(i=select.options.length-1;i>=0;i--)
    {
        select.remove(i);
    }
    //document.getElementById("pCombatOutput").a.value += "Reset Hello!" + '\n';
    return;
};

var hostileTargetSelect = function (group) {
    var i;
    var lowestHP = group[0];
    for(i=0;i<group.length-1;i++){
        if (lowestHP.playerHPCurrent > group[i+1].playerHPCurrent){
            lowestHP = group[i+1];
        }
        if (lowestHP.playerHPCurrent === group[i+1].playerHPCurrent){
            if(lowestHP.playerHPMax > group[i+1].playerHPMax){
                lowestHP = group[i+1];
            }
        }
    }
    return lowestHP;
};

function toggle_visibility(id) {
       var e = document.getElementById(id);
       if(e.style.display === "block"){
          e.style.display = "none";
          //document.getElementById("pCombatOutput").a.value += "Toggle Visibility OFF Hello!" + '\n';
       }
       else {
          e.style.display = "block";
          //document.getElementById("pCombatOutput").a.value += "Toggle Visibility ON Hello!" + '\n';
       }
       return false;
}
/* ********************************************************************************************************** */
/* Run simulation */
var run = function () {
    commonGearDeck = commonGearGenerator();
    //var player = function(name, apMax, hpMax, refresh, agility, endurance, expertise, cunning, intelligence, charisma)
    var player1 = player("Carl", 5, 10, 3, 3, 2, 2, 2, 1, 2);
    var player2 = player("Steve", 6, 8, 4, 1, 3, 5, 1, 2, 3);
    //var hostile = (name, apMax, hpMax, refresh, combatMod, physicalDefenseMod, energyDefenseMod, APcost, DMG, DMGType, agility, endurance, expertise)
    var hostile1 = hostile("Hank", 4, 5, 2, 2, 0, 0, 2, 2, "energy", 3, 2, 2);
    var hostile2 = hostile("Bob", 4, 5, 2, 2, 0, 0, 2, 2, "physical", 3, 2, 2);
    players[0] = player1;
    players[1] = player2;
    hostiles[0] = hostile1;
    hostiles[1] = hostile2;
    player1.playerItems.push(commonGearLookup("Six Shooter"));
    player1.playerItems.push(commonGearLookup("Plasma Rifle"));
    player2.playerItems.push(commonGearLookup("Hand Cannon"));
    player2.playerItems.push(commonGearLookup("Mark 1"));
    player1.playerItems.push(commonGearLookup("Accelerator Suit"));
    player2.playerItems.push(commonGearLookup("Tesla Suit"));
    //player2.playerItems.push(commonGearLookup("Apple Sauce"));
    //displayInfo("Carl");
    //displayInfo("Steve");
    //displayInfo("Hank");
    //hostile1.hostileItems[0] = "Balmoen Quantum Disruptor";
    activateItem(player1, "Six Shooter");
    activateItem(player2, "Mark 1");
    activateItem(player2, "Hand Cannon");
    activateItem(player1, "Accelerator Suit");
    activateItem(player2, "Tesla Suit");
    //selectWeapon(player1);
    //selectWeapon(player2);
    //displayInfo("Carl");
    //displayInfo("Steve");
    /*
    for(var i=0; i < 50; i++){
        var battleContinue = true;
        battleContinue = planetaryCombat(player1, hostile1);
        if (battleContinue === false){
            break;
        }
        battleContinue = planetaryCombat(player2, hostile1);
        if (battleContinue === false){
            break;
        }
        battleContinue = planetaryCombat(hostile1, player1);
        if (battleContinue === false){
            break;
        }
        battleContinue = planetaryCombat(hostile1, player2);
        if (battleContinue === false){
            break;
        }
        APRefresh(player1);
        APRefresh(player2);
        APRefresh(hostile1);
    };
    */
    return false;
};

//document.getElementById("pCombatOutput").a.value +=("hitCount: " + hitCount + '\n');

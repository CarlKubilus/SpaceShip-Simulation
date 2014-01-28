// JavaScript Document
//<script language="javascript" type="text/javascript">

/* NEED TO DO:
1: Add player current weapon(s)/active cards;
3: Make it so multiple players can fight multiple hostiles (a super event outside calling multiple "planetary combat" calls)
5: Add exotic/skills/allies decks
6: Fix "Select Weapon" prompts/alerts. Requires GUI.
7: Add armor to "deactivate item"
8: Fix damage received by hostiles and players. Currently not adding up correctly with negatives/positives from armor
*/

/* Test Variable */
var hitCount = 0;

/* Important Data */
var players = [];
var hostiles = [];
var pCombatPlayerTargetSelectCheck = false;
//var gameLoop, gameLoop2;
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
    //document.write(returnArray[0].name + "<br>");
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
    //document.write(returnArray[0].name + "<br>");
    //document.write(returnArray[1].name + "<br>");
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
    //h.hostileWeaponName = "None";
    //h.hostileWeaponModifier = 0;
    h.hostileWeaponAP = APcost;
    h.hostileWeaponDMG = DMG;
    h.hostileWeaponDMGType = DMGType;
    //h.hostileWeaponRefresh = 0;
    h.hostileAgility = agility;
    h.hostileEndurance = endurance;
    h.hostileExpertise = expertise;
    //h.hostileCunning = cunning;
    //h.hostileIntelligence = intelligence;
    h.hostilePhysicalDefenseModifier = physicalDefenseMod;
    h.hostileEnergyDefenseModifier = energyDefenseMod;
    h.hostileCombatModifier = combatMod;
    return h;
};

/* Select Weapon */
var selectWeapon = function (player) {
    var count = 0;
    var choice;
    var currWeapon = new Object();
    alert(player.playerName + " has these weapons to choose from:");
    for (count; count < player.playerWeapons.length; count++){
        alert((count+1) + ") " + player.playerWeapons[count].name);
    }
    //document.write("Select a weapon by number<br>");
    choice = prompt("Which will you choose to use?", "Select a weapon by number.");
    choice = parseInt(choice);
    if (isNaN(choice) || choice > player.playerWeapons.length){
        document.write("You did not choose a valid number!<br>");
        return false;
    }
    else {
        currWeapon = player.playerWeapons[choice-1];
        document.write(player.playerName + " chose " + currWeapon.name + "!<br>");
        player.playerWeaponName = currWeapon.name;
        player.playerWeaponModifier = currWeapon.combatMod;
        player.playerWeaponAP = currWeapon.APCost;
        player.playerWeaponDMG = currWeapon.dmg;
        player.playerWeaponDMGType = currWeapon.dmgType;
        player.playerWeaponRefresh = currWeapon.refreshRate;
        //player.playerWeaponHands = currWeapon.hands;
        player.playerCombatModifier = player.playerCombatModifier + player.playerWeaponModifier;
        return true;
    }
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
    document.write(player.playerName + " does not have the " + item + "<br>");
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
                document.write(player.playerName + " does not have the " + item + "<br>");
                return false;
            }
            else {
                player.handsUsed = player.handsUsed - player.playerAtiveItems[count].hands;
                player.playerActiveItems.splice(count, 1);
                return true;
            }
        }
    }
    document.write(player.playerName + " does not have the " + item + " active!<br>");
    return false;
};

/* Activate Items */
var activateItem = function (player, item){
    var count = 0;
    var count2 = 0;
    //document.write("Current Player: " + player.playerName + "<br>");
    for (count; count < player.playerItems.length; count++){
        //document.write("currItem: " + player.playerItems[count].name + "<br>");
        if (player.playerItems[count].name === item){
            var currItem = player.playerItems[count];
            if (currItem.type2 === "weapon") {
                if (currItem.hands > 0) {
                    if (player.handsUsed === 2) {
                        document.write(player.playerName + " does not have enough free hands!<br>");
                        return false;
                    }
                    else if (player.handsUsed === 1 && currItem.hands === 1){
                        player.playerActiveItems.push(currItem);
                        player.handsUsed++;
                        player.playerWeapons.push(currItem);
                        return true;
                    }
                    else if (player.handsUsed === 1 && currItem.hands === 2){
                        document.write(player.playerName + " does not have enough free hands!<br>");
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
                    document.write(player.playerName + " has too much armor active!<br>");
                    return false;
                }
            }
        }
    }
    document.write(player.playerName + " does not have the " + item + " to activate!<br>");
    return false;
};

/* Common Gear Lookup */
var commonGearLookup = function (name){
    // document.write("Checkpoint 8!");
    // var w = new Object();
    var index = 0;
    var deckLength = commonGearDeck.length;
    //document.write("Length is: " + deckLength + "<br>");
    for (index; index < deckLength; index++){
        //document.write("Current Common Gear: " + commonGearDeck[index].name + "<br>");
        if (commonGearDeck[index].name === name){
            //document.write("Current Common Gear: " + commonGearDeck[index].name + "<br>");
            return commonGearDeck[index];
        }
    }
    document.write("No weapon found!<br>");
    return "None";
}; 

/* Weapon Lookup OLD 
var weaponLookup = function (name){
    // document.write("Checkpoint 8!");
    // var w = new Object();
    var index = 0;
    var returnArray = [];
    var commonWeaponsArrayLength = commonWeaponsArray.length;
    //document.write("Length is: " + commonWeaponsArrayLength);
    var exoticWeaponsArrayLength = exoticWeaponsArray.length;
    for (index = 0; index < commonWeaponsArrayLength; index = index + 7){
        //document.write("Index is: " + index);
        if (commonWeaponsArray[index] === name){
            //document.write("Name is: " + name);
            //document.write("array[0] is: " + commonWeaponsArray[index]);
            //document.write("array[1] is: " + commonWeaponsArray[index+1]);
            //document.write("array[2] is: " + commonWeaponsArray[index+2]);
            //document.write("array[3] is: " + commonWeaponsArray[index+3]);
            //document.write("array[4] is: " + commonWeaponsArray[index+4]);
            //document.write("array[5] is: " + commonWeaponsArray[index+5]);
            //document.write("array[6] is: " + commonWeaponsArray[index+6]);
            returnArray[0] = commonWeaponsArray[index];
            returnArray[1] = commonWeaponsArray[index+1];
            returnArray[2] = commonWeaponsArray[index+2];
            returnArray[3] = commonWeaponsArray[index+3];
            returnArray[4] = commonWeaponsArray[index+4];
            returnArray[5] = commonWeaponsArray[index+5];
            returnArray[6] = commonWeaponsArray[index+6];
            //document.write(returnArray);
            //document.write("Checkpoint 9!");
            return  returnArray;
        }
        else {
            //document.write("No weapon found! " + index);
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
            //document.write("No weapon found! " + index);
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
            //document.write("No players found!");
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
            //document.write("No hostiles found!");
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
            document.write("Player Name: " + currentPlayer.playerName + "<br>");
            document.write("AP Max: " + currentPlayer.playerAPMax + "<br>");
            document.write("AP Current: " + currentPlayer.playerAPCurrent + "<br>");
            document.write("HP Max: " + currentPlayer.playerHPMax + "<br>");
            document.write("HP Current: " + currentPlayer.playerHPCurrent + "<br>");
            document.write("Refresh: " + currentPlayer.playerRefresh + "<br>");
            document.write("Hands Used: " + currentPlayer.handsUsed + "<br>");
            document.write("Agility: " + currentPlayer.playerAgility + "<br>");
            document.write("Endurance: " + currentPlayer.playerEndurance + "<br>");
            document.write("Expertise: " + currentPlayer.playerExpertise + "<br>");
            document.write("Cunning: " + currentPlayer.playerCunning + "<br>");
            document.write("Intelligence: " + currentPlayer.playerIntelligence + "<br>");
            document.write("Charisma: " + currentPlayer.playerCharisma + "<br>");
            document.write("Items: <br>");
            document.write("_______________________________________________<br>");
            var count2 = 0;
            for (count2 = 0; count2 < currentPlayer.playerItems.length; count2++){
                document.write((count2+1) + ") " + currentPlayer.playerItems[count2].name  + "<br>");
            }
            document.write("_______________________________________________<br>");
            document.write("Active Items: <br>");
            document.write("_______________________________________________<br>");
            for (count2 = 0; count2 < currentPlayer.playerActiveItems.length; count2++){
                document.write((count2+1) + ") " + currentPlayer.playerActiveItems[count2].name  + "<br>");
            }
            document.write("_______________________________________________<br>");
            document.write("Weapons: <br>");
            document.write("_______________________________________________<br>");
            for (count2 = 0; count2 < currentPlayer.playerWeapons.length; count2++){
                document.write((count2+1) + ") " + currentPlayer.playerWeapons[count2].name  + "<br>");
            }
            document.write("_______________________________________________<br>");
            document.write("Weapon Name: " + currentPlayer.playerWeaponName + "<br>");
            document.write("Weapon Modifier: " + currentPlayer.playerWeaponModifier + "<br>");
            document.write("Weapon AP Cost: " + currentPlayer.playerWeaponAP + "<br>");
            document.write("Weapon Damage: " + currentPlayer.playerWeaponDMG + "<br>");
            document.write("Weapon Damage Type: " + currentPlayer.playerWeaponDMGType + "<br>");
            document.write("Weapon Refresh: " + currentPlayer.playerWeaponRefresh + "<br>");
            document.write("Combat Modifier: " + currentPlayer.playerCombatModifier + "<br>");
            document.write("Physical Defense Modifier: " + currentPlayer.playerPhysicalDefenseModifier + "<br>");
            document.write("Energy Defense Modifier: " + currentPlayer.playerEnergyDefenseModifier + "<br><br>");
            return;
        }
        else {
            //document.write("No players found!");
        }
    }
    for (count = 0; count < hostiles.length; count++){
        if (name === hostiles[count].hostileName){
            currentHostile = hostiles[count];
            document.write("Player Name: " + currentHostile.hostileName + "<br>");
            document.write("AP Max: " + currentHostile.hostileAPMax + "<br>");
            document.write("AP Current: " + currentHostile.hostileAPCurrent + "<br>");
            document.write("HP Max: " + currentHostile.hostileHPMax + "<br>");
            document.write("HP Current: " + currentHostile.hostileHPCurrent + "<br>");
            document.write("Refresh: " + currentHostile.hostileRefresh + "<br>");
            document.write("AP Cost: " + currentHostile.hostileWeaponAP + "<br>");
            document.write("Damage: " + currentHostile.hostileWeaponDMG + "<br>");
            document.write("Damage Type: " + currentHostile.hostileWeaponDMGType + "<br>");
            document.write("Agility: " + currentHostile.hostileAgility + "<br>");
            document.write("Endurance: " + currentHostile.hostileEndurance + "<br>");
            document.write("Expertise: " + currentHostile.hostileExpertise + "<br>");
            document.write("Combat Modifier: " + currentHostile.hostileCombatModifier + "<br>");
            document.write("Physical Defense Modifier: " + currentHostile.hostilePhysicalDefenseModifier + "<br>");
            document.write("Energy Defense Modifier: " + currentHostile.hostileEnergyDefenseModifier + "<br><br>");
            return;
        }
        else {
            //document.write("No hostiles found!");
        }
    }
    return;
};
OLD VERSION ABOVE */
/* 12-sided Die */
var dieRoll = function () {
    var roll = Math.round(Math.random() * 12) % 12 + 1;
    //document.write("Roll: " + roll + "<br>");
    return roll;
};


/* Generate To Hit */
var toHit = function (attacker, defender){
    var offense = 0;
    var defense = 0;
    var result = 0;
    var curDie;
    if (attacker.type === "player"){
        //document.write("player Expertise: " + attacker.playerExpertise + "<br>");
        //document.write("player weapon mod: " + attacker.playerWeaponModifier + "<br>");
        offense = attacker.playerExpertise + attacker.playerCombatModifier;
        defense = defender.hostileAgility;
        curDie = dieRoll();
        result = offense + curDie - defense;
        //document.write("Dieroll: " + curDie + "<br>");
        //document.write("Offense: " + offense + "<br>");
        //document.write("Defense: " + defense + "<br>");
        //document.write("Result: " + result + "<br>");
        if (result >= 10){
            document.getElementById("pCombatOutput").a.value += (attacker.playerName + " hit " + defender.hostileName + "!" + '\n');
            //document.write("Player successfully hit hostile!<br>");
            return true;
        }
        else {
            return false;
        }
    }
    else {
        //document.write("hostile Expertise: " + attacker.hostileExpertise + "<br>");
        //document.write("hostile weapon mod: " + attacker.hostileWeaponModifier + "<br>");
        offense = attacker.hostileExpertise + attacker.hostileCombatModifier;
        defense = defender.playerAgility;
        curDie = dieRoll();
        result = offense + curDie - defense;
        //document.write("Dieroll: " + curDie + "<br>");
        //document.write("Offense: " + offense + "<br>");
        //document.write("Defense: " + defense + "<br>");
        //document.write("Result: " + result + "<br>");
        if (result >= 10){
            document.getElementById("pCombatOutput").a.value += (attacker.hostileName + " hit " + defender.playerName + "!" + '\n');
            //document.write("Hostile successfully hit player!<br>");
            return true;
        }
        else {
            return false;
        }
    }
};

/* Planetary Combat Function */
var planetaryCombat = function (attacker, defender){
    var damageDealt = 0;
    var damageReduction = 0;
    if (APCheck(attacker)){
        var toHitSuccess = toHit(attacker, defender);
        if (toHitSuccess){
            hitCount++;
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
                    defender.hostileHPCurrent = defender.hostileHPCurrent - damageDealt;
                    if (deathCheck(defender)){
                        return false;
                    }
                    else {
                        document.getElementById("pCombatOutput").a.value += (defender.hostileName + " current HP: " + defender.hostileHPCurrent + '\n');
                        //document.write("Hostile Current HP: " + defender.hostileHPCurrent + "<br>");
                        return true;
                    }
                }
                else {
                    damageDealt = attacker.playerWeaponDMG - defender.hostileEndurance + damageReduction;
                    //document.write("player weapon dmg: " + attacker.playerWeaponDMG + "<br>");
                    //document.write("hostile endurance: " + defender.hostileEndurance + "<br>");
                    defender.hostileHPCurrent = defender.hostileHPCurrent - damageDealt;
                    if (deathCheck(defender)){
                        return false;
                    }
                    else{
                        document.getElementById("pCombatOutput").a.value += (defender.hostileName + " current HP: " + defender.hostileHPCurrent + '\n');
                        //document.write("Hostile Current HP: " + defender.hostileHPCurrent + "<br>");
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
                    defender.playerHPCurrent = defender.playerHPCurrent - damageDealt;
                    if (deathCheck(defender)){
                        return false;
                    }
                    else {
                        document.getElementById("pCombatOutput").a.value += (defender.playerName + " current HP: " + defender.playerHPCurrent + '\n');
                        //document.write("Player Current HP: " + defender.playerHPCurrent + "<br>");
                        return true;
                    }
                }
                else {
                    damageDealt = attacker.hostileWeaponDMG - defender.playerEndurance + damageReduction;
                    defender.playerHPCurrent = defender.playerHPCurrent - damageDealt;
                    if (deathCheck(defender)){
                        return false;
                    }
                    else{
                        document.getElementById("pCombatOutput").a.value += (defender.playerName + " current HP: " + defender.playerHPCurrent + '\n');
                        //document.write("Player Current HP: " + defender.playerHPCurrent + "<br>");
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
            //document.write("Missed!<br>");
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
            //document.write("Player's Current AP after attack: " + attacker.playerAPCurrent + "<br>");
            return true;
        }
        else {
            document.getElementById("pCombatOutput").a.value += (attacker.playerName + " does not have enough AP!" + '\n');
            //document.write("Player does not have enough AP!<br>");
            return false;
        }
    }
    else {
        if (attacker.hostileAPCurrent >= attacker.hostileWeaponAP){
            attacker.hostileAPCurrent = attacker.hostileAPCurrent - attacker.hostileWeaponAP;
            document.getElementById("pCombatOutput").a.value += (attacker.hostileName + " current AP after attack: " + attacker.hostileAPCurrent + '\n');
            //document.write("Hostile's Current AP after attack: " + attacker.hostileAPCurrent + "<br>");
            return true;
        }
        else {
            document.getElementById("pCombatOutput").a.value += (attacker.hostileName + " does not have enough AP!" + '\n');
            //document.write("Hostile does not have enough AP!<br>");
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
        //document.write("Player is Refreshed! Current AP is: " + user.playerAPCurrent + "<br>");
    }
    else{
        user.hostileAPCurrent = user.hostileAPCurrent + user.hostileRefresh;
        if (user.hostileAPCurrent > user.hostileAPMax) {
            user.hostileAPCurrent = user.hostileAPMax;
        }
        document.getElementById("pCombatOutput").a.value += (user.hostileName + " is Refreshed! Current AP is: " + user.hostileAPCurrent + '\n');
        //document.write("Hostile is Refreshed! Current AP is: " + user.hostileAPCurrent + "<br>");
    }
};

/* Check Death */
var deathCheck = function (user) {
    if (user.type === "player"){
        if (user.playerHPCurrent <= 0){
            document.getElementById("pCombatOutput").a.value += (user.playerName + " has died!" + '\n');
            //document.write("Player has died!");
            return true;
        }
        else {
            return false;
        }
    }
    else {
        if (user.hostileHPCurrent <= 0){
            document.getElementById("pCombatOutput").a.value += (user.hostileName + " has died!" + '\n');
            //document.write("Hostile has died!<br>");
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
    document.getElementById("pCombatOutput").a.value += "Hello1" + '\n';
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
    document.getElementById("pCombatOutput").a.value += "Hello2" + '\n';
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
    //rewrites output to indicate while loop has ended
    //document.getElementById("pCombatOutput").a.value = "Hello11" + '\n';
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
var showListOfHostiles = function(callback){
    var currentPlayerTargetName;
    var currentPlayerTarget;
    // Generate Hostiles List and makes it visible
    initHostilesSelectListOption("pCombatPlayerTargetSelectOptionsList", 0, numHostiles, currentHostiles);
    toggle_visibility("pCombatPlayerTargetSelectDiv");
    // Sets current Hostile to be the selection from list
    currentPlayerTargetName = document.getElementById("pCombatPlayerTargetSelectOptionsList").options[document.getElementById("pCombatPlayerTargetSelectOptionsList").selectedIndex].text;
    for (hCount = 0; hCount < numHostiles; hCount++){
        if (currentPlayerTargetName === currentHostiles[hCount].hostileName){
            currentPlayerTarget = hostiles[hCount];
            hCount = numHostiles;
        }
    }
    document.getElementById("pCombatOutput").a.value += "Current Player's Target: " + currentPlayerTarget.hostileName + '\n';
    document.getElementById("pCombatPlayerTargetSelectButton").addEventListener('click', function(event) {
        //Reset Hostiles List and make it invisible
        toggle_visibility("pCombatPlayerTargetSelectDiv");
        resetHostilesSelectListOption("pCombatPlayerTargetSelectOptionsList");
        callback(currentPlayerTarget);
    });
};

var playerTurn = function(player, callGL) {
    showListOfHostiles(playerTurnFC(a));
    gameLoopFC();
};

var playerTurnFC = function(currentPlayerTarget) {
    var currentPlayer = players[activePlayer];
    battleContinue = planetaryCombat(currentPlayer, currentPlayerTarget);
    document.getElementById("pCombatOutput").a.value += "battleContinue: " + battleContinue + '\n';
    if (battleContinue === false){
        currentHostiles.remove(currentPlayerTarget);
        hostiles.remove(currentPlayerTarget);
        if (currentHostiles.length > 0){
            battleContinue = true;
        }
    }
};

/*
var gameLoop = function () {
   playerTurn(players[activePlayer], function() {
       activePlayer += 1;
       if (activePlayer >= players.length) {
           activePlayer = 0;
           // Run Hostiles turn after all players have gone
           pCombatHostilesTurn();
           // Run Refresh at the end of the round
           pCombatRefreshRound();
       }
       else {
        gameLoop();
       }
   });
};
*/

var gameLoop = function () {
   playerTurn(players[activePlayer], gameLoopFC());
};

var gameLoopFC = function () {
    activePlayer += 1;
   if (activePlayer >= players.length) {
       activePlayer = 0;
       // Run Hostiles turn after all players have gone
       pCombatHostilesTurn();
       // Run Refresh at the end of the round
       pCombatRefreshRound();
   }
   /*else {
    gameLoop();
   }
   */
};

var pCombatHostilesTurn = function () {
    // Hostile's turn
    //var currentHostiles = chs;
    //var currentPlayers = cps;
    var battleContinue = true;
    for (j=0;j<numHostiles;j++){
        currentHostile = currentHostiles[j];
        document.getElementById("pCombatOutput").a.value += "Current Hostile: " + currentHostile.hostileName + '\n';
        if (battleContinue === true){
            currentHostileTarget = hostileTargetSelect(currentPlayers);
            document.getElementById("pCombatOutput").a.value += "Hello9" + '\n';
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
    document.getElementById("pCombatOutput").a.value += "Init Hello!" + '\n';
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
    document.getElementById("pCombatOutput").a.value += "Reset Hello!" + '\n';
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
       }
       else {
          e.style.display = "block";
       }
       document.getElementById("pCombatOutput").a.value += "Toggle Visibility Hello!" + '\n';
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
    var hostile1 = hostile("Hank", 4, 5, 2, 2, -1, 0, 2, 2, "energy", 3, 2, 2);
    var hostile2 = hostile("Bob", 4, 5, 2, 2, -1, 0, 2, 2, "physical", 3, 2, 2);
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

//document.write("hitCount: " + hitCount + "<br>");

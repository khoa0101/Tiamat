const Game = require("./game.js");

class GameView{
  constructor(game){
    this.game = game;
  }

  setupView(){
    const grid = document.getElementById('game-view');
    const ap = document.getElementById('ap-display');
    const info = document.getElementById('info-display');
    const endTurn = document.createElement('button');
    const returnToMenu = document.createElement('button');
    ap.innerHTML = `Action Point (AP): ${this.game.currentTurn.AP}/${this.game.currentTurn.APMax}`;
    endTurn.setAttribute('id', 'end-turn');
    endTurn.innerHTML = "End Turn"
    returnToMenu.setAttribute('id', 'return-to-menu');
    returnToMenu.innerHTML = "Return to menu";
    const navBar = document.getElementById('nav-bar');
    const turns = document.getElementById('turn-display');
    const ally = document.getElementById('ally-team');
    const enemy = document.getElementById('enemy-team');
    navBar.append(returnToMenu);
    grid.append(endTurn);
    this.infoDisplay(info);
    for (let i = 0; i < this.game.players.length; i++){
      this.game.players[i].render(ally, i);
    }
    for (let i = 0; i < this.game.enemies.length; i++){
      this.game.enemies[i].render(enemy, i);
    }
    for (let i = 0; i < this.game.turns.length; i++){
      turns.appendChild(this.game.turns[i].renderPortrait());
    }
    returnToMenu.addEventListener('click', () => {
      const menuModal = document.getElementsByClassName("menu")[0];
      const startButton = document.getElementById("start");
      menuModal.classList.remove("hidden");
      if (this.game.start){
        startButton.value = "";
      }
    })
    endTurn.addEventListener('click', () => {
      this.game.nextTurn();
      for (let i = 0; i < this.game.players.length; i++){
        this.game.players[i].renderTurn(i);
      }
      for (let i = 0; i < this.game.enemies.length; i++){
        this.game.enemies[i].renderTurn(i);
      }
      ap.innerHTML = `Action Point (AP): ${this.game.currentTurn.AP}/${this.game.currentTurn.APMax}`;
      if (this.game.currentTurn.side === `enemy`){
        ap.classList.add('hide');
      } else {
        ap.classList.remove('hide');
      }
      const temp = turns.firstChild;
      turns.removeChild(turns.firstChild);
      turns.appendChild(temp);
    });

    ally.childNodes.forEach( child => {
      child.addEventListener('click', () => {
        this.game.players[child.getAttributeNode('value').value].printInfo(); 
      })
    });

    enemy.childNodes.forEach( child => {
      child.addEventListener('click', () => {
        this.game.enemies[child.getAttributeNode('value').value].printInfo(); 
      })
    });

  }

  infoDisplay(el){
    const ul = document.createElement('ul');
    const img = document.createElement('img');
    const level = document.createElement('li');
    const charType = document.createElement('h3');
    const maxHealth = document.createElement('li');
    const armor = document.createElement('li');
    const barrier = document.createElement(`li`);
    const initiative = document.createElement(`li`);
    const critChance = document.createElement(`li`);
    const critDamage = document.createElement(`li`);
    const damageMod = document.createElement(`li`);
    const healMod = document.createElement(`li`);
    const cdMod = document.createElement(`li`);
    const lifesteal = document.createElement(`li`);
    const regen = document.createElement(`li`);
    const physicalRes = document.createElement(`li`);
    const fireRes = document.createElement(`li`);
    const waterRes = document.createElement(`li`);
    const lightningRes = document.createElement(`li`);
    const poisonRes = document.createElement(`li`);
    const energyRes = document.createElement(`li`);
    const holyRes = document.createElement(`li`);
    const darkRes = document.createElement(`li`);
    const physicalMod = document.createElement(`li`);
    const fireMod = document.createElement(`li`);
    const waterMod = document.createElement(`li`);
    const lightningMod = document.createElement(`li`);
    const poisonMod = document.createElement(`li`);
    const energyMod = document.createElement(`li`);
    const holyMod = document.createElement(`li`);
    const darkMod = document.createElement(`li`);
    const talents = document.createElement(`li`);
    const conditions = document.createElement(`li`);
    
    ul.classList.add('info-container');
    ul.classList.add('hidden');
    img.classList.add('info-image');
    level.setAttribute('id', 'level');
    charType.setAttribute('id', 'charType');
    maxHealth.setAttribute('id', 'maxHealth');
    armor.setAttribute('id', 'armor');
    barrier.setAttribute('id', 'barrier');
    initiative.setAttribute('id', 'initiative');
    critChance.setAttribute('id', 'critChance');
    critDamage.setAttribute('id', 'critDamage');
    damageMod.setAttribute('id', 'damageMod');
    healMod.setAttribute('id', 'healMod');
    cdMod.setAttribute('id', 'cdMod');
    lifesteal.setAttribute('id', 'lifesteal');
    regen.setAttribute('id', 'regen');
    physicalRes.setAttribute('id', "physicalRes");
    fireRes.setAttribute('id', "fireRes");
    waterRes.setAttribute('id', "waterRes");
    lightningRes.setAttribute('id', "lightningRes");
    poisonRes.setAttribute('id', "poisonRes");
    energyRes.setAttribute('id', "energyRes");
    holyRes.setAttribute('id', "holyRes");
    darkRes.setAttribute('id', "darkRes");
    physicalMod.setAttribute('id', "physicalMod");
    fireMod.setAttribute('id', "fireMod");
    waterMod.setAttribute('id', "waterMod");
    lightningMod.setAttribute('id', "lightningMod");
    poisonMod.setAttribute('id', "poisonMod");
    energyMod.setAttribute('id', "energyMod");
    holyMod.setAttribute('id', "holyMod");
    darkMod.setAttribute('id', "darkMod")
    talents.setAttribute('id', "talents");
    conditions.setAttribute('id', "conditions");
    
    ul.appendChild(charType);
    ul.appendChild(level);
    ul.appendChild(maxHealth);
    ul.appendChild(armor);
    ul.appendChild(barrier);
    ul.appendChild(initiative);
    ul.appendChild(critChance);
    ul.appendChild(critDamage);
    ul.appendChild(damageMod);
    ul.appendChild(healMod);
    ul.appendChild(cdMod);
    ul.appendChild(lifesteal);
    ul.appendChild(regen);
    ul.appendChild(physicalRes);
    ul.appendChild(fireRes);
    ul.appendChild(waterRes);
    ul.appendChild(lightningRes);
    ul.appendChild(poisonRes);
    ul.appendChild(energyRes);
    ul.appendChild(holyRes);
    ul.appendChild(darkRes);
    ul.appendChild(physicalMod);
    ul.appendChild(fireMod);
    ul.appendChild(waterMod);
    ul.appendChild(lightningMod);
    ul.appendChild(poisonMod);
    ul.appendChild(energyMod);
    ul.appendChild(holyMod);
    ul.appendChild(darkMod);
    ul.appendChild(talents);
    ul.appendChild(conditions);
    el.appendChild(img);
    el.appendChild(ul);
  }
}

module.exports = GameView;
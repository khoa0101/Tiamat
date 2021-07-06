const Game = require("./game.js");

class GameView{
  constructor(game){
    this.game = game;
  }

  setupView(){
    console.log(GAME);
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
    const ally = document.getElementById('player-team');
    const enemy = document.getElementById('enemy-team');
    const currentTurn = this.game.currentTurn;
    navBar.append(returnToMenu);
    grid.append(endTurn);
    this.charInfoDisplay(info);
    this.skillInfoDisplay(info);
    for (let i = 0; i < this.game.players.length; i++){
      this.game.players[i].render(ally, i);
    }
    for (let i = 0; i < this.game.enemies.length; i++){
      this.game.enemies[i].render(enemy, i);
    }
    for (let i = 0; i < this.game.turns.length; i++){
      turns.appendChild(this.game.turns[i].renderPortrait());
    }
    
    if (currentTurn.side === 'player'){
      const currentTurnSkills = document.getElementById(`${currentTurn.charType}-${currentTurn.id}-skills`);
      this.currentTurn(currentTurnSkills);
    }

    const aiTurn = function(){
      endTurn.disabled = true;
      let currentTurn = GAME.currentTurn;
      let done = false;
      while(!done){
        if (currentTurn.AP < 2) done = true 
        else {
          let skills = currentTurn.skills;
          let skillIndex = Math.floor(Math.random() * (skills.length - 1));
          while (currentTurn.AP > 1 && skills[skillIndex].AP > currentTurn.AP){
            skillIndex = Math.floor(Math.random() * (skills.length - 1));
          }
          let skillToUse = skills[skillIndex];
          let targets, targetIndex;
          currentTurn.AP -= skillToUse.AP;
          if (skillToUse.targetType === 'enemy'){
            if (skillToUse.targetNum < 2){
              targets = GAME.players;
              targetIndex = Math.floor(Math.random() * targets.length);
              while (!targets[targetIndex].alive){
                targetIndex = targetIndex = Math.floor(Math.random() * targets.length);
              }
              skillToUse.performSkill(targets[targetIndex]);
            } else {
              targets.forEach(target => {
                skillToUse.performSkill(target);
              })
            }
          } else {
            if (skillToUse.targetNum < 2){
              targets = GAME.enemies;
              targetIndex = Math.floor(Math.random() * targets.length);
              while (!targets[targetIndex].alive){
                targetIndex = targetIndex = Math.floor(Math.random() * targets.length);
              }
              skillToUse.performSkill(targets[targetIndex]);
            } else {
              targets.forEach(target => {
                skillToUse.performSkill(target);
              })
            }
          }       
        }
      }
      GAME.nextTurn();
      GAME_VIEW.renderFrame();
      
      if (!GAME.gameOver && GAME.currentTurn.side === 'enemy') setTimeout(aiTurn, 1000);
      else if (GAME.currentTurn.side === 'player'){
        endTurn.disabled = false;
        const currentTurnSkills = document.getElementById(`${GAME.currentTurn.charType}-${GAME.currentTurn.id}-skills`);
        GAME_VIEW.currentTurn(currentTurnSkills);
      }
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
      let currentTurn = this.game.currentTurn;

      if (currentTurn.side === 'player'){
        const currentTurnSkills = document.getElementById(`${currentTurn.charType}-${currentTurn.id}-skills`);
        this.endTurn(currentTurnSkills);
      }
      
      this.game.nextTurn();

      currentTurn = this.game.currentTurn;

      if (currentTurn.side === 'player'){
        const currentTurnSkills = document.getElementById(`${currentTurn.charType}-${currentTurn.id}-skills`);
        this.currentTurn(currentTurnSkills);
      } else {
        if (!GAME.gameOver && currentTurn.alive){
          aiTurn();
        }
      }
      
      ap.innerHTML = `Action Point (AP): ${this.game.currentTurn.AP}/${this.game.currentTurn.APMax}`;
      if (this.game.currentTurn.side === `enemy`){
        ap.classList.add('hide');
      } else {
        ap.classList.remove('hide');
      }
      
      this.renderFrame();
    });

    ally.childNodes.forEach( child => {
      const charIndex = child.getAttributeNode('value').value;
      child.childNodes[0].addEventListener('click', () => {
        this.game.players[charIndex].printInfo(); 
      })
      child.childNodes[2].childNodes.forEach( li => {
        li.addEventListener('click', () => {
          this.game.players[charIndex].skills[li.getAttributeNode('value').value].printInfo();
        })
      })
    });

    enemy.childNodes.forEach( child => {
      child.childNodes[0].addEventListener('click', () => {
        this.game.enemies[child.getAttributeNode('value').value].printInfo(); 
      })
    });
  }

  renderFrame(){
    const ap = document.getElementById('ap-display');
    const turns = document.getElementById('turn-display');
    ap.innerHTML = `Action Point (AP): ${this.game.currentTurn.AP}/${this.game.currentTurn.APMax}`;
    
    if (this.game.currentTurn.side === `enemy`){
      ap.classList.add('hide');
    } else {
      ap.classList.remove('hide');
    }
    for (let i = 0; i < GAME.players.length; i++){
      GAME.players[i].renderFrame(i);
    }
    for (let i = 0; i < GAME.enemies.length; i++){
      GAME.enemies[i].renderFrame(i);
    }

    turns.innerHTML = "";

    GAME.checkTurn();

    for (let i = 0; i < this.game.turns.length; i++){
      turns.appendChild(this.game.turns[i].renderPortrait());
    }

    if (GAME.win()){
      alert('You won!');
    } else if (GAME.lose()){
      alert('You lose!');
    }
  }

  charInfoDisplay(el){
    const ul = document.createElement('ul');
    const img = document.createElement('img');
    const level = document.createElement('li');
    const charType = document.createElement('h3');
    const maxHealth = document.createElement('li');
    const armor = document.createElement('li');
    const barrier = document.createElement(`li`);
    const power = document.createElement(`li`);
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
    
    ul.classList.add('info-container', 'hidden');
    img.classList.add('info-image', 'hidden');
    level.setAttribute('id', 'level');
    charType.setAttribute('id', 'charType');
    maxHealth.setAttribute('id', 'maxHealth');
    armor.setAttribute('id', 'armor');
    barrier.setAttribute('id', 'barrier');
    power.setAttribute('id', 'power');
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
    ul.appendChild(power);
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

  skillInfoDisplay(el){
    const div = document.createElement('div');
    const titleContainer = document.createElement('div');
    const title = document.createElement('h4');
    const cost = document.createElement('i');
    const cooldown = document.createElement('i');
    const description = document.createElement('p');
    
    title.setAttribute('id', 'skill-name');
    cost.setAttribute('id', 'skill-cost');
    cooldown.setAttribute('id', 'skill-cooldown');
    titleContainer.setAttribute('id', 'skill-name-container');
    description.setAttribute('id', 'skill-description');
    div.classList.add('skill-info-container', 'hidden');

    titleContainer.appendChild(title);
    titleContainer.appendChild(cost);
    titleContainer.appendChild(cooldown);
    div.appendChild(titleContainer);
    div.appendChild(description);
    el.appendChild(div);
  }

  currentTurn(el){
    el.childNodes.forEach((child) => {
      const index = child.getAttributeNode('value').value;
      const skill = this.game.currentTurn.skills[index];
      if (this.game.currentTurn.alive && this.game.currentTurn.AP >= skill.AP && skill.remainingCD < 1){
        child.classList.add('active');
        child.addEventListener('click', skill.renderTarget);
      }
      else {
        child.classList.remove('active');
        child.removeEventListener('click', skill.renderTarget);
      }
    })
  }

  endTurn(el){
    el.childNodes.forEach((child) => {
      const index = child.getAttributeNode('value').value;
      const skill = this.game.currentTurn.skills[index];
      child.classList.remove('active');
      child.removeEventListener('click', skill.renderTarget);
    })
  }
}

module.exports = GameView;
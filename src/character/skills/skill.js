class Skill {
  constructor(character, image, name, description, AP, cd, targetNum, targetType, basePower, scaling, 
    affinity = 'none', status = []){
    this.character = character;
    this.image = image;
    this.name = name;
    this.description = description;
    this.AP = AP;
    this.cd = cd;
    this.remainingCD = 0;
    this.basePower = basePower;
    this.scaling = scaling;
    this.affinity = affinity;
    this.targetNum = targetNum;
    this.targetType = targetType;
    this.status = status;
    this.renderTarget = this.renderTarget.bind(this);
    this.performSkill = this.performSkill.bind(this);
  }

  printInfo(){
    const div = document.getElementsByClassName('skill-info-container')[0];
    const img = document.getElementsByClassName('info-image')[0];
    const ul = document.getElementsByClassName('info-container')[0];
    const title = document.getElementById('skill-name');
    const cost = document.getElementById('skill-cost');
    const cooldown = document.getElementById('skill-cooldown');
    const description = document.getElementById('skill-description');
    
    div.classList.remove('hidden');
    // img.classList.add('hidden');
    ul.classList.add('hidden');

    img.src = this.image;
    title.innerHTML = this.name;
    cost.innerHTML = `AP: ${this.AP}`;
    cooldown.innerHTML = `Cooldown: ${this.cd < 1 ? "none" : this.cd < 2 ? `${this.cd} turn` : `${this.cd} turns`}.`
    description.innerHTML = this.description;
  }

  performSkill(target){
    if (this.targetType === 'enemy'){
      const damage = this.character.damageCal(this.affinity, this.scaling, this.basePower);
      const resistedDamage = target.takeDamage(this.affinity, damage);
    } else {
      const heal = this.character.healCal(this.scaling, this.basePower);
      target.heal(heal);
    }

    if (GAME.currentTurn.side === 'player'){
      const currentTurnSkills = document.getElementById(`${GAME.currentTurn.charType}-${GAME.currentTurn.id}-skills`);
      GAME_VIEW.currentTurn(currentTurnSkills);
    }

    GAME_VIEW.renderFrame();
  }

  renderTarget(e){
      e.target.removeEventListener('click', this.renderTarget);
      if (this.targetType === 'enemy'){
        this.fetchTarget('enemy-team', GAME.enemies);
      }
      else {
        this.fetchTarget('player-team', GAME.players);
      }
  }

  fetchTarget(id, side){
    const team = document.getElementById(id);
    const skill = this;

    const clickSingleTarget = function(e){
      skill.character.AP -= skill.AP;
      skill.remainingCD += skill.cd;
      const index = e.target.parentNode.getAttributeNode('value').value;
      if (skill.targetType === 'enemy'){
        skill.performSkill(GAME.enemies[index]);
      } else {
        skill.performSkill(GAME.players[index]);
      }

      team.childNodes.forEach((el) => {
        el.childNodes[0].classList.remove('single-target');
        el.childNodes[0].removeEventListener('click', clickSingleTarget);
      });
    }

    const clickAllTarget = function(e){
      skill.character.AP -= skill.AP;
      skill.remainingCD += skill.cd;
      if (skill.targetType === 'enemy'){
        GAME.enemies.forEach(target =>{
          skill.performSkill(target);
        })
      } else {
        GAME.players.forEach(target =>{
          skill.performSkill(target);
        })
      }
      team.childNodes.forEach((child) => {
        child.childNodes[0].classList.remove('all-targets');
        child.childNodes[0].removeEventListener('click', clickAllTarget);
      });
    }

    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      const currentTurnSkills = document.getElementById(`${GAME.currentTurn.charType}-${GAME.currentTurn.id}-skills`);
      team.childNodes.forEach((child) => {
        child.childNodes[0].classList.remove('all-targets');
        child.childNodes[0].removeEventListener('click', clickAllTarget);
        child.childNodes[0].classList.remove('single-target');
        child.childNodes[0].removeEventListener('click', clickSingleTarget);
        GAME_VIEW.currentTurn(currentTurnSkills);
      });
    })

    if (this.AP <= this.character.AP){
      if (this.targetNum < 2){
        team.childNodes.forEach((child) => {
          const index = child.getAttributeNode('value').value;
          if (side[index].alive){
            child.childNodes[0].classList.add('single-target');
            child.childNodes[0].addEventListener('click', clickSingleTarget);
          }
        });
      } else {
        team.childNodes.forEach((child) => {
          const index = child.getAttributeNode('value').value;
            if (side[index].alive){
              child.childNodes[0].classList.add('all-targets');
              child.childNodes[0].addEventListener('click', clickAllTarget);
            }
          }
        )
      }
    }
  }
}

module.exports = Skill;
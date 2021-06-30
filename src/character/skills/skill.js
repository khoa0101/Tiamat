class Skill {
  constructor(character, name, description, AP, cd, targetNum, targetType, basePower, scaling, 
    affinity = 'none', status = []){
    this.character = character;
    this.name = name;
    this.description = description;
    this.AP = AP;
    this.cd = cd;
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
    const description = document.getElementById('skill-description');
    
    div.classList.remove('hidden');
    img.classList.add('hidden');
    ul.classList.add('hidden');

    title.innerHTML = this.name;
    cost.innerHTML = `AP: ${this.AP}`;
    description.innerHTML = this.description;
  }

  performSkill(target){
    this.character.AP -= this.AP;
    if (this.targetType === 'enemy'){
      const damage = this.character.damageCal(this.affinity, this.scaling, this.basePower);
      target.takeDamage(this.affinity, damage);
    } else {
      const heal = this.character.healCal(this.scaling, this.basePower);
      target.heal(heal);
    }

    if (GAME.currentTurn.side === 'player'){
      const currentTurnSkills = document.getElementById(`${GAME.currentTurn.charType}-${GAME.currentTurn.id}-skills`);
      GAME_VIEW.currentTurn(currentTurnSkills);
    }
  }

  renderTarget(){
      if (this.targetType === 'enemy'){
        this.fetchTarget('enemy-team', this.targetType);
      } 
      else {
        this.fetchTarget('player-team', this.targetType);
      }
  }

  fetchTarget(id){
    const team = document.getElementById(id);
    const skill = this;

    const clickSingleTarget = function(e){
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

      GAME_VIEW.renderFrame();
    }

    const clickAllTarget = function(e){
      if (this.targetType === 'enemy'){
        GAME.enemies.forEach(target =>{
          this.performSkill(target);
        })
      } else {
        GAME.players.forEach(target =>{
          this.performSkill(target);
        })
      }
      team.childNodes.forEach((child) => {
        child.childNodes[0].classList.remove('all-target');
        child.childNodes[0].removeEventListener('click', clickAllTarget);
      });

      GAME_VIEW.renderFrame();
    }

    if (this.AP <= this.character.AP){
      if (this.targetNum < 2){
        team.childNodes.forEach((child) => {
          child.childNodes[0].classList.add('single-target');
          child.childNodes[0].addEventListener('click', clickSingleTarget);
        });
      } else {
        team.childNodes.forEach((child) => {
          child.childNodes[0].classList.add('all-targets');
          child.addEventListener('click', clickAllTarget);
          }
        )
      }
    }
  }
}

module.exports = Skill;
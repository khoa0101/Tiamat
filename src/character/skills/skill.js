class Skill {
  constructor(character, name, description, AP, targetNum, targetType, basePower, scaling, 
    affinity = 'none', status = []){
    this.character = character;
    this.name = name;
    this.description = description;
    this.AP = AP;
    this.basePower = basePower;
    this.scaling = scaling;
    this.affinity = affinity;
    this.targetNum = targetNum;
    this.targetType = targetType;
    this.status = status;
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
    if (this.targetType === 'enemy'){
      const damage = this.character.damageCal(this.affinity, this.scaling, this.basePower);
      target.takeDamage(this.affinity, damage);
    } else {
      const heal = this.character.healCal(this.scaling, this.basePower);
      target.heal(heal);
    }
  }

  getTarget(){
    console.log("click!");
    if (this.targetType === 'enemy'){
    } 
    else {
      console.log(document.getElementById('player-team'));
    }
  } 
  
}

module.exports = Skill;
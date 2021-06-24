class Skill {
  constructor(name, description, AP, targetSize, targetType){
    this.name = name;
    this.description = description;
    this.AP = AP;
    this.targetSize = targetSize;
    this.targetType = targetType;
  }

  printInfo(){
    const div = document.getElementsByClassName('skill-info-container')[0];
    const charInfo = document.getElementById('info-display');
    const title = document.getElementById('skill-name');
    const cost = document.getElementById('skill-cost');
    const description = document.getElementById('skill-description');
    
    div.classList.remove('hidden');
    charInfo.classList.add('hidden');

    title.innerHTML = this.name;
    cost.innerHTML = this.AP;
    description.innerHTML = this.description;
  }
}

module.exports = Skill;
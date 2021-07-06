const Skill = require(`./skill.js`);

class ArmorBoost extends Skill {
  constructor(char, image, name, description, AP, cd, targetNum, targetType = "self", basePower, scaling = 0, affinity = 0, status = 0){
    super(char, image, name, description, AP, cd, targetNum, targetType, basePower, scaling, affinity, status)
  }

  performSkill(target){
    let total = this.character.healCal(this.scaling, this.basePower);
    target.armor += total;
    target.maxArmor = target.armor;

    if (GAME.currentTurn.side === 'player'){
      const currentTurnSkills = document.getElementById(`${GAME.currentTurn.charType}-${GAME.currentTurn.id}-skills`);
      GAME_VIEW.currentTurn(currentTurnSkills);
    }
    
    GAME_VIEW.renderFrame();
  }
}

module.exports = ArmorBoost; 
class Skill {
  constructor(name, description, AP, targetSize, targetType){
    this.name = name;
    this.description = description;
    this.AP = AP;
    this.targetSize = targetSize;
    this.targetType = targetType;
  }
}

module.exports = Skill;
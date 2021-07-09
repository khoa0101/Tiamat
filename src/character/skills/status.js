class Status{
  constructor(source, turns, stackable = false, name, description){
    this.source = source;
    this.name = name;
    this.description = description;
    this.turns = turns;
    this.remainingTurn = turns;
    this.stackable = stackable;
  }

  apply(target){
    if (this.stackable){
      this.remainingTurn += this.turns;
    } else {
      this.remainingTurn = this.turns;
    }
    this.once(target);
    this.activate(target);
  }
}

class Burning extends Status{
  constructor(source, turns, damage = 0, stackable = false, name = "Burning", description = null){
    damage = source.damageCal(`fire`, 0.2, 5);
    description = `Take ${damage} every turn for ${turns}. Reduce your fire resistance by 20%.`;
    super(source, turns, stackable, name, description);
    this.damage = damage;
    this.resistance = -0.2;
  }

  once(target){
    target.fireRes += this.resistance;
  }

  activate(target){
    if (this.remainingTurn > 0){
      target.takeDamge(`fire`, this.damage);
      this.remainingTurn--;
    }
  }

  remove(target){
    target.fireRes += this.resistance;
  }
}

class Poisoned extends Status {
  constructor(source, turns, damage = 0, stackable = false, name = "Poisoned", description = nulls){
    damage = source.damageCal(`poison`, 0.2, 5);
    description = `Take ${damage} every turn for ${turns}. Reduce your poison resistance by 20%.`;
    super(source, turns, stackable, name, description);
    this.damage = damage;
    this.resistance = -0.2;
  }

  once(target){
    target.poisonRes += this.resistance;
  }

  activate(target){
    if (this.remainingTurn > 0){
      target.takeDamge(`poison`, this.damage);
      this.remainingTurn--;
    }
  }

  remove(target){
    target.poisonRes += this.resistance;
  }
}

class ArmorBoost extends Status {
  constructor(source, turns, armor = 0, increaseMax, recovery, name, description, stackable = false){
    super(source, turns, stackable, name, description);
    this.armor = armor;
    this.increaseMax = increaseMax;
    this.recovery = recovery;
  }

  once(target){
    if (this.increaseMax){
      target.maxArmor += this.armor;
      target.armor += this.armor;
    }
  }

  activate(target){
    if(this.recovery && this.remainingTurn > 0){
      target.armor += this.armor;
      if(target.armor > target.maxArmor){
        target.armor = target.maxArmor;
      }
      this.remainingTurn--;
    }
  }

  remove(target){
    if (this.increaseMax){
      target.maxArmor -= this.armor;
      if(target.armor > target.maxArmor){
        target.armor = target.maxArmor; 
      }
    }
  }
}

module.exports = ArmorBoost;
module.exports = Burning;
module.exports = Poisoned;
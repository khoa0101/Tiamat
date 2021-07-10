class Status{
  constructor(source, turns, stackable = false, name, description){
    this.source = source;
    this.name = name;
    this.description = description;
    this.turns = turns;
    this.remainingTurn = turns;
    this.stackable = stackable;
  }

  copy(){
    let copy = Object.assign(
      Object.create(
        Object.getPrototypeOf(this)
        )
      ,this);

    return copy;
  }

  apply(active){
    if (active.stackable){
      active.remainingTurn += this.turns;
    } else {
      active.remainingTurn = this.turns;
    }
  }
}

export class Burning extends Status{
  constructor(source, turns, damage = 0, stackable = false, name = "Burning", description = null){
    damage = source.damageCal(`fire`, 0.2, 5);
    description = `Take ${damage} every turn for ${turns + turns > 1 ? "turns" : "turn"}. Reduce your fire resistance by 20%.`;
    super(source, turns, stackable, name, description); 
    this.damage = damage;
    this.resistance = -0.2;
  }

  once(target){
    target.fireRes += this.resistance;
  }

  activate(target){
    if (this.remainingTurn > 0){
      target.takeDamage(`fire`, this.damage);
      this.remainingTurn--;
    }
  }

  remove(target){
    target.fireRes -= this.resistance;
  }
}

export class Poisoned extends Status {
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
      target.takeDamage(`poison`, this.damage);
      this.remainingTurn--;
    }
  }

  remove(target){
    target.poisonRes -= this.resistance;
  }
}

export class ArmorBoost extends Status {
  constructor(source, turns, armor = 0, increaseMax, recovery, name, description, stackable = false){
    super(source, turns, stackable, name, description);
    this.armor = this.source.healCal(0, armor);
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
    }
    this.remainingTurn--;
  }

  remove(target){
    if (this.increaseMax){
      target.maxArmor = target.maxArmor - this.armor;
      if(target.armor > target.maxArmor){
        target.armor = target.maxArmor; 
      }
    }
  }
}
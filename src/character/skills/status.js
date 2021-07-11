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

  once(target){
    return;
  }
  
  activate(target){
    this.remainingTurn--;
  }

  remove(target){
    return;
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
    target.waterRes -= this.resistance;
  }

  activate(target){
    if (this.remainingTurn > 0){
      target.takeDamage(`fire`, this.damage);
      this.remainingTurn--;
    }
  }

  remove(target){
    target.fireRes -= this.resistance;
    target.waterRes += this.resistance;
  }
}

export class Poisoned extends Status {
  constructor(source, turns, damage = 0, stackable = false, name = "Poisoned", description = null){
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

export class ResistanceBoost extends Status{
  constructor(source, turns, resistanceTypes, resistance, name, description, stackable = false){
    super(source, turns, stackable, name, description);
    this.resistanceTypes = resistanceTypes;
    this.resistance = resistance;
  }

  once(target){
    this.resistanceTypes.forEach(res => {
      target[res] += this.resistance;
    });
    this.remainingTurn++;
  }

  remove(target){
    this.resistanceTypes.forEach(res => {
      target[res] -= this.resistance;
    })
  }
}

export class MultiStrike extends Status{
  constructor(source, turns, damage, affinity, stackable, name, description){
    super(source, turns, stackable, name, description);
      this.damage = damage; 
      this.affinity = affinity;
  }

  activate(target){
    if (!this.source.alive){
      this.remainingTurn = 0;
    } else {
      if (this.remainingTurn !== this.turns){
        target.takeDamage(this.affinity, this.damage);
      }
      this.remainingTurn--;
    }
  }
}

export class Chilled extends Status{
  constructor(source, turns, stackable = false, name = "Chilled", description = null){
    description = "Reduce AP recovery by 1 and water resistance by 20%, but increase fire resistance by 20%."
    super(source, turns, stackable, name, description);
  }
  
  once(target){
    target.APRec--;
    target.AP--;
    target.fireRes += 0.2;
    target.waterRes -= 0.2;
    this.remainingTurn++;
  }

  remove(target){
    target.APRec++;
    target.fireRes -= 0.2;
    target.waterRes += 0.2;
  }
}

export class Stunned extends Status{
  constructor(source, turns, stackable = false, name = "Stunned", description = null){
    description = "Skip a turn.";
    super(source, turns, stackable, name, description);
  }

  once(target){
    this.remainingTurn++;
  }

  activate(target){
    target.AP = 0;
    this.remainingTurn--;
  }
}
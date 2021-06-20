/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/character/char.js":
/*!*******************************!*\
  !*** ./src/character/char.js ***!
  \*******************************/
/***/ ((module) => {

eval("function Character(side, charType, level = 1, currentHealth = 50, maxHealth = 50, AP = 4, APRec = 4, power = 10, armor = 30,\n  initiative = 10, critChance = 0, critDamage = 2, damageMod = 0, healMod = 0, cdMod = 1, lifesteal = 0, regen = 1,\n  barrier = 0, barrierDecay = 0, physicalRes = 0, fireRes = 0, waterRes = 0, lightningRes = 0, poisonRes = 0, energyRes = 0, \n  holyRes = 0, darkRes = 0, physicalMod = 0, fireMod = 0, waterMod = 0, lightningMod = 0, poisonMod = 0,\n  energyMod = 0, holyMod = 0, darkMod = 0, talents = [], conditions = [], xp = 0,\n  maxXP = 100, xpReward = 0) {\n  this.level = level;\n  this.active = true;\n  this.alive = true;\n  this.side = side;\n  this.charType = charType;\n  this.currentHealth = currentHealth;\n  this.maxHealth = maxHealth;\n  this.AP = AP;\n  this.APMax = 6;\n  this.APRec = APRec;\n  this.power = power;\n  this.armor = armor;\n  this.initiative = initiative;\n  this.critChance = critChance;\n  this.critDamage = critDamage;\n  this.damageMod = damageMod;\n  this.healMod = healMod;\n  this.cdMod = cdMod;\n  this.lifesteal = lifesteal;\n  this.regen = regen;\n  this.barrier = barrier;\n  this.barrierDecay = barrierDecay;\n  this.physicalRes = physicalRes;\n  this.fireRes = fireRes;\n  this.waterRes = waterRes;\n  this.lightningRes = lightningRes;\n  this.poisonRes = poisonRes;\n  this.energyRes = energyRes;\n  this.holyRes = holyRes;\n  this.darkRes = darkRes;\n  this.physicalMod = physicalMod;\n  this.fireMod = fireMod;\n  this.waterMod = waterMod;\n  this.lightningMod = lightningMod;\n  this.poisonMod = poisonMod;\n  this.energyMod = energyMod;\n  this.holyMod = holyMod;\n  this.darkMod = darkMod;\n  this.talents = talents;\n  this.conditions = conditions;\n  this.xp = xp;\n  this.maxXP = maxXP;\n  this.xpReward = xpReward;\n}\n\nCharacter.prototype.render = function(el, i){\n  const img = document.createElement(\"img\");\n  const div = document.createElement('div');\n  const healthContainer = document.createElement('div');\n  const healthBar = document.createElement('div');\n  const innerHealthBar = document.createElement('div');\n  const armor = document.createElement('div');\n  const barrier = document.createElement('div');\n  healthBar.classList.add('max-health');\n  innerHealthBar.classList.add('current-health');\n  healthContainer.classList.add('health-container');\n  armor.classList.add('armor');\n  barrier.classList.add('barrier');\n  healthBar.value = this.currentHealth;\n  healthBar.max = this.maxHealth;\n  healthBar.innerHTML = `${this.currentHealth}/${this.maxHealth}`;\n  healthBar.appendChild(innerHealthBar);\n  armor.value = this.armor;\n  armor.max = this.armor;\n  armor.innerHTML =  `${this.armor}`;\n  barrier.value = this.barrier;\n  barrier.max = this.barrier;\n  barrier.innerHTML = `${this.barrier}`;\n  img.src = `./dist/images/${this.charType.toLowerCase()}.png`;\n  div.classList.add('character');\n  div.setAttribute('id', this.charType);\n  div.setAttribute('value', i);\n  div.appendChild(img);\n  healthContainer.appendChild(healthBar);\n  healthContainer.appendChild(armor);\n  healthContainer.appendChild(barrier);\n  div.appendChild(healthContainer);\n  el.appendChild(div);\n  if (this.armor < 1){\n    armor.classList.add('hidden');\n  }\n  if (this.barrier < 1){\n    barrier.classList.add('hidden');\n  }\n}\n\nCharacter.prototype.renderPortrait = function(){\n  const img = document.createElement('img');\n  img.src=`./dist/images/${this.charType.toLowerCase()}-portrait.png`;\n  if (this.side === \"enemy\"){\n    img.classList.add(\"enemy\");\n  } else {\n    img.classList.add(\"player\");\n  }\n  \n  return img; \n}\n\nCharacter.prototype.normalAttack = function(dmgType,target){\n  target.takeDamage(dmgType, this.damageCal(dmgType, 1, 1).bind(this));\n};\n\nCharacter.prototype.damageCal = function(dmgType, powerRatio, baseDmg){\n  let totalDamage = Math.floor((baseDmg + (this.power * powerRatio)) \n  * (1.0 + this[`${dmgType}Mod`]) * (1.0 + this.damageMod));\n  return totalDamage; \n}\n\nCharacter.prototype.takeDamage = function(dmgType ,dmg){\n  let damageRecieve = Math.floor(dmg * (1.0 - this[`${dmgType}Res`]));\n  if (damageRecieve < 0){\n    heal(this, -damageRecieve);\n  } else {\n    let remainder = damageRecieve;\n    if (this.barrier > 0){\n      remainder -= this.barrier;\n      this.barrier = this.barrier - damageRecieve;\n      if (this.barrier < 0) this.barrier = 0;\n    }\n    if (this.armor > 0 && remainder > 0){\n      let temp = this.armor;\n      this.armor -= remainder;\n      remainder -= temp;\n      if (this.armor < 0) this.armor = 0;\n    }\n    if (remainder > 0){\n      this.currentHealth = this.currentHealth - remainder;\n    }\n  }\n  this.checkDeath();\n  return damageRecieve;\n}\nCharacter.prototype.endTurn = function(){\n  this.AP += this.APRec;\n  if (this.AP > this.APMax){\n    this.AP = this.APMax; \n  }\n  this.heal(this.healCal(0, this.regen));\n  this.barrierDie();\n}\n\nCharacter.prototype.barrierDie = function(){\n  if (this.barrier > 0){\n    this.barrier -= this.barrierDecay;\n    if (this.barrier < 0){\n      this.barrier = 0;\n    } \n  }\n}\n\nCharacter.prototype.healCal = function(powerRatio, baseHeal){\n  let totalHeal = Math.floor((baseHeal + (this.power * powerRatio)) \n  * (1.0 + this.healMod));\n  return totalHeal;\n}\n\nCharacter.prototype.heal = function(healAmt){\n  let value = this.currentHealth + healAmt;\n  if ( value > this.maxHealth ){\n    this.currentHealth = this.maxHealth;\n    this.barrier = value - this.maxHealth;\n  } else {\n    this.currentHealth = value;\n  }\n}\n\nCharacter.prototype.checkDeath = function(character){\n  if (character.currentHealth < 0){\n    character.active = false;\n    character.alive = false;\n  }\n}\n\nmodule.exports = Character;\n\n//# sourceURL=webpack:///./src/character/char.js?");

/***/ }),

/***/ "./src/character/classes/cleric.js":
/*!*****************************************!*\
  !*** ./src/character/classes/cleric.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Character = __webpack_require__(/*! ../char.js */ \"./src/character/char.js\");\nclass Cleric extends Character{\n  constructor(side = \"player\", charType = \"Cleric\", level = 1, currentHealth = 50, maxHealth = 50, AP = 4, APRec = 4, power = 10, armor = 20,\n    initiative = 12, critChance = 0, critDamage = 2, damageMod = 0, healMod = 0, cdMod = 1, lifesteal = 0, regen = 1,\n    barrier = 0, barrierDecay = 0, physicalRes = 0, fireRes = 0, waterRes = 0, lightningRes = 0, poisonRes = 0, energyRes = 0, \n    holyRes = 0, darkRes = 0, physicalMod = 0, fireMod = 0, waterMod = 0, lightningMod = 0, poisonMod = 0,\n    energyMod = 0, holyMod = 0, darkMod = 0, talents = [], conditions = [], xp = 0,\n    maxXP = 100, xpReward = 0){\n    super(side, charType, level,  currentHealth,  maxHealth, AP,  APRec,  power,  armor, \n      initiative, critChance,  critDamage,  damageMod,  healMod,  cdMod,  lifesteal,  regen, \n      barrier,  barrierDecay,  physicalRes,  fireRes,  waterRes,  lightningRes,  poisonRes,  energyRes,  \n      holyRes, darkRes,  physicalMod,  fireMod,  waterMod,  lightningMod,  poisonMod, \n      energyMod, holyMod,  darkMod,  talents, conditions, xp, \n      maxXP, xpReward);\n  };\n}\n\nmodule.exports = Cleric;\n\n//# sourceURL=webpack:///./src/character/classes/cleric.js?");

/***/ }),

/***/ "./src/character/classes/rogue.js":
/*!****************************************!*\
  !*** ./src/character/classes/rogue.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst Character = __webpack_require__(/*! ../char.js */ \"./src/character/char.js\");\nclass Rogue extends Character{\n  constructor(side = \"player\", charType = \"Rogue\", level = 1, currentHealth = 40, maxHealth = 40, AP = 4, APRec = 4, power = 18, armor = 20,\n    initiative = 18, critChance = 0, critDamage = 2, damageMod = 0, healMod = 0, cdMod = 1, lifesteal = 0, regen = 1,\n    barrier = 0, barrierDecay = 0, physicalRes = 0, fireRes = 0, waterRes = 0, lightningRes = 0, poisonRes = 0, energyRes = 0, \n    holyRes = 0, darkRes = 0, physicalMod = 0, fireMod = 0, waterMod = 0, lightningMod = 0, poisonMod = 0,\n    energyMod = 0, holyMod = 0, darkMod = 0, talents = [], conditions = [], xp = 0,\n    maxXP = 100, xpReward = 0){\n    super(side, charType, level,  currentHealth,  maxHealth, AP,  APRec,  power,  armor, \n      initiative, critChance,  critDamage,  damageMod,  healMod,  cdMod,  lifesteal,  regen, \n      barrier,  barrierDecay,  physicalRes,  fireRes,  waterRes,  lightningRes,  poisonRes,  energyRes,  \n      holyRes, darkRes,  physicalMod,  fireMod,  waterMod,  lightningMod,  poisonMod, \n      energyMod, holyMod,  darkMod,  talents, conditions, xp, \n      maxXP, xpReward);\n  };\n}\n\nmodule.exports = Rogue;\n\n//# sourceURL=webpack:///./src/character/classes/rogue.js?");

/***/ }),

/***/ "./src/character/classes/warrior.js":
/*!******************************************!*\
  !*** ./src/character/classes/warrior.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst Character = __webpack_require__(/*! ../char.js */ \"./src/character/char.js\");\nclass Warrior extends Character{\n  constructor(side = \"player\", charType = \"Warrior\", level = 1, currentHealth = 100, maxHealth = 100, AP = 4, APRec = 4, power = 10, armor = 20,\n    initiative = 11, critChance = 0, critDamage = 2, damageMod = 0, healMod = 0, cdMod = 1, lifesteal = 0, regen = 1,\n    barrier = 0, barrierDecay = 0, physicalRes = 0, fireRes = 0, waterRes = 0, lightningRes = 0, poisonRes = 0, energyRes = 0, \n    holyRes = 0, darkRes = 0, physicalMod = 0, fireMod = 0, waterMod = 0, lightningMod = 0, poisonMod = 0,\n    energyMod = 0, holyMod = 0, darkMod = 0, talents = [], conditions = [], xp = 0,\n    maxXP = 100, xpReward = 0){\n    super(side, charType, level,  currentHealth,  maxHealth, AP,  APRec,  power,  armor, \n      initiative, critChance,  critDamage,  damageMod,  healMod,  cdMod,  lifesteal,  regen, \n      barrier,  barrierDecay,  physicalRes,  fireRes,  waterRes,  lightningRes,  poisonRes,  energyRes,  \n      holyRes, darkRes,  physicalMod,  fireMod,  waterMod,  lightningMod,  poisonMod, \n      energyMod, holyMod,  darkMod,  talents, conditions, xp, \n      maxXP, xpReward);\n  };\n}\n\nmodule.exports = Warrior;\n\n//# sourceURL=webpack:///./src/character/classes/warrior.js?");

/***/ }),

/***/ "./src/character/classes/wizard.js":
/*!*****************************************!*\
  !*** ./src/character/classes/wizard.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst Character = __webpack_require__(/*! ../char.js */ \"./src/character/char.js\");\nclass Wizard extends Character{\n  constructor(side = \"player\", charType = \"Wizard\", level = 1, currentHealth = 30, maxHealth = 30, AP = 4, APRec = 4, power = 15, armor = 10,\n    initiative = 14, critChance = 0, critDamage = 2, damageMod = 0, healMod = 0, cdMod = 1, lifesteal = 0, regen = 1,\n    barrier = 0, barrierDecay = 0, physicalRes = 0, fireRes = 0, waterRes = 0, lightningRes = 0, poisonRes = 0, energyRes = 0, \n    holyRes = 0, darkRes = 0, physicalMod = 0, fireMod = 0, waterMod = 0, lightningMod = 0, poisonMod = 0,\n    energyMod = 0, holyMod = 0, darkMod = 0, talents = [], conditions = [], xp = 0,\n    maxXP = 100, xpReward = 0){\n    super(side, charType, level,  currentHealth,  maxHealth, AP,  APRec,  power,  armor, \n      initiative, critChance,  critDamage,  damageMod,  healMod,  cdMod,  lifesteal,  regen, \n      barrier,  barrierDecay,  physicalRes,  fireRes,  waterRes,  lightningRes,  poisonRes,  energyRes,  \n      holyRes, darkRes,  physicalMod,  fireMod,  waterMod,  lightningMod,  poisonMod, \n      energyMod, holyMod,  darkMod,  talents, conditions, xp, \n      maxXP, xpReward);\n  };\n}\n\nmodule.exports = Wizard;\n\n//# sourceURL=webpack:///./src/character/classes/wizard.js?");

/***/ }),

/***/ "./src/character/enemies/slime.js":
/*!****************************************!*\
  !*** ./src/character/enemies/slime.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Character = __webpack_require__(/*! ../char.js */ \"./src/character/char.js\");\n\nclass Slime extends Character{\n  constructor(side = \"enemy\", charType = \"Slime\", level = 1, currentHealth = 50, maxHealth = 50, AP = 4, APRec = 4, power = 10, armor = 30,\n    initiative = 10, critChance = 0, critDamage = 2, damageMod = 0, healMod = 0, cdMod = 1, lifesteal = 0, regen = 1,\n    barrier = 0, barrierDecay = 0, physicalRes = 0, fireRes = 0, waterRes = 0, lightningRes = 0, poisonRes = 0, energyRes = 0, \n    holyRes = 0, darkRes = 0, physicalMod = 0, fireMod = 0, waterMod = 0, lightningMod = 0, poisonMod = 0,\n    energyMod = 0, holyMod = 0, darkMod = 0, talents = [], conditions = [], xp = 0,\n    maxXP = 100, xpReward = 0){\n    super(side, charType, level = 1, currentHealth = 10, maxHealth = 10, AP = 4, APRec = 4, power = 1, armor = 0,\n      initiative = 10, critChance = 0, critDamage = 2, damageMod = 0, healMod = 0, cdMod = 1, lifesteal = 0, regen = 1,\n      barrier = 0, barrierDecay = 0, physicalRes = 0, fireRes = 0, waterRes = 0, lightningRes = 0, poisonRes = 0, energyRes = 0, \n      holyRes = 0, darkRes = 0, physicalMod = 0, fireMod = 0, waterMod = 0, lightningMod = 0, poisonMod = 0,\n      energyMod = 0, holyMod = 0, darkMod = 0, talents = [], conditions = [], xp = 0,\n      maxXP = 100, xpReward = 10);\n  };\n}\n\nmodule.exports = Slime;\n\n//# sourceURL=webpack:///./src/character/enemies/slime.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Slime = __webpack_require__(/*! ./character/enemies/slime.js */ \"./src/character/enemies/slime.js\");\nconst Rogue = __webpack_require__(/*! ./character/classes/rogue.js */ \"./src/character/classes/rogue.js\");\nconst Cleric = __webpack_require__(/*! ./character/classes/cleric.js */ \"./src/character/classes/cleric.js\");\nconst Warrior = __webpack_require__(/*! ./character/classes/warrior.js */ \"./src/character/classes/warrior.js\");\nconst Wizard = __webpack_require__(/*! ./character/classes/wizard.js */ \"./src/character/classes/wizard.js\");\n\nfunction Game(){\n  this.start = false;\n  this.players = new Array(4);\n  this.enemies = new Array(4);\n  this.turns = [];\n  this.currentTurn = this.turns[0];\n  this.gameOver = false;\n}\n\nGame.prototype.addEnemy = function(){\n  for (let i = 0; i < this.enemies.length; i++){\n    this.enemies[i] = new Slime();\n  }\n};\n\nGame.prototype.addAllies = function(){\n  this.players[0] = new Warrior();\n  this.players[1] = new Cleric();\n  this.players[2] = new Wizard();\n  this.players[3] = new Rogue();\n}\n\nGame.prototype.setTurn = function(){\n  this.players.forEach((player) => {\n    this.turns.push(player);\n  });\n  this.enemies.forEach((enemy) => {\n    this.turns.push(enemy);\n  });\n\n  this.turns = this.turns.sort((player, enemy) => player.initiative - enemy.initiative);\n  this.turns = this.turns.reverse();\n\n};\n\nGame.prototype.checkTurn = function(){\n  for (let i = 0; i < this.turns.length; i++){\n    if (!this.turns[i].alive){\n      this.turns.splice(i, 1);\n      i--;\n    };\n  }\n};\n\nGame.prototype.nextTurn = function(){\n  let temp = this.turns.shift();\n  temp.endTurn();\n  this.turns.push(temp);\n  this.currentTurn = this.turns[0];\n  this.win();\n  this.lose();\n};\n\nGame.prototype.win = function(){\n  for (let i = 0; i < this.enemies.length; i++){\n    if (this.enemies[i].alive) return false;\n  }\n  this.gameOver = true;\n  return true;\n};\n\nGame.prototype.lose = function(){\n  for (let i = 0; i < this.players.length; i++){\n    if (this.players[i].alive) return false;\n  }\n  this.gameOver = true;\n  return true;\n}\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\nconst Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n\nclass GameView{\n  constructor(game){\n    this.game = game;\n  }\n\n  setupView(){\n    const grid = document.getElementById('game-view');\n    const endTurn = document.createElement('button');\n    const returnToMenu = document.createElement('button');\n    endTurn.setAttribute('id', 'end-turn');\n    endTurn.innerHTML = \"End Turn\"\n    returnToMenu.setAttribute('id', 'return-to-menu');\n    returnToMenu.innerHTML = \"Return to menu\";\n    const navBar = document.getElementById('nav-bar');\n    const turns = document.getElementById('turn-display');\n    const ally = document.getElementById('ally-team');\n    const enemy = document.getElementById('enemy-team');\n    navBar.append(returnToMenu);\n    grid.append(endTurn);\n    for (let i = 0; i < this.game.players.length; i++){\n      this.game.players[i].render(ally, i);\n    }\n    for (let i = 0; i < this.game.enemies.length; i++){\n      this.game.enemies[i].render(enemy, i);\n    }\n    for (let i = 0; i < this.game.turns.length; i++){\n      turns.appendChild(this.game.turns[i].renderPortrait());\n    }\n    returnToMenu.addEventListener('click', () => {\n      const menuModal = document.getElementsByClassName(\"menu\");\n      const startButton = document.getElementById(\"start\");\n      menuModal.classList.remove(\"hidden\");\n      if (this.game.start){\n        startButton.value = \"\";\n      }\n    })\n    endTurn.addEventListener('click', () => {\n      this.game.nextTurn();\n      const temp = turns.firstChild;\n      turns.removeChild(turns.firstChild);\n      turns.appendChild(temp);\n      \n    });\n  }\n}\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\nconst Sound = __webpack_require__(/*! ./sound.js */ \"./src/sound.js\");\nconst GameView = __webpack_require__(/*! ./game_view.js */ \"./src/game_view.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", function(){\n  const menuModal = document.getElementsByClassName(\"menu\");\n  const soundButton = document.getElementById(\"music\");\n  const startButton = document.getElementById(\"start\");\n  const teamButton = document.getElementById(\"team\");\n  const tutorialButton = document.getElementById(\"tutorial\");\n  const creditButton = document.getElementById(\"credits\");\n  const closeX = document.getElementsByClassName(\"close-x\");\n  const tutorialPage = document.getElementById(\"tutorial-page\");\n  const creditPage = document.getElementById(\"credit-screen\");\n  const teamPage = document.getElementById(\"team-management\");\n  const music = new Sound;\n  const game = new Game;\n  const gameView = new GameView(game);\n  music.menuMusic.volume = 0.2;\n\n  startButton.addEventListener('click', () => {\n    menuModal[0].classList.add(\"hidden\");\n    if (!game.start){\n      game.start = true;\n      game.addAllies();\n      game.addEnemy();\n      game.setTurn();\n      gameView.setupView();\n    } else {\n      menuModal[0].value = 'Resume Game';\n    }\n  });\n\n  creditButton.addEventListener('click', () => {\n    creditPage.classList.remove(\"hidden\");\n    closeX[0].addEventListener('click', () => {\n      creditPage.classList.add(\"hidden\");\n    });\n  });\n\n  teamButton.addEventListener('click', () => {\n    teamPage.classList.remove(\"hidden\");\n    closeX[1].addEventListener('click', () => {\n      teamPage.classList.add(\"hidden\");\n    });\n  });\n\n  tutorialButton.addEventListener('click', () => {\n    tutorialPage.classList.remove(\"hidden\");\n    closeX[2].addEventListener('click', () => {\n      tutorialPage.classList.add(\"hidden\");\n    });\n  });\n\n  soundButton.addEventListener(\"click\", (song) => {\n    music.playAudio(music.menuMusic);\n    if (music.menuMusic.paused){\n      soundButton.value = \"Unmute\";\n    } else {\n      soundButton.value = \"Mute\";\n    }\n  })\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/sound.js":
/*!**********************!*\
  !*** ./src/sound.js ***!
  \**********************/
/***/ ((module) => {

eval("function Sound(){\n  this.menuMusic = new Audio(\"../dist/sounds/BBS_menu.mp3\");\n  this.menuMusic.loop = true;\n}\n\nSound.prototype.playAudio = function(audio){\n  if (audio.paused){ \n    audio.play();\n  }\n  else {\n    audio.pause();\n  } \n}\n\nmodule.exports = Sound;\n\n//# sourceURL=webpack:///./src/sound.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"removeAllChildren\": () => (/* binding */ removeAllChildren)\n/* harmony export */ });\nconst removeAllChildren = function(parent){\n  while(parent.firstChild){\n    parent.removeChild(parent.firstChild);\n  }\n}\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
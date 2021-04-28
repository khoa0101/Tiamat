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
/***/ (() => {

eval("function Character(side, charType, level = 1, currentHealth = 50, maxHealth = 50, AP = 4, APRec = 4, power = 10, armor = 30,\n  initiative = 10, critChance = 0, critDamage = 2, damageMod = 0, healMod = 0, cdMod = 1, lifesteal = 0, regen = 1,\n  barrier = 0, barrierDecay = 0, physicalRes = 0, fireRes = 0, waterRes = 0, lightningRes = 0, poisonRes = 0, energyRes = 0, \n  holyRes = 0, darkRes = 0, physicalMod = 0, fireMod = 0, waterMod = 0, lightningMod = 0, poisonMod = 0,\n  energyMod = 0, holyMod = 0, darkMod = 0, talents = [], conditions = [], xp = 0,\n  maxXP = 100, xpReward = 0) {\n  this.level = level;\n  this.active = true;\n  this.alive = true;\n  this.side = side;\n  this.charType = charType;\n  this.currentHealth = currentHealth;\n  this.maxHealth = maxHealth;\n  this.AP = AP;\n  this.APRec = APRec;\n  this.power = power;\n  this.armor = armor;\n  this.initiative = initiative;\n  this.critChance = critChance;\n  this.critDamage = critDamage;\n  this.damageMod = damageMod;\n  this.healMod = healMod;\n  this.cdMod = cdMod;\n  this.lifesteal = lifesteal;\n  this.regen = regen;\n  this.barrier = barrier;\n  this.barrierDecay = barrierDecay;\n  this.physicalRes = physicalRes;\n  this.fireRes = fireRes;\n  this.waterRes = waterRes;\n  this.lightningRes = lightningRes;\n  this.poisonRes = poisonRes;\n  this.energyRes = energyRes;\n  this.holyRes = holyRes;\n  this.darkRes = darkRes;\n  this.physicalMod = physicalMod;\n  this.fireMod = fireMod;\n  this.waterMod = waterMod;\n  this.lightningMod = lightningMod;\n  this.poisonMod = poisonMod;\n  this.energyMod = energyMod;\n  this.holyMod = holyMod;\n  this.darkMod = darkMod;\n  this.talents = talents;\n  this.conditions = conditions;\n  this.xp = xp;\n  this.maxXP = maxXP;\n  this.xpReward = xpReward;\n}\n\nfunction damageCal(character, dmgType, powerRatio, baseDmg){\n  let totalDamage = Math.floor((baseDmg + (character.power * powerRatio)) \n  * (1.0 + character[`${dmgType}Mod`]) * (1.0 + character.damageMod));\n  return totalDamage; \n}\n\nfunction takeDamage(character, dmgType ,dmg){\n  let damageRecieve = Math.floor(dmg * (1.0 - character[`${dmgType}Res`]));\n  if (damageRecieve < 0){\n    heal(character, -damageRecieve);\n  } else {\n    let remainder = damageRecieve;\n    if (character.barrier > 0){\n      remainder -= character.barrier;\n      character.barrier = character.barrier - damageRecieve;\n      if (character.barrier < 0) character.barrier = 0;\n    }\n    if (character.armor > 0 && remainder > 0){\n      let temp = character.armor;\n      character.armor -= remainder;\n      remainder -= temp;\n      if (character.armor < 0) character.armor = 0;\n    }\n    if (remainder > 0){\n      character.currentHealth = character.currentHealth - remainder;\n    }\n  }\n  checkDeath(character);\n  return damageRecieve;\n}\n\nfunction healCal(character, powerRatio, baseHeal){\n  let totalHeal = Math.floor((baseHeal + (character.power * powerRatio)) \n  * (1.0 + character.healMod));\n  return totalHeal;\n}\n\nfunction heal(character, healAmt){\n  let value = character.currentHealth + healAmt;\n  if ( value > character.maxHealth ){\n    character.currentHealth = character.maxHealth;\n    character.barrier = value - character.maxHealth;\n  } else {\n    character.currentHealth = value;\n  }\n}\n\nfunction checkDeath(character){\n  if (character.currentHealth < 0){\n    console.log(`${character.charType} has been defeated!`);\n    character.active = false;\n    character.alive = false;\n  }\n}\n\nlet player = new Character(\"player\", \"Wizard\");\nlet slime = new Character(\"enemy\", \"Slime\");\nplayer.damageMod = 0.2;\nplayer.fireMod = 0.2;\nplayer.healMod = 0.2;\n// slime.fireRes = 2;\nslime.currentHealth = 20;\nconsole.log(player);\nconsole.log(slime);\nlet damageTotal = damageCal(player, \"fire\", 0.5, 100);\nconsole.log(damageTotal);\nconsole.log(takeDamage(slime, \"fire\", damageTotal));\nconsole.log(slime.currentHealth);\nconsole.log(slime.barrier);\n\n\n\n//# sourceURL=webpack:///./src/character/char.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Character = __webpack_require__(/*! ./character/char */ \"./src/character/char.js\");\nfunction Game() {\n  this.asteroids = [];\n  this.bullets = [];\n  this.ships = [];\n}\n\nGame.BG_COLOR = \"#000000\";\nGame.DIM_X = 1534;\nGame.DIM_Y = 900;\nGame.FPS = 32;\nGame.NUM_ASTEROIDS = 10;\n\nGame.prototype.add = function add(object) {\n  if (object instanceof Asteroid) {\n    this.asteroids.push(object);\n  } else if (object instanceof Bullet) {\n    this.bullets.push(object);\n  } else if (object instanceof Ship) {\n    this.ships.push(object);\n  } else {\n    throw new Error(\"unknown type of object\");\n  }\n};\n\nGame.prototype.addAsteroids = function addAsteroids() {\n  for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {\n    this.add(new Asteroid({ game: this }));\n  }\n};\n\nGame.prototype.addShip = function addShip() {\n  const ship = new Ship({\n    pos: this.randomPosition(),\n    game: this\n  });\n\n  this.add(ship);\n\n  return ship;\n};\n\nGame.prototype.allObjects = function allObjects() {\n  return [].concat(this.ships, this.asteroids, this.bullets);\n};\n\nGame.prototype.checkCollisions = function checkCollisions() {\n  const allObjects = this.allObjects();\n  for (let i = 0; i < allObjects.length; i++) {\n    for (let j = 0; j < allObjects.length; j++) {\n      const obj1 = allObjects[i];\n      const obj2 = allObjects[j];\n\n      if (obj1.isCollidedWith(obj2)) {\n        const collision = obj1.collideWith(obj2);\n        if (collision) return;\n      }\n    }\n  }\n};\n\nGame.prototype.draw = function draw(ctx) {\n  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);\n  ctx.fillStyle = Game.BG_COLOR;\n  ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);\n\n  this.allObjects().forEach(function(object) {\n    object.draw(ctx);\n  });\n};\n\nGame.prototype.isOutOfBounds = function isOutOfBounds(pos) {\n  return (pos[0] < 0) || (pos[1] < 0) ||\n    (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);\n};\n\nGame.prototype.moveObjects = function moveObjects(delta) {\n  this.allObjects().forEach(function(object) {\n    object.move(delta);\n  });\n};\n\nGame.prototype.randomPosition = function randomPosition() {\n  return [\n    Game.DIM_X * Math.random(),\n    Game.DIM_Y * Math.random()\n  ];\n};\n\nGame.prototype.remove = function remove(object) {\n  if (object instanceof Bullet) {\n    this.bullets.splice(this.bullets.indexOf(object), 1);\n  } else if (object instanceof Asteroid) {\n    this.asteroids.splice(this.asteroids.indexOf(object), 1);\n  } else if (object instanceof Ship) {\n    this.ships.splice(this.ships.indexOf(object), 1);\n  } else {\n    throw new Error(\"unknown type of object\");\n  }\n};\n\nGame.prototype.step = function step(delta) {\n  this.moveObjects(delta);\n  this.checkCollisions();\n};\n\nGame.prototype.wrap = function wrap(pos) {\n  return [\n    Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)\n  ];\n};\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n// const GameView = require(\"./game_view\");\n\ndocument.addEventListener(\"DOMContentLoaded\", function(){\n  const canvasEl = document.getElementById(\"game-canvas\");\n  const game = new Game;\n  canvasEl.width = Game.DIM_X;\n  canvasEl.height= Game.DIM_Y;\n\n  const ctx = canvasEl.getContext(\"2d\");\n  console.log(\"Webpack\")\n  // new GameView(game, ctx).start();\n})\n\n\n//# sourceURL=webpack:///./src/index.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
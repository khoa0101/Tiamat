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

/***/ "./src/cell.js":
/*!*********************!*\
  !*** ./src/cell.js ***!
  \*********************/
/***/ ((module) => {

eval("class Cell {\n  constructor(ctx, x, y){\n    this.ctx = ctx;\n    this.x = x;\n    this.y = y;\n    this.width = 100;\n    this.height = 100;\n  }\n\n  draw(){\n    this.ctx.strokeStyle = 'black';\n    this.ctx.strokeRect(this.x, this.y, this.width, this.height);\n  }\n};\n\nmodule.exports = Cell;\n\n//# sourceURL=webpack:///./src/cell.js?");

/***/ }),

/***/ "./src/character/char.js":
/*!*******************************!*\
  !*** ./src/character/char.js ***!
  \*******************************/
/***/ ((module) => {

eval("function Character(side, charType, level = 1, currentHealth = 50, maxHealth = 50, AP = 4, APRec = 4, power = 10, armor = 30,\n  initiative = 10, critChance = 0, critDamage = 2, damageMod = 0, healMod = 0, cdMod = 1, lifesteal = 0, regen = 1,\n  barrier = 0, barrierDecay = 0, physicalRes = 0, fireRes = 0, waterRes = 0, lightningRes = 0, poisonRes = 0, energyRes = 0, \n  holyRes = 0, darkRes = 0, physicalMod = 0, fireMod = 0, waterMod = 0, lightningMod = 0, poisonMod = 0,\n  energyMod = 0, holyMod = 0, darkMod = 0, talents = [], conditions = [], xp = 0,\n  maxXP = 100, xpReward = 0) {\n  this.level = level;\n  this.active = true;\n  this.alive = true;\n  this.side = side;\n  this.charType = charType;\n  this.currentHealth = currentHealth;\n  this.maxHealth = maxHealth;\n  this.AP = AP;\n  this.APRec = APRec;\n  this.power = power;\n  this.armor = armor;\n  this.initiative = initiative;\n  this.critChance = critChance;\n  this.critDamage = critDamage;\n  this.damageMod = damageMod;\n  this.healMod = healMod;\n  this.cdMod = cdMod;\n  this.lifesteal = lifesteal;\n  this.regen = regen;\n  this.barrier = barrier;\n  this.barrierDecay = barrierDecay;\n  this.physicalRes = physicalRes;\n  this.fireRes = fireRes;\n  this.waterRes = waterRes;\n  this.lightningRes = lightningRes;\n  this.poisonRes = poisonRes;\n  this.energyRes = energyRes;\n  this.holyRes = holyRes;\n  this.darkRes = darkRes;\n  this.physicalMod = physicalMod;\n  this.fireMod = fireMod;\n  this.waterMod = waterMod;\n  this.lightningMod = lightningMod;\n  this.poisonMod = poisonMod;\n  this.energyMod = energyMod;\n  this.holyMod = holyMod;\n  this.darkMod = darkMod;\n  this.talents = talents;\n  this.conditions = conditions;\n  this.xp = xp;\n  this.maxXP = maxXP;\n  this.xpReward = xpReward;\n}\n\nCharacter.prototype.damageCal = function(dmgType, powerRatio, baseDmg){\n  let totalDamage = Math.floor((baseDmg + (this.power * powerRatio)) \n  * (1.0 + this[`${dmgType}Mod`]) * (1.0 + this.damageMod));\n  return totalDamage; \n}\n\nCharacter.prototype.takeDamage = function(dmgType ,dmg){\n  let damageRecieve = Math.floor(dmg * (1.0 - this[`${dmgType}Res`]));\n  if (damageRecieve < 0){\n    heal(this, -damageRecieve);\n  } else {\n    let remainder = damageRecieve;\n    if (this.barrier > 0){\n      remainder -= this.barrier;\n      this.barrier = this.barrier - damageRecieve;\n      if (this.barrier < 0) this.barrier = 0;\n    }\n    if (this.armor > 0 && remainder > 0){\n      let temp = this.armor;\n      this.armor -= remainder;\n      remainder -= temp;\n      if (this.armor < 0) this.armor = 0;\n    }\n    if (remainder > 0){\n      this.currentHealth = this.currentHealth - remainder;\n    }\n  }\n  this.checkDeath();\n  return damageRecieve;\n}\n\nCharacter.prototype.healCal = function(powerRatio, baseHeal){\n  let totalHeal = Math.floor((baseHeal + (this.power * powerRatio)) \n  * (1.0 + this.healMod));\n  return totalHeal;\n}\n\nCharacter.prototype.heal = function(healAmt){\n  let value = this.currentHealth + healAmt;\n  if ( value > this.maxHealth ){\n    this.currentHealth = this.maxHealth;\n    this.barrier = value - this.maxHealth;\n  } else {\n    this.currentHealth = value;\n  }\n}\n\nfunction checkDeath(character){\n  if (character.currentHealth < 0){\n    character.active = false;\n    character.alive = false;\n  }\n}\n\nmodule.exports = Character;\n\n//# sourceURL=webpack:///./src/character/char.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Character = __webpack_require__(/*! ./character/char */ \"./src/character/char.js\");\nfunction Game() {\n  this.grid = [];\n  this.players = new Array(6);\n  this.enemies = [];\n  this.turns = [];\n  this.currentTurn = this.turns[0];\n}\n\nGame.DIM_X = 1500;\nGame.DIM_Y = 800;\nGame.FPS = 60;\n\nGame.prototype.add = function(object) {\n  if (object.side = \"player\"){\n    this.players.push(object);\n  } else {\n    this.enemies.push(object);\n  }\n};\n\nGame.prototype.setTurn = function(){\n  this.players.forEach((player) => {\n    this.turns.push(player);\n  });\n  this.enemies.forEach((enemy) => {\n    this.turns.push(enemy);\n  });\n\n  this.turns = this.turns.sort((player, enemy) => player.initiative - enemy.initiative);\n  this.turns = this.turns.reverse;\n};\n\nGame.prototype.checkTurn = function(){\n  for (let i = 0; i < this.turns.length; i++){\n    if (!this.turns[i].alive){\n      this.turns.splice(i, 1);\n      i--;\n    };\n  }\n};\n\nGame.prototype.nextTurn = function(){\n  let temp = this.turns.pop();\n  this.turns.push(temp);\n  this.currentTurn = this.turns[0];\n};\n\nGame.prototype.win = function(){\n  for (let i = 0; i < this.enemies.length; i++){\n    if (this.enemies[i].alive) return false;\n  }\n  return true;\n};\n\nGame.prototype.lose = function(){\n  for (let i = 0; i < this.players.length; i++){\n    if (this.players[i].alive) return false;\n  }\n  return true;\n}\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\")\nconst Cell = __webpack_require__(/*! ./cell.js */ \"./src/cell.js\")\n\nfunction GameView(game, ctx) {\n  this.ctx = ctx;\n  this.game = game;\n  this.controlsBar = {\n    width: Game.DIM_X,\n    height: 100,\n  }\n};\n\nGameView.prototype.createGrid = function(){\n  for (let y = 100; y < Game.DIM_Y; y += 100){\n    for (let x = 0; x < Game.DIM_X; x += 100){\n      this.game.grid.push(new Cell(this.ctx, x, y));\n    }\n  }\n}; \n\nGameView.prototype.handleGameGrid = function(){\n  for (let i = 0; i < this.game.grid.length; i++){\n    this.game.grid[i].draw();\n  }\n};\n\nGameView.prototype.animate = function(){\n  this.ctx.fillStyle = \"white\";\n  this.ctx.fillRect(0, 0, this.controlsBar.width, this.controlsBar.height);\n  requestAnimationFrame(this.animate.bind(this));\n};\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\nconst Sound = __webpack_require__(/*! ./sound.js */ \"./src/sound.js\");\nconst GameView = __webpack_require__(/*! ./game_view.js */ \"./src/game_view.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", function(){\n  const canvasEl = document.getElementById(\"game-canvas\");\n  const music = new Sound;\n  const soundButton = document.getElementById(\"music\");\n  const game = new Game;\n  canvasEl.width = Game.DIM_X;\n  canvasEl.height= Game.DIM_Y;\n  music.menuMusic.volume = 0.2;\n\n  const mouse = {\n    x: undefined,\n    y: undefined,\n    width: 0.1,\n    height: 0.1,\n  }\n\n  let canvasPosition = canvasEl.getBoundingClientRect();\n  canvasEl.addEventListener('mousemove', function(e){\n    mouse.x = e.x - canvasPosition.left;\n    mouse.y = e.y - canvasPosition.top;\n    console.log(mouse.x + \" \" + mouse.y)\n  });\n\n  canvasEl.addEventListener('mouseleave', function(){\n    mouse.x = undefined;\n    mouse.y = undefined;\n  });\n\n  const ctx = canvasEl.getContext(\"2d\");\n  const gameView = new GameView(game, ctx);\n  gameView.animate();\n  gameView.createGrid();\n  gameView.handleGameGrid();\n  soundButton.addEventListener(\"click\", () => {\n    music.playAudio(music.menuMusic);\n    console.log(music.menuMusic.paused);\n    if (music.menuMusic.paused){\n      soundButton.value = \"Unmute\";\n    } else {\n      soundButton.value = \"Mute\";\n    }\n  })\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/sound.js":
/*!**********************!*\
  !*** ./src/sound.js ***!
  \**********************/
/***/ ((module) => {

eval("function Sound(){\n  this.menuMusic = new Audio(\"../dist/sounds/BBS_menu.mp3\");\n}\n\nSound.prototype.playAudio = function(audio){\n  console.log(\"playAudio function\")\n  if (audio.paused){ \n    audio.play();\n  }\n  else {\n    audio.pause();\n  } \n}\n\nmodule.exports = Sound;\n\n//# sourceURL=webpack:///./src/sound.js?");

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
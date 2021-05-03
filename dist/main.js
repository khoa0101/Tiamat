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
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\nconst Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n\nclass Cell {\n  constructor(ctx, x, y){\n    this.ctx = ctx;\n    this.x = x;\n    this.y = y;\n    this.width = 100;\n    this.height = 100;\n  }\n\n  draw(){\n    if (Game.MOUSE.x && Game.MOUSE.y && Util.collision(this, Game.MOUSE)){\n      this.ctx.strokeStyle = 'white';\n      this.ctx.strokeRect(this.x, this.y, this.width, this.height);\n    }\n  }\n};\n\nmodule.exports = Cell;\n\n//# sourceURL=webpack:///./src/cell.js?");

/***/ }),

/***/ "./src/character/char.js":
/*!*******************************!*\
  !*** ./src/character/char.js ***!
  \*******************************/
/***/ ((module) => {

eval("function Character(side, charType, level = 1, currentHealth = 50, maxHealth = 50, AP = 4, APRec = 4, power = 10, armor = 30,\n  initiative = 10, critChance = 0, critDamage = 2, damageMod = 0, healMod = 0, cdMod = 1, lifesteal = 0, regen = 1,\n  barrier = 0, barrierDecay = 0, physicalRes = 0, fireRes = 0, waterRes = 0, lightningRes = 0, poisonRes = 0, energyRes = 0, \n  holyRes = 0, darkRes = 0, physicalMod = 0, fireMod = 0, waterMod = 0, lightningMod = 0, poisonMod = 0,\n  energyMod = 0, holyMod = 0, darkMod = 0, talents = [], conditions = [], xp = 0,\n  maxXP = 100, xpReward = 0) {\n  this.level = level;\n  this.active = true;\n  this.alive = true;\n  this.side = side;\n  this.charType = charType;\n  this.currentHealth = currentHealth;\n  this.maxHealth = maxHealth;\n  this.AP = AP;\n  this.APRec = APRec;\n  this.power = power;\n  this.armor = armor;\n  this.initiative = initiative;\n  this.critChance = critChance;\n  this.critDamage = critDamage;\n  this.damageMod = damageMod;\n  this.healMod = healMod;\n  this.cdMod = cdMod;\n  this.lifesteal = lifesteal;\n  this.regen = regen;\n  this.barrier = barrier;\n  this.barrierDecay = barrierDecay;\n  this.physicalRes = physicalRes;\n  this.fireRes = fireRes;\n  this.waterRes = waterRes;\n  this.lightningRes = lightningRes;\n  this.poisonRes = poisonRes;\n  this.energyRes = energyRes;\n  this.holyRes = holyRes;\n  this.darkRes = darkRes;\n  this.physicalMod = physicalMod;\n  this.fireMod = fireMod;\n  this.waterMod = waterMod;\n  this.lightningMod = lightningMod;\n  this.poisonMod = poisonMod;\n  this.energyMod = energyMod;\n  this.holyMod = holyMod;\n  this.darkMod = darkMod;\n  this.talents = talents;\n  this.conditions = conditions;\n  this.xp = xp;\n  this.maxXP = maxXP;\n  this.xpReward = xpReward;\n}\n\nCharacter.prototype.normalAttack = function(target){\n  let dmgType = \"physical\";\n  target.takeDamage(dmgType, this.damageCal(dmgType, 1, 1).bind(this));\n};\n\nCharacter.prototype.damageCal = function(dmgType, powerRatio, baseDmg){\n  let totalDamage = Math.floor((baseDmg + (this.power * powerRatio)) \n  * (1.0 + this[`${dmgType}Mod`]) * (1.0 + this.damageMod));\n  return totalDamage; \n}\n\nCharacter.prototype.takeDamage = function(dmgType ,dmg){\n  let damageRecieve = Math.floor(dmg * (1.0 - this[`${dmgType}Res`]));\n  if (damageRecieve < 0){\n    heal(this, -damageRecieve);\n  } else {\n    let remainder = damageRecieve;\n    if (this.barrier > 0){\n      remainder -= this.barrier;\n      this.barrier = this.barrier - damageRecieve;\n      if (this.barrier < 0) this.barrier = 0;\n    }\n    if (this.armor > 0 && remainder > 0){\n      let temp = this.armor;\n      this.armor -= remainder;\n      remainder -= temp;\n      if (this.armor < 0) this.armor = 0;\n    }\n    if (remainder > 0){\n      this.currentHealth = this.currentHealth - remainder;\n    }\n  }\n  this.checkDeath();\n  return damageRecieve;\n}\n\nCharacter.prototype.healCal = function(powerRatio, baseHeal){\n  let totalHeal = Math.floor((baseHeal + (this.power * powerRatio)) \n  * (1.0 + this.healMod));\n  return totalHeal;\n}\n\nCharacter.prototype.heal = function(healAmt){\n  let value = this.currentHealth + healAmt;\n  if ( value > this.maxHealth ){\n    this.currentHealth = this.maxHealth;\n    this.barrier = value - this.maxHealth;\n  } else {\n    this.currentHealth = value;\n  }\n}\n\nCharacter.prototype.checkDeath = function(character){\n  if (character.currentHealth < 0){\n    character.active = false;\n    character.alive = false;\n  }\n}\n\nmodule.exports = Character;\n\n//# sourceURL=webpack:///./src/character/char.js?");

/***/ }),

/***/ "./src/character/enemies/slime.js":
/*!****************************************!*\
  !*** ./src/character/enemies/slime.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Character = __webpack_require__(/*! ../char.js */ \"./src/character/char.js\");\n\nclass Slime extends Character{\n  constructor(side = \"enemy\", charType = \"Slime\", level = 1, currentHealth = 50, maxHealth = 50, AP = 4, APRec = 4, power = 10, armor = 30,\n    initiative = 10, critChance = 0, critDamage = 2, damageMod = 0, healMod = 0, cdMod = 1, lifesteal = 0, regen = 1,\n    barrier = 0, barrierDecay = 0, physicalRes = 0, fireRes = 0, waterRes = 0, lightningRes = 0, poisonRes = 0, energyRes = 0, \n    holyRes = 0, darkRes = 0, physicalMod = 0, fireMod = 0, waterMod = 0, lightningMod = 0, poisonMod = 0,\n    energyMod = 0, holyMod = 0, darkMod = 0, talents = [], conditions = [], xp = 0,\n    maxXP = 100, xpReward = 0){\n    super(side, charType, level = 1, currentHealth = 10, maxHealth = 10, AP = 4, APRec = 4, power = 1, armor = 0,\n      initiative = 10, critChance = 0, critDamage = 2, damageMod = 0, healMod = 0, cdMod = 1, lifesteal = 0, regen = 1,\n      barrier = 0, barrierDecay = 0, physicalRes = 0, fireRes = 0, waterRes = 0, lightningRes = 0, poisonRes = 0, energyRes = 0, \n      holyRes = 0, darkRes = 0, physicalMod = 0, fireMod = 0, waterMod = 0, lightningMod = 0, poisonMod = 0,\n      energyMod = 0, holyMod = 0, darkMod = 0, talents = [], conditions = [], xp = 0,\n      maxXP = 100, xpReward = 10);\n  };\n\n  draw(ctx, x, y){\n    let slime = document.getElementById(\"slime\");\n    ctx.drawImage(slime, x, y, 100, 100);\n    ctx.fillStyle = 'red';\n    ctx.font = '20px Arial';\n    ctx.fillText(`${Math.floor(this.currentHealth)}/${Math.floor(this.maxHealth)}`, x, y);\n  };\n}\n\nmodule.exports = Slime;\n\n//# sourceURL=webpack:///./src/character/enemies/slime.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Slime = __webpack_require__(/*! ./character/enemies/slime.js */ \"./src/character/enemies/slime.js\");\n\nfunction Game() {\n  this.grid = [];\n  this.players = new Array(6);\n  this.enemies = new Array(6);\n  this.turns = [];\n  this.currentTurn = this.turns[0];\n  this.gameStart = false;\n  this.gameOver = false;\n}\n\nGame.MOUSE = {\n  x: undefined,\n  y: undefined,\n  width: 0.1,\n  height: 0.1,\n}\n\nGame.DIM_X = 1300;\nGame.DIM_Y = 600;\nGame.FPS = 60;\n\nGame.prototype.addEnemy = function(){\n  for (let i = 0; i < this.enemies.length; i++){\n    this.enemies[i] = new Slime();\n  }\n};\n\nGame.prototype.setTurn = function(){\n  this.players.forEach((player) => {\n    this.turns.push(player);\n  });\n  this.enemies.forEach((enemy) => {\n    this.turns.push(enemy);\n  });\n\n  this.turns = this.turns.sort((player, enemy) => player.initiative - enemy.initiative);\n  // this.turns = this.turns.reverse;\n};\n\nGame.prototype.checkTurn = function(){\n  for (let i = 0; i < this.turns.length; i++){\n    if (!this.turns[i].alive){\n      this.turns.splice(i, 1);\n      i--;\n    };\n  }\n};\n\nGame.prototype.nextTurn = function(){\n  let temp = this.turns.pop();\n  this.turns.push(temp);\n  this.currentTurn = this.turns[0];\n};\n\nGame.prototype.win = function(){\n  for (let i = 0; i < this.enemies.length; i++){\n    if (this.enemies[i].alive) return false;\n  }\n  this.gameOver = true;\n  return true;\n};\n\nGame.prototype.lose = function(){\n  for (let i = 0; i < this.players.length; i++){\n    if (this.players[i].alive) return false;\n  }\n  this.gameOver = true;\n  return true;\n}\n\nmodule.exports = Game;\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\nconst Cell = __webpack_require__(/*! ./cell.js */ \"./src/cell.js\");\n\nfunction GameView(game, ctx) {\n  this.ctx = ctx;\n  this.game = game;\n  this.controlsBar = {\n    width: Game.DIM_X,\n    height: 100,\n  }\n};\n\nGameView.prototype.createGrid = function(){\n  for (let y = 100; y < Game.DIM_Y; y += 100){\n    for (let x = 0; x < Game.DIM_X; x += 100){\n      this.game.grid.push(new Cell(this.ctx, x, y));\n    }\n  }\n}; \n\nGameView.prototype.handleGameGrid = function(){\n  for (let i = 0; i < this.game.grid.length; i++){\n    this.game.grid[i].draw();\n  }\n};\n\nGameView.prototype.renderEnemies = function(){\n  let x = 100;\n  for (let i = 0; i < this.game.enemies.length; i++){\n    this.game.enemies[i].draw(this.ctx, x, 100);\n    x += 200; \n  }\n};\n\nGameView.prototype.renderTurn = function(){\n  let x = 300;\n  for (let i = 0; i < this.game.turns.length && i < 7; i++){\n    this.game.turns[i].draw(this.ctx, x, 500);\n    x += 100;\n  }\n}\n\nGameView.prototype.animate = function(){\n  this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);\n  // this.ctx.fillStyle = \"white\";\n  // this.ctx.fillRect(0, 0, this.controlsBar.width, this.controlsBar.height);\n  this.handleGameGrid();\n  this.renderEnemies();\n  this.renderTurn();\n  this.game.checkTurn();\n  requestAnimationFrame(this.animate.bind(this));\n};\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\nconst Sound = __webpack_require__(/*! ./sound.js */ \"./src/sound.js\");\nconst GameView = __webpack_require__(/*! ./game_view.js */ \"./src/game_view.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", function(){\n  const canvasEl = document.getElementById(\"game-canvas\");\n  const menuModal = document.getElementsByClassName(\"menu\");\n  const soundButton = document.getElementById(\"music\");\n  const startButton = document.getElementById(\"start\");\n  const teamButton = document.getElementById(\"team\");\n  const tutorialButton = document.getElementById(\"tutorial\");\n  const creditButton = document.getElementById(\"credits\");\n  const closeX = document.getElementsByClassName(\"close-x\");\n  const tutorialPage = document.getElementById(\"tutorial-page\");\n  const creditPage = document.getElementById(\"credit-screen\");\n  const teamPage = document.getElementById(\"team-management\");\n  const music = new Sound;\n  const game = new Game;\n  canvasEl.width = Game.DIM_X;\n  canvasEl.height= Game.DIM_Y;\n  music.menuMusic.volume = 0.2;\n\n  let canvasPosition = canvasEl.getBoundingClientRect();\n  canvasEl.addEventListener('mousemove', function(e){\n    Game.MOUSE.x = e.x - canvasPosition.left;\n    Game.MOUSE.y = e.y - canvasPosition.top;\n  });\n\n  canvasEl.addEventListener('mouseleave', function(){\n    Game.MOUSE.x = undefined;\n    Game.MOUSE.y = undefined;\n  });\n\n  const ctx = canvasEl.getContext(\"2d\");\n  const gameView = new GameView(game, ctx);\n\n  startButton.addEventListener('click', () => {\n    menuModal[0].classList.add(\"hidden\");\n    game.addEnemy();\n    game.setTurn();\n    gameView.animate();\n    gameView.createGrid();\n  });\n\n  creditButton.addEventListener('click', () => {\n    creditPage.classList.remove(\"hidden\");\n    closeX[0].addEventListener('click', () => {\n      creditPage.classList.add(\"hidden\");\n    });\n  });\n\n  teamButton.addEventListener('click', () => {\n    teamPage.classList.remove(\"hidden\");\n    closeX[1].addEventListener('click', () => {\n      teamPage.classList.add(\"hidden\");\n    });\n  });\n\n  tutorialButton.addEventListener('click', () => {\n    tutorialPage.classList.remove(\"hidden\");\n    closeX[2].addEventListener('click', () => {\n      tutorialPage.classList.add(\"hidden\");\n    });\n  });\n\n  soundButton.addEventListener(\"click\", () => {\n    music.playAudio(music.menuMusic);\n    if (music.menuMusic.paused){\n      soundButton.value = \"Unmute\";\n    } else {\n      soundButton.value = \"Mute\";\n    }\n  })\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/sound.js":
/*!**********************!*\
  !*** ./src/sound.js ***!
  \**********************/
/***/ ((module) => {

eval("function Sound(){\n  this.menuMusic = new Audio(\"../dist/sounds/BBS_menu.mp3\");\n}\n\nSound.prototype.playAudio = function(audio){\n  if (audio.paused){ \n    audio.play();\n  }\n  else {\n    audio.pause();\n  } \n}\n\nmodule.exports = Sound;\n\n//# sourceURL=webpack:///./src/sound.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"collision\": () => (/* binding */ collision)\n/* harmony export */ });\nfunction collision(first, second){\n  return( !(first.x > second.x + second.width ||\n        first.x + first.width < second.x ||\n        first.y > second.y + second.height ||\n        first.y + first.height < second.y))\n};\n\n//# sourceURL=webpack:///./src/util.js?");

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
function Sound(){
  this.menuMusic = new Audio("../dist/sounds/BBS_menu.mp3");
}

Sound.prototype.playAudio = function(audio){
  console.log("playAudio function")
  if (audio.paused) audio.play();
}

module.exports = Sound;
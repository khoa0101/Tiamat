function Sound(){
  this.menuMusic = new Audio("../dist/sounds/BBS_menu");
  this.menuMusic.loop = true;
}

Sound.prototype.playAudio = function(audio){
  if (audio.paused){ 
    audio.play();
  }
  else {
    audio.pause();
  } 
}

module.exports = Sound;
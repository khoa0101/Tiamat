function Sound(){
  this.menuMusic = document.getElementById("menu-music");
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
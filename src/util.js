export const removeAllChildren = function(parent){
  while(parent.firstChild){
    parent.removeChild(parent.firstChild);
  }
}
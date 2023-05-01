export function debounce(fn, ms){
  let timeout;
  return function(){
    const func = () => { fn.apply(this, arguments) };
    clearTimeout(timeout);
    timeout = setTimeout(func, ms)
  }
}

export function renderErrorVisualise(nodeInput, nodeText, nodeInputClass, nodeTextClass, isAppearance){
  if(isAppearance){
    nodeInput.classList.add(nodeInputClass);
    nodeText.classList.remove(nodeTextClass);
  }else{
    nodeInput.classList.remove(nodeInputClass);
    nodeText.classList.add(nodeTextClass);
  }
}
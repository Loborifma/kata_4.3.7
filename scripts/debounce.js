export function debounce(fn, ms){
  let timeout;
  return function(){
    const func = () => { fn.apply(this, arguments) };
    clearTimeout(timeout);
    timeout = setTimeout(func, ms)
  }
}
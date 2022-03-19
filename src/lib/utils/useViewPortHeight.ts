import {useEffect} from "react";

function setViewPortHeight(){
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
export default function useViewPortHeight() {
  useEffect(() => {
    setViewPortHeight()
    // We listen to the resize event
    window.addEventListener('resize', setViewPortHeight);
    return () => window.removeEventListener("resize", setViewPortHeight)
  }, [])// fix viewport height

  return function vh(value: number){
    return `calc(var(--vh,1vh) * ${value})`
  }
}
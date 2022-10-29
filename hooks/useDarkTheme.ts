import { useEffect, useState } from "react";

export default function useDarkTheme(){

  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const query = matchMedia(`(prefers-color-scheme: dark)`)
    query.matches ? setIsActive(true) : setIsActive(false)
    query.addEventListener('change', handler)
    function handler(e:MediaQueryListEvent){
      if(e.matches) setIsActive(true)
      else setIsActive(false)
    }

  }, [])
  
  return isActive

}
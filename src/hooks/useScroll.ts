import { useEffect, useState } from 'react'

const useScroll = () => {
    const [show, setShow] = useState(false);
    const controlNavbar = () => {
      if (window.scrollY > 250) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    useEffect(() => {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }, []);
  return  show;
}

export default useScroll

import { useState, useLayoutEffect } from 'react';

const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false);
  const [isStop, setStop] = useState(false);
  
  function handleScroll() {
 
    setTimeout(() => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) return;
      setIsFetching(true);
    }, 2000);


  }



  useLayoutEffect(() => {
    window.addEventListener('scroll',  handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });



  useLayoutEffect(() => {
    
    if (!isFetching) return;
    
    
    setTimeout(() => {
      callback(() => {

        console.log('called back');
      });
    },2000);
  });
  

  return [isFetching, setIsFetching, isStop,setStop ];
};

export default useInfiniteScroll;
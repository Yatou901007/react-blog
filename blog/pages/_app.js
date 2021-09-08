import 'antd/dist/antd.css'
import '../styles/globals.css'
import React , { useState, useEffect } from 'react'


  
function MyApp({ Component, pageProps }) {
  useEffect(()=>{
    document.addEventListener('visibilitychange',function(){
      const isHidden = document.hidden;
      if(isHidden){
        document.title = '(ಥ _ ಥ)离开咯';
      } else {
        document.title = '(￣▽￣)回来啦';
        setTimeout(()=>{
          document.title = '吖小胖的Blog'
        },3000)
      }
      }
    );
  },[])
  return <Component {...pageProps} />
}

export default MyApp

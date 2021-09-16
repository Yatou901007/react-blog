import 'antd/dist/antd.css'
import '../styles/globals.css'
import showBgCanvas from '../static/js/canvas.js'
import React , { useState, useEffect } from 'react'
import ScrollTop from '../components/ScrollTop/index.tsx'
  
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
    });
    // 背景canvas显示
    showBgCanvas()
  },[])
  return (
    <>
      <Component {...pageProps} />
      <ScrollTop />
    </>
  )
}

export default MyApp

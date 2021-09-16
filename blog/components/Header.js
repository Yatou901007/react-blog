import React , { useState, useEffect, useRef, useCallback } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import style from '../styles/components/Header.module.scss'
import { Row, Col, Menu } from 'antd'
import  * as Icons from '@ant-design/icons';
import Image from 'next/image'
import profile from '../static/images/profile.png'

import axios from 'axios'
import  servicePath  from '../config/apiUrl'

const Header = (props) => {
    const [navArray , setNavArray] = useState([])
    const [currentId, setCurrentId] = useState('0')
    const headerRef = useRef();
    let enabled = true
    // 滚动条监听导航滑动消失与出现
    const handleScroll = useCallback(() => {
        // 滚动条滚动时，距离顶部的距离
        const scrollheight = document.documentElement.scrollTop || document.body.scrollTop;
        const current = headerRef.current;
        if (scrollheight >= 420) {
            current && (current.style.top = '-3.2rem')
        } else {
            current && (current.style.top = '0')
        }
    }, []);
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (enabled) {
                enabled = false;
                window.requestAnimationFrame(handleScroll);
                // 每隔50秒触发一次，提高性能
                setTimeout(() => enabled = true, 50);
            }
        });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    // 初始化数据
    useEffect(()=>{
        const initData = async ()=>{
           const result= await axios(servicePath.types)
           setNavArray(result.data.data)
        }
        initData()
    },[])
    useEffect(() => {
        const id = Router.router.query.id || '0'
        setCurrentId(id)
    })
    //跳转到列表页
    const handleClick = (e)=>{
        if(e.key==0){
            Router.push('/')
        }else{
            Router.push('/list?id='+e.key)
        }
    }
    return (
        <div id="screen_bg" className={style.headerContainer}>
            <div className={style.header + ' fixed-top'} ref={headerRef}>
                <div className={style.headerCenter}>
                    <Row>
                        <Col xs={24} sm={24} md={10} >
                            <span className={style.headerLogo}>
                                <Link href={{pathname:'/'}}>
                                    <a>吖小胖</a>
                                </Link>
                            
                            </span>
                            <span className={style.headerTxt}>前端coder</span>
                        </Col>
                    
                        <Col className={style.memuDiv} xs={0} sm={0} md={14} >
                        {/* <Row type='flex'>
                            <Col xs={0} sm={0} md={6}  >
                                    <Link  href={{pathname:'/'}} key={0}>
                                        <a><Icons.HomeOutlined /> 首页</a>   
                                    </Link>
                            </Col>
                                {navArray.map(item => {
                                    const dynamicIcon = React.createElement(
                                        Icons[item.icon]
                                    );
                                    return (
                                        <Col xs={0} sm={0} md={6} key={item.id} >
                                            <Link href={{pathname:'/list',query:{id:`${item.id}`}}}>
                                                <a>{dynamicIcon} {item.typeName}</a>
                                            </Link>
                                        </Col>
                                    )
                                })}
                        </Row> */}
                        <Menu
                                mode="horizontal"
                                selectedKeys={[currentId]} 
                                onClick={handleClick}
                            >
                                <Menu.Item key="0">
                                    <Icons.HomeOutlined />
                                    首页
                                </Menu.Item>
                                {
                                    navArray.map((item)=>{
                                        const dynamicIcon = React.createElement(
                                            Icons[item.icon]
                                        );
                                    return(
                                        <Menu.Item key={item.id + ''}>
                                            {dynamicIcon}
                                            {item.typeName}
                                        </Menu.Item>
                                    )
                                    }) 
                                }
                            </Menu>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className="h-information bounceInUp">
            <Image src={profile} />
            {/* <img data-v-5f48c8b8="" src="http://cdn.woc12138.com/profile2.jpg" alt="profile-photo" /> */}
            <h2 className="h-description">Keep Learning, Keep Happy</h2>
            </div>
        </div>
       
       
    )
}

export default Header

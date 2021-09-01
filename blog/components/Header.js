import React ,{useState,useEffect} from 'react'
import Router from 'next/router'
import Link from 'next/link'
import style from '../styles/components/Header.module.css'
import {Row,Col, Menu} from 'antd'
import { HomeOutlined, FileDoneOutlined, SmileOutlined } from '@ant-design/icons'

// import axios from 'axios'
// import  servicePath  from '../config/apiUrl'

const Header = () => {
   
    return (
       
            <div className={style.header}>
                <div className={style.headerCenter}>
                    <Row type="flex" justify="center">
                        <Col xs={24} sm={24} md={15} >
                            <span className={style.headerLogo}>
                                <Link href={{pathname:'/'}}>
                                    <a> 吖小胖</a>
                                </Link>
                            
                            </span>
                            <span className={style.headerTxt}>专注前端开发。</span>
                        </Col>
                    
                        <Col className={style.memuDiv} xs={0} sm={0} md={9} >
                           <Row type='flex'>
                               <Col xs={0} sm={0} md={6}  >
                                    <Link  href={{pathname:'/'}}>
                                        <a><HomeOutlined /> 首页</a>   
                                    </Link>
                               </Col>
                               <Col xs={0} sm={0} md={6}  >
                                    <Link  href={{pathname:'/list',query:{id:1}}}>
                                        <a><FileDoneOutlined /> 小本本</a>   
                                    </Link>
                               </Col>
                               <Col xs={0} sm={0} md={6}  >
                                    <Link  href={{pathname:'/list',query:{id:2}}}>
                                        <a><SmileOutlined /> 踩坑</a>   
                                    </Link>
                               </Col>
                           </Row>
                        </Col>
                    </Row>
                </div>
            </div>
       
    )
}

export default Header

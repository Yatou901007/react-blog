import React, { useState } from 'react';
import axios from 'axios';
import Head from 'next/head'
import Link from 'next/link'
import { Row, Col, List } from 'antd';
import { ClockCircleOutlined, FileDoneOutlined, EyeOutlined } from '@ant-design/icons'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'

const Home = (list) => {
  console.log(list)
  const [ mylist , setMylist ] = useState(list.data);
  return (
    <div>
      <Head>
        <title>首页</title>
      </Head>
      <Header></Header>
      <Row className="comm-main" type="flex" justify="center">
          <Col className="comm-left" xs={24} sm={24} md={18}>
            <List
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <List.Item>
                  <h1 className="list-title">
                    <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                      {item.title}
                    </Link>
                  </h1>
                  <div className="list-icon">
                    <span><ClockCircleOutlined /> {item.add_time}</span>
                    <span><FileDoneOutlined /> {item.typeName}</span>
                    <span><EyeOutlined /> {item.view_count}人</span>
                  </div>
                  <div className="list-context">{item.introduce}</div>  
                </List.Item>
              )}
            /> 
          </Col>
          <Col xs={0} sm={0} md={6}>
            <div className="comm-right">
              <Author />
            </div>
          </Col>
      </Row>
      <Footer/>
    </div>
  )
}
Home.getInitialProps = async ()=>{
  const promise = new Promise((resolve)=>{
    axios('http://127.0.0.1:7001/default/articles').then(
      (res)=>{
        // console.log('远程获取数据结果:',res.data.data)
        resolve(res.data)
      }
    )
  })

  return await promise
}

export default Home;

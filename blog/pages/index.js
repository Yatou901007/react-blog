import React, { useState } from 'react';
import axios from 'axios';
import Head from 'next/head'
import Link from 'next/link'
import { Row, Col, List, Affix, Card } from 'antd';
import { ClockCircleOutlined, FileDoneOutlined, EyeOutlined } from '@ant-design/icons'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import ScrollTop from '../components/ScrollTop/index.tsx'
import Image from 'next/image'
import write from '../static/images/write.gif'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

import servicePath  from '../config/apiUrl'

const Home = (list) => {
  const [ mylist , setMylist ] = useState(list.data);
  const renderer = new marked.Renderer();
  // 文章设置
  marked.setOptions({
    renderer: renderer, // 这个是必须填写的，你可以通过自定义的Renderer渲染出自定义的格式
    gfm: true, // 启动类似Github样式的Markdown,填写true或者false
    pedantic: false,// 只解析符合Markdown定义的，不修正Markdown的错误。填写true或者false
    sanitize: false, // 原始输出，忽略HTML标签，这个作为一个开发人员，一定要写false
    tables: true,// 支持Github形式的表格，必须打开gfm选项
    breaks: false,// 支持Github换行符，必须打开gfm选项，填写true或者false
    smartLists: true,// 优化列表输出，这个填写ture之后，你的样式会好看很多，所以建议设置成ture
    smartypants: false,// 
    highlight: function (code) { // 高亮显示规则 ，这里我们将使用highlight.js来完成
      return hljs.highlightAuto(code).value;
    }
  }); 
  return (
    <div>
      <Head>
        <title>首页</title>
      </Head>
      <Header></Header>
      <Row className="comm-main" type="flex" justify="center">
          <Col xs={24} sm={24} md={18}>
            {/* <List
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
                  <div className="list-context"
                        dangerouslySetInnerHTML={{__html:marked(item.introduce)}}
                  ></div>
                </List.Item>
              )}
            />  */}
            {
              mylist.map(item => {
                return (
                  <Card className="foldcontent-panel" key={item.id}>
                    <h1 className="list-title">
                      <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                        {item.title}
                      </Link>
                    </h1>
                    <div className="list-icon">
                      <span><Image src={write} /> 写于 {item.add_time}</span>
                      <span><FileDoneOutlined /> {item.typeName}</span>
                      <span><EyeOutlined /> {item.view_count}人</span>
                    </div>
                    {
                      !item.unfold
                      ?
                      <div className="all-context"
                            dangerouslySetInnerHTML={{__html:marked(item.introduce)}}
                      ></div>
                      :
                      <div className="all-context"
                            dangerouslySetInnerHTML={{__html:marked(item.article_content)}}
                      ></div>
                    }
                    <div className="fold" onClick={()=> {item.unfold = !item.unfold;setMylist([...mylist]);}}>
                      {!item.unfold ? '展开' : '收起'}
                    </div>
                  </Card>
                )
              })
            }
          </Col>
          <Col xs={0} sm={0} md={6}>
            <Affix offsetTop={10}>
              <div className="comm-user">
                <Author />
              </div>
            </Affix>
          </Col>
      </Row>
      <Footer/>
      <ScrollTop />
    </div>
  )
}
Home.getInitialProps = async () => {
  const result = await axios(servicePath.articles)
  return result.data;
}

export default Home;

import React, { ReactDOM, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Head from 'next/head'
import Link from 'next/link'
import { Row, Col, List, Affix, Card } from 'antd';
import { ClockCircleOutlined, FileDoneOutlined, EyeOutlined } from '@ant-design/icons'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import Image from 'next/image'
import write from '../static/images/write.gif'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

import servicePath  from '../config/apiUrl'

const Home = (list) => {
  const pannelRef = useRef();
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
  const foldChange = (e, item) => {
    item.isExpand = !item.isExpand;
    setMylist([...mylist]);
    if (item.isExpand) { // 当前为展开状态，按钮文字为【收起】
      e.target.className = 'is-expand fold'
    } else {
      e.target.className = 'fold'
    }
  }
  // 滚动时，【收起】按钮是否浮动显示的判断
  useEffect(() => {
    let enabled = true
    const toggleVisibility = () => {
      // 所有文章列表
      const parentDom = Array.from(pannelRef.current.getElementsByClassName('foldcontent-panel'));
      // 遍历文章列表，找到哪篇文章在文章底部区域显示
      parentDom.map((element) => {
        // 获取当前文章元素的【收起】按钮
        const expandBtn = element.getElementsByClassName('is-expand');
        if (expandBtn.length > 0) {
          // 找到哪篇文章在文章底部区域显示（仅有一个）
          // 1）判断当前文章是否在底部
          const isBottom = element.clientHeight + element.offsetTop > window.innerHeight + window.pageYOffset;
          // 2）判断当前文章是否在可视区域内：top 小于等于 视窗高度，bottom 大于 0
          const rect = element.getBoundingClientRect();
          const viewHeight = window.innerHeight || document.documentElement.clientHeight;
          const isViewPort = rect.top <= viewHeight && rect.bottom >= 0;
          // console.log(isBottom, isViewPort)
          if (isBottom && isViewPort) {
            // console.log('底部', index, element, element.getElementsByClassName('is-expand'))
            // 是底部文章且没有fix-btn样式，加入fix-btn样式
            if (!expandBtn[0].classList.contains('fix-fold')) {
              expandBtn[0].classList.add('fix-fold');
            }
          } else {
            // 不是底部的文章，移除fix-fold样式
            if (expandBtn[0].classList.contains('fix-fold')) {
              expandBtn[0].classList.remove('fix-fold');
            }
          }
        }
      })
    };

    window.addEventListener('scroll', () => {
      if (enabled) {
        enabled = false;
        window.requestAnimationFrame(toggleVisibility);
        // 每隔50秒触发一次，提高性能
        setTimeout(() => enabled = true, 50);
      }
    });

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  return (
    <div>
      <Head>
        <title>首页</title>
      </Head>
      <Header></Header>
      <Row className="comm-main" type="flex" justify="center" ref={pannelRef}>
          <Col xs={24} sm={24} md={18} style={{position: 'static'}}>
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
                      !item.isExpand
                      ?
                      <div className="all-context"
                            dangerouslySetInnerHTML={{__html:marked(item.introduce)}}
                      ></div>
                      :
                      <div className="all-context"
                            dangerouslySetInnerHTML={{__html:marked(item.article_content)}}
                      ></div>
                    }
                    <div className="fold" onClick={(e) => foldChange(e, item)}>
                      {!item.isExpand ? '展开' : '收起'}
                    </div>
                  </Card>
                )
              })
            }
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
    </div>
  )
}
Home.getInitialProps = async () => {
  const result = await axios(servicePath.articles)
  return result.data;
}

export default Home;

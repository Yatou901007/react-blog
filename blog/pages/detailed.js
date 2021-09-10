import Head from 'next/head'
import axios from 'axios';
import { Row, Col, Affix } from 'antd';
import { ClockCircleOutlined, FileDoneOutlined, EyeOutlined } from '@ant-design/icons'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollTop from '../components/ScrollTop/index.tsx'
import Image from 'next/image'
import write from '../static/images/write.gif'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import Tocify from '../components/tocify.tsx' // 目录

import servicePath  from '../config/apiUrl'
 
const Detailed = (props) => {
  const renderer = new marked.Renderer();
  // 目录
  const tocify = new Tocify()
  renderer.heading = function(text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };
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
  const html = marked(props.article_content) 
    
  return (
    <div>
      <Head>
        <title>详情</title>
      </Head>
      <Header></Header>
      <Row className="comm-main" type="flex" justify="center">
          <Col className="comm-left" xs={24} sm={24} md={18}>
            <div>
                <div className="detailed-title">
                  {props.title}
                </div>
            
                <div className="list-icon center">
                  <span><Image src={write} /> 写于 {props.add_time}</span>
                  <span><FileDoneOutlined /> {props.typeName}</span>
                  <span><EyeOutlined /> {props.view_count}人</span>
                </div>
                <div className="detailed-content"
                  dangerouslySetInnerHTML = {{__html:html}}>
                </div>
             </div>
          </Col>
          <Col xs={0} sm={0} md={6}>
            <div className="comm-right">
              <Affix offsetTop={10}>
                <div className="detailed-nav comm-box">
                  <div className="nav-title">目录</div>
                  <div className="toc-list">
                    {tocify && tocify.render()}
                  </div>
                </div>
              </Affix>
            </div>
          </Col>
      </Row>
      <Footer/>
      <ScrollTop />
    </div>
  )
}

Detailed.getInitialProps = async(context)=>{
  let id = context.query.id
  const promise = new Promise((resolve)=>{
    axios(servicePath.articleDetail + id).then(
      (res)=>{
        resolve(res.data.data[0])
      }
    )
  })
  return await promise
}
export default Detailed;

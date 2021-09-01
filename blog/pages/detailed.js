import Head from 'next/head'
import axios from 'axios';
import { Row, Col, Affix } from 'antd';
import { ClockCircleOutlined, FileDoneOutlined, EyeOutlined } from '@ant-design/icons'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Image from 'next/image'
import write from '../static/images/write.gif'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import MarkdownNavbar from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
 
const Detailed = (props) => {
  const renderer = new marked.Renderer();
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
                  标题
                </div>
            
                <div className="list-icon center">
                  <span><Image src={write} /> 写于 2021-08-30</span>
                  <span><FileDoneOutlined /> 小本本</span>
                  <span><EyeOutlined /> 111人</span>
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
                <MarkdownNavbar source={html} ordered={false} />
              </div>
              </Affix>
            </div>
          </Col>
      </Row>
      <Footer/>
    </div>
  )
}

Detailed.getInitialProps = async(context)=>{
  let id = context.query.id
  const promise = new Promise((resolve)=>{
    axios('http://127.0.0.1:7001/default/articleDetail/'+id).then(
      (res)=>{
        resolve(res.data.data[0])
      }
    )
  })
  return await promise
}
export default Detailed;

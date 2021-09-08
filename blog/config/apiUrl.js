let ipUrl = 'http://127.0.0.1:7001/default/'

let servicePath = {
    types: ipUrl + 'types', // 文章类别
    articles: ipUrl + 'articles', // 文章列表
    articleDetail: ipUrl + 'articleDetail/', // 文章详情
    articlesById: ipUrl + 'articlesById/', // 文章列表 根据type id
}

export default servicePath;
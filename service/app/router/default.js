module.exports = app =>{
    const {router,controller} = app
    router.get('/default/index',controller.default.home.index)
    router.get('/default/articles',controller.default.home.articles)
    router.get('/default/articleDetail/:id',controller.default.home.articleDetail)
    router.get('/default/types',controller.default.home.types)
    router.get('/default/articlesById/:id',controller.default.home.articlesById)
}
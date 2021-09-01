'use strict';

const Controller = require('egg').Controller

class HomeController extends Controller{

    async index(){
        //获取用户表的数据

        let result = await this.app.mysql.get('article',{})
        this.ctx.body=result
    }
    // 文章列表
    async articles(){

        let sql = 'SELECT article.id as id,'+
                  'article.title as title,'+
                  'article.introduce as introduce,'+
                  "FROM_UNIXTIME(article.add_time,'%Y-%m-%d %H:%i:%s' ) as add_time,"+
                  'article.view_count as view_count ,'+
                  '.type.typeName as typeName '+
                  'FROM article LEFT JOIN type ON article.type_id = type.Id'
     
         const results = await this.app.mysql.query(sql)
     
         this.ctx.body={
             data:results
         }
    }
    // 文章列表
    async articleDetail(){
        //先配置路由的动态传值，然后再接收值
        let id = this.ctx.params.id
        console.log('----', id)

        let sql = 'SELECT article.id as id,'+
        'article.title as title,'+
        'article.introduce as introduce,'+
        'article.article_content as article_content,'+
        "FROM_UNIXTIME(article.add_time,'%Y-%m-%d %H:%i:%s' ) as add_time,"+
        'article.view_count as view_count ,'+
        'type.typeName as typeName ,'+
        'type.id as typeId '+
        'FROM article LEFT JOIN type ON article.type_id = type.Id '+
        'WHERE article.id='+id



        const result = await this.app.mysql.query(sql)


        this.ctx.body={data:result}

    }
}

module.exports = HomeController
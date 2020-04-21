var xss = require("xss")

//基本路径
//加载express框架
const express = require("express")
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const fs = require("fs")
const path = require("path")
//jsonwebtoken跨域认证
const jwt = require('jsonwebtoken')
//处理上传文件的中间件
const multer = require('multer')
//设置密钥
app.set('secret','xjf2n3n212n4')
//assert判断抛出异常
const assert = require('http-assert')
// 引入mysql驱动
const mysql = require('mysql')
// 连接数据库
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    port: '3306', 
    database : 'blog'
  })
connection.connect()

// 配置中间件
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//挂载express-session
app.use(session({
    secret: 'keyboard cat', //添加加密字符串
    resave: false,
    saveUninitialized: true  //无论请求与否都分配session
  }))
//use中间件使用静态资源
// app.use('/',express.static('./dist'))
app.use('/',express.static('../dist'))
// app.use('/',express.static('../../front-end/web-page/dist'))
app.use('/',express.static('./img'))


//获取token
function token_req(req,res,config){
    if(req.headers.authorization.length > 16){        
        //前端请求头携带的token
        const req_token = req.headers.authorization.split(' ').pop()
        //解密token
        const tokenData = jwt.verify(req_token,app.get('secret'))
        config.call(this,tokenData)
    }    
}
//验证token返回数据
function verify_token(req,res,config){
    if(req.headers.authorization.length > 16){        
        //前端请求头携带的token
        const req_token = req.headers.authorization.split(' ').pop()
        //解密token
        const tokenData = jwt.verify(req_token,app.get('secret'))                   
        connection.query("SELECT * FROM user WHERE id='"  + tokenData.id + "'" ,(err,result)=>{
            if(err){
                console.log(err);
            }
            
            for(let i = 0; i<result.length;i++){
                result[i].password = '***'
            }               
            res.send({
                token: req_token,
                user_info: result[0]
            }) 


        })      
    }else{
        config.call(this,req,res)
    }
}
//获取id
function getId(req){
    let req_token = req.headers.authorization.split(' ').pop()
    let tokenData = jwt.verify(req_token,app.get('secret'))   
    return tokenData.id
}
//获取日期
function getDate(){
    let curDate = new Date()
    return curDate.getFullYear() + '-' +(curDate.getMonth()+1) + '-'  + curDate.getDate() + ' '  +curDate.getHours() + ':'+ curDate.getMinutes()
}

//获取首页数据
app.get('/index_data',(req,res)=>{
    const blog_sql = "SELECT * FROM blog ORDER BY views DESC" 
    connection.query(blog_sql,(err,result)=>{
        if(err){return}
        res.send(result)

    })
})
const select_user_id = "SELECT * FROM user WHERE id = "
//跳转详情页
app.get('/detail',(req,res)=>{
    res.sendFile(path.join(__dirname, '../dist', 'index.html'))
})
app.post('/detail',(req,res)=>{
    const blog_sql = "SELECT * FROM blog WHERE blog_id = "+ req.body.id
    connection.query(blog_sql,(err,result)=>{
        if(err){return}
        result[0].views += 1
        connection.query("UPDATE blog SET views = ? WHERE blog_id ='"+result[0].blog_id+"'",[result[0].views])
        connection.query(select_user_id+result[0].user_id,(err2,result2)=>{
            const comment_sql = "SELECT * FROM comment WHERE blog_id ="+req.body.id
            connection.query(comment_sql,(err3,result3)=>{
                let father = []
                let child = {}
                result3.forEach(item=>{
                    if(item.p_c_id == 0){
                        father.unshift(item)
                    }else{
                        if(!child.hasOwnProperty(item.p_c_id)){
                            child[item.p_c_id] = []                        
                        }
                        child[item.p_c_id].unshift(item)
                        
                    }
                })
                let resData = Object.assign(result[0],result2[0])
                
                res.send({
                    detail: resData,
                    comment: father,
                    child: child
                })  
            })
                
        })
    })    
})

//空间
app.get('/zone',(req,res)=>{
    res.sendFile(path.join(__dirname, '../dist', 'index.html'))
})
app.post('/zone',(req,res)=>{
    const sql = "SELECT * FROM user WHERE name = '"+req.body.name+"'"
    connection.query(sql,(err,result)=>{
        if(err){return}
        const sql2 = "SELECT * FROM blog WHERE user_id = "+result[0].id
        connection.query(sql2,(err2,result2)=>{
            if(err2){return}
            res.send({
                user: result[0],
                blog: result2
            })
        })
    })
})

//登录
app.post('/login',(req,res)=>{
    verify_token(req,res,()=>{
        const login_sql = "SELECT * FROM user WHERE name='" + req.body.name + "'";
        connection.query(login_sql,function (err, result) {
            if(err){return}
            if(result[0] == undefined) {
                res.send('err')
                return
            }
            if(result[0].password == req.body.password){
                const token = jwt.sign({id:result[0].id},app.get('secret'))
                result[0].password = '***'
                res.send({
                    user_info:result[0],
                    token:token              
                })
            }else{
                res.send('err')
            }
        })   
    })  
})
//注册
app.post('/register',(req,res)=>{
    const register_sql = "SELECT * FROM user WHERE name='" + req.body.name + "'";
    const curDate = new Date()
    const create_date = curDate.getFullYear() + '-' +(curDate.getMonth()+1) + '-'  + curDate.getDate() 
    connection.query(register_sql ,function (err, result) {
        if(err){return}
        if(result.length === 0){  //账号未被注册
            connection.query('INSERT INTO user(name,password,sex,date) VALUES(?,?,?,?)',
            [req.body.name,req.body.password,req.body.sex,create_date],(err,result)=>{
                if(err){
                    console.log('[INSERT ERROR] - ',err.message)
                    return
                }
                const login_sql = "SELECT * FROM user WHERE name='" + req.body.name + "'";
                connection.query(login_sql,(err,result)=>{
               
                    const token =  jwt.sign({id:result[0].id},app.get('secret'))
                    res.send({
                        username: req.body.name,
                        token
                    })
                })

            })
        }else{  //账号已存在
            return res.json({status_code:1,ww:2})
        }
        

    })        
})

//保存博客文件
const blog_upload = multer({dest:'./img/blog'})
app.post('/saveImg',blog_upload.single('img'),(req,res)=>{
    res.send({
        url:'/blog/'+req.file.filename
    })    
})
//删除
app.post('/deleteImg',(req,res)=>{
    fs.unlink('./img'+ req.body.filename, err=>{
        if(err){
            console.log(err)    
        }
        res.send()
    })
})

//发表文章
app.post('/submitBlog',(req,res)=>{
    let rb = req.body
    rb.title = xss(rb.title)
    rb.front_content = xss(rb.front_content)
    rb.content= xss(rb.content)
    rb.cover=xss(rb.cover)
    const save_sql = 'INSERT INTO blog(title,content,blog_date,user_id,front_content,cover) VALUES(?,?,?,?,?,?)'
    connection.query(save_sql,[rb.title, rb.content, getDate(), getId(req), rb.front_content, rb.cover],(err,result)=>{
        if(err){
            res.send({
                code:0
            })
            console.log(err);
            return
        }
        
        res.send({
            id:result.insertId
        })
    })
    
})

//个人信息
//设置头像
const portrait_upload = multer({dest:'./img/portrait'})
app.post('/set_portrait',portrait_upload.single('img'),(req,res)=>{
    connection.query(select_user_id + getId(req),(err0,result0)=>{
        if(result0[0].portrait !== 'user.png'){//删除旧头像
            fs.unlink('./img/portrait/'+ result0[0].portrait, err1=>{
                if(err1){
                    console.log(err1);
                }
            })
        }
        const update_protrait = "UPDATE user SET portrait = ? WHERE id=" + getId(req)
        connection.query(update_protrait,[req.file.filename],(err,result) => {
          res.send({protrait_URL: req.file.filename})
        })
    })  

})
//设置性别
app.post('/set_sex',(req,res)=>{
    const sex = req.body.sex
    if(sex == 1){
        connection.query("UPDATE user SET sex = ? WHERE id ='"+getId(req)+"'",
        [0])
        res.send('0')
    }else{
        connection.query("UPDATE user SET sex = ? WHERE id ='"+getId(req)+"'",
        [1])   
        res.send('1')     
    }    
})
//设置简介
app.post('/set_intro',(req,res)=>{
    connection.query("UPDATE user SET intro = ? WHERE id ='"+getId(req)+"'",[req.body.intro])
    res.send(req.body.intro)
})

//发表评论
app.post('/comment',(req,res)=>{
    let rb = req.body
    rb.c_content = xss(rb.c_content)
    let date = getDate()
    const save_sql = 'INSERT INTO comment(blog_id, user_id, user_name, user_portrait, c_content, p_c_id, c_date) VALUES(?,?,?,?,?,?,?)'
    connection.query(save_sql,
        [rb.blog_id, rb.user_id, rb.user_name, rb.user_portrait, rb.c_content, rb.p_c_id, date],
    (err,result)=>{
        if(err){
            console.log(err);
        }
        console.log(result);
        
        connection.query('UPDATE blog SET comments = ? WHERE blog_id ='+rb.blog_id,[++rb.comments],(err2,result2)=>{
     
            if(err2){
                console.log(err2);
                
            }
            let data = Object.assign(rb,{comment_id: result.insertId,c_date: date})
            res.send(data)
        })

    }
    )
})
//保存评论图片
const comment_upload = multer({dest:'./img/comment'})
app.post('/commentImg',comment_upload.single('file'),(req,res)=>{
    res.send({
        url:'/comment/'+req.file.filename
    })
    
})

//监听端口3000
app.listen(3000,()=>{
    console.log('服务已启动');
    
})

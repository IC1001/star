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
    database : 'star-album'
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

//数据库操作语句
const select_album_id = "SELECT * FROM album WHERE album_id='"
const select_sql = "SELECT * FROM user WHERE id='"
const select_album = "SELECT * FROM album WHERE user_id='"
const select_user_album = "SELECT * FROM user INNER JOIN album ON user.id=album.user_id WHERE id='" 
const update_like_album = "UPDATE user SET like_album = ? WHERE id='" 
const update_collect_album = "UPDATE user SET collect_album = ? WHERE id='" 
const update_albumByid = "UPDATE album SET like = ? WHERE album_id='" 
const select_comment = "SELECT * FROM comment WHERE album_id='" 

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
        connection.query(select_user_album + tokenData.id + "'" ,(err,result)=>{
            if(err){
                console.log(err);
            }
            
            for(let i = 0; i<result.length;i++){
                result[i].password = '***'
            }             
            const like_album = '('+result[0].like_album+'0)'
            const collect_album ='('+result[0].collect_album+'0)'
            const follow = '('+result[0].followed_user+'0)'
            const fans ='('+result[0].fans_user+'0)'   
            connection.query("SELECT * FROM friend_view  WHERE id IN "+follow,(err2,follow_users)=>{
                connection.query("SELECT * FROM friend_view WHERE id IN "+fans,(err3,fans_users)=>{
                    connection.query(
                        "SELECT * FROM zone_view WHERE album_id IN" + like_album,
                        (err3,like_album_data)=>{
                        connection.query(
                            "SELECT * FROM zone_view WHERE album_id IN" + collect_album,
                            (err4,collect_album_data)=>{
                                // console.log(follow);
                                
                                // console.log(follow_users);
                                
                                res.send({
                                    user_info: result[0],
                                    user_album: result,
                                    token:req_token,
                                    like_collect:{like_album_data,collect_album_data},
                                    friends:{follow_users,fans_users}
                                }) 
                            })   
                    }) 
                })   
            })

        })      
    }else{
        config.call(this,req,res)
    }
}


//————————请求页面操作————————

//请求首页
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, '../dist', 'index.html'))
})

//进入详情页
app.get('/detail',(req,res)=>{   
    res.sendFile(path.join(__dirname, '../dist', 'index.html'))
})
app.post('/detail',(req,res)=>{    
    connection.query(select_album_id + req.body.id +"'",(err,result)=>{
        const views = result[0].views + 1
        connection.query("UPDATE album SET views = ? WHERE album_id='" + req.body.id +"'",[views],(err2,result2)=>{
            connection.query(select_sql + result[0].user_id + "'",(err3,result3)=>{
                connection.query(select_comment + req.body.id +"'",(err4,result4)=>{
                    const album = result[0]
                    album.img = result[0].img.split(',')
                    album.img.pop()
                    album.img_name = result[0].img_name.split(',')
                    album.img_name.pop()
                    album.portrait = result3[0].portrait
                    album.length = album.img.length 
                    result3[0].password = '****' 
                    album.user = result3[0]  
                    album.comment = result4          
                    res.send(album)
                })
            })

        })

    })   
    
})

//获得首页展示数据
app.get('/index_data',(req,res)=>{   
    const get_index_data ="SELECT * FROM album INNER JOIN user ON album.user_id = user.id WHERE album.img != '' AND album.type != '私密'"
    connection.query(get_index_data,(err,result)=>{
        if(result){
            for(let i = 0; i<result.length;i++){
                result[i].password = '***'
            }           
            const index_data = result
            index_data.sort((x,y)=>{
                return (y.views + y.likes * 2 + y.collect * 2) - (x.views + x.likes * 2 + x.collect * 2)
            })
            if(req.headers.authorization.length > 16){
                //前端请求头携带的token
                const req_token = req.headers.authorization.split(' ').pop()
                //解密token
                const tokenData = jwt.verify(req_token,app.get('secret'))                 
                connection.query(select_sql+tokenData.id+"'",(err,result2)=>{
                    const like_album = result2[0].like_album
                    const collect_album = result2[0].collect_album
                    res.send({index_data,like_album,collect_album})
                })
            }else{
                res.send({index_data})
            }
        }
    })
})

//进入分类页面
app.post('/type:title',(req,res)=>{
    const select_album_type = "SELECT * FROM album INNER JOIN user ON album.user_id = user.id  WHERE type='" + req.body.title + "' AND img != ''"
    connection.query(select_album_type,(err,result)=>{
        if(err){ 
            console.log(err);
            return 
        }  
        for(let i = 0; i<result.length;i++){
            result[i].password = '***'
        }
        res.send(result)
    })       
})

//进入空间并传入数据
app.get('/zone',(req,res)=>{
    res.sendFile(path.join(__dirname, '../dist', 'index.html'))
})
app.post('/zone',(req,res)=>{ 
    const select_user_album_name = "SELECT * FROM user INNER JOIN album ON user.name=album.user_name WHERE user_name='" 
    + req.body.user + "' AND type!='私密'" 
    //游客查看空间      
    if(req.headers.authorization.split(' ').pop() == 'undefined'){
        connection.query(select_user_album_name,(err0,result0)=>{
                    //查找所有相册数据
                    const like_album = '('+result0[0].like_album+'0)'
                    const collect_album ='('+result0[0].collect_album+'0)'
                    const follow = '('+result0[0].followed_user+'0)'
                    const fans ='('+result0[0].fans_user+'0)'  
                            
                    connection.query("SELECT * FROM friend_view  WHERE id IN "+follow,(err3,follow_users)=>{
                        connection.query("SELECT * FROM friend_view WHERE id IN "+fans,(err4,fans_users)=>{
                            connection.query(
                                "SELECT * FROM zone_view WHERE album_id IN" + like_album,
                                (err5,like_album_data)=>{
                                connection.query(
                                    "SELECT * FROM zone_view WHERE album_id IN" + collect_album,
                                    (err6,collect_album_data)=>{
                                        res.send({
                                            user_info: result0[0],
                                            user_album: result0,
                                            like_collect:{like_album_data,collect_album_data},
                                            friends:{follow_users,fans_users}
                                        }) 
                                    })                            
                            }) 
                        })                           
                    })
        })        
    }else{
        //前端请求头携带的token
        const req_token = req.headers.authorization.split(' ').pop()
        //解密token
        const tokenData = jwt.verify(req_token,app.get('secret'))
        connection.query(select_sql + tokenData.id +"'",(err,result)=>{   
            if(result[0].name == req.body.user){
                verify_token(req,res)    
            }else{
                connection.query(select_user_album_name,(err2,result2)=>{    
                    for(let i = 0; i<result2.length;i++){
                        result2[i].password = '***'
                    }  
                    //查找所有相册数据
                    const like_album = '('+result2[0].like_album+'0)'
                    const collect_album ='('+result2[0].collect_album+'0)'
                    const follow = '('+result2[0].followed_user+'0)'
                    const fans ='('+result2[0].fans_user+'0)'  
                    connection.query("SELECT * FROM friend_view  WHERE id IN "+follow,(err3,follow_users)=>{
                        connection.query("SELECT * FROM friend_view WHERE id IN "+fans,(err4,fans_users)=>{
                            connection.query(
                                "SELECT * FROM zone_view WHERE album_id IN" + like_album,
                                (err5,like_album_data)=>{
                                connection.query(
                                    "SELECT * FROM zone_view WHERE album_id IN" + collect_album,
                                    (err6,collect_album_data)=>{
                                        res.send({
                                            user_info: result2[0],
                                            user_album: result2,
                                            token:req_token,
                                            like_collect:{like_album_data,collect_album_data},
                                            friends:{follow_users,fans_users}
                                        }) 
                                    })
                            }) 
                        })                           
                    })
                })      
            }
        })
    }
})


//————————登录与注册————————

//登录
app.post('/login',(req,res)=>{
    verify_token(req,res,()=>{
        const login_sql = "SELECT * FROM user WHERE name='" + req.body.name + "'";
        connection.query(login_sql,function (err, result) {
            if(err){return}
            if(result[0].password == req.body.password){
                const token = jwt.sign({id:result[0].id},app.get('secret'))
                connection.query(select_user_album + result[0].id + "'" ,(err2,result2)=>{
                    for(let i = 0; i<result.length;i++){
                        result[i].password = '***'
                    }
                    res.send({
                        user_info:result[0],
                        user_album:result2,
                        token:token              
                    })
                })
            }else{
                res.send()
            }
        })   
    })  
})

//注册
app.post('/register',(req,res)=>{
    const register_sql = "SELECT * FROM user WHERE name='" + req.body.name + "'";
    connection.query(register_sql ,function (err, result) {
        if(err){return}
        if(result.length === 0){  //账号未被注册
            connection.query('INSERT INTO user(name,password,sex) VALUES(?,?,?)',
            [req.body.name,req.body.password,req.body.sex],(err,result)=>{
                if(err){
                    console.log('[INSERT ERROR] - ',err.message)
                    return
                }
                const login_sql = "SELECT * FROM user WHERE name='" + req.body.name + "'";
                connection.query(login_sql,(err,result)=>{
                    const curDate = new Date()
                    const create_date = curDate.getFullYear() + '-' +(curDate.getMonth()+1) + '-'  + curDate.getDate()
                    //创建默认相册
                    connection.query('INSERT INTO album(user_id,album_name,type,date,user_name) VALUES(?,?,?,?,?)',
                        [result[0].id,'默认相册','private',create_date,result[0].name],(err,result)=>{
                            if(err){
                                console.log('[INSERT ERROR] - ',err.message)
                                return
                            }
                        }
                    )                    
                    const token =  jwt.sign({id:result[0].id},app.get('secret'))
                    res.send({username:req.body.name,token})
                })

            })
        }else{  //账号已存在
            return res.json({status_code:1,ww:2})
        }
        

    })        
})


//————————用户对外操作————————

//关注
app.post('/setFollow',(req,res)=>{
    token_req(req,res,(tokenData)=>{
        //加关注
        const zone_data = req.body.zone_data
        const login_user = req.body.login_user
        connection.query(select_sql + tokenData.id+"'",(err,result)=>{
            connection.query(select_sql + zone_data.id+"'",(err2,result2)=>{
                if(req.body.follow_status == '√ 已关注'){  
                    //更新login用户        
                    const followed_user_data = result[0].followed_user + req.body.zone_data.id +','
                    connection.query("UPDATE user SET followed_user = ?,follow = ? WHERE id ='"+tokenData.id+"'",
                    [ followed_user_data, result[0].follow + 1]) 
                    //更新访问用户
                    const fans_user_data = result2[0].fans_user + tokenData.id +','  
                    connection.query("UPDATE user SET fans_user = ?,fans = ? WHERE id ='"+zone_data.id+"'",
                    [ fans_user_data , result2[0].fans + 1])
                    connection.query("SELECT * FROM friend_view WHERE id IN" + '('+fans_user_data+'0)',(err3,result3)=>{        
                        res.send(result3)
                    })   
                }else if(req.body.follow_status == '+ 关注Ta'){  
                    //粉丝列表删除
                    const xx = result[0].followed_user.split(',')
                    const yy = result2[0].fans_user.split(',')
                    const fans_del_num = yy.indexOf(String(login_user.id))
                    const update_fans_user = yy.splice(fans_del_num,1)
                    //关注列表删除
                    const followed_del_num = xx.indexOf(String(zone_data.id))                      
                    const update_followed_user = xx.splice(followed_del_num,1)  
                    //更新login用户       
                    connection.query("UPDATE user SET followed_user = ?,follow = ? WHERE id ='"+tokenData.id+"'",
                        [xx.join(',') , result[0].follow - 1]) 
                        //更新访问用户
                    connection.query("UPDATE user SET fans_user = ?,fans = ? WHERE id ='"+zone_data.id+"'",
                        [yy.join(',') , result2[0].fans - 1]) 
                    connection.query("SELECT * FROM friend_view WHERE id IN" + '('+yy.join(',')+'0)',(err5,result5)=>{
                            res.send(result5)
                        })                            
                }               
            })
        })

    })
})

//点赞
app.post('/setLike',(req,res)=>{
    token_req(req,res,(tokenData)=>{
        if(req.body.islike == true){
            //查找用户，添加like——album
            connection.query(select_sql + tokenData.id + "'",(err,result)=>{
                const update_data =  result[0].like_album + req.body.album_id + "," 
                //查找相册，点赞数++
                connection.query(select_album_id + req.body.album_id + "'",(err2,result2)=>{
                    const like_num = result2[0].likes +1            
                    connection.query("UPDATE album SET likes = ? WHERE album_id='" + req.body.album_id +"'",
                        [like_num],(err3,result3)=>{                                                                     
                        connection.query(update_like_album + tokenData.id +"'",[update_data],(err4,result4)=>{
                            res.send()
                        })                
                    })
                })
            })
        }else if(req.body.islike == false){
            //查找用户，添加like——album
            connection.query(select_sql + tokenData.id + "'",(err,result)=>{
                const like_album_Arr = result[0].like_album.split(',')                
                const del_index = like_album_Arr.indexOf(String(req.body.album_id))      
                like_album_Arr.splice(del_index,1)
                const update_data = like_album_Arr.join(',')              
                //查找相册，点赞数-1
                connection.query(select_album_id + req.body.album_id + "'",(err2,result2)=>{
                    const like_num = result2[0].likes - 1            
                    connection.query("UPDATE album SET likes = ? WHERE album_id='" + req.body.album_id +"'",
                        [like_num],(err3,result3)=>{                                         
                        connection.query(update_like_album + tokenData.id +"'",[update_data],(err4,result4)=>{
                            res.send()
                        })                
                    })
                })
            })
        }
    })

})

//收藏
app.post('/setCollect',(req,res)=>{
    token_req(req,res,(tokenData)=>{
        if(req.body.iscollect == true){
            //查找用户，添加collect——album
            connection.query(select_sql + tokenData.id + "'",(err,result)=>{
                const update_data =  result[0].collect_album + req.body.album_id + "," 
                //查找相册，点赞数++
                connection.query(select_album_id + req.body.album_id + "'",(err2,result2)=>{
                    const collect_num = result2[0].collect +1            
                    connection.query("UPDATE album SET collect = ? WHERE album_id='" + req.body.album_id +"'",
                        [collect_num],(err3,result3)=>{                                         
                        connection.query(update_collect_album + tokenData.id +"'",[update_data],(err4,result4)=>{
                            res.send()
                        })                
                    })
                })
            })
        }else if(req.body.iscollect == false){
            //查找用户，添加collect——album
            connection.query(select_sql + tokenData.id + "'",(err,result)=>{
                const collect_album_Arr = result[0].collect_album.split(',')
                const del_index = collect_album_Arr.indexOf(req.body.album_id)                
                const update_data_Arr =  collect_album_Arr.splice(del_index,1)
                const update_data = update_data_Arr.join(',')
                //查找相册，点赞数++
                connection.query(select_album_id + req.body.album_id + "'",(err2,result2)=>{
                    const collect_num = result2[0].collect - 1            
                    connection.query("UPDATE album SET collect = ? WHERE album_id='" + req.body.album_id +"'",
                        [collect_num],(err3,result3)=>{                                         
                        connection.query(update_collect_album + tokenData.id +"'",[update_data],(err4,result4)=>{
                            res.send()
                        })                
                    })
                })
            })
        }
    })

})

//评论
app.post('/setComment',(req,res)=>{
    const rb = req.body
    const curDate = new Date()
    const create_date = curDate.getFullYear() + '-' +(curDate.getMonth()+1) + '-'  
    + curDate.getDate() + ' '  + curDate.getHours() + ':'  + curDate.getMinutes()
    connection.query("INSERT INTO comment(album_id,user_id,from_id,from_name,content,portrait,date) VALUES(?,?,?,?,?,?,?)",
    [rb.album_id,rb.user_id,rb.from_id,rb.from_name,rb.content,rb.portrait,create_date],(err,result)=>{
        if(err){
            console.log(err);
        }
        connection.query("SELECT * FROM comment WHERE album_id ='"+rb.album_id+"'",(err,result)=>{
            
            res.send(result)
        })
        
        
    })
})

//————————用户自身操作————————

const portrait_upload = multer({dest:'./img/portrait'})
const album_upload = multer({dest:'./img/album'})

//头像上传
app.post('/set_portrait',portrait_upload.single('img'),(req,res)=>{
   //前端请求头携带的token
   const req_token = req.headers.authorization.split(' ').pop()
   //解密token
   const tokenData = jwt.verify(req_token,app.get('secret'))
   const update_protrait = "UPDATE user SET portrait = ? WHERE id='" + tokenData.id + "'"
   connection.query(update_protrait,[req.file.filename],(err,result)=>{
        res.send({protrait_URL:req.file.filename})
   })     
})

//设置性别
app.post('/set_sex',(req,res)=>{
    const sex = req.body.sex
    if(sex == 1){
        connection.query("UPDATE user SET sex = ? WHERE id ='"+req.body.id+"'",
        [0])
        res.send('0')
    }else{
        connection.query("UPDATE user SET sex = ? WHERE id ='"+req.body.id+"'",
        [1])   
        res.send('1')     
    }
})


//————————上传图片操作————————

//相片上传
app.post('/upload',album_upload.single('file'),(req,res)=>{
   //前端请求头携带的token
    const req_token = req.headers.authorization.split(' ').pop()
    //解密token
    const tokenData = jwt.verify(req_token,app.get('secret'))     
    const album_sql = "SELECT * FROM album WHERE user_id='" + tokenData.id 
                    + "' " +"AND album_name='"+req.body.album_name+"'";
    connection.query(album_sql,(err,result)=>{        
        //  format + 
        const new_img = result[0].img + req.file.filename + ','
        if(result[0].img_name==null){
            result[0].img_name = ''
        }
        const new_img_name = result[0].img_name + ","
        connection.query("UPDATE album SET img = ?,img_name = ?  WHERE album_id='"+result[0].album_id+"'",
        [new_img,new_img_name],(err,update_result)=>{
            if(err){console.log('照片上传失败')}
            if(!result[0].cover){
                const cover = new_img.split(',').shift()
                connection.query("UPDATE album SET cover = ? WHERE album_id='"+result[0].album_id+"'",
                [cover],(err,update_result2)=>{                
                })
            }
            res.send(req.file)
    
        })
    })
})

//设置图片标题
app.post('/set_img_name',(req,res)=>{
   //前端请求头携带的token
   const req_token = req.headers.authorization.split(' ').pop()
   //解密token
   const tokenData = jwt.verify(req_token,app.get('secret'))
   const album_sql = "SELECT * FROM album WHERE user_id='" + tokenData.id + "' " +"AND album_name='"+req.body.album_name+"'";  
    connection.query(album_sql,(err,result)=>{
        let img_name = req.body.img_name
        //数组化
        const img_name_new = img_name.split(',')
        const img_name_old = result[0].img_name.split(',')
        //相片上传时自动补充''空图片名，这里是将旧的长度减去新增的长度为替换起始索引值
        const index = img_name_old.length - img_name_new.length
        img_name_old.splice(index,img_name_new.length,img_name_new)
        const update_data = img_name_old.join(',')
        connection.query("UPDATE album SET img_name = ?  WHERE album_id='"+result[0].album_id+"'",
        [update_data],(err,update_result)=>{
            if(err){
                console.log(err);
            }
            res.send(req.body.img_name)
        })
    })
})

//照片取消上传
app.post('/cancel_upload',(req,res)=>{
    token_req(req,res,(tokenData)=>{
        connection.query(select_album + tokenData.id + "' AND album_name='"
        +req.body.album_name + "'",(err,result)=>{
            const xx = result[0].img.split(',').pop()
            const arr_data = result[0].img.split(',')
            for(let i = 0;i<arr_data.length;i++){
                if(arr_data[i]==req.body.file.response.filename){
                    arr_data.splice(i,1)
                }
            }
            const string_data = arr_data.join(',') 
            const img_name_arr = result[0].img_name.split(',')
            const pop_img_name = img_name_arr.pop()
            const canceled_name = img_name_arr.join(',')
            connection.query("UPDATE album SET img = ? ,img_name = ? WHERE album_id='" 
            + result[0].album_id+"'",[string_data,canceled_name],(err2,result2)=>{
                fs.unlink('./img/album/'+req.body.file.response.filename, err2=>{
                    if(err2){
                        console.log(err2);
                    }
                    res.send()
                })
            })
        })
    })

    
})

//设置封面
app.post('/set_cover',(req,res)=>{
    connection.query("UPDATE album SET cover = ? WHERE album_id='"
    +req.body.data.album_id+"'",[req.body.item+','],(err,result) =>{
        if(err){
            console.log(err);
            res.send('设置失败')
        }
        res.send('设置成功')
    })
    
})

//创建相册
app.post('/create_album',(req,res)=>{
    //前端请求头携带的token
    const req_token = req.headers.authorization.split(' ').pop()
    //解密token
    const tokenData = jwt.verify(req_token,app.get('secret'))  
    // console.log([tokenData.id,req.body.album_name,req.body.type]);
    const curDate = new Date()
    const create_date = curDate.getFullYear() + '-' +(curDate.getMonth()+1) + '-'  + curDate.getDate()
    //插入    
    connection.query('INSERT INTO album(user_id,album_name,type,date,user_name) VALUES(?,?,?,?,?)',
        [tokenData.id,req.body.album_name,req.body.type,create_date,req.body.name],(err,result)=>{            
        if(err){
            console.log('[INSERT ERROR] - ',err.message)
            return
        }
        const album_sql = "SELECT * FROM album WHERE user_id='" + tokenData.id + "'" +"AND album_name='"+req.body.album_name+"'";
        connection.query(album_sql,(err,result)=>{
            // console.log(result);           
            const token =  jwt.sign({id:result[0].id},app.get('secret'))
            res.send(result[0])
        })

    })    
})

//删除相册
const del_album = "DELETE FROM album where album_id='"
app.post('/del_album',(req,res)=>{
    connection.query(select_album_id + req.body.id + "'",(err,result)=>{
        const delete_arr = result[0].img.split(',')
        for(let i = 0;i<delete_arr.length;i++){
            //删除磁盘文件
            fs.unlink('./img/album/'+delete_arr[i], err1=>{
                if(err1){
                    console.log(err1);
                }
            })
        }
        //删除数据库图片地址
        connection.query(del_album+req.body.id+"'",(err2,result2)=>{
            if(err2){
                console.log(err2);
            }
            
        })
        res.send()
    })

})

//更改相册
app.post('/set_change',(req,res)=>{
    token_req(req,res,(tokenData)=>{
        connection.query("UPDATE album SET album_name = ?,type=? WHERE album_id='"
        + req.body.album_id +"'",[req.body.name,req.body.type])
        res.send()
    })
})

//修改图片名称
app.post('/change_img_name',(req,res)=>{
    const delete_img_name = req.body.albumData.img_name.splice(req.body.index,1,req.body.change_value)   
    const change = req.body.albumData.img_name.join(',')
    connection.query("UPDATE album SET img_name = ? WHERE album_id='" 
    +req.body.albumData.album_id+"'",[change],(err,result)=>{
        if(err){console.log(err);   }
        res.send(req.body.change_value)
    })
    
        
})

//删除图片
app.post('/delete_img',(req,res)=>{
    const delete_img = req.body.albumData.img.splice(req.body.index,1)   
    const delete_img_name = req.body.albumData.img_name.splice(req.body.index,1)   
    const change = req.body.albumData.img.join(',')  +','
    const change_name = req.body.albumData.img_name.join(',')  +","
    connection.query("UPDATE album SET img = ?,img_name = ? WHERE album_id='" 
    +req.body.albumData.album_id+"'",[change,change_name],(err,result)=>{
        if(err){console.log(err);   }
        fs.unlink('./img/album/'+delete_img, err2=>{
            if(err2){
                console.log(err2);
            }
        })
        res.send()
    })  
})


//————————后台管理操作————————

app.get('/admin',(req,res)=>{   
    res.sendFile(path.join(__dirname, '../dist', 'index.html'))
})

app.post('/admin',(req,res)=>{
    if(req.body.password == 745221499){
        connection.query("SELECT * FROM user",(err,result)=>{
            connection.query("SELECT * FROM album",(err2,result2)=>{
                connection.query("SELECT * FROM comment",(err3,result3)=>{
                    result2.reverse()
                    res.send({
                        album_data: result2,
                        user_data:result,
                        comment_data:result3
                    })
                })

            })

        })
    }
})

//注销用户
app.post('/deleteUser',(req,res)=>{
    connection.query("SELECT * FROM user",(err,result)=>{
        const del_user = "DELETE FROM user where id='"  
        connection.query(del_user+result[req.body.index].portrait+"'",(err2,result2)=>{
            //删除磁盘文件
            fs.unlink('./img/portrait/'+result[req.body.index].portrait, err3=>{
                if(err3){
                    console.log(err3);
                }
            })
            res.send()            
        })      
    })    
})




//监听端口3000
app.listen(3000,()=>{
    console.log('服务已启动');
    
})

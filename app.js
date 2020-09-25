// const car = new Car({

// })
// car.save().then(res => {
//     console.log(res)
// })
// const loginuser = new Loginuser({

// })
// loginuser.save().then(res => {
//     console.log(res)
// })
const express = require("express")
const Car = require('./model/car')
const People = require('./model/people')
const Login = require('./model/login')
const app = new express()
app.use(express.static('public'))
var multer = require('multer')
app.set('view engine', 'ejs')
    // var upload = multer({ dest: 'uploads/' }) //实现的是将该文件放入到这个文件下。
    //类似于GULP
    //自定义路径存放和文件名实现后缀
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})


var upload = multer({ storage: storage })
app.use('/uploads', express.static('uploads')) //配置虚拟显示路径，第一个参数就是路径的地址
app.use(express.urlencoded())

//页面首页加载
app.get('/', (req, res) => {
    res.render('index')
        // })

})
app.get('/user', (req, res) => {
    Car.find({}).populate('p').exec(function(err, doc) {
        //populate表示的是查询，即找到这个P
        console.log(doc)
            //此处做了增加
        res.json({
            code: 200,
            list: doc
        })
    })
})


//登陆页面
app.get('/login', (req, res) => {
        res.render('login')
    })
    //登录请求以及数据返回
app.post('/dologin', (req, res) => {
    var username = req.body.username
    var password = req.body.password
    Login.find({ username: req.body.username, password: req.body.password }).then(mon => {
        console.log(username, password)
        if (mon.length > 0) {
            res.json({
                code: 200,
                msg: "登陆成功"
            })
        } else {
            res.json({
                code: 100,
                msg: "登陆失败"
            })
        }
    })
})




app.get('/add', (req, res) => {
    People.find().then(mon => {
        res.render('add', {
            list: mon
        })

    })

})
app.post('/doAdd', (req, res) => {
    const car = new Car({
        name: req.body.carname,
        carImg: req.body.carImg,
        p: req.body.user
    })
    car.save().then(mon => {
        res.json({
            code: 200,
            msg: "添加成功"
        })
    })

})

//图片上传接口
app.post('/upload', upload.single('avatar'), function(req, res, next) {
    if (req.file) {
        res.json({
            code: 200,
            path: req.file.path
        })
    }
})

//数据修改

app.get('/edit/:id', (req, res) => {
    const id = req.params.id
    Car.findById(id).populate('p').exec(function(err, doc) {
        // console.log(doc)
        res.render('edit', { list: doc })
    })
})
app.put('/doedit/:id', (req, res) => {
    const id = req.params.id
    console.log(id);
    Car.findByIdAndUpdate(id, {
        name: req.body.carname,
        carImg: req.body.carImg,
        p: req.body.user
    }).then(mon => {
        res.json({
            code: 200,
            msg: "数据修改成功"
        })
    })
})





//数据删除
app.delete('/deletitem/:id', (req, res) => {
    const id = req.params.id
    Car.findByIdAndDelete(id).then(mon => {
        res.json({
            code: 200,
            msg: "删除成功"
        })
    })
})





//分页实现
/* var MongoClient = require("mongodb").MongoClient;

function _connectDB(callback) {
    var url = "mongodb://127.0.0.1:27017/dbtable";
    //链接数据库
    MongoClient.connect(url, function(err, db) {
        callback(err, db);
    });
}
//分页查找数据，找到所有数据
exports.findByFen = function(car, data, C, D) {
    var result = []; //结果数组
    if (arguments.length == 3) {
        var callback = C;
        var skipnumber = 0;
        var limit = 0;
    } else if (arguments.length == 4) {
        var callback = D;
        var args = C;
        var skipnumber = args.pageamount * args.page;
        var limit = args.pageamount;
    } else {
        throw new Error("函数参数个数不对");
        return;
    }

    //链接数据库
    _connectDB(function(err, db) {
        var cursor = db.collection(car).find(data).skip(3).limit(3);
        cursor.each(function(err, doc) {
            if (err) {
                callback(err, null);
                db.close();
                return;
            }
            if (doc != null) {
                result.push(doc); //放入结果数组
            } else {
                //遍历结构，没有更多的文档了
                callback(null, result);
                db.close();
            }
        });
    });
}
app.get("/fen", function(req, res) {
    //这个页面需接收一个page参数
    var page = parseInt(req.query.page); //express中读取get参数很简单
    db.findByFen("teacher", {}, { "pageamount": 3, "page": page }, function(err, result) {
        res.send(result);
        console.log(result)
    });
}) */


app.listen(7777, '127.0.0.1')
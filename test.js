// const People = require('./model/people')

// const people = new People({
//     name: '猪八戒'
// })

// people.save().then(res => {
//     console.log(res)
// })
const Login = require('./model/login')

const login = new Login({

})
login.save().then(res => {
    console.log(res)
})
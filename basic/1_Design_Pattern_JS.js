
// 1. SingleTon Pattern of JS
// One instance

// Example 1
const obj1 = {
    a : 27
}
const obj2 = {
    a : 27
}
console.log(obj1 === obj2) // False

// Example 2
// 인스턴스 1회차 생성 후 다음 인스턴스 생성 요청시 기존 생성한 인스턴스 반환
class SingleTon{
    constructor(){
        if(!SingleTon.instance){
            SingleTon.instance = this
        }
        return SingleTon.instance
    }
    getInstance(){
        return this.instance
    }
}

const a1 = new SingleTon()
const b1 = new SingleTon()
console.log(a1 === b1) // true

// Example 3
// Data Base connect
const URL = 'mongodb://localhost:27017//kundolapp'
const createConnection = url => ({"url" : url})
class DB {
    constructor(url){
        if(!DB.instance){
            DB.instance = createConnection(url)
        }
    }
    connect(){
        return this.instance
    }
}
const a2 = new DB(URL)
const b2 = new DB(URL)
console.log(a2 === b2) // true

// Example 4
// Connecation of Mongo DB
Mongoose.prototype.connect = function(uri, options, callback){
    const _mongoose = this instanceof Mongoose ? this : mongoose;
    const conn = _mongoose.connection;

    return _mongoose._promiseOrCallback(callback, cb => {
        conn.poenUri(uri, options, err => {
            if (err != null){
                return cb(err);
            }
            return cb(null, _mongoose)
        });
    });
};

// Example 5
// Connection of MySql
const { query } = require("express")
const mysql = require("mysql");
const pool = mysql.createPool({
    connectionLimit : 10,
    host : 'example.org',
    user : 'kundol',
    password : 'secret',
    database : '디비'
});
pool.connect();

// 모듈 A
pool.query(query, function (error, results, fields){
    if (error) throw error;
    console.log('The solution is : ', results[0].solution);
}) 

// 모듈 B
pool.query(query, function (error, results, fields){
    if (error) throw error;
    console.log('The solution is : ', results[0].solution);
}) 



// 2. Factory Pattern of JS
// Like Factory

// Example 1
const num = new Object(42)
const str = new Object('abc')
num.constructor.name; // Number
str.constructor.name; // String

// Example 2
class Latte{
    constructor(){
        this.name = "Latte"
    }
}
class Espresso{
    constructor(){
        this.name = "Espresso"
    }
}
class LatteFactory{
    static createCoffee(){
        return new Latte()
    }
}
class EspressoFactory{
    static createCoffee(){
        return new Espresso()
    }
}
const FactoryList = {LatteFactory, EspressoFactory}

class CoffeeFactory{
    static createCoffee(type){
        const factory = FactoryList[type]
        return factory.createCoffee()
    }
}
const main = () => {
    const coffee = CoffeeFactory.createCoffee("LatteFactory")
    console.log(coffee.name)
}
main()


// 3. Strategy Patern
// PassPort

var passport = require("passport")
    ,LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function(username, password, done){
        User.findOne({username : username}, function(err, user){
            if(err){
                return done(err);
            }
            if(!user){
                return done(null, false, {message : 'Incorrect username.'})
            }
            if(!user,validPassword(password)){
                return done(null, false, {message : 'Incorrcet password'})
            }
            return done(null, user);
        })
    }
));


// Observer Pattern

// ex 1
const handler = {
    get : function(target, name){
        return name === 'name' ? `${target.a} ${target.b}` : target[name]
    }
}
const p = new Proxy({a:'JAEMIN', b:'IS AMUMU JANGIn'}, handler)
console.log(p.name)

// ex 2
function createReactiveObject(target, callback){
    const proxy = new Proxy(target, {
        set(obj, prop, value){
            if(value !== obj[prop]){
                const prev = obj[prop]
                obj[prop] = value
                callback(`${prop}가 [${prev}] >> [${value}]로 변경되었습니다.`)
            }
            return true
        }
    })
    return proxy
}

const a = {
    "재민" : "솔로"
}

const b = createReactiveObject(a, console.log)
b.재민 = "솔로"
b.재민 = "커플"
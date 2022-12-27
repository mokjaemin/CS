
// 1. 디자인 패턴
// 디자인 패턴이란 프로그램을 설계할 때 발생했던 문제점들을 객체간의 상호관계를 이용하여
// 해결할 수 있도록 하는 하나의 규약 형태

//(+)
// 라이브러리 vs 프레임워크
// 둘 다 공통으로 사용될 수 있는 특정한 기능들을 모듈화 한건 같지만 
// 프레임워크는 폴더명이나 파일명과 관련된 규칙이 엄격하고 라이브러리는 좀 더 자유롭다.

// 1-1 싱글톤패턴
// 하나의 클래스에 오직 하나의 인스턴스를 사용
// 보통 데이터베이스 연결 모듈에 많이 사용
// 장점 : 인스턴스를 생성할때 드는 비용을 줄인다.
// 단점 : 의존성이 너무 높아진다.

// 예시 1
const obj = {
    a : 27
}
const obj2 = {
    a : 27
}
console.log(obj == obj2) // false, 둘은 다른 인스턴스를 가짐

// 예시 2
class Singleton {
    constructor(){
        if(!Singleton.instance){
            Singleton.instance = this
        }
        return Singleton.instance
    }
    getInstance(){
        return this.instance
    }
}
const a = new Singleton()
const b = new Singleton()
console.log(a == b) 
// true, 같은 인스턴스임
// 위의 constructor을 보면 하나의 인스턴스만 갖도록 설계됨

// 예시 3
// MySQL 싱글톤 패턴
const mysql = require("mysql")
const pool = mysql.createPool({
    // 연결 아이디, 패스워드 등 작성
})
pool.connect()

//모듈 A
pool.query(query, function(error, results, fields){
    if(error) throw error;
    console.log("The solution is : ", results[0].solution);
})

//모듈 B
pool.query(query, function(error, results, fields){
    if(error) throw error;
    console.log("The solution is : ", results[0].solution);
})

// 그 밖의 개념

// 싱글톤 패턴의 단점
// 1. TDD를 할때 걸림돌이 됨, TDD는 주로 단위 테스트를 하는데
// 이 때, 테스트가 독립적이여야 하는데 그걸 방해함. (독립적인 인스턴스를 만들기 어렵기 때문에)
// (+) TDD
// 코드 개발시에 테스트 코드 작성을 통해 좀 더 반복적인 검토가 가능하게 한다.

// 의존성 주입
// 싱글톤은 모듈간 결합을 강하게 만들 수 있다는 단점이 있다
// 이때 의존성 주입(모듈간의 의존성 또는 종속성을 낮춤)을 통해 해결.
// 예를 들어, 모듈 A가 변하면 모듈 B도 변해야한다는 상관관계를 해결.
// 모듈마다 분리하는 개념

// 장점
// 1. 모듈 쉽게 교체 가능해져 테스팅 하기 쉬워짐.
// 2. 모듈간의 관계들이 좀 더 명확해짐

// 단점
// 1. 복잡해진다.
// 2. 런타임 패널티 발생 가능

// 원칙
// 1. 상위 모듈은 하위 모듈에서 어떠한 것도 가져오지 않아야 한다.
// 2. 두 모듈 다 추상화에 의존한다. 
// 3. 이 때, 추상화는 세부사항에 의존하지 않는다.




// 1-2 팩토리 패턴
// - 객체를 사용하는 코드에서 객체 생성 부분을 때어내 추상화한 패턴
// - 상속 관계에 있는 두 클래스에서 상위 클래스가 중요한 뼈대를 결정하고
// 하위 클래스에서 객체 생성에 관한 구체적인 내용을 결정하는 패턴

// 장점
// 상위 클래스와 하위 클래스 분리를 통한 느슨한 조합
// 상위 클래스에서는 인스턴스 생성방식에 대해 알 필요가 없기에 유연성 증가
// 리팩토링을 하더라도 한곳만 고치면 되니 유지 보수성 증가

// 예시 1 - new Object()
const num = new Object(42)
const str = new Object('abc')
num.constructor.name; //Number
str.constructor.namel //String
// 전달받은 값에 따라 다른 객체를 생성하며 인스턴스의 타입 등을 정한다.

// 예시 2 - 커피 팩토리
// 라떼 클래스
class Latte{
    constructor(){
        this.name = "Latte"
    }
}
// 에스프레소 클래스
class Espresso{
    constructor(){
        this.name = "Espresso"
    }
}
// 라떼 팩토리 클래스
class LatteFactory{
    static createCoffee(){
        return new Latte()
    }
}
// 에스프레소 팩토리 클래스
class EspressoFactory{
    static createCoffee(){
        return new Espresso()
    }
}
// 팩토리 리스트
const factoryList = { LatteFactory, EspressoFactory }
// 커피 팩토리 클래스
class coffeeFactory {
    static createCoffee(type){
        const factory = factoryList[type]
        return factory.createCoffee()
    }
}
// 메인
const main = () =>{
    const coffee = coffeeFactory.createCoffee("LatteFactory")
    console.log(coffee.name)
}
// 정리 
// 상위클래스(뼈대) - coffeeFactory
// 하위 클래스(구체적 내용) - LatteFactory, EspressoFactory
// 의존성 주입의 한 예시
// coffeeFactory에서 LatteFacory의 인스턴스를 생성하는 것이 아닌 LatteFactory에서 생성하기 때문에

// (+) coffeeFactory에서 static 사용
// 정적 메서드 사용시 클래스의 인스턴스 생성없이 호출이 가능하여 메모리 절약 가능
// 개별 인스턴스에 묶이지 않는다.
// 클래스 내의 함수를 정의할 수 있다는 세가지의 장점이 존재한다.



// 1-3 전략 패턴(정책 패턴)
// 객체의 행위를 바꾸고 싶은 경우 '직접' 수정하지 않고 
// 전략이라고 부르는 '캡슐화한 알고리즘'을 컨텍스트 안에서 바꿔주면서 상호 교체가 가능하게 만드는 패턴
// 예시1 - 우리는 결제할 때 네이버 페이 또는 카카오 페이 등 다양한 전략으로 결제
// 예시2 - js 라이브러리 passport

// passport 라이브러리
// Node.js에서 인증 모듈을 구현할 때 쓰는 미들웨어 라이브러리
// 여러가지 전략을 기반으로 인증할 수 있게 해준다.
// 종류(passport.use()안에 둘 중 하나를 넣어서 사용)
// 1. LocalStrategy - 서비스 내의 회원가입된 아이디와 비밀번호를 기반으로 인증
// 2. OAuth - 페이스북, 네이버 등 다른 서비스를 기반으로 인증하는 전략

// 예시 1
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy( //passport에 new localStrategy를 넣어서 사용
    function(username, password, done){
        //...
    }
));

// (+) 미들웨어
// 분산 컴퓨팅 환경에서 서로 다른 기종의 하드웨어나 프로토콜, 통신환경 등을 연결하여,
// 응용 프로그램과 그 프로그램이 운영되는 환경간에 원만한 통신이 이루어질 수 있도록 하는 소프트웨어


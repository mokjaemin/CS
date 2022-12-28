
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


// 1-4 옵저버 패턴
// 주체가 어떤 객체의 상태 변화를 관찰하다가 상태 변화가 있을 때마다 메서드 등을 통해
// 옵저버 목록에 있는 옵저버들에게 변화를 알려주는 디자인 패턴
// 주체 - 객체의 상태 변화를 보고 있는 관찰자
// 옵저버들 - 이 객체의 상태 변화에 따라 전달되는 메서드 듣을 기반으로 추가 변화 사항이 생기는 객체들

// 요약 : "객체"가 변경되면 "주체"가 변화를 "옵저버들"에게 변경사항 등을 전달.
// 주체와 객체를 구별하지 않을 수 있다.

// 예시 
// 1. 트위터
// 예를들어, 이론머스크를 팔로워한 사람들을 옵저버, 일론머스크는 객체이자 주체인데
// 글을 올리면 옵저버들에게 글이 올라왔음을 알려줌
// 2. MVC 패턴 (Model - View - Controller)
// 옵저버 패턴은 이벤트 기반 시스템임.
// Model이 변경되면 update()등의 메소드를 통해 뷰(옵저버)에게 알려주고 
// 이를 기반으로 Controller 등이 동작.

// (+) 상속과 구현
// - 상속(extends) : 자식 클래스가 부모 클래스의 메서드 등을 상속받아 사용하며 자식 클래스에서 추가 및 확장을
// 할 수 있는 것을 말한다. 이로 인해, 재사용성, 중복성의 최소화가 이루어짐
// - 구현(implements) : 부모 인터페이스를 자식 클래스에서 재정의하여 구현하는 것을 말하며,
// 상속과는 달리 반드시 부모클래스의 메서드를 재정의하여 구현해야 한다.
// - 차이점 : 상속은 일반클래스, abstract 클래스를 기반으로 구현되며, 구현은 인터페이스를 기반으로 구현

// 자바스크립트에서의 옵저버 패턴
// 프록시 객체를 통해 구현
// (+) 프록시 객체
// 어떠한 대상의 기본적인 동작(속성 접근, 할당, 순회, 열거, 함수 호출 등)의 작업을 가로챌 수 있는 객체
// 두개의 매개변수 
// target - 프록시할 대상
// handler - 프록시 객체의 target 동작을 가로채서 정의할 동작들이 정해져 있는 함수.

// 예시 1 - 프록시 객체 구현 (get 사용)
const handler = {
    get: function(target, name){
        return name  === 'name' ? `${target.a} ${target.b}` : target[name]
    }
}
const p = new Proxy({a:'JAEMIN', b:'WILL SUCCEED TO WORK IN LINE'}, handler)
console.log(p.name) //JAEMIN WILL SUCCEED TO WORK IN LINE
// 정리
// - target : p
// - handler : p의 동작(name이라는 속성에 접근)을 가로채서 
// 정의할 동작(a와 b라는 문자열을 만들어라)이 정해져 있는 함수.
// - new Proxy로 선언한 객체의 a와 b라는 속성에 특정 문자열을 담아서 handler에
// "name이라는 속성에 접근할 때는 a와 b라는 것을 합쳐서 문자열을 만들어라"

// 예시 2 - 프록시 객체 구현 (set 사용)
function createReactiveOhject(target, callback){
    const proxy = new Proxy(target, {
        set(obj, prop, value){
            if(value !== obj[prop]){
                const prev = obj[prop]
                obj[prop] = value
                callback(`${prop}가 [${prew}] >> [${value}]로 변경되었습니다.`)
            }
            return true
        }
    })
    return proxy
}
// target re_a 선언 및 속성 "재민" 선언
const re_a = {
    "재민" : "멋짐" //obj[prop]
}
// re_b는 프록시 선언을 위한 변수로 target re_a, 실행할 함수(callback) console.log
const re_b = createReactiveOhject(re_a, console.log)

// 속성 변경
re_b.재민 = "멋짐" // value
re_b.재민 = "너무 멋짐" // value
// 재민가 [멋짐] >> [너무 멋짐]로 변경되었습니다.

//정리
// get() -> 속성과 한수에 대한 접근을 가로챔.
// has() -> in 연산자의 사용을 가로챔.
// set() -> 속성에 대한 접근을 가로채, "재민"이라는 속성이 "멋짐"에서 "너무 멋짐"으로 변경되는 것을 감지.

// (+) DOM(Document Object Model)
// 문서 객체 모델을 말하며, 웹 브라우저상의 화면을 이루고 있는 요소들을 지칭한다.
// 프론트엔드에서 많이 쓰는 프레임워크 Vue.js에서 ref나 reactive로 정의하면 해당 값이 변경되었을 때
// 자동으로 DOM에 있는 값이 변경되는데 이는 프록시 객체를 이용한 옵저버 패턴이다.

// 예제 3 - Vue.js 3.0의 옵저버 패턴이 담긴 코드
// 사용하고 싶을 시 사용
// 책 참고


// 1-5 프록시 패턴과 프록시 서버
// 프록시 객체 - 디자인 패턴 중 하나인 프록시 패턴이 녹아들어 있는 객체
// 프록시 패턴 - 대상 객체에 접근하기 전 그 접근에 대한 흐름을 가로채
// 대상 객체 앞단의 인터페이스 역할을 하는 디자인 패턴
// (user) - (interface - proxy - interface) - (target object)
// 객체의 속성, 변화 등을 보안하며 보안, 데이터 검증, 캐싱, 로깅에 사용

// (+) 프록시 서버에서의 캐싱
// 캐시 안에 정보를 담아두고, 캐시 안에 있는 정보를 요구하는 요청에 대해 다시 저 멀리 있는 원격
// 서버에 요청하지 않고 캐시 안에 있는 데이터를 활용하는 것을 말한다.
// 이를 통해 불필요하게 외부와 연결하지 않기 때문에 트래픽을 줄일 수 있다는 장점이 있다.

// 프록시 서버
// 서버와 클라이언트 사이에서 클라이언트가 자신을 통해 다른 네트워크 서비스에 간접적으로 접속할 수 있게
// 해주는 컴퓨터 시스템이나 응용프로그램

// 프록시 서버 1 - nginx
// - 비동기 이벤트 기반의 구조와 다수의 연결을 효과적으로 처리 가능한 웹서버
// 주로 Node.js 서버 앞단의 프록시 서버로 활용
// - "Node.js의 버퍼 오버플로우 취약점을 예방하기 위해서는 nginx를 프록시 서버로 앞단에 놓고
// Node.js를 뒤쪽에 놓는 것이 좋다"
// - 익명 사용자의 직접적인 서버로의 접근을 차단하고 간접적으로 한 단계를 더 거침으로서 보안성 강화
// - 정적 자원을 gzip압축하거나, 메인 서버 앞단에서의 로깅을 할 수도 있다.

// (+) 버퍼 오버플로우
// 버퍼는 보통 데이터가 저장되는 메모리 공간으로 메모리 공간을 벗어나는 경우를 말한다.
// 이때 사용되지 않아야 할 영역에 데이터가 덮어씌워져 주소, 값을 바꾸는 공격이 발생하기도 한다.

// (+) gzip 압축
// 데이터 전송량을 줄일 수 있지만 압축을 해제했을 때 
// 서버에서의 CPU 오버헤드로 생각해서 gzip 압축 사용 유무를 결정해야한다. 

// 프록시 서버 2 - CloudFare
// 전 세계적으로 분산된 서버가 있고 이를 통해 어떠한 시스템의 콘텐츠 전달을 빠르게 할 수 있는 CDN 서비스
// 이점 - CDN 서비스 사용, DDOS 공격 방어, HTTPS 구축
// 1. CDN 서비스
// 각 사용자가 인터넷에 접속하는 곳과 가까운 콘텐츠를 캐싱 또는 배포하는 서버 네트워크를 의미한다.
// 이를 통해, 사용자가 웹 서버로부터 콘텐츠를 다운로드하는 시간을 줄일 수 있다.
// 2. DDOS 공격
// 짧은 시간동안 네트워크에 많은 요청을 보내 네트워크를 마비시켜 웹 사이트의 가용성을 방해하는 사이버 공격 유형
// CloudFare는 의심스러운 트래픽, 사용자가 접속하는 것이 아닌 시스템을 통해 오는 트래픽을 자동으로 차단
// 3. HTTPS 구축
// 서버에서 HTTPS를 구축할 때 이증서를 기반으로 구축할 수도 있다. 하지만 CloudFare를 사용하면
// 별도의 인증서 설치 없이 좀 더 쉽게 HTTPS 를 구축할 수 있다.

// 프록시서버 3 - CORS와 프론트엔드이 프록시 서버



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
# 회원 가입 폼

## Reference
* https://postcode.map.daum.net/guide
* https://www.slideshare.net/ibare/ss-39274621
* https://regexr.com


Ch05_02. 회원 가입 폼-벨리데이션 구조 설계 - 패스트캠퍼스 챌린지 01일차

'김민태의 프론트엔드 아카데미 : 제 1강 JavaScript & TypeScript Essential'

* 해당 강의에 대한 간단한 설명/안내 - 

JavaScript 와 TypeScript 에 관심있고 공부하고 있던 차에 패캠에서 업계 탑티어 분이라고 선전하길래 해당 강사분의 강의 중 JS/TS 기본필수 강의 결제해 수강중입니다.

강사분은 배민(배달의 민족) 앱으로 유명한 우아한 형제들이란 회사의 프론트엔드 개발 그룹장이자 기술 이사라고 하네요. 해당 회사에서 개발도하고 그 회사의 교육 시스템인 우테코(우아한 테크코스 )에서 프론트 엔드 강의도 하셨답니다.



그래서 장단점이 있는거 같네요.(완전 다 완강한건 아니라 확정은 아니지만)

다른 강의에서 보통 보이지 않는 장점이 있는거 같네요. 3강은 바닐라 자바스크립트로 클라이언트 점차 단순 버전에서 리팩토링 한 버전으라이브 코딩하는 진행 방식이라 여기서 얻는 장점이 있네요.

4강도 3강 js 완성본 위에 타입스크립트로 변경하는걸 차차 보여주는데 이것도 장점입니다

다만 4강에서 강의에서 언급했어야 할 소스 변경점이, 강의에서 언급없이 갑자기 나타나기도 하네요. 이것때문에 당황스럽긴 합니다.

그러나 강의 진행하고 이해하는데 큰무리 없는 사항이네요.

프론트엔드 소스 코드 구조나 구성은 이런식으로 하면 괜찮을거 같네라든가, 여긴 이런식으로 코딩하는 구나 등을 얻은거 같네요.

그리고 전체 강의 구성이 '프로젝트 따라하기 식' + '문법 나열식' 조합으로 이뤄져있어 이게 장점이자 단점이 될수있습니다.

단점보단 장점이 큰거 같네요. 한쪽으로 치우친 책이나 강의는 많으니 수강자가 본인에 맞게 적절히 섞어서 하라고 이렇게 구성한 강의 컨셉인거 같네요.

5장 UI 콤포넌트 설명과 6장 JS 문법 설명은 점진적이거나, 라이브 코딩은 아닙니다. 일반적인 스타일과 유사한거 같습니다.

즉, 최종 결과 코드 보면서 설명하는 방식입니다.



어쨋든 4강 완강하고 5강 이제 듣기 시작한 입장에서 보면

html/css, 자바스크립트 입문자(이제 막 html/css, js 시작한 사람)는 수강 비추하고요. 이건 당연한게 JS랑 Ts 프론트엔드 강의니 HTML, CSS 모르면서 FE 자바스크립트에 초점을 맞춘 강의 들으면 수준에 안맞는 거겠죠.

html/css 책 한두권의 전체 소스코드 클론 코딩해봤고, js도 대충이라도 한두번 책으로 공부해본사람이 듣으면 얻을게 많은 강의 같습니다.

전반적으로 강사님이 괜찮은거 같습니다. 일단 html, css, 순수 자바스크립트 알고 몇번 다뤄본 초급자라면(입문자에겐 비추) 추천.







* 커리큘럼은 해당 강의 안내페이지 들어가 중간즘 보면 자세한 커리큘럼 보기 버튼이 있을 겁니다. 그거 보시면 됨.

https://fastcampus.co.kr/dev_academy_kmt1


'Ch05_02. 회원 가입 폼-벨리데이션 구조 설계' 에 대한 내용



[수업에 나온 내용 또는 기반해서 공부한 내용 ]

* Template Engine: 템플릿 엔진은 js가 만들 ui(html)를 쉽게 파악하게 해준다.(Dom API를 주로 사용했을때나 string.replace()를 주로 사용했을때에 비해 한눈에 파악하기 쉽게 해준다.) 타 편의 기능도 제공.

템플릿 엔진은 뷰 UI 코드(html)과 data logic code(db 커넥션이나 JS 데이터 할당 코드)를 분리해 주는 기능을 함.

템플릿 엔진은 서버사이드와, 프론트사이드 템플릿 엔진으로 나눌수있다. 동일한 제품이 양쪽다 지원하기도 하는듯.

유명한 템플릿 엔진은 Mustache, Handlebars, pug(Jade), EJS 등이 있고, 강의에서 다루는 Handlebars.js는 Mustache의 확장판이라고 함.

 

[ 수업에 나온 코드 연습 ]
* 전역 객체 선언, FE Template Engine인 Handlebars 사용
declare global {
interface Window {
Handlebars: {
compile: (template: string) => (data: AnyObject) => string;
},
daum: any,
}
}

* this.data = { ...DefaultProps, ...data}; // data를 처리하는 소스.
사용자한테 데이터를 입력 받고, 입력 안된건 디폴트 값으로 채워놓고, 나머지는 사용자가 넣은 값(data)들로 덮어씌우는 코드. 자주 사용하는 코드이니까 외우기.

* 각 소스코드 폴더 밑의 index.ts의 역할
: app.ts(최종적 app 전체 ui를 관장하는 클래스 파일)는 하위의 UI 클래스들을 불러다가 조합한다. 이 클래스에서 하위 모듈들을 불러올때 하위 구성들의 자세한 구성을 일일이 나열하지 않게 하기 위한 역할을 각 디렉토리 밑의 index.ts 파일이 함. 즉 index 파일에서 하위 구성 요소를 임포트 한후 다시 export 함. 이렇게 함으로써 메인 UI 클래스인 app.ts 파일에선 그 하위 구성이 바껴도 유연하게 대처 가능하게 해줌. 즉, 변화에 열려있고 수정엔 닫힌 구조가 되기 만들어줌.

* View 클래스들의 구조
 : 모든 뷰 클래스들은 template(Handlebars HTML)들을 가지고 있고, 템플릿에 넣을 data와 그 템플릿을 붙일 부모 Container(DOM)를 파라미터로 가지고있다.
또한 render() 메서드를 모두 가지고 있다. render() 의 역할은 템플릿에 데이터를 넣고, 그 템플릿을 html로 만든 다음에 container의 innerHtml에 붙여 UI를 업데이트 하는 역할을 한다. 해당 컨테이너의 이벤트 핸들러도 여기서 붙인다
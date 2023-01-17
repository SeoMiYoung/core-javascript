

/* readyState
  0: uninitalized // 초기화 
  1: loading // 로딩
  2: loaded // 로딩이 완료된 
  3: interactive // 인터랙티브
  4: complete // 완료 
  */


// xhrData 함수 만들기 method, url, body 
function xhrData({ 
  method = 'GET', 
  url = '', 
  body = null, 
  onSuccess = null,
  headers = {
    'Content-Type': 'application/json' // 이건 꼭 해줘야 한다
    //'Access-Control-Allow-Origin': '*' // 동일출처정책의 문제
  }
}){ 
  /* --------------------------- 둘이 세트임 --------------------------- */
  const xhr = new XMLHttpRequest();
  xhr.open(method,url); // 비동기 통신 오픈

  /* --------------------------- headers세팅 -------------------------- */
      // headers={'Content-Type': 'application/json'}
      // 이걸 entries거치면, headers=['Content-Type','application/json'];
      // 배열이 [[A,B], [C,D], ...]
  // Object.entries(headers).forEach(function([key,value]) {
  //   xhr.setRequestHeader(key,value);
  // });
  
  /* --------------------------- 이벤트 실행 --------------------------- */
  xhr.addEventListener('readystatechange',()=>{
    // 객체 구조 분해 할당 -> xhr은 객체이므로 가능
    // xhr이 객체인데 우리는 xhr.status, xhr.readyState, xhr.response이렇게 객체의 것을 꺼내서 쓰고 있어 -> 번거롭다 이거지!
    const {status, readyState, response} = xhr;
    if(status >= 200 && status < 400){
      if(readyState === 4){
        console.log('통신 성공');
        onSuccess(JSON.parse(response));// 비동기 통신을 써서 return이 안되는듯?
      }  
    }else{
      console.error('통신 실패');
    }
  });

  /* --------------------------- 서버에 요청 --------------------------- */
  xhr.send(JSON.stringify(body));
}

// 순서 상관없는 객체를 넘겨주겠다
xhrData({
  url: 'https://jsonplaceholder.typicode.com/users',
  onSuccess: function(result) {
    console.log(result);
  }
});

// xhrData('POST','https://jsonplaceholder.typicode.com/users', {
//   "name": "Mi Young Seo",
//   "username": "Ming",
//   "email": "seo20seo00@naver.com",
//   "address": {
//     "street": "Kulas Light",
//     "suite": "Apt. 556",
//     "city": "Gwenborough",
//     "zipcode": "92998-3874",
//     "geo": {
//       "lat": "-37.3159",
//       "lng": "81.1496"
//     }
//   },
//   "phone": "1-770-736-8031 x56442",
//   "website": "hildegard.org",
//   "company": {
//     "name": "Romaguera-Crona",
//     "catchPhrase": "Multi-layered client-server neural-net",
//     "bs": "harness real-time e-markets"
//   }
// });



















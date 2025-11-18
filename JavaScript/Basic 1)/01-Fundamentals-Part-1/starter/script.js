/*
let js = 'amazing';
40 + 9 + 21; // 자바스크립트에게 얘를 어디에 두라고 한 것이 아니기 때문에 화면에 뜨지 않는다.
console.log(30 + 3)

console.log("Jonas");
console.log("23");

let firstName = 'Jonas';

// let jonas_matilda = 'JM'; // 오류 뜸. 왜냐? 달러, 밑줄이 글자와 숫자 외에 허락된 유일한 기호이기 때문
// let new = 2; // 이것도 오류 뜸. 왜냐? 예약어라서.

let PI = 3.1415; // 파이같은 경우는 바뀌지 않는 상수이므로, 대문자로 쓰는 게 관례임

*/

let javascriptIsFun = true;
console.log(javascriptIsFun); // 불리언

console.log(typeof true);                 // 불리언
console.log(typeof javascriptIsFun);      // 불리언
console.log(typeof 23);                   // 숫자
console.log(typeof 'Jonas');              // 문자열


let year;
console.log(year);                        // undefined
console.log(typeof year);                 // undefined

console.log(typeof null)                  // object 개체? 웬 개체? 오류임.


// 변수 선언
// const job;  이건 오류 뜸. const는 선언하면 부조건 값도 지정해야함

var job = 'programmer';
job = 'teacher'
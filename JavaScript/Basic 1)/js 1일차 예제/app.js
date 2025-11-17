let greetingText = "Hi I'm Erin!";
alert(greetingText);
alert(greetingText);
greetingText = "Hi, I'm really Erin!";
alert(greetingText);
let age = 32;
alert(age);
alert(age);

// 배열
let hobbies = ["Sports", "Cooking", "Reading"];

// 객체 (객체를 사용하면 레이블과 값이 연결되어있음을 알 수 있음)
let job = {
  title: "Developer",
  place: "New York",
  salary: 50000,
};

alert(hobbies[0]);

// 객체에 접근하기
alert(job.place);

let adultYears;
alert(adultYears);

// 함수
function calculateAdultYears(userAge) {
  return userAge - 18;
}
totalAdultYears = calculateAdultYears(age);

// 메서드
let person = {
  name: "Max", // Property
  greet() {
    // Method
    alert("Hello!");
  },
};

// 객체 안의 함수는 어떻게 실행하나?
person.greet();

//연산

console.log(10 % 4); // 2, %는 나머지 연산자
console.log(10 / 4); // 2.5

let result;
result = 10 * 4;
result++; // result = result + 1
result--; // result = result - 1

result += 5; // result = result + 5
result /= 5; //result = result / 5
result *= 5; // result = result * 5

// 텍스트 연산

console.log("Max" + " " + "Schwarzmuller"); // 문자열의 덧셈은 가능함

// 뺄셈, 나눗셈, 곱셈을 출력하려고 하면 NaN 오류가 뜸.

// 문자열 연산 & 문자열 메서드
let userName = "Erin";
console.log(userName.length);
console.log(userName.toUpperCase());

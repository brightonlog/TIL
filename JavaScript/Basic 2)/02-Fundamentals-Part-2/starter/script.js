
// 함수 안에서 다른 함수 호출하기

function cutFruitPieces(fruit) {
  return fruit * 4;
}


function fruitProcessor(appels,oranges){
  const applepieces = cutFruitPieces(apples);
  const orangepieces = cutFruitPieces(oranges);


  const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
  return juice;
}

fruitProcessor(2, 3)


// 자바 스크립트 함수 선언할 때 꼭 함수 이름 지정해주지 않아도 됨

const calcAge = function (birthYear) {
  return 2037 - birthYear;
}


const yearsUntilRetirement = function (birthYear, firstName) {
  const age = calcAge(birthYear)
  const retirement = 65 - age

  if (retirement > 0 ) {
    return retirement
    // return retirement;
  } else {
    return -1
  }
}

console.log(yearsUntilRetirement(1991, 'Jonas'))
console.log(yearsUntilRetirement(1950, 'Mike'))


// 데이터
const friend1 = 'Sam';
const friend2 = 'Mike';
const friend3 = 'John';

// Array 만드는 첫번째 방법
const friends = ['Sam', 'Mike', 'John'];
console.log(friends);

// 두번째 방법
const years = new Array (1991, 1980, 2991, 1002);

// Array 접근법
console.log(friends[0])

console.log(friends.length);
console.log(friends[friends.length - 1]); // 마지막 친구 조회하기

// 재할당
friends[2] = 'Jay'
console.log(friends);

// 여러 유형의 값을 담을 수 있는 배열
const firstName = 'Jonas';
const jonas = [firstName, 'Schmedtmann', 2037 -1991, 'teacher', friends];
console.log(jonas);
console.log(jonas.length);

const years_array = [1991, 2000, 2003, 1992];

const age1 = calcAge(years_array[0]);
const age2 = calcAge(years_array[1]);
const age3 = calcAge(years_array[years_array.length - 1]);

const ages = [age1, age2, age3]

// push 메서드 : 배열 끝에 요소를 추가해줌
friends.push('Jay');

// unshift 메서드
friends.unshift('Bob');

//pop()
friends.pop();  
friends = pop();
console.log(friends);

// shift()
friends.shift();
console.log(friends);

// indexOf()
console.log(friends.indexOf('Mike'));
console.log(friends.indexOf('Bob'));

// includs()
console.log(friends.includes('Bob'));

if (friends.includes('Bob')){
  console.log('You have a friend called Bob.')
}
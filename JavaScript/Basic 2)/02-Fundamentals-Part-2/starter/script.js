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

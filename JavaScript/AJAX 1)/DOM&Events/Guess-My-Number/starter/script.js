'use strict';

/*
console.log(document.querySelector('.message').textContent);


// queryselector로 콘텐츠를 조작하기

document.querySelector('.message').textContent ='Correct Number!'

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

console.log(document.querySelector('.guess').value);
document.querySelector('.guess').value=23;
*/

// 비밀번호는 시작할 때 한 번 정해놓고 계속 갱신되지 않게 해야함
let secretNumber = Math.trunc( Math.random()*20) + 1; 
let score = 20

document.querySelector('.check').addEventListener('click',  function() {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess);

  //입력값이 없을 때
  if (!guess){
    document.querySelector('.body').computedStyleMap.backgroudColor ='#60b347'

    document.querySelector('.number').computedStyleMap.width = '30rem';

     document.querySelector('.message').textContent = 'No number!'
  } else if ( guess === secretNumber ){
    document.querySelector('.message').textContent = 'Corret Number!'
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('.body').computedStyleMap.backgroudColor ='#60b347'
  } else if ( guess > secretNumber){
    document.querySelector('.message').textContent = 'Too high!';
    score--;
    document.querySelector('.score').textContent = score;
  } else if ( guess < secretNumber){
    document.querySelector('.message').textContent = 'Too low!';
    score--;
    document.querySelector('.score').textContent = score;
  }
});

document.querySelector('.again').addEventListener('click', function() {
  score = 20;
  secretNumber = Math.trunc(Math.random())
})
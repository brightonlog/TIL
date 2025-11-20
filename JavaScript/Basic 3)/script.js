for (let i = jonas.length - 1; i >=0; i --){
  console.log(i, jonas[i]); 
}

for (let excercise =1 ; excercise < 4; excercise++){
  console.log(`--- Starting exercise ${exercise}`);

  for (let rep=1; rep < 6; rep ++){
    console.log(`Exercise ${exercise}: Lifting weight repetition.`)
  }
}

// for과 while 문 차이


let rep = 1;
while (rep <= 10){
  console.log(`Lifting weights repetition ${rep}`)
  rep++;
  
}

let dice = Math.trunc(Math.random() * 6 + 1);
console.log(dice);

while (dice!== 6){
  console.log(`You rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 6 + 1);
  if (dice === 6) console.log('Loop is about to end. . . ')
}
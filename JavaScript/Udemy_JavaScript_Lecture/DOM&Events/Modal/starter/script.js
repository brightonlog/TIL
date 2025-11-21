'use strict';

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}


const openModal = function (){
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const modal =  document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal')
const btnsOpenModal = document.querySelectorAll('.show-modal');
console.log(btnsOpenModal);

   
for (let i = 0 ; i < btnsOpenModal.length; i ++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);


document.addEventListener('keydown', function(e){
  console.log('A key was pressed');
  

  if(e.key === 'Escape'){
    if (! modal.classList.contains('hidden')){
      closeModal()
    }
  }
});
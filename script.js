const url = "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";

let question = [];
let order = 0;
let userAnswers = [];
let correctAnswers = [];
let answerItem = ['A', 'B', 'C', 'D'];
let currentAnswer = ' ';

document.getElementById('finish').classList.add('hidden');

function getQuestion() {
   fetch(url)
      .then(response => response.json())
      .then(data => {
         question = data.results;
         console.log(question);
         display();
      })
};

// display question
// ->>
function display() {
   
   const current = question[order];
   document.getElementById('question-number').innerHTML = `Question No.${order + 1} of 10`;                                      
   document.getElementById('question').innerHTML = `Q. ${current.question}`;
   
   const answer = [...current.incorrect_answers, current.correct_answer];
   answer.sort(() => Math.random() - 0.5);
   correctAnswers.push(answerItem[answer.indexOf(current.correct_answer)]);
   // check 
   // console.log(current.correct_answer, correctAnswers);
   let index = 0;
   answerItem.forEach(item => {
      document.getElementById(item).innerHTML = `<b>${item}.</b> ${answer[index]}`;
      index++;
   });

}
// ->>

// Choosing answer 
// ->>
function reset() {
   answerItem.forEach(item => {
      document.getElementById(item).classList.remove('choose');
   });
}

function next() {
   if (order < 9)
   {
      order++;
      userAnswers.push(currentAnswer);
      currentAnswer = ' ';
      reset();
      display();
   } else {
      userAnswers.push(currentAnswer);
      resultsAnnouncement();
   }
}

function choose(answer) {
   reset();
   document.getElementById(answer).classList.add("choose");
   currentAnswer = answer;
}
//->>

// results
function resultsAnnouncement() {
   let point = 0;
   for (let i = 0; i < 10; i++) {
      if (userAnswers[i] === correctAnswers[i]) point++;
   }
   document.getElementById('results').innerHTML = `Correct answer: ${point}/10`
   document.getElementById('finish').classList.remove('hidden');
   document.getElementById('finish').classList.add('visible');
}
//->

// restart everything
function restart() {
   location.reload();
}
getQuestion();

// Timing


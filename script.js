let object = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Rome"],
        answer: "Paris"
    },
    {
        question: "What is 2+3?",
        options: ["4", "5", "6", "7"],
        answer: "5"
    },
    {
        question: "How many sides does a square have?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        question: "What is the opposite of 'hot'?",
        options: ["Warm", "Cold", "Cool", "Freezing"],
        answer: "Cold"
    },
    {
        question: "What is the product of 2 and -3?",
        options: ["6", "5", "-6", "-1"],
        answer: "-6"
    },
    {
        question: "How many days are in a week?",
        options: ["5", "6", "7", "8"],
        answer: "7"
    },
    {
        question: "What is 12 divided by 3?",
        options: ["2", "3", "4", "5"],
        answer: "4"
    },
    {
        question: "Which is the tallest animal on land?",
        options: ["Elephant", "Giraffe", "Horse", "Rhino"],
        answer: "Giraffe"
    },
    {
        question: "What is the color of the Sun?",
        options: ["Yellow", "Red", "Blue", "Green"],
        answer: "Yellow"
    },
    {
        question: "What is the capital of Japan?",
        options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
        answer: "Tokyo"
    }
];

let wrongly_selected_questions = [];
let correct_answers =[];
let choosen_answers =[];

let results_page =document.getElementById("sectionresults");
let feedback_container = document.getElementById("fb-container");
let sectionHomePage = document.getElementById("sectionHomePage");
let question_container = document.getElementById("question_container");
let question_number = document.getElementById("question-number");
let timer_container = document.getElementById("timer-container");
let first_option = document.getElementById("option-1-container");
let second_option = document.getElementById("option-2-container");
let third_option = document.getElementById("option-3-container");
let fourth_option = document.getElementById("option-4-container"); 
let next_button =document.getElementById("next-button");
let sectionnextpage = document.getElementById("sectionnextpage");
let previous_button = document.getElementById("previous_button");
let submit_button = document.getElementById("submit-button");
let restart_button = document.getElementById("restart-button");
let unique_id = null;
let score = document.getElementById("score");
let scoregot = document.getElementById("actual_score");
let result_message = document.getElementById("result_message");
let wrongly_choosen_msg = document.getElementById("wrongly-choosen-msg");
let hurray_image =document.getElementById("hurray-image");
let selected = null;
let i = 0;


function CreateAndAppendQuestion(i) {
    let timer = 10;

    let h1El = document.createElement('h1');
    h1El.classList.add("question");
    h1El.id = "Quest";
    h1El.textContent = (i + 1) + ". " + object[i].question;
    question_container.appendChild(h1El);

    let labelEl = document.createElement('label');
    labelEl.classList.add("timer");
    labelEl.textContent = timer; // Initial value
    timer_container.appendChild(labelEl);

    // Set the interval after creating the label
    let unique_id = setInterval(() => {
        timer = timer - 1;
        labelEl.textContent = timer; // Update the timer label
        if (timer === 0) {
            clearInterval(unique_id);
            
        }
    }, 1000);

    for (let j = 0; j < 4; j++) {
        let optionEl = document.createElement('button');
        optionEl.classList.add("button");
        optionEl.textContent = object[i].options[j];        
        optionEl.onclick = function() {
            clearInterval(unique_id);
            selected = optionEl.textContent;
            if (selected === object[i].answer) {
                optionEl.style.backgroundColor = "#03c04a";
                score.textContent = parseInt(score.textContent) +1;
            }
            else{
                optionEl.style.backgroundColor = "#ff5349"; 
                optionEl.disabled=true;
                wrongly_selected_questions.push(object[i].question);
                correct_answers.push(object[i].answer);
                choosen_answers.push(selected);
            }
            let alloptions  = document.querySelectorAll('.button')
            for(let i of alloptions)
            {
                i.disabled=true;
            }
          
        };
       
        switch (j) {
            case 0:
                first_option.appendChild(optionEl);
                break;
            case 1:
                second_option.appendChild(optionEl);
                break;
            case 2:
                third_option.appendChild(optionEl);
                break;
            case 3:
                fourth_option.appendChild(optionEl);
                break;
        }
    }

}
CreateAndAppendQuestion(i);

function display_next (){
    question_container.textContent = "";
    timer_container.textContent = "";
    first_option.textContent = "";
    second_option.textContent = "";
    fourth_option.textContent = "";
    third_option.textContent = "";
    i = i + 1;
    console.log(i);
    if (i < 10) {
        CreateAndAppendQuestion(i);
    }
    if (i === 9) {
        next_button.classList.add("d-none");
        submit_button.classList.remove("d-none");
    }
    
}

next_button.onclick = function () {
        display_next();
}

restart_button.onclick = function(){
    location.reload();
}

submit_button.onclick = function() 
{
    sectionnextpage.style.display = 'none';
    results_page.style.display = 'block';
    feedback_container.innerHTML = "";
    console.log(wrongly_selected_questions);
    console.log(correct_answers);
    let wrong_count = wrongly_selected_questions.length;
    scoregot.textContent = score.textContent;
    
    if(wrong_count>0)
    {
        for(let p=0; p<wrong_count;p++)
        { 
        console.log(wrongly_selected_questions.length);       
        let result_containerEL = document.createElement('div');
        result_containerEL.classList.add("results-container");
        feedback_container.appendChild(result_containerEL);
        
        let questionEl = document.createElement('p');
        questionEl.classList.add("question-result");
        questionEl.textContent = wrongly_selected_questions[p];
        result_containerEL.appendChild(questionEl);

        let correctAnswerEL = document.createElement('label');
        correctAnswerEL.classList.add("correct-answer-label","col-6");
        correctAnswerEL.textContent = "Correct answer: " + correct_answers[p];
        result_containerEL.appendChild(correctAnswerEL);

        let choosenAnswerEL = document.createElement('label');
        choosenAnswerEL.classList.add("choosen","col-6");
        choosenAnswerEL.textContent = "Choosen Answer: " + choosen_answers[p];
        result_containerEL.appendChild(choosenAnswerEL);

        }
    }
    else{
        result_message.classList.toggle("d-none");
        wrongly_choosen_msg.classList.toggle("d-none");
        hurray_image.classList.toggle("d-none");
    }
}



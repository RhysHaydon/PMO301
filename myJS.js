$(document).ready(function() {
	if (Modernizr.sessionstorage){
		console.log("Session storage is supported by this browser");
	}
	else{
		$('.message').text("Unfortunately your browser doesn't support Session storage");
		$('.message').show();
	}
});

var ans1 = sessionStorage.getItem('q1score');
var ans2 = sessionStorage.getItem('q2score');
var ans3 = sessionStorage.getItem('q3score');
var ans4 = sessionStorage.getItem('q4score');
var ans5 = sessionStorage.getItem('q5score');
var question4answer = document.getElementById("question4Answer");



//---------QUESTION 1------------

//Correct
function question1Correct(){

if (ans1 = null){
	ans1 = 0;
}

ans1 = 1;

sessionStorage.setItem('q1score', ans1);
console.log(sessionStorage.getItem('q1score'));
document.location.href = "#quiz-2";
}

//Wrong
function question1Wrong(){
	if (ans1 = null){
	ans1 = 0;
}

ans1 = 0;

sessionStorage.setItem('q1score', ans1);
console.log(sessionStorage.getItem('q1score'));
document.location.href = "#quiz-2";
}

//---------QUESTION 2------------

//Correct
function question2Correct(){

if (ans2 = null){
	ans2 = 0;
}

ans2 = 1;

sessionStorage.setItem('q2score', ans2);
console.log(sessionStorage.getItem('q2score'));
document.location.href = "#quiz-3";
}

//Wrong
function question2Wrong(){
	if (ans2 = null){
	ans2 = 0;
}

ans2 = 0;

sessionStorage.setItem('q2score', ans2);
console.log(sessionStorage.getItem('q2score'));
document.location.href = "#quiz-3";
}


//---------QUESTION 3------------

//Correct
function question3Correct(){

if (ans3 = null){
	ans3 = 0;
}

ans3 = 1;

sessionStorage.setItem('q3score', ans3);
console.log(sessionStorage.getItem('q3score'));
document.location.href = "#quiz-4";
}

//Wrong
function question3Wrong(){
	if (ans3 = null){
	ans3 = 0;
}

ans3 = 0;

sessionStorage.setItem('q3score', ans3);
console.log(sessionStorage.getItem('q3score'));
document.location.href = "#quiz-4";
}

//---------QUESTION 4------------

//Correct
function question4Correct(){
if (ans4 = null){
	ans4 = 0;
}

ans4 = 1;

sessionStorage.setItem('q4score', ans4);
console.log(sessionStorage.getItem('q4score'));
showAnswers();
document.location.href = "#answers";
$("#try").css("font-size",24 + "px");
}

//Wrong
function question4Wrong(){
	
if (ans4 = null){
	ans4 = 0;
}

ans4 = 0;

sessionStorage.setItem('q4score', ans4);
console.log(sessionStorage.getItem('q4score'));


size = parseInt($('#try').css('font-size'));
console.log(size);
size=size+2;
$("#try").css("font-size",size + "px");
console.log(size);
}

//Skip
function question4Skip(){
	if (ans4 = null){
	ans4 = 0;
}

ans4 = 0;

sessionStorage.setItem('q4score', ans4);
console.log(sessionStorage.getItem('q4score'));
showAnswers();
document.location.href = "#answers";
}



//---------ANSWERS------------

function showAnswers(){
	if(ans1 == 1){
		document.getElementById('q-ans-1').src ="images/answers/correct.png"
	} else{
		document.getElementById('q-ans-1').src ="images/answers/wrong.png"
	};
	
	if(ans2 ==1){
		document.getElementById('q-ans-2').src="images/answers/correct.png"
	} else{
		document.getElementById('q-ans-2').src ="images/answers/wrong.png"
	};
	
	if(ans3 ==1){
		document.getElementById('q-ans-3').src="images/answers/correct.png"
	} else{
		document.getElementById('q-ans-3').src ="images/answers/wrong.png"
	};
	
	if(ans4 ==1){
		document.getElementById('q-ans-4').src="images/answers/correct.png"
	} else{
		document.getElementById('q-ans-4').src ="images/answers/wrong.png"
	};
}

function sessionClear(){
	sessionStorage.clear();
	document.location.href = "#home";
}













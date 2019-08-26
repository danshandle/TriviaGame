
$(document).ready(function(){

	let rightSound = new Audio("assets/sounds/homestarright.mp3");
	let wrongSound = new Audio("assets/sounds/the-price-is-right-losing-horn.mp3");


	let questions = {
		q1: {
			question: "Dental floss was invented in which city?",
			answers: {
				answer1: ["New York", 0],
				answer2: ["Pittsburg", 0],
				answer3: ["Little Rock", 0],
				answer4: ["New Orleans", 1]
			}
		},
		q2: {
			question: "Which of the following has the most superbowl wins?",
			answers: {
				answer1: ["Dan Marino", 0],
				answer2: ["Warren Moon", 0],
				answer3: ["Fran Tarkenton", 0],
				answer4: ["None of these ever won", 1]
			}
		},
		q3: {
			question: "How big is Alaska in freedom units?",
			answers: {
				answer1: ["1.2 million square miles", 0],
				answer2: ["420,000 square miles", 0],
				answer3: ["663,300 square miles", 1],
				answer4: ["Slightly smaller than Texas", 0]
			}
		},
		q4: {
			question: "In which state was Ernest Hemmingway born?",
			answers: {
				answer1: ["California", 0],
				answer2: ["Illinois", 1],
				answer3: ["Florida", 0],
				answer4: ["Actually, France", 0]
			}
		},
		q5: {
			question: "US representation is shamefully bad. How many US reps are there?",
			answers: {
				answer1: ["420", 0],
				answer2: ["330", 0],
				answer3: ["575", 0],
				answer4: ["435", 1]
			}
		}
	};

	let intervalId;
	let time = 10; 
	let questionsById = new Array;
	let correct = 0;
	let incorrect = 0;
	let disable = 1;
	let correctAnswer = "";

	function end(){
		$("#start-button").show();
		$("#question").html("How patriotic are you?");
		$("#answer1").html("You Got " + correct+ " Answers Right!");
		$("#answer2").html("You Got " + incorrect+ " Answers Wrong..");
		$("#answer3").empty();
		$("#answer4").empty();
		$("#timer").empty();
		
	}


	function newQestion(){
		let rand = Math.floor((Math.random() * questionsById.length));
		let removed = questionsById.splice(rand,1);
		intervalId = setInterval(active,1000);
		disable = 1;
		for(i=1;i<4+1;i++){
			
			if (eval("questions."+removed+".answers.answer"+i+"[1]") === 1){
				//console.log(eval("questions."+removed+".answers.answer"+i+"[1]"));
				correctAnswer = ("answer"+i);
				//console.log(correctAnswer);
				
			}
		}

		//console.log(removed);
		$("#timer").text("Time Remaining: " + time);
		$("#question").html(eval("questions."+removed+".question"));
		$("#answer1").html(eval("questions."+removed+".answers.answer1[0]"));
		$("#answer1").attr("data-qid", removed);
		$("#answer2").html(eval("questions."+removed+".answers.answer2[0]"));
		$("#answer2").attr("data-qid", removed);
		$("#answer3").html(eval("questions."+removed+".answers.answer3[0]"));
		$("#answer3").attr("data-qid", removed);
		$("#answer4").html(eval("questions."+removed+".answers.answer4[0]"));
		$("#answer4").attr("data-qid", removed);
	}
	
	$("#start").on("click", run);
	$("#answer1").on("click", checkAnswer);
	$("#answer2").on("click", checkAnswer);
	$("#answer3").on("click", checkAnswer);
	$("#answer4").on("click", checkAnswer);

	function checkAnswer(){
		if(disable){
			disable = 0;
			let check = ($(this).attr("id"));
			console.log(eval("questions." + $(this).attr("data-qid") + ".answers." + check + "[1]"));
			if(eval("questions." + $(this).attr("data-qid") + ".answers." + check + "[1]") === 1){
				$("#question").html("Right!");
				correct++;
				
				rightSound.play();
				clearInterval(intervalId);
				setTimeout(function(){
					if(questionsById.length === 0){
						clearInterval(intervalId);
						end();
					}else{
					time = 10;	
					console.log(correctAnswer);
					
					newQestion();
					}
				}, 3000);
			}else{
				$("#question").html("Wrong-O!");
				incorrect++;
				wrongSound.play();
				$("#" + correctAnswer).css("color","green");
				console.log(correctAnswer);
				clearInterval(intervalId);
				setTimeout(function(){
					if(questionsById.length === 0){
						console.log("end");
						clearInterval(intervalId);
						end();
					}else{
					time = 10;	
					$("#" + correctAnswer).css("color","#424242");
					newQestion();
					}
				}, 3000);
		}	}
		
	}
	function run(){
		correct = 0;
		incorrect = 0;
		
		
		for(i=1; i<Object.keys(questions).length+1; i++){
			
			let id = ("q"+i);
			//console.log(id);
			questionsById.push(id);
		}

		$("#start-button").hide();
		newQestion();
		
	}

	function active(){
		
		time--;
		$("#timer").text("Time Remaining: " + time);
		
		
		if(questionsById.length === 0 && time === 0){
			incorrect++;
			wrongSound.play();
			end();
			stop();
		}else if(time === 0){
			
			stop();
			time = 10;
			incorrect++;
			wrongSound.play();
			newQestion();
		}

	

	function stop(){
		clearInterval(intervalId);
		
	}	
	
	
	
	}
})
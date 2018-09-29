var percentage = '0%';
var usertime = '0.0s';
var level = 1;
var answers = new Array(100);
var useranswers = new Array(100);
var magic_book_answers = [];//I am here................................. I have to getAnswers() and showResults() ==> see magic_book()
var test = "";
var content = "";
var correct = 0;

var name = '';
var age = '';

/** Function that handles the retry button **/
function retry1(){
	$(".math_userresults").html("");
	if (test == "add"){
		addittion();
		$("#image_add_form").modal('show');
	}else if (test == "subtraction"){
		subtraction();
		$("#image_add_form").modal('show');
	}else if (test == "multiplication"){
		multiplication();
		$("#image_add_form").modal('show');
	}else if (test == "division"){
		division();
		$("#image_add_form").modal('show');
	}else if (test == "solveX"){
		solveX();
		$("#image_add_form").modal('show');
	}else if (test == "leaderboard"){
		master();
		$("#image_add_form").modal('show');
	}else{
		magic_book();
		$("#modal_comprehension").modal('show');
	}
}//end of function

/** Function that handles the tests of the next level **/
function nextLevel(){
	if ( level == "1" ){
		level = "2";
		$("#user_level").html(level);
		retry1();
	}else if ( level == "2" ){
		level = "3";
		$("#user_level").html(level);
		retry1();
	}else if ( level == "3" ){
		level = "4";
		$("#user_level").html(level);
		retry1();
	}else if ( level == "4" ){
		level = "5";
		$("#user_level").html(level);
		retry1();
	}else{
		level = "1";
		$("#user_level").html(level);
		retry1();
	}
}//end of function

/** function that calculates the results **/
function show_results(){
	correct = 0;
	var temp = "";
	for (var i=0; i<20; i++){
		if (useranswers[i] == answers[i]){
			correct = correct + 1;
			temp = '<img src="images/correct.png" class="mark_icon"/>';
			$("#mark"+i).html(temp);
		}else{
			temp = '<img src="images/incorrect.png" class="mark_icon"/>';
			$("#mark"+i).html(temp);
		}
	}
	var p = ( Math.floor((correct/20)*100)) + "%";
	$("#percent").html(p);
}//end of function

/** Function that handles the creation of test question(also handles how they appear on the result) for maths **/
function make_question(symbol, lvl){
	//Set the 20 questions==========
	var questions = '<form class="go2" id="test_form" method="post"><p> '; //form test input
	var question_data = ''; //for display
	var num1 = 0, num2 = 0;
	var a=0,b=0;
	//Levels ============================================
	if (lvl == 1){
		a = 5; b = 15;
	}else if (lvl == 2){
		a = 10; b = 30;
	}else if (lvl == 3){
		a = 20; b = 60;
	}else if (lvl == 4){
		a = 40; b = 120;
	}else{
		a = 80; b = 240;
	}
	
	if (symbol == " + "){ 	//Addition==============================================================
		for (var i=0; i<20;i++){
			num1 = Math.floor(Math.random()*b) + a;
			num2 = Math.floor(Math.random()*b) + a;
			answers[i] = num1 + num2;
			questions = questions + (i+1) + '. ' + num1 + symbol + num2 + ' = ' + '<input type="number" name="answer' + i + '" class="form-control">' ;
			question_data = question_data + '<div class="col-md-3 col-xs-6" style="text-align:left"><p> Question ' + (i+1) + ': ' + num1 + symbol + num2 + ' = <span class="detail answer' + i + '"> </span> <span style="align:right" id="mark' + i + '"></span> </ p></div>';
		}
	}else if (symbol == " - "){		//Subtraction==============================================================
		for (var i=0; i<20;i++){
			num1 = Math.floor(Math.random()*b) + a;
			num2 = Math.floor(Math.random()*b) + a;
			while(num2 == num1 ){
				num2 = Math.floor(Math.random()*b) + a;
			}
			if (num2 > num1){
				var temp = num1;
				num1 = num2;
				num2 = temp;
			}
			answers[i] = num1 - num2;
			questions = questions + (i+1) + '. ' + num1 + symbol + num2 + ' = ' + '<input type="number" name="answer' + i + '" class="form-control">' ;
			question_data = question_data + '<div class="col-md-3 col-xs-6" style="text-align:left"><p> Question ' + (i+1) + ': ' + num1 + symbol + num2 + ' = <span class="detail answer' + i + '"> </span> <span style="align:right" id="mark' + i + '"></span> </ p></div>';
		}
	}else if (symbol == " x "){		//Multiplication==============================================================
		for (var i=0; i<20;i++){
			num1 = Math.floor(Math.random()*b) + a;
			num2 = Math.floor(Math.random()*b) + a;
			answers[i] = num1 * num2;
			questions = questions + (i+1) + '. ' + num1 + symbol + num2 + ' = ' + '<input type="number" name="answer' + i + '" class="form-control">' ;
			question_data = question_data + '<div class="col-md-3 col-xs-6" style="text-align:left"><p> Question ' + (i+1) + ': ' + num1 + symbol + num2 + ' = <span class="detail answer' + i + '"> </span> <span style="align:right" id="mark' + i + '"></span> </ p></div>';
		}
	}else if (symbol == " / "){		//Division==============================================================
		for (var i=0; i<20;i++){
			var temp1 = Math.floor(Math.random()*a) + 2; //[2,a-1) [2,5] 
			var temp2 = Math.floor(Math.random()*b) + 2; //[2,15]
			num1 = temp2 * temp1; num2 = temp2;
			answers[i] = num1 / num2;
			questions = questions + (i+1) + '. ' + num1 + symbol + num2 + ' = ' + '<input type="number" name="answer' + i + '" class="form-control">' ;
			question_data = question_data + '<div class="col-md-3 col-xs-6" style="text-align:left"><p> Question ' + (i+1) + ': ' + num1 + symbol + num2 + ' = <span class="detail answer' + i + '"> </span> <span style="align:right" id="mark' + i + '"></span> </ p></div>';
		}
	}else if (symbol == "solveX"){		//Solve for x ==============================================================
		symbol = " + ";
		for (var i=0; i<20;i++){
			num1 = Math.floor(Math.random()*b) + a;
			num2 = Math.floor(Math.random()*b) + a;
			var num3 = Math.floor(Math.random()*b) + a;
			if (num2 > num3){
				var temp = num2;
				num2 = num3;
				num3 = temp;
			}
			answers[i] = num3 - num2;
			questions = questions + (i+1) + '. ' + /** the equation **/ num1 + "x" + symbol + (num2*num1) + ' = ' + (num3*num1) + '<input type="number" name="answer' + i + '" class="form-control">' ;
			question_data = question_data + '<div class="col-md-3 col-xs-6" style="text-align:left"><p> Question ' + (i+1) + '. ' + num1 + "x" + symbol + (num2*num1) + ' = ' + (num3*num1) + ' : <span class="detail answer' + i + '"> </span> <span style="align:right" id="mark' + i + '"></span> </ p></div>';
		}
		symbol = "solveX"
	}	// ===============   end of conditions ==============================
	questions = questions + '</p> <br /> <button type="submit" class="btn btn-success" id="done">done</button> </form>';
	$(".modal-body").html(questions);
	return question_data;
}//end of function

/** Getting the answers of the user **/
function getAnswers(){
	
	var t = event.target.answer0.value;
	$(".answer0").html(t);
	useranswers[0] = t;
	
	t = event.target.answer1.value;
	$(".answer1").html(t);
	useranswers[1] = t;
	
	t = event.target.answer2.value;
	$(".answer2").html(t);
	useranswers[2] = t;
	
	t = event.target.answer3.value;
	$(".answer3").html(t);
	useranswers[3] = t;
	
	t = event.target.answer4.value;
	$(".answer4").html(t);
	useranswers[4] = t;
	
	t = event.target.answer5.value;
	$(".answer5").html(t);
	useranswers[5] = t;
	
	t = event.target.answer6.value;
	$(".answer6").html(t);
	useranswers[6] = t;
	
	t = event.target.answer7.value;
	$(".answer7").html(t);
	useranswers[7] = t;
	
	t = event.target.answer8.value;
	$(".answer8").html(t);
	useranswers[8] = t;
	
	t = event.target.answer9.value;
	$(".answer9").html(t);
	useranswers[9] = t;
	
	t = event.target.answer10.value;
	$(".answer10").html(t);
	useranswers[10] = t;
	
	t = event.target.answer11.value;
	$(".answer11").html(t);
	useranswers[11] = t;
	
	t = event.target.answer12.value;
	$(".answer12").html(t);
	useranswers[12] = t;
	
	t = event.target.answer13.value;
	$(".answer13").html(t);
	useranswers[13] = t;
	
	t = event.target.answer14.value;
	$(".answer14").html(t);
	useranswers[14] = t;
	
	t = event.target.answer15.value;
	$(".answer15").html(t);
	useranswers[15] = t;
	
	t = event.target.answer16.value;
	$(".answer16").html(t);
	useranswers[16] = t;
	
	t = event.target.answer17.value;
	$(".answer17").html(t);
	useranswers[17] = t;
	
	t = event.target.answer18.value;
	$(".answer18").html(t);
	useranswers[18] = t;
	
	t = event.target.answer19.value;
	$(".answer19").html(t);
		useranswers[19] = t;
}

/** Function to handle the addittion test **/
function addittion(){
	
	$(".modal_title").html("Addition");
	$("#next").html("Addition");
	$("#how").hide('slow',function(){
		$("#info_math").html($("#score_heading").html());
		var html = "score";
		$("#score_heading_name").html(html);
	});
	$("#row_action").hide('slow');
		
	var qData = make_question(" + ", level) + '<div class="text-center"><p><a href="#"><button class="btn btn-success" id="add_retry" onclick=retry1()> Retry </button></a><a href="#" /> &nbsp; <button class="btn btn-success" id="next_level" onclick=nextLevel()>next level</button></a></p></div>';
	
	var x = 0;
	var time = setInterval(function(){
		x = x + 1;
	},1000);
	
	$(".go2").submit(function(){
		if (x <= 60){
			usertime = x + 's';
		}else{
			usertime = Math.floor((x/60)) + 'm ' + (x%60) + 's '
		}
		
		$(".modal-body").html('<button class="btn btn-succes" data-dismiss="modal">Results</button>');
		$(".math_userresults").html(qData);
		
		$("#time").html(usertime);
		usertime = x;
		getAnswers();
		show_results();
		
		return false;
	});
	return false;
}//end of function

/** Function to handle the subtraction test **/
function subtraction(){
	
	$(".modal_title").html("Subtraction");
	$("#next").html("Subtraction");
	$("#how").hide('slow',function(){
		$("#info_math").html($("#score_heading").html());
		var html = "score";
		$("#score_heading_name").html(html);
	});
	$("#row_action").hide('slow');
	
	var qData = make_question(" - ", level) + '<div class="text-center"><p><a href="#"><button class="btn btn-success" id="add_retry" onclick=retry1()> Retry </button></a><a href="#" /> &nbsp; <button class="btn btn-success" id="next_level" onclick=nextLevel()>next level</button></a></p></div>';
	
	var x = 0;
	var time = setInterval(function(){
		x = x + 1;
	},1000);
	
	$(".go2").submit(function(){
		if (x <= 60){
			usertime = x + 's';
		}else{
			usertime = Math.floor((x/60)) + 'm ' + (x%60) + 's '
		}
		
		$(".modal-body").html('<button class="btn btn-succes" data-dismiss="modal">Results</button>');
		$(".math_userresults").html(qData);
		
		$("#time").html(usertime);
		usertime = x;
		getAnswers();
		show_results();
		
		return false;
	});
	return false;
}//end of function

/** Function to handle the multiplication test **/
function multiplication(){
	
	$(".modal_title").html("Multiplication");
	$("#next").html("Multiplication");
	$("#how").hide('slow',function(){
		$("#info_math").html($("#score_heading").html());
		var html = "score";
		$("#score_heading_name").html(html);
	});
	$("#row_action").hide('slow');
	
	var qData = make_question(" x ", level) + '<div class="text-center"><p><a href="#"><button class="btn btn-success" id="add_retry" onclick=retry1()> Retry </button></a><a href="#" /> &nbsp; <button class="btn btn-success" id="next_level" onclick=nextLevel()>next level</button></a></p></div>';
	
	var x = 0;
	var time = setInterval(function(){
		x = x + 1;
	},1000);
	
	$(".go2").submit(function(){
		if (x <= 60){
			usertime = x + 's';
		}else{
			usertime = Math.floor((x/60)) + 'm ' + (x%60) + 's '
		}
		
		$(".modal-body").html('<button class="btn btn-succes" data-dismiss="modal">Results</button>');
		$(".math_userresults").html(qData);
		
		$("#time").html(usertime);
		usertime = x;
		getAnswers();
		show_results();
		
		return false;
	});
	return false;
}//end of function

/** Function to handle the division test **/
function division(){
	
	$(".modal_title").html("Division");
	$("#next").html("Division");
	$("#how").hide('slow',function(){
		$("#info_math").html($("#score_heading").html());
		var html = "score";
		$("#score_heading_name").html(html);
	});
	$("#row_action").hide('slow');
	
	var qData = make_question(" / ", level) + '<div class="text-center"><p><a href="#"><button class="btn btn-success" id="add_retry" onclick=retry1()> Retry </button></a><a href="#" /> &nbsp; <button class="btn btn-success" id="next_level" onclick=nextLevel()>next level</button></a></p></div>';
	
	var x = 0;
	var time = setInterval(function(){
		x = x + 1;
	},1000);
	
	$(".go2").submit(function(){
		if (x <= 60){
			usertime = x + 's';
		}else{
			usertime = Math.floor((x/60)) + 'm ' + (x%60) + 's '
		}
		
		$(".modal-body").html('<button class="btn btn-succes" data-dismiss="modal">Results</button>');
		$(".math_userresults").html(qData);
		
		$("#time").html(usertime);
		usertime = x;
		getAnswers();
		show_results();
		
		return false;
	});
	return false;
}//end of function

/** Function to handle the Solve for x test **/
function solveX(){
	
	$(".modal_title").html("Solve for x");
	$("#next").html("Solve for x");
	$("#how").hide('slow',function(){
		$("#info_math").html($("#score_heading").html());
		var html = "score";
		$("#score_heading_name").html(html);
	});
	$("#row_action").hide('slow');
	
	var qData = make_question("solveX", level) + '<div class="text-center"><p><a href="#"><button class="btn btn-success" id="add_retry" onclick=retry1()> Retry </button></a><a href="#" /> &nbsp; <button class="btn btn-success" id="next_level" onclick=nextLevel()>next level</button></a></p></div>';
	
	var x = 0;
	var time = setInterval(function(){
		x = x + 1;
	},1000);
	
	$(".go2").submit(function(){
		if (x <= 60){
			usertime = x + 's';
		}else{
			usertime = Math.floor((x/60)) + 'm ' + (x%60) + 's '
		}
		
		$(".modal-body").html('<button class="btn btn-succes" data-dismiss="modal">Results</button>');
		$(".math_userresults").html(qData);
		
		$("#time").html(usertime);
		usertime = x;
		getAnswers();
		show_results();
		
		return false;
	});
	return false;
}//end function

function master(){
	var total_time = 0;
	var total_correct = 0;
	var total_div = '';
	var qData = '';
	var x = 0;
	
	$(".modal_title").html("Master");
	$("#next").html("Master");
	$("#how").hide('slow',function(){
		$("#info_math").html($("#score_heading").html());
		var html = "score";
		$("#score_heading_name").html(html);
	});
	$("#row_action").hide('slow');
	
	qData = make_question_master(level) + '<div class="text-center"><p><a href="#"><button class="btn btn-success" id="add_retry" onclick=retry1()> Retry </button></a><a href="#" /> &nbsp; <button class="btn btn-success" id="next_level" onclick=nextLevel()>next level</button></a></p></div>';;
	
	var x = 0;
	var time = setInterval(function(){
		x = x + 1;
	},1000);
	
	$(".go2").submit(function(){
		if (x <= 60){
			usertime = x + 's';
		}else{
			usertime = Math.floor((x/60)) + 'm ' + (x%60) + 's '
		}
		
		$(".modal-body").html('<button class="btn btn-succes" data-dismiss="modal">Results</button>');
		$(".math_userresults").html(qData);
		
		$("#time").html(usertime);
		usertime = x;
		getAnswersMaster();
		show_results_master();
		
		return false;
	});
	return false;
}

function make_question_master(lvl){
	//Set the 20 questions==========
	var questions = '<form class="go2" id="test_form" method="post"><p> '; //form test input
	var question_data = ''; //for display
	var num1 = 0, num2 = 0;
	var a=0,b=0;
	//Levels ============================================
	if (lvl == 1){
		a = 5; b = 15;
	}else if (lvl == 2){
		a = 10; b = 30;
	}else if (lvl == 3){
		a = 20; b = 60;
	}else if (lvl == 4){
		a = 40; b = 120;
	}else{
		a = 80; b = 240;
	}
	var symbol = '+';
	
	for (var i=0; i<100;i++){
		if ( i<20){//Addition==============================================================
			num1 = Math.floor(Math.random()*b) + a;
			num2 = Math.floor(Math.random()*b) + a;
			answers[i] = num1 + num2;
			questions = questions + (i+1) + '. ' + num1 + symbol + num2 + ' = ' + '<input type="number" name="answer' + i + '" class="form-control">' ;
			question_data = question_data + '<div class="col-md-3 col-xs-6" style="text-align:left"><p> Question ' + (i+1) + ': ' + num1 + symbol + num2 + ' = <span class="detail answer' + i + '"> </span> <span style="align:right" id="mark' + i + '"></span> </ p></div>';
		}else if (i<40){ //Subtraction==============================================================
			symbol = ' - ';
			num1 = Math.floor(Math.random()*b) + a;
			num2 = Math.floor(Math.random()*b) + a;
			while(num2 == num1 ){
				num2 = Math.floor(Math.random()*b) + a;
			}
			if (num2 > num1){
				var temp = num1;
				num1 = num2;
				num2 = temp;
			}
			answers[i] = num1 - num2;
			questions = questions + (i+1) + '. ' + num1 + symbol + num2 + ' = ' + '<input type="number" name="answer' + i + '" class="form-control">' ;
			question_data = question_data + '<div class="col-md-3 col-xs-6" style="text-align:left"><p> Question ' + (i+1) + ': ' + num1 + symbol + num2 + ' = <span class="detail answer' + i + '"> </span> <span style="align:right" id="mark' + i + '"></span> </ p></div>';
		}else if (i<60){//Multiplication==============================================================
			symbol = ' x ';
			num1 = Math.floor(Math.random()*b) + a;
			num2 = Math.floor(Math.random()*b) + a;
			answers[i] = num1 * num2;
			questions = questions + (i+1) + '. ' + num1 + symbol + num2 + ' = ' + '<input type="number" name="answer' + i + '" class="form-control">' ;
			question_data = question_data + '<div class="col-md-3 col-xs-6" style="text-align:left"><p> Question ' + (i+1) + ': ' + num1 + symbol + num2 + ' = <span class="detail answer' + i + '"> </span> <span style="align:right" id="mark' + i + '"></span> </ p></div>';
		}else if (i<80){//Division==============================================================
			var temp1 = Math.floor(Math.random()*a) + 2; //[2,a-1) [2,5] 
			var temp2 = Math.floor(Math.random()*b) + 2; //[2,15]
			num1 = temp2 * temp1; num2 = temp2;
			answers[i] = num1 / num2;
			questions = questions + (i+1) + '. ' + num1 + symbol + num2 + ' = ' + '<input type="number" name="answer' + i + '" class="form-control">' ;
			question_data = question_data + '<div class="col-md-3 col-xs-6" style="text-align:left"><p> Question ' + (i+1) + ': ' + num1 + symbol + num2 + ' = <span class="detail answer' + i + '"> </span> <span style="align:right" id="mark' + i + '"></span> </ p></div>';
		}else{ //Solve for x ==============================================================
			symbol = " + ";
			num1 = Math.floor(Math.random()*b) + a;
			num2 = Math.floor(Math.random()*b) + a;
			var num3 = Math.floor(Math.random()*b) + a;
			if (num2 > num3){
				var temp = num2;
				num2 = num3;
				num3 = temp;
			}
			answers[i] = num3 - num2;
			questions = questions + (i+1) + '. ' + /** the equation **/ num1 + "x" + symbol + (num2*num1) + ' = ' + (num3*num1) + '<input type="number" name="answer' + i + '" class="form-control">' ;
			question_data = question_data + '<div class="col-md-3 col-xs-6" style="text-align:left"><p> Question ' + (i+1) + '. ' + num1 + "x" + symbol + (num2*num1) + ' = ' + (num3*num1) + ' : <span class="detail answer' + i + '"> </span> <span style="align:right" id="mark' + i + '"></span> </ p></div>';
		}
	}
	
	questions = questions + '</p> <br /> <button type="submit" class="btn btn-success" id="done">done</button> </form>';
	$(".modal-body").html(questions);
	return question_data;
	
}

function getAnswersMaster(){
	
	var t = event.target.answer0.value;
	$(".answer0").html(t);
	useranswers[0] = t;
	
	t = event.target.answer1.value;
	$(".answer1").html(t);
	useranswers[1] = t;
	
	t = event.target.answer2.value;
	$(".answer2").html(t);
	useranswers[2] = t;
	
	t = event.target.answer3.value;
	$(".answer3").html(t);
	useranswers[3] = t;
	
	t = event.target.answer4.value;
	$(".answer4").html(t);
	useranswers[4] = t;
	
	t = event.target.answer5.value;
	$(".answer5").html(t);
	useranswers[5] = t;
	
	t = event.target.answer6.value;
	$(".answer6").html(t);
	useranswers[6] = t;
	
	t = event.target.answer7.value;
	$(".answer7").html(t);
	useranswers[7] = t;
	
	t = event.target.answer8.value;
	$(".answer8").html(t);
	useranswers[8] = t;
	
	t = event.target.answer9.value;
	$(".answer9").html(t);
	useranswers[9] = t;
	
	t = event.target.answer10.value;
	$(".answer10").html(t);
	useranswers[10] = t;
	
	t = event.target.answer11.value;
	$(".answer11").html(t);
	useranswers[11] = t;
	
	t = event.target.answer12.value;
	$(".answer12").html(t);
	useranswers[12] = t;
	
	t = event.target.answer13.value;
	$(".answer13").html(t);
	useranswers[13] = t;
	
	t = event.target.answer14.value;
	$(".answer14").html(t);
	useranswers[14] = t;
	
	t = event.target.answer15.value;
	$(".answer15").html(t);
	useranswers[15] = t;
	
	t = event.target.answer16.value;
	$(".answer16").html(t);
	useranswers[16] = t;
	
	t = event.target.answer17.value;
	$(".answer17").html(t);
	useranswers[17] = t;
	
	t = event.target.answer18.value;
	$(".answer18").html(t);
	useranswers[18] = t;
	
	t = event.target.answer19.value;
	$(".answer19").html(t);
	useranswers[19] = t;
	
	t = event.target.answer20.value;
	$(".answer20").html(t);
	useranswers[20] = t;
	
	t = event.target.answer21.value;
	$(".answer21").html(t);
	useranswers[21] = t;
	
	t = event.target.answer22.value;
	$(".answer22").html(t);
	useranswers[22] = t;
	
	t = event.target.answer23.value;
	$(".answer23").html(t);
	useranswers[23] = t;
	
	t = event.target.answer24.value;
	$(".answer24").html(t);
	useranswers[24] = t;
	
	t = event.target.answer25.value;
	$(".answer25").html(t);
	useranswers[25] = t;
	
	t = event.target.answer26.value;
	$(".answer26").html(t);
	useranswers[26] = t;
	
	t = event.target.answer27.value;
	$(".answer27").html(t);
	useranswers[27] = t;
	
	t = event.target.answer28.value;
	$(".answer28").html(t);
	useranswers[28] = t;
	
	t = event.target.answer29.value;
	$(".answer29").html(t);
	useranswers[29] = t;
	
	t = event.target.answer30.value;
	$(".answer30").html(t);
	useranswers[30] = t;
	
	t = event.target.answer31.value;
	$(".answer31").html(t);
	useranswers[31] = t;
	
	t = event.target.answer32.value;
	$(".answer32").html(t);
	useranswers[32] = t;
	
	t = event.target.answer33.value;
	$(".answer33").html(t);
	useranswers[33] = t;
	
	t = event.target.answer34.value;
	$(".answer34").html(t);
	useranswers[34] = t;
	
	t = event.target.answer35.value;
	$(".answer35").html(t);
	useranswers[35] = t;
	
	t = event.target.answer36.value;
	$(".answer36").html(t);
	useranswers[36] = t;
	
	t = event.target.answer37.value;
	$(".answer37").html(t);
	useranswers[37] = t;
	
	t = event.target.answer38.value;
	$(".answer38").html(t);
	useranswers[38] = t;
	
	t = event.target.answer39.value;
	$(".answer39").html(t);
	useranswers[39] = t;
	
	t = event.target.answer40.value;
	$(".answer40").html(t);
	useranswers[40] = t;
	
	t = event.target.answer41.value;
	$(".answer41").html(t);
	useranswers[41] = t;
	
	t = event.target.answer42.value;
	$(".answer42").html(t);
	useranswers[42] = t;
	
	t = event.target.answer43.value;
	$(".answer43").html(t);
	useranswers[43] = t;
	
	t = event.target.answer44.value;
	$(".answer44").html(t);
	useranswers[44] = t;
	
	t = event.target.answer45.value;
	$(".answer45").html(t);
	useranswers[45] = t;
	
	t = event.target.answer46.value;
	$(".answer46").html(t);
	useranswers[46] = t;
	
	t = event.target.answer47.value;
	$(".answer47").html(t);
	useranswers[47] = t;
	
	t = event.target.answer48.value;
	$(".answer48").html(t);
	useranswers[48] = t;
	
	t = event.target.answer49.value;
	$(".answer49").html(t);
	useranswers[49] = t;
	
	t = event.target.answer50.value;
	$(".answer50").html(t);
	useranswers[50] = t;
	
	t = event.target.answer51.value;
	$(".answer51").html(t);
	useranswers[51] = t;
	
	t = event.target.answer52.value;
	$(".answer52").html(t);
	useranswers[52] = t;
	
	t = event.target.answer53.value;
	$(".answer53").html(t);
	useranswers[53] = t;
	
	t = event.target.answer54.value;
	$(".answer54").html(t);
	useranswers[54] = t;
	
	t = event.target.answer55.value;
	$(".answer55").html(t);
	useranswers[55] = t;
	
	t = event.target.answer56.value;
	$(".answer56").html(t);
	useranswers[56] = t;
	
	t = event.target.answer57.value;
	$(".answer57").html(t);
	useranswers[57] = t;
	
	t = event.target.answer58.value;
	$(".answer58").html(t);
	useranswers[58] = t;
	
	t = event.target.answer59.value;
	$(".answer59").html(t);
	useranswers[59] = t;
	
	t = event.target.answer60.value;
	$(".answer60").html(t);
	useranswers[60] = t;
	
	t = event.target.answer61.value;
	$(".answer61").html(t);
	useranswers[61] = t;
	
	t = event.target.answer62.value;
	$(".answer62").html(t);
	useranswers[62] = t;
	
	t = event.target.answer63.value;
	$(".answer63").html(t);
	useranswers[63] = t;
	
	t = event.target.answer64.value;
	$(".answer64").html(t);
	useranswers[64] = t;
	
	t = event.target.answer65.value;
	$(".answer65").html(t);
	useranswers[65] = t;
	
	t = event.target.answer66.value;
	$(".answer66").html(t);
	useranswers[66] = t;
	
	t = event.target.answer67.value;
	$(".answer67").html(t);
	useranswers[67] = t;
	
	t = event.target.answer68.value;
	$(".answer68").html(t);
	useranswers[68] = t;
	
	t = event.target.answer69.value;
	$(".answer69").html(t);
	useranswers[69] = t;
	
	t = event.target.answer70.value;
	$(".answer70").html(t);
	useranswers[70] = t;
	
	t = event.target.answer71.value;
	$(".answer71").html(t);
	useranswers[71] = t;
	
	t = event.target.answer72.value;
	$(".answer72").html(t);
	useranswers[72] = t;
	
	t = event.target.answer73.value;
	$(".answer73").html(t);
	useranswers[73] = t;
	
	t = event.target.answer74.value;
	$(".answer74").html(t);
	useranswers[74] = t;
	
	t = event.target.answer75.value;
	$(".answer75").html(t);
	useranswers[75] = t;
	
	t = event.target.answer76.value;
	$(".answer76").html(t);
	useranswers[76] = t;
	
	t = event.target.answer77.value;
	$(".answer77").html(t);
	useranswers[77] = t;
	
	t = event.target.answer78.value;
	$(".answer78").html(t);
	useranswers[78] = t;
	
	t = event.target.answer79.value;
	$(".answer79").html(t);
	useranswers[79] = t;
	
	t = event.target.answer80.value;
	$(".answer80").html(t);
	useranswers[80] = t;
	
	t = event.target.answer81.value;
	$(".answer81").html(t);
	useranswers[81] = t;
	
	t = event.target.answer82.value;
	$(".answer82").html(t);
	useranswers[82] = t;
	
	t = event.target.answer83.value;
	$(".answer83").html(t);
	useranswers[83] = t;
	
	t = event.target.answer84.value;
	$(".answer84").html(t);
	useranswers[84] = t;
	
	t = event.target.answer85.value;
	$(".answer85").html(t);
	useranswers[85] = t;
	
	t = event.target.answer86.value;
	$(".answer86").html(t);
	useranswers[86] = t;
	
	t = event.target.answer87.value;
	$(".answer87").html(t);
	useranswers[87] = t;
	
	t = event.target.answer88.value;
	$(".answer88").html(t);
	useranswers[88] = t;
	
	t = event.target.answer89.value;
	$(".answer89").html(t);
	useranswers[89] = t;
	
	t = event.target.answer90.value;
	$(".answer90").html(t);
	useranswers[90] = t;
	
	t = event.target.answer91.value;
	$(".answer91").html(t);
	useranswers[91] = t;
	
	t = event.target.answer92.value;
	$(".answer92").html(t);
	useranswers[92] = t;
	
	t = event.target.answer93.value;
	$(".answer93").html(t);
	useranswers[93] = t;
	
	t = event.target.answer94.value;
	$(".answer94").html(t);
	useranswers[94] = t;
	
	t = event.target.answer95.value;
	$(".answer95").html(t);
	useranswers[95] = t;
	
	t = event.target.answer96.value;
	$(".answer96").html(t);
	useranswers[96] = t;
	
	t = event.target.answer97.value;
	$(".answer97").html(t);
	useranswers[97] = t;
	
	t = event.target.answer98.value;
	$(".answer98").html(t);
	useranswers[98] = t;
	
	t = event.target.answer99.value;
	$(".answer99").html(t);
	useranswers[99] = t;
}

function show_results_master(){
	correct = 0;
	var temp = "";
	for (var i=0; i<100; i++){
		if (useranswers[i] == answers[i]){
			correct = correct + 1;
			temp = '<img src="images/correct.png" class="mark_icon"/>';
			$("#mark"+i).html(temp);
		}else{
			temp = '<img src="images/incorrect.png" class="mark_icon"/>';
			$("#mark"+i).html(temp);
		}
	}
	var p = correct + "%";
	$("#percent").html(p);
}

function getAnswersBook(){
	
	var t = event.target.q1.value;
	$(".answer0").html(t);
	useranswers[0] = t;
	
	t = event.target.q2.value;
	$(".answer1").html(t);
	useranswers[1] = t;
	
	t = event.target.q3.value;
	$(".answer2").html(t);
	useranswers[2] = t;
	
	t = event.target.q4.value;
	$(".answer3").html(t);
	useranswers[3] = t;
	
	t = event.target.q5.value;
	$(".answer4").html(t);
	useranswers[4] = t;
	
	t = event.target.q6.value;
	$(".answer5").html(t);
	useranswers[5] = t;
}

function show_results_book(){
	correct = 0;
	var temp = "";
	
	if (test == "magic_book"){
		answers[0] = "1A"; answers[1] = "2C"; answers[2] = "3C"; answers[3] = "4B"; answers[4] = "5A"; answers[5] = "6C";
		for (var i=0; i<6; i++){
			if (useranswers[i] == answers[i]){
				correct = correct + 1;
				temp = '<img src="images/correct.png" class="mark_icon"/>';
				$("#mark"+i).html(temp);
			}else{
				temp = '<img src="images/incorrect.png" class="mark_icon"/>';
				$("#mark"+i).html(temp);
			}
		}
		var p = ( Math.floor((correct/6)*100)) + "%";
		$("#percent").html(p);
	}
}

function magic_book(){
	
	$(".modal_title").html("The Magical Book");
	$("#next").html("The Magic Book");
	$("#how").hide('slow',function(){
		$("#info_math").html($("#score_heading").html());
		var html = "score";
		$("#score_heading_name").html(html);
	});
	$("#row_action").hide('slow');
		
	var source   = $("#magic_book_template").html();
    var template = Handlebars.compile(source);
	var html = template();
	
	html = '<form class="go2" id="test_form" method="post">' + html + '<br /> <button type="submit" class="btn btn-success" id="done">done</button></form>';
	$(".modal-body").html(html);
	
	var qData = '';
	for (var i=0; i<6; i++){
		qData = qData + '<div class="col-md-4" style="text-align:left"><p> Question ' + (i+1) + ': <span class="detail answer' + i + '"> </span> <span style="align:right" id="mark' + i + '"></span> </ p></div>';
	}
	qData = qData + '<div class="text-center"><p><a href="#"><button class="btn btn-success" id="add_retry" onclick=retry1()> Retry </button></a></p></div>';;
	
	var x = 0;
	var time = setInterval(function(){
		x = x + 1;
	},1000);
	
	$(".go2").submit(function(){
		if (x <= 60){
			usertime = x + 's';
		}else{
			usertime = Math.floor((x/60)) + 'm ' + (x%60) + 's '
		}
		
		$(".modal-body").html('<button class="btn btn-succes" data-dismiss="modal">Results</button>');
		$(".math_userresults").html(qData);
		
		$("#time").html(usertime);
		usertime = x;
		getAnswersBook(); //calculates
		show_results_book(); //ticks
		
		return false;
	});
	return false;
	
}

function bedroom_book(){
	
}

function running_book(){
	
}

function holiday_book(){
	
}

function boot_book(){
	
}

/** ---------------------------------------------------  handling events ---------------------------------------------------------------------- **/

$(document).ready(function(){
	
	/** User wants to do a test on Addition ... so they click the addittion box **/
	$("#add").click(function(){
		test = "add";
		$("#image_add_form").modal('show');
	});
	
	$("#subtract").click(function(){
		test = "subtraction";
		$("#image_add_form").modal('show');
	});
	
	$("#multiply").click(function(){
		test = "multiplication";
		$("#image_add_form").modal('show');
	});
	
	$("#divide").click(function(){
		test = "division";
		$("#image_add_form").modal('show');
	});
	$("#solve").click(function(){
		test = "solveX";
		$("#image_add_form").modal('show');
	});
	$("#lead").click(function(){
		test = "leaderboard";
		$("#image_add_form").modal('show');
	});
	
	$("#magic_book").click(function(){
		test = "magic_book";
		$("#modal_comprehension").modal('show');
	});
	
	$("#bedroom_book").click(function(){
		test = "bedroom_book";
		$("#modal_comprehension").modal('show');
	});
	
	$("#running_book").click(function(){
		test = "running_book";
		$("#modal_comprehension").modal('show');
	});
	
	$("#holiday_book").click(function(){
		test = "holiday_book";
		$("#modal_comprehension").modal('show');
	});
	
	$("#boot_book").click(function(){
		test = "boot_book";
		$("#modal_comprehension").modal('show');
	});
	
	$(".go").submit(function(){
		name = event.target.username.value;
		age = event.target.userage.value;
		level = event.target.userlevel.value;
		
		content = '<div class="math_userinfo"> <p>Name: <span class="detail">' + name + '</span>' + '</p>';
		content = content + '<p>Age: <span class="detail">' + age + '</span>' + '</p>';
		content = content + '<p>Level: <span class="detail" id="user_level" >' + level + '</span>' + '<p> ';
		content = content + '<p>Percentage: <span class="detail" id="percent"> </span> &nbsp; Time: <span class="detail" id="time"> </span> </p></div>';
		content = content + '<div class="math_userresults"> </div>';
		
		$(".modal-footer").html("");
		if (test == "add"){
			var i = 3;
			var my_timer = setInterval(function(){
				$(".modal-body").html("Starting test in " + i);
				if (i==0){
					clearInterval(my_timer);
					$("#action").html(content);
					addittion();
				}else{
					i = i - 1;
				}
			},1000);
		}else if (test == "subtraction"){
			var i = 3;
			var my_timer = setInterval(function(){
				$(".modal-body").html("Starting test in " + i);
				if (i==0){
					clearInterval(my_timer);
					$("#action").html(content);
					subtraction();
				}else{
					i = i - 1;
				}
			},1000);
		}else if (test == "multiplication"){
			var i = 3;
			var my_timer = setInterval(function(){
				$(".modal-body").html("Starting test in " + i);
				if (i==0){
					clearInterval(my_timer);
					$("#action").html(content);
					multiplication();
				}else{
					i = i - 1;
				}
			},1000);
		}else if (test == "division"){
			var i = 3;
			var my_timer = setInterval(function(){
				$(".modal-body").html("Starting test in " + i);
				if (i==0){
					clearInterval(my_timer);
					$("#action").html(content);
					division();
				}else{
					i = i - 1;
				}
			},1000);
		}else if (test == "solveX"){
			var i = 3;
			var my_timer = setInterval(function(){
				$(".modal-body").html("Starting test in " + i);
				if (i==0){
					clearInterval(my_timer);
					$("#action").html(content);
					solveX();
				}else{
					i = i - 1;
				}
			},1000);
		}else if (test == "leaderboard"){
			var i = 3;
			var my_timer = setInterval(function(){
				$(".modal-body").html("Starting test in " + i);
				if (i==0){
					clearInterval(my_timer);
					$("#action").html(content);
					master();
				}else{
					i = i - 1;
				}
			},1000);
		}else if (test == "magic_book"){
			var i = 3;
			var my_timer = setInterval(function(){
				$(".modal-body").html("<h6> Read the story then answer the questions that follow </h6>" + "Starting test in " + i);
				if (i==0){
					clearInterval(my_timer);
					$("#action").html(content);
					magic_book();
				}else{
					i = i - 1;
				}
			},1000);
		}else if (test == "bedroom_book"){
			var i = 3;
			var my_timer = setInterval(function(){
				$(".modal-body").html("Starting test in " + i);
				if (i==0){
					clearInterval(my_timer);
					$("#action").html(content);
					bedroom_book();
				}else{
					i = i - 1;
				}
			},1000);
		}else if (test == "running_book"){
			var i = 3;
			var my_timer = setInterval(function(){
				$(".modal-body").html("Starting test in " + i);
				if (i==0){
					clearInterval(my_timer);
					$("#action").html(content);
					running_book();
				}else{
					i = i - 1;
				}
			},1000);
		}else if (test == "holiday_book"){
			var i = 3;
			var my_timer = setInterval(function(){
				$(".modal-body").html("Starting test in " + i);
				if (i==0){
					clearInterval(my_timer);
					$("#action").html(content);
					holiday_book();
				}else{
					i = i - 1;
				}
			},1000);
		}
		return false; //Stops the browser from refreshing when user submits form;
	});
	
	$("#display").click();
});

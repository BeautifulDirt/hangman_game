var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//фон Парижа
var img = new Image();
img.src = "game.png";
img.onload = function() {             
    ctx.drawImage(img, 50, 100);
};

		
function hangman(count){
	//виселица	
	ctx.beginPath();
	ctx.moveTo(200,100);
	ctx.lineTo(200,50);
	ctx.lineTo(350,50);
	ctx.lineTo(350,400);
	ctx.stroke();
		
	//человек

	//голова	
	if (count === 5){
		ctx.beginPath();
		ctx.arc(200, 120, 20, 0, 2*Math.PI, false);
		ctx.stroke();
	};
		
	//тело
	if (count === 4){
		ctx.beginPath();
		ctx.moveTo(200,140);
		ctx.lineTo(200,250);
		ctx.stroke();
	};
		
	//руки
	if(count === 3){
		//левая
		ctx.beginPath();
		ctx.moveTo(200,180);
		ctx.lineTo(155,160);
		ctx.stroke();
	};
	
	if(count === 2){
		//правая
		ctx.beginPath();
		ctx.moveTo(200,180);
		ctx.lineTo(245,160);
		ctx.stroke();
	};

	//ноги
			
	if(count === 1){
		//левая
		ctx.beginPath();
		ctx.moveTo(200,250);
		ctx.lineTo(175,310);
		ctx.stroke();
	};
			
	if(count === 0){
		//правая
		ctx.beginPath();
		ctx.moveTo(200,250);
		ctx.lineTo(225,310);
		ctx.stroke();
	}; 
};

//слова которые будут загадывать 
var words=["шампанское","вино","кофе","круассан","трюфель","багет","рокфор","лягушка","мода","поцелуй","кухня","шансон","духи","живопись","пардон","мерси","бонжур","оревуар","лямур","людовик","наполеон","революция","просвещение","лувр","сена","монмартр","помпиду","бастилия","нотрдам","пантеон"];
//подсказки для игрока
var answerArr=["Напиток: ","Напиток: ","Напиток: ","Еда: ","Еда: ","Еда: ","Еда: ","Еда: ","Слово-ассоциация: ","Слово-ассоциация: ","Слово-ассоциация: ","Слово-ассоциация: ","Слово-ассоциация: ","Слово-ассоциация: ","Французское слово: ","Французское слово: ","Французское слово: ","Французское слово: ","Французское слово: ","История: ","История: ","История: ","История: ","Достопримечательность: ","Достопримечательность: ","Достопримечательность: ","Достопримечательность: ","Достопримечательность: ","Достопримечательность: ","Достопримечательность: "];

var resultAnswer=[]; //ответы игрока
var numberRandomOfArray = Math.floor(Math.random() * words.length); //случайная цифра в диапазоне массива
var randomWord = words[numberRandomOfArray];//случайное слово
var countTry = 6; //счетчик количества попыток
var guessLetterCount = randomWord.length; //счетчик угаданных букв
	
for(var j=0; j < randomWord.length;  j++){
	resultAnswer[j]= " - ";
};

//вывод подсказки
document.getElementById('placeForText').innerHTML = answerArr[numberRandomOfArray];

var check;

function addLetter(letter){
	check = false; //буква еще не добавлена
	for(var i=0; i < randomWord.length; i++) {
		if (letter === randomWord[i]){
			resultAnswer[i]=letter;
			guessLetterCount--;
			check = true; //добавили букву
		};
	};
};

//проверяем добавили ли букву: если нет то, уменьшаем счетчик попыток 
function minusTry(check){
	if(check === true){
		return;
	}
	else {
		countTry--;
		hangman(countTry);
	};
};

//выводим результат после окончания игрового цикла		
function alertMessage(){
	document.getElementById('result').value = resultAnswer.join("");
	if (countTry > 0){
		alert("Вы выиграли!\nЗагаданное слово: " + randomWord + ". Начнем заново?");
	}
	else{
		alert("Вы проиграли!\nЗагаданное слово: " + randomWord + ". Начнем заново?");
	}
	location.reload();
};

//вывод зашифорованного слова	
document.getElementById('result').value = resultAnswer.join("");

function daivalue (id) {
	var value = document.getElementById(id).value;
	//диактивация кнопки
	document.getElementById(id).disabled='true';

	//игровой цикл
	while (guessLetterCount > 0 && countTry > 0) {
		//вывод зашифорованного слова с отгаданными буквами
		document.getElementById('result').value = resultAnswer.join("");	
		var letter = value;
		if (letter.length = 1){
			addLetter(letter);
			minusTry(check);
		};
		value = null;
	};
	//выводим статистику
	alertMessage();
};
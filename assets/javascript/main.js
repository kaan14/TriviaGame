
//hide submit button and results area 
$("#btn2").css("display", "none");
$("#btn3").css("display", "none");
$("#results").css("display", "none");


$(document).ready(function () {

     
    var correct = 0;
    var incorrect = 0;
    //create questions, answers and correct answer
    var questionList = [
        {
            question: "What is the English translation for the name of the German automaker Volkswagen?",
            options: ["Car People", "People Car", "Car's People"],
            answerIndex: 1
        },
        {
            question: "What does the acronym for the German multinational company BMW stand for?",
            options: ["Bavarian Motor Works", "Belly Motor Way", "Begin Motor Work"],
            answerIndex: 0
        },

        {
            question: "A misandrist is a person that hates what?",
            options: ["Men", "Women", "Dogs"],
            answerIndex: 0
        },
        {
            question: "The headquarters of the United Nations is located in what city?",
            options: ["New York", "San Francisco", "Utah"],
            answerIndex: 0
        },
        {
            question: "In the game of chess, how many pawns does each player start with?",
            options: ["10", "11", "8"],
            answerIndex: 2
        }, {
            question: "Tenochtitlan, founded in 1324, is now known as what city?",
            options: ["Miami", "New Mexico", "London"],
            answerIndex: 1
        }
    ]

    var gameParameters = {
        timecounter:10,
       
        countdown: function () {
            gameParameters.timecounter--;
            $("#displayTime").html("time left: " + gameParameters.timecounter);
            if (gameParameters.timecounter == 0 || $("#btn2").data('clicked')) {
                // clearInterval(gameParameters.timeDisplayed);
                $("#results").prepend("<h4> Play Again </h4>");
                gameParameters.submit();

            }
        },
        start: function () {
            
            //call gameParameters countdown to set up timer
            gameParameters.timeDisplayed = setInterval(gameParameters.countdown, 1000);

            $("#btn1").css("display", "none");
            $("#btn2").css("display", "inline");
            $("#title").html("Answer below questions");

            // call questions and answers from object
            for (var i = 0; i < questionList.length; i++) {
                $("#display").append('<p>' + questionList[i].question + '</p');
                console.log(questionList[i].question);
                for (var j = 0; j < questionList[i].options.length; j++) {
                    $("#display").append('<input type="radio" value="'+j+'" name="radio' + i + '">' + questionList[i].options[j]).css("border", "1px solid");
                    console.log(questionList[i].options[j]);
                }

            }

        },
        submit: function () {
            clearInterval(gameParameters.timeDisplayed);
            //hide display(questions area) and show results
            $("#display").css("display", "none");
            $("#results").css("display", "block");
            $("#btn2").css("display", "none");
            $("#btn3").css("display", "inline"); 
             
            //determine correct and incorrect answers
            for (var i = 0; i < questionList.length; i++) {
                // for (var j = 0; j < questionList[i].options.length; j++);

                var answerVal = $('input[name="radio' + i + '"]:checked').val();
                             
                if   (answerVal == questionList[i].answerIndex){
                    correct += 1;
                    console.log("match"); 
                }  else if($('input[name="radio' + i + '"]:checked').length > 0){
                    incorrect += 1;
                }
           }

            //find out if any question wasn't answered
            var totalAnswer = correct + incorrect;
            var notAnswered = 0;
            if (totalAnswer !== questionList.length) {
                notAnswered = (questionList.length) - totalAnswer;

            }
            //reflect results(in results area)
            $("#results").append("<ul></ul>");
            //console.log(correct); 
            //console.log(incorrect); 
            //console.log(notAnswered); 
            
            $("#results ul").append("<li> your correct answers:  " + correct + "</li>");
            $("#results ul").append("<li> your incorrect answers:  " + incorrect + "</li>");
            $("#results ul").append("<li> You didn't answer:  " + notAnswered + "s" + "</li>");


        }, // end of submit
    
    } //parameters  

    //initialize game
    $("#btn1").on("click", function () {
       
        gameParameters.countdown();
        gameParameters.start();
    });

    //finish game
    $("#btn2").on("click", function () {
        
        $(this).data('clicked', true); 
        // gameParameters.submit();
        // gameParameters.timecounter=1; 

    });
});

     $("#btn3").on("click", function() {
         location.reload(); 
    }); 
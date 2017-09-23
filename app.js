$(document).ready( function (){
	

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAx1vMmNmfI4RWTsrnnNQoZCrKgHB6Z0IE",
    authDomain: "train-scheduler-1a563.firebaseapp.com",
    databaseURL: "https://train-scheduler-1a563.firebaseio.com",
    projectId: "train-scheduler-1a563",
    storageBucket: "",
    messagingSenderId: "175261477837"
  };
  firebase.initializeApp(config);

var database=firebase.database();
var displayTime = function() {
  //var time = moment().format('hh:mm:ss a');
	  var timeNow = moment().format('hh:mm:ss A');
	  $('#currentTime').html("<h3> Current Time :  " + timeNow+"</h3>");
	  $("#tableBody").empty();
   database.ref().on("child_added", function(snapshot) {
     /* console.log(snapshot.val());
      console.log(snapshot.val().name);
      console.log(snapshot.val().destination);
      console.log(snapshot.val().start);
      console.log(snapshot.val().frequency);*/
	
	var tableRow=$('<tr>');

	var nameData=$('<td>');
	var destinationData=$('<td>');
	var frequencyData=$('<td>');
	var nextArrivalData=$('<td>');
	var timeRemainingData=$('<td>');

	nameData.text(snapshot.val().name);

	destinationData.text(snapshot.val().destination);

	var frequencyValue=snapshot.val().frequency;
	frequencyData.text(frequencyValue+" mins");

	var startTimeValue=snapshot.val().start;
	var startTimeConverted=moment(startTimeValue, "hh:mm").subtract(1, "years");

	var timeDiff=moment().diff(moment(startTimeConverted), "minutes");
	var timeRemainder = timeDiff % frequencyValue;

	var minutesAway= frequencyValue-timeRemainder;
	timeRemainingData.text(minutesAway);

	var nextTrain=moment().add(minutesAway,"minutes").format("LT");
	nextArrivalData.text(nextTrain);

	
	tableRow.append(nameData);
	tableRow.append(destinationData);
	tableRow.append(frequencyData);
	tableRow.append(nextArrivalData);
	
	if(timeRemainingData==0){
		timeRemainingData.css("color","red");
	}
	tableRow.append(timeRemainingData);

	$("#tableBody").append(tableRow);
      
     
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
}


setInterval(displayTime, 1000);

$('#addTrain').on("click", function(){
event.preventDefault();
var name=$('#trainName').val().trim();
var destination=$('#destination').val().trim();
var start=$('#startTime').val().trim();
var frequency=$('#frequency').val().trim();

  database.ref().push({
  	name: name,
	destination:destination,
	start :start,
	frequency:frequency     
     });

});

	
});
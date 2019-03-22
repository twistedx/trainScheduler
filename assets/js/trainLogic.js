
  $(document).ready(function() {

  var config = {
    apiKey: "AIzaSyAWTPooN_wVcDWz2Zi7P1QQYWhNOdQLePg",
    authDomain: "train-3ee04.firebaseapp.com",
    databaseURL: "https://train-3ee04.firebaseio.com",
    projectId: "train-3ee04",
    storageBucket: "",
    messagingSenderId: "305942399653"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var trainFreq = $("#frequency-input").val().trim();
  var timeInput = $("#time-input").val().trim();


  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    dest: trainDest,
    freq: trainFreq,
    time: timeInput

  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.Freq);


  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");

});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().dest;
  var trainFreq = childSnapshot.val().freq;
  var time = childSnapshot.val().time;


  // Employee Info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainFreq);


  var dateConvert = moment(childSnapshot.val().time, "HHmm").subtract(1, "years");

  //console.log("DATE CONVERTED: " + dateConvert);

  var trainTime = moment(dateConvert).format("HHmm");

  //console.log("Train time : " + trainTime);

  //difference bw the times
  var timeConvert = moment(trainTime, "HHmm").subtract(1, "years");
  var timeDifference = moment().diff(moment(timeConvert), "minutes");

  var timeRemaining = timeDifference % trainFreq;

  var timeAway = trainFreq - timeRemaining;

  var nextArrival = moment().add(timeAway, "minutes");

  var arrivalDisplay = moment(nextArrival).format("HH:mmA");

  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(trainFreq),
    $("<td>").text(arrivalDisplay),
    $("<td>").text(timeAway)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case

$(".resetInput").on("click", function(event){
  location.reload();
});


setInterval("window.location.reload()", 60000);
});

/**
* @param {string[]} rooms List of booksble rooms
* @param {boolean[][]} bookings List of existing bookings. bookings[room][time]
* @return Element A table element of all rooms
**/

var timeSlots = 0;
var bookingPeople = sessionStorage.getItem('bookingPeople');
var bookingAV = sessionStorage.getItem('avSlide');
var pickedDate = sessionStorage.getItem('pickedDate');
var showBookings = sessionStorage.getItem('showBookings');
var bookingTime = sessionStorage.getItem('bookingTime');
var loginStatus = sessionStorage.getItem('loginStatus');
var currentDate;


/**
* Automatic generation of a timetable instead of through HTML
* Could not get it 100% to work, though it generates some of the table
* NOT IMPLEMENTED
**/
function createTimetable(rooms, bookings, bookingCallback) {
	console.log('Create timetable bro');
	var startTime = 8;
	var endTime = 20;
	
	var i;
	var letter = ['a','b','c','d'];
	var selectedClass = 'ui-class--selected';
	var blockedClass = 'ui-class--blocked';
	
	var table = $('<table>');
	var headRow = $('<div class="ui-block-a"><div class="ui-bar ui-bar-a" style="height:60px;width:50px">Room</div></div>');
	headRow.append(rooms.map(function(roomName) { 
		return $('<div class="ui-block-b"><div class="ui-bar ui-bar-a" style="height:60px;width:50px">'+roomName+'</div></div>'); } ));
	table.append(headRow);
	
	for(var time = startTime; time < endTime; time++) {
		var timeRow = $('<div class="ui-block-a"><div class="ui-bar ui-bar-a" style="height:60px;width:50px">'+time+'</div></div>');
		timeRow.append(rooms.map(
			function(roomName) {
				var thisBlock = $('<td data-room="'+roomName+'" data-time="'+time+'"></td>');
				var isBlocked = !!bookings[rooms.indexOf(roomName)][time];	// add some error checking around this
				if(isBlocked) {
					// If there is an existing booking add booked class
					thisBlock.addClass(blockedClass);
				} else {
					// If there is not existing booking bind click event
					(function(blockTime) {
						thisBlock.on('click', function() {
							if(thisBlock.hasClass(selectedClass)) {
								// Do whatever unbooked stuff you need
								// e.g. Update booking list if used
								bookingCallback({action: 'remove', room: roomName, time: blockTime});
								thisBlock.removeClass(selectedClass);
							} else {
								// Do whatever booked stuff you need
								bookingCallback({action: 'add', room: roomName, time: blockTime});
								thisBlock.addClass(selectedClass);
							}
						});
					})(time);
				}
				return thisBlock;
			}
		));
		table.append(timeRow);
	}
	return table;
}

/**
* TIMETABLE -- Allows the user to select time blocks
* CHANGES -- Still need to implement restrictions on what time blocks the user can  select
**/
function selectTime(id){
	var block = document.getElementById(id);
	console.log(block);
	if(block.style.backgroundColor != "green"){
		block.style.backgroundColor = "green";
		timeSlots++;
		console.log(timeSlots);
	}
	else{
		block.style.backgroundColor = "blue";
		timeSlots--;
	}
}


/**
* TIMETABLE -- Checking the time blocks the user has selected 
* CHANGES -- Still need to implement adding the times the user selected to variables
**/
function bookingCreate(){
	if(timeSlots == 0){
		alert("Please select a time for your booking");
	}
	else{
		window.location.href= "#details"
	}
}

/**
* DETAILS -- Adds the No# people and AV usage to session storage
**/
function bookingDetails(){
	var detailsPeople = $('#number-of-people').find(":selected").text();
	sessionStorage.setItem('bookingPeople', detailsPeople);
	
	var detailsAV = $('#avSlider').find(":selected").text();
	sessionStorage.setItem('avSlide', detailsAV);
}

/**
* TOS -- Changes the text of the BOOKINGS page to the all details of the booking
**/
function bookingFinalize(){
	$('#bookings--people').text(sessionStorage.getItem('bookingPeople'));
	$('#bookings--av').text(sessionStorage.getItem('avSlide'));
	$('#bookings--date').text(sessionStorage.getItem('pickedDate'));
	sessionStorage.setItem('showBookings', 1);
	console.log(sessionStorage.getItem('showBookings'));
	$(bookingOne).show();
}

/**
* STARTS & BOOKINGS -- Hides the single booking listing in the BOOKINGS list
**/
function bookingDelete(){
	sessionStorage.setItem('showBookings', 0);
	$(bookingOne).hide();
}

/**
* LOGIN -- Checks that the user has entered at least one character for both username and password
		--> Provides simple alert dialogue
* 
* NAV -- Changes the TOP NAV, left button to:
*	  --> Cross Icon
* 	  --> "Logout" text
* 	  --> The logout() function onclick
* 	  --> Removes the HREF link
* CHANGES -- Use multiple 
**/
function login(){
	var username = $("#username");
	var passWord = $("#passWord");
	
	if(username.val().length >= 1 && passWord.val().length >= 1){
		sessionStorage.setItem('loginStatus', true);
		$('.ui-btn-left').each(function(){
			$(this).buttonMarkup({ icon: "delete"});
			$(this).text("Logout");
			$(this).attr('onclick', "logout()");
			$(this).attr('href', '#');
	});
	window.location.href="#timetable";
	}	
	else{
		alert("Please enter your student number or password");
	}
}

/**
* NAV -- Changes the TOP NAV, left button to:
* 	--> Action icon
* 	--> "Login" text
* 	--> Remoes the onclick function
* 	--> Changes the HREF to the login page
* CHANGES -- Stop the app from going to the login page when logging out
**/
function logout(){
	$('.ui-btn-left').each(function(){
		$(this).attr('href', '#');
		$(this).buttonMarkup({ icon: "action"});
		$(this).text("Login");
		$(this).attr('onclick', '');
		$(this).attr('href', '#login');
	});
	window.location.href="#timetable";
}



/**
* If booking data is stored in the DOM you can use this
* @return {Object[]} An array of all selected bookings in the format {room: roomname, time: bookingtime}
**/
function getBookingArray() {
	var selectedClass = 'ui-class--selected';
	var bookings = [];
	$('#timetableContainer').find('.'+selectedClass, function(elem) {
		bookings.push({
			room: elem.data('room'),
			time: elem.data('time')
		});
	});
}


$(document).ready(function() {
	/**
	* CALENDAR -- Allows the datepicker date to be selected, saves the variables to date variables
	* MOMENTJS -- Uses Momentjs to convert current date/selected date to 'Mar 3rd' format
	**/
	
	$('#datepicker').datepicker({
		onSelect: function(dateString) {
			var myDate = new moment(dateString).format("MMM Do");
			var myLongDate = new moment(dateString).format("dddd, MMM Do");
			sessionStorage.setItem('pickedDate', myLongDate);
			console.log(sessionStorage.getItem('pickedDate'));
			$("#timetable--Date").text(myDate);
			$("#details--Date").text(myDate);
			$("#starts--Date").text(myDate);
			window.location.href= "#timetable";
		}
	});
	
	/**
	* BOOKINGS -- 
	*	-->Hides the listed booking if the user hasn't made a booking
	*	-->Shows the booking if the user has made a booking	
	**/
	if(sessionStorage.getItem('showBookings') == 1){
		$(bookingOne).show();
		console.log(sessionStorage.getItem('showBookings'));
	}
	else{
		$(bookingOne).hide();
		console.log(sessionStorage.getItem('showBookings'));
	}
	
	/**
	* BOOKINGS/TIMETABLE -- Sets default date to today
	**/
	var myDate = new Date();
	currentDate = moment(myDate).format("MMM Do");
	$('#timetable--Date').text(currentDate);
	$('#bookings--Date').text(currentDate);

	/**
	* TIMETABLE -- Auto generates the timetable with prefilled blocked timeslots	
	
	var bookingArray = [];
	$('#timetableContainer').append(createTimetable(
		['A', 'B', 'C'],
		[
			[false, false, false, false, false, false, false, false, false, false, true],
			[],
			[]
		],
		function(booking) {
			console.log(booking);
			// Alternative to getBookingArray if you want to manage a booking list from a callback
			if(booking.action === 'add') {
				// Add booking to list (this may add duplicates)
				bookingArray.push(booking);
			} else if(booking.action === 'remove') {
				var index = bookingArray.findIndex((function(oldBooking) { return oldBooking.time === booking.time && oldBooking.room === booking.room; }));
				if(index >= 0) {
					// If we have a matching booking remove it from the list
					bookingArray.splice(index, 1);
				}
			}
			console.log(bookingArray);
		}
	));
	**/
});

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



function createBooking(){
	if(timeSlots == 0){
		alert("Please select a time for your booking");
	}
	else{
		window.location.href= "#details"
	}
}

function createDetails(){
	var detailsPeople = $('#number-of-people').find(":selected").text();
	sessionStorage.setItem('bookingPeople', detailsPeople);
	
	var detailsAV = $('#avSlider').find(":selected").text();
	sessionStorage.setItem('avSlide', detailsAV);
}

function finalizeBooking(){
	$('#bookings--people').text(sessionStorage.getItem('bookingPeople'));
	$('#bookings--av').text(sessionStorage.getItem('avSlide'));
	$('#bookings--date').text(sessionStorage.getItem('pickedDate'));
	sessionStorage.setItem('showBookings', 1);
	$(bookingOne).show();
}

function deleteBooking(){
	$(bookingOne).hide();
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
	$('#datepicker').datepicker({
		onSelect: function(dateString) {
			var myDate = new moment(dateString).format("MMM Do");
			var myLongDate = new moment(dateString).format("MMM Do");
			sessionStorage.setItem('pickedDate', myDate);
			console.log(sessionStorage.getItem('pickedDate'));
			$("#timetable--Date").text(myDate);
			$("#details--Date").text(myDate);
			$("#starts--Date").text(myDate);
			window.location.href= "#timetable";
		}
	});
	
	if(sessionStorage.getItem('showBookings') == 1){
		$(bookingOne).hide();
	}
	else{
		$(bookingOne).show();
	}
/*
	// Add timteable
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
*/
});


$(document).ready(function() {
    $('#result-div').hide();
    $('#error-div').hide();
    $('#submit').click(function(e) {
        e.preventDefault();
        const day = Number($('#day').val());
        const month = Number($('#month').val());
        const year = Number($('#year').val());

        // Input validation
        if (!day || !month || !year || day < 1 || day > 31 || month < 1 || month > 12 || year < 1) {
            $('#error').text('Please enter valid day, month, and year values.');
            $('#error-div').show();
            $('#result-div').hide();
            return;
        }

        const daysInMonth = new Date(year, month, 0).getDate();
        if (day > daysInMonth) {
            $('#error').text('The entered day is not valid for the given month and year.');
            $('#error-div').show();
            $('#result-div').hide();
            return;
        }

        const anchorDay = {
            3: 3,
            0: 2,
            1: 0,
            2: 5,
        };

        const doomsDays = {
            1: 3, // Non-leap year
            2: 28, // Non-leap year
            3: 7,
            4: 4,
            5: 9,
            6: 6,
            7: 11,
            8: 8,
            9: 5,
            10: 10,
            11: 7,
            12: 12,
        };

        const daysAsNumbers = {
            0: "Sunday",
            1: "Monday",
            2: "Tuesday",
            3: "Wednesday",
            4: "Thursday",
            5: "Friday",
            6: "Saturday",
        };

        function calculateDayOfWeek(day, month, year) {
            const lastTwoDigits = parseInt(String(year).slice(-2));
            const firstTwoDigits = parseInt(String(year).slice(0, 2));
            const anchorDayValue = anchorDay[firstTwoDigits % 4];
            let dayOfDoomsday =
                anchorDayValue +
                Math.floor(lastTwoDigits / 12) +
                (lastTwoDigits % 12) +
                Math.floor((lastTwoDigits % 12) / 4);
                
            dayOfDoomsday = dayOfDoomsday % 7;

            // Check for leap year adjustment
            if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
                if (month === 1) {
                    doomsDays[1] = 4; // Leap year
                }
                if (month === 2) {
                    doomsDays[2] = 29; // Leap year
                }
            }

            let actualDay;
            if (day > doomsDays[month]) {
                actualDay = day - doomsDays[month] + dayOfDoomsday;
            } else {
                actualDay = dayOfDoomsday - (doomsDays[month] - day);
            }
            if(actualDay<-7){
                actualDay = actualDay%-7
            }
            if (actualDay < 0) {
                actualDay += 7;
            }
            return daysAsNumbers[actualDay % 7];
        }

        const dayOfWeek = calculateDayOfWeek(day, month, year);
        if (dayOfWeek === undefined) {
            $('#error').text('There was an error calculating the day of the week. Please check your inputs.');
            $('#error-div').show();
            $('#result-div').hide();
        } else {
            $('#result').text(`The day of the week is: ${dayOfWeek}`);
            $('#result-div').show();
            $('#error-div').hide();
        }
    });
});

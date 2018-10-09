var view = {
    displayMessage: function (msg) {
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;


    },
    displayHit: function (location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit");

    },

    displayMiss: function (location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }
};


/*
view.displayMiss("00");
view.displayHit("34");
view.displayMiss("55");
view.displayHit("12");
view.displayMiss("25");
view.displayHit("26");

view.displayMessage("tap tap is this thing on?");
*/

/*Basically the model will talk to the view and tell it to update the ships and hits/misses.*/
var model = {
    boardSize: 7,
    numShips: 3, /*By not hardcoding the value of ships, we can change the number of ships. */
    ships: [ /*By initially hardcoding the values in first, this gives us an idea of what it will look like. Good idea to test with this in mind first.  */
        { locations: ["06", "16", "26"], hits: ["", "", ""] },

        { locations: ["24", "34", "44"], hits: ["", "", ""] },

        { locations: ["10", "11", "12"], hits: ["", "", ""] },

    ], /*location of the ships*/


    shipsSunk: 0, /*Want to initialize as 0 at the start of the game*/
    shipLength: 3,
    fire: function (guess) { /*This turns a players guess into a hit/miss*/
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];

            var index = ship.locations.indexOf(guess); /*This searches array for matching value and returns its index*/

            // var locations = ship.locations;
            // var index = locations.indexOf(guess); 

            if (index >= 0) {
                ship.hits[index] = "hit";
                view.displayHit(guess);
                view.displayMessage("Hit!"); //This is just the view for the player.

                if (this.isSunk(ship)) { /*This is inside of the for loop, meaning every cycle has a ship. */
                    view.displayMessage("You sank my battleship!")
                    this.shipsSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("You missed!");
        return false;
    },

    isSunk: function (ship) {
        for (var i = 0; i < ship.shipLength; i++) {
            if (ship.hits[i] !== "hit") {
                return false;
            }
        }
        return true;
    },

};


model.fire("53");

model.fire("06");
model.fire("16");
model.fire("26");

model.fire("34");
model.fire("24");
model.fire("44");

model.fire("12");
model.fire("11");
model.fire("10");
/*Arrays are good for storing multiple locations*/
/*Objects are good for creating detailed variables*/

var controller = {
    guesses: 0, //Keeps number of guesses made
    processGuess: function (guess) {  //Processes guesses and sends them to the model. Will catch the end of the game.
    },
    parseGuess: function (guess) {
        var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
        if (guess === null || guess.length !== 2 ) {
            alert("Please enter  a letter and a number on the board");
        }
        else {
            var firstChar = guess.charAt(0);
            var row = alphabet.indexOf(firstChar);
            var column = guess.charAt(1);
            if (NaN(row) || NaN(column)){
                alert("That isn't possible to fire there");
            }
            else if (row < 0 || column <0 || row >= model.boardSize || column >= model.boardSize){
                alert("This isn't on the board");
            }
            else {
                return row + column;
            }
        }
        return null;
    }
};


console.log(parseGuess("A6"));
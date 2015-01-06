mapSize = [10, 10];
numDoges = 4

// Setup the game. Will clear everything and place new characters
function gameSetup() {
  // clear horseman interval
  if(typeof evilHorseMan !== 'undefined') {
    if(evilHorseMan.interval !== 0) {
      clearInterval(evilHorseMan.interval);
    }
  }

  document.getElementById("frame").innerHTML = "";

  doges = [];
  for(var i = 0; i < numDoges; i++) {
    // Create four new doge objects with random locations that are alive but still need to be saved
    doges[i] = {
      location: [Math.floor(Math.random()*(mapSize[0]-2))+1, Math.floor(Math.random()*(mapSize[1]-2))+1],
      isAlive: true,
      isSaved: false
    }
    // Add the doge images to the DOM and set their positions
    document.getElementById("frame").innerHTML += '<img src="doge.png" class="doge" id="doge' + i + '"/>\n';
    document.getElementById("doge" + i).style.top = String(15 + (40*doges[i].location[1])) + "px";
    document.getElementById("doge" + i).style.left = String(15 + (40*doges[i].location[0])) + "px";
  }

  // Create the evil horse man object
  evilHorseMan = {
    // This is the interval id to loop his movement
    interval: 0,
    // This is his current location. Initially set to the opposite corner from the platypus.
    location: [mapSize[0], mapSize[1]],

    // Move the horse in the direction of the platypus
    move: function() {
      // If platypus is above, move horse up... etc...
      if(platypus.location[0] > this.location[0])
        this.location[0] += 1;
      if(platypus.location[0] < this.location[0])
        this.location[0] -= 1;
      if(platypus.location[1] > this.location[1])
        this.location[1] += 1;
      if(platypus.location[1] < this.location[1])
        this.location[1] -= 1;
      // Attack anything in the nearby vicinity!
      this.attack();
      // Update the horses image location on the screen
      document.getElementById("evilhorseman").style.top = String(15 + (40*this.location[1])) + "px";
      document.getElementById("evilhorseman").style.left = String(15 + (40*this.location[0])) + "px";
    },

    // Attack anything in the nearby vicinity!
    attack: function() {
      // Check every doge...
      for(var i = 0; i < doges.length; i++) {
        // If horse is on top of doge, turn doge to ash
        if(doges[i].location[0] === this.location[0] && doges[i].location[1] === this.location[1]) {
          doges[i].isAlive = false;
          document.getElementById("doge" + i).src = "ash.png"
        }
      }
      // If horse is on top of platypus then it is game over
      if(platypus.location[0] === this.location[0] && platypus.location[1] === this.location[1]) {
        gameOver(platypus.dogesCollected);
      }
    }
  }
  // Create the horse in the DOM
  document.getElementById("frame").innerHTML += '<img id="evilhorseman" src="evilhorseman.png"/>';

  // Create the platypus object
  platypus = {
    // How many doges have already been collected
    dogesCollected: 0,
    // Location of the platypus
    location: [0, 0],

    // Movement functions. Only moves within bounds
    moveUp: function() {
      // If within bounds...
      if(this.location[1] > 0) {
        // ...move
        this.location[1] -= 1;
      }
    },
    moveDown: function() {
      if(this.location[1] < mapSize[1]-1) {
        this.location[1] += 1;
      }
    },
    moveLeft: function() {
      if(this.location[0] > 0) {
        this.location[0] -= 1;
      }
    },
    moveRight: function() {
      if(this.location[0] < mapSize[0]-1) {
        this.location[0] += 1;
      }
    },

    // Save any doges in the nearby vicinity!
    collectDoges: function() {
      // For every doge...
      for(var i = 0; i < doges.length; i++) {
        // If the doge is still alive and platypus is on top of it...
        if(doges[i].isAlive && doges[i].location[0] === this.location[0] && doges[i].location[1] === this.location[1]) {
          // Remove the image from the DOM
          var element = document.getElementById("doge" + i);
          element.parentNode.removeChild(element);
          // Increase the number of doges saved
          this.dogesCollected += 1;
          // Set the doge to saved
          doges[i].isSaved = true;
        }
      }
      // Count how many doges are alive and not saved
      var dogesLeft = 0;
      for(var i = 0; i < doges.length; i++) {
        if(doges[i].isAlive && !doges[i].isSaved)
          dogesLeft += 1;
      }

      // If there are no doges left and you have saved at least one, you win!
      if(dogesLeft === 0 && this.dogesCollected > 0) {
        gameWon(this.dogesCollected);
      }
      // If there are no doges left and you haven't saved any, you lost :(
      else if(dogesLeft === 0) {
        gameOver(this.dogesCollected);
      }
    }
  }
  // Add the platypus to the DOM
  document.getElementById("frame").innerHTML += '<img id="platypus" src="platypus.png"/>';

  // Setup the interval to move the horse once every second
  evilHorseMan.interval = setInterval(function() {evilHorseMan.move()}, 1000);
}

// This function stops the game and displays the game over page
function gameOver() {
  document.getElementById("frame").innerHTML = '<center><img id="loser" src="loser.gif"/><h2>Click image to replay</h2></center>';
}

// This function stop the game and displays the winner page
function gameWon(score) {
  document.getElementById("frame").innerHTML = '<center><img id="winner" src="winner.jpg"/><h2>Score: ' + score + '<br/>Click image to replay</h2></center>';
}

// This adds the event listener to track keystroke activity
document.addEventListener('keydown', function(event) {
    // Move up - W - Keycode 87
    if(event.keyCode == 87) {
      platypus.moveUp();
    }
    // Move down - S - Keycode 83
    else if(event.keyCode == 83) {
      platypus.moveDown();
    }
    // Move left - A - Keycode 65
    else if(event.keyCode == 65) {
      platypus.moveLeft();
    }
    // Move right - D - Keycode 68
    else if(event.keyCode == 68) {
      platypus.moveRight();
    }
    // Every time we press a key, we want to update the position of the platypus
    document.getElementById("platypus").style.top = String(15 + (40*platypus.location[1])) + "px";
    document.getElementById("platypus").style.left = String(15 + (40*platypus.location[0])) + "px";
    // Collect all doges in the nearby vicinity
    platypus.collectDoges();
});

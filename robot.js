var state = {
    robotPosition: 0,
    mapSize: 5,
    icon: 'R'
}

var histories = [];

function availablePosition(newPosition, mapSize) {
    if (newPosition >= 0 && newPosition < mapSize) {
        return true;
    } else {
        return false;
    }
}

function move(newPosition) {
    if (availablePosition(newPosition, state.mapSize)) {
        var oldState = Object.assign({}, state);
        histories.push(oldState);
        
        // histories elements: position > 2
        var greaterThan2 = histories.filter(aState => aState.robotPosition > 2);
        console.log("greaterThan2: ", greaterThan2);
        // histories: robotPosition only [2, 3, 4]
        var posOnly = histories.map(aState => aState.robotPosition);
        console.log("posOnly: " + posOnly);
        // combine all the icons 'RRRRR'
        // var combination = histories.map(state => state.icon).join("").toString();
        var combination = histories.reduce((total, aState) => total + aState.icon, "");
        
        // console.log("combination: " + combination);
        
        state.robotPosition = newPosition;
        render();
        return true;
    } else {
        return false;
    }
}

function render() {
    var mapCells = document.querySelectorAll('.map-cell');
    mapCells.forEach((aCell, index) => {
        if (index === state.robotPosition) {
            aCell.innerHTML = state.icon;
        } else {
            aCell.innerHTML = '';
        }
    })
}

function onCommandRight() {
    move(state.robotPosition + 1);
}

function onCommandLeft() {
    move(state.robotPosition - 1);
}

function onReverse() {
    state = histories.pop();
    render();
}

render();
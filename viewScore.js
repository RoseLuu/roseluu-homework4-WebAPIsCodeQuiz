var showScorePart = document.querySelector('#highscores')
var clearHighScore = document.querySelector('#clear-score')


function printHighScore() {
    //get the localStorage for highscores key, 
    var viewScore = JSON.parse(localStorage.getItem('highscores')) || [];
    //sort the score to make sure the highest score will be on top
    viewScore.sort(function (a, b) {
        return b.userScore - a.userScore
    });
    console.log(viewScore);
    for (let i = 0; i < viewScore.length; i++) {
        var li = document.createElement('li');
        li.textContent = viewScore[i].initials + ":" + " " + viewScore[i].userScore;
        console.log(viewScore.initials)
        showScorePart.appendChild(li);
    }
}
printHighScore();
//clear score function
function clearScores() {
    window.localStorage.clear();
    window.location.reload();
}
//add event when click clear-score button
clearHighScore.addEventListener('click', clearScores);




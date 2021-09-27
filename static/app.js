let score = 0;
let highscore = 0;
let played_count = 0;
let done_playing = false;
// Handles guess form submission
$('#word-form').on('submit', function (evt) {
  evt.preventDefault();
  user_guess = $('#guess').val().toLowerCase();
  if (done_playing === false) {
    handleFormData(user_guess);
  }
  $('#guess').val('');
});
// Handles form data and creates axios request to Flask
async function handleFormData(user_guess) {
  axios
    .post(
      '/guess',
      {},
      {
        params: {
          guess: user_guess
        }
      }
    )
    .then(function (response) {
      //handle success
      console.log(response);
      // update score and result text
      if (response.data.result === 'Correct!') {
        score = score + response.data.word_length;
      }
      $('#score').text('Score:' + score);
      $('#result').text(response.data.result);
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
}
// Handles timer for entire game board. 60 sec max time
setTimeout(function () {
  handle_game_end();
}, 60000);

// Handles game end
function handle_game_end() {
  done_playing = true;
  $('#result').text('Times up! Refreshing page in 10 seconds');
  setTimeout(function () {
    location.reload();
  }, 10000);
}

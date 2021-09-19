$('#word-form').on('submit', function (evt) {
  evt.preventDefault();
  user_guess = $('#guess').val().toLowerCase();
  handleFormData(user_guess);
  $('#guess').val('');
});
let score = 0;
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
      // update score and result text
      if (response.data.result === 'Correct!') {
        score = score + response.data.word_length;
      }
      $('#score').text('Score:' + score);
      $('#result').text(response.data.result);

      console.log(response.data.result);
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
}

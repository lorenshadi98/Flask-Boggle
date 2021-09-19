$('#word-form').on('submit', function (evt) {
  evt.preventDefault();
  user_guess = $('#guess').val();
  handleFormData(user_guess);
});

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
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
}

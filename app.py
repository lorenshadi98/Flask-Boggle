from boggle import Boggle
from flask import Flask, request, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

boggle_game = Boggle()
board = boggle_game.make_board()


@app.route("/")
def generate_board():
    """Generates board for boggle game"""
    return render_template("board.html", board=board)


@app.route("/guess", methods=["POST", "GET"])
def handle_data():
    # TO DO: handle incoming server request and validate incoming "word"
    # TO DO: check if the word exists in our dictionary, and then check if the word is valid in the game board.
    # NOTE: make sure that you respond with JSON using the jsonify function from flask.

    user_guess = request.args['guess']
    word_exists = boggle_game.check_valid_word(board, user_guess)
    return word_exists

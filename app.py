
from werkzeug.datastructures import ContentSecurityPolicy
from werkzeug.wrappers.response import ResponseStream
from boggle import Boggle
from flask import Flask, request, render_template, jsonify, session, redirect
from flask_cors import CORS

GAME_BOARD = "board"

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = "never-tell!"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

boggle_game = Boggle()
board = boggle_game.make_board()


@app.route("/")
def generate_board():
    """Generates board for boggle game"""
    session[GAME_BOARD] = board
    return render_template("board.html", board=board)


@app.route("/guess", methods=["POST", "GET"])
def handle_data():
    """Handles data incoming from user guess form. Data handling includes 
        validation as well as response"""

    user_guess = request.args['guess']
    board = session.get(GAME_BOARD)
    word_exists = boggle_game.check_valid_word(board, user_guess)
    return_json = jsonify(
        {"result": word_exists, "word_length": len(user_guess)})
    if request.method == "POST":
        return return_json
    else:
        return return_json


if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)

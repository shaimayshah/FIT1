$(document).ready(function() {
    $(".red").click(function() {
        $("h2, .lol, .options").css("visibility", "hidden");
        $("table").css("visibility", "visible");
        ai = "blue";
        human = "red";
    });
    $(".blue").click(function() {
        $("h2, .lol, .options").css("visibility", "hidden");
        $("table").css("visibility", "visible");
    });

    $("td").click(function() {
        move(this, hu, human);
    });
});
var board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var hu = "H";
var a = "A";
var count = 0;
var round = 0;
var ai = "red";
var human = "blue";


    function reset() {
        round = 0;
        board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        $("td").css("background-color", "transparent");
    }

    function win(board, player) {
        if (
            (board[0] == player && board[1] == player && board[2] == player) ||
            (board[3] == player && board[4] == player && board[5] == player) ||
            (board[6] == player && board[7] == player && board[8] == player) ||
            (board[0] == player && board[3] == player && board[6] == player) ||
            (board[1] == player && board[4] == player && board[7] == player) ||
            (board[2] == player && board[5] == player && board[8] == player) ||
            (board[0] == player && board[4] == player && board[8] == player) ||
            (board[2] == player && board[4] == player && board[6] == player)
        ) {
            return true;
        } else {
            return false;
        }
    }

    function move(element, player, color) {
        if (board[element.id] != "H" && board[element.id] != "A") {
            round++;
            $(element).css("background-color", color);
            board[element.id] = player;

            if (win(board, player)) {
                setTimeout(function() {
                    alert("You Win! The coupon code is: iW0n! Please call us for the discount.");
                    reset();
                }, 500);
                return;
            } else if (round > 8) {
                setTimeout(function() {
                    alert("It's a tie. You may try again.");
                    reset();
                }, 500);
                return;
            } else {
                round++;
                var index = minimax(board, a).index;
                var selector = "#" + index;
                $(selector).css("background-color", ai);
                board[index] = a;
                if (win(board, a)) {
                    setTimeout(function() {
                        alert("You have lost!");
                        reset();
                    }, 500);
                    return;
                } else if (round === 0) {
                    setTimeout(function() {
                        alert("tie");
                        reset();
                    }, 500);
                    return;
                }
            }
        }
    }

    function minimax(newBoard, player) {
        count++;
        let spots = available(newBoard);
        if (win(newBoard, hu)) {
            return {
                score: -10
            };
        } else if (win(newBoard, a)) {
            return {
                score: 10
            };
        } else if (spots.length === 0) {
            return {
                score: 0
            };
        }

        var emptyBoxes = [];
        for (var i = 0; i < spots.length; i++) {
            var move = {};
            move.index = newBoard[spots[i]];
            newBoard[spots[i]] = player;

            if (player == a) {
                var g = minimax(newBoard, hu);
                move.score = g.score;
            } else {
                var g = minimax(newBoard, a);
                move.score = g.score;
            }
            newBoard[spots[i]] = move.index;
            emptyBoxes.push(move);
        }

        var bestMove;
        if (player === a) {
            var bestScore = -99999;
            for (var i = 0; i < emptyBoxes.length; i++) {
                if (emptyBoxes[i].score > bestScore) {
                    bestScore = emptyBoxes[i].score;
                    bestMove = i;
                }
            }
        } else {
            var bestScore = 99999;
            for (var i = 0; i < emptyBoxes.length; i++) {
                if (emptyBoxes[i].score < bestScore) {
                    bestScore = emptyBoxes[i].score;
                    bestMove = i;
                }
            }
        }
        return emptyBoxes[bestMove];
    }

    function available(newBoard) {
        return newBoard.filter(s => s != "H" && s != "A");
    }



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

    function winning(board, player) {
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

            if (winning(board, player)) {
                setTimeout(function() {
                    alert("YOU WIN");
                    reset();
                }, 500);
                return;
            } else if (round > 8) {
                setTimeout(function() {
                    alert("TIE");
                    reset();
                }, 500);
                return;
            } else {
                round++;
                var index = minimax(board, a).index;
                var selector = "#" + index;
                $(selector).css("background-color", ai);
                board[index] = a;
                if (winning(board, a)) {
                    setTimeout(function() {
                        alert("YOU LOSE");
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
        let array = avail(newBoard);
        if (winning(newBoard, hu)) {
            return {
                score: -10
            };
        } else if (winning(newBoard, a)) {
            return {
                score: 10
            };
        } else if (array.length === 0) {
            return {
                score: 0
            };
        }

        var moves = [];
        for (var i = 0; i < array.length; i++) {
            var move = {};
            move.index = newBoard[array[i]];
            newBoard[array[i]] = player;

            if (player == a) {
                var g = minimax(newBoard, hu);
                move.score = g.score;
            } else {
                var g = minimax(newBoard, a);
                move.score = g.score;
            }
            newBoard[array[i]] = move.index;
            moves.push(move);
        }

        var bestMove;
        if (player === a) {
            var bestScore = -99999;
            for (var i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            var bestScore = 99999;
            for (var i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        return moves[bestMove];
    }

//available spots
    function avail(newBoard) {
        return newBoard.filter(s => s != "H" && s != "A");
    }

// winning combinations

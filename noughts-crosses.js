var board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    var square;
    var move;
    
    // random start - 1up or com
    var playerstart = Math.round(Math.random());
    
    // http://davidbau.com/javascript/src/tic-tac-toe.txt
    var lines = [
    {start: [0, 3, 6], increment: 1}, // vertical lines; increment to next column
    {start: [0, 1, 2], increment: 3}, // horizontal lines
    {start: [0], increment: 4}, // top-left to bottom-right
    {start: [2], increment: 2} // top-right to bottom-left
    ];
    
    function checkwinner(board) {
        if (winner(board) != 0) {
            if (winner(board) == 1) {
                $("#message").html('<h2>You win!</h2>');
                alert("Game over!");
            } else {
                $("#message").html('<h2>You lose!</h2>');
                alert("Game over!");
            }
            return false;
        }
        return true;
    }
    
    function winner(board) {
        for (var i = 0; i < lines.length; i++) { //iterate through lines
            for (var j = 0; j < lines[i].start.length; j++) { // iterate through each item in lines
                var index = lines[i].start[j]; // // each value of start
                var player = board[index]; // var player now equals the value of start
                for (var m = 0; player != 0 && m < 2; m++) { // if player is 0 don't run - no match found; only run twice (3 in a row)
                    index += lines[i].increment; // move through board by the amount set in increment
                    if (player != board[index]) {
                        player = 0; // exit loop - not in a row
                    }
                }
                if (player != 0) {
                    return player;
                }
            }
        }
        return 0;
    }
    
    function pickrandom() {
        move = Math.floor(Math.random()*9);
        while (board[move] != 0) {
            pickrandom();
        }
        return move;
    }
    
    function computermove() {
        setTimeout(function() {
            square = pickrandom();
            drawmove(square, "Com");
        }, 500);
    }
    
    function drawmove(square, player) {
        if (board[square] == 0) {
            if (player == "1up") {
                board[square] = 1;
                $("div#" + square).html("<span>x</span>");
            } else {
                board[square] = 2;
                $("div#" + square).html("<span>o</span>");
            }
            
            // debug
            // console.log(square, player);
            // console.log(board);
            
            checkwinner(board);
            if (winner(board) != 0) {
                return false;
            }
            
            movesremaining();
 
            return true;
        } else {
            alert("That square's already taken! Choose another one.");
            return false;
        }
    }
    
    function movesremaining() {
        for(i = 0; i < board.length; i++) {
            if(board[i] == 0) {
                return true;
            }
        }
        $("#message").html("<h2>It's a draw</h2>");
        alert("Game over!");
        return false;
    }
    
    // random start
    if(playerstart) {
        computermove();
    }
    
    $(document).ready(function() {
        $("div.gridsquare").click(function() {
            if (movesremaining()) {
                square = $(this).attr("id");
                
                checkwinner(board);
                
                if (winner(board) != 0) {
                    return false;
                }

                if(drawmove(square, "1up")) {
                    if (movesremaining()) {
                        computermove();
                    } else {
                        return false;
                    }
                }
            }
        });
    });
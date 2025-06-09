
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
let gameStarted = false;
let player = { x: 100, y: 200, color: "#ff0000", name: "Player" };
let ball = { x: 400, y: 250, radius: 10 };
let score = { left: 0, right: 0 };

function startGame() {
    let nameInput = document.getElementById("playerName").value;
    let colorInput = document.getElementById("jerseyColor").value;
    player.name = nameInput || "Player";
    player.color = colorInput;
    document.getElementById("customization").style.display = "none";
    gameStarted = true;
    requestAnimationFrame(gameLoop);
}

function drawField() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 10, canvas.height); // Left goal
    ctx.fillRect(canvas.width - 10, 0, 10, canvas.height); // Right goal
    ctx.fillRect(canvas.width / 2 - 1, 0, 2, canvas.height); // Mid line
    ctx.font = "20px Arial";
    ctx.fillText(score.left, canvas.width / 4, 30);
    ctx.fillText(score.right, (canvas.width / 4) * 3, 30);
}

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(player.x, player.y, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.fillText(player.name, player.x - 20, player.y - 20);
}

function drawBall() {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
}

function checkGoal() {
    if (ball.x < 10) {
        score.right++;
        resetBall();
    } else if (ball.x > canvas.width - 10) {
        score.left++;
        resetBall();
    }
}

function gameLoop() {
    if (!gameStarted) return;
    drawField();
    drawPlayer();
    drawBall();
    checkGoal();
    requestAnimationFrame(gameLoop);
}

canvas.addEventListener("mousemove", function (e) {
    let rect = canvas.getBoundingClientRect();
    player.x = e.clientX - rect.left;
    player.y = e.clientY - rect.top;
});

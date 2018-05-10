// - global -------------------------------------------------------------------
var screenCanvas;
var screenCanvas;
var run = true;
var fps = 100 / 100;
var mouse = new Point();
/**@type{CanvasRenderingContext2D} */
var ctx;
var fire = false;
var counter = 0;
var B_counter = 0;
//var chara;
var slow = false;
var Key = 0;
var Music = false;
var score = 0;
var invincible = false;
// - const --------------------------------------------------------------------
//Charactor
var C_color = 'rgba(255,255,255,1)';
var C_scolor = 'rgba(255,255,255, 1)';
var C_smaxcount = 10000;
var C_hp = 10;
var C_sabhp = 5;
var C_attack = 1;
var C_defence = 1;
var C_outsize = 0;
//Enemy
var E_color = 'rgba(10, 100, 230, 0.6)';
var E_scolor = 'rgba(0, 50, 255, 1)';
var E_maxcount = 100;
var E_smaxcount = 1000;
var E_attack = 1;
var E_defence = 1;
//boss
var B_hp = 400;
var B_sabhp = 4;
var B_maxcount = 4;
var B_color = 'rgba(35, 71, 130,0.8)';
var B_scolor = 'rgba(255,255,0,1)';
var B_smaxcount = 10000;
//Size---------------------
var width = document.documentElement.clientWidth - 1.5;
var height = document.documentElement.clientHeight - 6.5;
// - main ---------------------------------------------------------------------
window.onload = function () {
  var img = new Image();
  img.src = "back9.bmp";
  var a, b, c, d, e;
  var p = new Point(); {
    screenCanvas = document.getElementById('screen');
    screenCanvas.width = width;
    screenCanvas.height = height;
    ctx = screenCanvas.getContext('2d');
    screenCanvas.addEventListener('mousemove', mouseMove, true);
    document.addEventListener('keydown', keyDown, true);
    document.addEventListener('keyup', keyUp, true);
    /*info = document.getElementById('info');
     info_2 = document.getElementById('info_2');*/
    /*screenCanvas.addEventListener('mousedown', mouseDown, true);
    screenCanvas.addEventListener('mouseup', mouseUp, true);*/
    /*screenCanvas.width = 1364;
    screenCanvas.height = 762.5;*/
  }
  // - キャラクター用インスタンス-------------------------------
  var charactor = new Character();
  charactor.init(10);

  var enemy = new Array(E_maxcount);
  for (a = 0; a < E_maxcount; a++)
    enemy[a] = new Enemy();

  var boss = new Array(B_maxcount);
  for (b = 0; b < B_maxcount; b++)
    boss[b] = new Boss();
  // - ショット用インスタンス-------------------------------  
  var bossCount = 0;

  var C_shot = new Array(C_smaxcount);
  for (c = 0; c < C_shot.length; c++)
    C_shot[c] = new CharaShot();

  var E_shot = new Array(E_smaxcount);
  for (d = 0; d < E_shot.length; d++)
    E_shot[d] = new EnemyShot();

  var B_shot = new Array(B_smaxcount);
  for (e = 0; e < B_shot.length; e++)
    B_shot[e] = new BossShot();
  //Main------------------------------------------------------------------------------------------------------------------------
  var slowCount = 0;
  ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = .5;
  ctx.drawImage(img, 0, 0, screenCanvas.width, screenCanvas.width);
  ctx.globalAlpha = 1;
  (function () {
    slowCount++;
    //最後尾の "};" if (!slow || slowCount % 5 == 0) {
    //sytem main-----------------------------------------------------------------
    charactor.position.x = screenCanvas.width / 2;
    charactor.position.y = screenCanvas.height / 5 * 4;
    C_outsize = (screenCanvas.width * 10) / 1364; //1477:c=1364:10    c*1364=1477*10  C=1477*10/1364
    charactor.size = C_outsize / 10 * 4;
    C_draw(charactor);
    //console.log(charactor.size);
    //Game main---------------------------------------

    //End main----------------------------------------
    if (C_sabhp <= 0) ShowGameover("score || " + score);
    else requestAnimationFrame(arguments.callee);
    if (B_sabhp <= 0) ShowClear("GAME CLEAR\nscore || " + score);
    //100行くらいのIF文};
  })();
};
//Function-------------------------------------------------------------------------
function C_draw(charactor) {
  ctx.fillStyle = C_color;
  ctx.strokeStyle = 'rgba(0,0,0,0.5)';
  ctx.beginPath();
  ctx.arc(charactor.position.x, charactor.position.y, C_outsize, 0, Math.PI * 2, false)
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.beginPath();
  ctx.arc(charactor.position.x, charactor.position.y, charactor.size, 0, Math.PI * 2, false)
  ctx.closePath();
  ctx.fill();
}

function mouseMove(event) {
  mouse.x = event.clientX - screenCanvas.offsetLeft;
  mouse.y = event.clientY - screenCanvas.offsetTop;
}

function keyDown(event) {
  var ck = event.keyCode;
}

function keyUp(event) {
  var ck = event.keyCode;
}

function ShowGameover(text) {
  document.getElementById("gameover-wrap").classList.remove("hide");
  document.getElementById("gameover-wrap").classList.add("shown");
  document.getElementById("gameover-text").innerText = text;
}

function ShowClear(text) {
  document.getElementById("Clear-wrap").classList.remove("hide");
  document.getElementById("Clear-wrap").classList.add("shown2");
  document.getElementById("Clear-text").innerText = text;
};
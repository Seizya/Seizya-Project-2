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
var world = 0;
// - const --------------------------------------------------------------------
//Charactor
var C_color = 'rgba(255,255,255,1)';
var C_scolor = 'rgba(255,255,255, 1)';
var C_smaxcount = 10000;
var C_hp = 10;
var C_sabhp = 5;
var C_attack = 1;
var C_defence = 1;
var C_speed = 1;
var C_outsize = 0;
//Charactor sab
var CS_color = 'rgba(0,0,0,1)';
var CS_1 = { x: undefined, y: undefined };
var CS_2 = { x: undefined, y: undefined };
var CS_3 = { x: undefined, y: undefined };
var CS_4 = { x: undefined, y: undefined };
var CS_late = { x: undefined, y: undefined };
var CS_size;
var CS_far = 20;
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
var height = document.documentElement.clientHeight - 8;
//Key---------------------
var up = false;
var down = false;
var right = false;
var left = false;
var not = false;
var key0 = false;
var key1 = false;
var key2 = false;
var key3 = false;
var key4 = false;
var key5 = false;
var key6 = false;
var key7 = false;
var key8 = false;
var key9 = false;
//Cheat----------------------
var CC_pass = false;
var CC_pass0 = false;
var CC_pass3 = false;
var CC_pass1 = false;
var CC_pass8 = false;
// - main ---------------------------------------------------------------------
window.onload = function () {
  var img = new Image();
  img.src = "back9.bmp";
  var a, b, c, d, e, f;
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
  charactor.position.x = screenCanvas.width / 2;
  charactor.position.y = screenCanvas.height / 5 * 4;
  if (screenCanvas.height < screenCanvas.width) { world = screenCanvas.height / 762.5; }
  else { world = screenCanvas.width / 1364 };
  //sytem main-----------------------------------------------------------------
  C_outsize = 10 * world; //1477:c=1364:10    c*1364=1477*10  C=1477*10/1364
  charactor.size = C_outsize / 10 * 4;
  C_speed = 3 * world;
  CS_size = C_outsize / 2;
  //function---------------------------------------------------------------------------------------
  (function () {
    //slowCount++;
    //sytem main---------------------------------------------------------------
    ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = .5;
    ctx.drawImage(img, 0, 0, screenCanvas.width, screenCanvas.width);
    ctx.globalAlpha = 1;
    C_draw(charactor);
    CS_draw(CS_1, CS_2, CS_3, CS_4);
    //Cheat----------------------------------------------------------
    if (not) {
      if (key0) { CC_pass0 = true; setTimeout(function () { CC_pass0 = false; }, 4000); };
      if (CC_pass0) { if (key3) { CC_pass3 = true; setTimeout(function () { CC_pass3 = false; }, 3000); }; };
      if (CC_pass3) { if (key1) { CC_pass1 = true; setTimeout(function () { CC_pass1 = false; }, 2000); }; };
      if (CC_pass1) { if (key8) { CC_pass8 = true; setTimeout(function () { CC_pass8 = false; }, 1000); }; };
      if (CC_pass8) { CC_pass = true; };
    };
    if (CC_pass) {
      if (key1 && key2) { CC_12(); };
      if (key2 && key3) { CC_23(); };
      if (key3 && key4) { CC_34(); };
      if (key4 && key5) { CC_45(); };
      if (key5 && key6) { CC_56(); };
      if (key6 && key7) { CC_67(); };
      if (key7 && key8) { CC_78(); };
      if (key8 && key9) { CC_89(); };
    };
    //if (!slow || slowCount % 5 == 0) {
    //Game main----------------------------------------------------------------
    //charactor------------------------------------------------------
    if (up) { charactor.position.y -= C_speed; };
    if (down) { charactor.position.y += C_speed; };
    if (right) { charactor.position.x += C_speed; };
    if (left) { charactor.position.x -= C_speed; };
    if (CS_late.x == undefined) {
      CS_late.x = charactor.position.x;
      CS_late.y = charactor.position.y;
    } else {
      if (B_sabhp >= 3) {
        CS_late.x = (charactor.position.x * 0.25 + CS_late.x * 0.75);
        CS_late.y = (charactor.position.y * 0.25 + CS_late.y * 0.75);
        /* JIKI_OKURETERU.x=Math.min(1364,Math.max(JIKI_OKURETERU.x));
         JIKI_OKURETERU.y=Math.min(630,Math.max(JIKI_OKURETERU.y));*/
      } else {
        CS_late.x = (charactor.position.x * 0.5 + CS_late.x * 0.5);
        CS_late.y = (charactor.position.y * 0.5 + CS_late.y * 0.5);
      }
    }
    if (B_sabhp >= 3) {
      CS_1.x = CS_late.x + 30 * world;
      CS_1.y = CS_late.y + 10 * world;
      CS_2.x = CS_late.x - 30 * world;
      CS_2.y = CS_late.y + 10 * world;
    } else {
      CS_1.x = CS_late.x + CS_far * world;
      CS_1.y = CS_late.y + CS_far * world;
      CS_2.x = CS_late.x - CS_far * world;
      CS_2.y = CS_late.y + CS_far * world;
      CS_3.x = CS_late.x - CS_far * world;
      CS_3.y = CS_late.y - CS_far * world;
      CS_4.x = CS_late.x + CS_far * world;
      CS_4.y = CS_late.y - CS_far * world;
    };
    if (fire) { CS_far = 35 * world; } else { CS_far = 25 * world; };
    //enemy----------------------------------------------------------
    //End main-----------------------------------------------------------------
    if (C_sabhp <= 0) ShowGameover("score || " + score);
    else requestAnimationFrame(arguments.callee);
    if (B_sabhp <= 0) ShowClear("GAME CLEAR\nscore || " + score);
    // };
  })();
};
//Function---------------------------------------------------------------------
function C_draw(charactor) {
  ctx.fillStyle = C_color;
  ctx.strokeStyle = 'rgba(0,0,0,1)';
  ctx.beginPath();
  ctx.arc(charactor.position.x, charactor.position.y, C_outsize, 0, Math.PI * 2, false)
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = 'rgba(0,0,0,1)';
  ctx.beginPath();
  ctx.arc(charactor.position.x, charactor.position.y, charactor.size, 0, Math.PI * 2, false)
  ctx.closePath();
  ctx.fill();
}
function CS_draw(CS_1, CS_2, CS_3, CS_4) {
  ctx.fillStyle = CS_color;
  ctx.strokeStyle = 'rgba(255,255,255,1)';
  ctx.beginPath();
  ctx.arc(CS_1.x, CS_1.y, CS_size, 0, Math.PI * 2, false)
  ctx.moveTo(CS_2.x, CS_2.y);
  ctx.arc(CS_2.x, CS_2.y, CS_size, 0, Math.PI * 2, false)
  ctx.moveTo(CS_3.x, CS_3.y);
  ctx.arc(CS_3.x, CS_3.y, CS_size, 0, Math.PI * 4, false)
  ctx.moveTo(CS_4.x, CS_4.y);
  ctx.arc(CS_4.x, CS_4.y, CS_size, 0, Math.PI * 4, false)
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
}
function mouseMove(event) {
  mouse.x = event.clientX - screenCanvas.offsetLeft;
  mouse.y = event.clientY - screenCanvas.offsetTop;
}

function keyDown(event) {
  var ck = event.keyCode;
  console.log(ck);
  if (ck === 37) { left = true; };
  if (ck === 38) { up = true; };
  if (ck === 39) { right = true; };
  if (ck === 40) { down = true; };

  if (ck === 29) {
    not = true;
    CC_pass = false;
  };
  if (ck === 96) { key0 = true; };
  if (ck === 97) { key1 = true; };
  if (ck === 98) { key2 = true; };
  if (ck === 99) { key3 = true; };
  if (ck === 100) { key4 = true; };
  if (ck === 101) { key5 = true; };
  if (ck === 102) { key6 = true; };
  if (ck === 103) { key7 = true; };
  if (ck === 104) { key8 = true; };
  if (ck === 105) { key9 = true; };
}

function keyUp(event) {
  var ck = event.keyCode;
  if (ck === 37) { left = false; };
  if (ck === 38) { up = false; };
  if (ck === 39) { right = false; };
  if (ck === 40) { down = false; };

  if (ck === 29) { not = false; };
  if (ck === 96) { key0 = false; };
  if (ck === 97) { key1 = false; };
  if (ck === 98) { key2 = false; };
  if (ck === 99) { key3 = false; };
  if (ck === 100) { key4 = false; };
  if (ck === 101) { key5 = false; };
  if (ck === 102) { key6 = false; };
  if (ck === 103) { key7 = false; };
  if (ck === 104) { key8 = false; };
  if (ck === 105) { key9 = false; };
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
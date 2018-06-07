// - global -------------------------------------------------------------------
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
var score = 0;
var world, world2;
var Music = false;
var invincible = false;
// - const --------------------------------------------------------------------
//Charactor
var C_color = 'rgba(255,255,255,1)';
var C_scolor = 'rgba(255,0,0,0.8)';
var C_s2color = 'rgba(255,209,42,1)';
var C_smaxcount = 10000;
var C_hp = 10;
var C_sabhp = 5;
var C_attack = 5;
var C_defence = 3;
var C_speed = 3;
var C_outsize = 0;
var C_hpgage = 80;
var C_sabhpgagecolor = 'rgba(52,87,119,1)';
var C_worldx, C_worldy;
var keyspace = undefined;
var C_shot0v = {
  x: undefined,
  y: undefined
};
var C_shot1v = {
  x: undefined,
  y: undefined
};
var C_shot2v = {
  x: undefined,
  y: undefined
};
//Charactor sab
var CS_color = 'rgba(0,0,0,1)';
var CS_1 = {
  x: undefined,
  y: undefined
};
var CS_2 = {
  x: undefined,
  y: undefined
};
var CS_3 = {
  x: undefined,
  y: undefined
};
var CS_4 = {
  x: undefined,
  y: undefined
};
var CS_late = {
  x: undefined,
  y: undefined
};
var CS_size;
var CS_far = 20;
//Enemy
var E_color = 'rgba(10, 100, 230, 0.6)';
var E_scolor = 'rgba(0, 50, 255, 1)';
var E_maxcount = 100;
var E_smaxcount = 1000;
var E_attack = 3;
var E_defence = 1;
//boss
var B_hp = 200;
var B_sabhp = 4;
var B_maxcount = 4;
var B_color = 'rgba(35, 71, 130,0.8)';
var B_scolor = 'rgba(255,255,0,1)';
var B_smaxcount = 10000;
var B_attack = 5;
var B_defence = 3;
//Size---------------------
var width, height;
//Key---------------------
var up, down, right, left, not;
var key0, key1, key2, key3, key4, key5, key6, key7, key8, key9, keyplus, keyminus;
var keyq = true;
var keya, keyd, keyw, keys, keyf, keyshift, keyctrl;
//Cheat----------------------
var CC_pass = false;
var CC_passc = undefined;
var fCC_12 = false;
var fCC_23 = false;
var fCC_45 = false;
var fCC_56 = false;
var fCC_89 = true;
var fCC_78 = 1;
var L_main = 1;
//Skill----------------------
var S_point = 0;
var S_bmaxcount = 120;
var S_bfar = 60 * world;
var S_bcolor = 'rgba(139,69,19,1)';
//Sytem-*--------------------
var charactor, enemy, boss, bossCount, C_shot, E_shot, B_shot;
var log = () => 0;
var isLogEnable = true;
var fontsize = 50;
// - main ---------------------------------------------------------------------
window.onload = function () {
  if (isLogEnable)
    log = setLogger(document.getElementById("log"), 100, false);
  else document.getElementById("log").remove();
  var img = new Image();
  img.src = "back9.bmp";
  var a, b, c, d, e, f, g, h, /*i,j*/ k;
  var p = new Point(); {
    width = document.documentElement.clientWidth - 2;
    height = document.documentElement.clientHeight - 2;
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
  // - キャラクター用インスタンス--------------------------
  charactor = new Character();
  charactor.init(10);

  enemy = new Array(E_maxcount);
  for (a = 0; a < E_maxcount; a++)
    enemy[a] = new Enemy();

  boss = new Array(B_maxcount);
  for (b = 0; b < B_maxcount; b++)
    boss[b] = new Boss();
  // - ショット用インスタンス-------------------------------  
  bossCount = 0;

  C_shot0 = new Array(C_smaxcount);
  for (c = 0; c < C_shot0.length; c++)
    C_shot0[c] = new CharaShot0();

  C_shot1 = new Array(C_smaxcount);
  for (g = 0; g < C_shot1.length; g++)
    C_shot1[g] = new CharaShot1();

  C_shot2 = new Array(C_smaxcount);
  for (h = 0; h < C_shot2.length; h++)
    C_shot2[h] = new CharaShot2();

  E_shot = new Array(E_smaxcount);
  for (d = 0; d < E_shot.length; d++)
    E_shot[d] = new EnemyShot();

  B_shot = new Array(B_smaxcount);
  for (e = 0; e < B_shot.length; e++)
    B_shot[e] = new BossShot();
  //S_build----------------------------------------------    
  S_build = new Array(S_bmaxcount);
  for (k = 0; k < S_build.length; k++)
    S_build[k] = new Skillbuild();
  //Main------------------------------------------------------------------------------------------------------------------------
  var slowCount = 0;
  charactor.position.x = screenCanvas.width / 2;
  charactor.position.y = screenCanvas.height / 5 * 4;
  /* if (screenCanvas.width <= 762.5 * screenCanvas.height / 1364) {
     world = screenCanvas.height / 762.5;
     world2 = screenCanvas.height / 1364 * 2;
   } else {
     world = screenCanvas.height / 762.5;
     world2 = screenCanvas.height / 762.5;
   } //1364:762.5==w:h 1364*h==762.5*w 1364:762.5==h:w 1364*w==762.5*h w==762.5*h/1364 */

  //sytem main-----------------------------------------------------------------
  isLogEnable = false;
  CC_pass = true;
  fCC_78 = 2;
  S_point = 119;
  //function---------------------------------------------------------------------------------------
  (function () {
    if (isLogEnable) document.getElementById("log").classList.remove("hide");
    else document.getElementById("log").classList.add("hide");
    window.onresize = resize(screenCanvas, charactor);
    //slowCount++;
    //sytem main---------------------------------------------------------------
    ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = .6; //944,1336
    if (screenCanvas.height >= screenCanvas.width * 1336 / 944) {
      ctx.drawImage(img, 0, 0, screenCanvas.height * 944 / 1336, screenCanvas.height); //944:1336=x:sch  1336*x=944*sch  x=944*sch/1336
    } else {
      ctx.drawImage(img, 0, 0, screenCanvas.width, screenCanvas.width * 1336 / 944); //944:1336=scw:y  944*y=1336*scw  y=scw*1336/944
    }
    ctx.globalAlpha = 1;
    counter++;
    changecolor();
    S_builddraw();
    status(score);
    C_hpdraw(C_sabhp);
    C_sdraw();
    C_draw(charactor);
    CS_draw(CS_1, CS_2, CS_3, CS_4);
    //Cheat---------------------------------------------------------- 
    if (fCC_12) {
      CC_12();
    };
    if (fCC_23) {
      CC_23();
    };
    if (fCC_45) {
      CC_45();
    };
    if (fCC_56) {
      CC_56();
    };
    if (CC_pass) {
      if (L_main == 1) {
        log.setGroup("main")
      } else if (L_main == 2) {
        log.setGroup("main2")
      } else if (L_main == 3) {
        log.setGroup("main3")
      };
      ctx.fillStyle = 'rgba(0,0,0,1)';
      fontsize = 40;
      ctx.beginPath();
      ctx.textAlign = "right";
      ctx.font = fontsize * world2 + "px 'Rounded Mplus 1c', 'Open Sans', 'Noto Sans Japanese', 'Yu Gothic', 'Meiryo UI', sans-serif";
      ctx.fillText("CC_78 : " + fCC_78, screenCanvas.width - ((fontsize - fontsize / 3) * world2), (fontsize * 1 + 0) * world2);
      ctx.fillText("Hp : " + C_hp, screenCanvas.width - ((fontsize - fontsize / 3) * world2), (fontsize * 2 + 2) * world2);
      ctx.fillText("sHp : " + C_sabhp, screenCanvas.width - ((fontsize - fontsize / 3) * world2), (fontsize * 3 + 4) * world2);
      ctx.fillText("S_p : " + S_point, screenCanvas.width - ((fontsize - fontsize / 3) * world2), (fontsize * 4 + 6) * world2);
      ctx.fillText("At : " + C_attack, screenCanvas.width - ((fontsize - fontsize / 3) * world2), (fontsize * 5 + 8) * world2);
      ctx.fillText("Df : " + C_defence, screenCanvas.width - ((fontsize - fontsize / 3) * world2), (fontsize * 6 + 10) * world2);
      ctx.fillText("Sp : " + score, screenCanvas.width - ((fontsize - fontsize / 3) * world2), (fontsize * 7 + 12) * world2);
      ctx.closePath();
    }
    //if (!slow || slowCount % 5 == 0) {
    //Game main----------------------------------------------------------------
    //charactor------------------------------------------------------
    if (!keyctrl && keyshift) {
      C_speed = 1.5;
      C_color = 'rgba(76,76,76,0.5)'
    } else {
      C_speed = 3;
      C_color = 'rgba(255,255,255,1)';
    };
    if (charactor.position.y >= 0 && up) {
      charactor.position.y -= C_speed * world;
    };
    if (charactor.position.y <= screenCanvas.height && down) {
      charactor.position.y += C_speed * world;
    };
    if (charactor.position.x <= screenCanvas.width && right) {
      charactor.position.x += C_speed * world;
    };
    if (charactor.position.x >= 0 && left) {
      charactor.position.x -= C_speed * world;
    };
    if (CS_late.x == undefined) {
      CS_late.x = charactor.position.x;
      CS_late.y = charactor.position.y;
    } else {
      if (B_sabhp >= 3) {
        CS_late.x = (charactor.position.x * 0.3 + CS_late.x * 0.7);
        CS_late.y = (charactor.position.y * 0.3 + CS_late.y * 0.7);
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
    if (keyspace) {
      CS_far = 35 * world;
    } else {
      CS_far = 25 * world;
    };
    if (C_sabhp > 2) {
      C_shot0v = {
        x: 0 * world,
        y: -1 * world
      };
      C_shot1v = {
        x: 0 * world,
        y: -1 * world
      };
      C_shot2v = {
        x: 0 * world,
        y: -1 * world
      };
      if (keyw) {
        C_shot1v = {
          x: -0.05 * world,
          y: -0.7 * world
        };
        C_shot2v = {
          x: 0.05 * world,
          y: -0.7 * world
        };
      } else if (keys) {
        C_shot1v = {
          x: 0.1 * world,
          y: -0.7 * world
        };
        C_shot2v = {
          x: -0.1 * world,
          y: -0.7 * world
        };
      }
    };
    if (keyspace) {
      if (C_sabhp > 2) {
        if (counter % 15 == 0) {
          let Vectors = [{
            x: C_shot0v.x,
            y: C_shot0v.y,
            size: 4 * world,
            speed: 8 * world
          }];
          let vectorCounter = 0;
          for (c = 0; c < C_smaxcount; c++) {
            if (!C_shot0[c].alive) {
              C_shot0[c].set(charactor.position, Vectors[vectorCounter], Vectors[vectorCounter].size || 5 * world, Vectors[vectorCounter].speed || 3 * world);
              vectorCounter++;
              if (vectorCounter >= Vectors.length) break;
            }
          }
          //console.log("a");            
        }
        if (counter % 15 == 0) {
          let Vectors = [{
            x: C_shot1v.x,
            y: C_shot1v.y,
            size: 2.5 * world,
            speed: 8 * world
          }];
          let vectorCounter = 0;
          for (g = 0; g < C_smaxcount; g++) {
            if (!C_shot1[g].alive) {
              C_shot1[g].set(CS_1, Vectors[vectorCounter], Vectors[vectorCounter].size || 5 * world, Vectors[vectorCounter].speed || 3 * world);
              vectorCounter++;
              if (vectorCounter >= Vectors.length) break;
            }
          }
          //console.log("a");            
        }
        if (counter % 15 == 0) {
          let Vectors = [{
            x: C_shot2v.x,
            y: C_shot2v.y,
            size: 2.5 * world,
            speed: 8 * world
          }];
          let vectorCounter = 0;
          for (h = 0; h < C_smaxcount; h++) {
            if (!C_shot2[h].alive) {
              C_shot2[h].set(CS_2, Vectors[vectorCounter], Vectors[vectorCounter].size || 5 * world, Vectors[vectorCounter].speed || 3 * world);
              vectorCounter++;
              if (vectorCounter >= Vectors.length) break;
            }
          }
          //console.log("a");            
        }
      }
    };
    //enemy----------------------------------------------------------
    //Boss-----------------------------------------------------------
    //Skill----------------------------------------------------------
    //End main-----------------------------------------------------------------
    if (C_sabhp <= 0) ShowGameover("score : " + score);
    else requestAnimationFrame(arguments.callee);
    if (B_sabhp <= 0) ShowClear("GAME CLEAR\nscore || " + score);
    // };
    // console.log(CC_passc);
  })();
};
//Function---------------------------------------------------------------------
function resize(screenCanvas, charactor) {
  if (screenCanvas.width <= 762.5 * screenCanvas.height / 1364) {
    world = screenCanvas.height / 762.5;
    world2 = screenCanvas.height / 1364 * 2;
  } else {
    world = screenCanvas.height / 762.5;
    world2 = screenCanvas.height / 762.5;
  } //1364:762.5==w:h 1364*h==762.5*w 1364:762.5==h:w 1364*w==762.5*h w==762.5*h/1364 

  C_worldx = charactor.position.x / screenCanvas.width;
  C_worldy = charactor.position.y / screenCanvas.height;

  if (fCC_89) {
    width = document.documentElement.clientWidth - 2;
    height = document.documentElement.clientHeight - 2;
  } else { //w:h==1364:762  1364*h==762*w
    if (1364 * (document.documentElement.clientHeight - 2) >= 762.5 * (document.documentElement.clientWidth - 2)) {
      width = document.documentElement.clientWidth - 2;
      height = 762.5 * (document.documentElement.clientWidth) / 1364; //1364*h==762*w 1364*h==762*E h==762*E/1364
    } else {
      width = 1364 * (document.documentElement.clientHeight - 2) / 762.5; //1364*h==762*w 1364*E==762*w 1364*E/762==w
      height = document.documentElement.clientHeight - 2;
    }
  }
  screenCanvas.width = width;
  screenCanvas.height = height;

  charactor.position.x = screenCanvas.width * C_worldx;
  charactor.position.y = screenCanvas.height * C_worldy;

  C_outsize = 10 * world;
  C_outsize = 10 * world; //1477:c=1364:10    c*1364=1477*10  C=1477*10/1364
  charactor.size = C_outsize / 10 * 4;
  CS_size = C_outsize / 2;
  C_speed = 3;
  //charactor.position.x = charactor.position.x/screencanvas.width
  //charactor.position.y = charactor.position.y * world;  
};

function changecolor() {
  if (CC_pass) {
    C_sabhpgagecolor = 'rgba(255,0,0,1)';
  } else {
    C_sabhpgagecolor = 'rgba(16,87,121,1)';
  };
}

function CC_23() {
  isLogEnable = true;
  if (L_main == 1) {
    log("main", screenCanvas.width, screenCanvas.height);
  } else if (L_main == 2) {
    // log("main2", fCC_78 + " : CC_78", C_hp + " : HP", C_sabhp + " : sHP",S_point+" : S_p", C_attack + " : At", C_defence + " : Df", C_speed + " : Sp");
  };
};

function C_draw(charactor) {
  ctx.beginPath();
  ctx.arc(charactor.position.x, charactor.position.y, C_outsize, 0, Math.PI * 2, false)
  ctx.closePath();
  ctx.fillStyle = C_color;
  ctx.fill();
  ctx.strokeStyle = CS_color;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(charactor.position.x, charactor.position.y, charactor.size, 0, Math.PI * 2, false)
  ctx.closePath();
  ctx.fillStyle = CS_color;
  ctx.fill();
}

function CS_draw(CS_1, CS_2, CS_3, CS_4) {
  ctx.beginPath();
  ctx.arc(CS_1.x, CS_1.y, CS_size, 0, Math.PI * 2, false)
  ctx.moveTo(CS_2.x, CS_2.y);
  ctx.arc(CS_2.x, CS_2.y, CS_size, 0, Math.PI * 2, false)
  ctx.moveTo(CS_3.x, CS_3.y);
  ctx.arc(CS_3.x, CS_3.y, CS_size, 0, Math.PI * 2, false)
  ctx.moveTo(CS_4.x, CS_4.y);
  ctx.arc(CS_4.x, CS_4.y, CS_size, 0, Math.PI * 2, false)
  ctx.closePath();
  ctx.strokeStyle = CS_color;
  ctx.stroke();
  ctx.fillStyle = CS_color;
  ctx.fill();
}

function C_sdraw() {
  ctx.fillStyle = C_s2color;
  ctx.beginPath();
  for (g = 0; g < C_smaxcount; g++) {
    if (C_shot1[g].alive) {
      C_shot1[g].move();
      ctx.arc(
        C_shot1[g].position.x,
        C_shot1[g].position.y,
        C_shot1[g].size,
        0, Math.PI * 2, false
      );
      ctx.closePath();
    }
  }
  for (h = 0; h < C_smaxcount; h++) {
    if (C_shot2[h].alive) {
      C_shot2[h].move();
      ctx.arc(
        C_shot2[h].position.x,
        C_shot2[h].position.y,
        C_shot2[h].size,
        0, Math.PI * 2, false
      );
      ctx.closePath();
    }
  }
  ctx.fill();

  ctx.fillStyle = C_scolor;
  ctx.beginPath();
  for (c = 0; c < C_smaxcount; c++) {
    if (C_shot0[c].alive) {
      C_shot0[c].move();
      ctx.arc(
        C_shot0[c].position.x,
        C_shot0[c].position.y,
        C_shot0[c].size,
        0, Math.PI * 2, false
      );
      ctx.closePath();
    }
  }
  ctx.fill();
}

function S_builddraw() {
  ctx.beginPath();
  ctx.fillStyle = S_bcolor;
  for (k = 0; k < S_bmaxcount; k++) {
    if (S_build[k].alive) {
      //S_build[k].move();
      // translate, rotateなどの操作は、最後に指定したものから順番に実行されていくらしい。
      ctx.save();
      ctx.translate(S_build[k].position.x, S_build[k].position.y); // 3. 1で原点に移動された時期位置を本来の時期位置へ平行移動
      ctx.rotate(0 + (S_build[k].place == 1 ? 0 : 0) + (S_build[k].place == 2 ? 180 * Math.PI / 180 : 0) + (S_build[k].place == 4 ? 270 * Math.PI / 180 : 0) + (S_build[k].place == 8 ? 90 * Math.PI / 180 : 0) +
        (S_build[k].place == 5 ? 315 * Math.PI / 180 : 0) + (S_build[k].place == 6 ? 225 * Math.PI / 180 : 0) + (S_build[k].place == 9 ? 45 * Math.PI / 180 : 0) + (S_build[k].place == 10 ? 135 * Math.PI / 180 : 0)); // 2. 原点を中心として回転
      ctx.translate(-S_build[k].position.x, -S_build[k].position.y); // 1. 自機位置が原点になるように平行移動
      ctx.fillRect(
        S_build[k].position.x - S_build[k].size / 2,
        S_build[k].position.y - charactor.size,
        S_build[k].size,
        charactor.size * 2
      );
      ctx.rotate(0 + (S_build[k].place == 1 ? -0 : 0) + (S_build[k].place == 2 ? -180 * Math.PI / 180 : 0) + (S_build[k].place == 4 ? -270 * Math.PI / 180 : 0) + (S_build[k].place == 8 ? -90 * Math.PI / 180 : 0) +
        (S_build[k].place == 5 ? -315 * Math.PI / 180 : 0) + (S_build[k].place == 6 ? -225 * Math.PI / 180 : 0) + (S_build[k].place == 9 ? -45 * Math.PI / 180 : 0) + (S_build[k].place == 10 ? -135 * Math.PI / 180 : 0)); // 
      /*
      ctx.arc(
        S_build[k].position.x,
        S_build[k].position.y,
        S_build[k].size,
        0, Math.PI * 2, false
      );
      ctx.fill();*/
      ctx.closePath();
      ctx.restore();
    }
  }
}

function C_hpdraw(C_sabhp) {
  if (keyq) {
    ctx.globalAlpha = 1;
  } else {
    ctx.globalAlpha = .2;
  }
  ctx.beginPath();
  ctx.arc(screenCanvas.width - (C_hpgage * 1.5) * world2, screenCanvas.height - (C_hpgage + fontsize * 1.5) * world2, (C_hpgage + 2) * world2, 0, 360 * (Math.PI / 180), false);
  ctx.closePath();
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fill();
  ctx.lineWidth = 4 * world2;
  ctx.strokeStyle = 'rgba(255,255,255,1)';
  ctx.stroke();


  ctx.beginPath();
  ctx.arc(screenCanvas.width - (C_hpgage * 1.5) * world2, screenCanvas.height - (C_hpgage + fontsize * 1.5) * world2, (C_hpgage - 5) * world2, -90 * (Math.PI / 180), ((360 * C_hp / 10) - 90) * (Math.PI / 180), false);
  ctx.lineWidth = 10 * world2;
  ctx.strokeStyle = CS_color;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(screenCanvas.width - (C_hpgage * 1.5) * world2, screenCanvas.height - (C_hpgage + fontsize * 1.5) * world2, (C_hpgage - 15) * world2, -90 * (Math.PI / 180), ((360 * C_sabhp / 5) - 90) * (Math.PI / 180), false);
  ctx.strokeStyle = C_sabhpgagecolor;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(screenCanvas.width - (C_hpgage * 1.5) * world2, screenCanvas.height - (C_hpgage + fontsize * 1.5) * world2, (C_hpgage - 25) * world2, -90 * (Math.PI / 180), (360 * (S_point % 20) / 20 - 90) * (Math.PI / 180), false);
  ctx.strokeStyle = 'rgba(196, 136, 71,1)';
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(screenCanvas.width - (C_hpgage * 1.5) * world2, screenCanvas.height - (C_hpgage + fontsize * 1.5) * world2, (C_hpgage - 35) * world2, -90 * (Math.PI / 180), (360 * Math.floor(S_point / 20) / 5 - 90) * (Math.PI / 180), false);
  ctx.stroke();
  ctx.lineWidth = 1 * world2;

  ctx.beginPath();
  ctx.arc(screenCanvas.width - (C_hpgage * 1.5) * world2, screenCanvas.height - (C_hpgage + fontsize * 1.5) * world2, (C_hpgage - 00) * world2, -90 * (Math.PI / 180), 270 * (Math.PI / 180), false);
  ctx.arc(screenCanvas.width - (C_hpgage * 1.5) * world2, screenCanvas.height - (C_hpgage + fontsize * 1.5) * world2, (C_hpgage - 10) * world2, -90 * (Math.PI / 180), 270 * (Math.PI / 180), false);
  ctx.arc(screenCanvas.width - (C_hpgage * 1.5) * world2, screenCanvas.height - (C_hpgage + fontsize * 1.5) * world2, (C_hpgage - 20) * world2, -90 * (Math.PI / 180), 270 * (Math.PI / 180), false);
  ctx.arc(screenCanvas.width - (C_hpgage * 1.5) * world2, screenCanvas.height - (C_hpgage + fontsize * 1.5) * world2, (C_hpgage - 30) * world2, -90 * (Math.PI / 180), 270 * (Math.PI / 180), false);
  ctx.arc(screenCanvas.width - (C_hpgage * 1.5) * world2, screenCanvas.height - (C_hpgage + fontsize * 1.5) * world2, (C_hpgage - 40) * world2, -90 * (Math.PI / 180), 270 * (Math.PI / 180), false);
  ctx.closePath();
  ctx.strokeStyle = 'rgba(255,255,255,1)';
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(screenCanvas.width - (C_hpgage * 1.5) * world2, screenCanvas.height - (C_hpgage + fontsize * 1.5) * world2);
  ctx.arc(screenCanvas.width - (C_hpgage * 1.5) * world2, screenCanvas.height - (C_hpgage + fontsize * 1.5) * world2, (C_hpgage - 40) * world2, -90 * (Math.PI / 180), ((360 * C_hp / 10) - 90) * (Math.PI / 180), false);
  ctx.moveTo(screenCanvas.width - (C_hpgage * 1.5) * world2, screenCanvas.height - (C_hpgage + fontsize * 1.5) * world2);
  ctx.closePath();
  ctx.fillStyle = C_color;
  ctx.fill();

  ctx.globalAlpha = 1;
  /*
  if (CC_pass) {
    ctx.arc(screenCanvas.width - (C_hpgage * 1.5) * world2, screenCanvas.height - (C_hpgage + fontsize * 1.5) * world2, (C_hpgage - 10) * world2, ((360 * (fCC_78 - 1) / 3) - 90) * (Math.PI / 180), ((360 * fCC_78 / 3) - 90) * (Math.PI / 180), false);
  } else {
    ctx.arc(screenCanvas.width - (C_hpgage * 1.5) * world2, screenCanvas.height - (C_hpgage + fontsize * 1.5) * world2, (C_hpgage - 10) * world2, 0, 360 * (Math.PI / 180), false);
  } 
  */
}

function status(score) {
  fontsize = 50;
  ctx.fillStyle = 'rgba(0,0,0,1)';
  ctx.beginPath();
  ctx.textAlign = "right";
  ctx.font = fontsize * world2 + "px 'Rounded Mplus 1c', 'Open Sans', 'Noto Sans Japanese', 'Yu Gothic', 'Meiryo UI', sans-serif";
  ctx.fillText("Score : " + score, screenCanvas.width - (fontsize / 3) * world2 /*- fontsize * world2 * ((String(score).length + 8) / 2)*/ , screenCanvas.height - (fontsize / 3) * world2);
  ctx.closePath();
}

function mouseMove(event) {
  mouse.x = event.clientX - screenCanvas.offsetLeft;
  mouse.y = event.clientY - screenCanvas.offsetTop;
}
//---------------------------------------------------------------------------------------
function keyDown(event, i, S_bfar) {
  var ck = event.keyCode;
  if (L_main == 3) {
    log("main3", "C K = " + ck);
  }
  //console.log(ck);

  if (ck === 16) {
    keyshift = true;
  };
  if (ck === 17) {
    keyctrl = true;
  }
  if (ck === 32) {
    keyspace = true;
  };
  if (ck === 27) {
    fCC_89 = !fCC_89 ? true : false
  }
  if (ck === 37) {
    if (fCC_78 == 1) {
      left = true;
    };
  };
  if (ck === 38) {
    if (fCC_78 == 1) {
      up = true;
    };
  };
  if (ck === 39) {
    if (fCC_78 == 1) {
      right = true;
    };
  };
  if (ck === 40) {
    if (fCC_78 == 1) {
      down = true;
    };
  };

  if (ck === 29) {
    not = true;
    CC_passc = 0;
    setTimeout(function () {
      CC_passc = undefined;
    }, 3000);
    CC_pass = false;
  };
  if (ck === 96) {
    key0 = true;
  };
  if (ck === 97) {
    key1 = true;
  };
  if (ck === 98) {
    key2 = true;
  };
  if (ck === 99) {
    key3 = true;
  };
  if (ck === 100) {
    key4 = true;
  };
  if (ck === 101) {
    key5 = true;
  };
  if (ck === 102) {
    key6 = true;
  };
  if (ck === 103) {
    key7 = true;
  };
  if (ck === 104) {
    key8 = true;
  };
  if (ck === 105) {
    key9 = true;
  };
  if (ck === (fCC_78 != 2 ? 81 : 80)) {
    keyq = !keyq ? true : false
  };
  if (ck === 87) {
    if (fCC_78 == 2) {
      up = true;
    } else {
      keyw = true;
    };
  };
  if (ck === 83) {
    if (fCC_78 == 2) {
      down = true;
    } else {
      keys = true;
    };
  };
  if (ck === 65) {
    if (fCC_78 == 2) {
      left = true;
    } else {
      keya = true;
    };
  };
  if (ck === 68) {
    if (fCC_78 == 2) {
      right = true;
    } else {
      keyd = true;
    };
  };
  if (ck === 79) {
    if (fCC_78 == 3) {
      up = true;
    } else {
      keyw = true;
    };
  };
  if (ck === 75) {
    if (fCC_78 == 3) {
      left = true;
    } else {
      keya = true;
    };
  };
  if (ck === 76) {
    if (fCC_78 == 3) {
      down = true;
    } else {
      keys = true;
    };
  };
  if (ck === 59 || ck === 187) {
    if (fCC_78 == 3) {
      right = true;
    } else {
      keyd = true;
    };
  };
  if (ck === 70) {
    if (fCC_78 != 2) {
      keyf = true;
    };
  };
  if (ck === 74) {
    if (fCC_78 == 2) {
      keyf = true;
    };
  };

  if (ck == 107) {
    L_main = (fCC_23 && (L_main == 3 ? 1 : L_main + 1));
  };
  if (ck === 109) {
    L_main = (fCC_23 && (L_main == 1 ? L_main = 3 : L_main -= 1));
  };
  if (!CC_pass) {
    fCC_23 = false;
    isLogEnable = false;
  };
  //Skillbuild---------------------------------------------
  if (event.repeat == false) {
    if (ck === 70 && fCC_78 != 2 || ck == 74 && fCC_78) {
      if (C_sabhp > 0) {
        for (k = 0; k < S_bmaxcount; k++) {
          if (!S_build[k].alive) {
            /*a = boss[b].position.distance(chara.position);
            a.normalize();*/
            let Vectors = [{
              x: 0,
              y: 0,
              size: 80,
              speed: 0
            }];
            let vectorCounter = 0;
            if (up || down || right || left) {
              S_bfar = 50 * world;
              S_build[k].set({
                  x: charactor.position.x + (right ? S_bfar : 0) + (left ? -S_bfar : 0),
                  y: charactor.position.y + (up ? -S_bfar : 0) + (down ? S_bfar : 0)
                }, Vectors[vectorCounter], Vectors[vectorCounter].size || 5, Vectors[vectorCounter].speed || 3,
                0 + (up ? 1 : 0) + (down ? 2 : 0) + (left ? 4 : 0) + (right ? 8 : 0));
            }
            vectorCounter++;
            // console.log(vectorCounter,bossShot[l]);
            console.log(k, S_build[k].place, S_build[k].position.x, charactor.position.x);
            break;
          };
        }
      }
    }
  }
  //cheat------------------------------------------------------------------------------------------
  if (not) {
    if (CC_passc == 0) {
      if (key0) {
        CC_passc = 3;
      };
    };
    if (CC_passc == 3) {
      if (key3) {
        CC_passc = 1;
      };
    };
    if (CC_passc == 1) {
      if (key1) {
        CC_passc = 8;
      };
    };
    if (CC_passc == 8) {
      if (key8) {
        CC_pass = true;
      };
    };
  };
  if (CC_pass) {
    if (key1 && key2) {
      if (!fCC_12) {
        fCC_12 = true;
      } else {
        fCC_12 = false;
      };
    };
    if (key2 && key3) {
      if (!fCC_23) {
        fCC_23 = true;
      } else {
        fCC_23 = false;
        isLogEnable = false;
      };
    };
    if (key4 && key5) {
      if (!CC_45) {
        fCC_45 = true;
      } else {
        fCC_45 = false;
      };
    };
    if (key5 && key6) {
      if (!fCC_56) {
        fCC_56 = true;
      } else {
        fCC_56 = false;
      };
    };
    if (key7 && key8) {
      if (fCC_78 == 3) {
        fCC_78 = 1;
      } else if (fCC_78 == 1) {
        fCC_78 = 2;
      } else {
        fCC_78 = 3
      }
      up = false;
      down = false;
      right = false;
      left = false;
      keya = false;
      keyw = false;
      keys = false;
      keyd = false;
      keyshift = false;
      keyf = false;
    };
    if (key8 && key9) {
      if (!fCC_89) {
        fCC_89 = true;
      } else {
        fCC_89 = false;
      };
    };
  };
}
//---------------------------------------------------------------------------------------
function keyUp(event) {
  var ck = event.keyCode;
  if (ck === 16) {
    keyshift = false;
  };
  if (ck === 17) {
    keyctrl = false;
  }
  if (ck === 32) {
    keyspace = false;
  };

  if (ck === 37) {
    if (fCC_78 == 1) {
      left = false;
    };
  };
  if (ck === 38) {
    if (fCC_78 == 1) {
      up = false;
    };
  };
  if (ck === 39) {
    if (fCC_78 == 1) {
      right = false;
    };
  };
  if (ck === 40) {
    if (fCC_78 == 1) {
      down = false;
    };
  };
  if (ck === 29) {
    not = false;
    CC_passc = undefined;
  };
  if (ck === 70) {
    if (fCC_78 != 2) {
      keyf = false;
    };
  };
  if (ck === 74) {
    if (fCC_78 == 2) {
      keyf = false;
    };
  };
  if (ck === 96) {
    key0 = false;
  };
  if (ck === 97) {
    key1 = false;
  };
  if (ck === 98) {
    key2 = false;
  };
  if (ck === 99) {
    key3 = false;
  };
  if (ck === 100) {
    key4 = false;
  };
  if (ck === 101) {
    key5 = false;
  };
  if (ck === 102) {
    key6 = false;
  };
  if (ck === 103) {
    key7 = false;
  };
  if (ck === 104) {
    key8 = false;
  };
  if (ck === 105) {
    key9 = false;
  };

  if (ck === 87) {
    if (fCC_78 == 2) {
      up = false;
    } else {
      keyw = false;
    };
  };
  if (ck === 83) {
    if (fCC_78 == 2) {
      down = false;
    } else {
      keys = false;
    };
  };
  if (ck === 65) {
    if (fCC_78 == 2) {
      left = false;
    } else {
      keya = false;
    };
  };
  if (ck === 68) {
    if (fCC_78 == 2) {
      right = false;
    } else {
      keyd = false;
    };
  };
  if (ck === 79) {
    if (fCC_78 == 3) {
      up = false;
    } else {
      keyw = false;
    };
  };
  if (ck === 75) {
    if (fCC_78 == 3) {
      left = false;
    } else {
      keya = false;
    };
  };
  if (ck === 76) {
    if (fCC_78 == 3) {
      down = false;
    } else {
      keys = false;
    };
  };
  if (ck === 59 || ck === 187) {
    if (fCC_78 == 3) {
      right = false;
    } else {
      keyd = false;
    };
  };
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
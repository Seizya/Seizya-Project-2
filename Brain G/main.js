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
var world;
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
var C_speed;
var C_outsize = 0;
var C_hpgage = 70;
var C_sabhpgagecolor = 'rgba(52,87,119,1)';
var C_worldx, C_worldy;
var keyspace = false;
var C_shot0v = { x: undefined, y: undefined };
var C_shot1v = { x: undefined, y: undefined };
var C_shot2v = { x: undefined, y: undefined };
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
var E_attack = 1;
var E_defence = 1;
//boss
var B_hp = 200;
var B_sabhp = 4;
var B_maxcount = 4;
var B_color = 'rgba(35, 71, 130,0.8)';
var B_scolor = 'rgba(255,255,0,1)';
var B_smaxcount = 10000;
//Size---------------------
var width, height;
//Key---------------------
var up, down, right, left, not;
var key0, key1, key2, key3, key4, key5, key6, key7, key8, key9, keyplus, keyminus;
var keyq = true;
var keyw, keys, keyshift;
//Cheat----------------------
var CC_pass = false;
var CC_passc = undefined;
var fCC_12 = false;
var fCC_23 = false;
var fCC_45 = false;
var fCC_56 = false;
var fCC_78 = false;
var fCC_89 = false;
var L_main = 1;
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
  var a, b, c, d, e, f, g, h;
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
  // - キャラクター用インスタンス-------------------------------
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
  //Main------------------------------------------------------------------------------------------------------------------------
  var slowCount = 0;
  charactor.position.x = screenCanvas.width / 2;
  charactor.position.y = screenCanvas.height / 5 * 4;
  if (screenCanvas.height < screenCanvas.width) {
    world = screenCanvas.height / 762.5;
  } else {
    world = screenCanvas.width / 1364
  };
  //sytem main-----------------------------------------------------------------
  isLogEnable = false;
  CC_pass = true;
  //function---------------------------------------------------------------------------------------
  (function () {
    if (isLogEnable) document.getElementById("log").classList.remove("hide");
    else document.getElementById("log").classList.add("hide");
    window.onresize = resize(screenCanvas, charactor);
    //slowCount++;
    //sytem main---------------------------------------------------------------
    ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = .6;//944,1336
    if (screenCanvas.height >= screenCanvas.width * 1336 / 944) {
      ctx.drawImage(img, 0, 0, screenCanvas.height * 944 / 1336, screenCanvas.height); //944:1336=x:sch  1336*x=944*sch  x=944*sch/1336
    } else {
      ctx.drawImage(img, 0, 0, screenCanvas.width, screenCanvas.width * 1336 / 944); //944:1336=scw:y  944*y=1336*scw  y=scw*1336/944
    }
    ctx.globalAlpha = 1;
    counter++;
    status(score);
    C_hpdraw(C_sabhp);
    changecolor(CC_pass);
    C_sdraw();
    C_draw(charactor);
    CS_draw(CS_1, CS_2, CS_3, CS_4);
    //Cheat----------------------------------------------------------
    if (not) {
      if (key0) {
        if (CC_passc == 0) {
          CC_passc = 3;
          setTimeout(function () {
            CC_passc = undefined;
          }, 4000);
        }
      };
      if (CC_passc == 3) {
        if (key3) {
          CC_passc = 1;
          setTimeout(function () {
            CC_passc = undefined;
          }, 3000);
        };
      };
      if (CC_passc == 1) {
        if (key1) {
          CC_passc = 8;
          setTimeout(function () {
            CC_passc = undefined;
          }, 2000);
        };
      };
      if (CC_passc == 8) {
        if (key8) {
          CC_pass = true;
          setTimeout(function () {
            CC_passc = undefined;
          }, 1000);
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
        if (!fCC_78) {
          fCC_78 = true;
        } else {
          fCC_78 = false;
        };
      };
      if (key8 && key9) {
        if (!fCC_89) {
          fCC_89 = true;
        } else {
          fCC_89 = false;
        };
      };
    };
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
    if (fCC_78) {
      CC_78();
    };
    if (fCC_89) {
      CC_89();
    };
    if (L_main == 1) {
      log.setGroup("main")
    } else if (L_main == 2) {
      log.setGroup("main2")
    } else if (L_main == 3) {
      log.setGroup("main3")
    };
    //if (!slow || slowCount % 5 == 0) {
    //Game main----------------------------------------------------------------
    //charactor------------------------------------------------------
    if (up) {
      charactor.position.y -= C_speed;
    };
    if (down) {
      charactor.position.y += C_speed;
    };
    if (right) {
      charactor.position.x += C_speed;
    };
    if (left) {
      charactor.position.x -= C_speed;
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
      C_shot0v = { x: 0 * world, y: -1 * world };
      C_shot1v = { x: 0 * world, y: -1 * world };
      C_shot2v = { x: 0 * world, y: -1 * world };
      if (keyw) {
        C_shot1v = { x: -0.05 * world, y: -0.7 * world };
        C_shot2v = { x: 0.05 * world, y: -0.7 * world };
      } else if (keys) {
        C_shot1v = { x: 0.1 * world, y: -0.7 * world };
        C_shot2v = { x: -0.1 * world, y: -0.7 * world };
      }
    }
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
    //End main-----------------------------------------------------------------
    if (C_sabhp <= 0) ShowGameover("score : " + score);
    else requestAnimationFrame(arguments.callee);
    if (B_sabhp <= 0) ShowClear("GAME CLEAR\nscore || " + score);
    // };
  })();
};
//Function---------------------------------------------------------------------
function resize(screenCanvas, charactor) {
  if (screenCanvas.height < screenCanvas.width) {
    world = screenCanvas.height / 762.5;
  } else {
    world = screenCanvas.width / 1364
  };
  C_worldx = charactor.position.x / screenCanvas.width;
  C_worldy = charactor.position.y / screenCanvas.height;

  width = document.documentElement.clientWidth - 2;
  height = document.documentElement.clientHeight - 2;
  screenCanvas.width = width;
  screenCanvas.height = height;

  charactor.position.x = screenCanvas.width * C_worldx;
  charactor.position.y = screenCanvas.height * C_worldy;

  C_outsize = 10 * world;
  C_outsize = 10 * world; //1477:c=1364:10    c*1364=1477*10  C=1477*10/1364
  charactor.size = C_outsize / 10 * 4;
  CS_size = C_outsize / 2;
  C_speed = 3 * world;
  //charactor.position.x = charactor.position.x/screencanvas.width
  //charactor.position.y = charactor.position.y * world;  
};

function changecolor(CC_passs) {
  if (CC_pass) {
    C_sabhpgagecolor = 'rgba(255,0,0,1)';
  } else { C_sabhpgagecolor = 'rgba(52,87,119,1)'; };
}

function CC_23() {
  isLogEnable = true;
  if (L_main == 1) {
    log.setGroup("main")
    log("main", screenCanvas.width, screenCanvas.height);
  } else if (L_main == 2) {
    log.setGroup("main2")
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

function C_hpdraw(C_sabhp) {
  if (keyq) {
    ctx.globalAlpha = 1;
  } else {
    ctx.globalAlpha = .1;
  }
  ctx.beginPath();
  ctx.moveTo(screenCanvas.width - (C_hpgage * 1.5) * world, screenCanvas.height - (C_hpgage + fontsize * 1.5) * world);
  ctx.arc(screenCanvas.width - (C_hpgage * 1.5) * world, screenCanvas.height - (C_hpgage + fontsize * 1.5) * world, (C_hpgage - 5) * world, -90 * (Math.PI / 180), (360 * C_hp / 10) * (Math.PI / 180) - 90 * (Math.PI / 180), false);
  ctx.moveTo(screenCanvas.width - (C_hpgage * 1.5) * world, screenCanvas.height - (C_hpgage + fontsize * 1.5) * world);
  ctx.closePath();
  ctx.fillStyle = C_color;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(screenCanvas.width - (C_hpgage * 1.5) * world, screenCanvas.height - (C_hpgage + fontsize * 1.5) * world, C_hpgage * world, -90 * (Math.PI / 180), (360 * C_sabhp / 5) * (Math.PI / 180) - 90 * (Math.PI / 180), false);
  ctx.lineWidth = 10 * world;
  ctx.strokeStyle = C_sabhpgagecolor;
  ctx.stroke();
  ctx.lineWidth = 1 * world;
  ctx.globalAlpha = 1;
}

function status(score) {
  ctx.fillStyle = 'rgba(0,0,0,1)';
  ctx.beginPath();
  ctx.textAlign = "right";
  ctx.font = fontsize * world + "px 'Rounded Mplus 1c', 'Open Sans', 'Noto Sans Japanese', 'Yu Gothic', 'Meiryo UI', sans-serif";
  ctx.fillText("Score : " + score, screenCanvas.width - (fontsize / 3) * world /*- fontsize * world * ((String(score).length + 8) / 2)*/, screenCanvas.height - (fontsize / 3) * world);
  ctx.closePath();
}

function mouseMove(event) {
  mouse.x = event.clientX - screenCanvas.offsetLeft;
  mouse.y = event.clientY - screenCanvas.offsetTop;
}

function keyDown(event) {
  var ck = event.keyCode;
  if (L_main == 3) {
    log("main3", "C K = " + ck);
  }
  //console.log(ck);

  if (ck === 32) { keyspace = true; };
  if (ck === 16) { keyshift = true; };
  if (ck === 37) {
    left = true;
  };
  if (ck === 38) {
    up = true;
  };
  if (ck === 39) {
    right = true;
  };
  if (ck === 40) {
    down = true;
  };

  if (ck === 29) {
    not = true;
    CC_passc = 0;
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
  if (ck === 81) {
    if (!keyq) {
      keyq = true;
    } else {
      keyq = false;
    };
  };
  if (ck === 87) { keyw = true; };
  if (ck === 83) { keys = true; };
  if (ck == 107) {
    if (fCC_23) {
      if (L_main == 3) {
        L_main = 1;
      } else {
        L_main += 1;
      };
    };
  };
  if (ck === 109) {
    if (fCC_23) {
      if (L_main == 1) {
        L_main = 3
      } else {
        L_main -= 1;
      }
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
}

function keyUp(event) {
  var ck = event.keyCode;
  if (ck === 32) { keyspace = false; };
  if (ck === 16) { keyshift = false; };
  if (ck === 37) {
    left = false;
  };
  if (ck === 38) {
    up = false;
  };
  if (ck === 39) {
    right = false;
  };
  if (ck === 40) {
    down = false;
  };

  if (ck === 29) {
    not = false;
    CC_passc = undefined;
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
  if (ck === 87) { keyw = false; };
  if (ck === 83) { keys = false; };
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
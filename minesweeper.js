<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <script type="text/javascript">

  window.onload = function(){

 
      document.getElementById("start_draw").onclick = function(){
      init();
    };

    document.getElementById("seleArea").onchange = function () {
      Common.WIDTH = this.value;
      Common.HEIGHT = this.value;
      init();
    };
   
    document.getElementById("selSize").onchange = function () {
      Common.TABLE_WIDTH = this.value;
      Common.TBALE_HEIGHT = this.value;
      init();
    };

    document.getElementById("selCount").onchange = function () {
      Common.BOOMACOUNT = this.value;
      init();
    };
}

  var Common = new function () {
    this.ARRAY= [];
    this.WIDTH =20;
    this.HEIGHT = 20;
    this.TABLE_WIDTH = 20;
    this.TBALE_HEIGHT = 20;
    this.BOOMACOUNT = 30;
    this.BOOMARROUNDCOUNT=0;
  };

  function init(){
    Common.ARRAY = makeArray(Common.WIDTH, Common.HEIGHT);
    var BOOMEARA = [];
    BOOMEARA = initBOOM(Common.ARRAY,Common.BOOMACOUNT);
    console.log("初始化Eare："+BOOMEARA);
    document.getElementById('game_area').innerHTML =  makeTable(Common.ARRAY);
  }

  function initBOOM( arr, num) {
    for (var i = 0; i < num; i++) {
      var area = makeRandomBoom(arr);
      console.log("初始化雷区:"+area);
      if( "a" == arr[ area[0] ][ area[1] ] ){
        arr[ area[0] ][ area[1] ] = "b";
      }
      console.log( "a or b:" + arr[ area[0] ][ area[1] ] );
    }
    return arr;
  }

  function makeTable(array) {
    x = array[0].length;
    y = array.length;
    var html = [];
    html.push("<table border='0' bgcolor='#00' cellspacing='1'  id='gtable'>");
    for (var i = 0; i < x; i++) {
      html.push("<tr>");
      for (var j = 0; j < y; j++) {
        html.push("<td width="+ Common.TABLE_WIDTH+" height="+ Common.TBALE_HEIGHT+" bgcolor='#808080' onclick='tableOnclik("+i+","+j+")'></td>");
      }
      html.push("</tr>");
    }
    html.push("</table>");
    return html;
  }
  function tableOnclik(x,y){
    console.log("点击坐标："+"（"+x+","+y+")");
    if( "a" == Common.ARRAY[x][y]){
      draw(x,y, "white");
      document.getElementById('gtable').rows[x].cells[y].innerHTML = boomCount(x,y);
      if ( boomCount(x,y) == 0) {
        var arr = Common.ARRAY;
        if( "a" == arr[x-1][y-1]){draw(x-1,y-1, "white");}
        if( "a" == arr[x-1][y]){draw(x-1,y, "white");}
        if( "a" == arr[x-1][y+1]){draw(x-1,y+1, "white");}
        if( "a" == arr[x][y-1]){draw(x,y-1, "white");}
        if( "a" == arr[x][y+1]){draw(x,y+1, "white");}
        if( "a" == arr[x+1][y-1]){draw(x+1,y-1, "white");}
        if( "a" == arr[x+1][y]){ draw(x+1,y, "white");}
        if( "a" == arr[x+1][y+1]){draw(x+1,y+1, "white");}
      }
    }else if( "b" == Common.ARRAY[x][y]){
      console.log("----------------踩住雷了-------------------------");
      drawAllColor(Common.ARRAY);
  
    }
  }


  function draw( i,j,color ) {
    var x=document.getElementById('gtable').rows[i].cells[j];
    x.style.background = color;
  }


  function drawAllColor( arr) {
    var x = arr[0].length;
    var y = arr.length;
    for (var i = 0; i < x; i++) {
      for (var j = 0; j < y; j++) {
          if( "b" == arr[i][j]){
            draw(i,j, "red");
            document.getElementById('gtable').rows[i].cells[j].innerHTML = " * ";
          }else{;
            draw(i,j, "white");
          }
      }
    }
    return arr;
  }

  
  function gameOver(){
    if (Common.BOOMARROUNDCOUNT == 0) {
        alert("-出师未捷身先死-");
    }else {
        alert("-GAME OVER-");
    }

    init();
  }

  
  function boomCount(x,y){
    console.log("boomCount-点击坐标："+"（"+x+","+y+")");
    var arr = Common.ARRAY;
   
    Common.BOOMARROUNDCOUNT = 0;

 
    if(x!=0 && y!=0 && x!=Common.WIDTH -1 && y!=Common.HEIGHT-1) {

      if( "b" == arr[x-1][y-1]){ Common.BOOMARROUNDCOUNT = Common.BOOMARROUNDCOUNT + 1;}
      if( "b" == arr[x-1][y]){ Common.BOOMARROUNDCOUNT = Common.BOOMARROUNDCOUNT + 1;}
      if( "b" == arr[x-1][y+1]){ Common.BOOMARROUNDCOUNT = Common.BOOMARROUNDCOUNT + 1;}
      if( "b" == arr[x][y-1]){ Common.BOOMARROUNDCOUNT = Common.BOOMARROUNDCOUNT + 1;}
      if( "b" == arr[x][y+1]){ Common.BOOMARROUNDCOUNT = Common.BOOMARROUNDCOUNT + 1;}
      if( "b" == arr[x+1][y-1]){ Common.BOOMARROUNDCOUNT = Common.BOOMARROUNDCOUNT + 1;}
      if( "b" == arr[x+1][y]){ Common.BOOMARROUNDCOUNT = Common.BOOMARROUNDCOUNT + 1;}
      if( "b" == arr[x+1][y+1]){ Common.BOOMARROUNDCOUNT = Common.BOOMARROUNDCOUNT + 1;}
    
    }

   
    else if((x==0 && y==0)
      || (x==Common.WIDTH-1 && y==Common.HEIGHT-1)
      ||(x==Common.WIDTH-1 && y==0)
      ||(x==0 && y==Common.HEIGHT-1))
    {
      console.log("边角");
      if ((x==0 && y==0)  &&  ("b" == arr[x][y+1] || "b" == arr[x+1][y] ||  "b" == arr[x+1][y+1])) {Common.BOOMARROUNDCOUNT = Common.BOOMARROUNDCOUNT + 1;}
      else if ((x==Common.WIDTH-1 && y==Common.HEIGHT-1)  &&  ("b" == arr[x][y-1] || "b" ==  arr[x-1][y] || "b" == arr[x-1][y-1] )) { Common.BOOMARROUNDCOUNT = Common.BOOMARROUNDCOUNT + 1;}
      else if (x==0 && y==Common.HEIGHT-1){
        if("b" == arr[x][y-1] || "b" == arr[x+1][y] || "b" == arr[x+1][y-1]) {Common.BOOMARROUNDCOUNT = Common.BOOMARROUNDCOUNT + 1;}
      }else if (x==Common.WIDTH-1 && y==0) {
        if ("b" == arr[x-1][y] || "b" == arr[x][y+1] || "b" == arr[x-1][y+1]){ Common.BOOMARROUNDCOUNT = Common.BOOMARROUNDCOUNT + 1;}
      }
    }

   
    else
    {
      console.log("边框");
      if ((x==0 && y!=0)  && ("b" == arr[x][y-1]|| "b" == arr[x][y+1] || "b" == arr[x+1][y-1]|| "b" == arr[x+1][y] || "b" == arr[x+1][y+1])){ Common.BOOMARROUNDCOUNT = Common.BOOMARROUNDCOUNT + 1;}
      if ((y==0 && x!=0) && ("b" == arr[x-1][y] || "b" == arr[x-1][y+1] || "b" == arr[x][y+1] || "b" == arr[x+1][y] || "b" == arr[x+1][y+1])){ Common.BOOMARROUNDCOUNT = Common.BOOMARROUNDCOUNT + 1;}
      if ((y==Common.HEIGHT-1 && x!=0) && ("b" == arr[x-1][y-1] ||"b" == arr[x-1][y]|| "b" == arr[x][y-1] || "b" == arr[x+1][y-1] || "b" == arr[x+1][y])){ Common.BOOMARROUNDCOUNT = Common.BOOMARROUNDCOUNT + 1;}
      if ((x==Common.WIDTH-1 && y!=0) &&  ("b" == arr[x-1][y-1] || "b" == arr[x-1][y] || "b" == arr[x-1][y+1] || "b" == arr[x][y-1] || "b" == arr[x][y+1])){ Common.BOOMARROUNDCOUNT = Common.BOOMARROUNDCOUNT + 1;}
    }

    return Common.BOOMARROUNDCOUNT;
  }


  function makeArray( x, y) {
    var array = [];
    for (var i = 0; i < x; i++) {
      var row = [];
      for (var j = 0; j < y; j++) {
          row.push('a');
      }
      array.push(row);
    }
    return array;
  }




  function makeRandomBoom(arr){
    var x = Math.floor( Math.random()*arr[0].length % arr[0].length );
    var y = Math.floor( Math.random()*arr.length % arr.length );
    var arrArea = [];
    arrArea[0] = x;
    arrArea[1] = y;
    return arrArea;
  }
  </script>

  <body>
      <div id='game_area'></div>

      <p>表格范围</p>
      <select id="seleArea">
        <option value="20">20*20</option>
        <option value="30">30*30</option>
        <option value="40">40*40</option>
      </select>

      <p>表格大小</p>
      <select id="selSize">
        <option value="20">20*20</option>
        <option value="26">26*26</option>
        <option value="30">30*30</option>
      </select>

      <p>布雷数量</p>
      <select id="selCount">
        <option value="30">30</option>
        <option value="50">50</option>
        <option value="80">80</option>
      </select>

      <br><br>
      <button id="start_draw" type="button">开始游戏</button>
  </body>
</html>

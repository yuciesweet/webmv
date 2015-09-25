//変数
var ytPlayer;
// プレーヤーを埋め込む場所指定
var ytArea = 'background';
// 埋め込むYouTube ID指定
//  var ytID = "PNDyZPqpgxM";
//  var ytID = "qxFFTzhZv7k";
var ytID = "MVFgjit61ok";

// プレーヤーの埋め込み
function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player(ytArea, {
        videoId: ytID,
        playerVars: {
            rel: 0,
            controls: 0,
            showinfo: 0,
            wmode: 'transparent',
            start: startTime
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}


$(function(){
});


  //time offset
  var startTime = 0;
  var canvas = document.getElementById('can');

  //CREATEJS stage生成
  var stg = new createjs.Stage(canvas);
//   document.body.appendChild(canvas);
  stg.enableDOMEvents(true);  // canvasへのEventを有効化
  createjs.Touch.enable(stg); //マルチタッチ有効化
  createjs.Ticker.setFPS(60); //FPS設定
  createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
  createjs.Ticker.addEventListener("tick", function(e){
    stg.update();
  });

  var animIdTime;


  //再生時間生成
  var renderTime = function(){
        var tmptime = ytPlayer.getCurrentTime() - startTime;
        var min = Math.floor(tmptime % 3600 /60 | 0);
        var sec = Math.floor(tmptime % 60);
        var timetxt = ("0" + min).slice(-2) + ":" + ("0" + sec).slice(-2);
        document.getElementById("i-playtime").innerHTML = timetxt;
        stg.update();
        animIdTime = requestAnimationFrame(renderTime);
  };

  // YouTubeの準備完了後
  function onPlayerReady(e) {
    readyBtn();
    ytPlayer.playVideo();
//    document.getElementById("i-title").innerHTML = "Love Machine";
//    document.getElementById("i-artist").innerHTML = "Moametal / Moa Kikuchi";
//    document.getElementById("i-title").innerHTML = "Da Capo III";
//    document.getElementById("i-artist").innerHTML = "Emi Nitta";
    document.getElementById("i-title").innerHTML = "Turn It Into Love";
    document.getElementById("i-artist").innerHTML = "Radio Science";
    document.getElementById("i-playtime").innerHTML = "00:00";
    animIdTime = requestAnimationFrame(renderTime);
  }

  function readyBtn(){
    //定数
    var X_CHG = 200;
    var Y_CHG = 200;
    //選曲ボタン
    var btnChg = new createjs.Bitmap("img/chg.png");
    btnChg.x = X_CHG;
    btnChg.y = Y_CHG;
//    btnChg.addEventListener("click", function(){

//    });
    btnChg.name = "btnChg";
    stg.addChild(btnChg);

    var te = new createjs.Text("TEST", "48px Raleway", "#FFD700");
    te.x = 20;
    te.y = 50;
    stg.addChild(te);

    stg.update();

  }

  // 再生完了後
  function onPlayerStateChange(e) {
      var ytStatus = e.target.getPlayerState();
      if (ytStatus == YT.PlayerState.ENDED) {
//          ytPlayer.playVideo();
//        cancelAnimationFrame(animIdTime);
        cancelAnimationFrame(animIdTime);
        document.getElementById("i-playtime").innerHTML = "";
      }
  }


// 检查脚本是否重复运行
engines.all().slice(1).forEach(script => {
  if (script.getSource().getName().indexOf(engines.myEngine().getSource())) {
    toastLog("脚本正在运行中");
    engines.myEngine().forceStop();
  }
});

var ant=require("./Ant_Forest_Launcher.js");
ant.antForest();

if(ant.minNext==null)
	toastLog("无可收取能量");
else
	toastLog("下次执行等待时间："+ant.minNext);

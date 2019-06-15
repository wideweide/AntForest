
// 检查脚本是否重复运行
engines.all().slice(1).forEach(script => {
  if (script.getSource().getName().indexOf(engines.myEngine().getSource())) {
    toastLog("脚本正在运行中");
    engines.myEngine().forceStop();
  }
});

var ant=require("./Ant_Forest_Launcher.js");

function exec() {
      let _current_time = 0;     // 当前收集次数
      let thread = threads.start(function() {
        events.setMaxListeners(0);
        events.observeToast();
      });
      while (true) {
        _delay(ant.minNext);
        _listen_stop();
        toastLog("第 " + (++_current_time) + " 次运行");

         ant.antForest();

         sleep(1000);
        events.removeAllListeners();
        if (ant.minNext==null || ant.minNext==0) {
          toastLog("收取结束");
          break;
        }else
		toastLog("下次执行等待时间："+ant.minNext);
        }
      thread.interrupt();
      exit()
}

exec();

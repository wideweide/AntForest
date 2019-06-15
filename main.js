
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
      while (true) {
        _delay(ant.minNext);
        toastLog("第 " + (++_current_time) + " 次运行");

         ant.antForest();

         sleep(1000);

        if (ant.minNext==null || ant.minNext==0) {
          toastLog("收取结束");
          break;
        }else
		toastLog("下次执行等待时间："+ant.minNext);
        }
      thread.interrupt();
      exit()
}

 // 按分钟延时
  const _delay = function (minutes) {
    minutes = typeof minutes != null ? minutes : 0;
    if (minutes === 0) {
      // delay时间为0时直接跳过
      return;
    }
    let startTime = new Date().getTime();
    let timestampGap = minutes * 60000;
    let i = 0;
    for (;;) {
      let now = new Date().getTime();
      if (now - startTime >= timestampGap) {
        // 当前已经过时间大于设定的延迟时间则直接退出
        break;
      }
      i = (now - startTime) / 60000;
      let left = minutes - i;
      log("距离下次运行还有 " + left.toFixed(2) + " 分钟");
      if (left * 60000 > 30000) {
        // 剩余时间大于三十秒时 睡眠30秒
        // 锁屏情况下的30秒可能实际时间有五分钟之久，如果不能忍受这个长度可以再改小一点比如10秒之类的
        sleep(30000);
      } else {
        // 剩余时间小于30秒时 直接等待实际时间
        sleep(left * 60000);
      }
    }
  }

 

exec();

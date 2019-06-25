// 检查脚本是否重复运行
engines.all().slice(1).forEach(script => {
    if (script.getSource().getName().indexOf(engines.myEngine().getSource())) {
        toastLog("脚本正在运行中");
        engines.myEngine().forceStop();
    }
});

var ant = require("./Ant_Forest_Launcher.js");

function exec() {
    let _current_time = 0; // 当前收集次数
    let amn = 0; //下次收取能量等待时间
    let thread = threads.start(function() {
                events.setMaxListeners(0);
                events.observeToast();
            });

    while (true) {
        _delay(amn);
        toastLog("第 " + (++_current_time) + " 次运行");

        //执行收取能量
        try {
            
            ant.antForest();
            amn = ant.getNextTime();
        } catch (e) {
            toastLog(e);
            amn = 2;
        } finally {
            log("stop……");
            //thread.interrupt();
            events.removeAllListeners();
        }
        sleep(1000);


        //启动下次收取任务
        if (amn == null || amn == 0) {
            var dtNow = new Date();
            var hNow = dtNow.getHours();

            var dt = new Date();
            dt.setMinutes(dt.getMinutes() + 60);
            var h = dt.getHours();

            if (h >= 7 && h <= 23) {
                amn = 60;
            } else if (h == 0) {
                dtNext = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
                amn = Math.ceil((dtNext - new Date()) / 60000);
            } else {
                dtNext = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), 7, 0, 0);
                amn = Math.round((dtNext - new Date()) / 60000);
            }
        }
        //amn = 1;

        //toastLog("下次执行等待时间(分钟)：" + amn);
    }
    exit();
}

// 按分钟延时
const _delay = function(minutes) {
    minutes = typeof minutes != null ? minutes : 0;
    if (minutes === 0) {
        // delay时间为0时直接跳过
        return;
    }
    var w = floaty.window(
        <frame gravity="center">
                <text id="text" color="white"
                textSize="13sp">准备倒计时…</text>
            </frame>
    );
    w.setPosition(280, -53);
    let endTime = new Date();
    endTime.setMinutes(endTime.getMinutes() + minutes);
    m = endTime.getMinutes();
    if (m < 10) m = "0" + m;
    endTime = endTime.getHours() + ":" + m;
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
        ui.run(function() {
            m = (left % 60).toFixed(0);
            if (m < 10) m = "0" + m;
            w.text.setText(parseInt(left / 60) + ":" + m + "->" + endTime);
        });
        //log("距离下次运行还有 " + left.toFixed(2) + " 分钟");
        if (left * 60000 > 60000) {
            // 剩余时间大于60秒时 睡眠60秒
            // 锁屏情况下的60秒可能实际时间有十分钟之久
            // 如果不能忍受这个长度可以再改小一点比如10秒之类的
            sleep(60000);
        } else {
            // 直接等待实际时间
            sleep(left * 60000);
        }
    }
    w.close();
}

exec();
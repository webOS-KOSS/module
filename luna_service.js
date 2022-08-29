var ls2 = undefined;

function init(service){
    ls2 = service;
}

function tts(text){
    let tts_url = "luna://com.webos.service.tts/speak";
    let tts_params = {
        "text": text,
        "language" :"ko-KR",
        "clear":true
    };
    var callback = (m) => {
        console.log("[tts] called : " + text);
    };
    ls2.call(tts_url, tts_params, callback);
}

function toast(msg){
    let toast_url = "luna://com.webos.notification/createToast";
    let toast_params = {
        message: msg,
        persistent:true
    };
    let callback = (m) =>{
        console.log("[Toast] called : "+ msg);
    }
    ls2.call(toast_url, toast_params, callback);
}

function launchApp(app_id){
    let launchApp_url = "luna://com.webos.notification/createToast";
    let launchApp_params = {
        id: app_id
    };
    let callback = (m) =>{
        console.log("[Toast] called : "+ msg);
    }
    ls2.call(launchApp_url, launchApp_params, callback);
}

function cloudlogin(){ // yunminwo1211@kookmin.ac.kr의 클라우드 API
    let cloudLogin_url = "luna://com.webos.service.storageaccess/device/handleExtraCommand";
    let cloudLogin_params = {
        "storageType":"cloud",
        "operation":{
           "type":"login",
           "payload":{
              "clientId":"75267798816-n8kk75u6gmkc1s0idooldhsdao0q4o3r.apps.googleusercontent.com",
              "clientSecret":"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"
           }
        }
    };
    ls2.call(cloudLogin_url, cloudLogin_params, (msg) =>{
        console.log("[cloud login]" + JSON.stringify(msg));
    });
}

function cloudCertification(token){
    let cloudAuth_url = "luna://com.webos.service.storageaccess/device/handleExtraCommand";
    let cloudAuth_params = {   
    "storageType":"cloud",
    "driveId":"GDRIVE_1",
    "operation":{
       "type":"authenticate",
       "payload":{
          "secretToken":token
       }
    }

    };
    ls2.call(cloudAuth_url, cloudAuth_params, (msg) =>{
        console.log("[cloud certification]" + JSON.stringify(msg));
    });
}

function cloudMove(file){
    let cloudMove_url = "luna://com.webos.service.storageaccess/device/move"
    let cloudMove_params = {
        "srcStorageType":"cloud",                                                                         
        "srcDriveId":"GDRIVE_1",                                                                          
        "destStorageType":"internal",                                                                     
        "destDriveId":"INTERNAL_STORAGE",                                                                 
        "srcPath":"/test/" + file,                                                                     
        "destPath":"/home/root/video",
        "subscribe": true
    }
    ls2.call(cloudMove_url, cloudMove_params, (msg) => {
        console.log("[cloud Move]" + JSON.stringify(msg)) 
    })
}

exports.init = init;
exports.toast = toast;
exports.tts = tts;
exports.launchApp = launchApp;
exports.cloudlogin = cloudlogin;
exports.cloudCertification = cloudCertification;
exports.cloudMove = cloudMove;

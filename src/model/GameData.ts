class GameData {
    constructor(){}
    //自我维护的版本 (主要用于一些更新说明)
    static GAME_VERSION = "1.1.1";
    //app版和本地测试版
    static isLocal = true;
    //生产环境
    static IP = "https://127.0.0.1:1111/";
    //userdata
    static userData;
    static urlPath = "";

}
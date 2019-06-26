//通信类
class HttpServer {
    static isRequesting:boolean = false;

    private static ListenEvent(request:egret.HttpRequest, cb?:Function) {
        request.addEventListener(egret.Event.COMPLETE, (e:egret.Event) => {
            var request = <egret.HttpRequest>e.currentTarget;
            var response = request.response;
            if (cb) {
                cb(JSON.parse(response));
            }
        }, null);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, (e:egret.IOErrorEvent) => {
            if (cb) {
                cb(e);
            }
        }, null);
    }
    //get 请求
    static get(url, cb?:Function):any {
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        //设置为 POST 请求
        request.open(url, egret.HttpMethod.GET);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        HttpServer.ListenEvent(request, cb);
        request.send();
    }
    //post请求
    static post(url:string, params?:{[key:string]:any}, cb?:Function):any {
        var postData:string = HttpServer.queryString(params);
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;

        //设置为 POST 请求
        request.open(url, egret.HttpMethod.POST);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        HttpServer.ListenEvent(request, cb);
        request.send(postData);
    }
    //也是post 不过是json 
    static put(url:string, params?:{[key:string]:any}, cb?:Function):any {
        var postData:string = JSON.stringify(params);
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        //设置为 POST 请求
        request.open(url, egret.HttpMethod.POST);
        request.setRequestHeader("Content-Type", "application/json");
        HttpServer.ListenEvent(request, cb);
        request.send(postData);
    }
    //跨域
    public static jsonp(route,param,callback){
        /**jsoncallback是服务端调用的方法  这里要看你的服务端写的方法是什么名称
        * 如果url后面还有参数，则para为arg0=para1&arg1=para2&jsoncallback格式
        */
        var para = `${param}&jsonpcallback`;
        var loader:egret.URLLoader = new egret.URLLoader();
        let url = GameData.IP + route;
        var req:egret.URLRequest = new egret.URLRequest(url+"?"+para+"=");
        loader._request = req;
        req.method = egret.URLRequestMethod.POST;
        JsonpReq.process(loader,callback);
        loader.addEventListener(egret.Event.COMPLETE,(evt)=>{
            console.log("event:o%",evt);
        },this);
    }
    //把参数转成key=value格式
    static queryString(params){
        if (!params) {
            return;
        }
        var str = "";
        var idx:number = 0;
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                str += key + "=" + params[key].toString() + "&";
            }
        }
        return str.substr(0,str.length - 1);
    }

}
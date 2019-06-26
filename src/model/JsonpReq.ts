class JsonpReq{
    constructor(){

    }

    private static _regID:number = 0;
    public static completeCall:any = {};
    public static process($loader:egret.URLLoader,callback:Function):void {
        JsonpReq.completeCall["call_"+JsonpReq._regID] = (data)=>{
            callback(data);
        }
        JsonpReq.startLoader($loader, JsonpReq._regID++);
    }
       
    private static startLoader(loader:egret.URLLoader, id:number):void{
        var script = document.createElement('script');
        script.src = loader._request.url + "JsonpReq.completeCall.call_" + id +"";
        document.body.appendChild(script);
    }
}
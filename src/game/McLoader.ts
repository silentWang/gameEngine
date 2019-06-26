//用于动态加载动画mc
class McLoader{
    constructor(){
        this.init();
    }
    private static _instance:McLoader;
    public static instance():McLoader{
        if(!McLoader._instance){
            McLoader._instance = new McLoader();
        }
        return McLoader._instance;
    }

    private _urlLoader:egret.URLLoader;
    private _imageLoader:egret.ImageLoader;
    private _key:String;
    private _callback:Function;
    private pngjson = {data:null,texture:null};
    private init(){
        let urlloader = new egret.URLLoader();
        urlloader.addEventListener(egret.Event.COMPLETE,this.onLoadComplete,this);
        urlloader.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onIOError,this);
        this._urlLoader = urlloader;

        var imageLoader:egret.ImageLoader = new egret.ImageLoader();
        imageLoader.addEventListener(egret.Event.COMPLETE, this.onLoadTextureComplete, this);
        imageLoader.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onIOError,this);
        this._imageLoader = imageLoader;
    }

    public loaderMc(key,callback:Function){
        this._key = key;
        this._callback = callback
        let loader = this._urlLoader;
        let url = `${GameData.urlPath}resource/assets/animations/${this._key}.json`;
        loader.load(new egret.URLRequest(url));
    }

    private onLoadComplete(evt){
        let loader:egret.URLLoader = <egret.URLLoader>evt.target;
        let data = JSON.parse(loader.data);
        this.pngjson.data = data;
        this._imageLoader.load(`${GameData.urlPath}resource/assets/animations/${this._key}.png`);
    }

    private onIOError(evt){
        console.log("ioerror 使用默认的,o%",evt);
        let mc = SpriteUtil.createMovieClip("mc","youmiao");
        if(this._callback){
            this._callback(mc);
        }
        this._callback = null;
    }

    private onLoadTextureComplete(evt){
        let loader:egret.ImageLoader = <egret.ImageLoader>evt.target;
        //获取加载到的纹理对象
        var bitmapData:egret.BitmapData = loader.data;
        //创建纹理对象
        let texture = new egret.Texture();
        texture.bitmapData = bitmapData;
        this.pngjson.texture = texture;

        let mcFactory = new egret.MovieClipDataFactory(this.pngjson.data,this.pngjson.texture);
        let mc:egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData("mc"));
        if(this._callback){
            this._callback(mc);
        }
        this._callback = null;
    }
}
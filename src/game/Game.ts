/**
 *game游戏入口 单例类
 * 框架分三层 bottom middle top
 * bottom一般包含背景、地图、角色、npc等游戏层
 * middle一般放弹窗view
 * top很少用 一般特效
 */
class Game{
    private static _instance:Game = null;
    public static instance(){
        if(Game._instance == null){
            Game._instance = new Game();
        }
        return Game._instance;
    }

    private _gameStage:egret.Stage;
    private _bottom:egret.DisplayObjectContainer;
    private _middle:egret.DisplayObjectContainer;
    private _top:egret.DisplayObjectContainer;
    private _gameView:GameView;
    private _demoGame:DemoGame;
    public setStage(stage:egret.Stage){
        this._gameStage = stage;
        this._bottom = new egret.DisplayObjectContainer();
        this._middle = new egret.DisplayObjectContainer();
        this._top = new egret.DisplayObjectContainer();
        stage.addChild(this._bottom);
        stage.addChild(this._middle);
        stage.addChild(this._top);
        this._gameView = new GameView();

        let bg = SpriteUtil.createImage("bg_png",false);
        bg.width = SpriteUtil.stageWidth;
        bg.height = SpriteUtil.stageHeight;
        stage.addChild(bg);
        this._demoGame = new DemoGame();
        this.gotoGame();
    }

    public get gameStage(){
        return this._gameStage;
    }

    public get gameView(){
        return this._gameView;
    }

    public addBottom(display:egret.DisplayObject){
        this._bottom.addChild(display);
    }
    public addMiddle(display:egret.DisplayObject){
        this._middle.addChild(display);
    }
    public addTop(display:egret.DisplayObject){
        this._top.addChild(display);
    }

    public gotoGame(){
        this._demoGame.startGame();
    }

}
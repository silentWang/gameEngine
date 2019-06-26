class BaseUI extends eui.Component{
    constructor(){
        super();
        this.addEventListener(egret.Event.COMPLETE,this.init,this);
    }
    public isOpen = false;
    
    protected init(){
        //皮肤解析成功
    }

    public open(){
        if(this.isOpen) return;
        this.isOpen = true;
        Game.instance().addTop(this);
        GameUtil.fadeIn(this);
    }

    public close(){
        if(!this.isOpen) return;
        this.isOpen = false;
        GameUtil.fadeOut(this,()=>{
            if(this.parent){
                this.parent.removeChild(this);
            }
        });
    }

}
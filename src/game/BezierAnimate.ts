/**bezier曲线动画 */
class BezierAnimate extends egret.Sprite{
    constructor(){
        super();
        this.startPt = {x:366,y:660};
        this.endPt = {x:150,y:60};
        let img = SpriteUtil.createImage("mainpage_json#coinicon",false);
        this.addChild(img);
        this.reset();
    }

    private startPt;
    private midPt;
    private endPt;
    public reset(){
        let midx = (this.startPt.x + this.endPt.x)/2;
        let midy = (this.startPt.y + this.endPt.y)/2;
        let rx = Math.random() > 0.5 ? -100 : 100;
        this.midPt = {x:midx + rx,y:midy};
        this.x = this.startPt.x;
        this.y = this.startPt.y;
    }

    public get factor(){
        return 0;
    }
    public set factor(value){
        this.x = (1 - value) * (1 - value) * this.startPt.x + 2 * value * (1 - value) * this.midPt.x + value * value * this.endPt.x;
        this.y = (1 - value) * (1 - value) * this.startPt.y + 2 * value * (1 - value) * this.midPt.y + value * value * this.endPt.y;
    }

}
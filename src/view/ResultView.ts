class ResultView extends BaseUI{
    constructor(){
        super();
        this.skinName = "resource/eui_skins/ResultSkin.exml";
    }

    private scoreTxt:eui.Label;
    private closeBtn:eui.Image;
    private shareBtn:eui.Image;
    protected init(){
        this.scoreTxt.text = "cccccc";
    }

}
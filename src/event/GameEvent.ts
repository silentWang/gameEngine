class GameEvent extends egret.Event{
    constructor(type,data = null){
        super(type)
        this.data = data;
    }
    public data = null;
    //新手引导最后一步喂食
    static GUIDE_CLICK_HANDLE = "GUIDE_CLICK_HANDLE";
    //remove stage
    static JUST_REMOVE_STAGE_EVENT = "JUST_REMOVE_STAGE_EVENT";
    //拖拽种植
    static DRAG_TO_PLANT = "DRAG_TO_PLANT";
    //更新农场信息
    static UPDATE_FARM_VIEW = "UPDATE_FARM_VIEW";
    //更新农场信息
    static UPDATE_RAIN_WATER = "UPDATE_RAIN_WATER";
    //浇水
    static WATER_PLANT_EVENT = "WATER_PLANT_EVENT";
    //金币放大
    static PLAY_COIN_EFFECT_BREATH = "PLAY_COIN_EFFECT_BREATH";

}
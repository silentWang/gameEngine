/**
 * 所有ui入口
 */
class GameView{
    
    private _resultView:ResultView;

    public get resultView():ResultView{
        if(!this._resultView){
            this._resultView = new ResultView();
        }
        return this._resultView;
    }

}
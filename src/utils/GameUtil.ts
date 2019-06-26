class GameUtil {
    private static toastSprite:egret.Sprite;
    private static coinSprite:egret.Sprite;
    private static berCoinPools:Array<BezierAnimate>;
    //toast
    static showTips(str = "",time = 800){
        if(!str) return;
        if(!this.toastSprite){
            let shape = new egret.Shape();
            shape.graphics.beginFill(0x000000,0.7);
            shape.graphics.drawRoundRect(0,0,480,100,16);
            shape.graphics.endFill();
            let sprite = new egret.Sprite();
            sprite.x = SpriteUtil.stageCenterX - 225;
            sprite.y = SpriteUtil.stageCenterY - 160;
            sprite.addChild(shape);
            let txt = new egret.TextField();
            txt.text = str;
            txt.width = 480;
            txt.size = 32;
            txt.backgroundColor = 0x000000;
            txt.textAlign = "center";
            txt.name = "txtstr";
            txt.y = 50 - txt.height/2;
            sprite.addChild(txt);
            this.toastSprite = sprite;
        }
        egret.Tween.removeTweens(this.toastSprite);
        this.toastSprite.y = SpriteUtil.stageCenterY - 100;
        this.toastSprite.alpha = 0.01;
        this.toastSprite.getChildByName("txtstr")["text"] = str;
        Game.instance().addTop(this.toastSprite);
        let tween = egret.Tween.get(this.toastSprite).to({alpha:1},200);
        tween.wait(time);
        tween.to({alpha:0.01},400).call(()=>{
            egret.Tween.removeTweens(this.toastSprite);
            if(this.toastSprite && this.toastSprite.parent){
                this.toastSprite.parent.removeChild(this.toastSprite);
            }
        });
    }
    //获得金币 飞行
    static playGetCoinEffect(coin,callback = null){
        let num = 0;
        let mc = SpriteUtil.createMovieClip("mc","shoujinbi");
        mc.x = 375;
        mc.y = 660;
        Game.instance().addTop(mc);
        mc.play(1);
        let idx = egret.setInterval(()=>{
            if(num == 12){
                egret.clearInterval(idx);
            }
            num++;
            let bit = this.getCoinPools();
            Game.instance().addTop(bit);
            GameSound.instance().playSound(1);
            egret.Tween.get(bit).to({factor:1},400).call(()=>{
                egret.Tween.removeTweens(bit);
                if(bit.parent){
                    bit.parent.removeChild(bit);
                }
                EventCenter.instance().dispatchEvent(new GameEvent(GameEvent.PLAY_COIN_EFFECT_BREATH));
                let isend = true;
                for(let bic of this.berCoinPools){
                    if(bic.parent){
                        isend = false;
                    }
                }
                if(isend){
                    if(callback){
                        callback(coin);
                    }
                    if(mc){
                        mc.stop();
                        if(mc.parent){
                            mc.parent.removeChild(mc);
                        }
                        mc = null;
                    }
                }
            });
        },this,100);
    }
    private static getCoinPools():BezierAnimate{
        let arr = this.berCoinPools;
        if(arr && arr.length > 0){
            for(let bit of arr){
                if(!bit.parent){
                    bit.reset();
                    return bit;
                }
            }
        }
        else{
            this.berCoinPools = [];
        }
        let bit = new BezierAnimate();
        this.berCoinPools.push(bit);
        return bit;
    }
    //开关场景
    //show 蒙版
    private static leftMaskBit:egret.Bitmap;
    private static rightMaskBit:egret.Bitmap;
    static showAnimMask(callback = null){
        if(!this.leftMaskBit || !this.rightMaskBit){
            let sprite1 = new egret.Sprite();
            let bit1 = SpriteUtil.createImage("special_json#doorR");
            let bit2 = SpriteUtil.createImage("special_json#doorL");
            bit1.y = SpriteUtil.stageCenterY;
            bit2.y = bit1.y;
            this.leftMaskBit = bit1;
            this.rightMaskBit = bit2;
        }
        if(this.leftMaskBit.parent || this.rightMaskBit.parent) return;
        this.leftMaskBit.x = -this.leftMaskBit.width/2;
        this.rightMaskBit.x = SpriteUtil.stageWidth + this.rightMaskBit.width/2;
        Game.instance().addTop(this.leftMaskBit);
        Game.instance().addTop(this.rightMaskBit);
        egret.Tween.get(this.leftMaskBit).to({x:this.leftMaskBit.width/2},500);
        egret.Tween.get(this.rightMaskBit).to({x:SpriteUtil.stageWidth - this.rightMaskBit.width/2},500).call(()=>{
            if(callback){
                callback();
            }
        });
    }
    static removeAnimMask(){
        if(!this.leftMaskBit || !this.leftMaskBit.parent || !this.rightMaskBit.parent) return;
        let idx = egret.setTimeout(()=>{
            egret.clearTimeout(idx);
            egret.Tween.get(this.leftMaskBit).to({x:-this.leftMaskBit.width/2},500);
            egret.Tween.get(this.rightMaskBit).to({x:SpriteUtil.stageWidth + this.rightMaskBit.width/2},500).call(()=>{
                egret.Tween.removeTweens(this.leftMaskBit);
                egret.Tween.removeTweens(this.rightMaskBit);
                if(this.leftMaskBit.parent){
                    this.leftMaskBit.parent.removeChild(this.leftMaskBit);
                }
                if(this.rightMaskBit.parent){
                    this.rightMaskBit.parent.removeChild(this.rightMaskBit);
                }
            });
        },this,300);
    }

    static flowIn(view:egret.DisplayObject){
        view.y = SpriteUtil.stageHeight;
        egret.Tween.get(view).to({y:SpriteUtil.stageHeight - view.height + 20}, 200).call(() => {
           egret.Tween.removeTweens(view);
        })
    }

    static flowOut(view:egret.DisplayObject,callback = null){
        egret.Tween.get(view).to({y:SpriteUtil.stageHeight}, 200).call(() => {
           egret.Tween.removeTweens(view);
           if(callback){
               callback();
           }
        })
    }
    //淡入淡出
    static fadeIn(view:egret.DisplayObject){
        view.alpha = 0;
        egret.Tween.get(view).to({alpha:1}, 200).call(() => {
           egret.Tween.removeTweens(view);
        })
    }
    static fadeOut(view,callback = null){
        let alpha = 0;
        egret.Tween.get(view).to({alpha}, 200).call(() => {
           egret.Tween.removeTweens(view);
           if(callback){
               callback();
           }
        })
    }
    //呼吸动画
    static playBreathAnim(spr,sobj,tobj,time = 800,times = 0){
        egret.Tween.removeTweens(spr);
        if(!sobj || !tobj) return;
        egret.Tween.get(spr).to(tobj,time).call(()=>{
            egret.Tween.get(spr).to(sobj,time).call(()=>{
                if(times == 0){
                    this.playBreathAnim(spr,sobj,tobj,time);
                }
                else{
                    egret.Tween.removeTweens(spr);
                }
            });
        });
    }
    //h:m:s
    static getHMSTimeStr(time = 0){
        let h = Math.floor(time/3600);
        let m = Math.floor((time - h*3600)/60);
        let s = time - h*3600 - m*60;
        return `${h >= 10 ? h : '0'+h}:${m >= 10 ? m : '0'+m}:${s >= 10 ? s : '0'+s}`;
    }
    //获取path
    static getURLPath(){
        let pathname = window.location.pathname;
        let path = pathname.substring(0,pathname.lastIndexOf("/")+1);
        return window.location.protocol + "//" + window.location.host + "/" + path;
    }

}
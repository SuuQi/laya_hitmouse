
export enum MOUSE_TYPE {
    BLUE = 1,
    BROWN = 2
}

export const MOUSE_SKIN = {
    [MOUSE_TYPE.BLUE]: `res/mouse_normal_${MOUSE_TYPE.BLUE}.png`,
    [MOUSE_TYPE.BROWN]: `res/mouse_normal_${MOUSE_TYPE.BROWN}.png`,
}

export default class mouse extends Laya.Script {
    /** @prop {name:mouseType, tips:"老鼠类型", type:int, default: 1}*/
    public mouseType = MOUSE_TYPE.BLUE;
    public owner: Laya.Image;

    onStart () {
        this.showAnimation(this.mouseType);
    }

    showAnimation (type: MOUSE_TYPE) {
        this.mouseType = type;
        this.owner.skin = MOUSE_SKIN[this.mouseType];
        this.owner.scale(0, 0, true);
        
        const tl = Laya.TimeLine
            .to(this.owner, { scaleX: 1, scaleY: 1 }, 1000)
        tl.play();
        tl.on(Laya.Event.COMPLETE, this, this.);
    }

}
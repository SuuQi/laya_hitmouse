
export default class hammer extends Laya.Script {
    public owner: Laya.Sprite;

    onStart () {
        this.showAnimation();
    }

    showAnimation () {
        const ANIMATION_TIME = 100;
        this.owner.rotation = 0;
        this.owner.alpha = 1;
        const tl = Laya.TimeLine
            .to(this.owner, { rotation: 9 }, ANIMATION_TIME, null, 1000)
            .to(this.owner, { rotation: -9 }, ANIMATION_TIME * 2)
            .to(this.owner, { rotation: 0 }, ANIMATION_TIME)
            .to(this.owner, { alpha: 0 }, ANIMATION_TIME * 2, null, ANIMATION_TIME * 7)
            .play();
    }

}
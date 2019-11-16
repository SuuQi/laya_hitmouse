import mouse, { MOUSE_TYPE } from "./mouse";

export default class game_mgr extends Laya.Script {
    /** @prop {name:mousePrefab, tips:"老鼠的预制体", type:Prefab, default: null}*/
    public mousePrefab: Laya.Prefab = null;
    /** @prop {name:mouseRoot, tips:"老鼠Sprite的Root节点", type:Node, default: null}*/
    public mouseRoot: Laya.Sprite = null;

    public owner: Laya.Scene;

    onStart () {
        this.generatorOneMouse();
    }

    onUpdate () {
        console.log(`w: ${this.owner.width} h: ${this.owner.height}`);
    }

    generatorOneMouse () {
        const mouse = this.mousePrefab.create();
        this.mouseRoot.addChildren(mouse);
        Laya.timer.once(Math.floor( Math.random() * 1000 * 2 + 2 ), this, this.generatorOneMouse);
    }

}
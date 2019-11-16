(function () {
    'use strict';

    class game_mgr extends Laya.Script {
        constructor() {
            super(...arguments);
            this.mousePrefab = null;
            this.mouseRoot = null;
        }
        onStart() {
            this.generatorOneMouse();
        }
        onUpdate() {
            console.log(`w: ${this.owner.width} h: ${this.owner.height}`);
        }
        generatorOneMouse() {
            const mouse = this.mousePrefab.create();
            this.mouseRoot.addChildren(mouse);
            Laya.timer.once(Math.floor(Math.random() * 1000 * 2 + 2), this, this.generatorOneMouse);
        }
    }

    class hammer extends Laya.Script {
        onStart() {
            this.showAnimation();
        }
        showAnimation() {
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

    var MOUSE_TYPE;
    (function (MOUSE_TYPE) {
        MOUSE_TYPE[MOUSE_TYPE["BLUE"] = 1] = "BLUE";
        MOUSE_TYPE[MOUSE_TYPE["BROWN"] = 2] = "BROWN";
    })(MOUSE_TYPE || (MOUSE_TYPE = {}));
    const MOUSE_SKIN = {
        [MOUSE_TYPE.BLUE]: `res/mouse_normal_${MOUSE_TYPE.BLUE}.png`,
        [MOUSE_TYPE.BROWN]: `res/mouse_normal_${MOUSE_TYPE.BROWN}.png`,
    };
    class mouse extends Laya.Script {
        constructor() {
            super(...arguments);
            this.mouseType = MOUSE_TYPE.BLUE;
        }
        onStart() {
            this.showAnimation(this.mouseType);
        }
        showAnimation(type) {
            this.mouseType = type;
            this.owner.skin = MOUSE_SKIN[this.mouseType];
            this.owner.scale(0, 0, true);
            const tl = Laya.TimeLine
                .to(this.owner, { scaleX: 1, scaleY: 1 }, 1000)
                .play();
        }
    }

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("game/game_mgr.ts", game_mgr);
            reg("game/hammer.ts", hammer);
            reg("game/mouse.ts", mouse);
        }
    }
    GameConfig.width = 960;
    GameConfig.height = 640;
    GameConfig.scaleMode = "fixedheight";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "game_sence.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError = true;
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        }
    }
    new Main();

}());

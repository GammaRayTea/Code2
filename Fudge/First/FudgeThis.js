"use strict";
var FudgeThis;
(function (FudgeThis) {
    window.addEventListener("load", onLoad);
    var f = FudgeCore;
    let node;
    let viewport;
    let scaleFactor = 0.04;
    function onLoad(_event) {
        window.addEventListener("loopFrame", loop);
        const mesh = new f.MeshCube("Cube");
        node = new f.Node("Node");
        const camera = new f.ComponentCamera();
        const texture = new f.TextureImage("data/textures/upper-case-letter-e-cartoon-alphabet-24134-1733608961.jpg");
        console.log(texture);
        const coat = new f.CoatTextured(new f.Color(1, 1, 1, 1), texture);
        const material = new f.Material("Texture", f.ShaderLitTextured, coat);
        node.addComponent(new f.ComponentMesh(mesh));
        node.addComponent(new f.ComponentMaterial(material));
        node.addComponent(new f.ComponentTransform());
        camera.mtxPivot.translateZ(-3);
        node.getComponent(f.ComponentTransform).mtxLocal.rotate(new f.Vector3(-30, 0, 0));
        viewport = new f.Viewport();
        viewport.initialize("Viewport", node, camera, document.querySelector("canvas"));
        viewport.draw();
        f.Loop.addEventListener("loopFrame" /* f.EVENT.LOOP_FRAME */, handleFrame);
        f.Loop.start(FudgeCore.LOOP_MODE.TIME_GAME, 60);
        console.log(material.coat);
    }
    function handleFrame() {
        //console.log("stuff")
        loop();
    }
    function loop() {
        node.getComponent(f.ComponentTransform).mtxLocal.rotateY(1);
        node.getComponent(f.ComponentTransform).mtxLocal.scale(new f.Vector3(1 + scaleFactor, 1 + scaleFactor, 1 + scaleFactor));
        if (node.getComponent(f.ComponentTransform).mtxLocal.scaling.x > 2 || node.getComponent(f.ComponentTransform).mtxLocal.scaling.x < 0.5) {
            scaleFactor = -scaleFactor;
        }
        viewport.draw();
        console.log("a");
    }
})(FudgeThis || (FudgeThis = {}));
//# sourceMappingURL=FudgeThis.js.map
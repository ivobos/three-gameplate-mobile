import * as sceneRenderer from "./scene/sceneRenderer";

const updatesPerSec = 60;
const stepSec = 1 / updatesPerSec;
let dtSec;
let lastMsec;
let frameReq;


function timestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

export function start() {
    dtSec = 0;
    lastMsec = timestamp();
    frameReq = requestAnimationFrame(frame);
}

function frame() {
    //stats.begin();
    sceneRenderer.doRender();
    //this.callMethodsWithData("getInputData", "doInput");
    var nowMsec = timestamp();
    dtSec = dtSec + Math.min(1, (nowMsec - lastMsec) / 1000);
    while(dtSec > stepSec) {
        dtSec = dtSec - stepSec;
        //this.callMethodsWithData("getPhysicsData", "doPhysics");
    }
    lastMsec = nowMsec;
    //this.callMethod("doAnimation");
    //this.callMethodsWithData("getCameraData", "doCameraUpdate");
    //stats.end();
    frameReq = requestAnimationFrame(frame);
}

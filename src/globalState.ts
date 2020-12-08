import { Observable } from '@babylonjs/core/Misc/observable';
import { Scene } from '@babylonjs/core/scene';
import { FilesInput } from '@babylonjs/core/Misc/filesInput';
// import '@babylonjs/core/Debug/index'
// import '@babylonjs/gui/index'

export class GlobalState {
    currentScene!: Scene;
    onSceneLoaded = new Observable<{scene: Scene, filename: string}>();
    onError = new Observable<{scene?: Scene, message?: string}>();
    onEnvironmentChanged = new Observable<string>();    
    onRequestClickInterceptor = new Observable<void>();
    onClickInterceptorClicked = new Observable<void>();

    filesInput!: FilesInput;
    isDebugLayerEnabled = false;

    public showDebugLayer() {
        this.isDebugLayerEnabled = true;
        if (this.currentScene) {
            this.currentScene.debugLayer.show(); 
        }    
    }

    public hideDebugLayer() {
        this.isDebugLayerEnabled = false;
        if (this.currentScene) {
            this.currentScene.debugLayer.hide();
        }     
    }
}
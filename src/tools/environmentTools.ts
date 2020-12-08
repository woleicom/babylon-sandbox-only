import { HDRCubeTexture } from '@babylonjs/core/materials/Textures/hdrCubeTexture';
import { CubeTexture } from '@babylonjs/core/Materials/Textures/cubeTexture';
import { Scene } from '@babylonjs/core/scene';
import { LocalStorageHelper } from './localStorageHelper';
import { GlobalState } from '../globalState';
// import '@babylonjs/core/loading/loadingScreen';
import { Engine } from '@babylonjs/core/Engines/engine';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { PBRMaterial } from '@babylonjs/core/Materials/PBR/pbrMaterial';
import { Texture } from '@babylonjs/core/Materials/Textures/texture';

export class EnvironmentTools {
    public static SkyboxPath = "";
    public static Skyboxes = [
        "static/environmentSpecular.env",
        "static/studio.env",
    ];

    public static SkyboxesNames = [
        "Default",
        "Studio",
    ];

    public static LoadSkyboxPathTexture(scene: Scene) {
        var defaultSkyboxIndex = Math.max(0, LocalStorageHelper.ReadLocalStorageValue("defaultSkyboxId", 0));
        let path = this.SkyboxPath || this.Skyboxes[defaultSkyboxIndex];
        if (path.indexOf(".hdr") === (path.length - 4)) {
            return new HDRCubeTexture(path, scene, 256, false, true, false, true);
        }
        return CubeTexture.CreateFromPrefilteredData(path, scene);
    }

    public static HookWithEnvironmentChange(globalState: GlobalState) {
        globalState.onEnvironmentChanged.add((option) => {
            this.SkyboxPath = "";
            let index = EnvironmentTools.SkyboxesNames.indexOf(option);

            if (typeof (Storage) !== "undefined") {
                localStorage.setItem("defaultSkyboxId", index.toString());
            }

            var currentScene = Engine.LastCreatedScene!;
            currentScene.environmentTexture = this.LoadSkyboxPathTexture(currentScene);
            for (var i = 0; i < currentScene.materials.length; i++) {
                var material = currentScene.materials[i] as (StandardMaterial | PBRMaterial);
                if (material.name === "skyBox") {
                    var reflectionTexture = material.reflectionTexture;
                    if (reflectionTexture && reflectionTexture.coordinatesMode === Texture.SKYBOX_MODE) {
                        material.reflectionTexture = currentScene.environmentTexture.clone();
                        if (material.reflectionTexture) {
                            material.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
                        }
                    }
                }
            }
        });
    }
}
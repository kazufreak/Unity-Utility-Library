#pragma strict

var aspectRatioCtrl : Aspect_Ratio_Controller = null;
var x : float = 0.0f;           // X
var y : float = 0.0f;           // Y
var width : float = 1.0f;       // width
var height : float = 1.0f;      // height
var enable : boolean = true;

function Update()
{
    var texture : GUITexture;
    
    texture = GetComponent(GUITexture);
    
    // this component must exist in same GameObject
    if (!texture)   { return; }

    // default resolution
    if (!aspectRatioCtrl || !enable) {
        texture.pixelInset.x = x * Screen.width;
        texture.pixelInset.y = y * Screen.height;
        texture.pixelInset.width = width * Screen.width;
        texture.pixelInset.height = height * Screen.height;
    }
    // resolution under control by Aspect_Ratio_Controller
    else {
        var rect : Rect;
        rect = aspectRatioCtrl.GetCameraRect();
        texture.pixelInset.x = (x * rect.width) * Screen.width;
        texture.pixelInset.y = (y * rect.height) * Screen.height;
        texture.pixelInset.width = width * rect.width * Screen.width;
        texture.pixelInset.height = height * rect.height * Screen.height;
    }
}


@script AddComponentMenu("Colorful Pico/Lib/Cross Platform/Cross Platform GUI Controller")
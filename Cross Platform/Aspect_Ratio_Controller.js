// Aspect Ratio Controller Ver 1.0

#pragma strict

#if UNITY_EDITOR
var resolution : Vector2 = Vector2(Screen.width, Screen.height);
var targetDevice : iPhoneGeneration;
#endif

var enable : boolean = true;                    // enable fixed aspect ratio
var offset : Vector2 = Vector2(0.0f, 0.0f);     // offset
var scale : Vector2 = Vector2(1.0f, 1.0f);      // scaling
var cam : Camera = null;                        // 'Camera' object

private var width : float = 640.0f;             // width (actual resolution)
private var height : float = 960.0f;            // height (actual resolution)
private var camRect : Rect;                     // camera's rectangle

function Start()
{
    SetActualResolution();
}

function Update()
{
    var targetAspect : float;
    var curAspect : float;
    var ratio : float;

    if (!enable)    { return; }
    if (!cam)       { return; }

#if UNITY_EDITOR        // for Unity editor
    SetEditorActualResolution(targetDevice);
#endif

    targetAspect = width / height;
    curAspect = Screen.width * 1.0f / Screen.height;
    ratio = curAspect / targetAspect;
    
    if (1.0f > ratio) {
        cam.rect.x = 0.0f + offset.x;
        cam.rect.width = 1.0f;
        cam.rect.y = (1.0f - ratio) / 2.0f + offset.y;
        cam.rect.height = ratio;
        cam.orthographicSize = Screen.width / (2.0f * scale.x);
    }
    else {
        ratio = 1.0f / ratio;
        cam.rect.x = (1.0f - ratio) / 2.0f + offset.x;
        cam.rect.width = ratio;
        cam.rect.y = 0.0f + offset.y;
        cam.rect.height = 1.0f;
        cam.orthographicSize = Screen.height / (2.0f * scale.y);
    }
    
    camRect = cam.rect;
}

private function SetActualResolution()
{
#if UNITY_EDITOR        // for Unity editor
    SetEditorActualResolution(targetDevice);
#elif UNITY_IPHONE      // for iPhone/iPad
    SetiPhoneActualResolution(iPhone.generation);
#elif UNITY_ANDROID     // for Android
    SetAndroidActualResolution();
#endif
}

private function SetEditorActualResolution(device : iPhoneGeneration)
{
    if (device == iPhoneGeneration.Unknown) {
        width = resolution.x;
        height = resolution.y;
    }
    else{
        SetiPhoneActualResolution(device);
    }
}

private function SetiPhoneActualResolution(generation : iPhoneGeneration)
{
    switch (generation) {
        case iPhoneGeneration.iPhone4S:
            width = 640.0f;
            height = 960.0f;
            break;
        case iPhoneGeneration.iPhone5:
        case iPhoneGeneration.iPhone5C:
        case iPhoneGeneration.iPhone5S:
            width = 640.0f;
            height = 1136.0f;
            break;
        case iPhoneGeneration.iPad1Gen:
        case iPhoneGeneration.iPad2Gen:
            width = 768.0f;
            height = 1024.0f;
            break;
        case iPhoneGeneration.iPad3Gen:
        case iPhoneGeneration.iPad4Gen:
        case iPhoneGeneration.iPad5Gen:
        case iPhoneGeneration.iPadMini2Gen:
            width = 1536.0f;
            height = 2048.0f;
            break;
        default:
            width = 640.0f;
            height = 960.0f;
            break;
    }
}

private function SetAndroidActualResolution()
{
    height = 1280.0f;
    width = 800.0f;
}

// get actual resolution width
function GetWidth() : float
{
    return width;
}

// get actual resolution height
function GetHeight() : float
{
    return height;
}

// get camera rect
function GetCameraRect() : Rect
{
    return camRect;
}

@script AddComponentMenu( "Colorful Pico/Lib/Cross Platform/Aspect Ratio Controller" )
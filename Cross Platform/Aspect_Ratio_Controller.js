#pragma strict

var height : float = 960.0f;
var width : float = 640.0f;
var ratio : float;
var rect : Rect;
var enable : boolean = true;

var offset : Vector2;

var zoome : float = 1.0f;

function Start()
{
	offset = Vector2( 0.0f, 0.0f );

#if UNITY_IPHONE

	switch( iPhone.generation ){
		case iPhoneGeneration.iPhone4S:
			height = 960.0f;
			width = 640.0f;
			break;
		case iPhoneGeneration.iPhone5:
		case iPhoneGeneration.iPhone5C:
		case iPhoneGeneration.iPhone5S:
			height = 1136.0f;
			width = 640.0f;
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
			break;
	}
	
#endif
	
#if UNITY_ANDROID
	height = 1280.0f;
	width = 800.0f;
#endif
}

function Update()
{
	var cam : Camera;
	var targetAspect : float;
	var curAspect : float;

	if( !enable ){
		return;
	}

	cam = gameObject.GetComponent( Camera );
	
	if( !cam ){
		return;
	}
	
	targetAspect = width / height;
	curAspect = Screen.width * 1.0f / Screen.height;
	ratio = curAspect / targetAspect;
	
	if( 1.0f > ratio ){
		cam.rect.x = 0.0f + offset.x;
		cam.rect.width = 1.0f;
		cam.rect.y = ( 1.0f - ratio ) / 2.0f + offset.y;
		cam.rect.height = ratio;
		cam.orthographicSize = Screen.width / ( 2.0f * zoome );
	}
	else{
		ratio = 1.0f / ratio;
		cam.rect.x = ( 1.0f - ratio ) / 2.0f + offset.x;
		cam.rect.width = ratio;
		cam.rect.y = 0.0f + offset.y;
		cam.rect.height = 1.0f;
		cam.orthographicSize = Screen.height / ( 2.0f * zoome );
	}
	
	rect = cam.rect;
}

function SetOffset( x : float, y : float )
{
	offset.x = x;
	offset.y = y;
}

@script AddComponentMenu( "Colorful-Pico Lib/Cross-Platform/Aspect Ratio Controller" )
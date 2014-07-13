#pragma strict

var targetFPS : int = 60;

function Awake()
{
	Application.targetFrameRate = targetFPS;
}

@script AddComponentMenu( "Colorful-Pico Lib/System/FPS Controller" )
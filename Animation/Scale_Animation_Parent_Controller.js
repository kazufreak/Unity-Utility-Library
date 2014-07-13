#pragma strict

class ScaleAnimationPattern
{
	var startTime : float = 0.0f;
	var endTime : float = 1.0f;
	var iniSize : Vector2 = Vector2( 0.0f, 0.0f );
	var targetSize : Vector2 = Vector2( 1.0f, 1.0f );
	var isCrossPlatform : boolean = false;
}

var childs : scale_animation_controller[];
var patterns : ScaleAnimationPattern[];

private var patternPlaying : int = 0;

function Start()
{
	childs = GetComponentsInChildren.<scale_animation_controller>();
}

function Update()
{

}

function StartAnimationIndex( idx : int )
{
	if( patterns.Length <= idx ){
		return;
	}

	patternPlaying = idx;
	for( var c : scale_animation_controller in childs ){
		c.startTime = patterns[ patternPlaying ].startTime;
		c.finishTime = patterns[ patternPlaying ].endTime;
		c.iniSize = patterns[ patternPlaying ].iniSize;
		c.targetSize = patterns[ patternPlaying ].targetSize;
		c.isCrossPlatform = patterns[ patternPlaying ].isCrossPlatform;
		c.StartAnimation();
	}
}

@script AddComponentMenu( "Colorful-Pico Lib/Animation/Scale Animation Parent Controller" )
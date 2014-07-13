#pragma strict

private var restTime : float = -0.1f;
private var patternPlaying : int = 0;

var sprite : SpriteRenderer;

class ColorAnimationPattern
{
	var startTime : float = 0.0f;
	var endTime : float = 0.0f;
	var iniColor : Color = Color( 1.0f, 1.0f, 1.0f, 1.0f );
	var targetColor : Color = Color( 1.0f, 1.0f, 1.0f, 1.0f );
}

var patterns : ColorAnimationPattern[];

function Start()
{
	
}

function Update()
{
	var interval : float;
	interval = patterns[ patternPlaying ].endTime - patterns[ patternPlaying ].startTime;

	if( restTime >= 0.0f ){
		if( interval >= restTime ){
			var iniColor : Color = patterns[ patternPlaying ].iniColor;
			var targetColor : Color = patterns[ patternPlaying ].targetColor;
			sprite.color = iniColor + ( targetColor - iniColor ) * ( interval - restTime ) / interval;
		}
		else{
			sprite.color = patterns[ patternPlaying ].iniColor;
		}
	}
	
	restTime -= Time.deltaTime;
	if( restTime < 0.0f ){
		restTime = 0.0f;
	}
}

function StartAnimation()
{
	StartAnimationIndex( 0 );
}

function StartAnimationIndex( idx : int )
{
	if( patterns.Length <= idx ){
		return;
	}
	
	if( restTime > 0.0f ){
		return;
	}
	
	patternPlaying = idx;
	restTime = patterns[ patternPlaying ].endTime;
}

@script AddComponentMenu( "Colorful-Pico Lib/Animation/Color Animation Controller" )
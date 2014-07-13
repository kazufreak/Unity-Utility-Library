#pragma strict

var finishTime : float = 1.0f;
var acceleration : Vector2 = Vector2( 0.0f, 0.0f );
var iniVelocity : Vector2 = Vector2( 0.0f, 0.0f );

var isCrossPlatform : boolean = true;

private var restTime : float = -0.1f;
private var velocity : Vector2 = Vector2( 0.0f, 0.0f );
private var patternPlaying : int = 0;

class MoveAnimationPattern
{
	var finishTime : float = 1.0f;
	var acceleration : Vector2 = Vector2( 0.0f, 0.0f );
	var iniVelocity : Vector2 = Vector2( 0.0f, 0.0f );
	var iniPos : Vector2 = Vector2( 0.0f, 0.0f );
	var isCrossPlatform : boolean = true;
}

var patterns : MoveAnimationPattern[];

function Start()
{
	
}

function Update()
{
	if( restTime >= 0.0f ){
		var dt : float;
		dt = finishTime - restTime;
		if( patterns[ patternPlaying ].isCrossPlatform ){
			var ctrl : Cross_Platfrom_GUI_Plane_Controller;
			ctrl = GetComponent( Cross_Platfrom_GUI_Plane_Controller );
			ctrl.x = patterns[ patternPlaying ].iniPos.x + patterns[ patternPlaying ].iniVelocity.x * dt + patterns[ patternPlaying ].acceleration.x * dt * dt / 2.0f;
			ctrl.y = patterns[ patternPlaying ].iniPos.y + patterns[ patternPlaying ].iniVelocity.y * dt + patterns[ patternPlaying ].acceleration.y * dt * dt / 2.0f;
		}
		else{
			transform.position.x = patterns[ patternPlaying ].iniPos.x + patterns[ patternPlaying ].iniVelocity.x * dt + patterns[ patternPlaying ].acceleration.x * dt * dt / 2.0f;
			transform.position.y = patterns[ patternPlaying ].iniPos.y + patterns[ patternPlaying ].iniVelocity.y * dt + patterns[ patternPlaying ].acceleration.y * dt * dt / 2.0f;
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

	patternPlaying = idx;
	restTime = patterns[ patternPlaying ].finishTime;
	velocity = patterns[ patternPlaying ].iniVelocity;
}

@script AddComponentMenu( "Colorful-Pico Lib/Animation/Move Animation Controller" )
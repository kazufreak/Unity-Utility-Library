#pragma strict

var cycle : float = 1.0f;
var sprite : SpriteRenderer;

private var time : float = 0.0f; 

function Start()
{
	time = 0.0f;
}

function Update()
{
	sprite.color.a = Mathf.Cos( Mathf.Deg2Rad * 360.0f * time / cycle );

	time += Time.deltaTime;
}

@script AddComponentMenu( "Colorful-Pico Lib/Animation/Blinking Animation Controller" )
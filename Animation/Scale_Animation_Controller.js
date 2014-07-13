#pragma strict

var startTime : float = 0.0f;
var finishTime : float = 1.0f;
var iniSize : Vector2 = Vector2( 1.0f, 1.0f );
var targetSize : Vector2 = Vector2( 1.0f, 1.0f );

var isCrossPlatform : boolean = true;

private var restTime : float = -0.1f;
//private var iniSize : Vector2 = Vector2( 0.0f, 0.0f );

function Start()
{
	restTime = -0.1f;
	iniSize = Vector2( 0.0f, 0.0f );
}

function Update()
{
	var interval : float;
	interval = finishTime - startTime;

	if( restTime >= 0.0f ){
		if( interval >= restTime ){
			if( isCrossPlatform ){
				var ctrl : Cross_Platfrom_GUI_Plane_Controller;
				ctrl = GetComponent( Cross_Platfrom_GUI_Plane_Controller );
				ctrl.width = iniSize.x + ( targetSize.x - iniSize.x ) * ( interval - restTime ) / interval;
				ctrl.height = iniSize.y + ( targetSize.y - iniSize.y ) * ( interval - restTime ) / interval;
			}
			else{
				transform.localScale.x = iniSize.x + ( targetSize.x - iniSize.x ) * ( interval - restTime ) / interval;
				transform.localScale.y = iniSize.y + ( targetSize.y - iniSize.y ) * ( interval - restTime ) / interval;
			}
		}
		else{
			if( isCrossPlatform ){
				ctrl = GetComponent( Cross_Platfrom_GUI_Plane_Controller );
				ctrl.width = iniSize.x;
				ctrl.height = iniSize.y;
			}
			else{
				transform.localScale.x = iniSize.x;
				transform.localScale.y = iniSize.y;
			}
		}
	}
	
	restTime -= Time.deltaTime;
	if( restTime < 0.0f ){
		restTime = 0.0f;
	}
}

function StartAnimation()
{
	/*if( isCrossPlatform ){
		var ctrl : Cross_Platfrom_GUI_Plane_Controller;
		ctrl = GetComponent( Cross_Platfrom_GUI_Plane_Controller );
		iniSize.x = ctrl.x;
		iniSize.y = ctrl.y;
	}
	else{
		iniSize.x = transform.localScale.x;
		iniSize.y = transform.localScale.y;
	}*/
	restTime = finishTime;
}

@script AddComponentMenu( "Colorful-Pico Lib/Animation/Scale Animation Controller" )
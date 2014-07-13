#pragma strict

var banner : NendAdBanner;
static var isResumeNeeded : boolean = false;

function Awake()
{
	banner = GetComponent( NendAdBanner );
}

function Start()
{
	if( isResumeNeeded ){
		banner.Show();
		banner.Resume();
		isResumeNeeded = false;
	}
}

function OnSceneChanged()
{
	banner.Hide();
	banner.Pause();
	isResumeNeeded = true;
}

@script AddComponentMenu( "Colorful-Pico Lib/Ad/Nend Ad Banner Controller" )
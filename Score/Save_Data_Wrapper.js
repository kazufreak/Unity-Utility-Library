#pragma strict

function LoadInt( key : String ) : int
{
	var val : int;
	
	val = PlayerPrefs.GetInt( key, -1 );
	Debug.Log( "Loaded - Key:" + key + " Value:" + val );
	
	return val;
}

function LoadFloat( key : String ) : float
{
	var val : float;
	
	val = PlayerPrefs.GetFloat( key, -1.0f );
	Debug.Log( "Loaded - Key:" + key + " Value:" + val );

	return val;
}

function SaveInt( key : String, val : int )
{
	Debug.Log( "Saved - Key:" + key + " Value:" + val );

	PlayerPrefs.SetInt( key, val );
}

function SaveFloat( key : String, val : float )
{
	Debug.Log( "Saved - Key:" + key + " Value:" + val );

	PlayerPrefs.SetFloat( key, val );
}

function DeleteAll()
{
	Debug.Log( "Deleted all data" );

	PlayerPrefs.DeleteAll();
}

@script AddComponentMenu( "Colorful-Pico Lib/Score/Save Data Wrapper" )
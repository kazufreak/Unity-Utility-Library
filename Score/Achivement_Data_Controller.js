#pragma strict

#if UNITY_IPHONE
import UnityEngine.SocialPlatforms;
#endif

#if UNITY_IPHONE
var authenticated : boolean = false;
var leaderboards : Array;
#endif

function Awake()
{
}

function Start()
{
#if UNITY_IPHONE
	leaderboards = new Array();
	authenticated = false;
#endif
}

function Update()
{

}

function Authenticate()
{
#if UNITY_IPHONE
	if( !authenticated ){
		Social.localUser.Authenticate( function ( succeeded : boolean ){
			if( succeeded ){
				Debug.Log(	"User: " + Social.localUser.userName +
							"\nUser ID: " + Social.localUser.id +
							"\nIsUnderange: " + Social.localUser.underage );
							
				for( var ldid : String in global_variables.LEADERBOARD_ID ){
					var ld : ILeaderboard;
					ld = Social.CreateLeaderboard();
					ld.id = ldid;
					leaderboards.Push( ld );
				}
				//Social.CreateLeaderboard();
				//Social.CreateLeaderboard().id = id;
				authenticated = true;
			}
			else{
				Debug.Log( "Authentication failed" );
			}
		} );
	}
#endif
}

function SaveData( data : long, leaderboardID : String )
{
#if UNITY_IPHONE
	//Social.localUser.Authenticate( function ( succeeded : boolean ){
	//	Social.CreateLeaderboard();
	if( !authenticated ){
		Authenticate();
	}
	if( authenticated ){
		//Social.CreateLeaderboard();
		//Social.CreateLeaderboard().id = leaderboardID;
				
		Social.ReportScore( data, leaderboardID, function ( succeeded : boolean ){
			if( succeeded ){
				Debug.Log( "OK:" + leaderboardID + "-" + data );		
			}
			else{
				Debug.Log( "Failed to save data." );
			}
		} );
	}
	//} );
#endif
}

@script AddComponentMenu( "Colorful-Pico Lib/Score/Achivement Data Controller" )
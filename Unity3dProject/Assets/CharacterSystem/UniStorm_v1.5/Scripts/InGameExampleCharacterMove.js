// Animates the position to move from start to end within one second

var start : Transform;
var end : Transform;

var character1 : GameObject;

//Put the object that has the UniStorm System script here
var uniStormScript : UniStormWeatherSystem;

function Update () {
    
    //If in-game hours are betwen 8:00 pm and 5:00 am activate night lights
		if (uniStormScript.hourCounter >= 19 && uniStormScript.hourCounter <= 24 || uniStormScript.hourCounter >= 0 && uniStormScript.hourCounter <= 5)
		{				
   			character1.transform.position = Vector3.Lerp(start.position, end.position, Time.time);
   		}
   		
   	 //If in-game hours are betwen 6:00 am and 7:00 pm deactivate night lights
		if (uniStormScript.hourCounter <= 18  && uniStormScript.hourCounter >= 6)
		{
   			character1.transform.position = Vector3.Lerp(end.position, start.position, Time.time);
   		}

}


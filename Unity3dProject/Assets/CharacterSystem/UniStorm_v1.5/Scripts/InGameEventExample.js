//UniStorm in-game event example 
//By Black Horizon Studios

//You light goes here, you can make more if needed
var nightLight : GameObject;
var nightLight2 : GameObject;
var nightLight3 : GameObject;
var nightLight4 : GameObject;
var nightLight5 : GameObject;

var character1 : GameObject;
var character2 : GameObject;
var character3 : GameObject;
var character4 : GameObject;
var character5 : GameObject;

var characterGhost : GameObject;
var characterGhostLight : GameObject;

var treasureChest : GameObject;

var cricketSound : GameObject;

//Put the object that has the UniStorm System script here
var uniStormScript : UniStormWeatherSystem;

function Update () {
	
	 //If in-game hours are betwen 8:00 pm and 5:00 am activate night lights
		if (uniStormScript.hourCounter >= 19 && uniStormScript.hourCounter <= 24 || uniStormScript.hourCounter >= 0 && uniStormScript.hourCounter <= 5)
		{				
   			nightLight.active = true;
   			nightLight2.active = true;
   			nightLight3.active = true;
   			nightLight4.active = true;
   			nightLight5.active = true;
   			
   			character1.active = false;
   			character2.active = false;
   			character3.active = false;
   			character4.active = false;
   			character5.active = false;
   			
   			cricketSound.active = true;
   			
   		}
   		
   	 //If in-game hours are betwen 6:00 am and 7:00 pm deactivate night lights
		if (uniStormScript.hourCounter <= 18  && uniStormScript.hourCounter >= 6)
		{
   			nightLight.active = false;
   			nightLight2.active = false;
   			nightLight3.active = false;
   			nightLight4.active = false;
   			nightLight5.active = false;
   			
   			characterGhost.active = false;
   			characterGhostLight.active = false;
   			
   			cricketSound.active = false;
   			
   			character1.active = true;
   			character2.active = true;
   			character3.active = true;
   			character4.active = true;
   			character5.active = true;
   		}
   		
   		
   		if (uniStormScript.weatherForecaster >= 2 && uniStormScript.weatherForecaster <= 3)
   		{
   			character1.active = false;
   			character2.active = false;
   			character3.active = false;
   			character4.active = false;
   			character5.active = false;
   			
   		}
   		
   		
   		if (uniStormScript.hourCounter >= 0 && uniStormScript.hourCounter <= 2)   		
   		{
   			characterGhost.active = true;
   			characterGhostLight.active = true;
   		}
   		
   		if (uniStormScript.hourCounter <= 24 && uniStormScript.hourCounter >= 3)   		
   		{
   			characterGhost.active = false;
   			characterGhostLight.active = false;
   		}
   		
   		
   		if (uniStormScript.hourCounter >= 1 && uniStormScript.hourCounter <= 2 && uniStormScript.dayCounter >= 1 && uniStormScript.dayCounter < 2)   		
   		{

   				treasureChest.active = true;

   		}
   		
   		if (uniStormScript.hourCounter <= 24 && uniStormScript.hourCounter >= 3 || uniStormScript.dayCounter >= 3 && uniStormScript.dayCounter <= 30)   		
   		{

   				treasureChest.active = false;

   		}

}
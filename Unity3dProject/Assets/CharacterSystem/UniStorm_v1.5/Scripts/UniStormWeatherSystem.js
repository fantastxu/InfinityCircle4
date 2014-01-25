//UniStormWeatherSystem Version 1.5.0 @ Copyright
//Black Horizon Studios

//Time keeping variables
var minuteCounter = 0;
var hourCounter = 0;
var dayCounter = 0;
var monthCounter = 0;
var yearCounter = 0;
var temperature = 0;
var dayLength : float;
var cloudSpeed : float;
var heavyCloudSpeed : float;
var timeStopped : boolean = false;
var staticWeather : boolean = false;
var instantWeather : boolean = false;
var timeScrollBar : boolean = false;
var horizonToggle : boolean = true;
var dynamicSnowEnabled : boolean = true;
var weatherCommandPromptUseable : boolean = false;
var startTime : float;
var moonPhaseChangeTime : float;
var weatherForecaster : float = 0;
private var stringToEdit : String = "0";

public var SnowAmount : float;

//Sun intensity control
var sunIntensity : float;
var maxSunIntensity : float; 

//Sun angle control
var sunAngle : float;

//Ambient light colors
var MorningAmbientLight : Color;
var MiddayAmbientLight : Color;
var DuskAmbientLight : Color;
var NightAmbientLight : Color;

//Background colors
private var backgroundNightColor : Color;
private var backgroundDuskColor : Color;
private var backgroundMorningColor : Color;
private var backgroundMiddayColor : Color;

//Sun colors
var SunMorning : Color;
var SunDay : Color;
var SunDusk : Color;
var SunNight : Color;

//Storm color variables
var stormyFogColorDay : Color;
var stormyFogColorDuskDawn : Color;
var stormyFogColorNight : Color;

//Horizon colors
var horizonMorning : Color;
var horizonDay : Color;
var horizonDusk : Color;
var horizonNight : Color;

//Fog colors
var fogMorningColor : Color;
var fogDayColor : Color;
var fogDuskColor : Color;
var fogNightColor : Color;

var fogDensity : float;

//Skyboxes
var SkyBoxMaterial1 : Material;
var SkyBoxMaterial2 : Material;

var MorningSkyboxTint : Color;
var MiddaySkyboxTint : Color;
var DuskSkyboxTint : Color;
var NightSkyboxTint : Color;

//Atmospheric colors
var MorningAtmosphericLight : Color;
var MiddayAtmosphericLight : Color;
var DuskAtmosphericLight : Color;

//Star System game objects
var starSphere : GameObject;
var starBrightness : Color;
var moonObject : GameObject;
var horizonObject : GameObject;
var moonPhases : Material[];

//private var changeInterval = 1;

//Clouds game objects
var lightClouds1 : GameObject;
var lightClouds2 : GameObject;
var lightClouds3 : GameObject;
var lightClouds4 : GameObject;
var lightClouds5 : GameObject;
var highClouds1 : GameObject;
var highClouds2 : GameObject;
var mostlyCloudyClouds : GameObject;
var heavyClouds : GameObject;
var heavyCloudsLayer1 : GameObject;
var heavyCloudsLayerLight : GameObject;

//Max rain particles
var maxLightRainIntensity : float = 400;
var maxLightRainMistCloudsIntensity : float = 4;
var maxStormRainIntensity : float = 1000;
var maxStormMistCloudsIntensity : float = 15;

var maxLightSnowIntensity : float = 400;
var maxLightSnowDustIntensity : float = 4;
var maxSnowStormIntensity : float = 1000;
var maxHeavySnowDustIntensity : float = 15;

//Weather game objects
var rain : GameObject;
var snow : GameObject;
var butterflies : GameObject;
var mistFog : GameObject;
var snowMistFog : GameObject;
var mistCloud : GameObject;
var windyLeaves : GameObject;
var windZone : GameObject;
var snowProjection : GameObject;
var snowProjectionObjects : GameObject;

var terrainObject : GameObject;

var sun : Light;
var sunCloudy : Light;

//Storm sound effects
var rainSound : GameObject;
var windSound : GameObject;
var windSnowSound : GameObject;
//var nightSound : GameObject;

var cameraThing : GameObject;

private var random : float;
private var random2 : float;
private var weatherOdds = 0;

//Our fade number values
private var sunRotate = 0;
private var fadeHorizonController : float = 0;
private var fadeHorizon : float = 0;
private var stormClouds : float = 0;
private var fade : float = 0;
private var fade2 : float = 0;
private var butterfliesFade : float = 0;
private var windyLeavesFade : float = 0;
private var fadeStormClouds : float = 0;
private var fadeStars : float = 0;
private var time : float = 0;
private var sunShaftFade : float = 0;
private var fadeCloudsNight : float = 0;
private var windControl : float = 0;
private var windControlUp : float = 0;
private var clearClouds : float = 0;
private var windSnowSoundHandler : float = 0;
private var dynamicSnowFade : float = 0;
private var overrideFog : boolean = false;

//1.6 weather helper variables
private var stormCounter : float = 0;
private var	forceStorm = 0;
private var changeWeather = 0;

//1.6 weather commands
private var foggy : String = "01";
private var lightRain_lightSnow : String = "02";
private var rainStorm_snowStorm : String = "03";
private var partlyCloudy1 : String = "04";
private var partlyCloudy2 : String = "05";
private var partlyCloudy3 : String = "06";
private var clear1 : String = "07";
private var clear2 : String = "08";
private var cloudy : String = "09";
private var mostlyCloudy : String = "001";
private var heavyRain : String = "002";
private var fallLeaves : String = "003";
private var butterfliesSummer : String = "004";
private var commandPromptActive : boolean = false;

//Rain particle density controls
private var minRainIntensity : float;
private var minFogIntensity : float;

//Snow particle density controls
private var minSnowIntensity : float;
private var minSnowFogIntensity : float;

//Priavte vars
private var calculate2 : float;
private var moonPhaseCalculator = 0;
private var moonPhaseCalculator2 = 0;
private var lockAxisZ : float = 0;
private var lockAxisY : float = 0;
private var Hour : float;
private var minuteCounterCalculator = 0.0;
private var yearCounterCalculator = 0.0;
private var cloudSpeedY : float;
private var cloudSpeedHighY : float;
private var sunShaftScript : SunShafts;
private var fogScript : GlobalFog;
//private var rainOnCamera : ImageRefractionEffect;
public var globalFogColor;
private var timeOfDay: float;

//Remove // below to enable background color control
//cameraThing.camera.clearFlags = CameraClearFlags.SolidColor;

function Start () {


}

function Update () {
	
	//Calculates all numbers for every system
	random = Random.Range(0,weatherOdds);
	random2 = Random.Range(1,weatherOdds);
	
	if (horizonToggle == false)
		{
			horizonObject.renderer.enabled = false;
		}
		
	if (horizonToggle == true)
		{
			horizonObject.renderer.enabled = true;
		}
	
	hourCounter = Hour;
	stormCounter += Time.deltaTime * .5;
	minuteCounterCalculator = Hour*60;
	minuteCounter = minuteCounterCalculator;   
	sunRotate = minuteCounter;
	cloudScrollSpeedCalculator = cloudSpeed * .001;
	heavCloudScrollSpeedCalculator = heavyCloudSpeed * .001;
	
	//Calculates the scroll speed of the clouds based on the daylength speed 
	//Any daylegnth between is set at fastforward scroll speed.
	if (dayLength >= 0 && dayLength <=9)
	{
	cloudSpeedY = .7;
	cloudSpeedHighY = .3;
	starSpeedY = .7;
	
	var offsetY = Time.time * cloudSpeedY;
	var offsetStormY = Time.time * cloudSpeedHighY;
	var offsetYHigh1 = Time.time * cloudSpeedHighY; 
	var offsetX = Time.time * starSpeedY; 
	heavyClouds.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetY); 
	heavyCloudsLayer1.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetY); 
	heavyCloudsLayerLight.renderer.sharedMaterial.mainTextureOffset = Vector2 (offsetStormY,offsetY); 
	lightClouds1.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetY);
	lightClouds2.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetYHigh1);
	lightClouds3.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetY);
	lightClouds4.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetYHigh1);
	lightClouds5.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetY);
	highClouds1.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetYHigh1);
	highClouds2.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetYHigh1);
	mostlyCloudyClouds.renderer.sharedMaterial.mainTextureOffset = Vector2 (offsetStormY,offsetY);
	starSphere.renderer.material.mainTextureOffset = Vector2 (offsetX,0);
	}
	
	//Any daylegnth between is set at fastforward scroll speed.
	if (dayLength >= 10 && dayLength <=19)
	{
	cloudSpeedY = .4;
	cloudSpeedHighY = .2;
	starSpeedY2 = .4;
	
	var offsetY2 = Time.time * cloudSpeedY; 
	var offsetYHigh2 = Time.time * cloudSpeedHighY;
	var offsetYHigh2a = Time.time * .055;
	var offsetX2 = Time.time * starSpeedY2; 
	heavyClouds.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetY2); 
	heavyCloudsLayer1.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetY2); 
	heavyCloudsLayerLight.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetY2); 
	lightClouds1.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetY2);
	lightClouds2.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetY2);
	lightClouds3.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetY2);
	lightClouds4.renderer.sharedMaterial.mainTextureOffset = Vector2 (offsetYHigh2a,offsetYHigh2);
	lightClouds5.renderer.sharedMaterial.mainTextureOffset = Vector2 (offsetYHigh2a,offsetYHigh2);
	highClouds1.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetYHigh2);
	highClouds2.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetYHigh2);
	mostlyCloudyClouds.renderer.sharedMaterial.mainTextureOffset = Vector2 (offsetYHigh2a,offsetY2);
	starSphere.renderer.material.mainTextureOffset = Vector2 (offsetX2,0);
	
	}
	
	//Any daylegnth between is set at fastforward scroll speed.
	if (dayLength >= 20 && dayLength <=29)
	{
	cloudSpeedY = .09;
	cloudSpeedHighY = .04;
	starSpeedY3 = .09;
	
	var offsetY3 = Time.time * cloudSpeedY;
	var offsetYHigh3 = Time.time * cloudSpeedHighY; 
	var offsetX3 = Time.time * starSpeedY3; 
	heavyClouds.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetY3); 
	heavyCloudsLayer1.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetY3); 
	heavyCloudsLayerLight.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetY3); 
	lightClouds1.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetY3);
	lightClouds2.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetYHigh3);
	lightClouds3.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetY3);
	lightClouds4.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetYHigh3);
	lightClouds5.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetY3);
	highClouds1.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetYHigh3);
	highClouds2.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetYHigh3);
	mostlyCloudyClouds.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetY3);
	starSphere.renderer.material.mainTextureOffset = Vector2 (offsetX3,0);
	}
	
	//Any daylegnth between is set at fastforward scroll speed.
	if (dayLength >= 30 && dayLength <=39)
	{
	cloudSpeedY = .04;
	cloudSpeedHighY = .02;
	starSpeedY4 = .04;
	
	var offsetY4 = Time.time * cloudSpeedY; 
	var offsetYHigh4 = Time.time * cloudSpeedHighY;
	var offsetX4 = Time.time * starSpeedY4; 
	heavyClouds.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetY4); 
	heavyCloudsLayer1.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetY4); 
	heavyCloudsLayerLight.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetY4); 
	lightClouds1.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetY4);
	lightClouds2.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetY4);
	lightClouds3.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetY4);
	lightClouds4.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetYHigh4);
	lightClouds5.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetYHigh4);
	highClouds1.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetYHigh4);
	highClouds2.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetYHigh4);
	mostlyCloudyClouds.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetY4);
	starSphere.renderer.material.mainTextureOffset = Vector2 (offsetX4,0);
	}
	
	
	//Any daylegnth after 40 is set at normal realtime scroll speed.
	if (dayLength >= 40)
	{
	cloudSpeedY = .003;
	cloudSpeedHighY = .0015;
	starSpeedY5 = .004;
	
	var offsetY5a = Time.time * cloudScrollSpeedCalculator;
	var offsetY5b = Time.time * heavCloudScrollSpeedCalculator;
	
	var offsetY5 = Time.time * cloudSpeedY;
	var offsetStormY5 = Time.time * starSpeedY5;
	var offsetYHigh5 = Time.time * cloudSpeedHighY;
	var offsetX5 = Time.time * starSpeedY5; 
	heavyClouds.renderer.sharedMaterial.mainTextureOffset = Vector2 (offsetY5b,offsetY5b); 
	heavyCloudsLayer1.renderer.sharedMaterial.mainTextureOffset = Vector2 (offsetY5b,0); 
	heavyCloudsLayerLight.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetY5b); 
	lightClouds1.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetY5a);
	lightClouds2.renderer.sharedMaterial.mainTextureOffset = Vector2 (offsetY5a,offsetY5a);
	lightClouds3.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetY5a);
	lightClouds4.renderer.sharedMaterial.mainTextureOffset = Vector2 (offsetY5a,offsetY5a);
	lightClouds5.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetY5a);
	highClouds1.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetYHigh5);
	highClouds2.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetYHigh5);
	mostlyCloudyClouds.renderer.sharedMaterial.mainTextureOffset = Vector2 (0,offsetY5);
	starSphere.renderer.sharedMaterial.mainTextureOffset = Vector2 (offsetX5,0 + .02);
	
	}
		
						
		//Calculates our minutes, hours, days, months, and years.
		
		//Calculates our days into months
		if(dayCounter >= 30)
		{
		dayCounter = dayCounter % 30;
		monthCounter += 1;
		}
		
		
		//Calculates our seasons
		if (monthCounter >= 2 && monthCounter <= 4)
		{
			//print("It's Spring");
			weatherOdds = dayLength * 43; //Set at 25, which needs to be 20ish, setting higher for video
			WeatherForecaster ();
			
		}
		
		//Calculates our seasons
		if (monthCounter >= 5 && monthCounter <= 7)
		{
			//print("It's Summer");
			weatherOdds = dayLength * 101; //Set at 25, which needs to be 20ish, setting higher for video
			WeatherForecaster ();
		}
		
		//Calculates our seasons
		if (monthCounter >= 8 && monthCounter <= 10)
		{
			//print("It's Fall");
			weatherOdds = dayLength * 46; //Set at 25, which needs to be 20ish, setting higher for video
			WeatherForecaster ();
		}
		
		//Calculates our seasons
		if (monthCounter >= 11 || monthCounter >= 0 && monthCounter <= 1)
		{
			//print("It's Winter");
			weatherOdds = dayLength * 33; //Set at 25, which needs to be 20ish, setting higher for video
			WeatherForecaster ();
		}
		
	//Controls wether the weather command prompt is enabled or disabled	
    if (weatherCommandPromptUseable == true)
	{
		if(Input.GetKeyDown(KeyCode.F12))
		{
			commandPromptActive = !commandPromptActive;
   	    }
  	} 
    
    if (weatherCommandPromptUseable == false)
	{ 
		commandPromptActive = false;
	}
		
	
		//Calculates our hours into days
		if(Hour >= 24)
		{
		startTime = 0;
		calculate2 = 0;
		Hour = 0;
		dayCounter += 1;
		forceStorm += 1;
		
		if (weatherForecaster == 3 || weatherForecaster == 2 || weatherForecaster == 12) 
		{
			changeWeather += 1; 
		}
		
		//Generates the temperature for Spring
		if (monthCounter >= 2 && monthCounter <= 4)
		{
			//Generate random temperature
		    temperature = Random.Range (45,60);
		}
		
		//Generates the temperature for Summer
		if (monthCounter >= 5 && monthCounter <= 7)
		{
			//Generate random temperature
		    temperature = Random.Range (80,100);
		}
		
		//Generates the temperature for Fall
		if (monthCounter >= 8 && monthCounter <= 10)
		{
			//Generate random temperature
		    temperature = Random.Range (40,60);
		}
		
		//Generates the temperature for Winter
		if (monthCounter >= 11 || monthCounter >= 0 && monthCounter <= 1)
		{
			//Generate random temperature
		    temperature = Random.Range (15,40);
		}
		
		
		}		

		//Calculates our moon phases

		//Don't change moon if there's no materials applied
		if (moonPhases.Length == 0)
       	  return;
		
			var index : int = Time.time / dayLength + moonPhaseChangeTime;
			
			//Take a modulo with materials count so that animation repeats
    		index = index % moonPhases.Length; 
    	
    		//Assign it to the renderer
    		moonObject.renderer.sharedMaterial = moonPhases[index];		

		
		
		//Rotates our sun using quaternion rotations so the angles don't coincide (sunAngle angles the sun based off the user's input)	
		sun.transform.rotation = Quaternion.AngleAxis(startTime * 360 - 90, Vector3.right + Vector3.up * sunAngle * .1);
	

		
		//Calculates our minutes into hours
		if(minuteCounter >= 60)
		{	
			minuteCounter = minuteCounterCalculator % 60;	
			//Picks our forecast randomly, if random generators are equal
			
	}
		//Calculates our months into years
		if (monthCounter >= 12)
		{
			monthCounter = monthCounter % 12;
			yearCounter += 1;
		}
		
	//If staticWeather is true, the weather will never change
	if (staticWeather == false)
	{	
		if (random == random2)
		{
		   //Controls our storms from switching too often
		   if (stormCounter >= 13)
		   {
		  	 weatherForecaster = Random.Range(1,11);
		  	 stormCounter = Random.Range (0,7);
		   }
		}
				
		}
		
	//Calculates our day length so it stays consistent	
	Hour = startTime*24;
	timeOfDay = calculate2*24;
	
	//If timeStopped is checked, time doesn't flow
	if (timeStopped == false)
		{	
			startTime = startTime +Time.deltaTime/dayLength;
		}
	
	//Fades the suns intencity for morning and evening
	sun.intensity = (calculate2-0.1) * sunIntensity;
	sunCloudy.intensity = (calculate2-0.35) * 3;
	
	if (sunIntensity <= 0)
			{
				sunIntensity = 0;
				sun.enabled = false;
				//sunCloudy.enabled = true;
			}
			
	if (sunIntensity >= maxSunIntensity)
			{
				sunIntensity = maxSunIntensity;		
				//sunCloudy.enabled = false;
			}

	
	//Keeps our calculations looping
	if(startTime < 0.5)
	{
		calculate2 = startTime;
	}
	if(startTime > 0.5)
	{
		calculate2 = (1-startTime);
	}
	
	/*
	//Controls our weather so it doesn't change unrealistically
	if (stormCounter >= 10)
	{
		stormCounter = Random.Range (0,1);
	}
	*/
	
	//Forces precipitation if none has happened in an in-game week, prevents drouts
	if (forceStorm >= 7)
	{
		if (staticWeather == false)
		{	
			weatherForecaster = Random.Range(2,3);
			forceStorm = 0;
		}
	}
	
	//Changes our weather type if there has been precipitation for more than 3 in-game days
	if (changeWeather >= 4)
	{
		if (staticWeather == false)
		{	
			weatherForecaster = Random.Range(4,11);
			changeWeather = 0;
		}
	}
	
	//Calculates night
	if(timeOfDay<4){
	RenderSettings.ambientLight = NightAmbientLight;
	cameraThing.camera.backgroundColor = Color.Lerp (backgroundNightColor, backgroundNightColor, (timeOfDay/2)-2);
	sun.color = Color.Lerp (SunNight, SunNight, (timeOfDay/2)-2);	
	starSphere.renderer.sharedMaterial.SetColor ("_TintColor",  starBrightness * fadeStars);
	RenderSettings.fogColor = Color.Lerp (stormyFogColorNight, stormyFogColorNight, (timeOfDay/2)-2);
	//nightSound.audio.volume = 1;
	
	//Test blend skybox
	RenderSettings.skybox = SkyBoxMaterial1;
	RenderSettings.skybox.SetFloat("_Blend", 0);
	SkyBoxMaterial1.SetColor ("_Tint", NightSkyboxTint);

	horizonObject.renderer.material.color = Color.Lerp (horizonNight, horizonNight, (timeOfDay/2)-2);
	//horizonObject.renderer.material.color.a = .96;
	
	fogScript = cameraThing.camera.GetComponent(GlobalFog);
	fogScript.globalFogColor = Color.Lerp (stormyFogColorNight, stormyFogColorNight, (timeOfDay/2)-2);
	
	//fadeHorizon.renderer.sharedMaterial.color = Color.Lerp (horizonNightColor, horizonNightColor, (timeOfDay/2)-2);
	
	fadeStars = 1;

	}
	
	//Calculates dusk
	if(timeOfDay>4&&timeOfDay<6){
	RenderSettings.ambientLight = Color.Lerp (NightAmbientLight, DuskAmbientLight, (timeOfDay/2)-2);
	cameraThing.camera.backgroundColor  = Color.Lerp (backgroundNightColor, backgroundDuskColor, (timeOfDay/2)-2);
	sun.color = Color.Lerp (SunNight, SunDusk, (timeOfDay/2)-2);
	RenderSettings.fogColor = Color.Lerp (fogNightColor, fogDuskColor, (timeOfDay/2)-2);
	
	//Test skybox
	RenderSettings.skybox=SkyBoxMaterial1;
	RenderSettings.skybox.SetFloat("_Blend", 0);
	RenderSettings.skybox.SetFloat("_Blend", (timeOfDay/2)-2);
	SkyBoxMaterial1.SetColor ("_Tint", Color.Lerp (NightSkyboxTint, DuskSkyboxTint, (timeOfDay/2)-2) );
	
	horizonObject.renderer.material.color = Color.Lerp (horizonNight, horizonDusk, (timeOfDay/2)-2);
	//horizonObject.renderer.material.color.a = .96;
	
	fogScript = cameraThing.camera.GetComponent(GlobalFog);
	fogScript.globalFogColor = Color.Lerp (stormyFogColorNight, stormyFogColorDuskDawn, (timeOfDay/2)-2);
	
	sunShaftScript = cameraThing.camera.GetComponent (SunShafts);
   	sunShaftScript.sunColor = Color.Lerp (MorningAtmosphericLight, DuskAtmosphericLight, (timeOfDay/2)-2);
   	
   	//fadeHorizon.renderer.sharedMaterial.color = Color.Lerp (horizonNightColor, horizonDuskColor, (timeOfDay/2)-2);
	
	  	//Unfades the stars for dusk
		fadeStars += Time.deltaTime * .14;
  		starSphere.renderer.sharedMaterial.SetColor ("_TintColor",  starBrightness * fadeStars);
  		
  		
  		if (fadeStars >= 1)
  		{
  			fadeStars = 1;
  		}
	
	}
	
	//Calculates morning
	if(timeOfDay>6&&timeOfDay<8){
		RenderSettings.ambientLight = Color.Lerp (DuskAmbientLight, MorningAmbientLight, (timeOfDay/2)-3);
		cameraThing.camera.backgroundColor  = Color.Lerp (backgroundDuskColor, backgroundMorningColor, (timeOfDay/2)-3);
		sun.color = Color.Lerp (SunDusk, SunMorning, (timeOfDay/2)-3);
		RenderSettings.fogColor = Color.Lerp (fogDuskColor, fogMorningColor, (timeOfDay/2)-3);
		//nightSound.audio.volume = 0;
	
	//Test skybox
		RenderSettings.skybox=SkyBoxMaterial2;
		RenderSettings.skybox.SetFloat("_Blend", 0);
		RenderSettings.skybox.SetFloat("_Blend", (timeOfDay/2)-3);
		SkyBoxMaterial2.SetColor ("_Tint", Color.Lerp (DuskSkyboxTint, MorningSkyboxTint, (timeOfDay/2)-3) );
		
		horizonObject.renderer.material.color = Color.Lerp (horizonDusk, horizonMorning, (timeOfDay/2)-3);
		//horizonObject.renderer.material.color.a = .96;
	
		fogScript = cameraThing.camera.GetComponent(GlobalFog);
		fogScript.globalFogColor = Color.Lerp (stormyFogColorDuskDawn, stormyFogColorDuskDawn, (timeOfDay/2)-3);
	
		sunShaftScript = cameraThing.camera.GetComponent (SunShafts);
   		sunShaftScript.sunColor = Color.Lerp (DuskAtmosphericLight, MorningAtmosphericLight, (timeOfDay/2)-3);
   	
   		//fadeHorizon.renderer.sharedMaterial.color = Color.Lerp (horizonDuskColor, horizonMorningColor, (timeOfDay/2)-3);
	
	  	//Fades the stars on morning
		fadeStars -= Time.deltaTime * .17;
  		starSphere.renderer.sharedMaterial.SetColor ("_TintColor",  starBrightness * fadeStars);
  		
  		if (fadeStars <= 0)
  		{
  			fadeStars = 0;
  		}

	}
	
	//Calculates day
	if(timeOfDay>8&&timeOfDay<10){
		RenderSettings.ambientLight = Color.Lerp (MorningAmbientLight, MiddayAmbientLight, (timeOfDay/2)-4);
		cameraThing.camera.backgroundColor  = Color.Lerp (backgroundMorningColor, backgroundMiddayColor, (timeOfDay/2)-4);
		sun.color = Color.Lerp (SunMorning, SunDay, (timeOfDay/2)-4);
		starSphere.renderer.sharedMaterial.SetColor ("_TintColor",  starBrightness * fadeStars);
		RenderSettings.fogColor = Color.Lerp (fogMorningColor, fogDayColor, (timeOfDay/2)-4);
		//nightSound.audio.volume = 0;
	
		//Skybox
		RenderSettings.skybox=SkyBoxMaterial2;
		RenderSettings.skybox.SetFloat("_Blend", 1);
		SkyBoxMaterial2.SetColor ("_Tint", Color.Lerp (MorningSkyboxTint, MiddaySkyboxTint,  (timeOfDay/2)-4) );
		
		//Horizon
		horizonObject.renderer.material.color = Color.Lerp (horizonMorning, horizonDay, (timeOfDay/2)-4);
		//horizonObject.renderer.material.color.a = .96;
	
		fogScript = cameraThing.camera.GetComponent(GlobalFog);
		fogScript.globalFogColor = Color.Lerp (stormyFogColorDuskDawn, stormyFogColorDay, (timeOfDay/2)-4);
	
		sunShaftScript = cameraThing.camera.GetComponent (SunShafts);
   		sunShaftScript.sunColor = Color.Lerp (MorningAtmosphericLight, MiddayAtmosphericLight, (timeOfDay/2)-4);
   	
   		//fadeHorizon.renderer.sharedMaterial.color = Color.Lerp (horizonMorningColor, horizonDayColor, (timeOfDay/2)-4);
	
		fadeStars = 0;
	
   }

}

function WeatherForecaster () {
  		
  		//Foggy 
 		if (weatherForecaster == 1)
 		{
			fade += Time.deltaTime * .04;
			fade2 += Time.deltaTime * .04;
			butterfliesFade -= .04;
			windyLeavesFade -= .04;
			fadeStormClouds -= Time.deltaTime * .04;
			windControl += Time.deltaTime * .01;
			time += Time.deltaTime * .14;
			sunShaftFade -= Time.deltaTime * .14;
			minRainIntensity -= 1;
			minFogIntensity -= .04;
			minSnowFogIntensity -= .01;	
			minSnowIntensity -= .9;
			stormClouds -= Time.deltaTime * .011;
			light.enabled = false;
			sunIntensity -= .005;
			overrideFog = true;
			dynamicSnowFade -= Time.deltaTime * .0095;
			
			RenderSettings.fogDensity -= .00017 * Time.deltaTime;
   			
   			if (RenderSettings.fogDensity <= .0005)
   			{
   				RenderSettings.fogDensity = .0005;
   			}
			
			heavyClouds.renderer.material.color.a = fade;
			heavyCloudsLayer1.renderer.material.color.a = fade2;	
			heavyCloudsLayerLight.renderer.material.color.a = fade2;	
			
			if (fade2 >= .25)
  				{
					fade2 = .25;
  			    }
  			    
  			if (dynamicSnowFade <= .25)
  			{
  				dynamicSnowFade = .25;
  			}
  			
  			if (dynamicSnowEnabled == true)
  			{
  			snowScript = terrainObject.GetComponent (CustomTerrainScriptAtsV3Snow);
   			snowScript.SnowAmount = dynamicSnowFade;
   			}
  			
  			//Fade out our butterflies
  			butterflies.particleEmitter.minEmission = butterfliesFade;
  			butterflies.particleEmitter.maxEmission = butterfliesFade;
  			
  			if (butterfliesFade <= 0)
  			{
  				butterfliesFade = 0;
  			}
  			
  			if (windyLeavesFade <= 0)
  			{
  				windyLeavesFade = 0;
  			}
  			
  			//Handles our particles
  			snow.particleEmitter.minEmission = minSnowIntensity;
			snow.particleEmitter.maxEmission = minSnowIntensity;
			
			snowMistFog.particleEmitter.minEmission = minSnowFogIntensity;
			snowMistFog.particleEmitter.maxEmission = minSnowFogIntensity;
  			
  			rain.particleEmitter.minEmission = minRainIntensity;
			rain.particleEmitter.maxEmission = minRainIntensity;
			
			mistFog.particleEmitter.minEmission = minFogIntensity;
			mistFog.particleEmitter.maxEmission = minFogIntensity;	
			
			windyLeaves.particleEmitter.minEmission = windyLeavesFade;
			windyLeaves.particleEmitter.maxEmission = windyLeavesFade;	
  			
			//Fades our fog
			fogScript = cameraThing.camera.GetComponent(GlobalFog);
   			fogScript.globalDensity += .0005 * Time.deltaTime;
   			fogScript.startDistance -= 5 * Time.deltaTime;
   			
   			
   			if (fogScript.globalDensity >= .007)
   			{
   				fogScript.globalDensity = .007;
   			}
   			
   			if (fogScript.startDistance <= 30)
   			{
   				fogScript.startDistance = 30;
   			}
   			
   			//Keep snow from going below 0
  			if (minSnowIntensity <= 0)
  			{
  				minSnowIntensity = 0;
  			}
  			
  			//Keep snow fog from going below 0
  			if (minSnowFogIntensity <= 0)
  			{
  				minSnowFogIntensity = 0;
  			}
   			
   			sunShaftScript = cameraThing.camera.GetComponent (SunShafts);
   			//rainOnCamera = cameraThing.camera.GetComponent(ImageRefractionEffect);
   			sunShaftScript.sunShaftIntensity = sunShaftFade;
  			
  			rainSound.audio.volume -= Time.deltaTime * .07;
  			windSound.audio.volume -= Time.deltaTime * .01;
  			windSnowSound.audio.volume -= Time.deltaTime * .04;		
  			
  			GetComponent(UniStorm).enabled = false;
  			
  			if (fadeStormClouds <= 0)
  			{
  				fadeStormClouds = 0;
  			}
  			
  			if (stormClouds <= 0)
  			{
  				stormClouds = 0;
  			}
  			
  			//Calculates our wind making it lessen		
  			if (minRainIntensity <= 0)
  				{
  					minRainIntensity = 0;
  					//Keeps our wind at 0 if there hasn't been a storm
					windZone.transform.rotation = Quaternion.AngleAxis(0, Vector3.up);
				
					if (windZone.transform.eulerAngles.y <= 0)
					{
						windZone.transform.eulerAngles.y = 1;
			   		 }
				
  				}
  				
  			if (minRainIntensity >= 1)
				{
					//Makes our wind weaker for when the storm ends
					 windZone.transform.Rotate(-Vector3.up * Time.deltaTime * 5);
			
					if (windZone.transform.eulerAngles.y <= 1)
					{
						windZone.transform.eulerAngles.y = 0;
					}
			
				}
  			
  			 //Keeps our fade numbers from going below 0	
  		     if (minFogIntensity <= 0)
  				{
  					minFogIntensity = 0;
  					sun.enabled = true;
					sunCloudy.enabled = false;
  				}
  		
  				if (fade >= .5)
  				{
  				    sun.enabled = true;
					sunCloudy.enabled = false;
  				}
  		
  			 if (fade >= 1)
  				{
  					fade = 1;
  				}
  				
  				if (minRainIntensity <= 50)
  				{
  				//rainOnCamera.enabled = false;
  				}
  				
  			if (fade >= .3)
  				{
  				    sun.enabled = true;
					sunCloudy.enabled = false;
  				}	
  				
  			if (time >= 1)
  				{
  					time = 1;
  				}
  				
  				if (sunShaftFade <= 0)
  				{
  					sunShaftFade = 0;
  				}
  				
  		    //If the game speed is fast fade clouds instantly	
  			if (dayLength >= 0 && dayLength <=15) 
  			 	{
  					fade = 1;
  				}
  		}
  		
  		
  		 //Light Snow / Light Rain
 		if (weatherForecaster == 2)
 		{
 		
 		if (temperature <= 32)
 			{
 				
			fade += Time.deltaTime * .04;
			fade2 += Time.deltaTime * .04;
			butterfliesFade -= .04;
			windyLeavesFade -= .04;
			fadeHorizonController += Time.deltaTime * .04;
			fadeStormClouds += Time.deltaTime * .04;
			time += Time.deltaTime * .0014;
			windControlUp += 1;
			sunShaftFade -= Time.deltaTime * .14;
			minRainIntensity -= .2;
			minSnowIntensity += .2;
			minFogIntensity -= .008;
			minSnowFogIntensity += .008;	
			stormClouds += Time.deltaTime * .011;
			windSnowSoundHandler += Time.deltaTime * .01;
			dynamicSnowFade += Time.deltaTime * .0008;
			
			//Slowly increases the wind to make it stronger fort the storm
			if (minRainIntensity >= 1)
				{
  					//Makes our wind stronger for the storm
					windZone.transform.Rotate(Vector3.up * Time.deltaTime * 3);
					windZone.gameObject.active = true;
				}
			
			if (windZone.transform.eulerAngles.y >= 180)
				{
					windZone.transform.eulerAngles.y = 180;
				}
		
			
			//Fades in storm clouds
			heavyClouds.renderer.material.color.a = fade;	
			heavyCloudsLayer1.renderer.material.color.a = fade2;	
			heavyCloudsLayerLight.renderer.material.color.a = fade2;	
			
			if (fade2 >= .25)
  				{
					fade2 = .25;
  			    }
  			    
  			if (dynamicSnowFade >= .59)
  			{
  				dynamicSnowFade = .59;
  			}
  			
  			
  			if (dynamicSnowEnabled == true)
  			{
  			snowScript = terrainObject.GetComponent (CustomTerrainScriptAtsV3Snow);
   			snowScript.SnowAmount = dynamicSnowFade;
   			}
  			
  			//Fade out our butterflies
  			butterflies.particleEmitter.minEmission = butterfliesFade;
  			butterflies.particleEmitter.maxEmission = butterfliesFade;
  			
  			if (butterfliesFade <= 0)
  			{
  				butterfliesFade = 0;
  			}
  			
  			if (windyLeavesFade <= 0)
  			{
  				windyLeavesFade = 0;
  			}
  			
  			//Handles our particles
  			snow.particleEmitter.minEmission = minSnowIntensity;
			snow.particleEmitter.maxEmission = minSnowIntensity;
			
			snowMistFog.particleEmitter.minEmission = minSnowFogIntensity;
			snowMistFog.particleEmitter.maxEmission = minSnowFogIntensity;	
			
			rain.particleEmitter.minEmission = minRainIntensity;
			rain.particleEmitter.maxEmission = minRainIntensity;
			
			mistFog.particleEmitter.minEmission = minFogIntensity;
			mistFog.particleEmitter.maxEmission = minFogIntensity;	
			
			windyLeaves.particleEmitter.minEmission = windyLeavesFade;
			windyLeaves.particleEmitter.maxEmission = windyLeavesFade;	
  			
  			//Fades our fog in

   			//rainOnCamera = cameraThing.camera.GetComponent(ImageRefractionEffect);
   	
   			RenderSettings.fogDensity -= .00012 * Time.deltaTime;
   			
   			if (RenderSettings.fogDensity <= .0006)
   			{
   				RenderSettings.fogDensity = .0006;
   				fogScript = cameraThing.camera.GetComponent(GlobalFog);
   				fogScript.globalDensity += .0008 * Time.deltaTime;
   				fogScript.startDistance -= 5 * Time.deltaTime;
   				
   			if (fogScript.startDistance <= 30)
   			{
   				fogScript.startDistance = 30;
   				fogScript.globalDensity -= .0005 * Time.deltaTime;
   			}
   				
		    if (overrideFog == false)
		    {
		    
		       fogScript.globalDensity += .0005 * Time.deltaTime;
		    
   			if (fogScript.globalDensity >= .0038)
   			    {   			    
   					fogScript.globalDensity = .0038;
   			    }
   			  }
   			}
   			
   			if (overrideFog == true)
		    {
		    	fogScript.globalDensity -= .001 * Time.deltaTime;
		    	
		    	if (fogScript.globalDensity <= .0038)
   			    {   			    
   					fogScript.globalDensity = .0038;
   			    }
		    }
   					
   			//Fades the sunshafts in
   			sunShaftScript = cameraThing.camera.GetComponent (SunShafts);
   			sunShaftScript.sunShaftIntensity = sunShaftFade;
  			
  			rainSound.audio.volume -= Time.deltaTime * .01;
  			windSnowSound.audio.volume -= Time.deltaTime * .04;
			windSound.audio.volume -= Time.deltaTime * .01;
			
			if (windSnowSoundHandler >= 0.5)
			{
				windSnowSoundHandler = 0.5;
			}
			
			//Acivates UniStorm system
  			GetComponent(UniStorm).enabled = false;
  			
  			
  			//Keep rain from going below 0
  			if (minRainIntensity <= 0)
  			{
  				minRainIntensity = 0;
  			}
  			
  			//Keep fog from going below 0
  			if (minFogIntensity <= 0)
  			{
  				minFogIntensity = 0;
  			}
  			
  			//Keeps our snow level maxed at users input
  			if (minSnowIntensity >= maxLightSnowIntensity)
  			{
  				minSnowIntensity = maxLightSnowIntensity;
  			}
  			
  			//Keeps our snow fog level maxed at users input
  			if (minSnowFogIntensity >= maxLightSnowDustIntensity)
  			{
  				minSnowFogIntensity = maxLightSnowDustIntensity;
  			}
  			
  			if (minRainIntensity >= 50)
  			{
  				//rainOnCamera.enabled = true;
  			}
  		
  			if (stormClouds >= .55)
  			{
  				stormClouds = .55;
  			}
  			
  			if (fade >= .40)
  				{
  				    sun.enabled = false;
					sunCloudy.enabled = true;
  				}
  				
  			if (fade >= .4)
  				{
					//fadeHorizon.renderer.enabled = false;
  				}
  				
  			
  			
  			 if (fade >= 1)
  				{
  					fade = 1;
  				}
  				
  		   if (fadeStormClouds >= 1)
  				{
  					fadeStormClouds = 1;
  				}
  				
  				
  			 if (sunShaftFade <= .1)
  				{
  					sunShaftFade = 0;
  				}	
  				
  				
  			 if (time >= 1)
  				{
  					time = 1;
  				}
  				
  		    //If the game speed is fast forward fade clouds instantly	
  			if (dayLength >= 0 && dayLength <=15) 
  			 	{
  					fade = 1;
  				}
  			}
  		
  		//Light Rain	
  		if (temperature >= 33)
  		{
			fade += Time.deltaTime * .04;
			fade2 += Time.deltaTime * .04;
			butterfliesFade -= .04;
			windyLeavesFade -= .04;
			fadeStormClouds += Time.deltaTime * .04;
			fadeHorizon -= .4;
			windControl += Time.deltaTime * .009;
			time += Time.deltaTime * .14;
			sunShaftFade -= Time.deltaTime * .14;
			minRainIntensity += .2;
			minFogIntensity += .002;
			minSnowFogIntensity -= .01;	
			minSnowIntensity -= .9;
			stormClouds += Time.deltaTime * .011;
			overrideFog = false;
			dynamicSnowFade -= Time.deltaTime * .0095;
			
			heavyClouds.renderer.material.color.a = fade;
			heavyCloudsLayer1.renderer.material.color.a = fade2;	
			heavyCloudsLayerLight.renderer.material.color.a = fade2;
			
			
			if (fadeHorizon <= 0)
			{
				fadeHorizon = 0;
			}
			
			if (fade2 >= .25)
  				{
					fade2 = .25;
  			    }
  			    
  			    
  			if (dynamicSnowFade <= .25)
  			{
  				dynamicSnowFade = .25;
  			}
  			
  			
  			if (dynamicSnowEnabled == true)
  			{
  			snowScript = terrainObject.GetComponent (CustomTerrainScriptAtsV3Snow);
   			snowScript.SnowAmount = dynamicSnowFade;
   			}
  			   
  			//Fade out our butterflies
  			butterflies.particleEmitter.minEmission = butterfliesFade;
  			butterflies.particleEmitter.maxEmission = butterfliesFade;
  			
  			if (butterfliesFade <= 0)
  			{
  				butterfliesFade = 0;
  			}
  			
  			//Handles our particles
  			snow.particleEmitter.minEmission = minSnowIntensity;
			snow.particleEmitter.maxEmission = minSnowIntensity;
			
			snowMistFog.particleEmitter.minEmission = minSnowFogIntensity;
			snowMistFog.particleEmitter.maxEmission = minSnowFogIntensity;
  			
  			rain.particleEmitter.minEmission = minRainIntensity;
			rain.particleEmitter.maxEmission = minRainIntensity;
			
			mistFog.particleEmitter.minEmission = minFogIntensity;
			mistFog.particleEmitter.maxEmission = minFogIntensity;	
			
			windyLeaves.particleEmitter.minEmission = windyLeavesFade;
			windyLeaves.particleEmitter.maxEmission = windyLeavesFade;	
   			
   			sunShaftScript = cameraThing.camera.GetComponent (SunShafts);
   			sunShaftScript.sunShaftIntensity = sunShaftFade;
   			
   			
   			//Fades our fog
			fogScript = cameraThing.camera.GetComponent(GlobalFog);
			//rainOnCamera = cameraThing.camera.GetComponent(ImageRefractionEffect);
   			fogScript.globalDensity -= .0005 * Time.deltaTime;
   			fogScript.startDistance += 5 * Time.deltaTime;
   			
   			RenderSettings.fogDensity -= .0005 * Time.deltaTime;
   			
   			if (RenderSettings.fogDensity <= .0005)
   			{
   				RenderSettings.fogDensity = .0005;
   			}
   				
   			if (fogScript.globalDensity <= 0)
   			{
   				fogScript.globalDensity = 0;
   			}
   			
   			
   			if (fogScript.startDistance >= 300)
   			{
   				fogScript.startDistance = 300;
   			}
   			
   			//Keep snow from going below 0
  			if (minSnowIntensity <= 0)
  			{
  				minSnowIntensity = 0;
  			}
  			
  			//Keep snow fog from going below 0
  			if (minSnowFogIntensity <= 0)
  			{
  				minSnowFogIntensity = 0;
  			}
 			
  			rainSound.audio.volume += Time.deltaTime * .01;
  			windSound.audio.volume += Time.deltaTime * .01;
  			windSnowSound.audio.volume -= Time.deltaTime * .04;
  			
  			//Makes our wind light for the light rain forecast
  			if (minRainIntensity >= 1)
			{
  				//Makes our wind stronger for the storm
				windZone.transform.Rotate(-Vector3.up * Time.deltaTime * 3);
			}
			
			if (windZone.transform.eulerAngles.y <= 10)
			{
				windZone.transform.eulerAngles.y = 1;
			}
			
  			
  			GetComponent(UniStorm).enabled = false;
  			
  			    if (sunShaftFade <= 0)
  				{
  					sunShaftFade = 0;
  				}
  			
  			if (stormClouds >= .55)
  			{
  				stormClouds = .55;
  			}
  			
  			
  			if (minRainIntensity >= maxLightRainIntensity)
  			{
  				minRainIntensity = maxLightRainIntensity;
  			}
  			
  			if (minRainIntensity >= 50)
  			{
  				//rainOnCamera.enabled = true;
  			}
  			
  			if (minFogIntensity >= maxLightRainMistCloudsIntensity)
  			{
  				minFogIntensity = maxLightRainMistCloudsIntensity;
  			}
  			
  			if (fade >= .15)
  				{
  				    sun.enabled = false;
					sunCloudy.enabled = true;
  				}
  			 
  			 //Gradually fades our rain effects in
  			 if (fade >= 1)
  				{
  					fade = 1;
  				}
  				
  			if (fadeStormClouds >= 1)
  			{
  				fadeStormClouds = 1;
  			}
  				
  			//This keeps the sound levels low because this is just a little rain	
  			  if (windSound.audio.volume >= .0)
  				{
  					windSound.audio.volume = .0;
  				}
  				
  			  if (rainSound.audio.volume >= .3)
  				{
  					rainSound.audio.volume = .3;
  				}
  				
  			//This keeps the fog level low because it isn't a storm	
  			if (time >= .5)
  				{
  					time = .5;
  				}
  				
  			//If the game speed is fast unfade clouds instantly	
  			if (dayLength >= 0 && dayLength <=15) 
  			 	{
  					fade = 1;
  				}
  			}
  		}
  		
  		
    	//Heavy Snow
 		if (weatherForecaster == 3)
 		{
 		if (temperature <= 32)
 			{
 				
			fade += Time.deltaTime * .04;
			fade2 += Time.deltaTime * .04;
			butterfliesFade -= .04;
			windyLeavesFade -= .04;
			fadeHorizonController += Time.deltaTime * .04;
			fadeStormClouds += Time.deltaTime * .04;
			time += Time.deltaTime * .0014;
			windControlUp += 1;
			sunShaftFade -= Time.deltaTime * .14;
			minRainIntensity -= .2;
			minSnowIntensity += .4;
			minFogIntensity -= .008;
			minSnowFogIntensity += .01;	
			stormClouds += Time.deltaTime * .011;
			dynamicSnowFade += Time.deltaTime * .0012;
			sunIntensity -= .005;
			
			
			//Slowly increases the wind to make it stronger for the storm
			if (minSnowIntensity >= 50)
			{
  				//Makes our wind stronger for the storm
				windZone.transform.Rotate(Vector3.up * Time.deltaTime * 3);
				windZone.gameObject.active = true;
			}
			
			if (windZone.transform.eulerAngles.y >= 180)
			{
				windZone.transform.eulerAngles.y = 180;
			}
		
			
			//Fades in storm clouds
			heavyClouds.renderer.material.color.a = fade;
			heavyCloudsLayer1.renderer.material.color.a = fade2;	
			heavyCloudsLayerLight.renderer.material.color.a = fade2;	
			
			if (fade2 >= .25)
  				{
					fade2 = .25;
  			    }
			
			
			
			//Fade out our butterflies
  			butterflies.particleEmitter.minEmission = butterfliesFade;
  			butterflies.particleEmitter.maxEmission = butterfliesFade;
  			
  			if (butterfliesFade <= 0)
  			{
  				butterfliesFade = 0;
  			}
  			
  			if (windyLeavesFade <= 0)
  			{
  				windyLeavesFade = 0;
  			}
  			
  			//Handles our particles
  			snow.particleEmitter.minEmission = minSnowIntensity;
			snow.particleEmitter.maxEmission = minSnowIntensity;
			
			snowMistFog.particleEmitter.minEmission = minSnowFogIntensity;
			snowMistFog.particleEmitter.maxEmission = minSnowFogIntensity;	
			
			rain.particleEmitter.minEmission = minRainIntensity;
			rain.particleEmitter.maxEmission = minRainIntensity;
			
			mistFog.particleEmitter.minEmission = minFogIntensity;
			mistFog.particleEmitter.maxEmission = minFogIntensity;	
			
			windyLeaves.particleEmitter.minEmission = windyLeavesFade;
			windyLeaves.particleEmitter.maxEmission = windyLeavesFade;		
  			
  			//Fades our fog in

   			//rainOnCamera = cameraThing.camera.GetComponent(ImageRefractionEffect);
   			
   			//fadeHorizonStorm.renderer.material.color.a = fadeHorizonController;	
   			RenderSettings.fogDensity -= .00012 * Time.deltaTime;
   			
   			if (RenderSettings.fogDensity <= .0006)
   			{
   				RenderSettings.fogDensity = .0006;
   				fogScript = cameraThing.camera.GetComponent(GlobalFog);
   				fogScript.globalDensity += .0008 * Time.deltaTime;
   				fogScript.startDistance -= 5 * Time.deltaTime;
   				
   			if (fogScript.startDistance <= 30)
   			{
   				fogScript.startDistance = 30;
   				fogScript.globalDensity -= .0005 * Time.deltaTime;
   			}
   				
		    if (overrideFog == false)
		    {
		    
		       fogScript.globalDensity += .0005 * Time.deltaTime;
		    
   			if (fogScript.globalDensity >= .0038)
   			    {   			    
   					fogScript.globalDensity = .0038;
   			    }
   			  }
   			}
   			
   			if (overrideFog == true)
		    {
		    	fogScript.globalDensity -= .001 * Time.deltaTime;
		    	
		    	if (fogScript.globalDensity <= .0038)
   			    {   			    
   					fogScript.globalDensity = .0038;
   			    }
		    }
   			
   			if (dynamicSnowEnabled == true)
  			{
  			snowScript = terrainObject.GetComponent (CustomTerrainScriptAtsV3Snow);
   			snowScript.SnowAmount = dynamicSnowFade;
   			}
   			
   			if (dynamicSnowFade >= .59)
   			{
   				dynamicSnowFade = .59;
   			}
   			
   					
   			//Fades the sunshafts in
   			sunShaftScript = cameraThing.camera.GetComponent (SunShafts);
   			sunShaftScript.sunShaftIntensity = sunShaftFade;
  			
  			rainSound.audio.volume -= Time.deltaTime * .01;
  			windSnowSound.audio.volume += Time.deltaTime * .01;
			windSound.audio.volume -= Time.deltaTime * .01;
			
			//Acivates UniStorm system
  			GetComponent(UniStorm).enabled = false;
  			
  			
  			//Keep rain from going below 0
  			if (minRainIntensity <= 0)
  			{
  				minRainIntensity = 0;
  			}
  			
  			//Keep fog from going below 0
  			if (minFogIntensity <= 0)
  			{
  				minFogIntensity = 0;
  			}
  			
  			//Keeps our snow level maxed at users input
  			if (minSnowIntensity >= maxSnowStormIntensity )
  			{
  				minSnowIntensity = maxSnowStormIntensity ;
  			}
  			
  			//Keeps our snow fog level maxed at users input
  			if (minSnowFogIntensity >= maxHeavySnowDustIntensity)
  			{
  				minSnowFogIntensity = maxHeavySnowDustIntensity;
  			}
  		
  		
  			if (stormClouds >= .55)
  			{
  				stormClouds = .55;
  			}
  			
  			if (fade >= .40)
  				{
  				    //sun.enabled = false;
					//sunCloudy.enabled = true;
  				}
  				
  			if (fade >= .4)
  				{
					//fadeHorizon.renderer.enabled = false;
  				}
  				
  			
  			
  			 if (fade >= 1)
  				{
  					fade = 1;
  				}
  				
  		   if (fadeStormClouds >= 1)
  				{
  					fadeStormClouds = 1;
  				}
  				
  				
  			 if (sunShaftFade <= .1)
  				{
  					sunShaftFade = 0;
  				}	
  				
  				
  			 if (time >= 1)
  				{
  					time = 1;
  				}
  				
  		    //If the game speed is fast forward fade clouds instantly	
  			if (dayLength >= 0 && dayLength <=15) 
  			 	{
  					fade = 1;
  				}
  			}
  		
  		//Thunder Storm		
 		if (temperature >= 33)
 		{
			fade += Time.deltaTime * .04;
			fade2 += Time.deltaTime * .04;
			butterfliesFade -= .04;
			windyLeavesFade -= .04;
			fadeHorizonController += Time.deltaTime * .04;
			fadeStormClouds += Time.deltaTime * .04;
			time += Time.deltaTime * .0014;
			windControlUp += 1;
			sunShaftFade -= Time.deltaTime * .14;
			minRainIntensity += .2;
			minFogIntensity += .008;
			minSnowFogIntensity -= .01;	
			minSnowIntensity -= .9;	
			stormClouds += Time.deltaTime * .011;
			sunIntensity -= .005;
			dynamicSnowFade -= Time.deltaTime * .0095; 
			
			
			//Slowly increases the wind to make it stronger fort the storm
			if (minRainIntensity >= 1)
			{
  				//Makes our wind stronger for the storm
				windZone.transform.Rotate(Vector3.up * Time.deltaTime * 3);
				windZone.gameObject.active = true;
			}
			
			if (windZone.transform.eulerAngles.y >= 180)
			{
				windZone.transform.eulerAngles.y = 180;
			}
			
			
			if (dynamicSnowFade <= .25)
  			{
  				dynamicSnowFade = .25;
  			}
  			
  			
  			if (dynamicSnowEnabled == true)
  			{
  			snowScript = terrainObject.GetComponent (CustomTerrainScriptAtsV3Snow);
   			snowScript.SnowAmount = dynamicSnowFade;
   			}
		
			
			//Fades in storm clouds
			heavyClouds.renderer.material.color.a = fade;	
			heavyCloudsLayer1.renderer.material.color.a = fade2;	
			heavyCloudsLayerLight.renderer.material.color.a = fade2;	
			
			if (fade2 >= .25)
  				{
					fade2 = .25;
  			    }
  			    
  		    //Fade out our butterflies
  			butterflies.particleEmitter.minEmission = butterfliesFade;
  			butterflies.particleEmitter.maxEmission = butterfliesFade;
  			
  			if (butterfliesFade <= 0)
  			{
  				butterfliesFade = 0;
  			}
  			
  			//Calculates fading in our particles
  			snow.particleEmitter.minEmission = minSnowIntensity;
			snow.particleEmitter.maxEmission = minSnowIntensity;
			
			snowMistFog.particleEmitter.minEmission = minSnowFogIntensity;
			snowMistFog.particleEmitter.maxEmission = minSnowFogIntensity;
  					
  			rain.particleEmitter.minEmission = minRainIntensity;
			rain.particleEmitter.maxEmission = minRainIntensity;
			
			mistFog.particleEmitter.minEmission = minFogIntensity;
			mistFog.particleEmitter.maxEmission = minFogIntensity;	
			
			windyLeaves.particleEmitter.minEmission = windyLeavesFade;
			windyLeaves.particleEmitter.maxEmission = windyLeavesFade;	
  			
  			//Fades our fog in

   			//rainOnCamera = cameraThing.camera.GetComponent(ImageRefractionEffect);
   			
   			//fadeHorizonStorm.renderer.material.color.a = fadeHorizonController;	
   			RenderSettings.fogDensity -= .00012 * Time.deltaTime;
   			
   			if (RenderSettings.fogDensity <= .0006)
   			{
   				RenderSettings.fogDensity = .0006;
   				fogScript = cameraThing.camera.GetComponent(GlobalFog);
   				fogScript.globalDensity += .0008 * Time.deltaTime;
   				fogScript.startDistance -= 5 * Time.deltaTime;
   				
   			if (fogScript.startDistance <= 30)
   			{
   				fogScript.startDistance = 30;
   				fogScript.globalDensity -= .0005 * Time.deltaTime;
   			}
   				
		    if (overrideFog == false)
		    {
		    
		       fogScript.globalDensity += .0005 * Time.deltaTime;
		    
   			if (fogScript.globalDensity >= .0038)
   			    {   			    
   					fogScript.globalDensity = .0038;
   			    }
   			  }
   			}
   			
   			if (overrideFog == true)
		    {
		    	fogScript.globalDensity -= .001 * Time.deltaTime;
		    	
		    	if (fogScript.globalDensity <= .0038)
   			    {   			    
   					fogScript.globalDensity = .0038;
   			    }
		    }
		    
		    
		    //Keep snow from going below 0
  			if (minSnowIntensity <= 0)
  			{
  				minSnowIntensity = 0;
  			}
  			
  			//Keep snow fog from going below 0
  			if (minSnowFogIntensity <= 0)
  			{
  				minSnowFogIntensity = 0;
  			}
		    
   					
   			//Fades the sunshafts in
   			sunShaftScript = cameraThing.camera.GetComponent (SunShafts);
   			sunShaftScript.sunShaftIntensity = sunShaftFade;
   			
  			
  			rainSound.audio.volume += Time.deltaTime * .01;
  			windSound.audio.volume += Time.deltaTime * .01;
  			windSnowSound.audio.volume -= Time.deltaTime * .04;
			
			//Acivates UniStorm system
  			GetComponent(UniStorm).enabled = true;
  			
  			
  			//Gradually fades our rain effects in
  			if (minRainIntensity >= maxStormRainIntensity)
  			{
  				minRainIntensity = maxStormRainIntensity;
  			}
  			
  			if (minRainIntensity >= 50)
  			{
  				//rainOnCamera.enabled = true;
  			}
  			
  			if (minFogIntensity >= maxStormMistCloudsIntensity)
  			{
  				minFogIntensity = maxStormMistCloudsIntensity;
  			}
  		
  		
  			if (stormClouds >= .55)
  			{
  				stormClouds = .55;
  			}
  			
  			if (fade >= .40)
  				{
  				    
  				}
  				
  			if (fade >= .4)
  				{
					//fadeHorizon.renderer.enabled = false;
  				}
  				
  			if (fade2 >= .25)
  				{
					fade2 = .25;
  				}
  			
  			 if (fade >= 1)
  				{
  					fade = 1;
  				}
  				
  		   if (fadeStormClouds >= 1)
  				{
  					fadeStormClouds = 1;
  				}
  				
  				
  			 if (sunShaftFade <= .1)
  				{
  					sunShaftFade = 0;
  				}	
  				
  				
  			 if (time >= 1)
  				{
  					time = 1;
  				}
  				
  		    //If the game speed is fast forward fade clouds instantly	
  			if (dayLength >= 0 && dayLength <=15) 
  			 	{
  					fade = 1;
  				}
  			}
  		}
  		
  		
		//Partly Cloudy 1
 		if (weatherForecaster == 4)
 		{
			fade -= Time.deltaTime * .04;
			fade2 -= Time.deltaTime * .01;
			butterfliesFade -= .04;
			windyLeavesFade -= .04;
			fadeStormClouds -= Time.deltaTime * .04;
			windControl -= Time.deltaTime;
			time -= Time.deltaTime * .14;
			sunShaftFade += Time.deltaTime * .14;
			minRainIntensity -= 1;
			minFogIntensity -= .04;
			minSnowFogIntensity -= .01;	
			minSnowIntensity -= .9;
			stormClouds -= Time.deltaTime * .011;
			light.enabled = false;	
			sunIntensity += .005;
			sun.enabled = true;
			dynamicSnowFade -= Time.deltaTime * .0095; 
			overrideFog = false;
			
			heavyClouds.renderer.material.color.a = fade;
			heavyCloudsLayer1.renderer.material.color.a = fade2;	
			heavyCloudsLayerLight.renderer.material.color.a = fade2;
			
			if (fade2 <= 0)
  				{
					fade2 = 0;
					
					//Fades our sunsafts
   					sunShaftScript = cameraThing.camera.GetComponent (SunShafts);
   					sunShaftScript.sunShaftIntensity = 2;
					
  			    }
					
  			
  				lightClouds1.renderer.enabled = true;

  				lightClouds2.renderer.enabled = true;

  				lightClouds3.renderer.enabled = false;
 
  				lightClouds4.renderer.enabled = false;
 
  				lightClouds5.renderer.enabled = false;
  				
  				highClouds1.renderer.enabled = true;
  				
  				highClouds2.renderer.enabled = false;
  				
  				mostlyCloudyClouds.renderer.enabled = false;

  			
  			//Fade out our butterflies
  			butterflies.particleEmitter.minEmission = butterfliesFade;
  			butterflies.particleEmitter.maxEmission = butterfliesFade;
  			
  			if (butterfliesFade <= 0)
  			{
  				butterfliesFade = 0;
  			}
  			
  			if (windyLeavesFade <= 0)
  			{
  				windyLeavesFade = 0;
  			}
  			
  			//Calculates fading in our particles
  			snow.particleEmitter.minEmission = minSnowIntensity;
			snow.particleEmitter.maxEmission = minSnowIntensity;
			
			snowMistFog.particleEmitter.minEmission = minSnowFogIntensity;
			snowMistFog.particleEmitter.maxEmission = minSnowFogIntensity;
  			
  			rain.particleEmitter.minEmission = minRainIntensity;
			rain.particleEmitter.maxEmission = minRainIntensity;
			
			mistFog.particleEmitter.minEmission = minFogIntensity;
			mistFog.particleEmitter.maxEmission = minFogIntensity;	
			
			windyLeaves.particleEmitter.minEmission = windyLeavesFade;
			windyLeaves.particleEmitter.maxEmission = windyLeavesFade;	
			
  			
  			//Fades our fog
			fogScript = cameraThing.camera.GetComponent(GlobalFog);
			//rainOnCamera = cameraThing.camera.GetComponent(ImageRefractionEffect);
   			fogScript.globalDensity -= .0005 * Time.deltaTime;
   			fogScript.startDistance += 5 * Time.deltaTime;
   			
			
			if (dynamicSnowFade <= .25)
			{
				dynamicSnowFade = .25;
			}
			
			if (dynamicSnowEnabled == true)
  			{
  			snowScript = terrainObject.GetComponent (CustomTerrainScriptAtsV3Snow);
   			snowScript.SnowAmount = dynamicSnowFade;
   			}
   			
   			
   			if (fogScript.globalDensity <= 0)
   			{
   				fogScript.globalDensity = 0;
   			}
   			
   			if (fogScript.startDistance >= 300)
   			{
   				fogScript.startDistance = 300;
   			}
   		
   			//Keep snow from going below 0
  			if (minSnowIntensity <= 0)
  			{
  				minSnowIntensity = 0;
  			}
  			
  			//Keep snow fog from going below 0
  			if (minSnowFogIntensity <= 0)
  			{
  				minSnowFogIntensity = 0;
  			}
  			
 
  			rainSound.audio.volume -= Time.deltaTime * .04;
  			windSound.audio.volume -= Time.deltaTime * .04;
  			windSnowSound.audio.volume -= Time.deltaTime * .04;
 						
  			//Deactivates UniStorm		
  			GetComponent(UniStorm).enabled = false;
  			
  			if (stormClouds <= 0)
  			{
  				stormClouds = 0;
  			}
  			
  			if (minRainIntensity >= 1)
  			{
  				//rainOnCamera.enabled = false;
  				//Fades our sunsafts
   				sunShaftScript = cameraThing.camera.GetComponent (SunShafts);
   				sunShaftScript.sunShaftIntensity = sunShaftFade;
  			}
  			
  			//Calculates our wind making it lessen		
  			if (minRainIntensity <= 0)
  				{
  					minRainIntensity = 0;
  					//Keeps our wind at 0 if there hasn't been a storm
					windZone.transform.rotation = Quaternion.AngleAxis(0, Vector3.up);
					windZone.gameObject.active = false;
				
					if (windZone.transform.eulerAngles.y <= 1)
					{
						windZone.transform.eulerAngles.y = 0;
						windZone.gameObject.active = false;
			   		 }
				
  				}
  				
  			if (minRainIntensity >= 1)
				{
				//Makes our wind weaker for when the storm ends
				 windZone.transform.Rotate(-Vector3.up * Time.deltaTime * 12);
				 
			
					if (windZone.transform.eulerAngles.y <= 1)
					{
					windZone.transform.eulerAngles.y = 0;
					}
			
				}
	
	
  			//Keeps our fade numbers from going below 0
  		    if (minFogIntensity <= 0)
  			{
  				minFogIntensity = 0;
  			}
  			
  			
  			 if (fade <= 0)
  				{
  				fade = 0;
  				
  				}
  				
  				
  			if (fadeStormClouds <= 0)
  				{
  					fadeStormClouds = 0;
  				}
  				
  			 if (time <= 0)
  				{
  					time = 0;
  				}
  				
  				if (sunShaftFade >= 2)
  				{
  					sunShaftFade = 2;
  					sun.enabled = true;
					sunCloudy.enabled = false;
					RenderSettings.fogDensity += .00012 * Time.deltaTime;
   			
   			//ControlUnityFog
   			//If you wish to have denser fog you can increase the numbers below, you will have to do this for each day without percipitation
   			if (RenderSettings.fogDensity >= fogDensity)
   			{
   				RenderSettings.fogDensity = fogDensity;
   			}
  				}
  				
  		    //If the game speed is fast fade clouds instantly	
  			if (dayLength >= 0 && dayLength <=15) 
  			 	{
  					fade = 0;
  				}
  		}
  		
  		//Partly Cloudy 2
 		if (weatherForecaster == 5)
 		{
			fade -= Time.deltaTime * .04;
			fade2 -= Time.deltaTime * .01;
			butterfliesFade -= .04;
			windyLeavesFade -= .04;
			fadeStormClouds -= Time.deltaTime * .04;
			windControl -= Time.deltaTime;
			time -= Time.deltaTime * .14;
			sunShaftFade += Time.deltaTime * .14;
			minRainIntensity -= 1;
			minFogIntensity -= .04;
			minSnowFogIntensity -= .01;	
			minSnowIntensity -= .9;
			clearClouds -= Time.deltaTime * 1;
			stormClouds -= Time.deltaTime * .011;
			light.enabled = false;	
			sunIntensity += .005;
			sun.enabled = true;
			dynamicSnowFade -= Time.deltaTime * .0095; 
			overrideFog = false;
			
			heavyClouds.renderer.material.color.a = fade;
			heavyCloudsLayer1.renderer.material.color.a = fade2;	
			heavyCloudsLayerLight.renderer.material.color.a = fade2;
			
			if (fade2 <= 0)
  				{
					fade2 = 0;
					
					//Fades our sunsafts
   					sunShaftScript = cameraThing.camera.GetComponent (SunShafts);
   					sunShaftScript.sunShaftIntensity = 2;
  			    }
					
  			lightClouds1.renderer.enabled = false;

  			lightClouds2.renderer.enabled = false;

  			lightClouds3.renderer.enabled = true;
 
  			lightClouds4.renderer.enabled = true; //switched
 
  			lightClouds5.renderer.enabled = false; //these
  			
  			highClouds1.renderer.enabled = false;
  				
  			highClouds2.renderer.enabled = true;
  			
  			mostlyCloudyClouds.renderer.enabled = false;
  			
  			//Fade out our butterflies
  			butterflies.particleEmitter.minEmission = butterfliesFade;
  			butterflies.particleEmitter.maxEmission = butterfliesFade;
  			
  			if (butterfliesFade <= 0)
  			{
  				butterfliesFade = 0;
  			}
  			
  			if (windyLeavesFade <= 0)
  			{
  				windyLeavesFade = 0;
  			}
  			
  			//Calculates fading in our particles
  			snow.particleEmitter.minEmission = minSnowIntensity;
			snow.particleEmitter.maxEmission = minSnowIntensity;
			
			snowMistFog.particleEmitter.minEmission = minSnowFogIntensity;
			snowMistFog.particleEmitter.maxEmission = minSnowFogIntensity;
  			
  			rain.particleEmitter.minEmission = minRainIntensity;
			rain.particleEmitter.maxEmission = minRainIntensity;
			
			mistFog.particleEmitter.minEmission = minFogIntensity;
			mistFog.particleEmitter.maxEmission = minFogIntensity;	
			
			windyLeaves.particleEmitter.minEmission = windyLeavesFade;
			windyLeaves.particleEmitter.maxEmission = windyLeavesFade;	
			
  			
  			//Fades our fog
			fogScript = cameraThing.camera.GetComponent(GlobalFog);
			//rainOnCamera = cameraThing.camera.GetComponent(ImageRefractionEffect);
   			fogScript.globalDensity -= .0005 * Time.deltaTime;
   			fogScript.startDistance += 5 * Time.deltaTime;
   			
			
			if (dynamicSnowFade <= .25)
			{
				dynamicSnowFade = .25;
			}
   			
   			if (dynamicSnowEnabled == true)
  			{
  			snowScript = terrainObject.GetComponent (CustomTerrainScriptAtsV3Snow);
   			snowScript.SnowAmount = dynamicSnowFade;
   			}
   			
   			if (fogScript.globalDensity <= 0)
   			{
   				fogScript.globalDensity = 0;
   			}
   			
   			if (fogScript.startDistance >= 300)
   			{
   				fogScript.startDistance = 300;
   			}
   			
   			//Keep snow from going below 0
  			if (minSnowIntensity <= 0)
  			{
  				minSnowIntensity = 0;
  			}
  			
  			//Keep snow fog from going below 0
  			if (minSnowFogIntensity <= 0)
  			{
  				minSnowFogIntensity = 0;
  			}
  			
  			
  			rainSound.audio.volume -= Time.deltaTime * .04;
  			windSound.audio.volume -= Time.deltaTime * .04;
  			windSnowSound.audio.volume -= Time.deltaTime * .04;
 						
  			//Deactivates UniStorm		
  			GetComponent(UniStorm).enabled = false;
  			
  			if (stormClouds <= 0)
  			{
  				stormClouds = 0;
  			}
  			
  			if (minRainIntensity >= 1)
  			{
  				//rainOnCamera.enabled = false;
  				
  				sunShaftScript = cameraThing.camera.GetComponent (SunShafts);
   			    sunShaftScript.sunShaftIntensity = sunShaftFade;
  			}
  			
  			//Calculates our wind making it lessen		
  			if (minRainIntensity <= 0)
  				{
  					minRainIntensity = 0;
  					//Keeps our wind at 0 if there hasn't been a storm
					windZone.transform.rotation = Quaternion.AngleAxis(0, Vector3.up);
					windZone.gameObject.active = false;
				
					if (windZone.transform.eulerAngles.y <= 1)
					{
						windZone.transform.eulerAngles.y = 0;
						windZone.gameObject.active = false;
			   		 }
				
  				}
  				
  			if (minRainIntensity >= 1)
				{
				//Makes our wind weaker for when the storm ends
				 windZone.transform.Rotate(-Vector3.up * Time.deltaTime * 12);
				 
			
					if (windZone.transform.eulerAngles.y <= 1)
					{
					windZone.transform.eulerAngles.y = 0;
					}
			
				}
	
	
  			//Keeps our fade numbers from going below 0
  		    if (minFogIntensity <= 0)
  			{
  				minFogIntensity = 0;
  			}
  			
  			
  			 if (fade <= 0)
  				{
  				fade = 0;
  				
  				}
  				
  				
  			if (fadeStormClouds <= 0)
  				{
  					fadeStormClouds = 0;
  				}
  				
  			 if (time <= 0)
  				{
  					time = 0;
  				}
  				
  				if (sunShaftFade >= 2)
  				{
  					sunShaftFade = 2;
  					sun.enabled = true;
					sunCloudy.enabled = false;
					RenderSettings.fogDensity += .00012 * Time.deltaTime;
   			
   			//ControlUnityFog
   			//If you wish to have denser fog you can increase the numbers below, you will have to do this for each day without percipitation
   			if (RenderSettings.fogDensity >= fogDensity)
   			{
   				RenderSettings.fogDensity = fogDensity;
   			}
  				}
  				
  		    //If the game speed is fast fade clouds instantly	
  			if (dayLength >= 0 && dayLength <=15) 
  			 	{
  					fade = 0;
  				}
  		}
  		
  		//Partly Cloudy 3
 		if (weatherForecaster == 6)
 		{
			fade -= Time.deltaTime * .04;
			fade2 -= Time.deltaTime * .01;
			butterfliesFade -= .04;
			windyLeavesFade -= .04;
			fadeStormClouds -= Time.deltaTime * .04;
			windControl -= Time.deltaTime;
			time -= Time.deltaTime * .14;
			sunShaftFade += Time.deltaTime * .14;
			minRainIntensity -= 1;
			minFogIntensity -= .04;
			minSnowFogIntensity -= .01;	
			minSnowIntensity -= .9;
			clearClouds -= Time.deltaTime * 1;
			stormClouds -= Time.deltaTime * .011;
			light.enabled = false;	
			sunIntensity += .005;
			sun.enabled = true;
			dynamicSnowFade -= Time.deltaTime * .0095; 
			overrideFog = false;
			
			heavyClouds.renderer.material.color.a = fade;
			heavyCloudsLayer1.renderer.material.color.a = fade2;	
			heavyCloudsLayerLight.renderer.material.color.a = fade2;
			
			if (fade2 <= 0)
  				{
					fade2 = 0;
					
					//Fades our sunsafts
   					sunShaftScript = cameraThing.camera.GetComponent (SunShafts);
   					sunShaftScript.sunShaftIntensity = 2;
  			    }
					
  			lightClouds1.renderer.enabled = false;

  			lightClouds2.renderer.enabled = false;

  			lightClouds3.renderer.enabled = false;
 
  			lightClouds4.renderer.enabled = false;
 
  			lightClouds5.renderer.enabled = true;
  			
  			highClouds1.renderer.enabled = false;
  				
  			highClouds2.renderer.enabled = false;
  			
  			mostlyCloudyClouds.renderer.enabled = false;
  			
  			//Fade out our butterflies
  			butterflies.particleEmitter.minEmission = butterfliesFade;
  			butterflies.particleEmitter.maxEmission = butterfliesFade;
  			
  			if (butterfliesFade <= 0)
  			{
  				butterfliesFade = 0;
  			}
  			
  			if (windyLeavesFade <= 0)
  			{
  				windyLeavesFade = 0;
  			}
  			
  			//Calculates fading in our particles
  			snow.particleEmitter.minEmission = minSnowIntensity;
			snow.particleEmitter.maxEmission = minSnowIntensity;
			
			snowMistFog.particleEmitter.minEmission = minSnowFogIntensity;
			snowMistFog.particleEmitter.maxEmission = minSnowFogIntensity;
  			
  			rain.particleEmitter.minEmission = minRainIntensity;
			rain.particleEmitter.maxEmission = minRainIntensity;
			
			mistFog.particleEmitter.minEmission = minFogIntensity;
			mistFog.particleEmitter.maxEmission = minFogIntensity;	
			
			windyLeaves.particleEmitter.minEmission = windyLeavesFade;
			windyLeaves.particleEmitter.maxEmission = windyLeavesFade;	
			
  			
  			//Fades our fog
			fogScript = cameraThing.camera.GetComponent(GlobalFog);
			//rainOnCamera = cameraThing.camera.GetComponent(ImageRefractionEffect);
   			fogScript.globalDensity -= .0005 * Time.deltaTime;
   			fogScript.startDistance += 5 * Time.deltaTime;
   			
			
			if (dynamicSnowFade <= .25)
			{
				dynamicSnowFade = .25;
			}
			
			if (dynamicSnowEnabled == true)
  			{
  			snowScript = terrainObject.GetComponent (CustomTerrainScriptAtsV3Snow);
   			snowScript.SnowAmount = dynamicSnowFade;
   			}
   			
   			
   			if (fogScript.globalDensity <= 0)
   			{
   				fogScript.globalDensity = 0;
   			}
   			
   			if (fogScript.startDistance >= 300)
   			{
   				fogScript.startDistance = 300;
   			}
   			
   			
   			//Keep snow from going below 0
  			if (minSnowIntensity <= 0)
  			{
  				minSnowIntensity = 0;
  			}
  			
  			//Keep snow fog from going below 0
  			if (minSnowFogIntensity <= 0)
  			{
  				minSnowFogIntensity = 0;
  			}

  			
  			rainSound.audio.volume -= Time.deltaTime * .04;
  			windSound.audio.volume -= Time.deltaTime * .04;
  			windSnowSound.audio.volume -= Time.deltaTime * .04;
 						
  			//Deactivates UniStorm		
  			GetComponent(UniStorm).enabled = false;
  			
  			if (stormClouds <= 0)
  			{
  				stormClouds = 0;
  			}
  			
  			if (minRainIntensity >= 1)
  			{
  				//rainOnCamera.enabled = false;
  				
  				sunShaftScript = cameraThing.camera.GetComponent (SunShafts);
   			    sunShaftScript.sunShaftIntensity = sunShaftFade;
  			}
  			
  			//Calculates our wind making it lessen		
  			if (minRainIntensity <= 0)
  				{
  					minRainIntensity = 0;
  					//Keeps our wind at 0 if there hasn't been a storm
					windZone.transform.rotation = Quaternion.AngleAxis(0, Vector3.up);
					windZone.gameObject.active = false;
				
					if (windZone.transform.eulerAngles.y <= 1)
					{
						windZone.transform.eulerAngles.y = 0;
						windZone.gameObject.active = false;
			   		 }
				
  				}
  				
  			if (minRainIntensity >= 1)
				{
				//Makes our wind weaker for when the storm ends
				 windZone.transform.Rotate(-Vector3.up * Time.deltaTime * 12);
				 
			
					if (windZone.transform.eulerAngles.y <= 1)
					{
					windZone.transform.eulerAngles.y = 0;
					}
			
				}
	
	
  			//Keeps our fade numbers from going below 0
  		    if (minFogIntensity <= 0)
  			{
  				minFogIntensity = 0;
  			}
  			
  			
  			 if (fade <= 0)
  				{
  				fade = 0;
  				
  				}
  				
  				
  			if (fadeStormClouds <= 0)
  				{
  					fadeStormClouds = 0;
  				}
  				
  			 if (time <= 0)
  				{
  					time = 0;
  				}
  				
  				if (sunShaftFade >= 2)
  				{
  					sunShaftFade = 2;
  					sun.enabled = true;
					sunCloudy.enabled = false;
					RenderSettings.fogDensity += .00012 * Time.deltaTime;
   			
   			//ControlUnityFog
   			//If you wish to have denser fog you can increase the numbers below, you will have to do this for each day without percipitation
   			if (RenderSettings.fogDensity >= fogDensity)
   			{
   				RenderSettings.fogDensity = fogDensity;
   			}
  				}
  				
  		    //If the game speed is fast fade clouds instantly	
  			if (dayLength >= 0 && dayLength <=15) 
  			 	{
  					fade = 0;
  				}
  		}
  		
  		//Mostly clear 1
 		if (weatherForecaster == 7)
 		{
			fade -= Time.deltaTime * .04;
			fade2 -= Time.deltaTime * .01;
			butterfliesFade -= .04;
			windyLeavesFade -= .04;
			fadeStormClouds -= Time.deltaTime * .04;
			windControl += Time.deltaTime * .01;
			time -= Time.deltaTime * .14;
			sunShaftFade += Time.deltaTime * .14;
			minRainIntensity -= 1;
			minFogIntensity -= .04;
			minSnowFogIntensity -= .01;	
			minSnowIntensity -= .9;
			light.enabled = false;
			stormClouds -= Time.deltaTime * .011;
			clearClouds += Time.deltaTime * 1;
			overrideFog = false;
			dynamicSnowFade -= Time.deltaTime * .0095; 
			
			heavyClouds.renderer.material.color.a = fade;
			heavyCloudsLayer1.renderer.material.color.a = fade2;	
			heavyCloudsLayerLight.renderer.material.color.a = fade2;	
			
			if (fade2 <= 0)
  				{
					fade2 = 0;
					
					//Fades our sunsafts
   					sunShaftScript = cameraThing.camera.GetComponent (SunShafts);
   					sunShaftScript.sunShaftIntensity = 2;
  			    }
  			    
  			    
  			if (dynamicSnowFade <= .25)
			{
				dynamicSnowFade = .25;
			}
			
			if (dynamicSnowEnabled == true)
  			{
  			snowScript = terrainObject.GetComponent (CustomTerrainScriptAtsV3Snow);
   			snowScript.SnowAmount = dynamicSnowFade;
   			}
  			
  			lightClouds1.renderer.enabled = false;

  			lightClouds2.renderer.enabled = false;

  			lightClouds3.renderer.enabled = false;
 
  			lightClouds5.renderer.enabled = false;
 
  			lightClouds4.renderer.enabled = false;
  			
  			highClouds1.renderer.enabled = true;
  				
  			highClouds2.renderer.enabled = false;
  			
  			mostlyCloudyClouds.renderer.enabled = false;
  			
  			//Fade out our butterflies
  			butterflies.particleEmitter.minEmission = butterfliesFade;
  			butterflies.particleEmitter.maxEmission = butterfliesFade;
  			
  			if (butterfliesFade <= 0)
  			{
  				butterfliesFade = 0;
  			}
  			
  			if (windyLeavesFade <= 0)
  			{
  				windyLeavesFade = 0;
  			}
  			
  			//Calculates fading in our particles
  			snow.particleEmitter.minEmission = minSnowIntensity;
			snow.particleEmitter.maxEmission = minSnowIntensity;
			
			snowMistFog.particleEmitter.minEmission = minSnowFogIntensity;
			snowMistFog.particleEmitter.maxEmission = minSnowFogIntensity;
  			
  			rain.particleEmitter.minEmission = minRainIntensity;
			rain.particleEmitter.maxEmission = minRainIntensity;
			
			mistFog.particleEmitter.minEmission = minFogIntensity;
			mistFog.particleEmitter.maxEmission = minFogIntensity;	
			
			windyLeaves.particleEmitter.minEmission = windyLeavesFade;
			windyLeaves.particleEmitter.maxEmission = windyLeavesFade;	
		
  			
			//Fades our fog
			fogScript = cameraThing.camera.GetComponent(GlobalFog);
			//rainOnCamera = cameraThing.camera.GetComponent(ImageRefractionEffect);
   			fogScript.globalDensity -= .0005 * Time.deltaTime;
   			fogScript.startDistance += 5 * Time.deltaTime;
   			
  
   			if (fogScript.globalDensity <= 0)
   			{
   				fogScript.globalDensity = 0;
   			}
   			
   			if (fogScript.startDistance >= 300)
   			{
   				fogScript.startDistance = 300;
   			}
   			
   			//Keep snow from going below 0
  			if (minSnowIntensity <= 0)
  			{
  				minSnowIntensity = 0;
  			}
  			
  			//Keep snow fog from going below 0
  			if (minSnowFogIntensity <= 0)
  			{
  				minSnowFogIntensity = 0;
  			}
  			

  			rainSound.audio.volume -= Time.deltaTime * .07;
  			windSound.audio.volume -= Time.deltaTime * .07;
  			windSnowSound.audio.volume -= Time.deltaTime * .04;

  			GetComponent(UniStorm).enabled = false;
  			
  			
  			//Calculates our wind making it lessen		
  			if (minRainIntensity <= 0)
  				{
  					minRainIntensity = 0;
  					//Keeps our wind at 0 if there hasn't been a storm
					windZone.transform.rotation = Quaternion.AngleAxis(0, Vector3.up);
				
					if (windZone.transform.eulerAngles.y <= 0)
					{
						windZone.transform.eulerAngles.y = 1;
			   		 }
				
  				}
  				
  			if (minRainIntensity >= 1)
				{
					//Makes our wind weaker for when the storm ends
					 windZone.transform.Rotate(-Vector3.up * Time.deltaTime * 5);
			
					if (windZone.transform.eulerAngles.y <= 1)
					{
						windZone.transform.eulerAngles.y = 0;
					}
			
				}
			
			
  			 //Keeps our fade numbers from going below 0
  		     if (minFogIntensity <= 0)
  				{
  					minFogIntensity = 0;
  				}
  				
  			if (minRainIntensity >= 1)
  				{
  					//rainOnCamera.enabled = false;
  					
  					sunShaftScript = cameraThing.camera.GetComponent (SunShafts);
   			        sunShaftScript.sunShaftIntensity = sunShaftFade;
  				}
  		
  			if (fadeStormClouds <= 0)
  			{
  				fadeStormClouds = 0;
  			}
  			
  			if (stormClouds <= 0)
  			{
  				stormClouds = 0;
  			}
  		
  			 if (fade <= 0)
  				{
  					fade = 0;
  				}
  				
  			if (time <= 0)
  				{
  					time = 0;
  				}
  				
  				if (sunShaftFade >= 2)
  				{
  					sunShaftFade = 2;
  					sun.enabled = true;
					sunCloudy.enabled = false;
					RenderSettings.fogDensity += .00012 * Time.deltaTime;
   			
   				//ControlUnityFog
   				//If you wish to have denser fog you can increase the numbers below, you will have to do this for each day without percipitation
   				if (RenderSettings.fogDensity >= fogDensity)
   					{
   						RenderSettings.fogDensity = fogDensity;
   					}
  				}
  				
  		    //If the game speed is fast fade clouds instantly	
  			if (dayLength >= 0 && dayLength <=15) 
  			 	{
  					fade = 0;
  				}
  		}
  		
  		//Mostly clear 1
 		if (weatherForecaster == 8)
 		{
			fade -= Time.deltaTime * .04;
			fade2 -= Time.deltaTime * .01;
			butterfliesFade -= .04;
			windyLeavesFade -= .04;
			fadeStormClouds -= Time.deltaTime * .04;
			windControl += Time.deltaTime * .01;
			time -= Time.deltaTime * .14;
			sunShaftFade += Time.deltaTime * .14;
			minRainIntensity -= 1;
			minFogIntensity -= .04;
			minSnowFogIntensity -= .01;	
			minSnowIntensity -= .9;
			light.enabled = false;
			stormClouds -= Time.deltaTime * .011;
			clearClouds += Time.deltaTime * 1;
			overrideFog = false;
			dynamicSnowFade -= Time.deltaTime * .0095; 
			
			heavyClouds.renderer.material.color.a = fade;
			heavyCloudsLayer1.renderer.material.color.a = fade2;	
			heavyCloudsLayerLight.renderer.material.color.a = fade2;	
			
			if (fade2 <= 0)
  				{
					fade2 = 0;
					
					//Fades our sunsafts
   					sunShaftScript = cameraThing.camera.GetComponent (SunShafts);
   					sunShaftScript.sunShaftIntensity = 2;
  			    }
  			    
  			    
  			if (dynamicSnowFade <= .25)
			{
				dynamicSnowFade = .25;
			}
			
			if (dynamicSnowEnabled == true)
  			{
  			snowScript = terrainObject.GetComponent (CustomTerrainScriptAtsV3Snow);
   			snowScript.SnowAmount = dynamicSnowFade;
   			}
  			
  			lightClouds1.renderer.enabled = false;

  			lightClouds2.renderer.enabled = false;

  			lightClouds3.renderer.enabled = false;
 
  			lightClouds5.renderer.enabled = false;
 
  			lightClouds4.renderer.enabled = false;
  			
  			highClouds1.renderer.enabled = false;
  				
  			highClouds2.renderer.enabled = true;
  			
  			mostlyCloudyClouds.renderer.enabled = false;
  			
  			//Fade out our butterflies
  			butterflies.particleEmitter.minEmission = butterfliesFade;
  			butterflies.particleEmitter.maxEmission = butterfliesFade;
  			
  			if (butterfliesFade <= 0)
  			{
  				butterfliesFade = 0;
  			}
  			
  			if (windyLeavesFade <= 0)
  			{
  				windyLeavesFade = 0;
  			}
  			
  			//Calculates fading in our particles
  			snow.particleEmitter.minEmission = minSnowIntensity;
			snow.particleEmitter.maxEmission = minSnowIntensity;
			
			snowMistFog.particleEmitter.minEmission = minSnowFogIntensity;
			snowMistFog.particleEmitter.maxEmission = minSnowFogIntensity;
  			
  			rain.particleEmitter.minEmission = minRainIntensity;
			rain.particleEmitter.maxEmission = minRainIntensity;
			
			mistFog.particleEmitter.minEmission = minFogIntensity;
			mistFog.particleEmitter.maxEmission = minFogIntensity;	
			
			windyLeaves.particleEmitter.minEmission = windyLeavesFade;
			windyLeaves.particleEmitter.maxEmission = windyLeavesFade;	
		
  			
			//Fades our fog
			fogScript = cameraThing.camera.GetComponent(GlobalFog);
			//rainOnCamera = cameraThing.camera.GetComponent(ImageRefractionEffect);
   			fogScript.globalDensity -= .0005 * Time.deltaTime;
   			fogScript.startDistance += 5 * Time.deltaTime;
   			
  
   			if (fogScript.globalDensity <= 0)
   			{
   				fogScript.globalDensity = 0;
   			}
   			
   			if (fogScript.startDistance >= 300)
   			{
   				fogScript.startDistance = 300;
   			}
   			
   			
			//Keep snow from going below 0
  			if (minSnowIntensity <= 0)
  			{
  				minSnowIntensity = 0;
  			}
  			
  			//Keep snow fog from going below 0
  			if (minSnowFogIntensity <= 0)
  			{
  				minSnowFogIntensity = 0;
  			}
  			

  			rainSound.audio.volume -= Time.deltaTime * .07;
  			windSound.audio.volume -= Time.deltaTime * .07;
  			windSnowSound.audio.volume -= Time.deltaTime * .04;

  			GetComponent(UniStorm).enabled = false;
  			
  			
  			//Calculates our wind making it lessen		
  			if (minRainIntensity <= 0)
  				{
  					minRainIntensity = 0;
  					//Keeps our wind at 0 if there hasn't been a storm
					windZone.transform.rotation = Quaternion.AngleAxis(0, Vector3.up);
				
					if (windZone.transform.eulerAngles.y <= 0)
					{
						windZone.transform.eulerAngles.y = 1;
			   		 }
				
  				}
  				
  			if (minRainIntensity >= 1)
				{
					//Makes our wind weaker for when the storm ends
					 windZone.transform.Rotate(-Vector3.up * Time.deltaTime * 5);
			
					if (windZone.transform.eulerAngles.y <= 1)
					{
						windZone.transform.eulerAngles.y = 0;
					}
			
				}
			
			
  			 //Keeps our fade numbers from going below 0
  		     if (minFogIntensity <= 0)
  				{
  					minFogIntensity = 0;
  				}
  				
  			if (minRainIntensity >= 1)
  				{
  					//rainOnCamera.enabled = false;
  					
  					sunShaftScript = cameraThing.camera.GetComponent (SunShafts);
   		        	sunShaftScript.sunShaftIntensity = sunShaftFade;
  				}
  		
  			if (fadeStormClouds <= 0)
  			{
  				fadeStormClouds = 0;
  			}
  			
  			if (stormClouds <= 0)
  			{
  				stormClouds = 0;
  			}
  		
  			 if (fade <= 0)
  				{
  					fade = 0;
  				}
  				
  			if (time <= 0)
  				{
  					time = 0;
  				}
  				
  				if (sunShaftFade >= 2)
  				{
  					sunShaftFade = 2;
  					sun.enabled = true;
					sunCloudy.enabled = false;
					RenderSettings.fogDensity += .00012 * Time.deltaTime;
   			
   				//ControlUnityFog
   				//If you wish to have denser fog you can increase the numbers below, you will have to do this for each day without percipitation
   				if (RenderSettings.fogDensity >= fogDensity)
   					{
   						RenderSettings.fogDensity = fogDensity;
   					}
  				}
  				
  		    //If the game speed is fast fade clouds instantly	
  			if (dayLength >= 0 && dayLength <=15) 
  			 	{
  					fade = 0;
  				}
  		}
  		
  		//Mostly Cloudy
 		if (weatherForecaster == 11)
 		{
			fade -= Time.deltaTime * .04;
			fade2 -= Time.deltaTime * .01;
			butterfliesFade -= .04;
			windyLeavesFade -= .04;
			fadeStormClouds -= Time.deltaTime * .04;
			windControl -= Time.deltaTime;
			time -= Time.deltaTime * .14;
			sunShaftFade += Time.deltaTime * .14;
			minRainIntensity -= 1;
			minFogIntensity -= .04;
			minSnowFogIntensity -= .01;	
			minSnowIntensity -= .9;
			stormClouds -= Time.deltaTime * .011;
			light.enabled = false;	
			sunIntensity += .005;
			sun.enabled = true;
			dynamicSnowFade -= Time.deltaTime * .0095; 
			overrideFog = false;
			
			heavyClouds.renderer.material.color.a = fade;
			heavyCloudsLayer1.renderer.material.color.a = fade2;	
			heavyCloudsLayerLight.renderer.material.color.a = fade2;
			
			if (fade2 <= 0)
  				{
					fade2 = 0;
					
					//Fades our sunsafts
   					sunShaftScript = cameraThing.camera.GetComponent (SunShafts);
   					sunShaftScript.sunShaftIntensity = 2;
					
  			    }
					
  			
  				lightClouds1.renderer.enabled = false;

  				lightClouds2.renderer.enabled = true;

  				lightClouds3.renderer.enabled = false;
 
  				lightClouds4.renderer.enabled = false;
 
  				lightClouds5.renderer.enabled = false;
  				
  				highClouds1.renderer.enabled = false;
  				
  				highClouds2.renderer.enabled = false;
  				
  				mostlyCloudyClouds.renderer.enabled = true;

  			
  			//Fade out our butterflies
  			butterflies.particleEmitter.minEmission = butterfliesFade;
  			butterflies.particleEmitter.maxEmission = butterfliesFade;
  			
  			if (butterfliesFade <= 0)
  			{
  				butterfliesFade = 0;
  			}
  			
  			if (windyLeavesFade <= 0)
  			{
  				windyLeavesFade = 0;
  			}
  			
  			//Calculates fading in our particles
  			snow.particleEmitter.minEmission = minSnowIntensity;
			snow.particleEmitter.maxEmission = minSnowIntensity;
			
			snowMistFog.particleEmitter.minEmission = minSnowFogIntensity;
			snowMistFog.particleEmitter.maxEmission = minSnowFogIntensity;
  			
  			//Fade our particles
  			rain.particleEmitter.minEmission = minRainIntensity;
			rain.particleEmitter.maxEmission = minRainIntensity;
			
			mistFog.particleEmitter.minEmission = minFogIntensity;
			mistFog.particleEmitter.maxEmission = minFogIntensity;	
			
			windyLeaves.particleEmitter.minEmission = windyLeavesFade;
			windyLeaves.particleEmitter.maxEmission = windyLeavesFade;	
			
  			
  			//Fades our fog
			fogScript = cameraThing.camera.GetComponent(GlobalFog);
			//rainOnCamera = cameraThing.camera.GetComponent(ImageRefractionEffect);
   			fogScript.globalDensity -= .0005 * Time.deltaTime;
   			fogScript.startDistance += 5 * Time.deltaTime;
   			
   			
   			if (dynamicSnowFade <= .25)
			{
				dynamicSnowFade = .25;
			}
			
			if (dynamicSnowEnabled == true)
  			{
  			snowScript = terrainObject.GetComponent (CustomTerrainScriptAtsV3Snow);
   			snowScript.SnowAmount = dynamicSnowFade;
   			}
   			
   			
   			if (fogScript.globalDensity <= 0)
   			{
   				fogScript.globalDensity = 0;
   			}
   			
   			if (fogScript.startDistance >= 300)
   			{
   				fogScript.startDistance = 300;
   			}
   		
   			//Keep snow from going below 0
  			if (minSnowIntensity <= 0)
  			{
  				minSnowIntensity = 0;
  			}
  			
  			//Keep snow fog from going below 0
  			if (minSnowFogIntensity <= 0)
  			{
  				minSnowFogIntensity = 0;
  			}
  			
  			
  			rainSound.audio.volume -= Time.deltaTime * .04;
  			windSound.audio.volume -= Time.deltaTime * .04;
  			windSnowSound.audio.volume -= Time.deltaTime * .04;
 						
  			//Deactivates UniStorm		
  			GetComponent(UniStorm).enabled = false;
  			
  			if (stormClouds <= 0)
  			{
  				stormClouds = 0;
  			}
  			
  			if (minRainIntensity >= 1)
  			{
  				//rainOnCamera.enabled = false;
  				//Fades our sunsafts
   				sunShaftScript = cameraThing.camera.GetComponent (SunShafts);
   				sunShaftScript.sunShaftIntensity = sunShaftFade;
  			}
  			
  			//Calculates our wind making it lessen		
  			if (minRainIntensity <= 0)
  				{
  					minRainIntensity = 0;
  					//Keeps our wind at 0 if there hasn't been a storm
					windZone.transform.rotation = Quaternion.AngleAxis(0, Vector3.up);
					windZone.gameObject.active = false;
				
					if (windZone.transform.eulerAngles.y <= 1)
					{
						windZone.transform.eulerAngles.y = 0;
						windZone.gameObject.active = false;
			   		 }
				
  				}
  				
  			if (minRainIntensity >= 1)
				{
				//Makes our wind weaker for when the storm ends
				 windZone.transform.Rotate(-Vector3.up * Time.deltaTime * 12);
				 
			
					if (windZone.transform.eulerAngles.y <= 1)
					{
					windZone.transform.eulerAngles.y = 0;
					}
			
				}
	
	
  			//Keeps our fade numbers from going below 0
  		    if (minFogIntensity <= 0)
  			{
  				minFogIntensity = 0;
  			}
  			
  			
  			 if (fade <= 0)
  				{
  				fade = 0;
  				
  				}
  				
  				
  			if (fadeStormClouds <= 0)
  				{
  					fadeStormClouds = 0;
  				}
  				
  			 if (time <= 0)
  				{
  					time = 0;
  				}
  				
  				if (sunShaftFade >= 2)
  				{
  					sunShaftFade = 2;
  					sun.enabled = true;
					sunCloudy.enabled = false;
					RenderSettings.fogDensity += .00012 * Time.deltaTime;
   			
   			//ControlUnityFog
   			//If you wish to have denser fog you can increase the numbers below, you will have to do this for each day without percipitation
   			if (RenderSettings.fogDensity >= fogDensity)
   			{
   				RenderSettings.fogDensity = fogDensity;
   			}
  				}
  				
  		    //If the game speed is fast fade clouds instantly	
  			if (dayLength >= 0 && dayLength <=15) 
  			 	{
  					fade = 0;
  				}
  		}
  		
  		//Cloudy
 		if (weatherForecaster == 9)
 		{
  			windControl += Time.deltaTime * .01;
			fade += Time.deltaTime * .04;
			fade2 += Time.deltaTime * .04;
			butterfliesFade -= .04;
			windyLeavesFade -= .04;
			fadeStormClouds -= Time.deltaTime * .04;
			time -= Time.deltaTime * .14;
			sunShaftFade -= Time.deltaTime * .14;
			minRainIntensity -= 1;
			minFogIntensity -= .04;
			minSnowFogIntensity -= .01;	
			minSnowIntensity -= .9;
			stormClouds -= Time.deltaTime * .011;
			light.enabled = false;
			overrideFog = false;
			dynamicSnowFade -= Time.deltaTime * .0095; 

			heavyClouds.renderer.material.color.a = fade;
			heavyCloudsLayer1.renderer.material.color.a = fade2;	
			heavyCloudsLayerLight.renderer.material.color.a = fade2;	
			
			if (fade2 >= .25)
  				{
					fade2 = .25;
  			    }	
  			    
  			    
  			if (dynamicSnowFade <= .25)
			{
				dynamicSnowFade = .25;
			}
			
			if (dynamicSnowEnabled == true)
  			{
  			snowScript = terrainObject.GetComponent (CustomTerrainScriptAtsV3Snow);
   			snowScript.SnowAmount = dynamicSnowFade;
   			}
  			
  			//Fade out our butterflies
  			butterflies.particleEmitter.minEmission = butterfliesFade;
  			butterflies.particleEmitter.maxEmission = butterfliesFade;
  			
  			if (butterfliesFade <= 0)
  			{
  				butterfliesFade = 0;
  			}
  			
  			if (windyLeavesFade <= 0)
  			{
  				windyLeavesFade = 0;
  			}
  			
  			//Calculates fading in our particles
  			snow.particleEmitter.minEmission = minSnowIntensity;
			snow.particleEmitter.maxEmission = minSnowIntensity;
			
			snowMistFog.particleEmitter.minEmission = minSnowFogIntensity;
			snowMistFog.particleEmitter.maxEmission = minSnowFogIntensity;
  			
  			rain.particleEmitter.minEmission = minRainIntensity;
			rain.particleEmitter.maxEmission = minRainIntensity;
			
			mistFog.particleEmitter.minEmission = minFogIntensity;
			mistFog.particleEmitter.maxEmission = minFogIntensity;	
			
			windyLeaves.particleEmitter.minEmission = windyLeavesFade;
			windyLeaves.particleEmitter.maxEmission = windyLeavesFade;	
  			
			//Fades our fog
			fogScript = cameraThing.camera.GetComponent(GlobalFog);
			//rainOnCamera = cameraThing.camera.GetComponent(ImageRefractionEffect);
   			fogScript.globalDensity -= .0005 * Time.deltaTime;
   			fogScript.startDistance += 5 * Time.deltaTime;
   			
   			RenderSettings.fogDensity -= .00012 * Time.deltaTime;
   			
   			if (RenderSettings.fogDensity <= .0005)
   			{
   				RenderSettings.fogDensity = .0005;
   			}
   			
   			if (fogScript.globalDensity <= 0)
   			{
   				fogScript.globalDensity = 0;
   			}
   			
   			if (fogScript.startDistance >= 300)
   			{
   				fogScript.startDistance = 300;
   			}
   			
   			//Keep snow from going below 0
  			if (minSnowIntensity <= 0)
  			{
  				minSnowIntensity = 0;
  			}
  			
  			//Keep snow fog from going below 0
  			if (minSnowFogIntensity <= 0)
  			{
  				minSnowFogIntensity = 0;
  			}
   			
   			sunShaftScript = cameraThing.camera.GetComponent (SunShafts);
   			sunShaftScript.sunShaftIntensity = sunShaftFade;
   			
  				
  			rainSound.audio.volume -= Time.deltaTime * .07;
  			windSound.audio.volume -= Time.deltaTime * .07;
  			windSnowSound.audio.volume -= Time.deltaTime * .04;
 	
  			GetComponent(UniStorm).enabled = false;
  			
  			
  			//Calculates our wind making it lessen		
  			if (minRainIntensity <= 0)
  				{
  					minRainIntensity = 0;
  					//Keeps our wind at 0 if there hasn't been a storm
					windZone.transform.rotation = Quaternion.AngleAxis(0, Vector3.up);
				
					if (windZone.transform.eulerAngles.y <= 0)
					{
						windZone.transform.eulerAngles.y = 1;
			   		 }
				
  				}
  				
  			if (minRainIntensity >= 1)
				{
					//Makes our wind weaker for when the storm ends
					 windZone.transform.Rotate(-Vector3.up * Time.deltaTime * 5);
			
					if (windZone.transform.eulerAngles.y <= 1)
					{
						windZone.transform.eulerAngles.y = 0;
					}
			
				}
  			
  			
 			//Keeps our fade numbers from going below 0
  			if (minFogIntensity <= 0)
  			{
  				minFogIntensity = 0;
  				sun.enabled = true;
				sunCloudy.enabled = false;
  			}
  		
  			if (fadeStormClouds <= 0)
  			{
  				fadeStormClouds = 0;
  			}
  			
  			if (stormClouds <= 0)
  			{
  				stormClouds = 0;
  			}
  		
  			 if (fade >= 1)
  				{
  					fade = 1;
  				}	
  				
  				if (minRainIntensity <= 50)
  				{
  					//rainOnCamera.enabled = false;
  				}
  				
  			 if (time <= 0)
  				{
  					time = 0;
  				}
  				
  			if (sunShaftFade <= 0)
  				{
  					sunShaftFade = 0;
  				}
  				
  		    //If the game speed is fast fade clouds instantly	
  			if (dayLength >= 0 && dayLength <=15) 
  			 	{
  					fade = 1;
  				}
  		
  		}
  		
  		
  		//Butterflies (Summer Only)
 		if (weatherForecaster == 10)
 		{
 		  if (monthCounter >= 5 && monthCounter <= 7)
 		  {
			fade -= Time.deltaTime * .04;
			fade2 -= Time.deltaTime * .01;
			fadeStormClouds -= Time.deltaTime * .04;
			windControl -= Time.deltaTime;
			time -= Time.deltaTime * .14;
			sunShaftFade += Time.deltaTime * .14;
			minRainIntensity -= 1;
			minFogIntensity -= .04;
			minSnowFogIntensity -= .01;	
			minSnowIntensity -= .9;
			butterfliesFade += .04;
			windyLeavesFade -= .04;
			clearClouds -= Time.deltaTime * 1;
			stormClouds -= Time.deltaTime * .011;
			light.enabled = false;	
			sunIntensity += .005;
			sun.enabled = true;
			dynamicSnowFade -= Time.deltaTime * .0095; 
			overrideFog = false;
			
			heavyClouds.renderer.material.color.a = fade;
			heavyCloudsLayer1.renderer.material.color.a = fade2;	
			heavyCloudsLayerLight.renderer.material.color.a = fade2;
			
			if (fade2 <= 0)
  				{
					fade2 = 0;
  			    }
					
  		    	lightClouds1.renderer.enabled = false;

  				lightClouds2.renderer.enabled = false;

  				lightClouds3.renderer.enabled = false;
 
  				lightClouds4.renderer.enabled = false;
 
  				lightClouds5.renderer.enabled = true;
  				
  				highClouds1.renderer.enabled = false;
  				
  				highClouds2.renderer.enabled = false;
  				
  				mostlyCloudyClouds.renderer.enabled = false;
  			
  			//Fade in our butterflies
  			butterflies.particleEmitter.minEmission = butterfliesFade;
  			butterflies.particleEmitter.maxEmission = butterfliesFade;
  			
  			if (butterfliesFade >= 3)
  			{
  				butterfliesFade = 3;
  			}
  			
  			if (windyLeavesFade <= 0)
  			{
  				windyLeavesFade = 0;
  			}
  			
  			//Fade our particles
  			rain.particleEmitter.minEmission = minRainIntensity;
			rain.particleEmitter.maxEmission = minRainIntensity;
			
			mistFog.particleEmitter.minEmission = minFogIntensity;
			mistFog.particleEmitter.maxEmission = minFogIntensity;	
			
			windyLeaves.particleEmitter.minEmission = windyLeavesFade;
			windyLeaves.particleEmitter.maxEmission = windyLeavesFade;	
			
  			
  			//Fades our fog
			fogScript = cameraThing.camera.GetComponent(GlobalFog);
			//rainOnCamera = cameraThing.camera.GetComponent(ImageRefractionEffect);
   			fogScript.globalDensity -= .0005 * Time.deltaTime;
   			fogScript.startDistance += 5 * Time.deltaTime;
   			
   			
   			if (dynamicSnowFade <= .25)
			{
				dynamicSnowFade = .25;
			}
			
			if (dynamicSnowEnabled == true)
  			{
  			snowScript = terrainObject.GetComponent (CustomTerrainScriptAtsV3Snow);
   			snowScript.SnowAmount = dynamicSnowFade;
   			}
   			
   			
   			if (fogScript.globalDensity <= 0)
   			{
   				fogScript.globalDensity = 0;
   			}
   			
   			if (fogScript.startDistance >= 300)
   			{
   				fogScript.startDistance = 300;
   			}
   			
   			//Keep snow from going below 0
  			if (minSnowIntensity <= 0)
  			{
  				minSnowIntensity = 0;
  			}
  			
  			//Keep snow fog from going below 0
  			if (minSnowFogIntensity <= 0)
  			{
  				minSnowFogIntensity = 0;
  			}
   		
   			//Fades our sunsafts
   			sunShaftScript = cameraThing.camera.GetComponent (SunShafts);
   			sunShaftScript.sunShaftIntensity = sunShaftFade;
  			
  			rainSound.audio.volume -= Time.deltaTime * .04;
  			windSound.audio.volume -= Time.deltaTime * .04;
  			windSnowSound.audio.volume -= Time.deltaTime * .04;
 						
  			//Deactivates UniStorm		
  			GetComponent(UniStorm).enabled = false;
  			
  			if (stormClouds <= 0)
  			{
  				stormClouds = 0;
  			}
  			
  			if (minRainIntensity <= 50)
  			{
  				//rainOnCamera.enabled = false;
  			}
  			
  			//Calculates our wind making it lessen		
  			if (minRainIntensity <= 0)
  				{
  					minRainIntensity = 0;
  					//Keeps our wind at 0 if there hasn't been a storm
					windZone.transform.rotation = Quaternion.AngleAxis(0, Vector3.up);
					windZone.gameObject.active = false;
				
					if (windZone.transform.eulerAngles.y <= 1)
					{
						windZone.transform.eulerAngles.y = 0;
						windZone.gameObject.active = false;
			   		 }
				
  				}
  				
  			if (minRainIntensity >= 1)
				{
				//Makes our wind weaker for when the storm ends
				 windZone.transform.Rotate(-Vector3.up * Time.deltaTime * 12);
				 
			
					if (windZone.transform.eulerAngles.y <= 1)
					{
					windZone.transform.eulerAngles.y = 0;
					}
			
				}
	
	
  			//Keeps our fade numbers from going below 0
  		    if (minFogIntensity <= 0)
  			{
  				minFogIntensity = 0;
  			}
  			
  			
  			 if (fade <= 0)
  				{
  				fade = 0;
  				
  				}
  				
  				
  			if (fadeStormClouds <= 0)
  				{
  					fadeStormClouds = 0;
  				}
  				
  			 if (time <= 0)
  				{
  					time = 0;
  				}
  				
  				if (sunShaftFade >= 2)
  				{
  					sunShaftFade = 2;
  					sun.enabled = true;
					sunCloudy.enabled = false;
					RenderSettings.fogDensity += .00012 * Time.deltaTime;
   			
   			//ControlUnityFog
   			//If you wish to have denser fog you can increase the numbers below, you will have to do this for each day without percipitation
   			if (RenderSettings.fogDensity >= fogDensity)
   			{
   				RenderSettings.fogDensity = fogDensity;
   			}
  				}
  				
  		    //If the game speed is fast fade clouds instantly	
  			if (dayLength >= 0 && dayLength <=15) 
  			 	{
  					fade = 0;
  				}
  			}
  		}
  		
  		
  		//Heavy Rain (No Thunder)
 		if (weatherForecaster == 12)
 		{
 			if (temperature >= 33)
 			{
			fade += Time.deltaTime * .04;
			fade2 += Time.deltaTime * .04;
			butterfliesFade -= .04;
			windyLeavesFade -= .04;
			fadeHorizonController += Time.deltaTime * .04;
			fadeStormClouds += Time.deltaTime * .04;
			time += Time.deltaTime * .0014;
			windControlUp += 1;
			sunShaftFade -= Time.deltaTime * .14;
			minRainIntensity += .2;
			minFogIntensity += .008;
			minSnowFogIntensity -= .01;	
			minSnowIntensity -= .9;	
			stormClouds += Time.deltaTime * .011;
			sunIntensity -= .005;
			dynamicSnowFade -= Time.deltaTime * .0095; 
			
			
			//Slowly increases the wind to make it stronger fort the storm
			if (minRainIntensity >= 1)
			{
  				//Makes our wind stronger for the storm
				windZone.transform.Rotate(Vector3.up * Time.deltaTime * 3);
				windZone.gameObject.active = true;
			}
			
			if (windZone.transform.eulerAngles.y >= 180)
			{
				windZone.transform.eulerAngles.y = 180;
			}
		
			
			//Fades in storm clouds
			heavyClouds.renderer.material.color.a = fade;	
			heavyCloudsLayer1.renderer.material.color.a = fade2;	
			heavyCloudsLayerLight.renderer.material.color.a = fade2;	
			
			if (fade2 >= .25)
  				{
					fade2 = .25;
  			    }
  			    
  		    //Fade out our butterflies
  			butterflies.particleEmitter.minEmission = butterfliesFade;
  			butterflies.particleEmitter.maxEmission = butterfliesFade;
  			
  			if (butterfliesFade <= 0)
  			{
  				butterfliesFade = 0;
  			}
  			
  			if (windyLeavesFade <= 0)
  			{
  				windyLeavesFade = 0;
  			}
  			
  			if (dynamicSnowFade <= .25)
			{
				dynamicSnowFade = .25;
			}
			
			if (dynamicSnowEnabled == true)
  			{
  			snowScript = terrainObject.GetComponent (CustomTerrainScriptAtsV3Snow);
   			snowScript.SnowAmount = dynamicSnowFade;
   			}
  			
  			//Calculates fading in our particles
  			snow.particleEmitter.minEmission = minSnowIntensity;
			snow.particleEmitter.maxEmission = minSnowIntensity;
			
			snowMistFog.particleEmitter.minEmission = minSnowFogIntensity;
			snowMistFog.particleEmitter.maxEmission = minSnowFogIntensity;
  			
  			rain.particleEmitter.minEmission = minRainIntensity;
			rain.particleEmitter.maxEmission = minRainIntensity;
			
			mistFog.particleEmitter.minEmission = minFogIntensity;
			mistFog.particleEmitter.maxEmission = minFogIntensity;	
			
			windyLeaves.particleEmitter.minEmission = windyLeavesFade;
			windyLeaves.particleEmitter.maxEmission = windyLeavesFade;	
  			
  			//Fades our fog in

   			//rainOnCamera = cameraThing.camera.GetComponent(ImageRefractionEffect);
   			
   			//fadeHorizonStorm.renderer.material.color.a = fadeHorizonController;	
   			RenderSettings.fogDensity -= .00012 * Time.deltaTime;
   			
   			if (RenderSettings.fogDensity <= .0006)
   			{
   				RenderSettings.fogDensity = .0006;
   				fogScript = cameraThing.camera.GetComponent(GlobalFog);
   				fogScript.globalDensity += .0008 * Time.deltaTime;
   				fogScript.startDistance -= 5 * Time.deltaTime;
   				
   			if (fogScript.startDistance <= 30)
   			{
   				fogScript.startDistance = 30;
   				fogScript.globalDensity -= .0005 * Time.deltaTime;
   			}
   				
		    if (overrideFog == false)
		    {
		    
		       fogScript.globalDensity += .0005 * Time.deltaTime;
		    
   			if (fogScript.globalDensity >= .0038)
   			    {   			    
   					fogScript.globalDensity = .0038;
   			    }
   			  }
   			}
   			
   			if (overrideFog == true)
		    {
		    	fogScript.globalDensity -= .001 * Time.deltaTime;
		    	
		    	if (fogScript.globalDensity <= .0038)
   			    {   			    
   					fogScript.globalDensity = .0038;
   			    }
		    }
		    
		    //Keep snow from going below 0
  			if (minSnowIntensity <= 0)
  			{
  				minSnowIntensity = 0;
  			}
  			
  			//Keep snow fog from going below 0
  			if (minSnowFogIntensity <= 0)
  			{
  				minSnowFogIntensity = 0;
  			}
   					
   			//Fades the sunshafts in
   			sunShaftScript = cameraThing.camera.GetComponent (SunShafts);
   			sunShaftScript.sunShaftIntensity = sunShaftFade;
   	
  			
  			rainSound.audio.volume += Time.deltaTime * .01;
  			windSound.audio.volume += Time.deltaTime * .01;
  			windSnowSound.audio.volume -= Time.deltaTime * .04;
			
			//Acivates UniStorm system
  			GetComponent(UniStorm).enabled = false;
  			
  			
  			//Gradually fades our rain effects in
  			if (minRainIntensity >= maxStormRainIntensity)
  			{
  				minRainIntensity = maxStormRainIntensity;
  			}
  			
  			if (minRainIntensity >= 50)
  			{
  				//rainOnCamera.enabled = true;
  			}
  			
  			if (minFogIntensity >= maxStormMistCloudsIntensity)
  			{
  				minFogIntensity = maxStormMistCloudsIntensity;
  			}
  		
  		
  			if (stormClouds >= .55)
  			{
  				stormClouds = .55;
  			}
  			
  			if (fade >= .40)
  				{
  				    
  				}
  				
  			if (fade >= .4)
  				{
					//fadeHorizon.renderer.enabled = false;
  				}
  				
  			if (fade2 >= .25)
  				{
					fade2 = .25;
  				}
  			
  			 if (fade >= 1)
  				{
  					fade = 1;
  				}
  				
  		   if (fadeStormClouds >= 1)
  				{
  					fadeStormClouds = 1;
  				}
  				
  				
  			 if (sunShaftFade <= .1)
  				{
  					sunShaftFade = 0;
  				}	
  				
  				
  			 if (time >= 1)
  				{
  					time = 1;
  				}
  				
  		    //If the game speed is fast forward fade clouds instantly	
  			if (dayLength >= 0 && dayLength <=15) 
  			 	{
  					fade = 1;
  				}
  			}
  		}
  		
  	//Falling Fall Leaves
 		if (weatherForecaster == 13)
 		{
 		  if (monthCounter >= 8 && monthCounter <= 10)
 		  {
			fade -= Time.deltaTime * .04;
			fade2 -= Time.deltaTime * .01;
			butterfliesFade -= .04;
			windyLeavesFade += .04;
			fadeStormClouds -= Time.deltaTime * .04;
			windControl -= Time.deltaTime;
			time -= Time.deltaTime * .14;
			sunShaftFade += Time.deltaTime * .14;
			minRainIntensity -= 1;
			minFogIntensity -= .04;
			minSnowFogIntensity -= .01;	
			minSnowIntensity -= .9;
			stormClouds -= Time.deltaTime * .011;
			light.enabled = false;	
			sunIntensity += .005;
			sun.enabled = true;
			dynamicSnowFade -= Time.deltaTime * .0095; 
			overrideFog = false;
			
			heavyClouds.renderer.material.color.a = fade;
			heavyCloudsLayer1.renderer.material.color.a = fade2;	
			heavyCloudsLayerLight.renderer.material.color.a = fade2;
			
			if (fade2 <= 0)
  				{
					fade2 = 0;
					
					//Fades our sunsafts
   					sunShaftScript = cameraThing.camera.GetComponent (SunShafts);
   					sunShaftScript.sunShaftIntensity = 2;
					
  			    }
					
  			
  				lightClouds1.renderer.enabled = true;

  				lightClouds2.renderer.enabled = true;

  				lightClouds3.renderer.enabled = false;
 
  				lightClouds4.renderer.enabled = false;
 
  				lightClouds5.renderer.enabled = false;
  				
  				highClouds1.renderer.enabled = true;
  				
  				highClouds2.renderer.enabled = false;
  				
  				mostlyCloudyClouds.renderer.enabled = false;

  			
  			//Fade out our butterflies
  			butterflies.particleEmitter.minEmission = butterfliesFade;
  			butterflies.particleEmitter.maxEmission = butterfliesFade;
  			
  			if (windyLeavesFade >= 6)
  			{
  				windyLeavesFade = 6;
  			}
  			
  			//Calculates fading in our particles
  			snow.particleEmitter.minEmission = minSnowIntensity;
			snow.particleEmitter.maxEmission = minSnowIntensity;
			
			snowMistFog.particleEmitter.minEmission = minSnowFogIntensity;
			snowMistFog.particleEmitter.maxEmission = minSnowFogIntensity;
  			
  			rain.particleEmitter.minEmission = minRainIntensity;
			rain.particleEmitter.maxEmission = minRainIntensity;
			
			mistFog.particleEmitter.minEmission = minFogIntensity;
			mistFog.particleEmitter.maxEmission = minFogIntensity;	
			
			windyLeaves.particleEmitter.minEmission = windyLeavesFade;
			windyLeaves.particleEmitter.maxEmission = windyLeavesFade;	
			
			if (butterfliesFade <= 0)
  			{
  				butterfliesFade = 0;
  			}
			
  			
  			//Fades our fog
			fogScript = cameraThing.camera.GetComponent(GlobalFog);
			//rainOnCamera = cameraThing.camera.GetComponent(ImageRefractionEffect);
   			fogScript.globalDensity -= .0005 * Time.deltaTime;
   			fogScript.startDistance += 5 * Time.deltaTime;
   			
   			if (dynamicSnowFade <= .25)
			{
				dynamicSnowFade = .25;
			}
			
			if (dynamicSnowEnabled == true)
  			{
  			snowScript = terrainObject.GetComponent (CustomTerrainScriptAtsV3Snow);
   			snowScript.SnowAmount = dynamicSnowFade;
   			}
   			
   			
   			if (fogScript.globalDensity <= 0)
   			{
   				fogScript.globalDensity = 0;
   			}
   			
   			if (fogScript.startDistance >= 300)
   			{
   				fogScript.startDistance = 300;
   			}
   		
   			//Keep snow from going below 0
  			if (minSnowIntensity <= 0)
  			{
  				minSnowIntensity = 0;
  			}
  			
  			//Keep snow fog from going below 0
  			if (minSnowFogIntensity <= 0)
  			{
  				minSnowFogIntensity = 0;
  			}			
  			
  			rainSound.audio.volume -= Time.deltaTime * .04;
  			windSound.audio.volume -= Time.deltaTime * .04;
  			windSnowSound.audio.volume -= Time.deltaTime * .04;
 						
  			//Deactivates UniStorm		
  			GetComponent(UniStorm).enabled = false;
  			
  			if (stormClouds <= 0)
  			{
  				stormClouds = 0;
  			}
  			
  			if (minRainIntensity >= 1)
  			{
  				//rainOnCamera.enabled = false;
  				//Fades our sunsafts
   				sunShaftScript = cameraThing.camera.GetComponent (SunShafts);
   				sunShaftScript.sunShaftIntensity = sunShaftFade;
  			}
  			
  			//Calculates our wind making it lessen		
  			if (minRainIntensity <= 0)
  				{
  					minRainIntensity = 0;
  					//Keeps our wind at 0 if there hasn't been a storm
					windZone.transform.rotation = Quaternion.AngleAxis(0, Vector3.up);
					windZone.gameObject.active = false;
				
					if (windZone.transform.eulerAngles.y <= 1)
					{
						windZone.transform.eulerAngles.y = 0;
						windZone.gameObject.active = false;
			   		 }
				
  				}
  				
  			if (minRainIntensity >= 1)
				{
				//Makes our wind weaker for when the storm ends
				 windZone.transform.Rotate(-Vector3.up * Time.deltaTime * 12);
				 
			
					if (windZone.transform.eulerAngles.y <= 1)
					{
					windZone.transform.eulerAngles.y = 0;
					}
			
				}
	
	
  			//Keeps our fade numbers from going below 0
  		    if (minFogIntensity <= 0)
  			{
  				minFogIntensity = 0;
  			}
  			
  			
  			 if (fade <= 0)
  				{
  				fade = 0;
  				
  				}
  				
  				
  			if (fadeStormClouds <= 0)
  				{
  					fadeStormClouds = 0;
  				}
  				
  			 if (time <= 0)
  				{
  					time = 0;
  				}
  				
  				if (sunShaftFade >= 2)
  				{
  					sunShaftFade = 2;
  					sun.enabled = true;
					sunCloudy.enabled = false;
					RenderSettings.fogDensity += .00012 * Time.deltaTime;
   			
   			//ControlUnityFog
   			//If you wish to have denser fog you can increase the numbers below, you will have to do this for each day without percipitation
   			if (RenderSettings.fogDensity >= fogDensity)
   			{
   				RenderSettings.fogDensity = fogDensity;
   			}
  				}
  				
  		    //If the game speed is fast fade clouds instantly	
  			if (dayLength >= 0 && dayLength <=15) 
  			 	{
  					fade = 0;
  				}
  			}
  		}
  	
  }
  
function OnGUI () {
	
	if (timeScrollBar == true)
	{
	//Allows a scrolling GUI bar that controls the time of day by the user
	startTime= GUI.HorizontalSlider( Rect(20,20,200,30), startTime, 0,1.0);
	}
	 
	   if (commandPromptActive)
	    {
			stringToEdit = GUI.TextField (Rect (10, 430, 40, 20), stringToEdit, 10);
		}
	
}


function FixedUpdate ()
{
	if (weatherCommandPromptUseable == true)
	{
		weatherCommandPrompt ();
	}
}


function weatherCommandPrompt ()
{
	//Calculates our weather command prompts
	if (stringToEdit == foggy)
	{
		weatherForecaster = 1;
		print ("Weather Forced: Foggy");
	}
	
	if (stringToEdit == lightRain_lightSnow)
	{
		weatherForecaster = 2;
		print ("Weather Forced: Light Rain/Light Snow (Winter Only)");
	}
	
	if (stringToEdit == rainStorm_snowStorm)
	{
		weatherForecaster = 3;
		print ("Weather Forced: Tunder Storm/Snow Storm (Winter Only)");
	}
	
	if (stringToEdit == partlyCloudy1)
	{
		weatherForecaster = 4;
		print ("Weather Forced: Partly Cloudy 1");
	}
	
	if (stringToEdit == partlyCloudy2)
	{
		weatherForecaster = 5;
		print ("Weather Forced: Partly Cloudy 2");
	}
	
	if (stringToEdit == partlyCloudy3)
	{
		weatherForecaster = 6;
		print ("Weather Forced: Partly Cloudy 3");
	}
	
	if (stringToEdit == clear1)
	{
		weatherForecaster = 7;
		print ("Weather Forced: Clear 1");
	}
	
	if (stringToEdit == clear2)
	{
		weatherForecaster = 8;
		print ("Weather Forced: Clear 2");
	}
	
	if (stringToEdit == cloudy)
	{
		weatherForecaster = 9;
		print ("Weather Forced: Cloudy");
	}
	
	if (stringToEdit == butterfliesSummer)
	{
		weatherForecaster = 10;
		print ("Weather Forced: Butterflies (Summer Only)");
	}
	
	if (stringToEdit == mostlyCloudy)
	{
		weatherForecaster = 11;
		print ("Weather Forced: Mostly Cloudy");
	}
		
	if (stringToEdit == heavyRain)
	{
		weatherForecaster = 12;
		print ("Weather Forced: Heavy Rain (No Thunder)");
	}
	
	if (stringToEdit == fallLeaves)
	{
		weatherForecaster = 13;
		print ("Weather Forced: Falling Fall Leaves (Fall Only)");
	}
	//else
	//print ("Incorrect ID, please refer UniStorm documentation for ID's");
	
}	



  		
  		
  		 

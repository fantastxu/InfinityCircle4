//UniStorm v1.4 @ Copyright
//Black Horzion Studios

@script ExecuteInEditMode()

//The higher, the longer the bolt will be; between 0.0 and 1.00.
var flashLength : float;

//The higher, the less likely there will be lightning; between 0.0 and 1.00.
var lightningStrikeOdds : float;

//Minimum and maximum light intensity.
var minIntensity : float;
var maxIntensity : float;

//Random degree rotation amount.
var minRotationAmount : float;
var maxRotationAmount : float;

//Lock angles X and Z based off Min and Max so they don't cast too far above or below terrain.
var minRotationAmountX : float;
var maxRotationAmountX : float;

var minRotationAmountZ : float;
var maxRotationAmountZ : float;

//var lightningColorFade : float = 1.0;

//Get ambient color, this is our sky color in real time.
//var timeOfDay = Color.grey;
//static var ambientLight : Color; 

//Get the lightning bolt game objects.
var lightningBolt1 : GameObject;
var lightningBolt2 : GameObject;

//Create a sound column.
var lightningSound : AudioClip[];

//TEST random lightning color
//var lightningColor1 : Color = Color.grey;
//var lightningColor2 : Color = Color.grey;

//Random calculater
random = Random.Range(0.0f, 65535.0f); 

//Pick light source, and set timer.
private var lastTime = 0;
private var lightSource;
private var random : float;

function Start()
{
    lightSource = GetComponent(Light);   
    //cameraSource = GetComponent(Camera); 
}

function Update ()
{
	
	//Get background color so it updates instantly in the editor, this is our cloud shader.
	//RenderSettings.ambientLight = timeOfDay;
		
    if ((Time.time - lastTime) > flashLength)
    {
      		
        if (Random.value > lightningStrikeOdds)
      {		
   
      		//Instaniate the lightning bolts when lightning is called.
      		Instantiate (lightningBolt1);
      		Instantiate (lightningBolt2);
      		
      		//Lock angles X and Z so they don't cast too far above or below terrain.
      		//Calculate a random Y axis rotation based on input.
      		var randomRotateRange = Mathf.PerlinNoise(random, Time.time);
      		randomRotateNumber = Mathf.Lerp(minRotationAmount, maxRotationAmount, randomRotateRange);
      		transform.Rotate (0, randomRotateNumber, 0);  		
      		
      		//Calculate random range for X based off locked roation inputs.
      		var randomRotateRangeX = Mathf.PerlinNoise(random, Time.time);
      		randomRotateNumberX = Mathf.Lerp(minRotationAmountX, maxRotationAmountX, randomRotateRangeX);
      		transform.Rotate (0, randomRotateNumberX, 0);
      		
      		//Calculate random range for X based off locked roation inputs.
      		var randomRotateRangeZ = Mathf.PerlinNoise(random, Time.time);
      		randomRotateNumberZ = Mathf.Lerp(minRotationAmountZ, maxRotationAmountZ, randomRotateRangeZ);
      		transform.Rotate (0, randomRotateNumberZ, 0);
      		
    		transform.eulerAngles.x = randomRotateNumberX;
    		transform.eulerAngles.z = randomRotateNumberZ;
    		
      		//Calculate random range for light intensity based off user's input of min and max
      		var noise = Mathf.PerlinNoise(random, Time.time);
      		light.intensity = Mathf.Lerp(minIntensity, maxIntensity, noise);
      		
      		//TEST random lightning color
      		//var time : float = Mathf.PingPong (Time.time, lightningColorFade) / lightningColorFade;
   		    //light.color = Color.Lerp (lightningColor1, lightningColor2, time);
      	
      		//Random number reached, lighting enabled
        	light.enabled = true;      	
  		    
   		    //Play random sound picked from audioclip.       	
   			audio.PlayOneShot(lightningSound[Random.Range(0,lightningSound.Length)]);
        	   	               		
      }
      
      //If number isn't reached, there is no lightning.
        else
        	
        	light.enabled = false;
        	lastTime = Time.time;            
			        
}
}
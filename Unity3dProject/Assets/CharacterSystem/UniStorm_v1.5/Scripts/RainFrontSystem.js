//Random Rain Front System @ Copyright
//Black Horizon Studios

//Rain absolute speed
var speed: float = 20.0; 

//Terrain size
var xMin: float = 0.0; 
var xMax: float = 5000.0;
var zMin: float = 0.0;
var zMax: float = 5000.0;

private var point: Vector3;

function Start(){
  //Force a new random point in the first Update:
  point = transform.position;
}

function Update(){
  if (transform.position == point){ 
  
  	//draw new x, z coordinates, but don't change the original y
    point.x = Random.Range(xMin, xMax); 
    point.z = Random.Range(zMin, zMax);
  }
  
  //Move towards the current random point
  transform.position = Vector3.MoveTowards(transform.position, point, speed*Time.deltaTime);
}
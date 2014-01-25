using UnityEngine;
using System.Collections;

public class PlayerController : MonoBehaviour {
	public GameObject aim;

	public float viewDiatance;
	public InteractiveObj target;

	public Color aimColor;
	public Color missColor;

	public float startFOV;
	public float endFOV;

	public float lerpValue;

	public Camera cam;

	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		//int layer=LayerMask.NameToLayer("Interactive");
		RaycastHit hit;
		Vector3 fwd= transform.TransformDirection (Vector3.forward)* viewDiatance;
		Debug.DrawRay(transform.position, fwd,Color.green);


		if (Physics.Raycast (transform.position, fwd,out hit,viewDiatance)) 
		{
			
			if (hit.collider.gameObject.layer==LayerMask.NameToLayer("Interactive") )
			{
	        	//Debug.Log(hit.collider.name);
	        	//Debug.Log(hit.normal);
	        	
	        	//target=hit.collider.gameObject.transform;
	        	//aim.renderer.material.color=Color.red;
	        	//Debug.Log("hit target");

	        	target=(InteractiveObj)hit.collider.gameObject.GetComponent(typeof(InteractiveObj) );
	        	aim.renderer.material.SetColor("_TintColor",aimColor);
	        	//Debug.Log(target);
	        }
	        else
	        {
	        	target=null;
	        	//Debug.Log("not target");
	        	aim.renderer.material.SetColor("_TintColor",missColor);
	        }
	    }
	    else
	    {
	    	//Debug.Log("miss target");
	    	target=null;
	    	aim.renderer.material.SetColor("_TintColor",missColor);
	    }

	    if (target!=null){
	    	if (Input.GetMouseButtonDown(0) ){
	    		target.Action();
	    	}	
	    }

	    
	    if (Input.GetMouseButton(1) ){
	    	if (lerpValue<1){
	    		lerpValue+=Time.deltaTime;	
	    	}
	    	
	    }
	    else{
	    	if (lerpValue>0){
	    		lerpValue-=Time.deltaTime;	
	    	}
	    	else{
	    		lerpValue=0;
	    	}
	    }

	    cam.fieldOfView=Mathf.Lerp(startFOV,endFOV,lerpValue);
	}
}

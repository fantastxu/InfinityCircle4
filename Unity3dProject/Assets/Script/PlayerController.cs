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

	public HeroAnim playerAnim;
	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		//int layer=LayerMask.NameToLayer("Interactive");
		RaycastHit[] hit;
		Vector3 fwd= transform.TransformDirection (Vector3.forward)* viewDiatance;
		Debug.DrawRay(transform.position, fwd,Color.green);


		hit = Physics.RaycastAll (transform.position, fwd,viewDiatance);
		{
			target = null;
			foreach(RaycastHit h in hit)
			{
				if (h.collider.gameObject.layer==LayerMask.NameToLayer("Interactive") )
				{
					//Debug.Log(hit.collider.name);
					//Debug.Log(hit.normal);
					
					//target=hit.collider.gameObject.transform;
					//aim.renderer.material.color=Color.red;
					//Debug.Log("hit target");
					
					target=(InteractiveObj)h.collider.gameObject.GetComponent(typeof(InteractiveObj) );
					aim.renderer.material.SetColor("_TintColor",aimColor);
					//Debug.Log(target);
					break;
				}
	

			}

			if(target == null)
			{
				target=null;
				//Debug.Log("not target");
				aim.renderer.material.SetColor("_TintColor",missColor);
			}
	    }
	    /*
		else
	    {
	    	//Debug.Log("miss target");
	    	target=null;
	    	aim.renderer.material.SetColor("_TintColor",missColor);
	    }
	    */

	    if (target!=null){
	    	if (Input.GetMouseButtonDown(0) ){
	    		target.Action(this.gameObject);
	    	}	
	    }

	    
	    if (Input.GetMouseButton(1) ){
	    	if (lerpValue<1){
	    		lerpValue+=Time.deltaTime;	
	    	}
	    	playerAnim.gameObject.animation.Stop();
	    	playerAnim.enabled=false;
	    }
	    else{
	    	if (lerpValue>0){
	    		lerpValue-=Time.deltaTime;	
	    	}
	    	else{
	    		lerpValue=0;
	    	}
	    	playerAnim.enabled=true;
	    }

	    cam.fieldOfView=Mathf.Lerp(startFOV,endFOV,lerpValue);
	}
}

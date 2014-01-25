using UnityEngine;
using System.Collections;
using Holoville.HOTween;

public class SimpleRotator : InteractiveObj {

    public float rotateDegree = 180.0f;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
    
	override public void Action(GameObject go)
    {
        GameObject animObj = GetAnimObject();
        
        Vector3 euler = animObj.transform.localEulerAngles;
        
        HOTween.To(animObj.transform, 1, "localEulerAngles", new Vector3(euler.x + rotateDegree, euler.y, euler.z));
    }
    
}

using UnityEngine;
using System.Collections;
using Holoville.HOTween;

public class SimpleRotator : InteractiveObj {

    public float rotateDegree = 180.0f;
    public Vector3 rotateAxis = new Vector3(1, 0, 0);
    
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
        
        HOTween.To(animObj.transform, 1, "localEulerAngles", new Vector3(euler.x + rotateAxis.x * rotateDegree, 
            euler.y + rotateAxis.y * rotateDegree, 
            euler.z + rotateAxis.z * rotateDegree));
        
        AudioSource audio = GetComponent<AudioSource>();
        if (audio != null)
        {
            audio.Play();
        }
    }
    
}

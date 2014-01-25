using UnityEngine;
using System.Collections;
using Holoville.HOTween;

public class PaitingPasswordsTween : MonoBehaviour {

	float escapedtime = 0.0f;
	public float timeInterval = 6.0f;
	// Use this for initialization
	void Start () 
	{

	}
	
	// Update is called once per frame
	void Update () 
	{
		escapedtime += Time.deltaTime;
		if(escapedtime >= timeInterval)
		{
			HOTween.To(gameObject.transform, 0.5f,  new TweenParms() 
			           .Prop("localPosition",new Vector3(0.0f, 0.2f, 0.0f), true)
			           .Loops(2,LoopType.Yoyo));

			escapedtime = 0.0f;
		}
	}
}

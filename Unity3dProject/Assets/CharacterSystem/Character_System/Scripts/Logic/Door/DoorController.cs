using UnityEngine;
using System.Collections;
using Holoville.HOTween;

public class DoorController : MonoBehaviour {

	public GameObject doorObj;
	public AudioClip openClip;
	public AudioClip closeClip;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	void Open(){
		this.audio.PlayOneShot(openClip);

		HOTween.To(transform, 5.0f, new TweenParms()
            .Prop("localRotation", new Vector3(0, -170.0f, 0), false) // Position tween (set as relative)
            //.Prop("rotation", new Vector3(0, 1024, 0), true) // Relative rotation tween (this way rotations higher than 360 can be applied)
            //.Loops(2, LoopType.Yoyo) // Infinite yoyo loops
            .Ease(EaseType.EaseInOutQuad) // Ease
            //.OnStepComplete(Cube2StepComplete) // OnComplete callback
        );
	}
}

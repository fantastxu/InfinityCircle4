using UnityEngine;
using System.Collections;
using Holoville.HOTween;

public class PianoButton : InteractiveObj {
	//private Tweener t;

	public AudioClip sound;

	public GameObject piano;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	
	override public void Action(GameObject _actionBody){
		if (sound!=null){
			piano.audio.PlayOneShot(sound);	
		}
		
		/*
		if (t!=null){
			HOTween.Restart(t);
			t=null;
			return;
		}
		*/
		HOTween.To(transform, 0.2f, new TweenParms()
            .Prop("localPosition", new Vector3(0, -0.03f, 0), false) // Position tween (set as relative)
            //.Prop("rotation", new Vector3(0, 1024, 0), true) // Relative rotation tween (this way rotations higher than 360 can be applied)
            .Loops(2, LoopType.Yoyo) // Infinite yoyo loops
            .Ease(EaseType.EaseInOutQuad) // Ease
            //.OnStepComplete(Cube2StepComplete) // OnComplete callback
        );
	}
}

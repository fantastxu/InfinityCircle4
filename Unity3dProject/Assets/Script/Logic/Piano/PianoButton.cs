using UnityEngine;
using System.Collections;
using Holoville.HOTween;

public class PianoButton : InteractiveObj {
	//private Tweener t;

	public AudioClip sound;

	public GameObject piano;

	public int fingerState;

	public Piano pianoScript;

	public Transform fptarget;

	public GameObject ptObj;
	void Awake(){
		pianoScript=(Piano)piano.GetComponent(typeof(Piano));
	}
	// Use this for initialization
	void Start () {
		
		GenerateFingerPrint();
	}



	void GenerateFingerPrint(){
		
		if (sound!=null && fingerState==0){
			Debug.Log("Generate fp");
			fingerState=Random.Range(0,3);
			if (fingerState>2){
				fingerState=2;
			}

			if (fingerState!=0){
				pianoScript.AddMaximum();
				if (fingerState==1){
					ptObj=(GameObject)Instantiate(pianoScript.fingerPrints[Random.Range(0,pianoScript.fingerPrints.Length)],fptarget.position,Quaternion.identity );
					ptObj.layer=LayerMask.NameToLayer("Human");
					ptObj.transform.parent=this.transform;
				}
				else if (fingerState==2){
					ptObj=(GameObject)Instantiate(pianoScript.fingerPrints[Random.Range(0,pianoScript.fingerPrints.Length)],fptarget.position,Quaternion.identity );
					ptObj.layer=LayerMask.NameToLayer("Ghost");
					ptObj.transform.parent=this.transform;
				}
			}


		}
	
	
	}


	
	// Update is called once per frame
	void Update () {
		
	}
	
	override public void Action(GameObject _actionBody){
		if (sound!=null){
			piano.audio.PlayOneShot(sound);	
		}

		pianoScript.InputVal(fingerState);
		
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

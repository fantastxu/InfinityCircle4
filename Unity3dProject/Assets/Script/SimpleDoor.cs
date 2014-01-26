using UnityEngine;
using System.Collections;
using Holoville.HOTween;

public class SimpleDoor : InteractiveObj {

    public bool isLocked = true;
    
    public bool isOpened = false;
    
    public AudioClip[] doorAudio = new AudioClip[2];
    
    public Collider occludeCollider;
    
    public Vector3 openRotation = new Vector3(0, 90, 0);
    public Vector3 closeRotation = new Vector3(0, 0, 0);
    
    public float gripRotation = -45.0f;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
    
	override public void Action(GameObject go)
    {
        if (isLocked)
        {
            // only play sfx
            AudioSource audio = GetComponent<AudioSource>();
            if (audio != null && doorAudio[1] != null)
            {
                audio.PlayOneShot(doorAudio[1]);
            }
            
            Sequence sequence = new Sequence(new SequenceParms().Loops(1, LoopType.Yoyo));
            // "Append" will add a tween after the previous one/s have completed
            sequence.Append(HOTween.To(this.transform, 0.25f, "localEulerAngles", new Vector3(0, 0, 0)));
            sequence.Append(HOTween.To(this.transform, 0.25f, "localEulerAngles", new Vector3(0, 0, gripRotation)));
            sequence.Append(HOTween.To(this.transform, 0.01f, "localEulerAngles", new Vector3(0, 0, 0.0f)));
            sequence.Play();
        }
        else
        {
            isOpened = !isOpened;
            
            GameObject animObj = GetAnimObject();
            if (animObj)
            {
                Vector3 euler = animObj.transform.localEulerAngles;
        
                if (isOpened)
                {
                    HOTween.To(animObj.transform, 1, "localEulerAngles", openRotation);
                }
                else
                {
                    HOTween.To(animObj.transform, 1, "localEulerAngles", closeRotation);
                }
                
                Sequence sequence = new Sequence(new SequenceParms().Loops(1, LoopType.Yoyo));
                // "Append" will add a tween after the previous one/s have completed
                sequence.Append(HOTween.To(this.transform, 0.25f, "localEulerAngles", new Vector3(0, 0, 0)));
                sequence.Append(HOTween.To(this.transform, 0.25f, "localEulerAngles", new Vector3(0, 0, gripRotation)));
                sequence.Append(HOTween.To(this.transform, 0.01f, "localEulerAngles", new Vector3(0, 0, 0.0f)));
                sequence.Play();
            }
            
            
            
            if (isOpened)
            {
                // disable collider
                if (occludeCollider != null)
                    occludeCollider.enabled = false;
            }
            else
            {
                // enable collider
                if (occludeCollider != null)
                    occludeCollider.enabled = true;
            }
            
            AudioSource audio = GetComponent<AudioSource>();
            if (audio != null && doorAudio[0] != null)
            {
                audio.PlayOneShot(doorAudio[0]);
            }
        }
    }
    
}

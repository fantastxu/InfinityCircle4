using UnityEngine;
using System.Collections;
using Holoville.HOTween;

public class SimpleDrawer : InteractiveObj {

    public bool isOpened = false;
    public float drawerLength = 0.15f;
    
    public AudioClip[] drawAudio = new AudioClip[2];
    
	// Use this for initialization
	void Start () {
	}
	
	// Update is called once per frame
	void Update () {
	
	}
    
	override public void Action(GameObject go)
    {
        GameObject animObj = GetAnimObject();
        
        Vector3 pos = animObj.transform.localPosition;
        if (isOpened)
        {
            HOTween.To(animObj.transform, 1, "localPosition", new Vector3(pos.x, pos.y, pos.z - drawerLength));
            isOpened = false;
            
            AudioSource audio = GetComponent<AudioSource>();
            if (audio != null && drawAudio[1] != null)
            {
                audio.PlayOneShot(drawAudio[1]);
            }
        }
        else
        {
            HOTween.To(animObj.transform, 1, "localPosition", new Vector3(pos.x, pos.y, pos.z + drawerLength));
            isOpened = true;
            
            AudioSource audio = GetComponent<AudioSource>();
            if (audio != null && drawAudio[0] != null)
            {
                audio.PlayOneShot(drawAudio[0]);
            }
        }
	}
}

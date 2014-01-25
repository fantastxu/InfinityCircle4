using UnityEngine;
using System.Collections;

public class TVTuner : SimpleRotator {

    int channel = 0;
    int channelNum = 8;
	// Use this for initialization
	void Start () {
	}
	
	// Update is called once per frame
	void Update () {
	
	}
    
	override public void Action(GameObject go)
    {
        base.Action(go);
        
        channel = (channel + 1) % channelNum;
        
        AudioSource audio = GetComponent<AudioSource>();
        if (audio != null)
        {
            audio.Play();
        }
    }
}

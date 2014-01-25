using UnityEngine;
using System.Collections;
using Holoville.HOTween;

public class SimpleDrawer : InteractiveObj {

    public bool isOpened = false;
    public float drawerLength = 0.15f;
    
	// Use this for initialization
	void Start () {
	}
	
	// Update is called once per frame
	void Update () {
	
	}
    
	override public void Action()
    {
        GameObject animObj = GetAnimObject();
        
        Vector3 pos = animObj.transform.localPosition;
        if (isOpened)
        {
            HOTween.To(animObj.transform, 1, "localPosition", new Vector3(pos.x, pos.y, pos.z - drawerLength));
            isOpened = false;
        }
        else
        {
            HOTween.To(animObj.transform, 1, "localPosition", new Vector3(pos.x, pos.y, pos.z + drawerLength));
            isOpened = true;
        }
	}
}

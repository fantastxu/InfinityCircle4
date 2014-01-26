using UnityEngine;
using System.Collections;

public class Key :InteractiveObj {

	public int keyVal;
	public PlayerController pc;


	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	override public void Action(GameObject _actionBody){
		//this.audio.Play();
		//pc.keys[keyVal]=1;
		pc.GetItem(keyVal);
		this.gameObject.SetActive(false);
	}
}

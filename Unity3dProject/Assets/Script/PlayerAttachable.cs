using UnityEngine;
using System.Collections;

public class PlayerAttachable : AttachableObj {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	public override void Active()
	{
		Debug.Log("Player Attachable attach called");
	}

	public override void Deactive()
	{
		Debug.Log("Player Attachable detach called");
	}

	public override void Action()
	{
		Debug.Log("Player Action called");
	}
}

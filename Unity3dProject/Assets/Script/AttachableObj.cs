using UnityEngine;
using System.Collections;

public class AttachableObj : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	//triggered when soul attach itself to an attachable obj
	public virtual void Active()
	{
	}

	//triggered when soul detach from obj 
	public virtual void Deactive()
	{
	}

	//triggered when soul on obj and press action button
	public virtual void Action()
	{
	}
}

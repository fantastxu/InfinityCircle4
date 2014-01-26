using UnityEngine;
using System.Collections;

public class Candle : AttachableObj {

	public ParticleEmitter fire;
	public Light light;
	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	override public void Active()
	{
		//base.Active();
		fire.emit=true;
		light.gameObject.SetActive(true);
	}

	//triggered when soul detach from obj 
	override public void Deactive()
	{
		//base.Deactive();
		fire.emit=false;
		light.gameObject.SetActive(false);
	}

	//triggered when soul on obj and press action button
	override public void Action()
	{
		//base.Deactive();
	}
}

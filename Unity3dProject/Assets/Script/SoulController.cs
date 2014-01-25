using UnityEngine;
using System.Collections;

public enum SoulState
{
	None = 0,
	OnHuman,//can't free move, bat always full of energy
	OnObject,//can't free move, won't reduce energy
	Free,//can free move, but will reduce energy according time escape
	Vanish,
}

public class SoulController : MonoBehaviour 
{

	// Use this for initialization
	public SoulState soulState = SoulState.None;
	public float maxEnergy = 200.0f;
	public float currentEnergy = 200.0f;
	public float consume = 10.0f;//reduce 20.0f energy per second.
	public Transform personTrans = null;

	void Start () 
	{
		
	}

	void Update() 
	{

		switch(soulState)
		{
		case SoulState.OnHuman:
			currentEnergy = maxEnergy;
			break;
		case SoulState.Free:
			currentEnergy -= consume*Time.deltaTime;
			if(currentEnergy<=0.0f)
				soulState = SoulState.Vanish;
			break;
		}

	}
}

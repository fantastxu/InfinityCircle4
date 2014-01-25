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
	public float safeDistance = 6.0f;
	public SoulState soulState = SoulState.None;
	public float maxEnergy = 200.0f;
	public float currentEnergy = 200.0f;
	public float consume = 20.0f;//reduce 20.0f energy per second.
	public Transform personTrans = null;

	Vector3 lastVector = Vector3.zero;

	void Start () 
	{
		
	}

	void Update() 
	{
		if(personTrans == null)
			return;

		//check if the soul is on the person
		{
			float distance = Vector3.Distance(gameObject.transform.position, personTrans.position);
			if(distance > safeDistance)
			{
				//free mode
				soulState = SoulState.Free;
			}
			else
			{
				soulState = SoulState.OnHuman;
			}
		}


		switch(soulState)
		{
		case SoulState.OnHuman:
			transform.position = lastVector + personTrans.position;
			currentEnergy = maxEnergy;
			break;
		case SoulState.Free:
			currentEnergy -= consume*Time.deltaTime;
			if(currentEnergy<=0.0f)
				soulState = SoulState.Vanish;
			break;
		}

		lastVector = transform.position - personTrans.position;
	}
}

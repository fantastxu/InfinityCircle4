using UnityEngine;
using System.Collections;
using GamepadInput;

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
	public Transform forwardTrans = null;
	public float attachDistance = 6.0f;
	public GameObject leftCamera;
	public GameObject rightCamera;
	AttachableObj attachableScript = null;
	Vector3 disVec = Vector3.zero;

	void Start () 
	{

	}

	void GetCameraEffects(GameObject obj, out GrayscaleEffect grayeffect, out GlowEffect gloweffect, out MotionBlur blureffect)
	{
		if(obj != null)
		{
			grayeffect = obj.GetComponent<GrayscaleEffect>();
			gloweffect = obj.GetComponent<GlowEffect>();
			blureffect = obj.GetComponent<MotionBlur>();
		}
		else
		{
			grayeffect = null;
			gloweffect = null;
			blureffect = null;
		}

	}

	void SetAttachEffect()
	{
		GrayscaleEffect grayEffect = null;
		GlowEffect glowEffect = null;
		MotionBlur blurEffect = null;
		GetCameraEffects(leftCamera, out grayEffect, out glowEffect, out blurEffect);
		grayEffect.enabled = false;
		glowEffect.enabled = true;
		blurEffect.enabled = false;
		GetCameraEffects(rightCamera, out grayEffect, out glowEffect, out blurEffect);
		grayEffect.enabled = false;
		glowEffect.enabled = true;
		blurEffect.enabled = false;
	}

	void SetFreeEffect(float energyRatio)
	{
		GrayscaleEffect grayEffect = null;
		GlowEffect glowEffect = null;
		MotionBlur blurEffect = null;
		GetCameraEffects(leftCamera, out grayEffect, out glowEffect, out blurEffect);
		grayEffect.enabled = false;
		glowEffect.enabled = false;
		blurEffect.enabled = true;
		blurEffect.blurAmount = energyRatio;
		GetCameraEffects(rightCamera, out grayEffect, out glowEffect, out blurEffect);
		grayEffect.enabled = false;
		glowEffect.enabled = false;
		blurEffect.enabled = true;
		blurEffect.blurAmount = energyRatio;
	}

	void SetVanishEffect()
	{
		GrayscaleEffect grayEffect = null;
		GlowEffect glowEffect = null;
		MotionBlur blurEffect = null;
		GetCameraEffects(leftCamera, out grayEffect, out glowEffect, out blurEffect);
		grayEffect.enabled = true;
		glowEffect.enabled = false;
		blurEffect.enabled = false;
		GetCameraEffects(rightCamera, out grayEffect, out glowEffect, out blurEffect);
		grayEffect.enabled = true;
		glowEffect.enabled = false;
		blurEffect.enabled = false;
	}



	GameObject GetAttachableObj()
	{
		RaycastHit hit;
		Vector3 ray = forwardTrans.TransformDirection(Vector3.forward*attachDistance);
		if(Physics.Raycast (forwardTrans.position, ray,out hit,attachDistance))
		{
			if(hit.collider.gameObject.layer == LayerMask.NameToLayer("Attachable"))
			{
				return hit.collider.gameObject;
			}
		}

		return null;
	}

	void Update() 
	{

		Vector3 ray = forwardTrans.TransformDirection(Vector3.forward*attachDistance);
		Debug.DrawRay(forwardTrans.position, ray,Color.red);

		if(soulState == SoulState.Vanish)
			return;

		if(GamePad.GetButtonDown(GamePad.Button.LeftShoulder,
		                         GamePad.Index.One))
		{
			Debug.Log("Pressed leftShoulder button");
			if(soulState == SoulState.OnObject || soulState == SoulState.OnHuman)
			{
				//detach
				if(attachableScript != null)
				{
					attachableScript.Deactive();
				}

				attachableScript = null;
				soulState = SoulState.Free;
				disVec = Vector3.zero;
				SetFreeEffect(1.0f - currentEnergy/maxEnergy);

			}
			else if(soulState == SoulState.Free || soulState == SoulState.None)
			{
				GameObject targetobj = GetAttachableObj();
				if(targetobj != null)
				{
					attachableScript = targetobj.GetComponent<AttachableObj>();
					disVec = transform.position - targetobj.transform.position;
					if(attachableScript != null)
						attachableScript.Active();

					if(targetobj == personTrans.gameObject)
						soulState = SoulState.OnHuman;
					else
						soulState = SoulState.OnObject;
				}

				SetAttachEffect();
			}


		}

		if(GamePad.GetButtonDown(GamePad.Button.RightShoulder,
		                         GamePad.Index.One))
		{
			Debug.Log("Pressed leftShoulder button");
			if(attachableScript != null)
				attachableScript.Action();
		}

		switch(soulState)
		{
		case SoulState.OnHuman:
			currentEnergy = maxEnergy;
			if(attachableScript != null)
				transform.position = attachableScript.gameObject.transform.position + disVec;
			break;
		case SoulState.OnObject:
			if(attachableScript != null)
				transform.position = attachableScript.gameObject.transform.position + disVec;
			break;
		case SoulState.Free:
			currentEnergy -= consume*Time.deltaTime;
			SetFreeEffect(1.0f - currentEnergy/maxEnergy);
			if(currentEnergy<=0.0f)
			{
				soulState = SoulState.Vanish;
				SetVanishEffect();
			}
			break;
		}

	}
}

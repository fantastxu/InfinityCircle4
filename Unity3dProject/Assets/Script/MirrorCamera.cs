using UnityEngine;
using System.Collections;

public class MirrorCamera : MonoBehaviour {

	public Transform mirror;

	public Transform player;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		//Vector3 pos=transform.position;

		Vector3 playerPos=mirror.InverseTransformPoint(player.position);
		Vector3 camPos=playerPos;

		Debug.Log(playerPos.x);
		//camPos.x=playerPos.x;
		camPos.y=transform.localPosition.y;
		transform.localPosition=camPos;
		//pos=
		
	}
}

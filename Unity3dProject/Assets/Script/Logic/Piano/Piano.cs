using UnityEngine;
using System.Collections;

public class Piano : MonoBehaviour {
	public GameObject[] fingerPrints;

	public int count;

	public int maximum;

	public GameObject lockedObj;

	public string method;

	public bool passed;

	public Transform[] fpPos;
	// Use this for initialization

	public GameObject key;

	public AudioClip getItem;
	void Start () {
		int i;
		for (i=0;i<fpPos.Length;i++){
			fpPos[i].gameObject.SetActive(false);
		}
	}

	public void AddMaximum(){
		maximum++;
	}

	public void ShowKey(){
		this.audio.PlayOneShot(getItem);
		key.SetActive(true);

	}

	public void InputVal(int _val){
		if (passed){
			return;
		}
		if (_val==0){
			count=0;
			//Debug.Log("miss");
			return;
		}
		//Debug.Log("true");

		count++;
		if (count>=maximum){

			//fingerPrints.
			if (lockedObj!=null){
				lockedObj.SendMessage(method);	
				Debug.Log("unlock");
			}


			
			passed=true;
		}
	}
	
	// Update is called once per frame
	void Update(){
		
		if(Input.GetKeyDown(KeyCode.I))
		{
			ShowKey();
		}
		
	}
}

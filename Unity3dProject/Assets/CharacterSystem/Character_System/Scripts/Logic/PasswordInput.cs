using UnityEngine;
using System.Collections;

public class PasswordInput : MonoBehaviour {
	public string password;
	public string correctword;


	public AudioClip correctClip;
	public AudioClip errorClip;
	public AudioClip tapClip;

	public bool processing;

	public GameObject lockedObj;
	public string method;

	public bool isRandom;
	public int maximum=3;

	// Use this for initialization
	void Start () {
		if (isRandom){
			int pwd=(int)(Random.value*Mathf.Pow(10,maximum) );

			correctword=pwd.ToString();
			while (correctword.Length<maximum){
				correctword="0"+correctword;
			}
		}
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	public void SetCorrectword(string _val){
		correctword=_val;
	}

	public void Input(string _val){
		this.audio.PlayOneShot(tapClip);
		password+=_val;
		if (password.Length>=correctword.Length){
			CheckPwd();
		}
	}

	public bool CheckPwd(){
		if (password==correctword){
			this.audio.PlayOneShot(correctClip);
			this.enabled=false;


			lockedObj.SendMessage(method);
			return true;
		}
		else{
			this.audio.PlayOneShot(errorClip);
			password="";
			return false;
		}
	}
}
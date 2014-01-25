using UnityEngine;
using System.Collections;

public class PasswordInputPanel : MonoBehaviour {
	public string password;
	public string correctword;


	public AudioClip correctClip;
	public AudioClip errorClip;


	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	public void SetCorrectword(string _val){
		correctword=_val;
	}

	public void Input(string _val){
		//inputIndex++;
		password+=_val;
		if (password.Length>=correctword.Length){
			CheckPwd();
		}
	}

	public bool CheckPwd(){
		if (password==correctword){
			this.enabled=false;


			return true;
		}
		else{

			this.audio.PlayOneShot(errorClip);
			password="";
			return false;
		}
	}
}
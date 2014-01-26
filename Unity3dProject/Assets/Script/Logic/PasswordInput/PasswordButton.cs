using UnityEngine;
using System.Collections;

public class PasswordButton : InteractiveObj {
	public PasswordInput input;
	public string word;
	// Use this for initialization

	override public void Action(GameObject actionBody){
		input.Input(word);
	}
}

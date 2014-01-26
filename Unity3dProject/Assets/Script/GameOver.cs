using UnityEngine;
using System.Collections;
using GamepadInput;

public class GameOver : MonoBehaviour 
{
	static GameOver _instance = null;
	string _message = null;
	bool _keymessage = false;
	public TextMesh message1;
	public TextMesh message2;

	public static GameOver instance
	{
		get 
		{
			if(_instance != null)
				return _instance;

			//try to find GameOver object first
			GameObject gameoverobj = GameObject.Find("/GameOver");
			if(gameoverobj != null)
				_instance = gameoverobj.GetComponent<GameOver>();

			if(_instance == null)
			{
				//try to create one
				GameObject newobj = (GameObject)Instantiate(Resources.Load("GameOver"));
				_instance = (GameOver)newobj.AddComponent<GameOver>();
				return _instance;
			}

			return null;
		}
	}


	// Use this for initialization
	void Start () 
	{
	
	}
	
	// Update is called once per frame
	void Update () 
	{
	
	}

	public void SetGameOver(float waitingTime, string message)
	{
		_message = null;
		_keymessage = false;
		message1.text = "";
		message2.text = "";
		StartCoroutine(_SetGameOver(waitingTime, message));
	}

	IEnumerator _SetGameOver(float waitingTime, string message)
	{
		Debug.Log("Start GameOver");
		//show gameover message to player first

		message1.text = message;
		_message = message;
		yield return new WaitForSeconds(waitingTime);
		message2.text = "Press L&R to restart";
		_keymessage = true;
		while(true)
		{
			yield return new WaitForEndOfFrame();
			if(Input.GetKey(KeyCode.Space))
			{
				Application.LoadLevel("Game");
				yield break;
			}

			if(GamePad.GetButtonDown(GamePad.Button.LeftShoulder, GamePad.Index.One) &&
			   GamePad.GetButtonDown(GamePad.Button.RightShoulder, GamePad.Index.One))
			{
				Application.LoadLevel("Game");
				yield break;
			}
		}

	}

	void OnGUI()
	{

		GUIStyle style =new GUIStyle();
		style.normal.background = null;
		style.normal.textColor=new Color(1,0,0);
		style.fontSize = 25;

		GUIStyle vrstyle =new GUIStyle();
		vrstyle.normal.background = null;
		vrstyle.normal.textColor=new Color(1,0,0);
		vrstyle.fontSize = 15;

		if(_message != null)
		{
			GUI.Label(new Rect(Screen.width/8, 32, Screen.width/4, 64), _message, style);
			//GUI.Label(new Rect(Screen.width/2+Screen.width/16, 32, Screen.width/4, 64), _message, vrstyle);
			//GUI.Label(new Rect(Screen.width/2+Screen.width/4+Screen.width/16, 32, Screen.width/4, 64), _message, vrstyle);
		}

		if(_keymessage)
		{
			//wait player press keys.
			GUI.Label(new Rect(Screen.width/8 - 60, 100, Screen.width/4, 64), "Press Space to restart", style);
			//GUI.Label(new Rect(Screen.width/2+Screen.width/16 - 30, 100, Screen.width/4, 64), "Press L&R to restart", vrstyle);
			//GUI.Label(new Rect(Screen.width/2+Screen.width/4+Screen.width/16 - 30, 100, Screen.width/4, 64), "Press L&R to restart", vrstyle);
		}



	}
}

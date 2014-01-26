using UnityEngine;
using System.Collections;

public class GameOver : MonoBehaviour 
{
	static GameOver _instance = null;
	string _message = null;
	bool _keymessage = false;

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
				GameObject newobj = new GameObject("GameOver");
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
		StartCoroutine(_SetGameOver(waitingTime, message));
	}

	IEnumerator _SetGameOver(float waitingTime, string message)
	{
		Debug.Log("Start GameOver");
		//show gameover message to player first

		_message = message;
		yield return new WaitForSeconds(waitingTime);
		_keymessage = true;

		while(true)
		{
			yield return new WaitForEndOfFrame();
			if(Input.GetKey(KeyCode.Space))
			{
				Application.LoadLevel("Game");
				yield break;
			}
		}

	}

	void OnGUI()
	{
		if(_message != null)
			GUI.Label(new Rect(Screen.width/8, 32, Screen.width/4, 64), _message);

		if(_keymessage)
			//wait player press keys.
			GUI.Label(new Rect(Screen.width/8, 100, Screen.width/4, 64), "Press Space to restart");
	}
}

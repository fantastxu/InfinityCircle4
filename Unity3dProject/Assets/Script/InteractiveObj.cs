using UnityEngine;
using System.Collections;

public class InteractiveObj : MonoBehaviour {
    
    public GameObject _animObject;
    
    public GameObject GetAnimObject()
    {
        if (_animObject == null) 
            return this.gameObject;
        else 
            return _animObject; 
    }
    
    public void SetAnimObject(GameObject obj)
    {
        _animObject = obj;
    }
    
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

	virtual public void Action(GameObject _actionBody){

	}
}

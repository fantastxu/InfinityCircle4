using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class DungeonObjectPlacer : MonoBehaviour 
{
	public delegate void ProgressDetailsDelegate(string titleString, string displayString, float percentComplete);
	
	public DirectionEnum Direction;
	public GameObject Source;
	public int Count;
	public float DistanceFromBorder;
	
	public float XRotation;
	public float YRotation;
	public float ZRotation;
	
	public bool IsRandomRotation;
	
	public float RangeFromAnyWall;
	public bool AvoidingCloseObjects;
	public float RangeForAvoiding;
	
	private float MinX;
	private float MinZ;
	
	private float MaxX;
	private float MaxZ;
	
	
	private long maximumTry = 500000;
	private int currentTry = 0;
	
	private List<GameObject> LevelObjects;
	private List<Vector3> positions;
	
	// Use this for initialization
	void Start () 
	{
	
	}
	
	
	public void PlaceObjects(ProgressDetailsDelegate progressDelegate)
	{
		LevelObjects = ChildColliderTransform;
		positions = new List<Vector3>();
		float increment = 1 / (float)Count;
		GameObject go = new GameObject();
		go.name = "_items-" + Source.name;
		currentTry = 0;
		if (RangeFromAnyWall > 0 && AvoidingCloseObjects)
		{
			DistanceFromBorder = RangeFromAnyWall;
		}
		float percentCompleted = 0.0f;
		//currentTry = 0;
		progressDelegate("Placing objects", "Starting place objects", percentCompleted);
		for (int index = 0; index < Count; index++)
		{
			for(;;)
			{
				//verify that cyclus can end
				currentTry++;
				if (currentTry > maximumTry)
					return;
				
				Transform t = FindTransform;
				
				MinX = t.renderer.bounds.min.x;
				MinZ = t.renderer.bounds.min.z;
				
				MaxX = t.renderer.bounds.max.x;
				MaxZ = t.renderer.bounds.max.z;
				
				float x = MaxX - MinX;
				float randomCoeficient = (float)Random.Range(0, 100) / (float)100;
				
				x = x * randomCoeficient + MinX; 
				
				
				float z = MaxZ - MinZ;
				randomCoeficient = (float)Random.Range(0, 100) / (float)100;
				z = z * randomCoeficient + MinZ; 
				
				Vector3 startRay = new Vector3(x, 500, z);
				Vector3 endRay = new Vector3(x, -500, z);
				
				if (Direction == DirectionEnum.Top)
				{
					startRay.y = -500; 
					endRay.y = 500;
				}
				
				RaycastHit hit;
				if (Physics.Raycast(startRay, endRay - startRay, out hit, 1000))
				{
					
					if (IsHitLevelObject(hit))
					{
						//spawn object
						Vector3 position = hit.point;
						if (Direction == DirectionEnum.Ground)
						{
							position.y += DistanceFromBorder;
						}
						else
						{
							position.y -= DistanceFromBorder;
						}
						
						if (!IsFarFromWall(position))
							continue;
						
						if (IsCloseToSameObject(position))
							continue;
						//Debug.Log("??");
						Quaternion rotation;
						if (IsRandomRotation)
						{
							rotation = Quaternion.Euler(new Vector3(XRotation, Random.Range(0, 360), ZRotation));
						}
						else
						{
							rotation = Quaternion.Euler(new Vector3(XRotation, YRotation, ZRotation));	
						}
						GameObject g = (GameObject)Instantiate(Source, position, rotation);
						g.transform.parent = go.transform;
						percentCompleted += increment;
						positions.Add(position);
						break;
					}
				}
				
				progressDelegate("Placing objects", "Placing objects", percentCompleted);
			}
		}
	}
	
	public bool IsFarFromWall(Vector3 position)
	{
		if (RangeFromAnyWall == 0)
			return true;
		
		return Physics.CheckSphere(position, RangeFromAnyWall);
	}
	
	public bool IsCloseToSameObject(Vector3 position)
	{
		if (!AvoidingCloseObjects)
			return false;
		
		foreach(Vector3 p in positions)
		{
			if (Vector3.Distance(p, position) < RangeForAvoiding)
				return true;
		}
		return false;
	}
	
	private Transform FindTransform
	{
		get
		{
			int count = LevelObjects.Count;
			int randomNumber = Random.Range(0, count -1);
			return LevelObjects[randomNumber].transform;
		}
	}
	
	private bool IsHitLevelObject(RaycastHit hit)
	{
		foreach(GameObject go in LevelObjects)
		{
			if (go == hit.transform.gameObject)
				return true;
		}
		return false;
	}
	
	private List<GameObject> ChildColliderTransform
	{
		get
		{
			List<GameObject> result = new List<GameObject>();
			Transform[] allChildren = GetComponentsInChildren<Transform>();
			foreach(Transform go in allChildren)
			{
				if (go.collider != null)
				{
					result.Add(go.gameObject);
				}
			}
			if (collider != null)
				result.Add(gameObject);
			
			return result;
		}
	}
}


public enum DirectionEnum
{
	Top,
	Ground
}
using UnityEngine;
using UnityEditor;
using System;
using System.Collections;
using System.Collections.Generic;

[CustomEditor(typeof(DungeonObjectPlacer))]
public class DungeonObjectPlacerEditor : Editor 
{
	private DungeonObjectPlacer placer;
	
	public override void OnInspectorGUI()
	{
		placer = (DungeonObjectPlacer) target as DungeonObjectPlacer;
		
		EditorGUILayout.BeginHorizontal();
			
		EditorGUILayout.PrefixLabel("Prefab"); 
		placer.Source = EditorGUILayout.ObjectField(placer.Source, typeof(GameObject), true) as GameObject;
		EditorGUILayout.EndHorizontal(); 
		
		EditorGUILayout.BeginHorizontal();
			
		EditorGUILayout.PrefixLabel("Direction"); 
		placer.Direction = (DirectionEnum)EditorGUILayout.EnumPopup(placer.Direction);
		EditorGUILayout.EndHorizontal(); 
		
		placer.Count = EditorUtils.IntField(placer.Count, "Count");
		
		placer.DistanceFromBorder = EditorUtils.FloatField(placer.DistanceFromBorder, "Distance from border");
		
		placer.XRotation = EditorUtils.FloatField(placer.XRotation, "Rotation X");
		
		placer.IsRandomRotation = EditorUtils.Toggle(placer.IsRandomRotation, "Random Y rotation");
		
		if (!placer.IsRandomRotation)
		{
			placer.YRotation = EditorUtils.FloatField(placer.YRotation, "Rotation Y");
		}
		
		placer.ZRotation = EditorUtils.FloatField(placer.ZRotation, "Rotation Z");
		
		placer.RangeFromAnyWall = EditorUtils.FloatField(placer.RangeFromAnyWall, "Range from wall");
		
		placer.AvoidingCloseObjects = EditorUtils.Toggle(placer.AvoidingCloseObjects, "Avoiding same");
		
		if (placer.AvoidingCloseObjects)
		{
			placer.RangeForAvoiding = EditorUtils.FloatField(placer.RangeForAvoiding, "Avoiding range");
		}
			
		
		if (GUILayout.Button("Place", GUILayout.Width(150))) 
		{
			DungeonObjectPlacer.ProgressDetailsDelegate progress = new DungeonObjectPlacer.ProgressDetailsDelegate(updateProgress);
			placer.PlaceObjects(progress);
			EditorUtility.ClearProgressBar();
		}
	}
	
	public void updateProgress(string titleString, string displayString, float percentComplete) 
	{
		EditorUtility.DisplayProgressBar(titleString, displayString, percentComplete);
	}
}

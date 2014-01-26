using UnityEngine;
using System.Collections;

public class TVTunerSoul : AttachableObj {

    Material savedMaterial;
    public Material secretMaterial;
    
    public MeshRenderer screenMesh;
    public GameOver gameover;
    
	// Use this for initialization
	void Start () {
	}
	
	//triggered when soul attach itself to an attachable obj
	public override void Active()
	{
        if (screenMesh != null && secretMaterial != null)
        {
            savedMaterial = screenMesh.materials[0];
            
            Material[] mats = screenMesh.materials;
            mats[0] = secretMaterial;
            
            screenMesh.materials = mats;
            
            if (gameover != null)
            {
                gameover.SetGameOver(2.5f, "THE END");
            }
        }
        
        AudioSource audio = GetComponent<AudioSource>();
        if (audio != null)
        {
            audio.Play();
        }
	}

	//triggered when soul detach from obj 
	public override void Deactive()
	{
        if (screenMesh != null && savedMaterial != null)
        {
            Material[] mats = screenMesh.materials;
            mats[0] = savedMaterial;
            
            screenMesh.materials = mats;
        }
        
        AudioSource audio = GetComponent<AudioSource>();
        if (audio != null)
        {
            audio.Play();
        }
	}
}

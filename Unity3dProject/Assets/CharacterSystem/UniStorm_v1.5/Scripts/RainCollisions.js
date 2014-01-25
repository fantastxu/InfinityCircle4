var burstEnergy : float = 10.0;
var explosionObject : Transform;

function LateUpdate () {
	var theParticles = particleEmitter.particles;
	var liveParticles = new int[theParticles.length];
	var particlesToKeep = 0;
	for (var i = 0; i < particleEmitter.particleCount; i++ )
	{
		if (theParticles[i].energy > burstEnergy)
		{
	    	theParticles[i].color = Color.yellow;
	    	
    		//Once collided, splash.
	    	if (explosionObject)
		    		Transform.Instantiate(explosionObject, 
		    		theParticles[i].position,  
		    		Quaternion.identity );
		
		} else {
			liveParticles[particlesToKeep++] = i;
		}
	}
	// Copy
	var keepParticles = new Particle[particlesToKeep];
	
	for (var j = 0; j < particlesToKeep; j++)
		keepParticles[j] = theParticles[liveParticles[j]];
		particleEmitter.particles = keepParticles;
}	

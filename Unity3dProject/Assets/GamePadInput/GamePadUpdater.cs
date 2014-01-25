using UnityEngine;
using System.Collections;

namespace GamepadInput
{
    public class GamePadUpdater : MonoBehaviour
    {
        void Awake()
        {
            GamePad.Init();
        }
    
        void Update()
        {
            GamePad.Update();
        }
    }
}
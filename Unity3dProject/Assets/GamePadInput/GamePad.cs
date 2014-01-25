//Author: Richard Pieterse
//Date: 16 May 2013
//Email: Merrik44@live.com

using UnityEngine;
using System.Collections;

namespace GamepadInput
{
    
    public static class GamePad
    {
        public enum PadType { XB360, PS3 }
        public enum Button { A, B, Y, X, RightShoulder, LeftShoulder, RightStick, LeftStick, Back, Start }
        public enum Trigger { LeftTrigger, RightTrigger }
        public enum Axis { LeftStick, RightStick, Dpad }
        public enum Index { Any, One, Two, Three, Four }
        
        static PadType[] padTypeList;
        static GamepadState[][] savedGamePadStateList = new GamepadState[2][];
        static int frameIndex = 0;
        static bool init = false;
        
        public static void Init()
        {
            string[] joystickNames = Input.GetJoystickNames();
            padTypeList = new PadType[joystickNames.Length];
            savedGamePadStateList[0] = new GamepadState[joystickNames.Length];
            savedGamePadStateList[1] = new GamepadState[joystickNames.Length];
            frameIndex = 0;
            
            for(int i = 0; i < joystickNames.Length; ++i)
            {
                if (joystickNames[i] == "Sony PLAYSTATION(R)3 Controller")
                {
                    padTypeList[i] = PadType.PS3;
                }
                else
                {
                    padTypeList[i] = PadType.XB360;
                }
            }
            init = true;
        }

        public static bool GetButtonDown(Button button, Index controlIndex)
        {
            if (!init)
                Init();
                
            KeyCode code = GetKeycode(button, controlIndex);
            
            if (controlIndex == Index.Any)
                return Input.GetKeyDown(code);
            else
            {
                int i = (int)controlIndex - 1;
                if (i < 0)
                    i = 0;
            
                if (i < padTypeList.Length)
                {
                    GamepadState thisFrameState = savedGamePadStateList[frameIndex][i];
                    if (thisFrameState == null)
                        return false;
                
                    GamepadState lastFrameState = savedGamePadStateList[(frameIndex + 1) % 2 ][i];
                    if (lastFrameState == null)
                        return false;
                
                    switch(button)
                    {
                        case Button.A:
                        if (thisFrameState.A && !lastFrameState.A)
                            return true;
                        break;
                    
                        case Button.B:
                        if (thisFrameState.B && !lastFrameState.B)
                            return true;
                        break;
                    
                        case Button.X:
                        if (thisFrameState.X && !lastFrameState.X)
                            return true;
                        break;
                    
                        case Button.Y:
                        if (thisFrameState.Y && !lastFrameState.Y)
                            return true;
                        break;
                    
                        case Button.RightShoulder:
                        if (thisFrameState.RightShoulder && !lastFrameState.RightShoulder)
                            return true;
                        break;
                    
                        case Button.LeftShoulder:
                        if (thisFrameState.LeftShoulder && !lastFrameState.LeftShoulder)
                            return true;
                        break;
                    
                        case Button.RightStick:
                        if (thisFrameState.RightStick && !lastFrameState.RightStick)
                            return true;
                        break;
                    
                        case Button.LeftStick:
                        if (thisFrameState.LeftStick && !lastFrameState.LeftStick)
                            return true;
                        break;
                    
                        case Button.Back:
                        if (thisFrameState.Back && !lastFrameState.Back)
                            return true;
                        break;
                    
                        case Button.Start:
                        if (thisFrameState.Start && !lastFrameState.Start)
                            return true;
                        break;
                    }
                }
                return false;
            }
        }

        public static bool GetButtonUp(Button button, Index controlIndex)
        {
            if (!init)
                Init();

            KeyCode code = GetKeycode(button, controlIndex);
            if (controlIndex == Index.Any)
                return Input.GetKeyUp(code);
            else
            {
                int i = (int)controlIndex - 1;
                if (i < 0)
                    i = 0;
            
                if (i < padTypeList.Length)
                {
                
                    GamepadState thisFrameState = savedGamePadStateList[frameIndex][i];
                    if (thisFrameState == null)
                        return false;
                
                    GamepadState lastFrameState = savedGamePadStateList[(frameIndex + 1) % 2 ][i];
                    if (lastFrameState == null)
                        return false;
                
                    switch(button)
                    {
                        case Button.A:
                        if (!thisFrameState.A && lastFrameState.A)
                            return true;
                        break;
                    
                        case Button.B:
                        if (!thisFrameState.B && lastFrameState.B)
                            return true;
                        break;
                    
                        case Button.X:
                        if (!thisFrameState.X && lastFrameState.X)
                            return true;
                        break;
                    
                        case Button.Y:
                        if (!thisFrameState.Y && lastFrameState.Y)
                            return true;
                        break;
                    
                        case Button.RightShoulder:
                        if (!thisFrameState.RightShoulder && lastFrameState.RightShoulder)
                            return true;
                        break;
                    
                        case Button.LeftShoulder:
                        if (!thisFrameState.LeftShoulder && lastFrameState.LeftShoulder)
                            return true;
                        break;
                    
                        case Button.RightStick:
                        if (!thisFrameState.RightStick && lastFrameState.RightStick)
                            return true;
                        break;
                    
                        case Button.LeftStick:
                        if (!thisFrameState.LeftStick && lastFrameState.LeftStick)
                            return true;
                        break;
                    
                        case Button.Back:
                        if (!thisFrameState.Back && lastFrameState.Back)
                            return true;
                        break;
                    
                        case Button.Start:
                        if (!thisFrameState.Start && lastFrameState.Start)
                            return true;
                        break;
                    }
                }
                
                return false;
            }
        }

        public static bool GetButton(Button button, Index controlIndex)
        {
            if (!init)
                Init();

            KeyCode code = GetKeycode(button, controlIndex);
            return Input.GetKey(code);
        }
        
        public static void Update()
        {
            frameIndex = (frameIndex + 1) % 2;
            
            GamepadState[] lastFrameState = savedGamePadStateList[frameIndex];
            
            for(int i = 0; i < lastFrameState.Length; ++i)
            {
                // Index.Any is not considered here
                lastFrameState[i] = GetState((Index)i+1);
            }
            
            
        }

        /// <summary>
        /// returns a specified axis
        /// </summary>
        /// <param name="axis">One of the analogue sticks, or the dpad</param>
        /// <param name="controlIndex">The controller number</param>
        /// <param name="raw">if raw is false then the controlIndex will be returned with a deadspot</param>
        /// <returns></returns>
        public static Vector2 GetAxis(Axis axis, Index controlIndex, bool raw = false)
        {
            if (!init)
                Init();

            int i = (int)controlIndex - 1;
            if (i < 0)
                i = 0;
            
            Vector2 axisXY = Vector3.zero;
            if (i < padTypeList.Length)
            {
                string xName = "", yName = "";
                switch (axis)
                {
                    case Axis.Dpad:
                        xName = "DPad_XAxis_" + (int)controlIndex;
                        yName = "DPad_YAxis_" + (int)controlIndex;
                        break;
                    case Axis.LeftStick:
                        xName = "L_XAxis_" + (int)controlIndex;
                        yName = "L_YAxis_" + (int)controlIndex;
                        break;
                    case Axis.RightStick:
                        if (padTypeList[i] == PadType.XB360)
                        {
                            xName = "R_XAxis_" + (int)controlIndex;
                            yName = "R_YAxis_" + (int)controlIndex;
                        }
                        else if (padTypeList[i] == PadType.PS3)
                        {
                            xName = "R_XAxis_PS3_" + (int)controlIndex;
                            yName = "R_YAxis_PS3_" + (int)controlIndex;
                        }
                        break;
                }

                
                try
                {
                    if (raw == false)
                    {
                        axisXY.x = Input.GetAxis(xName);
                        axisXY.y = -Input.GetAxis(yName);
                    }
                    else
                    {
                        axisXY.x = Input.GetAxisRaw(xName);
                        axisXY.y = -Input.GetAxisRaw(yName);
                    }
                }
                catch (System.Exception e)
                {
                    Debug.LogError(e);
                    Debug.LogWarning("Have you set up all axes correctly? \nThe easiest solution is to replace the InputManager.asset with version located in the GamepadInput package. \nWarning: do so will overwrite any existing input");
                }
            }
            return axisXY;
        }

        public static float GetTrigger(Trigger trigger, Index controlIndex, bool raw = false)
        {
            if (!init)
                Init();

            //
            string name = "";
            if (trigger == Trigger.LeftTrigger)
                name = "TriggersL_" + (int)controlIndex;
            else if (trigger == Trigger.RightTrigger)
                name = "TriggersR_" + (int)controlIndex;

            //
            float axis = 0;
            try
            {
                if (raw == false)
                    axis = Input.GetAxis(name);
                else
                    axis = Input.GetAxisRaw(name);
            }
            catch (System.Exception e)
            {
                Debug.LogError(e);
                Debug.LogWarning("Have you set up all axes correctly? \nThe easiest solution is to replace the InputManager.asset with version located in the GamepadInput package. \nWarning: do so will overwrite any existing input");
            }
            return axis;
        }


        static KeyCode GetKeycode(Button button, Index controlIndex)
        {
            int i = (int)controlIndex - 1;
            if (i < 0)
                i = 0;
            
            if (i >= padTypeList.Length)
            {
                // no such gamepad
                return KeyCode.None;
            }
                
            if (controlIndex == Index.One)
            {
                if (padTypeList[0] == PadType.XB360)
                {
                    switch (button)
                    {
                        case Button.A: return KeyCode.Joystick1Button0;
                        case Button.B: return KeyCode.Joystick1Button1;
                        case Button.X: return KeyCode.Joystick1Button2;
                        case Button.Y: return KeyCode.Joystick1Button3;
                        case Button.RightShoulder: return KeyCode.Joystick1Button5;
                        case Button.LeftShoulder: return KeyCode.Joystick1Button4;
                        case Button.Back: return KeyCode.Joystick1Button6;
                        case Button.Start: return KeyCode.Joystick1Button7;
                        case Button.LeftStick: return KeyCode.Joystick1Button8;
                        case Button.RightStick: return KeyCode.Joystick1Button9;
                    }
                }
                else if (padTypeList[0] == PadType.PS3)
                {
                    switch (button)
                    {
                        case Button.A: return KeyCode.Joystick1Button14;
                        case Button.B: return KeyCode.Joystick1Button13;
                        case Button.X: return KeyCode.Joystick1Button15;
                        case Button.Y: return KeyCode.Joystick1Button12;
                        case Button.RightShoulder: return KeyCode.Joystick1Button11;
                        case Button.LeftShoulder: return KeyCode.Joystick1Button10;
                        case Button.Back: return KeyCode.Joystick1Button0;
                        case Button.Start: return KeyCode.Joystick1Button3;
                        case Button.LeftStick: return KeyCode.Joystick1Button1;
                        case Button.RightStick: return KeyCode.Joystick1Button2;
                    }
                }
            }
            else if (controlIndex == Index.Two)
            {
                if (padTypeList[1] == PadType.XB360)
                {
                    switch (button)
                    {
                        case Button.A: return KeyCode.Joystick2Button0;
                        case Button.B: return KeyCode.Joystick2Button1;
                        case Button.X: return KeyCode.Joystick2Button2;
                        case Button.Y: return KeyCode.Joystick2Button3;
                        case Button.RightShoulder: return KeyCode.Joystick2Button5;
                        case Button.LeftShoulder: return KeyCode.Joystick2Button4;
                        case Button.Back: return KeyCode.Joystick2Button6;
                        case Button.Start: return KeyCode.Joystick2Button7;
                        case Button.LeftStick: return KeyCode.Joystick2Button8;
                        case Button.RightStick: return KeyCode.Joystick2Button9;
                    }
                }
                else if (padTypeList[1] == PadType.PS3)
                {
                    switch (button)
                    {
                        case Button.A: return KeyCode.Joystick2Button14;
                        case Button.B: return KeyCode.Joystick2Button13;
                        case Button.X: return KeyCode.Joystick2Button15;
                        case Button.Y: return KeyCode.Joystick2Button12;
                        case Button.RightShoulder: return KeyCode.Joystick2Button11;
                        case Button.LeftShoulder: return KeyCode.Joystick2Button10;
                        case Button.Back: return KeyCode.Joystick2Button0;
                        case Button.Start: return KeyCode.Joystick2Button3;
                        case Button.LeftStick: return KeyCode.Joystick2Button1;
                        case Button.RightStick: return KeyCode.Joystick2Button2;
                    }
                }
            }
            else if (controlIndex == Index.Three)
            {
                if (padTypeList[2] == PadType.XB360)
                {
                    switch (button)
                    {
                        case Button.A: return KeyCode.Joystick3Button0;
                        case Button.B: return KeyCode.Joystick3Button1;
                        case Button.X: return KeyCode.Joystick3Button2;
                        case Button.Y: return KeyCode.Joystick3Button3;
                        case Button.RightShoulder: return KeyCode.Joystick3Button5;
                        case Button.LeftShoulder: return KeyCode.Joystick3Button4;
                        case Button.Back: return KeyCode.Joystick3Button6;
                        case Button.Start: return KeyCode.Joystick3Button7;
                        case Button.LeftStick: return KeyCode.Joystick3Button8;
                        case Button.RightStick: return KeyCode.Joystick3Button9;
                    }
                }
                else if (padTypeList[2] == PadType.PS3)
                {
                    switch (button)
                    {
                        case Button.A: return KeyCode.Joystick3Button14;
                        case Button.B: return KeyCode.Joystick3Button13;
                        case Button.X: return KeyCode.Joystick3Button15;
                        case Button.Y: return KeyCode.Joystick3Button12;
                        case Button.RightShoulder: return KeyCode.Joystick3Button11;
                        case Button.LeftShoulder: return KeyCode.Joystick3Button10;
                        case Button.Back: return KeyCode.Joystick3Button0;
                        case Button.Start: return KeyCode.Joystick3Button3;
                        case Button.LeftStick: return KeyCode.Joystick3Button1;
                        case Button.RightStick: return KeyCode.Joystick3Button2;
                    }
                }
            }
            else if (controlIndex == Index.Four)
            {
                if (padTypeList[3] == PadType.XB360)
                {
                    switch (button)
                    {
                        case Button.A: return KeyCode.Joystick4Button0;
                        case Button.B: return KeyCode.Joystick4Button1;
                        case Button.X: return KeyCode.Joystick4Button2;
                        case Button.Y: return KeyCode.Joystick4Button3;
                        case Button.RightShoulder: return KeyCode.Joystick4Button5;
                        case Button.LeftShoulder: return KeyCode.Joystick4Button4;
                        case Button.Back: return KeyCode.Joystick4Button6;
                        case Button.Start: return KeyCode.Joystick4Button7;
                        case Button.LeftStick: return KeyCode.Joystick4Button8;
                        case Button.RightStick: return KeyCode.Joystick4Button9;
                    }
                }
                else if (padTypeList[3] == PadType.PS3)
                {
                    switch (button)
                    {
                        case Button.A: return KeyCode.Joystick4Button14;
                        case Button.B: return KeyCode.Joystick4Button13;
                        case Button.X: return KeyCode.Joystick4Button15;
                        case Button.Y: return KeyCode.Joystick4Button12;
                        case Button.RightShoulder: return KeyCode.Joystick4Button11;
                        case Button.LeftShoulder: return KeyCode.Joystick4Button10;
                        case Button.Back: return KeyCode.Joystick4Button0;
                        case Button.Start: return KeyCode.Joystick4Button3;
                        case Button.LeftStick: return KeyCode.Joystick4Button1;
                        case Button.RightStick: return KeyCode.Joystick4Button2;
                    }
                }
            }
            else if (controlIndex == Index.Any)
            {
                if (padTypeList[0] == PadType.XB360)
                {
                    switch (button)
                    {
                        case Button.A: return KeyCode.JoystickButton0;
                        case Button.B: return KeyCode.JoystickButton1;
                        case Button.X: return KeyCode.JoystickButton2;
                        case Button.Y: return KeyCode.JoystickButton3;
                        case Button.RightShoulder: return KeyCode.JoystickButton5;
                        case Button.LeftShoulder: return KeyCode.JoystickButton4;
                        case Button.Back: return KeyCode.JoystickButton6;
                        case Button.Start: return KeyCode.JoystickButton7;
                        case Button.LeftStick: return KeyCode.JoystickButton8;
                        case Button.RightStick: return KeyCode.JoystickButton9;
                    }
                }
                else if (padTypeList[0] == PadType.PS3)
                {
                    switch (button)
                    {
                        case Button.A: return KeyCode.JoystickButton14;
                        case Button.B: return KeyCode.JoystickButton13;
                        case Button.X: return KeyCode.JoystickButton15;
                        case Button.Y: return KeyCode.JoystickButton12;
                        case Button.RightShoulder: return KeyCode.JoystickButton11;
                        case Button.LeftShoulder: return KeyCode.JoystickButton10;
                        case Button.Back: return KeyCode.JoystickButton0;
                        case Button.Start: return KeyCode.JoystickButton3;
                        case Button.LeftStick: return KeyCode.JoystickButton1;
                        case Button.RightStick: return KeyCode.JoystickButton2;
                    }
                }
            }
            
            
            return KeyCode.None;
        }

        public static GamepadState GetState(Index controlIndex, bool raw = false)
        {
            if (!init)
                Init();
            
            GamepadState state = new GamepadState();

            state.A = GetButton(Button.A, controlIndex);
            state.B = GetButton(Button.B, controlIndex);
            state.Y = GetButton(Button.Y, controlIndex);
            state.X = GetButton(Button.X, controlIndex);

            state.RightShoulder = GetButton(Button.RightShoulder, controlIndex);
            state.LeftShoulder = GetButton(Button.LeftShoulder, controlIndex);
            state.RightStick = GetButton(Button.RightStick, controlIndex);
            state.LeftStick = GetButton(Button.LeftStick, controlIndex);

            state.Start = GetButton(Button.Start, controlIndex);
            state.Back = GetButton(Button.Back, controlIndex);

            state.LeftStickAxis = GetAxis(Axis.LeftStick, controlIndex, raw);
            state.rightStickAxis = GetAxis(Axis.RightStick, controlIndex, raw);
            state.dPadAxis = GetAxis(Axis.Dpad, controlIndex, raw);

            state.Left = (state.dPadAxis.x < 0);
            state.Right = (state.dPadAxis.x > 0);
            state.Up = (state.dPadAxis.y > 0);
            state.Down = (state.dPadAxis.y < 0);

            state.LeftTrigger = GetTrigger(Trigger.LeftTrigger, controlIndex, raw);
            state.RightTrigger = GetTrigger(Trigger.RightTrigger, controlIndex, raw);

            return state;
        }

    }

    public class GamepadState
    {
        public bool A = false;
        public bool B = false;
        public bool X = false;
        public bool Y = false;
        public bool Start = false;
        public bool Back = false;
        public bool Left = false;
        public bool Right = false;
        public bool Up = false;
        public bool Down = false;
        public bool LeftStick = false;
        public bool RightStick = false;
        public bool RightShoulder = false;
        public bool LeftShoulder = false;

        public Vector2 LeftStickAxis = Vector2.zero;
        public Vector2 rightStickAxis = Vector2.zero;
        public Vector2 dPadAxis = Vector2.zero;

        public float LeftTrigger = 0;
        public float RightTrigger = 0;

    }

}
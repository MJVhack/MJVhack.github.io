Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;

public class Volume {
    [DllImport("user32.dll")]
    public static extern void keybd_event(byte bVk, byte bScan, int dwFlags, int dwExtraInfo);
}
"@

$VK_VOLUME_UP = 0xAF

while ($true)
{
    for ($i=0; $i -lt 50; $i++)
    {
        [Volume]::keybd_event($VK_VOLUME_UP,0,0,0)
    }

    Start-Process "chrome" "https://youtu.be/dQw4w9WgXcQ?is=0d3AtCfUxDiWvkjr"

    Start-Sleep -Seconds 50
}

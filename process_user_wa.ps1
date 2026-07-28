$code = @"
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.IO;

public class UserWAProcessor {
    public static string ProcessUserWA(string imgPath, bool invertToWhite) {
        using (Bitmap orig = new Bitmap(imgPath)) {
            // Find bounding box of non-white pixels
            int minX = orig.Width, minY = orig.Height, maxX = 0, maxY = 0;
            for (int y = 0; y < orig.Height; y++) {
                for (int x = 0; x < orig.Width; x++) {
                    Color c = orig.GetPixel(x, y);
                    if (c.R < 220 || c.G < 220 || c.B < 220) { // Dark pixel
                        if (x < minX) minX = x;
                        if (y < minY) minY = y;
                        if (x > maxX) maxX = x;
                        if (y > maxY) maxY = y;
                    }
                }
            }

            int w = maxX - minX + 1;
            int h = maxY - minY + 1;
            if (w <= 0 || h <= 0) { minX = 0; minY = 0; w = orig.Width; h = orig.Height; }

            int sz = Math.Max(w, h);
            using (Bitmap cropped = new Bitmap(sz, sz)) {
                using (Graphics g = Graphics.FromImage(cropped)) {
                    g.SmoothingMode = SmoothingMode.AntiAlias;
                    g.Clear(Color.Transparent);
                    int offsetX = (sz - w) / 2;
                    int offsetY = (sz - h) / 2;
                    g.DrawImage(orig, new Rectangle(offsetX, offsetY, w, h), new Rectangle(minX, minY, w, h), GraphicsUnit.Pixel);
                }

                // Process pixels to make white transparent and optional invert to white
                for (int y = 0; y < sz; y++) {
                    for (int x = 0; x < sz; x++) {
                        Color c = cropped.GetPixel(x, y);
                        if (c.R > 230 && c.G > 230 && c.B > 230) {
                            cropped.SetPixel(x, y, Color.Transparent);
                        } else if (invertToWhite && c.A > 50) {
                            cropped.SetPixel(x, y, Color.FromArgb(c.A, 255, 255, 255));
                        }
                    }
                }

                using (MemoryStream ms = new MemoryStream()) {
                    cropped.Save(ms, System.Drawing.Imaging.ImageFormat.Png);
                    return "data:image/png;base64," + Convert.ToBase64String(ms.ToArray());
                }
            }
        }
    }
}
"@
Add-Type -TypeDefinition $code -ReferencedAssemblies System.Drawing
$imgPath = 'C:\Users\mohdh\.gemini\antigravity-ide\brain\c6613517-dff2-48fe-975d-dc77682f6a47\media__1785123174747.jpg'

$blackB64 = [UserWAProcessor]::ProcessUserWA($imgPath, $false)
$whiteB64 = [UserWAProcessor]::ProcessUserWA($imgPath, $true)

Set-Content -Path 'c:\Users\mohdh\project\user_wa_black_b64.txt' -Value $blackB64
Set-Content -Path 'c:\Users\mohdh\project\user_wa_white_b64.txt' -Value $whiteB64

Write-Host "PROCESSED EXACT USER WA LOGO PNGs SUCCESSFULLY!"

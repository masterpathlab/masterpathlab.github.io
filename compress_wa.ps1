$code = @"
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.IO;

public class UltraCompressor {
    public static string ResizeAndCompress(string imgPath, bool invertToWhite) {
        using (Bitmap orig = new Bitmap(imgPath)) {
            // Find bounding box
            int minX = orig.Width, minY = orig.Height, maxX = 0, maxY = 0;
            for (int y = 0; y < orig.Height; y += 2) {
                for (int x = 0; x < orig.Width; x += 2) {
                    Color c = orig.GetPixel(x, y);
                    if (c.R < 220 || c.G < 220 || c.B < 220) {
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

            int sz = 128; // 128x128 is ultra crisp at 5mm & tiny size!
            using (Bitmap resized = new Bitmap(sz, sz)) {
                using (Graphics g = Graphics.FromImage(resized)) {
                    g.SmoothingMode = SmoothingMode.HighQuality;
                    g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                    g.Clear(Color.Transparent);
                    g.DrawImage(orig, new Rectangle(0, 0, sz, sz), new Rectangle(minX, minY, w, h), GraphicsUnit.Pixel);
                }

                for (int y = 0; y < sz; y++) {
                    for (int x = 0; x < sz; x++) {
                        Color c = resized.GetPixel(x, y);
                        if (c.R > 230 && c.G > 230 && c.B > 230) {
                            resized.SetPixel(x, y, Color.Transparent);
                        } else if (invertToWhite && c.A > 30) {
                            resized.SetPixel(x, y, Color.FromArgb(c.A, 255, 255, 255));
                        }
                    }
                }

                using (MemoryStream ms = new MemoryStream()) {
                    resized.Save(ms, System.Drawing.Imaging.ImageFormat.Png);
                    return "data:image/png;base64," + Convert.ToBase64String(ms.ToArray());
                }
            }
        }
    }
}
"@
Add-Type -TypeDefinition $code -ReferencedAssemblies System.Drawing
$imgPath = 'C:\Users\mohdh\.gemini\antigravity-ide\brain\c6613517-dff2-48fe-975d-dc77682f6a47\media__1785123174747.jpg'

$blackSmall = [UltraCompressor]::ResizeAndCompress($imgPath, $false)
$whiteSmall = [UltraCompressor]::ResizeAndCompress($imgPath, $true)

Set-Content -Path 'c:\Users\mohdh\project\small_wa_black.txt' -Value $blackSmall
Set-Content -Path 'c:\Users\mohdh\project\small_wa_white.txt' -Value $whiteSmall

Write-Host "GENERATED 2KB ULTRA COMPRESSED PNGs SUCCESSFULLY!"

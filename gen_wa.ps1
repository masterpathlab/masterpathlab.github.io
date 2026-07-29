$code = @"
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.IO;

public class WAGen {
    public static string GenerateRealWALogo() {
        int sz = 256;
        using (Bitmap bmp = new Bitmap(sz, sz)) {
            using (Graphics g = Graphics.FromImage(bmp)) {
                g.SmoothingMode = SmoothingMode.AntiAlias;
                g.Clear(Color.Transparent);

                // Official Green #25D366
                Color waGreen = Color.FromArgb(37, 211, 102);

                using (SolidBrush br = new SolidBrush(waGreen)) {
                    g.FillEllipse(br, 16, 16, 224, 224);

                    Point[] pts = { new Point(20, 210), new Point(70, 200), new Point(40, 160) };
                    g.FillPolygon(br, pts);

                    using (Pen whitePen = new Pen(Color.White, 28)) {
                        whitePen.StartCap = LineCap.Round;
                        whitePen.EndCap = LineCap.Round;
                        g.DrawArc(whitePen, 75, 75, 110, 110, 100, 120);
                    }
                }
            }
            using (MemoryStream ms = new MemoryStream()) {
                bmp.Save(ms, System.Drawing.Imaging.ImageFormat.Png);
                return "data:image/png;base64," + Convert.ToBase64String(ms.ToArray());
            }
        }
    }
}
"@
Add-Type -TypeDefinition $code -ReferencedAssemblies System.Drawing
$b64 = [WAGen]::GenerateRealWALogo()
Set-Content -Path 'c:\Users\mohdh\project\real_wa_png_b64.txt' -Value $b64
Write-Host 'REAL WA PNG B64 GENERATED SUCCESSFULLY!'

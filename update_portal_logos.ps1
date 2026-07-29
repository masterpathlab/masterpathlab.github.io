$waB64 = [System.IO.File]::ReadAllText("c:\Users\mohdh\project\real_wa_png_b64.txt").Trim()
$htmlPath = "c:\Users\mohdh\project\master_path_lab_portal.html"
$htmlContent = [System.IO.File]::ReadAllText($htmlPath, [System.Text.Encoding]::UTF8)

# Replace WA_LOGO_B64 with the new Real PNG Base64
$regex = [regex]"const WA_LOGO_B64 = 'data:image\/[^']+';"
$htmlContent = $regex.Replace($htmlContent, "const WA_LOGO_B64 = '$waB64';")

[System.IO.File]::WriteAllText($htmlPath, $htmlContent, [System.Text.Encoding]::UTF8)
Write-Host "PORTAL UPDATED WITH REAL WA PNG B64!"

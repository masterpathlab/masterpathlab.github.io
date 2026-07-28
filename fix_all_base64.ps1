$blackB64 = [System.IO.File]::ReadAllText("c:\Users\mohdh\project\small_wa_black.txt").Replace("`r", "").Replace("`n", "").Trim()
$whiteB64 = [System.IO.File]::ReadAllText("c:\Users\mohdh\project\small_wa_white.txt").Replace("`r", "").Replace("`n", "").Trim()

$htmlPath = "c:\Users\mohdh\project\master_path_lab_portal.html"
$htmlContent = [System.IO.File]::ReadAllText($htmlPath, [System.Text.Encoding]::UTF8)

# Replace all giant Base64 constants with small 2KB constants
$htmlContent = [regex]::Replace($htmlContent, "const USER_WA_BLACK_B64 = 'data:image\/png;base64,[^']+';", "")
$htmlContent = [regex]::Replace($htmlContent, "const USER_WA_WHITE_B64 = 'data:image\/png;base64,[^']+';", "")
$htmlContent = [regex]::Replace($htmlContent, "const WA_LOGO_B64 = 'data:image\/[^']+';", "")
$htmlContent = [regex]::Replace($htmlContent, "const GMAIL_LOGO_B64 = 'data:image\/[^']+';", "")

$smallScript = "<script>`nconst USER_WA_BLACK_B64 = '$blackB64';`nconst USER_WA_WHITE_B64 = '$whiteB64';`nconst WA_LOGO_B64 = '$blackB64';`n"
$htmlContent = $htmlContent.Replace('<script>', $smallScript)

[System.IO.File]::WriteAllText($htmlPath, $htmlContent, [System.Text.Encoding]::UTF8)
Write-Host "ALL BASE64 CONSTANTS OPTIMIZED! HTML FILE SIZE IS NOW ULTRA LIGHTWEIGHT!"

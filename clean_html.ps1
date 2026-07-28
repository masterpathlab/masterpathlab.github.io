$htmlPath = "c:\Users\mohdh\project\master_path_lab_portal.html"
$htmlContent = [System.IO.File]::ReadAllText($htmlPath, [System.Text.Encoding]::UTF8)

# Clean up any newlines inside script Base64 variables
# Extract variables cleanly
$blackB64 = [System.IO.File]::ReadAllText("c:\Users\mohdh\project\user_wa_black_b64.txt").Replace("`r", "").Replace("`n", "").Trim()
$whiteB64 = [System.IO.File]::ReadAllText("c:\Users\mohdh\project\user_wa_white_b64.txt").Replace("`r", "").Replace("`n", "").Trim()

# Remove old injected script constants if broken
$regexBlack = [regex]"const USER_WA_BLACK_B64 = 'data:image\/png;base64,[^']+';"
$regexWhite = [regex]"const USER_WA_WHITE_B64 = 'data:image\/png;base64,[^']+';"

$htmlContent = $regexBlack.Replace($htmlContent, "")
$htmlContent = $regexWhite.Replace($htmlContent, "")

# Replace <script> with single-line clean constants
$cleanScript = "<script>`nconst USER_WA_BLACK_B64 = '$blackB64';`nconst USER_WA_WHITE_B64 = '$whiteB64';`n"
$htmlContent = $htmlContent.Replace('<script>', $cleanScript)

[System.IO.File]::WriteAllText($htmlPath, $htmlContent, [System.Text.Encoding]::UTF8)
Write-Host "CLEANED HTML BASE64 STRINGS SUCCESSFULLY!"

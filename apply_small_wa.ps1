$blackB64 = [System.IO.File]::ReadAllText("c:\Users\mohdh\project\small_wa_black.txt").Trim()
$whiteB64 = [System.IO.File]::ReadAllText("c:\Users\mohdh\project\small_wa_white.txt").Trim()

$htmlPath = "c:\Users\mohdh\project\master_path_lab_portal.html"
$htmlContent = [System.IO.File]::ReadAllText($htmlPath, [System.Text.Encoding]::UTF8)

# Replace old massive 1.5MB constants with 2KB constants
$regexBlack = [regex]"const USER_WA_BLACK_B64 = 'data:image\/png;base64,[^']+';"
$regexWhite = [regex]"const USER_WA_WHITE_B64 = 'data:image\/png;base64,[^']+';"

$htmlContent = $regexBlack.Replace($htmlContent, "")
$htmlContent = $regexWhite.Replace($htmlContent, "")

$smallScript = "<script>`nconst USER_WA_BLACK_B64 = '$blackB64';`nconst USER_WA_WHITE_B64 = '$whiteB64';`n"
$htmlContent = $htmlContent.Replace('<script>', $smallScript)

[System.IO.File]::WriteAllText($htmlPath, $htmlContent, [System.Text.Encoding]::UTF8)
Write-Host "PORTAL OPTIMIZED WITH 2KB WA LOGO PNGs! FILE SIZE DRAMATICALLY REDUCED!"

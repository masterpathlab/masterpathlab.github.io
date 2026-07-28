$blackB64 = [System.IO.File]::ReadAllText("c:\Users\mohdh\project\user_wa_black_b64.txt").Trim()
$whiteB64 = [System.IO.File]::ReadAllText("c:\Users\mohdh\project\user_wa_white_b64.txt").Trim()

$htmlPath = "c:\Users\mohdh\project\master_path_lab_portal.html"
$htmlContent = [System.IO.File]::ReadAllText($htmlPath, [System.Text.Encoding]::UTF8)

# Declare constants in the script tag
$inlineScript = "<script>`nconst USER_WA_BLACK_B64 = '$blackB64';`nconst USER_WA_WHITE_B64 = '$whiteB64';`n"
$htmlContent = $htmlContent.Replace('<script>', $inlineScript)

[System.IO.File]::WriteAllText($htmlPath, $htmlContent, [System.Text.Encoding]::UTF8)
Write-Host "INJECTED EXACT USER WA LOGO CONSTANTS SUCCESSFULLY!"

$blackB64 = [System.IO.File]::ReadAllText("c:\Users\mohdh\project\small_wa_black.txt").Trim()
$whiteB64 = [System.IO.File]::ReadAllText("c:\Users\mohdh\project\small_wa_white.txt").Trim()
$gmailB64 = [System.IO.File]::ReadAllText("c:\Users\mohdh\project\gmail_official_b64.txt").Trim()

$testHtml = [System.IO.File]::ReadAllText("c:\Users\mohdh\project\master_path_lab_portal_test.html", [System.Text.Encoding]::UTF8)

# Replace top script header logos
$logoScript = "<script>`n    const USER_WA_BLACK_B64 = '$blackB64';`n    const USER_WA_WHITE_B64 = '$whiteB64';`n    const WA_LOGO_B64 = '$blackB64';`n    const GMAIL_LOGO_B64 = '$gmailB64';`n    </script>"

$patternLogos = "(?s)<script>\s*const USER_WA_BLACK_B64 = .*?</script>"
$testHtml = [regex]::Replace($testHtml, $patternLogos, $logoScript)

# Save updated master_path_lab_portal_test.html
[System.IO.File]::WriteAllText("c:\Users\mohdh\project\master_path_lab_portal_test.html", $testHtml, [System.Text.Encoding]::UTF8)
[System.IO.File]::WriteAllText("c:\Users\mohdh\project\master_path_lab_portal.html", $testHtml, [System.Text.Encoding]::UTF8)

Write-Host "Base64 logos replaced cleanly!"

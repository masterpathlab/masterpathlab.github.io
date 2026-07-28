$htmlPath = "c:\Users\mohdh\project\master_path_lab_portal.html"
$htmlContent = [System.IO.File]::ReadAllText($htmlPath, [System.Text.Encoding]::UTF8)

$bytesGmail = [System.IO.File]::ReadAllBytes("C:\Users\mohdh\.gemini\antigravity-ide\brain\c6613517-dff2-48fe-975d-dc77682f6a47\media__1785123174724.jpg")
$bytesWA = [System.IO.File]::ReadAllBytes("C:\Users\mohdh\.gemini\antigravity-ide\brain\c6613517-dff2-48fe-975d-dc77682f6a47\media__1785123174747.jpg")

$b64Gmail = "data:image/jpeg;base64," + [System.Convert]::ToBase64String($bytesGmail)
$b64WA = "data:image/jpeg;base64," + [System.Convert]::ToBase64String($bytesWA)

# Replace <script src="logos_base64.js"></script> with inline constants
$inlineScript = "<script>`nconst GMAIL_LOGO_B64 = '$b64Gmail';`nconst WA_LOGO_B64 = '$b64WA';`n</script>"

$updatedHtml = $htmlContent.Replace('<script src="logos_base64.js"></script>', $inlineScript)

[System.IO.File]::WriteAllText($htmlPath, $updatedHtml, [System.Text.Encoding]::UTF8)
Write-Host "INLINED LOGOS INTO HTML SUCCESSFULLY!"

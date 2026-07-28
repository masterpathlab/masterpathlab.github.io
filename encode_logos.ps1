$bytesGmail = [System.IO.File]::ReadAllBytes("C:\Users\mohdh\.gemini\antigravity-ide\brain\c6613517-dff2-48fe-975d-dc77682f6a47\media__1785123174724.jpg")
$bytesWA = [System.IO.File]::ReadAllBytes("C:\Users\mohdh\.gemini\antigravity-ide\brain\c6613517-dff2-48fe-975d-dc77682f6a47\media__1785123174747.jpg")

$b64Gmail = [System.Convert]::ToBase64String($bytesGmail)
$b64WA = [System.Convert]::ToBase64String($bytesWA)

$output = "const GMAIL_LOGO_B64 = 'data:image/jpeg;base64,$b64Gmail';" + "`n" + "const WA_LOGO_B64 = 'data:image/jpeg;base64,$b64WA';"
[System.IO.File]::WriteAllText("c:\Users\mohdh\project\logos_base64.js", $output, [System.Text.Encoding]::UTF8)
Write-Host "LOGOS BASE64 CREATED SUCCESSFULLY!"

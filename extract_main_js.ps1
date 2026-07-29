$html = [System.IO.File]::ReadAllText('c:\Users\mohdh\project\master_path_lab_portal_test.html')
$mc = [regex]::Matches($html, '(?s)<script\b[^>]*>(.*?)</script>')
$mainJs = $mc[5].Groups[1].Value
[System.IO.File]::WriteAllText('c:\Users\mohdh\project\main_app_debug.js', $mainJs, [System.Text.Encoding]::UTF8)
Write-Host "Extracted main JS code. Size: " $mainJs.Length " bytes."

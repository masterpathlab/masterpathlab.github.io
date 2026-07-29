# Final Cleanup Script for master_path_lab_portal.html

$htmlPath = "c:\Users\mohdh\project\master_path_lab_portal.html"
$html = [System.IO.File]::ReadAllText($htmlPath, [System.Text.Encoding]::UTF8)

# Read small Base64 strings
$blackB64 = [System.IO.File]::ReadAllText("c:\Users\mohdh\project\small_wa_black.txt").Replace("`r", "").Replace("`n", "").Trim()
$whiteB64 = [System.IO.File]::ReadAllText("c:\Users\mohdh\project\small_wa_white.txt").Replace("`r", "").Replace("`n", "").Trim()

# Remove ALL existing Base64 constant declarations across the entire HTML file
$pattern = "(?m)^\s*const (USER_WA_BLACK_B64|USER_WA_WHITE_B64|WA_LOGO_B64|GMAIL_LOGO_B64)\s*=\s*'data:image\/[^']+';\s*`n?"
$cleanHtml = [regex]::Replace($html, $pattern, "")

# Remove any empty <script></script> blocks created by previous regex replaces
$cleanHtml = [regex]::Replace($cleanHtml, "(?s)<script>\s*</script>", "")

# Base64 logo script block (Single declaration at the top of <head>)
$logoScript = "<script>`nconst USER_WA_BLACK_B64 = '$blackB64';`nconst USER_WA_WHITE_B64 = '$whiteB64';`nconst WA_LOGO_B64 = '$blackB64';`n</script>"

# Insert $logoScript immediately after Tailwind CSS CDN script
$cleanHtml = [regex]::Replace($cleanHtml, '(?s)(<script src="https://cdn\.tailwindcss\.com"></script>)\s*', "$1`n    $logoScript`n    ")

# Write clean master_path_lab_portal.html
[System.IO.File]::WriteAllText($htmlPath, $cleanHtml, [System.Text.Encoding]::UTF8)

$finalSize = (Get-Item $htmlPath).Length
Write-Host "master_path_lab_portal.html cleaned and updated successfully!"
Write-Host "New File Size: $finalSize bytes (reduced from 230KB+)."

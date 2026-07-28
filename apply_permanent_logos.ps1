# Script to permanently embed user's WhatsApp and Gmail logos into master_path_lab_portal.html

$htmlPath = "c:\Users\mohdh\project\master_path_lab_portal.html"
$html = [System.IO.File]::ReadAllText($htmlPath, [System.Text.Encoding]::UTF8)

# Read compressed Base64 strings
$waBlackB64 = [System.IO.File]::ReadAllText("c:\Users\mohdh\project\wa_black_compressed.txt").Replace("`r", "").Replace("`n", "").Trim()
$waWhiteB64 = [System.IO.File]::ReadAllText("c:\Users\mohdh\project\wa_white_compressed.txt").Replace("`r", "").Replace("`n", "").Trim()
$gmailB64   = [System.IO.File]::ReadAllText("c:\Users\mohdh\project\gmail_compressed.txt").Replace("`r", "").Replace("`n", "").Trim()

# Remove ALL previous logo declarations
$pattern = "(?m)^\s*const (USER_WA_BLACK_B64|USER_WA_WHITE_B64|WA_LOGO_B64|GMAIL_LOGO_B64)\s*=\s*'data:image\/[^']+';\s*`n?"
$cleanHtml = [regex]::Replace($html, $pattern, "")
$cleanHtml = [regex]::Replace($cleanHtml, "(?s)<script>\s*</script>", "")

# Construct new permanent script block with all logos
$logoScript = @"
<script>
const USER_WA_BLACK_B64 = '$waBlackB64';
const USER_WA_WHITE_B64 = '$waWhiteB64';
const WA_LOGO_B64 = '$waBlackB64';
const GMAIL_LOGO_B64 = '$gmailB64';
</script>
"@

# Insert logoScript immediately after Tailwind CDN script tag
$updatedHtml = [regex]::Replace($cleanHtml, '(?s)(<script src="https://cdn\.tailwindcss\.com"></script>)\s*', "`$1`n    $logoScript`n    ")

# Write to file
[System.IO.File]::WriteAllText($htmlPath, $updatedHtml, [System.Text.Encoding]::UTF8)

$size = (Get-Item $htmlPath).Length
Write-Host "PERMANENT WHATSAPP AND GMAIL LOGOS EMBEDDED SUCCESSFULLY!"
Write-Host "File size: $size bytes."

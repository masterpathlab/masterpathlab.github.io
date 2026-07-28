$html = [System.IO.File]::ReadAllText("c:\Users\mohdh\project\master_path_lab_portal_test.html", [System.Text.Encoding]::UTF8)

# Find duplicate let sigY or duplicate declarations
$lines = $html -split "`n"
for ($i = 0; $i -lt $lines.Length; $i++) {
    $line = $lines[$i]
    if ($line -match 'let\s+([a-zA-Z0-9_]+)\s*=' -or $line -match 'const\s+([a-zA-Z0-9_]+)\s*=') {
        $varName = $matches[1]
        # Check next 5 lines for duplicate declaration of same variable in same scope
        for ($j = $i + 1; $j -lt [Math]::Min($i + 5, $lines.Length); $j++) {
            if ($lines[$j] -match "(let|const)\s+$varName\b") {
                Write-Host "DUPLICATE DECLARATION: '$varName' on line $($i+1) and line $($j+1)!"
                Write-Host "Line $($i+1): $($lines[$i].Trim())"
                Write-Host "Line $($j+1): $($lines[$j].Trim())"
            }
        }
    }
}

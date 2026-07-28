$html = [System.IO.File]::ReadAllText("c:\Users\mohdh\project\master_path_lab_portal_test.html", [System.Text.Encoding]::UTF8)

# Extract all onclick calls
$onclickMatches = [regex]::Matches($html, 'onclick="([^"]+)"')
$scriptMatches = [regex]::Matches($html, "(?s)<script>(.*?)</script>")
$fullScript = ""
foreach ($m in $scriptMatches) {
    $fullScript += $m.Groups[1].Value + "`n"
}

Write-Host "Checking $($onclickMatches.Count) onclick handlers..."

$missing = @()
foreach ($m in $onclickMatches) {
    $handler = $m.Groups[1].Value.Trim()
    # Extract function name (before parentheses)
    if ($handler -match '^([a-zA-Z0-9_]+)\s*\(') {
        $fnName = $matches[1]
        if ($fullScript -notmatch "function\s+$fnName\b") {
            Write-Host "MISSING FUNCTION: $fnName (used in onclick: '$handler')"
            $missing += $fnName
        }
    }
}

if ($missing.Count -eq 0) {
    Write-Host "All onclick functions exist in JavaScript!"
} else {
    Write-Host "Total missing functions: $($missing.Count)"
}

$html = [System.IO.File]::ReadAllText("c:\Users\mohdh\project\master_path_lab_portal_test.html", [System.Text.Encoding]::UTF8)

# Find all script blocks
$scriptMatches = [regex]::Matches($html, "(?s)<script>(.*?)</script>")

Write-Host "Found $($scriptMatches.Count) script blocks"
$i = 0
foreach ($m in $scriptMatches) {
    $i++
    $code = $m.Groups[1].Value
    Write-Host "Script $i length: $($code.Length)"
}

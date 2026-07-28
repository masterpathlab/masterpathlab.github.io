$content = Get-Content index.html -Raw

# Check duplicate IDs
$idMatches = [regex]::Matches($content, 'id="([^"]+)"')
$idList = @()
$dupeIds = @()
foreach ($m in $idMatches) {
    $id = $m.Groups[1].Value
    if ($idList -contains $id) {
        if (-not ($dupeIds -contains $id)) { $dupeIds += $id }
    } else {
        $idList += $id
    }
}
Write-Host "Duplicate IDs found:" $dupeIds.Count
$dupeIds | ForEach-Object { Write-Host " - " $_ }

# Check unclosed tags or img without alt
$imgNoAlt = [regex]::Matches($content, '<img(?![^>]*\balt=)[^>]*>')
Write-Host "Img tags without alt:" $imgNoAlt.Count

# Check buttons without type
$btnNoType = [regex]::Matches($content, '<button(?![^>]*\btype=)[^>]*>')
Write-Host "Button tags without type:" $btnNoType.Count

# Check console.warn
$warns = [regex]::Matches($content, 'console\.warn')
Write-Host "console.warn count:" $warns.Count

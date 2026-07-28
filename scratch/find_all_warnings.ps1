$content = Get-Content index.html -Raw

# 1. img without alt
$imgs = [regex]::Matches($content, '<img(?![^>]*\balt=)[^>]*>')
Write-Host "Img tags without alt: " $imgs.Count
foreach ($m in $imgs) { Write-Host " - " $m.Value }

# 2. labels without for
$labels = [regex]::Matches($content, '<label(?![^>]*\bfor=)[^>]*>')
Write-Host "`nLabel tags without for attribute: " $labels.Count

# 3. inputs without id or name
$inputs = [regex]::Matches($content, '<input(?![^>]*\bid=)[^>]*>')
Write-Host "`nInput tags without id attribute: " $inputs.Count
foreach ($m in $inputs) { Write-Host " - " $m.Value }

# 4. console.warn occurrences
$warns = [regex]::Matches($content, 'console\.warn')
Write-Host "`nConsole.warn occurrences: " $warns.Count

# 5. href="#" or empty href
$hrefs = [regex]::Matches($content, '<a\s+[^>]*href="#"[^>]*>')
Write-Host "`na tags with href='#': " $hrefs.Count
foreach ($m in $hrefs) { Write-Host " - " $m.Value }

# 6. duplicate attributes on any HTML tag
$tags = [regex]::Matches($content, '<[a-zA-Z0-9]+(\s+[a-zA-Z0-9_-]+="[^"]*")*')

$port = 8080
$prefix1 = "http://localhost:$port/"
$prefix2 = "http://192.168.29.226:$port/"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix1)
try {
    $listener.Prefixes.Add($prefix2)
    $listener.Start()
    Write-Host "Server listening on $prefix1 and $prefix2"
} catch {
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add($prefix1)
    $listener.Start()
    Write-Host "Server listening on $prefix1"
}

$rootDir = Get-Location

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $rawPath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($rawPath)) { $rawPath = "master_path_lab_portal_test.html" }
        
        $filePath = Join-Path $rootDir $rawPath
        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $bytes.Length
            if ($filePath.EndsWith(".html")) { $response.ContentType = "text/html; charset=utf-8" }
            elseif ($filePath.EndsWith(".js")) { $response.ContentType = "application/javascript; charset=utf-8" }
            elseif ($filePath.EndsWith(".css")) { $response.ContentType = "text/css; charset=utf-8" }
            elseif ($filePath.EndsWith(".png")) { $response.ContentType = "image/png" }
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
        }
        $response.Close()
    } catch {
        # ignore client disconnects
    }
}

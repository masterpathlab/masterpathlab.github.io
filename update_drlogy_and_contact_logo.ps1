$testHtml = [System.IO.File]::ReadAllText("c:\Users\mohdh\project\master_path_lab_portal_test.html", [System.Text.Encoding]::UTF8)

# 1. Replace www.drlogy.com with Master Path Lab everywhere
$testHtml = $testHtml.Replace("www.drlogy.com", "Master Path Lab")

# 2. Remove contact logo from PDF header
$pdfHeaderLogoPattern = "(?s)if \(typeof WA_LOGO_B64 !== 'undefined' && WA_LOGO_B64\) \{\s*try \{ doc\.addImage\(WA_LOGO_B64, 'PNG', waLogoX, waIconY, logoSize, logoSize\); \} catch\(e\)\{\}\s*\} else \{\s*doc\.setFillColor\(37, 211, 102\);\s*doc\.circle\(waLogoX \+ logoSize / 2, waIconY \+ logoSize / 2, logoSize / 2, 'F'\);\s*\}"
$testHtml = [regex]::Replace($testHtml, $pdfHeaderLogoPattern, "")

# 3. Remove contact logo from PDF footer
$pdfFooterLogoPattern = "(?s)if \(typeof WA_LOGO_B64 !== 'undefined' && WA_LOGO_B64\) \{\s*try \{ doc\.addImage\(WA_LOGO_B64, 'PNG', footerWaLogoX, 287\.5, footerLogoSize, footerLogoSize\); \} catch\(e\)\{\}\s*\} else \{\s*doc\.setFillColor\(37, 211, 102\);\s*doc\.circle\(footerWaLogoX \+ footerLogoSize / 2, 287\.5 \+ footerLogoSize / 2, footerLogoSize / 2, 'F'\);\s*\}"
$testHtml = [regex]::Replace($testHtml, $pdfFooterLogoPattern, "")

# 4. Remove contact logo from Modal Header preview
$modalHeaderLogoPattern = '<img src="\$\{typeof USER_WA_BLACK_B64 !== ''undefined'' \? USER_WA_BLACK_B64 : ''''\}" class="w-4 h-4 object-contain">'
$testHtml = [regex]::Replace($testHtml, $modalHeaderLogoPattern, "")

# 5. Remove contact logo from Modal Footer preview
$modalFooterLogoPattern = '<img src="\$\{typeof USER_WA_WHITE_B64 !== ''undefined'' \? USER_WA_WHITE_B64 : ''''\}" class="w-3\.5 h-3\.5 object-contain">'
$testHtml = [regex]::Replace($testHtml, $modalFooterLogoPattern, "")

# Write to both HTML files
[System.IO.File]::WriteAllText("c:\Users\mohdh\project\master_path_lab_portal_test.html", $testHtml, [System.Text.Encoding]::UTF8)
[System.IO.File]::WriteAllText("c:\Users\mohdh\project\master_path_lab_portal.html", $testHtml, [System.Text.Encoding]::UTF8)

Write-Host "Updated www.drlogy.com -> Master Path Lab and removed contact logos!"

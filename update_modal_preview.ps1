$testHtml = [System.IO.File]::ReadAllText("c:\Users\mohdh\project\master_path_lab_portal_test.html", [System.Text.Encoding]::UTF8)

# 1. Wrap addImage calls in try-catch to prevent any PDF generation crash
$testHtml = $testHtml.Replace("doc.addImage(WA_LOGO_B64, 'PNG', waLogoX, waIconY, logoSize, logoSize);", "try { doc.addImage(WA_LOGO_B64, 'PNG', waLogoX, waIconY, logoSize, logoSize); } catch(e){}")
$testHtml = $testHtml.Replace("doc.addImage(GMAIL_LOGO_B64, 'PNG', gmailLogoX, gmailIconY, logoSize, logoSize);", "try { doc.addImage(GMAIL_LOGO_B64, 'PNG', gmailLogoX, gmailIconY, logoSize, logoSize); } catch(e){}")
$testHtml = $testHtml.Replace("doc.addImage(WA_LOGO_B64, 'PNG', footerWaLogoX, 287.5, footerLogoSize, footerLogoSize);", "try { doc.addImage(WA_LOGO_B64, 'PNG', footerWaLogoX, 287.5, footerLogoSize, footerLogoSize); } catch(e){}")

# Save updated HTML files
[System.IO.File]::WriteAllText("c:\Users\mohdh\project\master_path_lab_portal_test.html", $testHtml, [System.Text.Encoding]::UTF8)
[System.IO.File]::WriteAllText("c:\Users\mohdh\project\master_path_lab_portal.html", $testHtml, [System.Text.Encoding]::UTF8)

Write-Host "PDF generator try-catch wraps updated!"

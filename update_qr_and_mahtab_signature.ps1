$testHtml = [System.IO.File]::ReadAllText("c:\Users\mohdh\project\master_path_lab_portal_test.html", [System.Text.Encoding]::UTF8)

# 1. Remove QR Code vector lines from PDF generator
$qrCodePdfPattern = "(?s)doc\.setDrawColor\(30, 41, 59\);\s*doc\.setLineWidth\(0\.4\);\s*doc\.rect\(54, currentY - 4, 11, 11\);\s*doc\.setFillColor\(30, 41, 59\);\s*doc\.rect\(55, currentY - 3, 3, 3, 'F'\);\s*doc\.rect\(61, currentY - 3, 3, 3, 'F'\);\s*doc\.rect\(55, currentY \+ 3, 3, 3, 'F'\);\s*doc\.rect\(59, currentY \+ 1, 2, 2, 'F'\);"
$testHtml = [regex]::Replace($testHtml, $qrCodePdfPattern, "")

# 2. Update PDF generator Signatures to Mahtab Anwar (BMLT) with Digital Signature
$pdfSigsPattern = "(?s)const sigs = reportObj\.signatures \|\| \{\};\s*doc\.setDrawColor\(15, 23, 42\);.*?doc\.text\('\(MD, Pathologist\)', 150, sigY \+ 7\);"
$pdfSigsReplacement = @"
                let sigY = Math.max(currentY + 18, 252);
                doc.setFontSize(8);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(15, 118, 110);
                doc.text('[ Digitally Signed ]', 170, sigY - 8, { align: 'center' });

                doc.setDrawColor(15, 23, 42);
                doc.setLineWidth(0.4);
                doc.line(152, sigY - 2, 160, sigY - 6);
                doc.line(160, sigY - 6, 172, sigY - 2);
                doc.line(172, sigY - 2, 185, sigY - 5);

                doc.setFontSize(9.5);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(...textDark);
                doc.text('Mahtab Anwar', 170, sigY + 3, { align: 'center' });

                doc.setFontSize(8);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(100, 116, 139);
                doc.text('(BMLT)', 170, sigY + 7, { align: 'center' });
"@
$testHtml = [regex]::Replace($testHtml, $pdfSigsPattern, $pdfSigsReplacement)

# 3. Update signatures object in handleGenerateReport
$testHtml = $testHtml.Replace("tech: document.getElementById('sig-tech').value || 'Medical Lab Technician (DMLT, BMLT)',`n                doc1: document.getElementById('sig-doc1').value || 'Dr. Payal Shah (MD, Pathologist)',`n                doc2: document.getElementById('sig-doc2').value || 'Dr. Vimal Shah (MD, Pathologist)'", "tech: 'Mahtab Anwar (BMLT)'")

# Save updated files
[System.IO.File]::WriteAllText("c:\Users\mohdh\project\master_path_lab_portal_test.html", $testHtml, [System.Text.Encoding]::UTF8)
[System.IO.File]::WriteAllText("c:\Users\mohdh\project\master_path_lab_portal.html", $testHtml, [System.Text.Encoding]::UTF8)

Write-Host "QR Code removed and Mahtab Anwar BMLT Digital Signature updated in PDF Generator!"

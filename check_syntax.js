
// Universal Fail-Safe AutoTable Invoker
        function callAutoTable(doc, options) {
            try {
                if (typeof doc.autoTable === 'function') {
                    doc.autoTable(options);
                } else if (typeof window.autoTable === 'function') {
                    window.autoTable(doc, options);
                } else if (window.jspdf && window.jspdf.jsPDF && typeof window.jspdf.jsPDF.API.autoTable === 'function') {
                    window.jspdf.jsPDF.API.autoTable.call(doc, options);
                }
            } catch (e) {
                console.warn('autoTable warning:', e);
            }
        }

        // Full 30 BMLT Pathology Lab Test Master Database
        const defaultTestDB = [
            // 1. CBC
            {
                id: 'TDB-CBC',
                title: 'Complete Blood Count (CBC)',
                category: 'Hematology',
                sampleType: 'Blood',
                tat: '',
                instruments: 'Fully automated cell counter - Mindray 300',
                interpNote: 'Further confirm for Anemia',
                params: [
                    { isGroup: true, groupName: 'HEMOGLOBIN' },
                    { inv: 'Hemoglobin (Hb)', sub: '', res: '12.5', flag: 'Low', ref: '13.0 - 17.0', unit: 'g/dL' },
                    { isGroup: true, groupName: 'RBC COUNT' },
                    { inv: 'Total RBC count', sub: '', res: '5.2', flag: 'Normal', ref: '4.5 - 5.5', unit: 'mill/cumm' },
                    { isGroup: true, groupName: 'BLOOD INDICES' },
                    { inv: 'Packed Cell Volume (PCV)', sub: '', res: '57.5', flag: 'High', ref: '40 - 50', unit: '%' },
                    { inv: 'Mean Corpuscular Volume (MCV)', sub: 'Calculated', res: '87.75', flag: 'Normal', ref: '83 - 101', unit: 'fL' },
                    { inv: 'MCH', sub: 'Calculated', res: '27.2', flag: 'Normal', ref: '27 - 32', unit: 'pg' },
                    { inv: 'MCHC', sub: 'Calculated', res: '32.8', flag: 'Normal', ref: '32.5 - 34.5', unit: 'g/dL' },
                    { inv: 'RDW', sub: '', res: '13.6', flag: 'Normal', ref: '11.6 - 14.0', unit: '%' },
                    { isGroup: true, groupName: 'WBC COUNT' },
                    { inv: 'Total WBC count', sub: '', res: '9000', flag: 'Normal', ref: '4000-11000', unit: 'cumm' },
                    { isGroup: true, groupName: 'DIFFERENTIAL WBC COUNT' },
                    { inv: 'Neutrophils', sub: '', res: '60', flag: 'Normal', ref: '50 - 62', unit: '%' },
                    { inv: 'Lymphocytes', sub: '', res: '31', flag: 'Normal', ref: '20 - 40', unit: '%' },
                    { inv: 'Eosinophils', sub: '', res: '1', flag: 'Normal', ref: '00 - 06', unit: '%' },
                    { inv: 'Monocytes', sub: '', res: '7', flag: 'Normal', ref: '00 - 10', unit: '%' },
                    { inv: 'Basophils', sub: '', res: '1', flag: 'Normal', ref: '00 - 02', unit: '%' },
                    { isGroup: true, groupName: 'PLATELET COUNT' },
                    { inv: 'Platelet Count', sub: '', res: '150000', flag: 'Borderline', ref: '150000 - 410000', unit: 'cumm' }
                ]
            },
            // 2. Thyroid Profile
            {
                id: 'TDB-THYROID',
                title: 'THYROID PROFILE (TOTAL T3, T4, TSH)',
                category: 'Endocrinology',
                sampleType: 'Serum (2 ml)',
                tat: '',
                instruments: 'CLIA Chemiluminescence Immunoassay',
                interpNote: 'Thyroid function evaluated via total hormone levels',
                params: [
                    { inv: 'Total Triiodothyronine (T3)', sub: 'CLIA', res: '1.25', flag: 'Low', ref: '0.8 - 2.0', unit: 'ng/mL' },
                    { inv: 'Total Thyroxine (T4)', sub: 'CLIA', res: '7.8', flag: 'High', ref: '5.1 - 14.1', unit: 'µg/dL' },
                    { inv: 'Thyroid Stimulating Hormone (TSH)', sub: 'CLIA', res: '2.4', flag: 'Critical', ref: '0.5 - 4.5', unit: 'µIU/mL' }
                ],
                bulletComments: 'Thyroid hormones regulate metabolism, energy balance, and cellular activity. TSH levels respond inversely to T3 and T4 via pituitary feedback loop.'
            },
            // 3. Lipid Profile
            {
                id: 'TDB-LIPID',
                title: 'LIPID PROFILE (CHOLESTEROL PANEL)',
                category: 'Cardiology',
                sampleType: 'Serum (2 ml Fasting)',
                tat: '',
                instruments: 'Automated Biochemistry Analyzer',
                interpNote: 'Desirable total cholesterol < 200 mg/dL',
                params: [
                    { inv: 'Total Cholesterol', sub: 'Enzymatic', res: '215', flag: 'High', ref: '< 200', unit: 'mg/dL' },
                    { inv: 'Triglycerides', sub: 'GPO-PAP', res: '145', flag: 'Normal', ref: '< 150', unit: 'mg/dL' },
                    { inv: 'HDL Cholesterol (Good)', sub: 'Direct', res: '42', flag: 'Normal', ref: '> 40', unit: 'mg/dL' },
                    { inv: 'LDL Cholesterol (Bad)', sub: 'Calculated', res: '144', flag: 'High', ref: '< 100', unit: 'mg/dL' },
                    { inv: 'VLDL Cholesterol', sub: 'Calculated', res: '29', flag: 'Normal', ref: '< 30', unit: 'mg/dL' },
                    { inv: 'Total / HDL Ratio', sub: 'Calculated', res: '5.1', flag: 'Borderline', ref: '< 4.5', unit: 'Ratio' }
                ],
                bulletComments: 'Fasting 12 hours mandatory for accurate Triglycerides & VLDL calculation.'
            },
            // 4. LFT
            {
                id: 'TDB-LFT',
                title: 'LIVER FUNCTION TEST (LFT)',
                category: 'Biochemistry',
                sampleType: 'Serum (2 ml)',
                tat: '',
                instruments: 'Fully Automated Chemistry Analyzer',
                interpNote: 'Assess hepatic synthetic & excretory function',
                params: [
                    { isGroup: true, groupName: 'BILIRUBIN PANEL' },
                    { inv: 'Bilirubin Total', sub: 'DSA', res: '1.4', flag: 'High', ref: '0.2 - 1.2', unit: 'mg/dL' },
                    { inv: 'Bilirubin Direct', sub: 'DSA', res: '0.4', flag: 'Normal', ref: '0.0 - 0.5', unit: 'mg/dL' },
                    { inv: 'Bilirubin Indirect', sub: 'Calculated', res: '1.0', flag: 'Normal', ref: '0.1 - 1.0', unit: 'mg/dL' },
                    { isGroup: true, groupName: 'ENZYMES PANEL' },
                    { inv: 'SGOT / AST', sub: 'IFCC', res: '38', flag: 'Normal', ref: '10 - 40', unit: 'U/L' },
                    { inv: 'SGPT / ALT', sub: 'IFCC', res: '55', flag: 'High', ref: '10 - 45', unit: 'U/L' },
                    { inv: 'Alkaline Phosphatase (ALP)', sub: 'pNPP', res: '110', flag: 'Normal', ref: '40 - 130', unit: 'U/L' },
                    { isGroup: true, groupName: 'PROTEINS PANEL' },
                    { inv: 'Total Protein', sub: 'Biuret', res: '7.2', flag: 'Normal', ref: '6.4 - 8.3', unit: 'g/dL' },
                    { inv: 'Albumin', sub: 'BCG', res: '4.2', flag: 'Normal', ref: '3.5 - 5.2', unit: 'g/dL' },
                    { inv: 'Globulin', sub: 'Calculated', res: '3.0', flag: 'Normal', ref: '2.3 - 3.5', unit: 'g/dL' },
                    { inv: 'A/G Ratio', sub: 'Calculated', res: '1.4', flag: 'Normal', ref: '1.1 - 2.2', unit: 'Ratio' }
                ]
            },
            // 5. KFT
            {
                id: 'TDB-KFT',
                title: 'KIDNEY FUNCTION TEST (KFT / RENAL PROFILE)',
                category: 'Biochemistry',
                sampleType: 'Serum & Fluoride Blood',
                tat: '',
                instruments: 'Biochemistry Autoanalyzer',
                interpNote: 'Monitors glomerular filtration and renal clearance',
                params: [
                    { inv: 'Blood Urea', sub: 'GLDH', res: '28', flag: 'Normal', ref: '15 - 45', unit: 'mg/dL' },
                    { inv: 'Serum Creatinine', sub: 'Jaffe Modified', res: '1.05', flag: 'Normal', ref: '0.7 - 1.3', unit: 'mg/dL' },
                    { inv: 'Uric Acid', sub: 'Uricase', res: '7.8', flag: 'High', ref: '3.5 - 7.2', unit: 'mg/dL' },
                    { inv: 'Blood Urea Nitrogen (BUN)', sub: 'Calculated', res: '13.08', flag: 'Normal', ref: '7 - 20', unit: 'mg/dL' },
                    { inv: 'Serum Sodium (Na+)', sub: 'ISE', res: '141', flag: 'Normal', ref: '135 - 145', unit: 'mEq/L' },
                    { inv: 'Serum Potassium (K+)', sub: 'ISE', res: '4.3', flag: 'Normal', ref: '3.5 - 5.1', unit: 'mEq/L' },
                    { inv: 'Serum Chloride (Cl-)', sub: 'ISE', res: '102', flag: 'Normal', ref: '98 - 107', unit: 'mEq/L' }
                ]
            },
            // 6. Widal Test
            {
                id: 'TDB-WIDAL',
                title: 'WIDAL TEST (TYPHOID FEVER SEROLOGY)',
                category: 'Serology',
                sampleType: 'Serum (2 ml)',
                tat: '',
                instruments: 'Slide & Tube Agglutination Method',
                interpNote: 'Titre >= 1:80 indicates significant antibody level',
                params: [
                    { inv: 'Salmonella Typhi "O"', sub: 'Slide Agglutination', res: '1:160 Positive', flag: 'High', ref: '< 1:80 Negative', unit: 'Titre' },
                    { inv: 'Salmonella Typhi "H"', sub: 'Slide Agglutination', res: '1:160 Positive', flag: 'High', ref: '< 1:80 Negative', unit: 'Titre' },
                    { inv: 'Salmonella Paratyphi "AH"', sub: 'Slide Agglutination', res: '1:40 Negative', flag: 'Normal', ref: '< 1:80 Negative', unit: 'Titre' },
                    { inv: 'Salmonella Paratyphi "BH"', sub: 'Slide Agglutination', res: '1:40 Negative', flag: 'Normal', ref: '< 1:80 Negative', unit: 'Titre' }
                ],
                bulletComments: 'Widal test measures agglutinating antibodies against O and H antigens of Salmonella enterica serovar Typhi.'
            },
            // 7. Dengue Profile
            {
                id: 'TDB-DENGUE',
                title: 'DENGUE PROFILE (NS1 AG, IGG, IGM)',
                category: 'Serology',
                sampleType: 'Serum (2 ml)',
                tat: '',
                instruments: 'Immunochromatographic Rapid & ELISA Test',
                interpNote: 'NS1 Ag is positive in acute early phase (Days 1-5)',
                params: [
                    { inv: 'Dengue NS1 Antigen', sub: 'Rapid ICT', res: 'POSITIVE', flag: 'High', ref: 'NEGATIVE', unit: '' },
                    { inv: 'Dengue IgM Antibody', sub: 'Rapid ICT', res: 'NEGATIVE', flag: 'Normal', ref: 'NEGATIVE', unit: '' },
                    { inv: 'Dengue IgG Antibody', sub: 'Rapid ICT', res: 'NEGATIVE', flag: 'Normal', ref: 'NEGATIVE', unit: '' }
                ],
                bulletComments: 'Positive NS1 Antigen confirms acute primary Dengue infection.'
            },
            // 8. Malaria Parasite
            {
                id: 'TDB-MALARIA',
                title: 'MALARIA PARASITE (MP SMEAR & RAPID CARD)',
                category: 'Serology',
                sampleType: 'Whole Blood EDTA (2 ml)',
                tat: '',
                instruments: 'Microscopic Thick/Thin Smear & Antigen Rapid Card',
                interpNote: 'Negative result does not exclude malaria; repeat if fever persists',
                params: [
                    { inv: 'Malaria Antigen (P. vivax)', sub: 'Rapid Card', res: 'NOT DETECTED', flag: 'Normal', ref: 'NOT DETECTED', unit: '' },
                    { inv: 'Malaria Antigen (P. falciparum)', sub: 'Rapid Card', res: 'NOT DETECTED', flag: 'Normal', ref: 'NOT DETECTED', unit: '' },
                    { inv: 'Peripheral Blood Smear for MP', sub: 'Giemsa Microscopic', res: 'No Hemoparasite Seen', flag: 'Normal', ref: 'No Parasite Seen', unit: '' }
                ]
            },
            // 9. ESR
            {
                id: 'TDB-ESR',
                title: 'ERYTHROCYTE SEDIMENTATION RATE (ESR)',
                category: 'Hematology',
                sampleType: 'Sodium Citrate / EDTA Blood',
                tat: '',
                instruments: 'Westergren Method',
                interpNote: 'Non-specific marker for systemic inflammation and infection',
                params: [
                    { inv: 'Erythrocyte Sedimentation Rate (ESR)', sub: 'Westergren 1st Hour', res: '28', flag: 'High', ref: '0 - 15 (Male) / 0 - 20 (Female)', unit: 'mm/hr' }
                ]
            },
            // 10. Blood Group & Rh
            {
                id: 'TDB-BLOODGROUP',
                title: 'BLOOD GROUPING & RH FACTOR TYPING',
                category: 'Hematology',
                sampleType: 'Whole Blood EDTA (2 ml)',
                tat: '',
                instruments: 'Slide & Tube Hemagglutination Method',
                interpNote: 'Confirmed with forward & reverse grouping',
                params: [
                    { inv: 'ABO Blood Group', sub: 'Agglutination', res: 'O', flag: 'Normal', ref: 'A / B / AB / O', unit: '' },
                    { inv: 'Rh Factor (D Antigen)', sub: 'Agglutination', res: 'POSITIVE (+ve)', flag: 'Normal', ref: 'Positive / Negative', unit: '' }
                ]
            },
            // 11. Triple Marker Serology (HIV, HBsAg, HCV)
            {
                id: 'TDB-SEROLOGY3',
                title: 'TRIPLE MARKER SEROLOGY PANEL (HIV, HBSAG, HCV)',
                category: 'Serology',
                sampleType: 'Serum (3 ml)',
                tat: '',
                instruments: '3rd Gen Immunochromatography & ELISA',
                interpNote: 'Screening test for transfusion-transmissible infections',
                params: [
                    { inv: 'HIV 1 & 2 Antibodies', sub: 'Rapid ICT / ELISA', res: 'NON-REACTIVE', flag: 'Normal', ref: 'NON-REACTIVE', unit: '' },
                    { inv: 'HBsAg (Hepatitis B Surface Ag)', sub: 'Rapid ICT / ELISA', res: 'NON-REACTIVE', flag: 'Normal', ref: 'NON-REACTIVE', unit: '' },
                    { inv: 'HCV (Hepatitis C Antibody)', sub: 'Rapid ICT / ELISA', res: 'NON-REACTIVE', flag: 'Normal', ref: 'NON-REACTIVE', unit: '' }
                ]
            },
            // 12. VDRL / RPR
            {
                id: 'TDB-VDRL',
                title: 'VDRL / RPR TEST FOR SYPHILIS',
                category: 'Serology',
                sampleType: 'Serum (2 ml)',
                tat: '',
                instruments: 'Flocculation Antigen Agglutination',
                interpNote: 'Screening for Treponema pallidum antibodies',
                params: [
                    { inv: 'VDRL / RPR Reactivity', sub: 'Flocculation', res: 'NON-REACTIVE', flag: 'Normal', ref: 'NON-REACTIVE', unit: '' },
                    { inv: 'Quantitative Titre', sub: 'Dilution', res: 'No Titre', flag: 'Normal', ref: 'No Titre', unit: '' }
                ]
            },
            // 13. RA Factor
            {
                id: 'TDB-RA',
                title: 'RHEUMATOID FACTOR (RA FACTOR / RF)',
                category: 'Serology',
                sampleType: 'Serum (2 ml)',
                tat: '',
                instruments: 'Latex Agglutination Quantitative',
                interpNote: 'Supportive marker for Rheumatoid Arthritis diagnosis',
                params: [
                    { inv: 'Rheumatoid Factor (RA)', sub: 'Latex Agglutination', res: '12.0', flag: 'Normal', ref: '< 20.0', unit: 'IU/mL' }
                ]
            },
            // 14. CRP
            {
                id: 'TDB-CRP',
                title: 'C-REACTIVE PROTEIN (CRP QUANTITATIVE)',
                category: 'Biochemistry',
                sampleType: 'Serum (2 ml)',
                tat: '',
                instruments: 'Turbidimetric Immunoassay',
                interpNote: 'Acute phase reactant indicating active inflammation',
                params: [
                    { inv: 'C-Reactive Protein (CRP)', sub: 'Immunoturbidimetry', res: '18.5', flag: 'High', ref: '< 6.0', unit: 'mg/L' }
                ]
            },
            // 15. Serum Electrolytes
            {
                id: 'TDB-ELECTROLYTES',
                title: 'SERUM ELECTROLYTES PANEL (NA+, K+, CL-)',
                category: 'Biochemistry',
                sampleType: 'Serum (2 ml)',
                tat: '',
                instruments: 'Ion Selective Electrode (ISE)',
                interpNote: 'Evaluates fluid balance and acid-base homeostasis',
                params: [
                    { inv: 'Serum Sodium (Na+)', sub: 'Direct ISE', res: '139', flag: 'Normal', ref: '135 - 145', unit: 'mEq/L' },
                    { inv: 'Serum Potassium (K+)', sub: 'Direct ISE', res: '4.2', flag: 'Normal', ref: '3.5 - 5.1', unit: 'mEq/L' },
                    { inv: 'Serum Chloride (Cl-)', sub: 'Direct ISE', res: '101', flag: 'Normal', ref: '98 - 107', unit: 'mEq/L' }
                ]
            },
            // 16. Calcium & Phosphorus
            {
                id: 'TDB-CALCIUM',
                title: 'SERUM CALCIUM & PHOSPHORUS PROFILE',
                category: 'Biochemistry',
                sampleType: 'Serum (2 ml)',
                tat: '',
                instruments: 'Photometric Chemistry Analyzer',
                interpNote: 'Essential for bone mineral metabolism assessment',
                params: [
                    { inv: 'Serum Calcium (Total)', sub: 'Arsenazo III', res: '9.4', flag: 'Normal', ref: '8.8 - 10.6', unit: 'mg/dL' },
                    { inv: 'Serum Ionic Calcium', sub: 'ISE', res: '4.6', flag: 'Normal', ref: '4.5 - 5.3', unit: 'mg/dL' },
                    { inv: 'Serum Phosphorus', sub: 'Molybdate UV', res: '3.8', flag: 'Normal', ref: '2.5 - 4.5', unit: 'mg/dL' }
                ]
            },
            // 17. Iron Profile
            {
                id: 'TDB-IRON',
                title: 'IRON PROFILE (IRON, TIBC, FERRITIN)',
                category: 'Biochemistry',
                sampleType: 'Serum (3 ml Fasting)',
                tat: '',
                instruments: 'Colorimetric & CLIA Immunoassay',
                interpNote: 'Differentiates iron deficiency from chronic disease anemia',
                params: [
                    { inv: 'Serum Iron', sub: 'Ferrozine', res: '45', flag: 'Low', ref: '60 - 170', unit: 'µg/dL' },
                    { inv: 'Total Iron Binding Capacity (TIBC)', sub: 'Direct', res: '410', flag: 'High', ref: '250 - 400', unit: 'µg/dL' },
                    { inv: 'Transferrin Saturation', sub: 'Calculated', res: '10.9', flag: 'Low', ref: '20 - 50', unit: '%' },
                    { inv: 'Serum Ferritin', sub: 'CLIA', res: '12.0', flag: 'Low', ref: '30 - 300', unit: 'ng/mL' }
                ]
            },
            // 18. Diabetic Profile
            {
                id: 'TDB-DIABETIC',
                title: 'DIABETIC PROFILE (HbA1c & BLOOD SUGARS)',
                category: 'Biochemistry',
                sampleType: 'Whole Blood EDTA & Fluoride Plasma',
                tat: '',
                instruments: 'HPLC Bio-Rad D-10 & Glucose Oxidase',
                interpNote: 'HbA1c reflects 3 months average glycemic control',
                params: [
                    { inv: 'Fasting Blood Sugar (FBS)', sub: 'GOD-POD', res: '118', flag: 'High', ref: '70 - 100', unit: 'mg/dL' },
                    { inv: 'Post Prandial Blood Sugar (PPBS)', sub: 'GOD-POD', res: '165', flag: 'High', ref: '< 140', unit: 'mg/dL' },
                    { inv: 'HbA1c (Glycated Hemoglobin)', sub: 'HPLC Gold Standard', res: '6.8', flag: 'High', ref: '< 5.7', unit: '%' },
                    { inv: 'Estimated Average Glucose (eAG)', sub: 'Calculated', res: '149', flag: 'High', ref: '< 117', unit: 'mg/dL' }
                ]
            },
            // 19. Urine Routine
            {
                id: 'TDB-URINE',
                title: 'URINE ROUTINE & MICROSCOPY',
                category: 'Clinical Pathology',
                sampleType: 'Fresh Early Morning Urine (10 ml)',
                tat: '',
                instruments: 'Automated Urine Strip Reader & Optical Microscopy',
                interpNote: 'Complete physical, chemical & microscopic examination',
                params: [
                    { isGroup: true, groupName: 'PHYSICAL EXAMINATION' },
                    { inv: 'Color', sub: 'Visual', res: 'Pale Yellow', flag: 'Normal', ref: 'Pale Yellow', unit: '' },
                    { inv: 'Appearance / Transparency', sub: 'Visual', res: 'Clear', flag: 'Normal', ref: 'Clear', unit: '' },
                    { inv: 'Specific Gravity', sub: 'Refractometer', res: '1.020', flag: 'Normal', ref: '1.010 - 1.030', unit: '' },
                    { inv: 'pH Reaction', sub: 'pH Strip', res: '6.0', flag: 'Normal', ref: '5.0 - 7.5', unit: '' },
                    { isGroup: true, groupName: 'CHEMICAL EXAMINATION' },
                    { inv: 'Urine Protein / Albumin', sub: 'Dipstick', res: 'Nil', flag: 'Normal', ref: 'Nil', unit: '' },
                    { inv: 'Urine Sugar / Glucose', sub: 'Dipstick', res: 'Nil', flag: 'Normal', ref: 'Nil', unit: '' },
                    { inv: 'Ketone Bodies', sub: 'Dipstick', res: 'Negative', flag: 'Normal', ref: 'Negative', unit: '' },
                    { isGroup: true, groupName: 'MICROSCOPIC EXAMINATION' },
                    { inv: 'Pus Cells (WBCs)', sub: 'Microscopy High Power Field', res: '2 - 4', flag: 'Normal', ref: '0 - 5', unit: '/HPF' },
                    { inv: 'Epithelial Cells', sub: 'Microscopy', res: '1 - 2', flag: 'Normal', ref: '0 - 5', unit: '/HPF' },
                    { inv: 'Red Blood Cells (RBCs)', sub: 'Microscopy', res: 'Nil', flag: 'Normal', ref: 'Nil', unit: '/HPF' },
                    { inv: 'Casts & Crystals', sub: 'Microscopy', res: 'Nil Seen', flag: 'Normal', ref: 'Nil Seen', unit: '' }
                ]
            },
            // 20. Stool Routine
            {
                id: 'TDB-STOOL',
                title: 'STOOL ROUTINE & MICROSCOPY',
                category: 'Clinical Pathology',
                sampleType: 'Fresh Stool Specimen in Sterile Container',
                tat: '',
                instruments: 'Microscopic Wet Mount & Chemical Dipstick',
                interpNote: 'Evaluates digestive efficiency and gastrointestinal parasites',
                params: [
                    { isGroup: true, groupName: 'PHYSICAL EXAMINATION' },
                    { inv: 'Color', sub: 'Visual', res: 'Brownish', flag: 'Normal', ref: 'Brownish', unit: '' },
                    { inv: 'Consistency', sub: 'Visual', res: 'Soft Formed', flag: 'Normal', ref: 'Formed', unit: '' },
                    { inv: 'Mucus & Blood', sub: 'Visual', res: 'Absent', flag: 'Normal', ref: 'Absent', unit: '' },
                    { isGroup: true, groupName: 'CHEMICAL & MICROSCOPIC' },
                    { inv: 'Occult Blood', sub: 'Benzidine Strip', res: 'Negative', flag: 'Normal', ref: 'Negative', unit: '' },
                    { inv: 'Reducing Sugars', sub: 'Benedict', res: 'Nil', flag: 'Normal', ref: 'Nil', unit: '' },
                    { inv: 'Protozoal Cysts (E. histolytica/G. lamblia)', sub: 'Microscopy Iodine', res: 'None Seen', flag: 'Normal', ref: 'None Seen', unit: '' },
                    { inv: 'Helminthic Ova / Worms', sub: 'Microscopy Saline', res: 'None Seen', flag: 'Normal', ref: 'None Seen', unit: '' },
                    { inv: 'Pus Cells / RBCs', sub: 'Microscopy', res: '0 - 2', flag: 'Normal', ref: '0 - 2', unit: '/HPF' }
                ]
            },
            // 21. Semen Analysis
            {
                id: 'TDB-SEMEN',
                title: 'SEMEN ANALYSIS (FERTILITY EXAMINATION)',
                category: 'Clinical Pathology',
                sampleType: 'Complete Semen Ejaculate (3 days abstinence)',
                tat: '',
                instruments: 'Makler Chamber & Brightfield Optical Microscopy',
                interpNote: 'WHO 2021 Reference Criteria for Semen Parameters',
                params: [
                    { isGroup: true, groupName: 'PHYSICAL PARAMETERS' },
                    { inv: 'Volume', sub: 'Volumetric Cylinder', res: '3.2', flag: 'Normal', ref: '>= 1.4', unit: 'mL' },
                    { inv: 'pH', sub: 'pH Paper', res: '7.8', flag: 'Normal', ref: '7.2 - 8.0', unit: '' },
                    { inv: 'Liquefaction Time', sub: 'Incubation 37C', res: '25', flag: 'Normal', ref: '< 30', unit: 'mins' },
                    { isGroup: true, groupName: 'MICROSCOPIC PARAMETERS' },
                    { inv: 'Total Sperm Concentration', sub: 'Makler Chamber', res: '48.0', flag: 'Normal', ref: '>= 16.0', unit: 'mill/mL' },
                    { inv: 'Rapid Progressive Motility (Grade A)', sub: 'Microscopy', res: '42', flag: 'Normal', ref: '>= 30', unit: '%' },
                    { inv: 'Sluggish Motility (Grade B)', sub: 'Microscopy', res: '18', flag: 'Normal', ref: '10 - 20', unit: '%' },
                    { inv: 'Non-Motile / Dead Sperms (Grade C+D)', sub: 'Microscopy', res: '40', flag: 'Normal', ref: '< 50', unit: '%' },
                    { inv: 'Normal Sperm Morphology', sub: 'Krueger Strict', res: '6', flag: 'Normal', ref: '>= 4', unit: '%' }
                ]
            },
            // 22. Beta-hCG
            {
                id: 'TDB-HCG',
                title: 'BETA-HCG (PREGNANCY & TUMOR MARKER)',
                category: 'Endocrinology',
                sampleType: 'Serum (2 ml)',
                tat: '',
                instruments: 'CLIA Chemiluminescence Immunoassay',
                interpNote: 'Non-Pregnant < 5 mIU/mL. Confirms early pregnancy.',
                params: [
                    { inv: 'Beta Human Chorionic Gonadotropin (Beta-hCG)', sub: 'CLIA Quantitative', res: '1250.0', flag: 'High', ref: '< 5.0 (Non-Pregnant)', unit: 'mIU/mL' }
                ]
            },
            // 23. PSA Total
            {
                id: 'TDB-PSA',
                title: 'PROSTATE SPECIFIC ANTIGEN (TOTAL PSA)',
                category: 'Tumor Markers',
                sampleType: 'Serum (2 ml)',
                tat: '',
                instruments: 'CLIA Quantitative Immunoassay',
                interpNote: 'Screening marker for prostate hypertrophy and adenocarcinoma',
                params: [
                    { inv: 'Total PSA (Prostate Specific Antigen)', sub: 'CLIA', res: '2.1', flag: 'Normal', ref: '< 4.0', unit: 'ng/mL' }
                ]
            },
            // 24. Cardiac Enzymes (Troponin-I & CK-MB)
            {
                id: 'TDB-CARDIAC',
                title: 'CARDIAC ENZYMES PROFILE (TROPONIN-I & CK-MB)',
                category: 'Cardiology',
                sampleType: 'Serum / Heparin Plasma',
                tat: '',
                instruments: 'Fluorescence Immunoassay Quantitative',
                interpNote: 'Elevated Troponin-I indicates acute myocardial injury (AMI)',
                params: [
                    { inv: 'Troponin-I (Hs-TnI)', sub: 'FIA Quantitative', res: '0.02', flag: 'Normal', ref: '< 0.04', unit: 'ng/mL' },
                    { inv: 'CK-MB (Creatine Kinase-MB)', sub: 'Immuno-Inhibition', res: '14', flag: 'Normal', ref: '< 24', unit: 'U/L' }
                ]
            },
            // 25. Amylase & Lipase
            {
                id: 'TDB-AMYLASE',
                title: 'SERUM AMYLASE & LIPASE (PANCREATIC PROFILE)',
                category: 'Biochemistry',
                sampleType: 'Serum (2 ml)',
                tat: '',
                instruments: 'Automated Photometric Chemistry Analyzer',
                interpNote: 'Marked elevation (> 3x upper limit) indicates acute pancreatitis',
                params: [
                    { inv: 'Serum Amylase', sub: 'CNPG3 Enzymatic', res: '65', flag: 'Normal', ref: '28 - 100', unit: 'U/L' },
                    { inv: 'Serum Lipase', sub: 'Colorimetric Enzymatic', res: '38', flag: 'Normal', ref: '13 - 60', unit: 'U/L' }
                ]
            },
            // 26. BT & CT
            {
                id: 'TDB-BTCT',
                title: 'BLEEDING TIME (BT) & CLOTTING TIME (CT)',
                category: 'Coagulation',
                sampleType: 'Whole Blood (Capillary Finger Prick)',
                tat: '',
                instruments: 'Ivy Paper Method & Capillary Tube Method',
                interpNote: 'Evaluates primary hemostasis and intrinsic clotting pathway',
                params: [
                    { inv: 'Bleeding Time (BT)', sub: 'Duke Filter Paper', res: '2 min 30 sec', flag: 'Normal', ref: '2 - 7 mins', unit: 'mins' },
                    { inv: 'Clotting Time (CT)', sub: 'Capillary Glass Tube', res: '5 min 15 sec', flag: 'Normal', ref: '4 - 10 mins', unit: 'mins' }
                ]
            },
            // 27. PT & INR
            {
                id: 'TDB-PTINR',
                title: 'PROTHROMBIN TIME (PT) & INR PROFILE',
                category: 'Coagulation',
                sampleType: 'Sodium Citrate Plasma 1:9 (2 ml)',
                tat: '',
                instruments: 'Optical Coagulometer Analyzer',
                interpNote: 'Monitors oral anticoagulant therapy (Warfarin/Coumadin)',
                params: [
                    { inv: 'Prothrombin Time (Patient)', sub: 'Thromboplastin Liquid', res: '13.2', flag: 'Normal', ref: '11.0 - 15.0', unit: 'seconds' },
                    { inv: 'Control Time', sub: 'Thromboplastin', res: '12.5', flag: 'Normal', ref: '11.5 - 13.5', unit: 'seconds' },
                    { inv: 'INR (International Normalized Ratio)', sub: 'Calculated (ISI 1.05)', res: '1.05', flag: 'Normal', ref: '0.8 - 1.2 (Therapeutic 2.0-3.0)', unit: 'Ratio' }
                ]
            },
            // 28. Vitamin D3 & B12
            {
                id: 'TDB-VITAMIN',
                title: 'VITAMIN D3 & B12 PROFILE',
                category: 'Nutritional',
                sampleType: 'Serum (2 ml)',
                tat: '',
                instruments: 'CLIA Automated Immunoassay',
                interpNote: 'Evaluates bone health & neurological vitamin status',
                params: [
                    { inv: 'Vitamin D3 (25-Hydroxy)', sub: 'CLIA', res: '18.5', flag: 'Low', ref: '30.0 - 100.0', unit: 'ng/mL' },
                    { inv: 'Vitamin B12 (Cyanocobalamin)', sub: 'CLIA', res: '280', flag: 'Normal', ref: '211 - 911', unit: 'pg/mL' }
                ],
                bulletComments: 'Vitamin D3 Interpretation: Deficient < 20 ng/mL, Insufficient 20-30 ng/mL, Sufficient 30-100 ng/mL.'
            },
            // 29. MCHC
            {
                id: 'TDB-MCHC',
                title: 'Mean Corpuscular Hemoglobin Concentration (MCHC)',
                category: 'Specialized',
                sampleType: 'Blood',
                tat: '',
                instruments: 'Fully Automated Cell Counter',
                interpNote: '',
                params: [
                    { inv: 'Mean Corpuscular Hemoglobin Concentration (MCHC)', sub: 'Calculated', res: '32.8', flag: 'Normal', ref: '32.5 - 34.5', unit: 'g/dL' }
                ],
                bulletComments: 'The Mean Corpuscular Hemoglobin Concentration (MCHC) blood test measures the concentration of hemoglobin in each red blood cell. It helps assess the overall quality and density of the hemoglobin in the blood.',
                bulletLowCauses: 'Iron deficiency anemia - A condition in which the body lacks sufficient iron to produce hemoglobin.\nThalassemia - A genetic disorder that affects the production of hemoglobin.\nChronic disease - Chronic diseases such as cancer, kidney disease, and inflammatory bowel disease.\nBlood loss - Acute or chronic blood loss can lead to anemia.\nNutritional deficiencies - Deficiencies in vitamins B6, B12, and folate can affect red blood cell production.\nHemoglobinopathies, such as sickle cell anemia.\nGenetic conditions that affect hemoglobin production and can lead to anemia.\nBone marrow disorders, such as aplastic anemia.\nHemorrhagic shock - A condition in which severe bleeding leads to a rapid drop in blood pressure.',
                bulletHighCauses: 'Hemolytic anemia - Autoimmune hemolytic anemia.\nSpherocytosis - A genetic disorder in which red blood cells are abnormally shaped.\nDehydration or hemoconcentration - A condition in which there is a decreased amount of fluid in the bloodstream.\nHereditary spherocytosis - An inherited condition that causes red blood cells to be spherical and fragile.\nLiver disease or obstructive jaundice.\nHigh-dose intravenous immunoglobulin therapy.'
            },
            // 30. Hemoglobin
            {
                id: 'TDB-HEMO',
                title: 'HEMOGLOBIN (HB)',
                category: 'Hematology',
                sampleType: 'Blood (2 ml)',
                tat: '',
                instruments: 'Photometric Cyanmethemoglobin',
                interpNote: '',
                params: [
                    { inv: 'Hemoglobin (Hb)', sub: 'Photometry', res: '8.5', flag: 'Low', ref: '13.5 - 17.5', unit: 'g/dL' }
                ],
                genderRanges: [
                    { gender: 'Male', range: '13.5 - 17.5' },
                    { gender: 'Female', range: '12.0 - 15.5' }
                ]
            }
        ];

        const defaultPatients = [
            { pid: '1001', name: 'khan bhai', age: 16, sex: 'Male', mobile: '9898989898', email: 'khan@example.com', password: 'pass1001', registeredAt: '2026-07-27 02:40 PM' },
            { pid: '556', name: 'SK MOHD SUHAIL', age: 20, sex: 'Male', mobile: '9876543210', email: 'suhail@example.com', password: 'pass556', registeredAt: '2026-07-27 02:31 PM' },
            { pid: '555', name: 'Yash M. Patel', age: 21, sex: 'Male', mobile: '9812345678', email: 'yash@example.com', password: 'pass555', registeredAt: '2026-07-27 02:35 PM' },
            { pid: '554', name: 'Yashvi M. Patel', age: 18, sex: 'Female', mobile: '9855544433', email: 'yashvi@example.com', password: 'pass554', registeredAt: '2026-07-27 02:45 PM' }
        ];

        const defaultReports = [
            {
                id: 'REP-1001',
                pid: '1001',
                patientName: 'khan bhai',
                date: '21 OCT 2026 04:35 PM',
                doctor: 'Dr. Hiren Shah',
                collector: 'Mr Suresh',
                location: '125, Shivam Bungalow, S G Road, Bengaluru',
                testTitle: 'THYROID PROFILE (TOTAL T3, T4, TSH)',
                sampleType: 'Serum (2 ml)',
                tat: '',
                instruments: 'CLIA Chemiluminescence Immunoassay',
                interpNote: 'Thyroid function evaluated via total hormone levels',
                params: defaultTestDB[1].params,
                bulletComments: defaultTestDB[1].bulletComments,
                signatures: {
                    tech: 'Medical Lab Technician (DMLT, BMLT)',
                    doc1: 'Dr. Payal Shah (MD, Pathologist)',
                    doc2: 'Dr. Vimal Shah (MD, Pathologist)'
                }
            },
            {
                id: 'REP-55601',
                pid: '556',
                patientName: 'SK MOHD SUHAIL',
                date: '21 OCT 2026 12:00 PM',
                doctor: 'Dr. Hiren Shah',
                collector: 'Mr Suresh',
                location: '125, Shivam Bungalow, S G Road, Bengaluru',
                testTitle: 'Complete Blood Count (CBC)',
                sampleType: 'Blood',
                tat: '',
                instruments: 'Fully automated cell counter - Mindray 300',
                interpNote: 'Further confirm for Anemia',
                params: defaultTestDB[0].params,
                signatures: {
                    tech: 'Medical Lab Technician (DMLT, BMLT)',
                    doc1: 'Dr. Payal Shah (MD, Pathologist)',
                    doc2: 'Dr. Vimal Shah (MD, Pathologist)'
                }
            },
            {
                id: 'REP-55501',
                pid: '555',
                patientName: 'Yash M. Patel',
                date: '02 DEC 2026 04:35 PM',
                doctor: 'Dr. Hiren Shah',
                collector: 'Mr Suresh',
                location: '125, Shivam Bungalow, S G Road, Mumbai',
                testTitle: 'Mean Corpuscular Hemoglobin Concentration (MCHC)',
                sampleType: 'Blood',
                tat: '',
                instruments: 'Fully Automated Cell Counter',
                interpNote: '',
                params: defaultTestDB[28].params,
                bulletComments: defaultTestDB[28].bulletComments,
                bulletLowCauses: defaultTestDB[28].bulletLowCauses,
                bulletHighCauses: defaultTestDB[28].bulletHighCauses,
                signatures: {
                    tech: 'Medical Lab Technician (DMLT, BMLT)',
                    doc1: 'Dr. Payal Shah (MD, Pathologist)',
                    doc2: 'Dr. Vimal Shah (MD, Pathologist)'
                }
            },
            {
                id: 'REP-55401',
                pid: '554',
                patientName: 'Yashvi M. Patel',
                date: '02 DEC 2026 05:00 PM',
                doctor: 'Dr. Hiren Shah',
                collector: 'Mr Suresh',
                location: '125, Shivam Bungalow, S G Road, Mumbai',
                testTitle: 'HEMOGLOBIN (HB)',
                sampleType: 'Blood (2 ml)',
                tat: '',
                instruments: 'Photometric Cyanmethemoglobin',
                interpNote: '',
                params: defaultTestDB[29].params,
                genderRanges: defaultTestDB[29].genderRanges,
                signatures: {
                    tech: 'Medical Lab Technician (DMLT, BMLT)',
                    doc1: 'Dr. Payal Shah (MD, Pathologist)',
                    doc2: 'Dr. Vimal Shah (MD, Pathologist)'
                }
            }
        ];

        // Fail-Safe State Management with Permanent Logo Persistence
        let storedPatients = null;
        let storedReports = null;
        let storedTestDB = null;
        let storedWALogo = null;
        let storedGmailLogo = null;

        try {
            storedPatients = JSON.parse(localStorage.getItem('mpl_patients'));
            storedReports = JSON.parse(localStorage.getItem('mpl_reports'));
            storedTestDB = JSON.parse(localStorage.getItem('mpl_test_db'));
            storedWALogo = localStorage.getItem('mpl_custom_wa_logo');
            storedGmailLogo = localStorage.getItem('mpl_custom_gmail_logo');
        } catch(e) {
            console.warn('LocalStorage parse warning:', e);
        }

        // Sanitize stored testDB to ensure TAT is empty by default
        if (storedTestDB && Array.isArray(storedTestDB)) {
            storedTestDB.forEach(t => {
                if (t.tat === '1 hr' || t.tat === '2 hrs' || t.tat === '1hr') {
                    t.tat = '';
                }
            });
        }

        let appState = {
            currentUser: null,
            loginMode: 'admin',
            activeCategoryFilter: 'All',
            patients: (storedPatients && Array.isArray(storedPatients) && storedPatients.length > 0) ? storedPatients : defaultPatients,
            reports: (storedReports && Array.isArray(storedReports) && storedReports.length > 0) ? storedReports : defaultReports,
            testDB: (storedTestDB && Array.isArray(storedTestDB) && storedTestDB.length >= defaultTestDB.length) ? storedTestDB : defaultTestDB,
            customWALogo: (typeof USER_WA_BLACK_B64 !== 'undefined' ? USER_WA_BLACK_B64 : (typeof WA_LOGO_B64 !== 'undefined' ? WA_LOGO_B64 : storedWALogo)),
            customGmailLogo: (typeof GMAIL_LOGO_B64 !== 'undefined' ? GMAIL_LOGO_B64 : storedGmailLogo)
        };

        saveState();

        function saveState() {
            try {
                localStorage.setItem('mpl_patients', JSON.stringify(appState.patients));
                localStorage.setItem('mpl_reports', JSON.stringify(appState.reports));
                localStorage.setItem('mpl_test_db', JSON.stringify(appState.testDB));
                if (appState.customWALogo) localStorage.setItem('mpl_custom_wa_logo', appState.customWALogo);
                if (appState.customGmailLogo) localStorage.setItem('mpl_custom_gmail_logo', appState.customGmailLogo);
            } catch(e) {
                console.error('LocalStorage save error:', e);
            }
        }

        function restoreDefaultData() {
            appState.patients = [...defaultPatients];
            appState.reports = [...defaultReports];
            appState.testDB = [...defaultTestDB];
            appState.customWALogo = typeof USER_WA_BLACK_B64 !== 'undefined' ? USER_WA_BLACK_B64 : (typeof WA_LOGO_B64 !== 'undefined' ? WA_LOGO_B64 : null);
            appState.customGmailLogo = typeof GMAIL_LOGO_B64 !== 'undefined' ? GMAIL_LOGO_B64 : null;
            saveState();
            populatePatientDropdown();
            renderTestDBPresets();
            renderTestDBTable();
            renderAdminLedger();
            renderPatientsDirectory();
            if (appState.currentUser && appState.currentUser.role === 'patient') {
                renderPatientReports();
            }
            showToast('All 30 master BMLT pathology tests restored successfully!');
        }

        function showToast(message, type = 'success') {
            const container = document.getElementById('toast-container');
            if (!container) return;
            const toast = document.createElement('div');
            toast.className = `p-4 rounded-xl shadow-2xl border text-xs font-semibold transition transform translate-y-2 opacity-0 pointer-events-auto ${
                type === 'success' ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200' : 'bg-red-950/90 border-red-500/50 text-red-200'
            }`;
            toast.innerText = message;
            container.appendChild(toast);
            setTimeout(() => { toast.classList.remove('translate-y-2', 'opacity-0'); }, 50);
            setTimeout(() => {
                toast.classList.add('translate-y-2', 'opacity-0');
                setTimeout(() => toast.remove(), 300);
            }, 4000);
        }

        // Navigation
        function updateUI() {
            const landing = document.getElementById('view-landing');
            const admin = document.getElementById('view-admin');
            const patient = document.getElementById('view-patient');
            const authSection = document.getElementById('header-auth-section');

            if (landing) landing.classList.add('hidden');
            if (admin) admin.classList.add('hidden');
            if (patient) patient.classList.add('hidden');

            if (!appState.currentUser) {
                if (landing) landing.classList.remove('hidden');
                if (authSection) {
                    authSection.innerHTML = `
                        <button onclick="openLoginModal('admin')" class="btn-3d-active font-black px-4 py-2 rounded-xl text-xs transition shadow-md">Admin Login</button>
                        <button onclick="openLoginModal('patient')" class="bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/30 px-4 py-2 rounded-xl text-xs font-bold transition ml-2">Patient Portal</button>
                    `;
                }
            } else if (appState.currentUser.role === 'admin') {
                if (admin) admin.classList.remove('hidden');
                if (authSection) {
                    authSection.innerHTML = `
                        <span class="text-xs text-cyan-400 font-semibold bg-cyan-500/10 border border-cyan-500/30 px-3 py-1.5 rounded-lg mr-2 shadow-sm">
                            🔑 Admin Logged In
                        </span>
                        <button onclick="logout()" class="bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition">Logout</button>
                    `;
                }
                populatePatientDropdown();
                renderTestDBPresets();
                renderTestDBTable();
                renderAdminLedger();
                renderPatientsDirectory();
            } else if (appState.currentUser.role === 'patient') {
                if (patient) patient.classList.remove('hidden');
                if (authSection) {
                    authSection.innerHTML = `
                        <span class="text-xs text-cyan-400 font-semibold bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg mr-3 shadow-sm">
                            👤 ${appState.currentUser.name} (UHID: ${appState.currentUser.pid})
                        </span>
                    `;
                }
                renderPatientReports();
            }
        }

        // Login Modal Controls
        function openLoginModal(mode) {
            appState.loginMode = mode;
            const modal = document.getElementById('login-modal');
            if (modal) modal.classList.remove('hidden');
            
            const title = document.getElementById('modal-title');
            if (title) title.innerText = mode === 'admin' ? 'Admin Portal Login' : 'Patient Portal Access';
            
            const lbl = document.getElementById('lbl-id');
            if (lbl) lbl.innerText = mode === 'admin' ? 'Admin Username' : 'UHID / Patient ID (e.g. 1001 or 556)';
            
            const idInput = document.getElementById('login-id-input');
            if (idInput) idInput.value = mode === 'admin' ? 'admin' : '1001';
            
            const passInput = document.getElementById('login-pass-input');
            if (passInput) passInput.value = mode === 'admin' ? 'admin' : 'pass1001';
        }

        function closeLoginModal() {
            const modal = document.getElementById('login-modal');
            if (modal) modal.classList.add('hidden');
        }

        function handleLoginSubmit(event) {
            event.preventDefault();
            const idInput = document.getElementById('login-id-input').value.trim();
            const passInput = document.getElementById('login-pass-input').value.trim();

            if (appState.loginMode === 'admin') {
                if (idInput === 'admin' && passInput === 'admin') {
                    appState.currentUser = { role: 'admin' };
                    closeLoginModal();
                    showToast('Welcome back, Admin.');
                    updateUI();
                } else {
                    showToast('Invalid admin credentials.', 'error');
                }
            } else {
                const patient = appState.patients.find(p => p.pid.toUpperCase() === idInput.toUpperCase() && p.password === passInput);
                if (patient) {
                    appState.currentUser = { role: 'patient', pid: patient.pid, name: patient.name };
                    closeLoginModal();
                    showToast(`Welcome back, ${patient.name}!`);
                    updateUI();
                } else {
                    showToast('Invalid UHID / Patient ID or Passcode.', 'error');
                }
            }
        }

        function logout() {
            appState.currentUser = null;
            showToast('Logged out successfully.');
            updateUI();
        }

        // Admin 3D Tab Switcher
        function switchAdminTab(tabName) {
            document.querySelectorAll('.admin-tab-content').forEach(el => el.classList.add('hidden'));
            document.querySelectorAll('.admin-tab-btn').forEach(btn => {
                btn.classList.remove('btn-3d-active');
                btn.classList.add('btn-3d-inactive');
            });
            const content = document.getElementById(`admin-tab-${tabName}`);
            if (content) content.classList.remove('hidden');
            
            const activeBtn = document.getElementById(`tab-btn-${tabName}`);
            if (activeBtn) {
                activeBtn.classList.remove('btn-3d-inactive');
                activeBtn.classList.add('btn-3d-active');
            }
        }

        // Patient Registration
        let lastCreatedCreds = null;
        function handleRegisterPatient(event) {
            event.preventDefault();
            const name = document.getElementById('reg-name').value.trim();
            const age = document.getElementById('reg-age').value.trim();
            const sex = document.getElementById('reg-sex').value;
            const mobile = document.getElementById('reg-mobile').value.trim();
            const email = document.getElementById('reg-email').value.trim();

            const pidNumber = 1002 + appState.patients.length;
            const pid = `${pidNumber}`;
            const password = 'pass' + pid;

            const newPatient = { pid, name, age, sex, mobile, email, password, registeredAt: new Date().toLocaleString() };
            appState.patients.push(newPatient);
            saveState();

            document.getElementById('form-register').reset();
            populatePatientDropdown();
            renderPatientsDirectory();

            lastCreatedCreds = { pid, name, password };
            document.getElementById('cred-modal-name').innerText = name;
            document.getElementById('cred-modal-pid').innerText = pid;
            document.getElementById('cred-modal-pass').innerText = password;
            document.getElementById('credential-modal').classList.remove('hidden');
        }

        function closeCredentialModal() {
            document.getElementById('credential-modal').classList.add('hidden');
            switchAdminTab('report');
            if (lastCreatedCreds) {
                document.getElementById('rep-patient-select').value = lastCreatedCreds.pid;
                autofillPatientData();
            }
        }

        function copyCredentials() {
            if (!lastCreatedCreds) return;
            const text = `Master Path Lab Credentials\nPatient: ${lastCreatedCreds.name}\nUHID / Patient ID: ${lastCreatedCreds.pid}\nPasscode: ${lastCreatedCreds.password}`;
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(() => {
                    showToast('Credentials copied to clipboard!');
                }).catch(() => {
                    fallbackCopyText(text);
                });
            } else {
                fallbackCopyText(text);
            }
        }

        function fallbackCopyText(text) {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                showToast('Credentials copied to clipboard!');
            } catch (err) {
                showToast('Failed to copy. Please copy manually.', 'error');
            }
            document.body.removeChild(textArea);
        }

        function populatePatientDropdown() {
            const select = document.getElementById('rep-patient-select');
            if (!select) return;
            select.innerHTML = '<option value="">-- Choose Patient --</option>';
            appState.patients.forEach(p => {
                const opt = document.createElement('option');
                opt.value = p.pid;
                opt.textContent = `${p.name} (UHID: ${p.pid})`;
                select.appendChild(opt);
            });
        }

        function autofillPatientData() {
            const select = document.getElementById('rep-patient-select');
            if (!select) return;
            const pid = select.value;
            const banner = document.getElementById('patient-info-banner');
            if (!pid) {
                if (banner) banner.classList.add('hidden');
                return;
            }
            const patient = appState.patients.find(p => p.pid === pid);
            if (patient && banner) {
                document.getElementById('pinfo-name').innerText = patient.name;
                document.getElementById('pinfo-meta').innerText = `Age: ${patient.age} Y / ${patient.sex} | Ph: ${patient.mobile || 'N/A'}`;
                document.getElementById('pinfo-pid').innerText = `UHID: ${patient.pid}`;
                banner.classList.remove('hidden');
            }
        }

        // Category Filter & Search for Presets
        function filterPresetCategory(catName) {
            appState.activeCategoryFilter = catName;
            document.querySelectorAll('.category-pill').forEach(btn => {
                btn.classList.remove('bg-cyan-500', 'text-slate-950');
                btn.classList.add('bg-slate-900', 'text-slate-300');
            });
            event.target.classList.remove('bg-slate-900', 'text-slate-300');
            event.target.classList.add('bg-cyan-500', 'text-slate-950');
            renderTestDBPresets();
        }

        function filterPresetCards() {
            renderTestDBPresets();
        }

        // Test Master Database Presets Loader
        function renderTestDBPresets() {
            const container = document.getElementById('test-db-preset-container');
            if (!container) return;
            container.innerHTML = '';
            
            const searchInput = (document.getElementById('preset-search-input') ? document.getElementById('preset-search-input').value.toLowerCase().trim() : '');
            
            const categoryIcons = {
                'Hematology': '🩸',
                'Serology': '🧫',
                'Biochemistry': '🧪',
                'Endocrinology': '🦋',
                'Clinical Pathology': '💧',
                'Nutritional': '💊',
                'Coagulation': '🩸',
                'Tumor Markers': '🎯',
                'Cardiology': '🫀',
                'Specialized': '🔬'
            };

            const filteredTests = appState.testDB.filter(test => {
                const matchesCat = (appState.activeCategoryFilter === 'All' || test.category === appState.activeCategoryFilter);
                const matchesSearch = !searchInput || test.title.toLowerCase().includes(searchInput) || (test.category && test.category.toLowerCase().includes(searchInput));
                return matchesCat && matchesSearch;
            });

            if (filteredTests.length === 0) {
                container.innerHTML = `<div class="col-span-full py-4 text-center text-xs text-slate-500">No test panels matched your filter.</div>`;
                return;
            }

            filteredTests.forEach(test => {
                const icon = categoryIcons[test.category] || '📄';
                const card = document.createElement('div');
                card.onclick = () => loadTestFromDB(test.id);
                card.className = 'preset-3d-card p-3 rounded-xl cursor-pointer group flex flex-col justify-between';
                card.innerHTML = `
                    <div>
                        <div class="flex items-center justify-between mb-1.5">
                            <span class="text-base">${icon}</span>
                            <span class="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm">${test.category || 'General'}</span>
                        </div>
                        <h5 class="text-xs font-bold text-white group-hover:text-cyan-300 line-clamp-2 leading-snug">${test.title}</h5>
                    </div>
                    <div class="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                        <span>${test.params ? test.params.length : 0} Items</span>
                        <span class="text-cyan-400 font-extrabold group-hover:underline">Load &rarr;</span>
                    </div>
                `;
                container.appendChild(card);
            });
        }

        function loadTestFromDB(testId) {
            const test = appState.testDB.find(t => t.id === testId);
            if (!test) return;
            const titleInput = document.getElementById('rep-test-title');
            const sampleInput = document.getElementById('rep-sample-type');
            const tatInput = document.getElementById('rep-tat');
            const instInput = document.getElementById('rep-instruments');
            const interpInput = document.getElementById('rep-interp-note');
            const commInput = document.getElementById('rep-bullet-comments');
            const lowCausesInput = document.getElementById('rep-bullet-low-causes');
            const highCausesInput = document.getElementById('rep-bullet-high-causes');

            if (titleInput) titleInput.value = test.title;
            if (sampleInput) sampleInput.value = test.sampleType;
            if (tatInput) tatInput.value = test.tat || '';
            if (instInput) instInput.value = test.instruments || '';
            if (interpInput) interpInput.value = test.interpNote || '';
            if (commInput) commInput.value = test.bulletComments || '';
            if (lowCausesInput) lowCausesInput.value = test.bulletLowCauses || '';
            if (highCausesInput) highCausesInput.value = test.bulletHighCauses || '';

            clearReportFormRows();
            if (test.params) {
                test.params.forEach(p => {
                    if (p.isGroup) {
                        addGroupRow(p.groupName);
                    } else {
                        addTestRow(p.inv, p.sub, p.res, p.flag, p.ref, p.unit);
                    }
                });
            }
            if (test.genderRanges) test.genderRanges.forEach(g => addRefRow(g.gender, g.range));

            showToast(`Loaded Master Path Lab "${test.title}" panel template.`);
        }

        function clearReportFormRows() {
            const rows1 = document.getElementById('test-rows-container');
            const rows2 = document.getElementById('ref-rows-container');
            if (rows1) rows1.innerHTML = '';
            if (rows2) rows2.innerHTML = '';
        }

        // Dynamic Form Rows Management
        function addGroupRow(groupName = 'BLOOD INDICES') {
            const tbody = document.getElementById('test-rows-container');
            if (!tbody) return;
            const tr = document.createElement('tr');
            tr.className = 'bg-slate-900/90 border-y border-slate-700 test-row group-header-row';
            tr.setAttribute('data-is-group', 'true');
            tr.innerHTML = `
                <td colspan="5" class="p-2">
                    <div class="flex items-center gap-2">
                        <span class="text-xs font-bold text-amber-400 uppercase tracking-wider">Group Header:</span>
                        <input type="text" value="${groupName}" placeholder="e.g. BLOOD INDICES or WBC COUNT" class="flex-grow bg-slate-950 border border-slate-700 rounded-lg p-2 text-white text-xs font-extrabold outline-none focus:border-amber-400 group-name-input uppercase">
                    </div>
                </td>
                <td class="p-2 text-center"><button type="button" onclick="this.closest('tr').remove()" class="text-red-400 hover:text-red-300 font-bold px-2 py-1 text-xs">✕</button></td>
            `;
            tbody.appendChild(tr);
        }

        function addTestRow(inv = '', sub = '', res = '', flag = 'Normal', ref = '', unit = '') {
            const tbody = document.getElementById('test-rows-container');
            if (!tbody) return;
            const tr = document.createElement('tr');
            tr.className = 'border-b border-slate-800/80 test-row hover:bg-slate-950/40 transition';
            tr.innerHTML = `
                <td class="p-2">
                    <input type="text" value="${inv}" placeholder="Investigation Name (e.g. Hemoglobin)" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white text-xs outline-none focus:border-cyan-500 test-inv font-semibold">
                    <input type="text" value="${sub}" placeholder="Method/Sub-label (e.g. Calculated or Photometry)" class="w-full bg-slate-950/60 border border-slate-800/80 rounded p-1 text-[11px] text-slate-400 outline-none mt-1 test-sub">
                </td>
                <td class="p-2"><input type="text" value="${res}" placeholder="Result" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white text-xs outline-none focus:border-cyan-500 test-res font-bold"></td>
                <td class="p-2">
                    <select class="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white text-xs outline-none focus:border-cyan-500 test-flag">
                        <option value="Normal" ${flag === 'Normal' ? 'selected' : ''}>Normal</option>
                        <option value="Low" ${flag === 'Low' ? 'selected' : ''}>Low (Blue)</option>
                        <option value="High" ${flag === 'High' ? 'selected' : ''}>High (Red)</option>
                        <option value="Borderline" ${flag === 'Borderline' ? 'selected' : ''}>Borderline (Amber)</option>
                        <option value="Critical" ${flag === 'Critical' ? 'selected' : ''}>Critical (Bold)</option>
                    </select>
                </td>
                <td class="p-2"><input type="text" value="${ref}" placeholder="Reference Range" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white text-xs outline-none focus:border-cyan-500 test-ref"></td>
                <td class="p-2"><input type="text" value="${unit}" placeholder="Unit" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white text-xs outline-none focus:border-cyan-500 test-unit"></td>
                <td class="p-2 text-center"><button type="button" onclick="this.closest('tr').remove()" class="text-red-400 hover:text-red-300 font-bold px-2 py-1 transition text-xs">✕</button></td>
            `;
            tbody.appendChild(tr);
        }

        function addRefRow(gender = '', range = '') {
            const tbody = document.getElementById('ref-rows-container');
            if (!tbody) return;
            const tr = document.createElement('tr');
            tr.className = 'border-b border-slate-800/80 ref-row';
            tr.innerHTML = `
                <td class="p-2"><input type="text" value="${gender}" placeholder="Male / Female / Children" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white text-xs outline-none ref-gender"></td>
                <td class="p-2"><input type="text" value="${range}" placeholder="e.g. 13.5 - 17.5" class="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white text-xs outline-none ref-range"></td>
                <td class="p-2 text-center"><button type="button" onclick="this.closest('tr').remove()" class="text-red-400 hover:text-red-300 font-bold px-2 py-1 text-xs">✕</button>
            `;
            tbody.appendChild(tr);
        }


        // Initialize default rows on load
        window.onload = function() {
            loadTestFromDB('TDB-CBC');
            updateUI();
        };

        // 1:1 EXACT PATHOLOGY PDF GENERATOR ENGINE (EXACT WHATSAPP & GMAIL LOGO POSITIONS)
        function handleGenerateReport(event) {
            event.preventDefault();
            const pidSelect = document.getElementById('rep-patient-select');
            if (!pidSelect || !pidSelect.value) {
                showToast('Please select a patient.', 'error');
                return;
            }
            const pid = pidSelect.value;
            const patient = appState.patients.find(p => p.pid === pid);
            if (!patient) {
                showToast('Patient record not found. Please select a valid patient.', 'error');
                return;
            }

            const doctor = document.getElementById('rep-doctor').value || 'Dr. Hiren Shah';
            const collector = document.getElementById('rep-collector').value || 'Mr Suresh';
            const location = document.getElementById('rep-location').value || '125, Shivam Bungalow, S G Road, Bengaluru';
            const testTitle = document.getElementById('rep-test-title').value.trim() || 'Complete Blood Count (CBC)';
            const sampleType = document.getElementById('rep-sample-type').value.trim() || 'Blood';
            const tat = document.getElementById('rep-tat').value.trim() || '';
            const instruments = document.getElementById('rep-instruments').value.trim() || '';
            const interpNote = document.getElementById('rep-interp-note').value.trim() || '';
            const bulletComments = document.getElementById('rep-bullet-comments').value.trim() || '';
            const bulletLowCauses = document.getElementById('rep-bullet-low-causes').value.trim() || '';
            const bulletHighCauses = document.getElementById('rep-bullet-high-causes').value.trim() || '';

            // Parse params
            const rows = document.querySelectorAll('.test-row');
            const params = [];
            rows.forEach(r => {
                if (r.getAttribute('data-is-group') === 'true') {
                    const groupName = r.querySelector('.group-name-input').value.trim();
                    if (groupName) params.push({ isGroup: true, groupName: groupName.toUpperCase() });
                } else {
                    const inv = r.querySelector('.test-inv').value.trim();
                    const sub = r.querySelector('.test-sub') ? r.querySelector('.test-sub').value.trim() : '';
                    const res = r.querySelector('.test-res').value.trim();
                    let flag = r.querySelector('.test-flag').value;
                    const ref = r.querySelector('.test-ref').value.trim();
                    const unit = r.querySelector('.test-unit').value.trim();

                    if (flag === 'Normal' && res && ref) {
                        const rangeMatch = ref.match(/([0-9.]+)\s*-\s*([0-9.]+)/);
                        if (rangeMatch && !isNaN(parseFloat(res))) {
                            const numRes = parseFloat(res);
                            const minVal = parseFloat(rangeMatch[1]);
                            const maxVal = parseFloat(rangeMatch[2]);
                            if (numRes < minVal) flag = 'Low';
                            else if (numRes > maxVal) flag = 'High';
                        }
                    }

                    if (inv) params.push({ inv, sub, res, flag, ref, unit });
                }
            });

            if (params.length === 0) {
                showToast('Please add at least one investigation parameter or group header.', 'error');
                return;
            }

            const refRows = document.querySelectorAll('.ref-row');
            const genderRanges = [];
            refRows.forEach(r => {
                const gender = r.querySelector('.ref-gender').value.trim();
                const range = r.querySelector('.ref-range').value.trim();
                if (gender) genderRanges.push({ gender, range });
            });

            const signatures = {
                tech: document.getElementById('sig-tech').value || 'Medical Lab Technician (DMLT, BMLT)',
                doc1: document.getElementById('sig-doc1').value || 'Dr. Payal Shah (MD, Pathologist)',
                doc2: document.getElementById('sig-doc2').value || 'Dr. Vimal Shah (MD, Pathologist)'
            };

            const dateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ' 12:00 PM';

            const reportObj = {
                id: 'REP-' + Math.floor(10000 + Math.random() * 90000),
                pid: patient.pid,
                patientName: patient.name,
                date: dateStr,
                doctor,
                collector,
                location,
                testTitle,
                sampleType,
                tat,
                instruments,
                interpNote,
                params,
                bulletComments,
                bulletLowCauses,
                bulletHighCauses,
                genderRanges,
                signatures
            };

            appState.reports.unshift(reportObj);
            saveState();

            generateMasterPathLabPDFReport(patient, reportObj);
            showToast('1:1 BMLT PDF report generated with exact WhatsApp & Gmail logos!');
            renderAdminLedger();
        }

        function generateMasterPathLabPDFReport(patient, reportObj, mode) {
            try {
                const jsPDFClass = (window.jspdf && window.jspdf.jsPDF) || window.jsPDF;
                if (!jsPDFClass) {
                    showToast('PDF Library loading... Please try again in 2 seconds.', 'error');
                    return;
                }
                const doc = new jsPDFClass({ unit: 'mm', format: 'a4' });

                const pName = (patient && patient.name) ? patient.name : (reportObj.patientName || 'SK MOHD SUHAIL');
                const pAge = (patient && patient.age) ? patient.age : '20';
                const pSex = (patient && patient.sex) ? patient.sex : 'Male';
                const pPid = (patient && patient.pid) ? patient.pid : (reportObj.pid || '556');
                const rDate = reportObj.date || '21 OCT, 2024 12:00 PM';

                // Palette Colors
                const navyColor = [15, 76, 129];
                const headerBlue = [27, 108, 172];
                const lightStripeBlue = [130, 177, 255];
                const textDark = [15, 23, 42];
                const blueFlagColor = [27, 108, 172];
                const redFlagColor = [220, 38, 38];
                const amberFlagColor = [217, 119, 6];
                const lineGray = [226, 232, 240];

                // --- 1. HEADER SECTION ---
                // Dark Navy Circle Logo
                doc.setFillColor(...navyColor);
                doc.circle(18, 19, 7.2, 'F');

                // White Microscope Vector Shape inside Circle Logo
                doc.setFillColor(255, 255, 255);
                doc.setDrawColor(255, 255, 255);
                doc.setLineWidth(0.6);
                doc.rect(14.8, 23.2, 6.4, 1.1, 'F'); // Base Stand
                doc.rect(17.4, 15, 1.4, 7, 'F');   // Main Body Tube
                doc.circle(18.1, 20.8, 1.7, 'F');  // Objective Lens
                doc.line(18.1, 15, 20.5, 12.8);    // Eyepiece Arm
                doc.circle(20.5, 12.8, 0.8, 'F');  // Eyepiece Top Lens

                // Main Lab Title: MASTER PATH LAB
                doc.setTextColor(...navyColor);
                doc.setFontSize(16);
                doc.setFont('helvetica', 'bold');
                doc.text('MASTER PATH LAB', 28, 18);

                // Tagline Microscope Vector Icon + Text
                doc.setFillColor(...navyColor);
                doc.rect(28, 24.5, 3.2, 0.6, 'F');
                doc.rect(29.2, 21.2, 0.8, 3.5, 'F');
                doc.circle(29.6, 23.8, 0.9, 'F');

                doc.setFontSize(8.5);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(51, 65, 85);
                doc.text('Accurate  |  Caring  |  Instant', 33, 24);

                // --- TOP RIGHT CONTACT DETAILS: WHATSAPP TOP LINE, GMAIL BOTTOM LINE (5.2MM EQUAL LOGOS) ---
                doc.setFontSize(7.5);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(30, 41, 59);

                const phoneStr = '+91 98765 43210  |  0123456789';
                const emailStr = 'drlogypathlab@drlogy.com';

                const logoSize = 5.2; // mm (Increased & equal size for both WhatsApp & Gmail)
                const gap = 1.2;      // mm gap between logo and text

                // 1. LINE 1: WHATSAPP LOGO & PHONE (TOP LINE)
                const phoneWidth = doc.getTextWidth(phoneStr);
                const waLogoX = 196 - phoneWidth - logoSize - gap;
                const waIconY = 12.2;
                const waTextY = 16.2;

                const waLogoToDraw = (appState && appState.customWALogo) || (typeof USER_WA_BLACK_B64 !== 'undefined' ? USER_WA_BLACK_B64 : WA_LOGO_B64);
                if (waLogoToDraw) {
                    doc.addImage(waLogoToDraw, 'PNG', waLogoX, waIconY, logoSize, logoSize);
                }
                doc.text(phoneStr, 196, waTextY, { align: 'right' });

                // 2. LINE 2: GMAIL LOGO & EMAIL (BOTTOM LINE)
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(30, 41, 59);

                const emailWidth = doc.getTextWidth(emailStr);
                const gmailLogoX = 196 - emailWidth - logoSize - gap;
                const gmailIconY = 18.5;
                const gmailTextY = 22.5;

                const gmailLogoToDraw = (appState && appState.customGmailLogo) || (typeof GMAIL_LOGO_B64 !== 'undefined' ? GMAIL_LOGO_B64 : null);
                if (gmailLogoToDraw) {
                    const gmailFmt = gmailLogoToDraw.includes('png') ? 'PNG' : 'JPEG';
                    doc.addImage(gmailLogoToDraw, gmailFmt, gmailLogoX, gmailIconY, logoSize, logoSize);
                } else {
                    doc.setFillColor(234, 67, 53);
                    doc.rect(gmailLogoX, gmailIconY, logoSize, logoSize, 'F');
                }
                doc.text(emailStr, 196, gmailTextY, { align: 'right' });

                // Centered Address Line
                doc.setFontSize(6.8);
                doc.setTextColor(71, 85, 105);
                doc.text('105 -108, SMART VISION COMPLEX, HEALTHCARE ROAD, OPPOSITE HEALTHCARE COMPLEX. BENGALURU - 560047', 105, 28, { align: 'center' });

                // --- 2. BLUE STRIPE ACCENT BAR WITH SLASHES & DOMAIN ---
                doc.setFillColor(...lightStripeBlue);
                doc.rect(0, 30.5, 130, 4.5, 'F');

                // Diagonal Slashes Accent Lines
                doc.setDrawColor(255, 255, 255);
                doc.setLineWidth(0.7);
                for (let s = 0; s < 7; s++) {
                    doc.line(82 + (s * 3), 35, 86 + (s * 3), 30.5);
                }

                // Dark Navy Right Bar with Domain
                doc.setFillColor(...navyColor);
                doc.rect(130, 30.5, 80, 4.5, 'F');
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(7.5);
                doc.setFont('helvetica', 'bold');
                doc.text('www.drlogy.com', 196, 34, { align: 'right' });

                // --- 3. PATIENT METADATA BLOCK WITH QR CODE & BARCODE ---
                let currentY = 43;

                // Patient Name, Age, Sex
                doc.setFontSize(11);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(...textDark);
                doc.text(pName, 14, currentY);

                doc.setFontSize(8);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(71, 85, 105);
                doc.text(`Age : ${pAge} Years`, 14, currentY + 5);
                doc.text(`Sex : ${pSex}`, 14, currentY + 9.5);

                // QR Code 2D Vector Graphic
                doc.setDrawColor(30, 41, 59);
                doc.setLineWidth(0.4);
                doc.rect(54, currentY - 4, 11, 11);
                // Finder Pattern Squares inside QR
                doc.setFillColor(30, 41, 59);
                doc.rect(55, currentY - 3, 3, 3, 'F');
                doc.rect(61, currentY - 3, 3, 3, 'F');
                doc.rect(55, currentY + 3, 3, 3, 'F');
                doc.rect(59, currentY + 1, 2, 2, 'F');

                // Sample Collection info (Center)
                doc.setFontSize(8.5);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(...textDark);
                doc.text('Sample Collected At:', 76, currentY - 2);

                doc.setFontSize(7.8);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(51, 65, 85);
                doc.text('125, Shivam Bungalow, S G Road,', 76, currentY + 2.5);
                doc.text('Bengaluru', 76, currentY + 6.5);

                doc.setFontSize(8.5);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(...textDark);
                doc.text('Ref. By: Dr. Hiren Shah', 76, currentY + 12);

                // Vector Barcode & Timestamps (Top Right)
                doc.setFillColor(30, 41, 59);
                for (let b = 0; b < 28; b++) {
                    const w = (b % 3 === 0) ? 0.7 : 0.35;
                    doc.rect(154 + (b * 1.3), currentY - 5, w, 5.5, 'F');
                }
                doc.setFontSize(5);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(100, 116, 139);
                doc.text('01554362328791', 170, currentY + 1.8, { align: 'center' });

                doc.setFontSize(6.5);
                doc.text(`Registered on: 02:31 PM 20 oct, 2024`, 196, currentY + 5.5, { align: 'right' });
                doc.text(`Collected on:  03:11 PM 21 oct, 2024`, 196, currentY + 9, { align: 'right' });
                doc.text(`Reported on:   04:35 PM 21 oct, 2024`, 196, currentY + 12.5, { align: 'right' });

                // Bottom Divider Line of Patient Block
                doc.setDrawColor(...lineGray);
                doc.setLineWidth(0.4);
                doc.line(14, currentY + 16, 196, currentY + 16);

                // --- 4. TEST HEADER TITLE WITH TOP/BOTTOM LINES ---
                currentY += 23;
                doc.line(14, currentY - 4, 196, currentY - 4);

                doc.setFontSize(11);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(...textDark);
                doc.text((reportObj.testTitle || 'Complete Blood Count (CBC)'), 105, currentY + 1, { align: 'center' });

                doc.line(14, currentY + 4, 196, currentY + 4);

                // --- 5. INVESTIGATION PARAMETERS TABLE ---
                const tableBody = [];

                let tatText = reportObj.tat ? (reportObj.tat.startsWith('TAT') ? reportObj.tat : `TAT : ${reportObj.tat}`) : '';
                tableBody.push(['Primary Sample Type :', reportObj.sampleType || 'Blood', tatText, '']);

                (reportObj.params || []).forEach(p => {
                    if (p.isGroup) {
                        tableBody.push([{ content: p.groupName, colSpan: 4, styles: { fontStyle: 'bold', fillColor: [255, 255, 255], textColor: [15, 23, 42], fontSize: 8.5 } }]);
                    } else {
                        let invCell = p.inv;
                        if (p.sub) {
                            invCell = `${p.inv}\n${p.sub}`;
                        }
                        let resCell = p.res;
                        if (p.flag && p.flag !== 'Normal') {
                            resCell = `${p.res}                       ${p.flag}`;
                        }
                        tableBody.push([invCell, resCell, p.ref, p.unit]);
                    }
                });

                callAutoTable(doc, {
                    startY: currentY + 6,
                    head: [['Investigation', 'Result', 'Reference Value', 'Unit']],
                    body: tableBody,
                    theme: 'plain',
                    headStyles: { fillColor: [255, 255, 255], textColor: [15, 23, 42], fontStyle: 'bold', fontSize: 8.5, halign: 'left' },
                    bodyStyles: { textColor: [30, 41, 59], fontSize: 8, fontStyle: 'bold' },
                    columnStyles: {
                        0: { cellWidth: 70, fontStyle: 'bold' },
                        1: { cellWidth: 50, fontStyle: 'bold' },
                        2: { cellWidth: 42, fontStyle: 'bold' },
                        3: { cellWidth: 20, fontStyle: 'bold' }
                    },
                    didParseCell: function(data) {
                        if (data.section === 'body') {
                            data.cell.styles.fontStyle = 'bold';
                            if (data.row.index === 0) {
                                data.cell.styles.fontStyle = 'bold';
                            }
                            if (data.column.index === 1 && data.row.index > 0) {
                                const valText = String(data.cell.raw || '');
                                if (valText.includes('Low')) {
                                    data.cell.styles.textColor = blueFlagColor;
                                    data.cell.styles.fontStyle = 'bold';
                                } else if (valText.includes('High')) {
                                    data.cell.styles.textColor = redFlagColor;
                                    data.cell.styles.fontStyle = 'bold';
                                } else if (valText.includes('Borderline')) {
                                    data.cell.styles.textColor = amberFlagColor;
                                    data.cell.styles.fontStyle = 'bold';
                                }
                            }
                        }
                    },
                    didDrawRow: function(data) {
                        if (data.section === 'body' && data.row.index === 0) {
                            doc.setDrawColor(226, 232, 240);
                            doc.line(14, data.row.y + data.row.height, 196, data.row.y + data.row.height);
                        }
                    }
                });

                currentY = (doc.lastAutoTable ? doc.lastAutoTable.finalY : currentY + 30) + 6;

                // --- INSTRUMENTS & INTERPRETATION LINES ---
                if (reportObj.instruments) {
                    doc.setFontSize(8);
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(...textDark);
                    doc.text(`Instruments: ${reportObj.instruments}`, 14, currentY);
                    currentY += 5;
                }

                if (reportObj.interpNote) {
                    doc.setFontSize(8);
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(...textDark);
                    doc.text(`Interpretation: ${reportObj.interpNote}`, 14, currentY);
                    currentY += 6;
                }

                // --- BULLETED COMMENTS & CAUSES SECTION ---
                if (reportObj.bulletComments) {
                    doc.setFontSize(8.5);
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(...textDark);
                    doc.text('Comments :', 14, currentY);
                    currentY += 4;

                    const lines = reportObj.bulletComments.split('\n');
                    lines.forEach(line => {
                        if (line.trim()) {
                            doc.setFont('helvetica', 'normal');
                            doc.setFontSize(7.5);
                            doc.text(`• ${line.trim()}`, 16, currentY, { maxWidth: 175 });
                            currentY += 4.5;
                        }
                    });
                    currentY += 2;
                }

                if (reportObj.bulletLowCauses) {
                    doc.setFontSize(8.5);
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(...textDark);
                    doc.text('Low Causes :', 14, currentY);
                    currentY += 4;

                    const lines = reportObj.bulletLowCauses.split('\n');
                    lines.forEach(line => {
                        if (line.trim()) {
                            doc.setFont('helvetica', 'normal');
                            doc.setFontSize(7.5);
                            doc.text(`• ${line.trim()}`, 16, currentY, { maxWidth: 175 });
                            currentY += 4.5;
                        }
                    });
                    currentY += 2;
                }

                if (reportObj.bulletHighCauses) {
                    doc.setFontSize(8.5);
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(...textDark);
                    doc.text('High Causes :', 14, currentY);
                    currentY += 4;

                    const lines = reportObj.bulletHighCauses.split('\n');
                    lines.forEach(line => {
                        if (line.trim()) {
                            doc.setFont('helvetica', 'normal');
                            doc.setFontSize(7.5);
                            doc.text(`• ${line.trim()}`, 16, currentY, { maxWidth: 175 });
                            currentY += 4.5;
                        }
                    });
                    currentY += 2;
                }

                // --- GENDER REFERENCE TABLE SECTION ---
                if (reportObj.genderRanges && reportObj.genderRanges.length > 0) {
                    doc.setFontSize(8.5);
                    doc.setFont('helvetica', 'bold');
                    doc.setTextColor(...textDark);
                    doc.text('Comment :', 14, currentY);

                    const genderTableBody = reportObj.genderRanges.map(g => [g.gender, g.range]);
                    callAutoTable(doc, {
                        startY: currentY + 2,
                        head: [['Gender', 'Normal Range']],
                        body: genderTableBody,
                        theme: 'grid',
                        headStyles: { fillColor: [248, 250, 252], textColor: [30, 41, 59], fontStyle: 'bold', fontSize: 7.5 },
                        bodyStyles: { fontSize: 7.5, textColor: [51, 65, 85], fontStyle: 'bold' },
                        margin: { left: 14, right: 110 }
                    });
                    currentY = (doc.lastAutoTable ? doc.lastAutoTable.finalY : currentY + 20) + 6;
                }

                // --- END OF REPORT MARKER ---
                doc.setFontSize(7.5);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(100, 116, 139);
                doc.text('Thanks for Reference', 14, currentY + 4);
                doc.text('****End of Report****', 105, currentY + 4, { align: 'center' });

                // --- 6. HANDWRITTEN TRIPLE SIGNATURES FOOTER SECTION ---
                let sigY = Math.max(currentY + 18, 252);

                const sigs = reportObj.signatures || {};

                // Cursive Vector Signatures
                doc.setDrawColor(15, 23, 42);
                doc.setLineWidth(0.4);
                // Tech Sig 1
                doc.line(14, sigY - 2, 28, sigY - 6);
                doc.line(28, sigY - 6, 36, sigY - 2);
                doc.line(36, sigY - 2, 45, sigY - 5);

                // Doc 1 Sig
                doc.line(85, sigY - 2, 92, sigY - 7);
                doc.line(92, sigY - 7, 102, sigY - 3);

                // Doc 2 Sig
                doc.line(150, sigY - 2, 158, sigY - 6);
                doc.line(158, sigY - 6, 168, sigY - 3);

                doc.setFontSize(8.5);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(...textDark);

                doc.text(sigs.tech || 'Medical Lab Technician', 14, sigY + 3);
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(7.2);
                doc.setTextColor(100, 116, 139);
                doc.text('(DMLT, BMLT)', 14, sigY + 7);

                doc.setFontSize(8.5);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(...textDark);
                doc.text(sigs.doc1 || 'Dr. Payal Shah', 85, sigY + 3);
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(7.2);
                doc.setTextColor(100, 116, 139);
                doc.text('(MD, Pathologist)', 85, sigY + 7);

                doc.setFontSize(8.5);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(...textDark);
                doc.text(sigs.doc2 || 'Dr. Vimal Shah', 150, sigY + 3);
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(7.2);
                doc.setTextColor(100, 116, 139);
                doc.text('(MD, Pathologist)', 150, sigY + 7);

                // --- 7. BOTTOM FOOTER STRIPE WITH VECTOR SCOOTER & WHATSAPP ---
                doc.setDrawColor(...lineGray);
                doc.line(14, 275, 196, 275);

                doc.setFontSize(6.5);
                doc.setTextColor(100, 116, 139);
                doc.text(`Generated on : ${rDate}`, 145, 279, { align: 'right' });
                doc.text('Page 1 of 1', 196, 279, { align: 'right' });

                // Bottom Blue Banner
                doc.setFillColor(...headerBlue);
                doc.rect(0, 283, 210, 14, 'F');

                // Left Side Domain
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(8.5);
                doc.setFont('helvetica', 'bold');
                doc.text('www.drlogy.com', 14, 291);

                // Center Vector Delivery Scooter Graphic
                doc.setFillColor(15, 23, 42); // Black wheels
                doc.circle(86, 292, 1.4, 'F');
                doc.circle(94, 292, 1.4, 'F');

                doc.setFillColor(251, 191, 36); // Yellow scooter chassis
                doc.rect(86, 288.5, 8.5, 2.5, 'F');

                doc.setDrawColor(255, 255, 255); // White handlebar
                doc.setLineWidth(0.6);
                doc.line(93.5, 288.5, 95, 285.5);

                doc.setFillColor(220, 38, 38); // Red driver helmet
                doc.circle(90.5, 286.5, 1.5, 'F');

                doc.setFillColor(255, 255, 255); // White delivery box
                doc.rect(84.5, 286.5, 3.5, 3.5, 'F');

                doc.setFontSize(7.5);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(255, 255, 255);
                doc.text('Sample Collection', 98, 290.5);

                // Right Side Larger WhatsApp Green Circle Logo + Number
                const footerPhoneStr = '+91 98765 43210';
                doc.setFontSize(7.5);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(255, 255, 255);

                const footerPhoneWidth = doc.getTextWidth(footerPhoneStr);
                const footerLogoSize = 5.2; // mm
                const footerWaLogoX = 196 - footerPhoneWidth - footerLogoSize - 1.2;

                const footerWaLogoToDraw = (appState && appState.customWALogo) || (typeof USER_WA_WHITE_B64 !== 'undefined' ? USER_WA_WHITE_B64 : waLogoToDraw);

                if (footerWaLogoToDraw) {
                    doc.addImage(footerWaLogoToDraw, 'PNG', footerWaLogoX, 287.5, footerLogoSize, footerLogoSize);
                }

                doc.text(footerPhoneStr, 196, 290.5, { align: 'right' });

                const fileName = `${pName.replace(/\s+/g, '_')}_BMLT_Exact_Lab_Report.pdf`;
                if (mode === 'preview') {
                    const blobUrl = doc.output('bloburl');
                    window.open(blobUrl, '_blank');
                } else if (mode === 'print') {
                    const blobUrl = doc.output('bloburl');
                    const printWin = window.open(blobUrl, '_blank');
                    if (printWin) { printWin.addEventListener('load', () => { printWin.print(); }); }
                } else {
                    doc.save(fileName);
                }
            } catch (err) {
                console.error(err);
                showToast('Failed to generate 1:1 PDF: ' + err.message, 'error');
            }
        }

        // Test Master Database Modal & Management
        function openNewTestModal() {
            const title = prompt('Enter Test Title (e.g. URINE ROUTINE & MICROSCOPY):');
            if (!title) return;
            const category = prompt('Enter Category (Hematology, Serology, Biochemistry, Endocrinology, Clinical Pathology, Coagulation, etc.):', 'Biochemistry') || 'Biochemistry';
            const sampleType = prompt('Enter Primary Sample Type (e.g. Serum 2 ml):', 'Serum (2 ml)') || 'Serum (2 ml)';
            const tat = prompt('Enter TAT (Turnaround time):', '2 hrs') || '2 hrs';

            const newTest = {
                id: 'TDB-' + Date.now(),
                title,
                category,
                sampleType,
                tat,
                params: [
                    { inv: 'Parameter 1', sub: '', res: 'Normal', flag: 'Normal', ref: '0 - 100', unit: 'unit' }
                ],
                genderRanges: []
            };

            appState.testDB.push(newTest);
            saveState();
            renderTestDBPresets();
            renderTestDBTable();
            showToast(`Added test "${title}" to Master Test Database!`);
        }

        function deleteTestFromDB(id) {
            if (confirm('Delete this test template from your database?')) {
                appState.testDB = appState.testDB.filter(t => t.id !== id);
                saveState();
                renderTestDBPresets();
                renderTestDBTable();
                showToast('Test template removed from database.');
            }
        }

        function renderTestDBTable() {
            const tbody = document.getElementById('test-db-table-body');
            if (!tbody) return;
            tbody.innerHTML = '';
            appState.testDB.forEach(test => {
                const tr = document.createElement('tr');
                tr.className = 'border-b border-slate-800/80 hover:bg-slate-950/40 transition';
                tr.innerHTML = `
                    <td class="p-3 font-bold text-cyan-400 text-xs">${test.title} <span class="text-[10px] bg-cyan-500/10 text-cyan-300 px-1.5 py-0.5 rounded ml-1 font-mono">${test.category || 'General'}</span></td>
                    <td class="p-3 text-xs text-slate-300">${test.sampleType}</td>
                    <td class="p-3 text-xs text-slate-400">${test.tat || 'N/A'}</td>
                    <td class="p-3 text-xs text-slate-300 font-mono">${test.params ? test.params.length : 0} Items</td>
                    <td class="p-3 text-right flex justify-end gap-2">
                        <button onclick="loadTestFromDB('${test.id}'); switchAdminTab('report');" class="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-cyan-500 hover:text-slate-950 transition">
                            Use in Report
                        </button>
                        <button onclick="deleteTestFromDB('${test.id}')" class="bg-red-500/10 text-red-400 border border-red-500/30 px-2 py-1 rounded-lg text-xs hover:bg-red-500 hover:text-white transition">
                            ✕
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }

        // Ledger & Directory Rendering
        function renderAdminLedger() {
            const tbody = document.getElementById('admin-reports-ledger');
            if (!tbody) return;
            tbody.innerHTML = '';
            if (appState.reports.length === 0) {
                tbody.innerHTML = `<tr><td colspan="6" class="p-6 text-center text-slate-500">No diagnostic reports generated yet. <button onclick="restoreDefaultData()" class="text-cyan-400 font-bold underline ml-2">Restore Sample Reports</button></td></tr>`;
                return;
            }
            // Group reports by patient PID
            const byPid = {};
            appState.reports.forEach(rep => {
                if (!byPid[rep.pid]) byPid[rep.pid] = [];
                byPid[rep.pid].push(rep);
            });

            appState.reports.forEach(rep => {
                const patientReportCount = byPid[rep.pid] ? byPid[rep.pid].length : 1;
                const allTestsBtn = patientReportCount > 1
                    ? '<button onclick="downloadAllPatientReports(\'' + rep.pid + '\')" title="All ' + patientReportCount + ' tests for this patient in preview" class="bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500 hover:text-slate-950 px-2.5 py-1 rounded-lg text-xs font-bold transition" style="white-space:nowrap">\ud83d\udccb All ' + patientReportCount + ' Tests</button>'
                    : '';
                const tr = document.createElement('tr');
                tr.className = 'border-b border-slate-800/80 hover:bg-slate-800/30 transition';
                tr.innerHTML = `
                    <td class="p-2.5 font-mono text-xs text-slate-400">${rep.id}</td>
                    <td class="p-2.5 font-bold text-cyan-400 font-mono text-xs">${rep.pid}</td>
                    <td class="p-2.5 text-white font-medium text-xs">${rep.patientName}</td>
                    <td class="p-2.5 text-cyan-300 font-semibold text-xs">${rep.testTitle || 'Test'}</td>
                    <td class="p-2.5 text-xs text-slate-400">${rep.date}</td>
                    <td class="p-2.5">
                        <div class="flex flex-wrap justify-end gap-1.5">
                            <button onclick="previewOrPrintReport('${rep.id}', 'preview')" title="Print Preview" class="bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500 hover:text-white px-2.5 py-1 rounded-lg text-xs font-semibold transition" style="white-space:nowrap">🔍 Preview</button>
                            <button onclick="previewOrPrintReport('${rep.id}', 'print')" title="Direct Print" class="bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500 hover:text-white px-2.5 py-1 rounded-lg text-xs font-semibold transition" style="white-space:nowrap">🖨️ Print</button>
                            <button onclick="downloadExistingReport('${rep.id}')" class="btn-3d-active px-2.5 py-1 rounded-lg text-xs font-bold transition shadow-sm" style="white-space:nowrap">📥 PDF</button>
                            ${allTestsBtn}
                            <button onclick="deleteReport('${rep.id}')" class="bg-red-500/10 text-red-400 border border-red-500/30 px-2 py-1 rounded-lg text-xs hover:bg-red-500 hover:text-white transition">✕</button>
                        </div>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }


        function deleteReport(reportId) {
            if (confirm('Are you sure you want to delete this report record?')) {
                appState.reports = appState.reports.filter(r => r.id !== reportId);
                saveState();
                renderAdminLedger();
                showToast('Report record deleted.');
            }
        }

        function renderPatientsDirectory() {
            const tbody = document.getElementById('admin-patients-directory');
            if (!tbody) return;
            tbody.innerHTML = '';
            if (appState.patients.length === 0) {
                tbody.innerHTML = `<tr><td colspan="6" class="p-6 text-center text-slate-500">No patients registered.</td></tr>`;
                return;
            }
            appState.patients.forEach(p => {
                const tr = document.createElement('tr');
                tr.className = 'border-b border-slate-800/80 hover:bg-slate-950/40 transition';
                tr.innerHTML = `
                    <td class="p-3 font-bold text-cyan-400 font-mono text-xs">${p.pid}</td>
                    <td class="p-3 text-white font-medium text-xs">${p.name}</td>
                    <td class="p-3 text-xs text-slate-300">${p.age} Y / ${p.sex}</td>
                    <td class="p-3 text-xs text-slate-400">${p.mobile || p.email || 'N/A'}</td>
                    <td class="p-3 font-mono text-xs text-amber-400 font-bold">${p.password}</td>
                    <td class="p-3 text-right flex justify-end gap-2">
                        <button onclick="quickCreateReportFor('${p.pid}')" class="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded-lg text-xs font-semibold hover:bg-cyan-500 hover:text-slate-950 transition">
                            Create Report
                        </button>
                        <button onclick="deletePatient('${p.pid}')" class="bg-red-500/10 text-red-400 border border-red-500/30 px-2 py-1 rounded-lg text-xs hover:bg-red-500 hover:text-white transition">
                            ✕
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }

        function quickCreateReportFor(pid) {
            switchAdminTab('report');
            const select = document.getElementById('rep-patient-select');
            if (select) {
                select.value = pid;
                autofillPatientData();
            }
        }

        function deletePatient(pid) {
            if (confirm(`Delete patient UHID ${pid} and all associated data?`)) {
                appState.patients = appState.patients.filter(p => p.pid !== pid);
                appState.reports = appState.reports.filter(r => r.pid !== pid);
                saveState();
                populatePatientDropdown();
                renderPatientsDirectory();
                renderAdminLedger();
                showToast('Patient deleted.');
            }
        }

        function downloadExistingReport(reportId) {
            const rep = appState.reports.find(r => r.id === reportId);
            if (!rep) return;
            const patient = appState.patients.find(p => p.pid === rep.pid) || { name: rep.patientName || 'Patient', age: '20', sex: 'Male', pid: rep.pid };
            generateMasterPathLabPDFReport(patient, rep, 'download');
        }

        function previewOrPrintReport(reportId, mode) {
            const rep = appState.reports.find(r => r.id === reportId);
            if (!rep) return;
            const patient = appState.patients.find(p => p.pid === rep.pid) || { name: rep.patientName || 'Patient', age: '20', sex: 'Male', pid: rep.pid };
            generateMasterPathLabPDFReport(patient, rep, mode);
        }

        function downloadAllPatientReports(pid) {
            const patientReports = appState.reports.filter(r => r.pid === pid);
            if (!patientReports.length) return;
            const patient = appState.patients.find(p => p.pid === pid) || { name: patientReports[0].patientName || 'Patient', age: '20', sex: 'Male', pid };
            const jsPDFClass = (window.jspdf && window.jspdf.jsPDF) || window.jsPDF;
            if (!jsPDFClass) { showToast('PDF Library loading... Please try again.', 'error'); return; }

            // Collect blob URLs for each report PDF
            const blobUrls = [];
            try {
                patientReports.forEach(rep => {
                    // Temporarily intercept to get blob URL
                    const origProto = jsPDFClass.prototype;
                    const origSave = origProto.save;
                    let capturedBlob = null;
                    origProto.save = function() { capturedBlob = this.output('bloburl'); };
                    generateMasterPathLabPDFReport(patient, rep);
                    origProto.save = origSave;
                    if (capturedBlob) blobUrls.push({ url: capturedBlob, title: rep.testTitle || 'Report' });
                });
            } catch(e) { console.error(e); showToast('Error generating combined PDF.', 'error'); return; }

            if (!blobUrls.length) { showToast('Could not generate reports.', 'error'); return; }

            // Build combined preview HTML window
            const pName = patient.name;
            const iframeBlocks = blobUrls.map((b, i) => `
                <div style="margin-bottom:24px;">
                    <div style="background:#1e3a5f;color:#7dd3fc;padding:8px 16px;font-family:Inter,sans-serif;font-size:13px;font-weight:700;border-radius:8px 8px 0 0;">
                        Test ${i + 1} of ${blobUrls.length}: ${b.title}
                    </div>
                    <iframe src="${b.url}" style="width:100%;height:900px;border:none;display:block;border-radius:0 0 8px 8px;" title="${b.title}"></iframe>
                </div>
            `).join('');

            const previewHtml = `<!DOCTYPE html>
<html><head>
<meta charset="UTF-8">
<title>All Reports - ${pName}</title>
<style>
    body { background:#030712; margin:0; padding:0; font-family:Inter,sans-serif; }
    .topbar { background:#0f172a; border-bottom:1px solid #1e3a5f; padding:14px 24px; display:flex; justify-content:space-between; align-items:center; position:sticky; top:0; z-index:99; }
    .topbar h1 { color:#7dd3fc; font-size:15px; font-weight:800; margin:0; }
    .topbar span { color:#94a3b8; font-size:12px; }
    .btn-print { background:linear-gradient(135deg,#06b6d4,#3b82f6); color:#fff; border:none; padding:10px 22px; border-radius:10px; font-size:13px; font-weight:700; cursor:pointer; }
    .content { padding:24px; max-width:900px; margin:0 auto; }
    @media print { .topbar { display:none; } .content { padding:0; max-width:100%; } }
</style>
</head><body>
<div class="topbar">
    <div>
        <h1>🧪 Master Path Lab — All Reports: ${pName}</h1>
        <span>${blobUrls.length} Tests | PID: ${pid}</span>
    </div>
    <button class="btn-print" onclick="window.print()">🖨️ Print All Reports</button>
</div>
<div class="content">
    ${iframeBlocks}
</div>
</body></html>`;

            const blob = new Blob([previewHtml], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
            showToast(`${blobUrls.length} reports opened in combined preview for ${pName}.`, 'success');
        }

        function renderPatientReports() {
            const list = document.getElementById('patient-reports-list');
            if (!list) return;
            list.innerHTML = '';
            const myReports = appState.reports.filter(r => r.pid === (appState.currentUser ? appState.currentUser.pid : ''));
            const counter = document.getElementById('patient-record-count');
            if (counter) counter.innerText = `${myReports.length} Reports Found`;

            if (myReports.length === 0) {
                list.innerHTML = `
                    <div class="text-center py-8 text-slate-500">
                        <p class="text-2xl mb-2">📂</p>
                        <p class="text-sm font-semibold">No lab reports issued yet.</p>
                        <p class="text-xs">Reports created by the lab will automatically show up here.</p>
                    </div>
                `;
                return;
            }

            myReports.forEach(rep => {
                const card = document.createElement('div');
                card.className = 'bg-slate-950 border border-slate-800 p-4 rounded-xl flex justify-between items-center hover:border-cyan-500/40 transition shadow-lg';
                card.innerHTML = `
                    <div>
                        <div class="flex items-center gap-2 mb-1">
                            <span class="font-bold text-white text-sm">${rep.testTitle || 'Diagnostic Report'}</span>
                            <span class="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-semibold">VERIFIED REPORT</span>
                        </div>
                        <p class="text-xs text-slate-400">Report Date: <span class="text-slate-200 font-mono">${rep.date}</span> | Ref: ${rep.doctor}</p>
                    </div>
                    <button onclick="downloadExistingReport('${rep.id}')" class="btn-3d-active font-black px-4 py-2 rounded-xl text-xs transition shadow-lg">
                        📥 Download 1:1 BMLT PDF
                    </button>
                `;
                list.appendChild(card);
            });
        }
    
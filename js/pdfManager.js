window.jsPDF = window.jspdf.jsPDF;

// Load Vietnamese font
async function loadVietnameseFont() {
    const fontResponse = await fetch('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
    const fontCSS = await fontResponse.text();
    const fontUrl = fontCSS.match(/url\((.*?)\)/)[1];
    const font = await fetch(fontUrl);
    const fontData = await font.arrayBuffer();
    return fontData;
}

// async function generatePDF() {
//     try {
//         // Show loading overlay
//         const loadingOverlay = document.getElementById('loadingOverlay');
//         loadingOverlay.style.display = 'flex';

//         // Get container and clone content
//         const container = document.querySelector('.container');
//         const contentClone = container.cloneNode(true);

//         // Remove action buttons
//         contentClone.querySelectorAll('.actions, .nav-back').forEach(el => el.remove());

//         // --- Lấy nhận xét ---
//         const textarea = document.querySelector('.evaluation-content textarea');
//         const nhanXet = textarea ? textarea.value : '';

//         // Ẩn box nhận xét trong clone để không bị html2canvas chụp lại
//         const evalBox = contentClone.querySelector('.evaluation-box');
//         if (evalBox) evalBox.style.display = 'none';

//         // Create temporary container
//         const tempDiv = document.createElement('div');
//         tempDiv.appendChild(contentClone);
//         document.body.appendChild(tempDiv);

//         // Generate canvas for main content
//         const canvas = await html2canvas(contentClone, {
//             scale: 2,
//             useCORS: true,
//             allowTaint: true,
//             backgroundColor: '#ffffff',
//             height: contentClone.scrollHeight,
//             windowHeight: contentClone.scrollHeight
//         });

//         // Remove temporary container
//         document.body.removeChild(tempDiv);

//         // Create evaluation text canvas
//         const evalDiv = document.createElement('div');
//         evalDiv.style.width = '535px'; // pdfWidth - 2*margin
//         evalDiv.style.padding = '20px';
//         evalDiv.style.fontFamily = 'Arial, sans-serif';
//         evalDiv.style.fontSize = '9px';
//         evalDiv.style.lineHeight = '1.3';
//         evalDiv.style.color = '#333333';
//         evalDiv.style.backgroundColor = '#ffffff';
//         document.body.appendChild(evalDiv);

//         // Generate canvas for evaluation
//         const evalCanvas = await html2canvas(evalDiv, {
//             scale: 2,
//             useCORS: true,
//             allowTaint: true,
//             backgroundColor: '#ffffff'
//         });

//         // Remove evaluation div
//         document.body.removeChild(evalDiv);

//         // Create PDF with content dimensions
//         const pdfWidth = 595; // Standard PDF width
//         const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//         const pdf = new jsPDF({
//             orientation: 'portrait',
//             unit: 'px',
//             format: [pdfWidth, pdfHeight + evalCanvas.height + 40], // Add space for evaluation
//             putOnlyUsedFonts: true,
//             compress: true
//         });

//         // Add main content image to PDF
//         pdf.addImage(
//             canvas.toDataURL('image/jpeg', 1.0),
//             'JPEG',
//             0,
//             0,
//             pdfWidth,
//             pdfHeight,
//             undefined,
//             'FAST'
//         );

//         // Add evaluation image to PDF
//         pdf.addImage(
//             evalCanvas.toDataURL('image/jpeg', 1.0),
//             'JPEG',
//             30, // margin
//             pdfHeight + 20,
//             pdfWidth - 60, // width minus margins
//             evalCanvas.height * (pdfWidth - 60) / evalCanvas.width,
//             undefined,
//             'FAST'
//         );

//         // Save PDF with Vietnamese filename
//         const filename = `phieu_danh_gia_${new Date().toLocaleDateString('vi-VN').replace(/\//g, '-')}.pdf`;
//         pdf.save(filename);

//     } catch (error) {
//         console.error('PDF Generation Error:', error);
//         alert('Có lỗi khi tạo PDF. Vui lòng thử lại!');
//     } finally {
//         loadingOverlay.style.display = 'none';
//     }
// }

// // Event listeners
// document.addEventListener('DOMContentLoaded', () => {
//     document.querySelectorAll('#exportPdfBtn, #exportPdfBtn4').forEach(btn => {
//         if (btn) btn.addEventListener('click', generatePDF);
//     });
// });

// ... (Hàm loadVietnameseFont của bạn giữ nguyên) ...

// async function generatePDF() {
//     try {
//         const loadingOverlay = document.getElementById('loadingOverlay');
//         loadingOverlay.style.display = 'flex';

//         // ... (Phần clone content, remove buttons, lấy nhanXet... giữ nguyên) ...
//         const container = document.querySelector('.container');
//         const contentClone = container.cloneNode(true);
//         contentClone.querySelectorAll('.actions, .nav-back').forEach(el => el.remove());
//         const textarea = document.querySelector('.evaluation-content textarea');
//         const nhanXet = textarea ? textarea.value : '';
//         const evalBox = contentClone.querySelector('.evaluation-box');
//         if (evalBox) evalBox.style.display = 'none';

//         // ... (Phần tempDiv của bạn giữ nguyên) ...
//         const tempDiv = document.createElement('div');
//         tempDiv.appendChild(contentClone);
//         document.body.appendChild(tempDiv);

//         // Generate canvas for main content (Giữ nguyên)
//         const canvas = await html2canvas(contentClone, {
//             scale: 2,
//             useCORS: true,
//             allowTaint: true,
//             backgroundColor: '#ffffff',
//             height: contentClone.scrollHeight,
//             windowHeight: contentClone.scrollHeight,
//             // Sửa lỗi IFRAME (nếu có)
//             ignoreElements: (element) => element.tagName === 'IFRAME'
//         });

//         // Remove temporary container (Giữ nguyên)
//         document.body.removeChild(tempDiv);

//         // --- TẠO CANVAS CHO PHẦN NHẬN XÉT ---
//         // (Giữ nguyên style của bạn)
//         const evalDiv = document.createElement('div');
//         evalDiv.style.width = '535px';
//         evalDiv.style.padding = '20px';
//         evalDiv.style.fontFamily = 'Arial, sans-serif';
//         evalDiv.style.fontSize = '9px';
//         evalDiv.style.lineHeight = '1.3';
//         evalDiv.style.color = '#333333';
//         evalDiv.style.backgroundColor = '#ffffff';

//         // --- SỬA LỖI: Thêm text vào div trước khi chụp ---
//         evalDiv.style.whiteSpace = 'pre-wrap'; // Để giữ các dấu xuống dòng
//         evalDiv.innerText = nhanXet; // Thêm nội dung nhận xét vào
//         // --- KẾT THÚC SỬA LỖI ---

//         document.body.appendChild(evalDiv);
//         const evalCanvas = await html2canvas(evalDiv, { scale: 2 /* ... */ });
//         document.body.removeChild(evalDiv);


//         // =========== BẮT ĐẦU PHẦN CHIA TRANG PDF (ĐÃ SỬA) ===========

//         // 1. Tạo PDF với khổ A4 chuẩn, đơn vị 'px'
//         const pdf = new jsPDF({
//             orientation: 'portrait',
//             unit: 'px',
//             format: 'a4', // Dùng khổ A4
//             putOnlyUsedFonts: true,
//             compress: true
//         });

//         // 2. Lấy kích thước trang A4 (tính bằng 'px') và đặt lề
//         const pdfPageWidth = pdf.internal.pageSize.getWidth();
//         const pdfPageHeight = pdf.internal.pageSize.getHeight();
//         const margin = 30; // 30px lề
//         const contentWidth = pdfPageWidth - (margin * 2);
//         const pageContentHeight = pdfPageHeight - (margin * 2);

//         // 3. Lấy kích thước ảnh canvas gốc
//         const imgWidth = canvas.width;
//         const imgHeight = canvas.height;

//         // 4. Tính chiều cao của 1 "lát cắt" trên canvas gốc
//         // (Đây là chiều cao của ảnh gốc tương ứng với 1 trang A4)
//         const sourceSliceHeight = pageContentHeight * (imgWidth / contentWidth);

//         let yOffset = 0; // Vị trí "cắt" hiện tại trên canvas gốc
//         let destHeight = 0; // Chiều cao của lát cắt cuối cùng (để biết chỗ thêm nhận xét)

//         // 5. Dùng vòng lặp 'while' để cắt ảnh
//         while (yOffset < imgHeight) {
//             // Thêm trang mới (trừ trang đầu tiên)
//             if (yOffset > 0) {
//                 pdf.addPage();
//             }

//             // Tính chiều cao của lát cắt này
//             const currentSliceHeight = Math.min(sourceSliceHeight, imgHeight - yOffset);
            
//             // Tính chiều cao sẽ dán vào PDF (đã scale)
//             destHeight = currentSliceHeight * (contentWidth / imgWidth);

//             // --- Kỹ thuật cắt ảnh ---
//             // Chúng ta cần 1 canvas tạm để giữ lát cắt
//             const sliceCanvas = document.createElement('canvas');
//             sliceCanvas.width = imgWidth;
//             sliceCanvas.height = currentSliceHeight;
//             const sliceCtx = sliceCanvas.getContext('2d');

//             sliceCtx.drawImage(
//                 canvas,     // Ảnh gốc
//                 0, yOffset,  // Vị trí cắt (x, y)
//                 imgWidth, currentSliceHeight, // Kích thước cắt (w, h)
//                 0, 0,        // Vị trí dán (x, y)
//                 imgWidth, currentSliceHeight  // Kích thước dán (w, h)
//             );
//             // --- Hết kỹ thuật cắt ---

//             // Thêm "lát cắt" vào PDF
//             pdf.addImage(
//                 sliceCanvas.toDataURL('image/jpeg', 1.0),
//                 'JPEG',
//                 margin, // x
//                 margin, // y
//                 contentWidth, // w
//                 destHeight, // h
//                 undefined,
//                 'FAST'
//             );
            
//             yOffset += currentSliceHeight;
//         }

//         // 6. Thêm phần nhận xét (evalCanvas)
//         const evalContentWidth = contentWidth;
//         const evalContentHeight = (evalCanvas.height * evalContentWidth) / evalCanvas.width;
        
//         // Tính vị trí Y hiện tại trên trang PDF cuối cùng
//         let currentY = margin + destHeight; // Vị trí cuối của ảnh

//         if (currentY + evalContentHeight + 20 > pdfPageHeight) {
//             // Nếu không đủ chỗ, thêm trang mới
//             pdf.addPage();
//             currentY = margin; // Reset, bắt đầu từ lề trên
//         } else {
//             // Nếu đủ chỗ, thêm một khoảng đệm
//             currentY += 20; 
//         }

//         // Thêm ảnh nhận xét vào
//         pdf.addImage(
//             evalCanvas.toDataURL('image/jpeg', 1.0),
//             'JPEG',
//             margin, 
//             currentY, // Vị trí Y đã tính toán
//             evalContentWidth,
//             evalContentHeight,
//             undefined,
//             'FAST'
//         );
        
//         // =========== KẾT THÚC PHẦN CHIA TRANG ===========

//         // 7. Lưu PDF
//         const filename = `phieu_danh_gia_${new Date().toLocaleDateString('vi-VN').replace(/\//g, '-')}.pdf`;
//         pdf.save(filename);

//     } catch (error) {
//         console.error('PDF Generation Error:', error);
//         alert('Có lỗi khi tạo PDF. Vui lòng thử lại!');
//     } finally {
//         loadingOverlay.style.display = 'none';
//     }
// }

// // ... (Event listeners của bạn giữ nguyên) ...
// document.addEventListener('DOMContentLoaded', () => {
//     document.querySelectorAll('#exportPdfBtn, #exportPdfBtn4').forEach(btn => {
//         if (btn) btn.addEventListener('click', generatePDF);
//     });
// });

async function generatePDF() {
    try {
        const loadingOverlay = document.getElementById('loadingOverlay');
        loadingOverlay.style.display = 'flex';

        const container = document.querySelector('.container');
        
        // --- Lấy nhận xét (giữ nguyên) ---
        const textarea = document.querySelector('.evaluation-content textarea');
        const nhanXet = textarea ? textarea.value : '';

        // --- 1. Tạo PDF khổ A4 ---
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: 'a4',
            putOnlyUsedFonts: true,
            compress: true
        });

        // 2. Lấy kích thước trang và đặt lề
        const pdfPageWidth = pdf.internal.pageSize.getWidth();
        const pdfPageHeight = pdf.internal.pageSize.getHeight();
        const margin = 30; // 30px lề
        const contentWidth = pdfPageWidth - (margin * 2);
        const pageContentHeight = pdfPageHeight - (margin * 2);
        let currentY = margin; // Con trỏ vị trí Y trên PDF

        // --- 3. Lấy tất cả các khối nội dung cần render ---
        // Chúng ta giả định mỗi khối không thể vỡ là .section h2, .section .rating-header
        // và các phần tử khác như .header-info, .student-info v.v.
        const elementsToRender = container.querySelectorAll(
            '.header, .section > h2, .section > .form-row, .section > .rating-header, .section > .teacher-comment'
        );

        // --- 4. Lặp qua từng khối, chụp và thêm vào PDF ---
        for (const element of elementsToRender) {
            // Chụp ảnh chỉ 1 khối này
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                ignoreElements: (el) => el.tagName === 'IFRAME'
            });

            // Tính chiều cao của ảnh khi dán vào PDF
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const pdfImgHeight = imgHeight * (contentWidth / imgWidth);
            const paddingBetweenElements = 10; // 10px đệm giữa các khối

            // KIỂM TRA CHIA TRANG:
            // Nếu dán ảnh này vào sẽ bị tràn qua lề dưới?
            if (currentY + pdfImgHeight + paddingBetweenElements > pdfPageHeight - margin) {
                pdf.addPage(); // Thêm trang mới
                currentY = margin; // Reset con trỏ về lề trên
            }

            // Dán ảnh vào PDF
            pdf.addImage(
                canvas.toDataURL('image/jpeg', 1.0),
                'JPEG',
                margin, 
                currentY,
                contentWidth,
                pdfImgHeight,
                undefined,
                'FAST'
            );

            // Cập nhật con trỏ Y
            currentY += pdfImgHeight + paddingBetweenElements;
        }

        // --- 5. Thêm phần nhận xét (evalCanvas) ---
        // (Logic này giữ nguyên, vì nó là khối cuối cùng)
        const evalDiv = document.createElement('div');
        evalDiv.style.width = (contentWidth) + 'px'; // Dùng contentWidth của PDF
        evalDiv.style.padding = '20px';
        evalDiv.style.fontFamily = 'Arial, sans-serif';
        evalDiv.style.fontSize = '9px';
        evalDiv.style.lineHeight = '1.3';
        evalDiv.style.color = '#333333';
        evalDiv.style.backgroundColor = '#ffffff';
        evalDiv.style.whiteSpace = 'pre-wrap';
        evalDiv.innerText = nhanXet;
        document.body.appendChild(evalDiv);

        const evalCanvas = await html2canvas(evalDiv, { scale: 2 });
        document.body.removeChild(evalDiv);

        const evalContentHeight = (evalCanvas.height * contentWidth) / evalCanvas.width;

        if (currentY + evalContentHeight + 20 > pdfPageHeight - margin) {
            pdf.addPage();
            currentY = margin;
        } else {
            currentY += 20; 
        }

        pdf.addImage(
            evalCanvas.toDataURL('image/jpeg', 1.0),
            'JPEG',
            margin, 
            currentY,
            contentWidth,
            evalContentHeight,
            undefined,
            'FAST'
        );
        
        // --- 6. Lưu PDF ---
        const filename = `phieu_danh_gia_${new Date().toLocaleDateString('vi-VN').replace(/\//g, '-')}.pdf`;
        pdf.save(filename);

    } catch (error) {
        console.error('PDF Generation Error:', error);
        alert('Có lỗi khi tạo PDF. Vui lòng thử lại!');
    } finally {
        loadingOverlay.style.display = 'none';
    }
}

// ... (Event listeners của bạn giữ nguyên) ...
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#exportPdfBtn, #exportPdfBtn4').forEach(btn => {
        if (btn) btn.addEventListener('click', generatePDF);
    });
});
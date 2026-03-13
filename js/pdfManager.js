window.jsPDF = window.jspdf.jsPDF;

async function loadVietnameseFont() {
    const fontResponse = await fetch('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
    const fontCSS = await fontResponse.text();
    const fontUrl = fontCSS.match(/url\((.*?)\)/)[1];
    const font = await fetch(fontUrl);
    const fontData = await font.arrayBuffer();
    return fontData;
}

async function generatePDF() {
    try {
        const loadingOverlay = document.getElementById('loadingOverlay');
        loadingOverlay.style.display = 'flex';

        const container = document.querySelector('.container');
        
        // --- Lấy nhận xét ---
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

            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const pdfImgHeight = imgHeight * (contentWidth / imgWidth);
            const paddingBetweenElements = 10; // 10px đệm giữa các khối

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

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#exportPdfBtn, #exportPdfBtn4').forEach(btn => {
        if (btn) btn.addEventListener('click', generatePDF);
    });
});
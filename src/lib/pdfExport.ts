import jsPDF from 'jspdf';

interface PDFExportOptions {
  title: string;
  content: string;
  dealTitle?: string;
  dealType?: string;
  version?: number;
  signatures?: Array<{
    signer_name: string;
    signer_title: string;
    is_buyer: boolean;
    signed_at: string;
  }>;
}

export function exportContractToPDF({
  title,
  content,
  dealTitle,
  dealType,
  version,
  signatures = [],
}: PDFExportOptions) {
  const doc = new jsPDF();

  // Page dimensions
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - (margin * 2);

  let yPosition = margin;

  // Letterhead background
  doc.setFillColor(26, 26, 24); // Ink color
  doc.rect(0, 0, pageWidth, 35, 'F');

  // Gold accent stripe
  doc.setFillColor(212, 160, 23);
  doc.rect(margin, 10, 2, 15, 'F');

  // Company name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('RADIC TECHNOLOGIES', margin + 8, 18);

  // Document type
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(138, 136, 128); // Muted color
  doc.text(dealType || 'Sale & Purchase Agreement', margin + 8, 25);

  // Reset text color
  doc.setTextColor(26, 26, 24);
  yPosition = 50;

  // Document title
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  const titleLines = doc.splitTextToSize(title, maxWidth);
  doc.text(titleLines, margin, yPosition);
  yPosition += (titleLines.length * 8) + 5;

  // Version and deal info
  if (dealTitle || version) {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(107, 107, 99);

    let infoText = '';
    if (dealTitle) infoText += `Deal: ${dealTitle}`;
    if (version) infoText += ` • Version ${version}`;

    doc.text(infoText, margin, yPosition);
    yPosition += 15;
  }

  // Contract content
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(26, 26, 24);

  const contentLines = doc.splitTextToSize(content, maxWidth);

  for (let i = 0; i < contentLines.length; i++) {
    if (yPosition > pageHeight - 40) {
      doc.addPage();
      yPosition = margin;
    }
    doc.text(contentLines[i], margin, yPosition);
    yPosition += 6;
  }

  // Signatures section
  if (signatures.length > 0) {
    // Add new page for signatures if needed
    if (yPosition > pageHeight - 80) {
      doc.addPage();
      yPosition = margin;
    } else {
      yPosition += 20;
    }

    // Signature separator
    doc.setDrawColor(232, 230, 224);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 15;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('SIGNATURES', margin, yPosition);
    yPosition += 10;

    const buyerSigs = signatures.filter(s => s.is_buyer);
    const sellerSigs = signatures.filter(s => !s.is_buyer);

    const colWidth = maxWidth / 2 - 5;

    // Buyer signatures (left column)
    let leftY = yPosition;
    if (buyerSigs.length > 0) {
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(138, 136, 128);
      doc.text('FOR THE BUYER', margin, leftY);
      leftY += 8;

      buyerSigs.forEach(sig => {
        doc.setDrawColor(26, 26, 24);
        doc.line(margin, leftY, margin + colWidth, leftY);
        leftY += 5;

        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(26, 26, 24);
        doc.text(sig.signer_name, margin, leftY);
        leftY += 5;

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(107, 107, 99);
        doc.text(sig.signer_title, margin, leftY);
        leftY += 4;

        doc.setFontSize(8);
        doc.text(`Signed: ${new Date(sig.signed_at).toLocaleDateString()}`, margin, leftY);
        leftY += 15;
      });
    }

    // Seller signatures (right column)
    let rightY = yPosition;
    if (sellerSigs.length > 0) {
      const rightMargin = margin + colWidth + 10;

      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(138, 136, 128);
      doc.text('FOR THE SELLER', rightMargin, rightY);
      rightY += 8;

      sellerSigs.forEach(sig => {
        doc.setDrawColor(26, 26, 24);
        doc.line(rightMargin, rightY, rightMargin + colWidth, rightY);
        rightY += 5;

        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(26, 26, 24);
        doc.text(sig.signer_name, rightMargin, rightY);
        rightY += 5;

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(107, 107, 99);
        doc.text(sig.signer_title, rightMargin, rightY);
        rightY += 4;

        doc.setFontSize(8);
        doc.text(`Signed: ${new Date(sig.signed_at).toLocaleDateString()}`, rightMargin, rightY);
        rightY += 15;
      });
    }
  }

  // Footer on all pages
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(138, 136, 128);
    doc.text(
      `Generated by Closeware • Page ${i} of ${pageCount}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  }

  // Save the PDF
  const filename = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
  doc.save(filename);
}

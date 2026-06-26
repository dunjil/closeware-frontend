import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, Table, TableRow, TableCell, WidthType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';

interface DOCXExportOptions {
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

export async function exportContractToDOCX({
  title,
  content,
  dealTitle,
  dealType,
  version,
  signatures = [],
}: DOCXExportOptions) {
  // Split content into paragraphs
  const contentParagraphs = content.split('\n').filter(line => line.trim());

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Letterhead section
          new Paragraph({
            children: [
              new TextRun({
                text: 'RADIC TECHNOLOGIES',
                bold: true,
                size: 28,
                color: '1A1A18',
              }),
            ],
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: dealType || 'Sale & Purchase Agreement',
                size: 18,
                color: '8A8880',
              }),
            ],
            spacing: { after: 400 },
          }),

          // Document title
          new Paragraph({
            text: title,
            heading: HeadingLevel.HEADING_1,
            spacing: { after: 200 },
          }),

          // Deal info
          ...(dealTitle || version
            ? [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `${dealTitle ? `Deal: ${dealTitle}` : ''}${version ? ` • Version ${version}` : ''}`,
                      size: 18,
                      color: '6B6B63',
                    }),
                  ],
                  spacing: { after: 400 },
                }),
              ]
            : []),

          // Contract content paragraphs
          ...contentParagraphs.map(
            (para) =>
              new Paragraph({
                children: [
                  new TextRun({
                    text: para,
                    size: 22,
                  }),
                ],
                spacing: { after: 120 },
              })
          ),

          // Signatures section
          ...(signatures.length > 0
            ? [
                new Paragraph({
                  text: '',
                  spacing: { before: 400 },
                  border: {
                    top: {
                      color: 'E8E6E0',
                      space: 1,
                      style: BorderStyle.SINGLE,
                      size: 6,
                    },
                  },
                }),
                new Paragraph({
                  text: 'SIGNATURES',
                  heading: HeadingLevel.HEADING_2,
                  spacing: { before: 300, after: 200 },
                }),

                // Create signature table
                new Table({
                  width: {
                    size: 100,
                    type: WidthType.PERCENTAGE,
                  },
                  rows: [
                    // Header row
                    new TableRow({
                      children: [
                        new TableCell({
                          children: [
                            new Paragraph({
                              children: [
                                new TextRun({
                                  text: 'FOR THE BUYER',
                                  bold: true,
                                  size: 18,
                                  color: '8A8880',
                                }),
                              ],
                            }),
                          ],
                          width: { size: 50, type: WidthType.PERCENTAGE },
                        }),
                        new TableCell({
                          children: [
                            new Paragraph({
                              children: [
                                new TextRun({
                                  text: 'FOR THE SELLER',
                                  bold: true,
                                  size: 18,
                                  color: '8A8880',
                                }),
                              ],
                            }),
                          ],
                          width: { size: 50, type: WidthType.PERCENTAGE },
                        }),
                      ],
                    }),

                    // Get max rows needed
                    ...(Array.from({
                      length: Math.max(
                        signatures.filter((s) => s.is_buyer).length,
                        signatures.filter((s) => !s.is_buyer).length
                      ),
                    }).map((_, i) => {
                      const buyerSig = signatures.filter((s) => s.is_buyer)[i];
                      const sellerSig = signatures.filter((s) => !s.is_buyer)[i];

                      return new TableRow({
                        children: [
                          new TableCell({
                            children: buyerSig
                              ? [
                                  new Paragraph({
                                    children: [
                                      new TextRun({
                                        text: '_____________________________',
                                        color: 'CCCCCC',
                                      }),
                                    ],
                                    spacing: { after: 100 },
                                  }),
                                  new Paragraph({
                                    children: [
                                      new TextRun({
                                        text: buyerSig.signer_name,
                                        bold: true,
                                      }),
                                    ],
                                    spacing: { after: 50 },
                                  }),
                                  new Paragraph({
                                    children: [
                                      new TextRun({
                                        text: buyerSig.signer_title,
                                        size: 18,
                                        color: '6B6B63',
                                      }),
                                    ],
                                    spacing: { after: 50 },
                                  }),
                                  new Paragraph({
                                    children: [
                                      new TextRun({
                                        text: `Signed: ${new Date(buyerSig.signed_at).toLocaleDateString()}`,
                                        size: 16,
                                        color: '8A8880',
                                      }),
                                    ],
                                  }),
                                ]
                              : [new Paragraph({ text: '' })],
                          }),
                          new TableCell({
                            children: sellerSig
                              ? [
                                  new Paragraph({
                                    children: [
                                      new TextRun({
                                        text: '_____________________________',
                                        color: 'CCCCCC',
                                      }),
                                    ],
                                    spacing: { after: 100 },
                                  }),
                                  new Paragraph({
                                    children: [
                                      new TextRun({
                                        text: sellerSig.signer_name,
                                        bold: true,
                                      }),
                                    ],
                                    spacing: { after: 50 },
                                  }),
                                  new Paragraph({
                                    children: [
                                      new TextRun({
                                        text: sellerSig.signer_title,
                                        size: 18,
                                        color: '6B6B63',
                                      }),
                                    ],
                                    spacing: { after: 50 },
                                  }),
                                  new Paragraph({
                                    children: [
                                      new TextRun({
                                        text: `Signed: ${new Date(sellerSig.signed_at).toLocaleDateString()}`,
                                        size: 16,
                                        color: '8A8880',
                                      }),
                                    ],
                                  }),
                                ]
                              : [new Paragraph({ text: '' })],
                          }),
                        ],
                      });
                    }) as TableRow[]),
                  ],
                }),
              ]
            : []),

          // Footer
          new Paragraph({
            children: [
              new TextRun({
                text: 'Generated by Closeware',
                size: 16,
                color: '8A8880',
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { before: 600 },
          }),
        ],
      },
    ],
  });

  // Generate and save the document
  const blob = await Packer.toBlob(doc);
  const filename = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.docx`;
  saveAs(blob, filename);
}

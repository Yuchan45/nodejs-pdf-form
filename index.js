import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

async function createPdf(input, output) {
    try {
        const pdfDoc = await PDFDocument.load(await readFile(input));
        const pdfBytes = await pdfDoc.save();
        await WritableStreamDefaultWriter(output, pdfBytes);
        console.log("PDF Created!");
    } catch (err) {
        console.log(err);
    }
}

createPdf("medical-claim-form.pdf", "output.pdf");
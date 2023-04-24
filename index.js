const { PDFDocument } = require('pdf-lib');
const { readFile, writeFile } = require('fs/promises');

async function createPdf(input, output) {
    try {
        const pdfDoc = await PDFDocument.load(await readFile(input), { ignoreEncryption: true });

        // Modify doc, fill out the form...
        pdfDoc.removePage(0); // Remuevo la 1er pagina. La segunda pagina se convierte en la 1er pagina.
        pdfDoc.removePage(1); // Remuevo la 2da pagina. La tercer pagina se convierte en la 2da pagina.
        pdfDoc.removePage(1); // Remuevo la 2da pagina. La cuarta pagina se convierte en la 2da pagina.
        pdfDoc.removePage(1); // Remuevo la 2da pagina. La quinta pagina se convierte en la 2da pagina.
        pdfDoc.removePage(1); // Remuevo la 2da pagina. La sexta pagina se convierte en la 2da pagina.
        // Quede con solo la 2da pagina original del pdf, osea el formulario.

        // const fields = pdfDoc.getForm().getFields();
        // console.log({ fields });

        const fieldNames = pdfDoc.getForm().getFields().map(file => file.getName());
        console.log({ fieldNames });

        // Get the form
        const form = pdfDoc.getForm();
        form.getTextField('Text2').setText('Yuchan');

        // Para saber que field pertence a cada campo
        const possibleFileds = Array.fomr({ length: 111 }, (_, i) => i);
        possibleFileds.forEach(possibleField => {
            try {
                form
                    .getTextField(`Text${possibleField}`)
                    .setText(possibleField.toString());
            } catch (e) {
                //
            }
        });


        const pdfBytes = await pdfDoc.save();
        await writeFile(output, pdfBytes);
        console.log("PDF Created!");
    } catch (err) {
        console.log(err);
    }
}

createPdf("medical-claim-form_unlocked.pdf", "output.pdf");
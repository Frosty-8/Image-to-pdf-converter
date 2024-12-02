// script.js
document.addEventListener("DOMContentLoaded", () => {
    const imageInput = document.getElementById("imageInput");
    const preview = document.getElementById("preview");
    const generatePdfButton = document.getElementById("generatePdfButton");
    let images = [];
  
    imageInput.addEventListener("change", (event) => {
      const files = Array.from(event.target.files);
      if (files.length + images.length > 500) {
        alert("You can upload a maximum of 500 images!");
        return;
      }
 
      files.forEach((file) => {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = document.createElement("img");
            img.src = e.target.result;
            preview.appendChild(img);
            images.push(e.target.result);
          };
          reader.readAsDataURL(file);
        }
      });
    });
  
    generatePdfButton.addEventListener("click", async () => {
      if (images.length === 0) {
        alert("Please upload images first.");
        return;
      }
  
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF();
  
      for (let i = 0; i < images.length; i++) {
        if (i > 0) pdf.addPage();
        const img = images[i];
        pdf.addImage(img, "JPEG", 10, 10, 180, 260);
      }
  
      pdf.save("images.pdf");
    });
  });
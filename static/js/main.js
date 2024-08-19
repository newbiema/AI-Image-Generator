document.getElementById('generate-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const prompt = document.getElementById('prompt').value;
    const resultDiv = document.getElementById('result');
    
    // Kosongkan hasil sebelumnya
    resultDiv.innerHTML = '';

    // Buat loader dan tampilkan
    const loader = document.createElement('div');
    loader.className = 'loader';
    resultDiv.appendChild(loader);

    try {
        const response = await fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });

        const data = await response.json();
        const imageUrl = data.image_url;

        // Hapus loader dan tampilkan gambar
        resultDiv.innerHTML = `<img src="${imageUrl}" alt="Generated Image">`;
    } catch (error) {
        console.error("Error dalam pengiriman:", error);
        resultDiv.innerHTML = "Gagal menghasilkan gambar.";
    }
});

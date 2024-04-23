
// Function to query the model API
async function queryModel(text) {
    const API_URL = "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5";
    const headers = { Authorization: "Bearer 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" };
    const payload = { inputs: text };

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...headers
        },
        body: JSON.stringify(payload)
    });

    const result = await response.blob();
    return result;
}

// Function to generate images
async function generateImages() {
    const text = document.getElementById("text-input").value;
    const numImages = parseInt(document.getElementById("num-images").value);

    const imageContainer = document.getElementById("image-container");
    imageContainer.innerHTML = "";

    for (let i = 0; i < numImages; i++) {
        try {
            const imageData = await queryModel(`${text} - Iteration ${i + 1}`);
            const imageUrl = URL.createObjectURL(imageData);

            const imageElement = document.createElement("img");
            imageElement.src = imageUrl;
            imageElement.className = "image";
            imageContainer.appendChild(imageElement);
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }
}

// Event listener for the "Generate Images" button
document.getElementById("generate-button").addEventListener("click", generateImages);




import Tesseract from 'tesseract.js';

export const recognizePlate = async (imageData) => {
  try {
    const result = await Tesseract.recognize(
      imageData,
      'por',
      { logger: m => console.log(m) }
    );
    
    // Processa o texto para extrair apenas caracteres que podem ser uma placa
    const text = result.data.text;
    const platePattern = /[A-Z]{3}[0-9]{4}/;
    const match = text.match(platePattern);
    
    return match ? match[0] : null;
  } catch (error) {
    console.error('Erro no reconhecimento OCR:', error);
    return null;
  }
};


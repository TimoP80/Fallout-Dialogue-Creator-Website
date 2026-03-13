import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generate() {
  try {
    console.log('Generating image...');
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image-preview',
      contents: 'A post-apocalyptic wasteland landscape, retro-futuristic, desolate, ruined city in the distance, sepia and olive green tones, cinematic lighting, concept art style, high quality, 16:9 aspect ratio',
      config: {
        imageConfig: {
          aspectRatio: "16:9",
          imageSize: "2K"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const buffer = Buffer.from(part.inlineData.data, 'base64');
        const publicDir = path.join(process.cwd(), 'public');
        if (!fs.existsSync(publicDir)) {
          fs.mkdirSync(publicDir);
        }
        fs.writeFileSync(path.join(publicDir, 'fallout-bg.jpg'), buffer);
        console.log('Image generated successfully and saved to public/fallout-bg.jpg!');
        break;
      }
    }
  } catch (e) {
    console.error('Failed to generate image:', e);
  }
}

generate();

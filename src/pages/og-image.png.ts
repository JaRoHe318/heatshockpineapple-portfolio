import type { APIRoute } from 'astro';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs/promises'; // NEW: For reading the logo file

// FETCH JOST (Bold 700)
const fontURL = 'https://cdn.jsdelivr.net/npm/@fontsource/jost@5.0.0/files/jost-latin-700-normal.woff';

export const GET: APIRoute = async () => {
  // 1. Fetch Font
  const fontFile = await fetch(fontURL);
  if (!fontFile.ok) throw new Error(`Failed to fetch font: ${fontFile.statusText}`);
  const fontData = await fontFile.arrayBuffer();

  // 2. Read Logo File from 'public/' folder
  // We go up two levels from 'src/pages' to find 'public'
  const logoUrl = new URL('../../public/android-chrome-192x192.png', import.meta.url);
  const logoBuffer = await fs.readFile(logoUrl);
  // Convert to Base64 so Satori can render it
  const logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;

  const svg = await satori(
    {
      type: 'div',
      props: {
        children: [
          // BACKGROUND LAYER
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100%',
                backgroundColor: '#11221C', 
                backgroundImage: 'radial-gradient(circle at center, #2d5a45 0%, #11221C 100%)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              },
            },
          },
          // CONTENT CARD
          {
            type: 'div',
            props: {
              style: {
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                border: '4px solid #FCD34D',
                backgroundColor: 'rgba(17, 34, 28, 0.85)', // Slightly more opaque to make logo pop
                padding: '50px 80px', // Increased padding
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              },
              children: [
                // NEW: LOGO IMAGE
                {
                  type: 'img',
                  props: {
                    src: logoBase64,
                    width: 100, 
                    height: 100,
                    style: {
                      marginBottom: '20px',
                      borderRadius: '12px', // Slight rounding matches the icon style
                    },
                  },
                },
                // TITLE
                {
                  type: 'h1',
                  props: {
                    children: 'JASON HERNANDEZ',
                    style: {
                      fontSize: '60px', // Slightly smaller to fit logo
                      color: '#ffffff',
                      marginBottom: '10px',
                      fontFamily: 'Jost',
                      textAlign: 'center',
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                    },
                  },
                },
                // SUBTITLE
                {
                  type: 'h2',
                  props: {
                    children: 'COMPUTATIONAL BIOCHEMIST',
                    style: {
                      fontSize: '26px',
                      color: '#FCD34D',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      fontFamily: 'Jost',
                      textAlign: 'center',
                    },
                  },
                },
                // DIVIDER
                {
                  type: 'div',
                  props: {
                    style: {
                      width: '100px', height: '2px', backgroundColor: '#FCD34D',
                      marginTop: '25px', marginBottom: '25px',
                    }
                  }
                },
                // DOMAIN
                {
                  type: 'div',
                  props: {
                    children: 'heatshockpineapple.com',
                    style: {
                      fontSize: '20px', color: '#94a3b8', fontFamily: 'Jost', letterSpacing: '0.05em',
                    },
                  },
                },
              ],
            },
          },
        ],
        style: {
          height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000',
        },
      },
    } as any,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Jost',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  );

  const resvg = new Resvg(svg);
  return new Response(resvg.render().asPng() as any, {
    headers: { 'Content-Type': 'image/png' },
  });
};
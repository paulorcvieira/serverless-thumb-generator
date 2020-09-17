import { NextApiRequest, NextApiResponse } from 'next';
import { getScreenshot } from './_lib/chromium';
import { getHtml } from './_lib/thumbnailTemplate';

const isDev = !process.env.AWS_REGION;
const isHtmlDebug = process.env.OG_HTML_DEBUG === '1';

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<any> => {
  try {
    const { query } = req;

    const title = String(query.title);
    const thumbnail_bg = String(query.thumbnail_bg);
    const first_image = String(query.first_image);
    const secondary_image = String(query.secondary_image);

    if (!title) {
      throw new Error('Title is required');
    }

    const html = getHtml({ title, thumbnail_bg, first_image, secondary_image });

    if (isHtmlDebug) {
      res.setHeader('Content-Type', 'text/html');
      res.end(html);

      return;
    }

    const file = await getScreenshot(html, isDev);

    res.statusCode = 200;

    res.setHeader('Content-Type', `image/png`);
    res.setHeader(
      'Cache-Control',
      'public, immutable, no-transform, s-maxage=31536000, max-age=31536000',
    );

    res.end(file);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Internal Error</h1><p>Sorry, there was a problem</p>');
    console.error(e);
  }
};

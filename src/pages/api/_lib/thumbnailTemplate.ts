interface GetHtmlProps {
  title: string;
  thumbnail_bg?: string;
  first_image: string;
  secondary_image: string;
}

export function getHtml({
  title,
  thumbnail_bg = '#8257e5',
  first_image,
  secondary_image,
}: GetHtmlProps) {

  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Thumbnail</title>

    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap" rel="stylesheet">

    <style>
      body {
        margin: 0;
        font-family: Roboto, sans-serif;
        color: #FFF;
        background: ${thumbnail_bg};
        background-image:
          radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2%, transparent 0%), 
          radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.2) 2%, transparent 0%);
        background-size: 100px 100px;
        height: 100vh;
      }

      #wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
      }

      .images {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }

      h1 {
        font-size: 62px;
        line-height: 80px;

        max-width: 80%;
      }
    </style>
  </head>
  <body>
    <div id="wrapper">
      <h1>${title}</h1>

      <div class="images">
        <img src="${first_image}" width="150px" height="150px">
        <h1>+</h1>
        <img src="${secondary_image}" width="150px" height="150px">
      </div>
    </div>
  </body>
  </html>`
}
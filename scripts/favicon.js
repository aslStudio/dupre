const fs = require("fs");
const favicons = require("favicons");
const path = require("path");

const FAVICON_PATH = './public/favicon.png'
const DEST_PATH = './dist/static/public/favicon'
const HTML_FILE = './dist/views/client.ejs'

const CONFIG = {
    icons: {
        android: true, // Create Android homescreen icon. `boolean` or `{ offset, background }` or an array of sources
        appleIcon: true, // Create Apple touch icons. `boolean` or `{ offset, background }` or an array of sources
        appleStartup: true, // Create Apple startup images. `boolean` or `{ offset, background }` or an array of sources
        favicons: true, // Create regular favicons. `boolean` or `{ offset, background }` or an array of sources
        windows: true, // Create Windows 8 tile icons. `boolean` or `{ offset, background }` or an array of sources
        yandex: true, // Create Yandex browser icon. `boolean` or `{ offset, background }` or an array of sources
    },
}

const generateFavicons = async () => {
    const indexHtmlContent = fs.readFileSync(HTML_FILE)
    const { images, html } = await favicons.default(FAVICON_PATH, CONFIG)

    await fs.mkdir(DEST_PATH, { recursive: true }, () => {});
    await Promise.all(
        images.map(
            async image => {
                await fs.writeFile(path.join(DEST_PATH, image.name), image.contents, () => {})
            }
        )
    )

    const htmlString = html.reduce(
        (prev, curr) =>
            prev +
            curr.replace(`href="/`, `href="/public/favicon/`),
        ''
    )

    const withFavicons = indexHtmlContent.toString().replace(/<!-- favicon-->/g, htmlString)
    fs.writeFileSync(HTML_FILE, withFavicons)
}

generateFavicons().then()

module.exports = generateFavicons()
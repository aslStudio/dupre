const fs = require('fs')
const ncp = require('ncp')

const sharp = require("sharp");
const SVGO = require("svgo");

const fsPromises = fs.promises

const src = './src/shared/assets/images/'
const dest = './dist/static/images/'

const walkSync = async function (dir) {
    const files = await fsPromises.readdir(dir)

    await Promise.all(files.map(async file => {
        const ext = (`${dir}/${file}`)
            .substring(
                (`${dir}/${file}`)
                    .lastIndexOf('.') + 1, (`${dir}/${file}`)
                    .length
            )

        if (fs.statSync(`${dir}/${file}`).isDirectory()) {
            await walkSync(`${dir}/${file}`)
        }
        else if (ext === 'png' || ext === 'jpg') {
            await optimizeNotSvg(dir, file)
        }
        else if (ext === 'svg') {
            await optimizeSVG(`${dir}/${file}`)
        }
    }))
}

async function optimizeNotSvg(dir, file) {
    const imagemin = (await import("imagemin")).default;
    const imageminMozjpeg = (await import('imagemin-mozjpeg')).default
    const imageminPngquant = (await import('imagemin-pngquant')).default

    const filename = (`${dir}/${file}`).replace(/^.*[\\\/]/, '')
    const matches = filename.match(/\[(.*?)\]/)

    if (matches) {
        /**
         * @type {number[]}
         * */
        let widths = []
        if (matches) {
            widths = matches[1].split('|').reduce((prev, curr) => [...prev, Number(curr)], [])
        }

        Promise.all(widths.map(async (width, device) => {
            let webpFile
            let classicFile

            if (widths.length > 1) {
                webpFile = `${dir}/${toDeviceSizeName(`${removeBrackets(file).substring(0, removeBrackets(file).lastIndexOf('.'))}.webp`, device)}`
                classicFile = `${dir}/${toDeviceSizeName(removeBrackets(file), device)}`
            } else {
                webpFile = `${dir}/${removeBrackets(file).substring(0, removeBrackets(file).lastIndexOf('.'))}.webp`
                classicFile = `${dir}/${removeBrackets(file)}`
            }

            await sharp(`${dir}/${file}`)
                .resize({width})
                .webp({quality: 80})
                .toFile(webpFile)

            const buffer = await sharp(`${dir}/${file}`)
                .resize({width})
                .toBuffer()
            await fsPromises.access(`${dir}/${file}`, fs.constants.F_OK)
            await fsPromises.copyFile(`${dir}/${file}`, classicFile)
            await fs.writeFileSync(classicFile, buffer)

            await imagemin([classicFile], {
                destination: `${dir}/`,
                plugins: [
                    imageminMozjpeg(),
                    imageminPngquant({
                        quality: [0.6, 0.8]
                    })
                ]
            })
        })).then(() => {
            fs.rmSync(`${dir}/${file}`)
        })
    } else {
        const webpFile = `${dir}/${removeBrackets(file).substring(0, removeBrackets(file).lastIndexOf('.'))}.webp`
        const classicFile = `${dir}/${removeBrackets(file)}`

        await sharp(`${dir}/${file}`)
            .webp({ quality: 80 })
            .toFile(webpFile)

        const buffer = await sharp(`${dir}/${file}`)
            .toBuffer()
        await fsPromises.access(`${dir}/${file}`, fs.constants.F_OK)
        await fsPromises.copyFile(`${dir}/${file}`, classicFile)
        await fs.writeFileSync(classicFile, buffer)

        await imagemin([classicFile], {
            destination: `${dir}/`,
            plugins: [
                imageminMozjpeg(),
                imageminPngquant({
                    quality: [0.6, 0.8]
                })
            ]
        })
    }
}

const removeBrackets = function (string) {
    const brackets = string.match(/\[(.*?)\]/)
    if (brackets) {
        return string.replace(brackets[0], '')
    }
    return string
}

/**
 * @param {string} name - file name
 * @param {0 | 1 | 2} size - device index. Desktop, tablet, mobile
 * */
const toDeviceSizeName = function (name, size) {
    const devices = {
        [0]: 'desktop',
        [1]: 'tablet',
        [2]: 'mobile'
    }
    const execDotIndex = name.lastIndexOf('.')
    const fileName = name.slice(0, execDotIndex)
    const exec = name.slice(execDotIndex, name.length)

    return `${fileName}-${devices[size]}${exec}`
}

async function optimizeSVG(filePath) {
    const svgContent = fs.readFileSync(filePath)

    const result = await SVGO.optimize(svgContent.toString(), {
        multipass: true,
        js2svg: {
            indent: 0,
            pretty: true,
            finalNewline: false,
        },
        plugins: [
            'preset-default',
            'prefixIds',
            {
                name: 'sortAttrs',
                params: {
                    xmlnsOrder: 'alphabetical',
                },
            },
        ]
    })
    const optimizedSvg = result.data.replace(/\n/g, '')
    fs.writeFileSync(filePath, optimizedSvg, { flag: 'w' })
}

const buildImages = async function () {
    return new Promise(resolve => {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest)
        }

        fsPromises.rmdir(dest, { recursive: true })
            .then(() => fsPromises.mkdir(dest))
            .then(() => {
                console.log('images folder created')
                ncp(src, dest, () => {
                    walkSync(dest.substring(0, dest.length - 1)).then()
                })
            })
            .then(resolve)
    })
}

buildImages().then()

module.exports = buildImages
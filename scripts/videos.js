const fs = require('fs')
const ncp = require("ncp");
const fsPromises = fs.promises

const src = './src/shared/assets/videos/'
const dest = './dist/static/videos/'

const moveVideos = async function () {
    return new Promise(resolve => {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest)
        }

        fsPromises.rmdir(dest, { recursive: true })
            // .then(() => fsPromises.mkdir(dest))
            .then(() => {
                console.log('videos folder created')
                ncp(src, dest)
            })
            .then(resolve)
    })
}

moveVideos().then()

module.exports = moveVideos()
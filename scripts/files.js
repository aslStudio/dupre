const fs = require('fs')
const ncp = require("ncp");
const fsPromises = fs.promises

const src = './src/shared/assets/files/'
const dest = './dist/static/files/'

const moveFiles = async function () {
    return new Promise(resolve => {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest)
        }

        fsPromises.rmdir(dest, { recursive: true })
            // .then(() => fsPromises.mkdir(dest))
            .then(() => {
                console.log('files folder created')
                ncp(src, dest)
            })
            .then(resolve)
    })
}

moveFiles().then()

module.exports = moveFiles()
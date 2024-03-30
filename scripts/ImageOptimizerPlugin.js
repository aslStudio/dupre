const optimizeImages = require('./image-optimizer')

class ImageOptimizerPlugin {
    apply(compiler) {
        compiler.hooks.afterEmit.tapPromise('image-optimizer', async () => {
            console.log('build complete, start image optimizer')
            await optimizeImages()
        })
    }
}

module.exports = ImageOptimizerPlugin
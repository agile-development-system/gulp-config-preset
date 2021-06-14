/*
 * @Author: 锦阳
 * @Create: 2021年05月31日
 */
const GenDoc = require('@ads/cli-plugin-doc');
module.exports = (
    /**
     * 配置参数
     *
     * @returns {GenDoc.RenderOptions}
     */
    async () => {
        const [source] = (await Promise.all([
            GenDoc.getFilesCode({ dir: './lib', files: ['*'] }),
        ]));
        return {
            output: 'README.md',
            helpers: {
                devInstall: true,
                importCode: GenDoc.getFileContent('./docs/import.js'),
                remark: GenDoc.getFileContent('./docs/usage.md'),
                postfixes: [
                    {
                        id: 'source',
                        title: '配置源码',
                        content: GenDoc.renderCode(source),
                    },
                ],
            },
        };
    })();

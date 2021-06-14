/*
 * @Author: 锦阳
 * @Create: 2021年05月20日
 */
const { series, src, dest, parallel } = require('gulp');
const rimraf = require('rimraf');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const merge = require('merge2');
const { FastPath } = require('@ads/node-utils');
const path = require('path');
/**
 * @param {object} options gulp出入口配置
 * @param {string} options.input gulp构建入口
 * @param {string} options.output gulp构建出口
 * @returns {import('gulp').TaskFunction}
 */
function gulppreset({ input = 'src', output = 'lib' }) {
    const tsProject = ts.createProject('tsconfig.json');
    const _input = FastPath.getCwdPath(input);
    const _output = FastPath.getCwdPath(output);
    /**
     * 清除构建目录
     *
     * @returns {Promise}
     */
    function clean() {
        return new Promise((resolve) => rimraf(_output, resolve));
    };
    /**
     * 构建
     *
     * @returns {import('node:stream').Stream}
     */
    function build() {
        const tsResult = src(path.join(_input, '**/*.[tj]s'))
            .pipe(tsProject());

        return merge([
            tsResult.dts.pipe(dest(path.join(_output, 'types'))),
            tsResult.js.pipe(babel()).pipe(dest(_output)),
        ]);
    }

    /**
     * 复制无法构建的文件
     *
     * @returns {import('node:stream').Stream}
     */
    function cp() {
        return src(path.join(_input, '**/*.![tj]s')).pipe(dest(_output));
    }
    return series(clean, parallel(build, cp));
}

module.exports = gulppreset;

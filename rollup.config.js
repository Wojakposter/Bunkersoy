import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonJs from '@rollup/plugin-commonjs'
import jscc from 'rollup-plugin-jscc'
import userscriptHeader from 'rollup-plugin-userscript-header'

const pkg = require('./package.json')
const platform = process.env.TARGET_PLATFORM || "bunkerchan";
const PLATFORM_DESCRIPTOR = require(`./src/platform/${platform}.json`);
let grants = [
    PLATFORM_DESCRIPTOR.conditions._BYPASS_CORS ? "GM_xmlhttpRequest" : "",
    PLATFORM_DESCRIPTOR.conditions._PATCH_REPLY ? "unsafeWindow" : ""
].filter(x => x);
grants = grants.length === 0 ? ["none"] : grants

export default {
    input: `./src/platform/${PLATFORM_DESCRIPTOR.software}.js`,
    output: {
        file: `./dist/${PLATFORM_DESCRIPTOR.scriptName}.user.js`,
        format: 'iife'
    },
    plugins: [
        jscc({values: PLATFORM_DESCRIPTOR.conditions}),
        typescript(),
        commonJs(),
        nodeResolve(),
        babel({babelHelpers: "bundled", extensions: ['.js', '.ts']}),
        userscriptHeader({
            overwrite: {
                name: PLATFORM_DESCRIPTOR.scriptName,
                namespace: "http://4chan.org",
                version: pkg.version,
                author: pkg.author,
                include: PLATFORM_DESCRIPTOR.include,
                match: '',
                grant: grants
        }})
    ]
}

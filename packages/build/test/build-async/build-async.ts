import { constants } from '@create-figma-plugin/common'
import test from 'ava'
import { exec, ExecException } from 'child_process'
import { findUp } from 'find-up'
import fs from 'fs-extra'
import { dirname, join } from 'path'
import { rimraf } from 'rimraf'
import { fileURLToPath } from 'url'

import { buildAsync } from '../../src/build-async.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

test('no config', async function (t) {
  t.plan(5)
  process.chdir(join(__dirname, 'fixtures', '01-no-config'))
  await cleanUpAsync()
  t.false(await fs.pathExists('build'))
  t.false(await fs.pathExists('node_modules'))
  await installFigmaPluginTypingsAsync()
  await symlinkCreateFigmaPluginTsConfigAsync()
  await buildAsync({
    clearPreviousLine: false,
    minify: false,
    typecheck: true
  })
  const manifestJson = JSON.parse(await fs.readFile('manifest.json', 'utf8'))
  t.deepEqual(manifestJson, {
    api: '1.0.0',
    editorType: ['figma'],
    id: 'figma-plugin',
    main: 'build/main.js',
    name: 'figma-plugin'
  })
  t.true(await fs.pathExists('build/main.js'))
  t.false(await fs.pathExists('build/ui.js'))
  await cleanUpAsync()
})

test('basic command', async function (t) {
  t.plan(5)
  process.chdir(join(__dirname, 'fixtures', '02-basic-command'))
  await cleanUpAsync()
  t.false(await fs.pathExists('build'))
  t.false(await fs.pathExists('node_modules'))
  await installFigmaPluginTypingsAsync()
  await symlinkCreateFigmaPluginTsConfigAsync()
  await buildAsync({
    clearPreviousLine: false,
    minify: false,
    typecheck: true
  })
  const manifestJson = JSON.parse(await fs.readFile('manifest.json', 'utf8'))
  t.deepEqual(manifestJson, {
    api: '1.0.0',
    editorType: ['figma'],
    id: '42',
    main: 'build/main.js',
    name: 'a'
  })
  t.true(await fs.pathExists('build/main.js'))
  t.false(await fs.pathExists('build/ui.js'))
  await cleanUpAsync()
})

test('basic command with UI', async function (t) {
  t.plan(5)
  process.chdir(join(__dirname, 'fixtures', '03-basic-command-with-ui'))
  await cleanUpAsync()
  t.false(await fs.pathExists('build'))
  t.false(await fs.pathExists('node_modules'))
  await installFigmaPluginTypingsAsync()
  await symlinkCreateFigmaPluginTsConfigAsync()
  await buildAsync({
    clearPreviousLine: false,
    minify: false,
    typecheck: true
  })
  const manifestJson = JSON.parse(await fs.readFile('manifest.json', 'utf8'))
  t.deepEqual(manifestJson, {
    api: '1.0.0',
    editorType: ['figma'],
    id: '42',
    main: 'build/main.js',
    name: 'a',
    ui: 'build/ui.js'
  })
  t.true(await fs.pathExists('build/main.js'))
  t.true(await fs.pathExists('build/ui.js'))
  await cleanUpAsync()
})

test('basic command with parameters', async function (t) {
  t.plan(5)
  process.chdir(join(__dirname, 'fixtures', '04-basic-command-with-parameters'))
  await cleanUpAsync()
  t.false(await fs.pathExists('build'))
  t.false(await fs.pathExists('node_modules'))
  await installFigmaPluginTypingsAsync()
  await symlinkCreateFigmaPluginTsConfigAsync()
  await buildAsync({
    clearPreviousLine: false,
    minify: false,
    typecheck: true
  })
  const manifestJson = JSON.parse(await fs.readFile('manifest.json', 'utf8'))
  t.deepEqual(manifestJson, {
    api: '1.0.0',
    editorType: ['figma'],
    id: '42',
    main: 'build/main.js',
    name: 'a',
    parameterOnly: false,
    parameters: [
      {
        allowFreeform: true,
        description: 'd',
        key: 'c',
        name: 'b',
        optional: true
      }
    ]
  })
  t.true(await fs.pathExists('build/main.js'))
  t.false(await fs.pathExists('build/ui.js'))
  await cleanUpAsync()
})

test('menu command', async function (t) {
  t.plan(5)
  process.chdir(join(__dirname, 'fixtures', '05-menu-command'))
  await cleanUpAsync()
  t.false(await fs.pathExists('build'))
  t.false(await fs.pathExists('node_modules'))
  await installFigmaPluginTypingsAsync()
  await symlinkCreateFigmaPluginTsConfigAsync()
  await buildAsync({
    clearPreviousLine: false,
    minify: false,
    typecheck: true
  })
  const manifestJson = JSON.parse(await fs.readFile('manifest.json', 'utf8'))
  t.deepEqual(manifestJson, {
    api: '1.0.0',
    editorType: ['figma'],
    id: '42',
    main: 'build/main.js',
    menu: [
      {
        command: 'src/main.ts--default',
        name: 'b'
      }
    ],
    name: 'a'
  })
  t.true(await fs.pathExists('build/main.js'))
  t.false(await fs.pathExists('build/ui.js'))
  await cleanUpAsync()
})

test('menu command with UI', async function (t) {
  t.plan(5)
  process.chdir(join(__dirname, 'fixtures', '06-menu-command-with-ui'))
  await cleanUpAsync()
  t.false(await fs.pathExists('build'))
  t.false(await fs.pathExists('node_modules'))
  await installFigmaPluginTypingsAsync()
  await symlinkCreateFigmaPluginTsConfigAsync()
  await buildAsync({
    clearPreviousLine: false,
    minify: false,
    typecheck: true
  })
  const manifestJson = JSON.parse(await fs.readFile('manifest.json', 'utf8'))
  t.deepEqual(manifestJson, {
    api: '1.0.0',
    editorType: ['figma'],
    id: '42',
    main: 'build/main.js',
    menu: [
      {
        command: 'src/main.ts--default',
        name: 'b'
      }
    ],
    name: 'a',
    ui: 'build/ui.js'
  })
  t.true(await fs.pathExists('build/main.js'))
  t.true(await fs.pathExists('build/ui.js'))
  await cleanUpAsync()
})

test('menu command with parameters', async function (t) {
  t.plan(5)
  process.chdir(join(__dirname, 'fixtures', '07-menu-command-with-parameters'))
  await cleanUpAsync()
  t.false(await fs.pathExists('build'))
  t.false(await fs.pathExists('node_modules'))
  await installFigmaPluginTypingsAsync()
  await symlinkCreateFigmaPluginTsConfigAsync()
  await buildAsync({
    clearPreviousLine: false,
    minify: false,
    typecheck: true
  })
  const manifestJson = JSON.parse(await fs.readFile('manifest.json', 'utf8'))
  t.deepEqual(manifestJson, {
    api: '1.0.0',
    editorType: ['figma'],
    id: '42',
    main: 'build/main.js',
    menu: [
      {
        command: 'src/main.ts--default',
        name: 'b',
        parameterOnly: false,
        parameters: [
          {
            allowFreeform: true,
            description: 'e',
            key: 'd',
            name: 'c',
            optional: true
          }
        ]
      }
    ],
    name: 'a'
  })
  t.true(await fs.pathExists('build/main.js'))
  t.false(await fs.pathExists('build/ui.js'))
  await cleanUpAsync()
})

test('multiple menu commands', async function (t) {
  t.plan(5)
  process.chdir(join(__dirname, 'fixtures', '08-multiple-menu-commands'))
  await cleanUpAsync()
  t.false(await fs.pathExists('build'))
  t.false(await fs.pathExists('node_modules'))
  await installFigmaPluginTypingsAsync()
  await symlinkCreateFigmaPluginTsConfigAsync()
  await buildAsync({
    clearPreviousLine: false,
    minify: false,
    typecheck: true
  })
  const manifestJson = JSON.parse(await fs.readFile('manifest.json', 'utf8'))
  t.deepEqual(manifestJson, {
    api: '1.0.0',
    editorType: ['figma'],
    id: '42',
    main: 'build/main.js',
    menu: [
      {
        command: 'src/foo.ts--default',
        name: 'b'
      },
      {
        separator: true
      },
      {
        menu: [
          {
            command: 'src/bar/main.ts--default',
            name: 'd',
            parameterOnly: false,
            parameters: [
              {
                allowFreeform: true,
                description: 'g',
                key: 'f',
                name: 'e',
                optional: true
              }
            ]
          }
        ],
        name: 'c'
      }
    ],
    name: 'a',
    ui: 'build/ui.js'
  })
  t.true(await fs.pathExists('build/main.js'))
  t.true(await fs.pathExists('build/ui.js'))
  await cleanUpAsync()
})

test('additional fields', async function (t) {
  t.plan(5)
  process.chdir(join(__dirname, 'fixtures', '09-additional-fields'))
  await cleanUpAsync()
  t.false(await fs.pathExists('build'))
  t.false(await fs.pathExists('node_modules'))
  await installFigmaPluginTypingsAsync()
  await symlinkCreateFigmaPluginTsConfigAsync()
  await buildAsync({
    clearPreviousLine: false,
    minify: false,
    typecheck: true
  })
  const manifestJson = JSON.parse(await fs.readFile('manifest.json', 'utf8'))
  t.deepEqual(manifestJson, {
    api: '42',
    build: 'a',
    capabilities: ['textreview'],
    containsWidget: true,
    editorType: ['figjam'],
    enablePrivatePluginApi: true,
    enableProposedApi: true,
    id: '44',
    main: 'build/main.js',
    name: 'a',
    permissions: ['activeusers'],
    widgetApi: '43'
  })
  t.true(await fs.pathExists('build/main.js'))
  t.false(await fs.pathExists('build/ui.js'))
  await cleanUpAsync()
})

test('relaunch button', async function (t) {
  t.plan(5)
  process.chdir(join(__dirname, 'fixtures', '10-relaunch-button'))
  await cleanUpAsync()
  t.false(await fs.pathExists('build'))
  t.false(await fs.pathExists('node_modules'))
  await installFigmaPluginTypingsAsync()
  await symlinkCreateFigmaPluginTsConfigAsync()
  await buildAsync({
    clearPreviousLine: false,
    minify: false,
    typecheck: true
  })
  const manifestJson = JSON.parse(await fs.readFile('manifest.json', 'utf8'))
  t.deepEqual(manifestJson, {
    api: '1.0.0',
    editorType: ['figma'],
    id: '42',
    main: 'build/main.js',
    name: 'a',
    relaunchButtons: [
      {
        command: 'b',
        name: 'c'
      },
      {
        command: 'd',
        multipleSelection: true,
        name: 'e'
      }
    ],
    ui: 'build/ui.js'
  })
  t.true(await fs.pathExists('build/main.js'))
  t.true(await fs.pathExists('build/ui.js'))
  await cleanUpAsync()
})

test('UI with image asset', async function (t) {
  t.plan(6)
  process.chdir(join(__dirname, 'fixtures', '11-ui-with-image-asset'))
  await cleanUpAsync()
  t.false(await fs.pathExists('build'))
  t.false(await fs.pathExists('node_modules'))
  await installFigmaPluginTypingsAsync()
  await symlinkCreateFigmaPluginTsConfigAsync()
  await buildAsync({
    clearPreviousLine: false,
    minify: false,
    typecheck: true
  })
  const manifestJson = JSON.parse(await fs.readFile('manifest.json', 'utf8'))
  t.deepEqual(manifestJson, {
    api: '1.0.0',
    editorType: ['figma'],
    id: '42',
    main: 'build/main.js',
    name: 'a',
    ui: 'build/ui.js'
  })
  t.true(await fs.pathExists('build/main.js'))
  t.true(await fs.pathExists('build/ui.js'))
  const uiJs = await fs.readFile('build/ui.js', 'utf8')
  t.true(/data:image\/svg\+xml/.test(uiJs) === true)
  await cleanUpAsync()
})

test('CSS modules', async function (t) {
  t.plan(8)
  process.chdir(join(__dirname, 'fixtures', '12-css-modules'))
  await cleanUpAsync()
  t.false(await fs.pathExists('build'))
  t.false(await fs.pathExists('node_modules'))
  t.false(await fs.pathExists('src/styles.css.d.ts'))
  await installFigmaPluginTypingsAsync()
  await symlinkCreateFigmaPluginTsConfigAsync()
  await buildAsync({
    clearPreviousLine: false,
    minify: false,
    typecheck: true
  })
  const manifestJson = JSON.parse(await fs.readFile('manifest.json', 'utf8'))
  t.deepEqual(manifestJson, {
    api: '1.0.0',
    editorType: ['figma'],
    id: '42',
    main: 'build/main.js',
    name: 'a',
    ui: 'build/ui.js'
  })
  t.true(await fs.pathExists('build/main.js'))
  t.true(await fs.pathExists('build/ui.js'))
  const uiJs = await fs.readFile('build/ui.js', 'utf8')
  t.true(/\._foo_[^ ]+ {/.test(uiJs) === true)
  t.true(await fs.pathExists('src/styles.css.d.ts'))
  await cleanUpAsync()
})

test('global CSS', async function (t) {
  t.plan(8)
  process.chdir(join(__dirname, 'fixtures', '13-global-css'))
  await cleanUpAsync()
  t.false(await fs.pathExists('build'))
  t.false(await fs.pathExists('node_modules'))
  t.false(await fs.pathExists('src/styles.css.d.ts'))
  await installFigmaPluginTypingsAsync()
  await symlinkCreateFigmaPluginTsConfigAsync()
  await buildAsync({
    clearPreviousLine: false,
    minify: false,
    typecheck: true
  })
  const manifestJson = JSON.parse(await fs.readFile('manifest.json', 'utf8'))
  t.deepEqual(manifestJson, {
    api: '1.0.0',
    editorType: ['figma'],
    id: '42',
    main: 'build/main.js',
    name: 'a',
    ui: 'build/ui.js'
  })
  t.true(await fs.pathExists('build/main.js'))
  t.true(await fs.pathExists('build/ui.js'))
  const uiJs = await fs.readFile('build/ui.js', 'utf8')
  t.true(/\.foo {/.test(uiJs) === true)
  t.true(await fs.pathExists('src/styles.css.d.ts'))
  await cleanUpAsync()
})

test('preact', async function (t) {
  t.plan(5)
  process.chdir(join(__dirname, 'fixtures', '14-preact'))
  await cleanUpAsync()
  t.false(await fs.pathExists('build'))
  t.false(await fs.pathExists('node_modules'))
  await installFigmaPluginTypingsAsync()
  await symlinkCreateFigmaPluginTsConfigAsync()
  await buildAsync({
    clearPreviousLine: false,
    minify: false,
    typecheck: true
  })
  const manifestJson = JSON.parse(await fs.readFile('manifest.json', 'utf8'))
  t.deepEqual(manifestJson, {
    api: '1.0.0',
    editorType: ['figma'],
    id: '42',
    main: 'build/main.js',
    name: 'a',
    ui: 'build/ui.js'
  })
  t.true(await fs.pathExists('build/main.js'))
  t.true(await fs.pathExists('build/ui.js'))
  await cleanUpAsync()
})

test('react', async function (t) {
  t.plan(5)
  process.chdir(join(__dirname, 'fixtures', '15-react'))
  await cleanUpAsync()
  t.false(await fs.pathExists('build'))
  t.false(await fs.pathExists('node_modules'))
  await installFigmaPluginTypingsAsync()
  await symlinkCreateFigmaPluginTsConfigAsync()
  await buildAsync({
    clearPreviousLine: false,
    minify: false,
    typecheck: true
  })
  const manifestJson = JSON.parse(await fs.readFile('manifest.json', 'utf8'))
  t.deepEqual(manifestJson, {
    api: '1.0.0',
    editorType: ['figma'],
    id: '42',
    main: 'build/main.js',
    name: 'a',
    ui: 'build/ui.js'
  })
  t.true(await fs.pathExists('build/main.js'))
  t.true(await fs.pathExists('build/ui.js'))
  await cleanUpAsync()
})

test('esbuild main config - js', async function (t) {
  t.plan(6)
  process.chdir(join(__dirname, 'fixtures', '16-esbuild-main-config-js'))
  await cleanUpAsync()
  t.false(await fs.pathExists('build'))
  t.false(await fs.pathExists('node_modules'))
  await installFigmaPluginTypingsAsync()
  await symlinkCreateFigmaPluginTsConfigAsync()
  await buildAsync({
    clearPreviousLine: false,
    minify: false,
    typecheck: true
  })
  const manifestJson = JSON.parse(await fs.readFile('manifest.json', 'utf8'))
  t.deepEqual(manifestJson, {
    api: '1.0.0',
    editorType: ['figma'],
    id: '42',
    main: 'build/main.js',
    name: 'a'
  })
  t.true(await fs.pathExists('build/main.js'))
  const mainJs = await fs.readFile('build/main.js', 'utf8')
  t.true(/\/\/ comment appended to main\.js/.test(mainJs) === true)
  t.false(await fs.pathExists('build/ui.js'))
  await cleanUpAsync()
})

test('esbuild main config - cjs', async function (t) {
  t.plan(6)
  process.chdir(join(__dirname, 'fixtures', '17-esbuild-main-config-cjs'))
  await cleanUpAsync()
  t.false(await fs.pathExists('build'))
  t.false(await fs.pathExists('node_modules'))
  await installFigmaPluginTypingsAsync()
  await symlinkCreateFigmaPluginTsConfigAsync()
  await buildAsync({
    clearPreviousLine: false,
    minify: false,
    typecheck: true
  })
  const manifestJson = JSON.parse(await fs.readFile('manifest.json', 'utf8'))
  t.deepEqual(manifestJson, {
    api: '1.0.0',
    editorType: ['figma'],
    id: '42',
    main: 'build/main.js',
    name: 'a'
  })
  t.true(await fs.pathExists('build/main.js'))
  const mainJs = await fs.readFile('build/main.js', 'utf8')
  t.true(/\/\/ comment appended to main\.js/.test(mainJs) === true)
  t.false(await fs.pathExists('build/ui.js'))
  await cleanUpAsync()
})

test('esbuild ui config - js', async function (t) {
  t.plan(6)
  process.chdir(join(__dirname, 'fixtures', '18-esbuild-ui-config-js'))
  await cleanUpAsync()
  t.false(await fs.pathExists('build'))
  t.false(await fs.pathExists('node_modules'))
  await installFigmaPluginTypingsAsync()
  await symlinkCreateFigmaPluginTsConfigAsync()
  await buildAsync({
    clearPreviousLine: false,
    minify: false,
    typecheck: true
  })
  const manifestJson = JSON.parse(await fs.readFile('manifest.json', 'utf8'))
  t.deepEqual(manifestJson, {
    api: '1.0.0',
    editorType: ['figma'],
    id: '42',
    main: 'build/main.js',
    name: 'a',
    ui: 'build/ui.js'
  })
  t.true(await fs.pathExists('build/main.js'))
  t.true(await fs.pathExists('build/ui.js'))
  const uiJs = await fs.readFile('build/ui.js', 'utf8')
  t.true(/\/\/ comment appended to ui\.js/.test(uiJs) === true)
  await cleanUpAsync()
})

test('esbuild ui config - cjs', async function (t) {
  t.plan(6)
  process.chdir(join(__dirname, 'fixtures', '19-esbuild-ui-config-cjs'))
  await cleanUpAsync()
  t.false(await fs.pathExists('build'))
  t.false(await fs.pathExists('node_modules'))
  await installFigmaPluginTypingsAsync()
  await symlinkCreateFigmaPluginTsConfigAsync()
  await buildAsync({
    clearPreviousLine: false,
    minify: false,
    typecheck: true
  })
  const manifestJson = JSON.parse(await fs.readFile('manifest.json', 'utf8'))
  t.deepEqual(manifestJson, {
    api: '1.0.0',
    editorType: ['figma'],
    id: '42',
    main: 'build/main.js',
    name: 'a',
    ui: 'build/ui.js'
  })
  t.true(await fs.pathExists('build/main.js'))
  t.true(await fs.pathExists('build/ui.js'))
  const uiJs = await fs.readFile('build/ui.js', 'utf8')
  t.true(/\/\/ comment appended to ui\.js/.test(uiJs) === true)
  await cleanUpAsync()
})

test('override manifest - js', async function (t) {
  t.plan(5)
  process.chdir(join(__dirname, 'fixtures', '20-override-manifest-js'))
  await cleanUpAsync()
  t.false(await fs.pathExists('build'))
  t.false(await fs.pathExists('node_modules'))
  await installFigmaPluginTypingsAsync()
  await symlinkCreateFigmaPluginTsConfigAsync()
  await buildAsync({
    clearPreviousLine: false,
    minify: false,
    typecheck: true
  })
  const manifestJson = JSON.parse(await fs.readFile('manifest.json', 'utf8'))
  t.deepEqual(manifestJson, {
    api: '1.0.0',
    editorType: ['figma'],
    id: '42',
    main: 'build/main.js',
    name: 'a',
    x: 'y'
  })
  t.true(await fs.pathExists('build/main.js'))
  t.false(await fs.pathExists('build/ui.js'))
  await cleanUpAsync()
})

test('override manifest - cjs', async function (t) {
  t.plan(5)
  process.chdir(join(__dirname, 'fixtures', '21-override-manifest-cjs'))
  await cleanUpAsync()
  t.false(await fs.pathExists('build'))
  t.false(await fs.pathExists('node_modules'))
  await installFigmaPluginTypingsAsync()
  await symlinkCreateFigmaPluginTsConfigAsync()
  await buildAsync({
    clearPreviousLine: false,
    minify: false,
    typecheck: true
  })
  const manifestJson = JSON.parse(await fs.readFile('manifest.json', 'utf8'))
  t.deepEqual(manifestJson, {
    api: '1.0.0',
    editorType: ['figma'],
    id: '42',
    main: 'build/main.js',
    name: 'a',
    x: 'y'
  })
  t.true(await fs.pathExists('build/main.js'))
  t.false(await fs.pathExists('build/ui.js'))
  await cleanUpAsync()
})

test('process.env.NODE_ENV', async function (t) {
  t.plan(6)
  process.chdir(join(__dirname, 'fixtures', '22-process-env-node-env'))
  await cleanUpAsync()
  t.false(await fs.pathExists('build'))
  t.false(await fs.pathExists('node_modules'))
  await installFigmaPluginTypingsAsync()
  await symlinkCreateFigmaPluginTsConfigAsync()
  await buildAsync({
    clearPreviousLine: false,
    minify: true,
    typecheck: true
  })
  const manifestJson = JSON.parse(await fs.readFile('manifest.json', 'utf8'))
  t.deepEqual(manifestJson, {
    api: '1.0.0',
    editorType: ['figma'],
    id: '42',
    main: 'build/main.js',
    name: 'a'
  })
  t.true(await fs.pathExists('build/main.js'))
  const mainJs = await fs.readFile('build/main.js', 'utf8')
  t.true(mainJs.indexOf('process.env.NODE_ENV==="production"') !== -1)
  t.false(await fs.pathExists('build/ui.js'))
  await cleanUpAsync()
})

async function installFigmaPluginTypingsAsync(): Promise<void> {
  await fs.ensureDir(join(process.cwd(), 'node_modules'))
  await new Promise<void>(function (resolve, reject) {
    exec(
      `npm install --no-save @figma/plugin-typings@${constants.packageJson.versions.pluginTypings}`,
      {},
      function (error: ExecException | null): void {
        if (error) {
          reject(error)
          return
        }
        resolve()
      }
    )
  })
}

async function symlinkCreateFigmaPluginTsConfigAsync(): Promise<void> {
  const directoryPath = await findUp(join('packages', 'tsconfig'), {
    type: 'directory'
  })
  if (typeof directoryPath === 'undefined') {
    throw new Error('Cannot find the `tsconfig` package')
  }
  await fs.ensureSymlink(
    directoryPath,
    join(process.cwd(), 'node_modules', '@create-figma-plugin', 'tsconfig')
  )
}

async function cleanUpAsync(): Promise<void> {
  await rimraf(join(process.cwd(), '{build,manifest.json,node_modules}'), {
    glob: true
  })
  await rimraf(join(process.cwd(), 'src', '*.css.d.ts'), { glob: true })
}

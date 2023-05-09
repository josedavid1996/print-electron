/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  publish: null,
  npmRebuild: false,
  productName: 'PLAZA-TICKET',
  extraFiles: [{ from: 'src' }],
  files: ['dist/src/**/*'],
  directories: { output: 'dist/electron' },
  // extraResources: [
  //   {
  //     to: 'database/db_prd.sqlite3',
  //     from: 'src/database/db_prd.sqlite3'
  //   }
  // ]
}

module.exports = config

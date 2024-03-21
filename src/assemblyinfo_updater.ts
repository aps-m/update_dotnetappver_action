import * as fs from 'fs'

export function ReplaceVersion(
  filename: string,
  keyword: string,
  revision: string
): void {
  revision = revision.replace('v', '')

  revision = revision.replace('-b', '.')

  // Transform revision to 4 digits
  if (revision.split('.').length === 3) {
    revision = `${revision}.0`
  }

  let filecontent = fs.readFileSync(filename, 'utf-8')

  filecontent = filecontent.replace(
    new RegExp(`\\[assembly: ${keyword}\\("[0-9]+.[0-9]+.[0-9]+.[0-9]+"\\)\\]`),
    `[assembly: ${keyword}("${revision}")]`
  )

  fs.writeFileSync(filename, filecontent)
}

// ReplaceVersion('AssemblyInfo.cs', 'AssemblyVersion', '1.2.35')

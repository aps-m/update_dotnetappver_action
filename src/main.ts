import * as core from '@actions/core'
import { ReplaceVersion } from './assemblyinfo_updater'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const filename: string = core.getInput('filename')
    const keyword: string = core.getInput('keyword')
    const new_version: string = core.getInput('new_version')

    ReplaceVersion(filename, keyword, new_version)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}

/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */

import * as core from '@actions/core'
import * as updater from '../src/assemblyinfo_updater'
import * as main from '../src/main'

jest.mock('../src/assemblyinfo_updater', () => ({
  ReplaceVersion: jest.fn()
}))

// Mock the action's main function
const runMock = jest.spyOn(main, 'run')

// Mock the GitHub Actions core library
let getInputMock: jest.SpiedFunction<typeof core.getInput>
let setFailedMock: jest.SpiedFunction<typeof core.setFailed>
let replaceVersionMock: jest.MockedFunction<typeof updater.ReplaceVersion>

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
    setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation()
    replaceVersionMock = updater.ReplaceVersion as jest.MockedFunction<
      typeof updater.ReplaceVersion
    >
  })

  it('calls ReplaceVersion with action inputs', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'filename':
          return 'Properties/AssemblyInfo.cs'
        case 'keyword':
          return 'AssemblyFileVersion'
        case 'new_version':
          return '1.2.3'
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()

    expect(replaceVersionMock).toHaveBeenNthCalledWith(
      1,
      'Properties/AssemblyInfo.cs',
      'AssemblyFileVersion',
      '1.2.3'
    )
    expect(setFailedMock).not.toHaveBeenCalled()
  })

  it('sets a failed status', async () => {
    replaceVersionMock.mockImplementation(() => {
      throw new Error('replace failed')
    })

    await main.run()
    expect(runMock).toHaveReturned()

    expect(setFailedMock).toHaveBeenNthCalledWith(1, 'replace failed')
  })
})

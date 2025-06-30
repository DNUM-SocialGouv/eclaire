import { ResearchStudyModelFactory } from './ResearchStudyModelFactory'
import { RiphDtoTestFactory } from '../../shared/test/helpers/RiphDtoTestFactory'
import { EclaireDto } from '../dto/EclaireDto'

const SNAPSHOT_PATH = '../../../shared/test/snapshots/ReasearchStudyFactory.snap.json'
const SNAPSHOT_PATH_CTIS = '../../../shared/test/snapshots/ReasearchStudyFactoryCTIS.snap.json'
const SNAPSHOT_PATH_DM = '../../../shared/test/snapshots/ReasearchStudyFactoryDM.snap.json'
const SNAPSHOT_PATH_JARDE = '../../../shared/test/snapshots/ReasearchStudyFactoryJARDE.snap.json'

describe('research study model factory', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('should build a research study model, when a RIPH CTIS object with all fields filled is given', async() => {
    await expect(JSON.stringify(ResearchStudyModelFactory.create(EclaireDto.fromCtis(RiphDtoTestFactory.ctis())))).toMatchFileSnapshot(SNAPSHOT_PATH_CTIS)
  })

  it('should build a research study model, when a RIPH DM object with all fields filled is given', async() => {
    await expect(JSON.stringify(ResearchStudyModelFactory.create(EclaireDto.fromDm(RiphDtoTestFactory.dm())))).toMatchFileSnapshot(SNAPSHOT_PATH_DM)
  })

  it('should build a research study model, when a RIPH Jarde object with all fields filled is given', async() => {
    await expect(JSON.stringify(ResearchStudyModelFactory.create(EclaireDto.fromJarde(RiphDtoTestFactory.jarde())))).toMatchFileSnapshot(SNAPSHOT_PATH_JARDE)
  })

  it('should build a research study model, when null fields is given', async() => {
    await expect(JSON.stringify(ResearchStudyModelFactory.create(EclaireDto.fromCtis(RiphDtoTestFactory.emptyCtis())))).toMatchFileSnapshot(SNAPSHOT_PATH)
  })
})

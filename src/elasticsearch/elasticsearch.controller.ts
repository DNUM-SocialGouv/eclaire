import { Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common'
import { Request, Response } from 'express'

import { ClinicalTrialModelFactory } from './clinical-trial-model-factory'
import { ElasticsearchService } from './elasticsearch.service'
import { Public } from '../auth/public.decorator'
import { ClinicalTrialFactory } from '../clinical-trial/gateways/clinical-trial-factory'
import { ClinicalTrialModel } from '../clinical-trial/gateways/model/ClinicalTrialModel'

@Controller('elasticsearch')
export class ElasticsearchController {
  constructor(private readonly service: ElasticsearchService) {
  }

  @Public()
  @Post('create')
  async createOne(@Req() req: Request, @Res() res: Response): Promise<void> {
    //Todo: Add error handler on req.body format
    const payload= ClinicalTrialModelFactory.create(req.body as Partial<ClinicalTrialModel>)
    const response = await this.service.createOneClinicalTrial(payload)

    res.json({ id: response.id, result: response.result })
  }

  @Public()
  @Get('get/:uuid')
  async getOne(@Param('uuid') uuid: string, @Res() res: Response): Promise<void> {
    const response = await this.service.findOneClinicalTrial(uuid)
    const clinicalTrialModel: ClinicalTrialModel = ClinicalTrialModelFactory.create(response)

    res.json(ClinicalTrialFactory.create(clinicalTrialModel))
  }

  @Public()
  @Put('update/:uuid')
  async updateOne(@Param('uuid') uuid: string, @Req() req: Request, @Res() res: Response): Promise<void> {
    const payload: Partial<ClinicalTrialModel> = req.body
    const response = await this.service.updateOneClinicalTrial(uuid, payload)

    res.json({ result: response.result })
  }

  @Public()
  @Delete('delete/:uuid')
  async deleteOne(@Param('uuid') uuid: string, @Res() res: Response): Promise<void> {
    const response: Record<string, string> = await this.service.deleteOneClinicalTrial(uuid)
    res.json({ result: response.result })
  }

  @Public()
  @Get('load/riph')
  async loadExport(@Res() res: Response): Promise<void> {
    const response = await this.service.importRiphClinicalTrials()
    console.log('--- RESPONSE ---')
    console.log(response)
    res.json(response)
  }
}

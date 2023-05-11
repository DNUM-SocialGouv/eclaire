import crypto from 'crypto'

import { RiphCtisDto } from './dto/RiphCtisDto'
import { ClinicalTrialModel } from '../../../api/clinical-trial/gateways/model/ClinicalTrialModel'
import { ContactDetailsModel } from '../../../api/clinical-trial/gateways/model/ContactDetailsModel'
import { ContactModel } from '../../../api/clinical-trial/gateways/model/ContactModel'
import { CriteriaModel } from '../../../api/clinical-trial/gateways/model/CriteriaModel'
import { RecruitmentModel } from '../../../api/clinical-trial/gateways/model/RecruitmentModel'
import { StudyTypeModel } from '../../../api/clinical-trial/gateways/model/StudyTypeModel'
import { TherapeuticAreaModel } from '../../../api/clinical-trial/gateways/model/TherapeuticAreaModel'
import { TitleModel } from '../../../api/clinical-trial/gateways/model/TitleModel'

export class RiphCtisClinicalTrialModelFactory {
  static create(source: RiphCtisDto): ClinicalTrialModel {
    return new ClinicalTrialModel(
      crypto.randomUUID(),
      '',
          {
            ctis: String(source.numero_ctis),
            riph: String(source.etude_id),
          } as Record<string, string>,
          new TitleModel('', ''),
          new TitleModel('', source.titre),
          new RecruitmentModel(
            source.etat ?? '',
            String(source.date_debut_recrutement ?? ''),
            source.sexe?.split(',').map((sexe: string) => sexe.trim()),
            source.tranches_age?.split(',').map((sexe: string) => sexe.trim()),
            [],
            -1,
            new CriteriaModel('', '', ''),
            new CriteriaModel('', '', ''),
            source.groupes_sujet ?? '',
            source.population_recrutement ?? ''
          ),
          new StudyTypeModel(source.phase_recherche ?? '', '', ''),
          '',
          new ContactModel(
            new ContactDetailsModel(
              ((source.contact_prenom ?? '') + ' ' + (source.contact_nom ?? '')).trim(),
              source.contact_prenom ?? '',
              source.contact_nom ?? '',
              source.organisme_adresse ?? '',
              source.organisme_ville ?? '',
              source.organisme_pays ?? '',
              source.organisme_code_postal ?? '',
              source.contact_telephone ?? '',
              source.contact_courriel ?? '',
              source.organisme_nom ?? '',
              '',
              '',
              ''
            ),
            new ContactDetailsModel('', '', '', '', '', '', '', '', '', '', '', '', '')
          ),
          source.pathologies_maladies_rares ?? '',
          source.informations_meddra?.split(',').map((sexe: string) => sexe.trim()),
          [new TherapeuticAreaModel(source.domaine_therapeutique ?? '', '')],
          new ContactDetailsModel('', '', '', '', '', '', '', '', '', '', '', '', ''),
          source.sites?.map((site) => {
            return new ContactDetailsModel(
              ((site.prenom ?? '') + ' ' + (site.nom ?? '')).trim(),
              site.prenom ?? '',
              site.nom ?? '',
              site.adresse ?? '',
              site.ville ?? '',
              '',
              '',
              '',
              '',
              site.organisme ?? '',
              '',
              site.titre ?? '',
              site.service ?? ''
            )
          }),
          '',
          '',
          source.portee_recherche ?? ''
    )

  }
}

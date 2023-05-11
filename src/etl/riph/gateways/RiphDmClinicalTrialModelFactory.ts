import crypto from 'crypto'

import { RiphDmDto } from './dto/RiphDmDto'
import { ClinicalTrialModel } from '../../../api/clinical-trial/gateways/model/ClinicalTrialModel'
import { ContactDetailsModel } from '../../../api/clinical-trial/gateways/model/ContactDetailsModel'
import { ContactModel } from '../../../api/clinical-trial/gateways/model/ContactModel'
import { CriteriaModel } from '../../../api/clinical-trial/gateways/model/CriteriaModel'
import { RecruitmentModel } from '../../../api/clinical-trial/gateways/model/RecruitmentModel'
import { StudyTypeModel } from '../../../api/clinical-trial/gateways/model/StudyTypeModel'
import { TherapeuticAreaModel } from '../../../api/clinical-trial/gateways/model/TherapeuticAreaModel'
import { TitleModel } from '../../../api/clinical-trial/gateways/model/TitleModel'

export class RiphDmClinicalTrialModelFactory {
  static create(source: RiphDmDto): ClinicalTrialModel {
    return new ClinicalTrialModel(
      crypto.randomUUID(),
      '',
          {
            numero_dossier: String(source.numero),
            numero_etude: String(source.etude_id),
            numero_national: String(source.numero_national),
          } as Record<string, string>,
          new TitleModel('', ''),
          new TitleModel('', source.titre_recherche),
          new RecruitmentModel(
            source.etat ?? '',
            String(source.date_creation_etude ?? ''),
            [],
            [],
            [],
            -1,
            new CriteriaModel('', '', ''),
            new CriteriaModel('', source.caracteristiques_recherche, ''),
            '',
            ''
          ),
          new StudyTypeModel(source.etat, '', ''),
          '',
          new ContactModel(
            new ContactDetailsModel(
              ((source.prenom ?? '') + ' ' + (source.nom ?? '')).trim(),
              source.prenom ?? '',
              source.nom ?? '',
              source.adresse ?? '',
              source.ville ?? '',
              source.pays ?? '',
              source.code_postal ?? '',
              '',
              source.courriel ?? '',
              source.organisme ?? '',
              '',
              '',
              ''
            ),
            new ContactDetailsModel('', '', '', '', '', '', '', '', '', '', '', '', '')
          ),
          '',
          [],
          [new TherapeuticAreaModel(source.domaine_therapeutique ?? '', '')],
          new ContactDetailsModel('', '', '', '', '', '', '', '', '', source.organisme, '', source.promoteur, ''),
          [],
          '',
          source.reglementation_code,
          source.qualification ?? ''
    )
  }
}

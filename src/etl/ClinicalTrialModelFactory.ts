import { RiphCtisDto } from './dto/RiphCtisDto'
import { RiphDmDto } from './dto/RiphDmDto'
import { RiphJardeDto } from './dto/RiphJardeDto'
import { Gender } from './traductions/Gender'
import { PrimaryAge } from './traductions/PrimaryAge'
import { RecruitmentStatus } from './traductions/RecruitmentStatus'
import { ClinicalTrialModel } from '../shared/models/ClinicalTrialModel'
import { ContactDetailsModel } from '../shared/models/ContactDetailsModel'
import { ContactModel } from '../shared/models/ContactModel'
import { CriteriaModel } from '../shared/models/CriteriaModel'
import { RecruitmentModel } from '../shared/models/RecruitmentModel'
import { StudyTypeModel } from '../shared/models/StudyTypeModel'
import { TherapeuticAreaModel } from '../shared/models/TherapeuticAreaModel'
import { TitleModel } from '../shared/models/TitleModel'

export class ClinicalTrialModelFactory {
  private static readonly unavailable = 'INDISPONIBLE'

  static fromRiphCtis(riphCtisDto: RiphCtisDto): ClinicalTrialModel {
    return new ClinicalTrialModel(
      this.unavailable,
      { ctis: riphCtisDto.numero_ctis },
      new TitleModel(this.unavailable, this.unavailable),
      new TitleModel(this.unavailable, riphCtisDto.titre),
      new RecruitmentModel(
        RecruitmentStatus[riphCtisDto.etat as keyof typeof RecruitmentStatus],
        this.emptyIfNull(riphCtisDto.date_debut_recrutement),
        this.emptyIfNull(riphCtisDto.sexe).split(',').map((sexe): Gender => Gender[sexe as keyof typeof Gender]),
        this.emptyIfNull(riphCtisDto.tranches_age).split(', ').map((age): PrimaryAge => PrimaryAge[age as keyof typeof PrimaryAge]),
        [this.unavailable],
        -1,
        new CriteriaModel(this.unavailable, this.unavailable, this.unavailable),
        new CriteriaModel(this.unavailable, this.unavailable, this.unavailable),
        this.emptyIfNull(riphCtisDto.groupes_sujet),
        this.emptyIfNull(riphCtisDto.population_recrutement).split(', ')
      ),
      new StudyTypeModel(this.emptyIfNull(riphCtisDto.phase_recherche), this.unavailable, this.unavailable),
      this.unavailable,
      new ContactModel(
        new ContactDetailsModel(
          this.emptyIfNull(riphCtisDto.organisme_nom),
          this.emptyIfNull(riphCtisDto.contact_prenom),
          this.emptyIfNull(riphCtisDto.contact_nom),
          this.emptyIfNull(riphCtisDto.organisme_adresse),
          this.emptyIfNull(riphCtisDto.organisme_ville),
          this.emptyIfNull(riphCtisDto.organisme_pays),
          this.emptyIfNull(riphCtisDto.organisme_code_postal),
          this.emptyIfNull(riphCtisDto.contact_telephone),
          this.emptyIfNull(riphCtisDto.contact_courriel),
          this.unavailable,
          this.unavailable,
          this.unavailable,
          this.unavailable
        ),
        new ContactDetailsModel(
          this.unavailable,
          this.unavailable,
          this.unavailable,
          this.unavailable,
          this.unavailable,
          this.unavailable,
          this.unavailable,
          this.unavailable,
          this.unavailable,
          this.unavailable,
          this.unavailable,
          this.unavailable,
          this.unavailable
        )
      ),
      this.emptyIfNull(riphCtisDto.pathologies_maladies_rares),
      this.emptyIfNull(riphCtisDto.informations_meddra).split(', '),
      [new TherapeuticAreaModel(this.emptyIfNull(riphCtisDto.domaine_therapeutique), this.unavailable)],
      new ContactDetailsModel(
        this.emptyIfNull(riphCtisDto.organisme_nom),
        this.emptyIfNull(riphCtisDto.contact_prenom),
        this.emptyIfNull(riphCtisDto.contact_nom),
        this.emptyIfNull(riphCtisDto.organisme_adresse),
        this.emptyIfNull(riphCtisDto.organisme_ville),
        this.emptyIfNull(riphCtisDto.organisme_pays),
        this.emptyIfNull(riphCtisDto.organisme_code_postal),
        this.emptyIfNull(riphCtisDto.contact_telephone),
        this.emptyIfNull(riphCtisDto.contact_courriel),
        this.unavailable,
        this.unavailable,
        this.unavailable,
        this.unavailable
      ),
      riphCtisDto.sites.map((site): ContactDetailsModel => {
        return new ContactDetailsModel(
          this.emptyIfNull(site.organisme),
          this.emptyIfNull(site.prenom),
          this.emptyIfNull(site.nom),
          this.emptyIfNull(site.adresse),
          this.emptyIfNull(site.ville),
          this.unavailable,
          this.unavailable,
          this.unavailable,
          this.unavailable,
          this.emptyIfNull(site.organisme),
          this.unavailable,
          this.emptyIfNull(site.titre),
          this.emptyIfNull(site.service)
        )
      }),
      this.unavailable,
      riphCtisDto.reglementation_code,
      this.unavailable
    )
  }

  static fromRiphDm(riphDmDto: RiphDmDto): ClinicalTrialModel {
    return new ClinicalTrialModel(
      this.unavailable,
      { national_number: riphDmDto.numero_national },
      new TitleModel(this.unavailable, this.unavailable),
      new TitleModel(this.unavailable, riphDmDto.titre_recherche),
      new RecruitmentModel(
        this.emptyIfNull(riphDmDto.etat),
        this.emptyIfNull(riphDmDto.date_creation_etude),
        [this.unavailable],
        [this.unavailable],
        [this.unavailable],
        -1,
        new CriteriaModel(this.unavailable, this.unavailable, this.unavailable),
        new CriteriaModel(this.unavailable, this.unavailable, this.unavailable),
        this.unavailable,
        [this.unavailable]
      ),
      new StudyTypeModel(this.unavailable, this.unavailable, this.unavailable),
      this.unavailable,
      new ContactModel(
        new ContactDetailsModel(
          this.emptyIfNull(riphDmDto.organisme),
          this.emptyIfNull(riphDmDto.prenom),
          this.emptyIfNull(riphDmDto.nom),
          this.emptyIfNull(riphDmDto.adresse),
          this.emptyIfNull(riphDmDto.ville),
          this.emptyIfNull(riphDmDto.pays),
          this.emptyIfNull(riphDmDto.code_postal),
          this.unavailable,
          this.emptyIfNull(riphDmDto.courriel),
          this.emptyIfNull(riphDmDto.organisme),
          this.unavailable,
          this.emptyIfNull(riphDmDto.promoteur),
          this.unavailable
        ),
        new ContactDetailsModel(
          this.unavailable,
          this.unavailable,
          this.unavailable,
          this.unavailable,
          this.unavailable,
          this.unavailable,
          this.unavailable,
          this.unavailable,
          this.unavailable,
          this.unavailable,
          this.unavailable,
          this.unavailable,
          this.unavailable
        )
      ),
      this.unavailable,
      [this.unavailable],
      [new TherapeuticAreaModel(this.emptyIfNull(riphDmDto.domaine_therapeutique), this.unavailable)],
      new ContactDetailsModel(
        this.emptyIfNull(riphDmDto.organisme),
        this.emptyIfNull(riphDmDto.prenom),
        this.emptyIfNull(riphDmDto.nom),
        this.emptyIfNull(riphDmDto.adresse),
        this.emptyIfNull(riphDmDto.ville),
        this.emptyIfNull(riphDmDto.pays),
        this.emptyIfNull(riphDmDto.code_postal),
        this.unavailable,
        this.emptyIfNull(riphDmDto.courriel),
        this.emptyIfNull(riphDmDto.organisme),
        this.unavailable,
        this.emptyIfNull(riphDmDto.promoteur),
        this.unavailable
      ),
      [],
      this.unavailable,
      riphDmDto.reglementation_code,
      this.emptyIfNull(riphDmDto.qualification)
    )
  }

  static fromRiphJarde(riphJardeDto: RiphJardeDto): ClinicalTrialModel {
    return new ClinicalTrialModel(
      this.unavailable,
      { national_number: this.emptyIfNull(riphJardeDto.numero_national) },
      new TitleModel(this.unavailable, this.unavailable),
      new TitleModel(this.unavailable, this.emptyIfNull(riphJardeDto.titre_recherche)),
      new RecruitmentModel(
        this.emptyIfNull(riphJardeDto.etat),
        this.emptyIfNull(riphJardeDto.date_creation_etude),
        [this.unavailable],
        [this.unavailable],
        [this.unavailable],
        -1,
        new CriteriaModel(this.unavailable, this.unavailable, this.unavailable),
        new CriteriaModel(this.unavailable, this.unavailable, this.unavailable),
        this.unavailable,
        [this.unavailable]
      ),
      new StudyTypeModel(this.unavailable, this.unavailable, this.unavailable),
      this.unavailable,
      new ContactModel(
        new ContactDetailsModel(
          this.emptyIfNull(riphJardeDto.organisme),
          this.emptyIfNull(riphJardeDto.prenom),
          this.emptyIfNull(riphJardeDto.nom),
          this.emptyIfNull(riphJardeDto.adresse),
          this.emptyIfNull(riphJardeDto.ville),
          this.emptyIfNull(riphJardeDto.pays),
          this.emptyIfNull(riphJardeDto.code_postal),
          this.unavailable,
          this.emptyIfNull(riphJardeDto.courriel),
          this.emptyIfNull(riphJardeDto.organisme),
          this.unavailable,
          this.emptyIfNull(riphJardeDto.promoteur),
          this.unavailable
        ),
        new ContactDetailsModel(
          this.unavailable,
          this.unavailable,
          this.unavailable,
          this.unavailable,
          this.unavailable,
          this.unavailable,
          this.unavailable,
          this.unavailable,
          this.unavailable,
          this.unavailable,
          this.unavailable,
          this.unavailable,
          this.unavailable
        )
      ),
      this.unavailable,
      [this.unavailable],
      [new TherapeuticAreaModel(this.emptyIfNull(riphJardeDto.domaine_therapeutique), this.unavailable)],
      new ContactDetailsModel(
        this.emptyIfNull(riphJardeDto.organisme),
        this.emptyIfNull(riphJardeDto.prenom),
        this.emptyIfNull(riphJardeDto.nom),
        this.emptyIfNull(riphJardeDto.adresse),
        this.emptyIfNull(riphJardeDto.ville),
        this.emptyIfNull(riphJardeDto.pays),
        this.emptyIfNull(riphJardeDto.code_postal),
        this.unavailable,
        this.emptyIfNull(riphJardeDto.courriel),
        this.emptyIfNull(riphJardeDto.organisme),
        this.unavailable,
        this.emptyIfNull(riphJardeDto.promoteur),
        this.unavailable
      ),
      [],
      this.unavailable,
      this.emptyIfNull(riphJardeDto.reglementation_code),
      this.emptyIfNull(riphJardeDto.qualification_recherche)
    )
  }

  private static emptyIfNull(fieldname: string): string {
    return fieldname ?? ''
  }
}

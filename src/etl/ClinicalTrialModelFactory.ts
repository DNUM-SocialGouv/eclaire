import { RiphCtisDto } from './dto/RiphCtisDto'
import { RiphDmDto } from './dto/RiphDmDto'
import { RiphJardeDto } from './dto/RiphJardeDto'
import { Category } from './traductions/Category'
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
      new TitleModel(this.unavailable, this.emptyIfNull(riphCtisDto.titre)),
      new RecruitmentModel(
        RecruitmentStatus[riphCtisDto.etat as keyof typeof RecruitmentStatus],
        this.emptyIfNull(riphCtisDto.date_debut_recrutement) ? this.getFrenchDate(riphCtisDto.date_debut_recrutement) : '',
        this.getGenders(this.emptyIfNull(riphCtisDto.sexe)),
        this.getAgesRange(this.emptyIfNull(riphCtisDto.tranches_age)),
        [this.unavailable],
        this.emptyNumberIfNull(riphCtisDto.taille_etude),
        new CriteriaModel(this.unavailable, this.unavailable, this.unavailable),
        new CriteriaModel(this.unavailable, this.unavailable, this.unavailable),
        this.emptyIfNull(riphCtisDto.groupes_sujet),
        this.getVulnerablePopulation(riphCtisDto.population_recrutement)
      ),
      new StudyTypeModel(
        this.emptyIfNull(riphCtisDto.phase_recherche),
        riphCtisDto.reglementation_code,
        this.unavailable,
        this.getCategory(riphCtisDto.intervention_faible)
      ),
      this.getMostRecentDate(this.emptyIfNull(riphCtisDto.historique), this.emptyIfNull(riphCtisDto.dates_avis_favorable_ms_mns)),
      this.getMostRecentDate(this.emptyIfNull(riphCtisDto.historique), this.emptyIfNull(riphCtisDto.dates_avis_favorable_ms_mns)),
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
      this.getMeddraCode(riphCtisDto.informations_meddra),
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
      this.unavailable
    )
  }

  static fromRiphDm(riphDmDto: RiphDmDto): ClinicalTrialModel {
    return new ClinicalTrialModel(
      this.unavailable,
      { national_number: riphDmDto.numero_national },
      new TitleModel(this.unavailable, this.unavailable),
      new TitleModel(this.unavailable, this.emptyIfNull(riphDmDto.titre_recherche)),
      new RecruitmentModel(
        RecruitmentStatus[riphDmDto.etat as keyof typeof RecruitmentStatus],
        this.emptyIfNull(riphDmDto.date_creation_etude) ? this.getFrenchDate(riphDmDto.date_creation_etude) : '',
        [this.unavailable],
        [this.unavailable],
        [this.unavailable],
        this.emptyNumberIfNull(riphDmDto.taille_etude),
        new CriteriaModel(this.unavailable, this.unavailable, this.unavailable),
        new CriteriaModel(this.unavailable, this.unavailable, this.unavailable),
        this.unavailable,
        [this.unavailable]
      ),
      new StudyTypeModel(
        this.unavailable,
        riphDmDto.reglementation_code,
        this.unavailable,
        this.emptyIfNull(riphDmDto.qualification)
      ),
      this.getMostRecentDate(this.emptyIfNull(riphDmDto.historique), this.emptyIfNull(riphDmDto.dates_avis_favorable_ms_mns)),
      this.getMostRecentDate(this.emptyIfNull(riphDmDto.historique), this.emptyIfNull(riphDmDto.dates_avis_favorable_ms_mns)),
      new ContactModel(
        new ContactDetailsModel(
          this.emptyIfNull(riphDmDto.deposant_organisme),
          this.emptyIfNull(riphDmDto.deposant_prenom),
          this.emptyIfNull(riphDmDto.deposant_nom),
          this.emptyIfNull(riphDmDto.deposant_adresse),
          this.emptyIfNull(riphDmDto.deposant_ville),
          this.emptyIfNull(riphDmDto.deposant_pays),
          this.emptyIfNull(riphDmDto.deposant_code_postal),
          this.unavailable,
          this.emptyIfNull(riphDmDto.deposant_courriel),
          this.emptyIfNull(riphDmDto.deposant_organisme),
          this.unavailable,
          this.emptyIfNull(riphDmDto.deposant_promoteur),
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
        this.emptyIfNull(riphDmDto.deposant_organisme),
        this.emptyIfNull(riphDmDto.deposant_prenom),
        this.emptyIfNull(riphDmDto.deposant_nom),
        this.emptyIfNull(riphDmDto.deposant_adresse),
        this.emptyIfNull(riphDmDto.deposant_ville),
        this.emptyIfNull(riphDmDto.deposant_pays),
        this.emptyIfNull(riphDmDto.deposant_code_postal),
        this.unavailable,
        this.emptyIfNull(riphDmDto.deposant_courriel),
        this.emptyIfNull(riphDmDto.deposant_organisme),
        this.unavailable,
        this.emptyIfNull(riphDmDto.deposant_promoteur),
        this.unavailable
      ),
      [],
      this.unavailable
    )
  }

  static fromRiphJarde(riphJardeDto: RiphJardeDto): ClinicalTrialModel {
    return new ClinicalTrialModel(
      this.unavailable,
      { national_number: this.emptyIfNull(riphJardeDto.numero_national) },
      new TitleModel(this.unavailable, this.unavailable),
      new TitleModel(this.unavailable, this.emptyIfNull(riphJardeDto.titre_recherche)),
      new RecruitmentModel(
        RecruitmentStatus[riphJardeDto.etat as keyof typeof RecruitmentStatus],
        this.emptyIfNull(riphJardeDto.date_creation_etude) ? this.getFrenchDate(riphJardeDto.date_creation_etude) : '',
        [this.unavailable],
        [this.unavailable],
        [this.unavailable],
        this.emptyNumberIfNull(riphJardeDto.taille_etude),
        new CriteriaModel(this.unavailable, this.unavailable, this.unavailable),
        new CriteriaModel(this.unavailable, this.unavailable, this.unavailable),
        this.unavailable,
        [this.unavailable]
      ),
      new StudyTypeModel(
        this.unavailable,
        riphJardeDto.reglementation_code,
        this.unavailable,
        this.emptyIfNull(riphJardeDto.qualification_recherche)
      ),
      this.getMostRecentDate(this.emptyIfNull(riphJardeDto.historique), this.emptyIfNull(riphJardeDto.dates_avis_favorable_ms_mns)),
      this.getMostRecentDate(this.emptyIfNull(riphJardeDto.historique), this.emptyIfNull(riphJardeDto.dates_avis_favorable_ms_mns)),
      new ContactModel(
        new ContactDetailsModel(
          this.emptyIfNull(riphJardeDto.deposant_organisme),
          this.emptyIfNull(riphJardeDto.deposant_prenom),
          this.emptyIfNull(riphJardeDto.deposant_nom),
          this.emptyIfNull(riphJardeDto.deposant_adresse),
          this.emptyIfNull(riphJardeDto.deposant_ville),
          this.emptyIfNull(riphJardeDto.deposant_pays),
          this.emptyIfNull(riphJardeDto.deposant_code_postal),
          this.unavailable,
          this.emptyIfNull(riphJardeDto.deposant_courriel),
          this.emptyIfNull(riphJardeDto.deposant_organisme),
          this.unavailable,
          this.emptyIfNull(riphJardeDto.deposant_promoteur),
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
        this.emptyIfNull(riphJardeDto.deposant_organisme),
        this.emptyIfNull(riphJardeDto.deposant_prenom),
        this.emptyIfNull(riphJardeDto.deposant_nom),
        this.emptyIfNull(riphJardeDto.deposant_adresse),
        this.emptyIfNull(riphJardeDto.deposant_ville),
        this.emptyIfNull(riphJardeDto.deposant_pays),
        this.emptyIfNull(riphJardeDto.deposant_code_postal),
        this.unavailable,
        this.emptyIfNull(riphJardeDto.deposant_courriel),
        this.emptyIfNull(riphJardeDto.deposant_organisme),
        this.unavailable,
        this.emptyIfNull(riphJardeDto.deposant_promoteur),
        this.unavailable
      ),
      [],
      this.unavailable
    )
  }

  private static getVulnerablePopulation(populationRecrutement: string): string[] {
    return this.emptyIfNull(populationRecrutement) === '' ? [] : populationRecrutement.split(', ')
  }

  private static getMeddraCode(informationsMeddra: string): string[] {
    return this.emptyIfNull(informationsMeddra) === '' ? [] : informationsMeddra.split(', ')
  }

  private static getGenders(gender: string): Gender[] {
    if (gender !== '') {
      return gender.split(',').map((sexe): Gender => Gender[sexe as keyof typeof Gender])
    }

    return []
  }

  private static getAgesRange(agesRange: string): PrimaryAge[] {
    if (agesRange !== '') {
      return agesRange.split(', ').map((age): PrimaryAge => PrimaryAge[age as keyof typeof PrimaryAge])
    }

    return []
  }

  private static getFrenchDate(date: string): string {
    return new Date(date).toLocaleDateString('fr-FR')
  }

  private static getMostRecentDate(datesOfHistory: string, datesOfApproval: string): string {
    if (datesOfHistory === '' && datesOfApproval === '') return ''

    const sortBy = (a: string, b: string) => {
      const valueA = a
      const valueB = b

      return valueB < valueA ? -1 : valueB > valueA ? 1 : 0
    }
    const dates: string[] = []
    if (datesOfHistory !== '') {
      datesOfHistory.split(', ').forEach((dateOfHistory) => {
        const date = dateOfHistory.split(':')

        dates.push(date[0])
      })
    }

    if (datesOfApproval !== '') {
      datesOfApproval.split(', ').forEach((dateOfApproval) => {
        const date = dateOfApproval.split(':')

        dates.push(date[1])
      })
    }

    return this.getFrenchDate(dates.sort(sortBy)[0])
  }

  private static getCategory(lowIntervention: string): string {
    if (lowIntervention === 'Yes') {
      return Category.Yes
    } else if (lowIntervention === 'No') {
      return Category.No
    }

    return ''
  }

  private static emptyIfNull(value: string): string {
    return value === null ? '' : value
  }

  private static emptyNumberIfNull(value: number): number {
    return value === null ? -1 : value
  }
}

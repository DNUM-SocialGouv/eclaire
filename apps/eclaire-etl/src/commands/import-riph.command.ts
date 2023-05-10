import { Command, CommandRunner } from 'nest-commander'

@Command({
  description: "Import data from riph's json export",
  name: 'import-riph',
  options: { isDefault: true },
})
export class ImportRiphCommand extends CommandRunner {
  constructor() {
    super()
  }

  async run(): Promise<void> {
    this.runDefault()
  }

  runDefault(): void {
    console.log('test runDefault')
  }
}

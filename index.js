const { promisify } = require('util')
const child = require('child_process')
const reader = require('./reader')
const utils = require('./utils')
const configs = require('./configs')
const chalk = require('chalk')
const inquirer = require('inquirer')


const run = async () => {
  try {
    const dockerPs = await utils.exec(['docker', 'ps', '-a', '--format', `'{{.Names}}\t{{.Image}}'`])
    const dockerImages = await utils.exec(['docker', 'images', '--format', `'{{.Repository}}\t{{.Tag}}'`])
    const options = [
      {
        type: 'list',
        name: 'options',
        message: 'What size do you need?',
        choices: [
          '1 - Buildar a imagem em modo de desenvolvimento',
          '2 - Subir o container em modo de desenvolvimento',
          '3 - Buildar a imagem em modo de produção',
          '4 - Subir o container em modo de produção',
          '0 - SAIR'
        ]
      }
    ]
    const resposta = await inquirer.prompt(options)
    const nr = parseInt(resposta.options)
    const mode = nr === 1 || nr === 2 ? 'dev' : 'prod'
    // const names = configs[mode]
    let project

    switch (nr) {
      case 1:
        project = await utils.chooseProject()
        console.log(chalk.yellow(chalk.bold('Iniciando processo de build.')))
        console.log(chalk.yellow('Aguarde...'))
        await utils.checkContainer(dockerPs, project, mode)
        await utils.checkImage(dockerImages, project, mode)
        console.log(chalk.green(chalk.bold('Aeehooo!! Vou buildar a imagem!')))
        console.log(chalk.yellow('Isso pode demorar um pouco. Aguarde...'))
        await utils.dockerBuild(project, mode)
        run()
        break;
      case 2:
        project = await utils.chooseProject()
        console.log('Vou rodar a imagem.')
        console.log('Só vou verificar umas coisas antes. Aguarde!')
        await utils.checkContainer(dockerPs, project, mode)
        console.log('Aeehooo!! Vou rodar o container')
        console.log(chalk.yellow('Isso pode demorar um pouco. Aguarde...'))
        await utils.dockerRun(project, mode)
        run()
        break;
      case 3:
        project = await utils.chooseProject()
        console.log(chalk.yellow(chalk.bold('Iniciando processo de build.')))
        console.log(chalk.yellow('Aguarde...'))
        await utils.checkContainer(dockerPs, project, mode)
        await utils.checkImage(dockerImages, project, mode)
        console.log(chalk.green(chalk.bold('Aeehooo!! Vou buildar a imagem!')))
        console.log(chalk.yellow('Isso pode demorar um pouco. Aguarde...'))
        await utils.dockerBuild(project, mode)
        run()
        break;
      case 4:
        project = await utils.chooseProject()
        console.log('Vou rodar a imagem.')
        console.log('Só vou verificar umas coisas antes. Aguarde!')
        await utils.checkContainer(dockerPs, project, mode)
        console.log('Aeehooo!! Vou rodar o container')
        console.log(chalk.yellow('Isso pode demorar um pouco. Aguarde...'))
        await utils.dockerRun(project, mode)
        run()
        break;
      case 0:
        break;
      default:

    }
  } catch (e) {
    console.error(chalk.red(e))
  }
}

run()

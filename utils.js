const _exec = require('child_process').exec
const configs = require('./configs')
const chalk = require('chalk')
const reader = require('./reader')
const inquirer = require('inquirer')

const exec = (arg) => {
  return new Promise((resolve, reject) => {
    _exec(arg.join(' '), {maxBuffer: 1024 * 500}, (err, stdout, stderr) => {
      if(err) {
        reject(err)
      }else {
        resolve(stdout)
      }
    })
  })
}

const checkContainer = async (str, project, mode) => {
  try {
    let conf = project[mode]
    const ps = str.split('\n')
                  .filter(x => x)
                  .map(x => {
                    let columns = x.split('\t')
                    return {
                      imageName: columns[1],
                      containerName: columns[0]
                    }
                  })
                  .filter(x => x.containerName === conf.containerName)
    if (ps.length) {
      console.log('Container encontrado. Vou excluir ele para você!')
      await exec(['docker', 'rm', '--force', conf.containerName])
    }
  } catch (e) {
    console.error(e)
  }
}

const checkImage = async (str, project, mode) => {
  try {
    let conf = project[mode]
    const ps = str.split('\n')
                  .filter(x => x)
                  .map(x => {
                    let columns = x.split('\t')
                    return {
                      imageName: columns[0],
                      tag: columns[1]
                    }
                  })
                  .filter(x => x.imageName === conf.containerName)
    if (ps.length) {
      console.log('Imagem encontrada. Vou excluir ela para você!')
      await exec(['docker', 'rmi', conf.imageName])
    }
  } catch (e) {
    console.error(e)
  }
}

const chooseProject = async () => {
  console.log(chalk.green(chalk.bold('Escolha o projeto:')))
  const options = [
    {
      type: 'list',
      name: 'options',
      message: 'What size do you need?',
      choices: configs.map((x, idx) => `${idx + 1} - ${x.name}`)
    }
  ]
  const resposta = await inquirer.prompt(options)
  const nr = parseInt(resposta.options)
  // configs.forEach((config, idx) => {
  //   console.log(chalk.yellow(`${idx + 1} - ${config.name}`))
  // })
  // const resposta = parseInt(await reader.question('Escolha uma opção: '))
  return configs[nr - 1]
}

const dockerBuild = async (project, mode) => {
  try {
    console.log(await exec(['docker', 'build', '-t', `${project[mode].imageName}`, `${project.location}/${mode}/.`]))
  } catch (e) {
    console.error(e)
  }
}

const dockerRun = async (project, mode) => {
  try {
    let params = []
    if (project[mode].options.volume) {
      params = ['docker', 'run', '-d', '-v', `${project[mode].options.volume}`, '-ti', '--name', `${project[mode].containerName}`, '-m', `${project[mode].options.memory}`, '-p', `${project[mode].options.port}`, '--cpus', `${project[mode].options.cpus}`, `${project[mode].imageName}`]
    } else {
       params = ['docker', 'run', '-d', '-ti', '--name', `${project[mode].containerName}`, '-m', `${project[mode].options.memory}`, '-p', `${project[mode].options.port}`, '--cpus', `${project[mode].options.cpus}`, `${project[mode].imageName}`]
    }
    console.log(await exec(params))
  } catch (e) {
    console.error(e)
  }
}

const stopContainer = async (project, mode) => {
  try {
    const containerName = project[mode].containerName
    let params = ['docker', 'stop', containerName]
    console.log(await exec(params))
  } catch (e) {
    console.error(e)
  }
}

const startContainer = async (project, mode) => {
  try {
    const containerName = project[mode].containerName
    let params = ['docker', 'start', containerName]
    console.log(await exec(params))
  } catch (e) {
    console.error(e)
  }
}

const restartContainer = async (project, mode) => {
  try {
    const containerName = project[mode].containerName
    let params = ['docker', 'restart', containerName]
    console.log(await exec(params))
  } catch (e) {
    console.error(e)
  }
}

module.exports = {
  exec,
  checkContainer,
  checkImage,
  chooseProject,
  dockerBuild,
  dockerRun,
  stopContainer,
  startContainer,
  restartContainer
}

const path = `${process.cwd()}/projects`
const configs = [
  {
    name: 'api-gateway',
    location: `${path}/api-gateway`,
    dev: {
      imageName: 'api-gateway-dev:0.0.1',
      containerName: 'api-gateway-dev',
      options: {
        memory: '512m',
        port: '80:80',
        cpus: '.25',
        volume: `${path}/api-gateway/dev/dev.conf:/etc/nginx/conf.d/default.conf`
      }
    },
    prod: {
      imageName: 'api-gateway:0.0.1',
      containerName: 'api-gateway',
      options: {
        memory: '512m',
        port: '80:80',
        cpus: '.25'
      }
    }
  },
  {
    name: 'funcionario-service',
    location: `${path}/funcionario-service`,
    dev: {
      imageName: 'funcionario-service-dev:0.0.1',
      containerName: 'funcionario-service-dev',
      options: {
        memory: '512m',
        port: '3001:3000',
        cpus: '.25',
        volume: '/home/operador/Documents/projetos/web/planos/funcionario-service:/home/node/funcionario-service'
      }
    },
    prod: {
      imageName: 'funcionario-service:0.0.1',
      containerName: 'funcionario-service',
      options: {
        memory: '512m',
        port: '3001:3000',
        cpus: '.25'
      }
    }
  }
]

module.exports = configs

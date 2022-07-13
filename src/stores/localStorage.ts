import Storage from 'vue-ls'

const options = {
    namespace: 'todoapp_',
    name: 'ls',
    storage: 'local'
}

const { ls } = Storage.useStorage(options)

export default ls

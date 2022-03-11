import axios from "axios"

const tasks = {
    namespaced: true,
    state: {
        tasks: []
    }, 
    mutations: {
        SET_TASKS(state, data) {
            state.tasks = data
        }
    },
    actions: {
        load({commit}) {
            axios
                .get("http://localhost:3000/tasks")
                .then(response => {
                    commit('SET_TASKS', response.data)
                })
                .catch(error => console.table(error))
        }
    }
}

export default tasks
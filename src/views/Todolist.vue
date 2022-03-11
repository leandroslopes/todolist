<template>
  
  <div class="todolist">
    
    <v-text-field
      v-model="newTaskTitle"
      @click:append="add"
      @keyup.enter="add" 
      class="pa-3"
      outlined label="Ir ao supermercado" 
      append-icon="mdi-plus"
      hide-details
      clearable
    >
    </v-text-field>
    
    <div>
      <v-list class="pt-0" flat>
      
        <div v-for="task in tasks.tasks" :key="task.id">
          
          <v-list-item @click="done(task.id)" :class="{ 'blue lighten-5': task.done }">
            <template v-slot:default>
              <v-list-item-action>
                <v-checkbox :input-value="task.done"></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title :class="{ 'text-decoration-line-through': task.done }">
                  {{ task.title }}
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn @click.stop="del(task.id)" icon>
                  <v-icon color="primary lighten-1">mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider></v-divider>
        
        </div>
    
      </v-list>

    </div>

    <!-- <div class="mt-16 animate__animated animate__bounceInUp" v-else>

      <center>

        <v-icon
          size="100"
          color="primary"
        >
          mdi-check
        </v-icon>

      <div
        class="text-h5 primary--text"
      >
        Não há tarefa
      </div>

      </center>
      

    </div> -->

  </div>

</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "Todolist",
  data() {
    return {
      newTaskTitle: '',
      //tasks: []
    };
  },
  computed: {
    ...mapState([
      'tasks'
    ])
  },
  mounted() {
    this.$store.dispatch('tasks/load')
  },
  methods: { 
    add() {
      let newTask = {
        id: Date.now(),
        title: this.newTaskTitle,
        done: false
      }
      this.tasks.push(newTask)
      this.newTaskTitle = ''
    },
    done(id) {
      let task = this.tasks.filter((task) => task.id === id)[0];
      task.done = !task.done;
    },
    del(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    }
  },
};
</script>
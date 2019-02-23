<template>
  <v-app id="app">
    <v-toolbar app>vue-esc 2.0.0 Memory Leak Example</v-toolbar>
    <v-content>
      <v-container fluid>
        <v-alert :value="true" type="info">
          <p>To see the memory leak occur, open the Chrome Task Manager and then click the hide/show button 50 or so times.
            <br>
            You should notice the memory continue to increase and not be reclaimed.
          </p>
          <p>
            Also, open a dialog by clicking on of the button and then hit the <code>ESC</code> key to close it.
            <br>
            You can notice how many times the v-esc callback function was called.
          </p>
        </v-alert>
        <v-card>
          <v-container fluid>
            <v-sparkline 
              :value="memoryHistory" 
              :gradient="['#f72047', '#ffd200', '#1feaea']"
              :smooth="16"
              :line-width="1"
              :height="50"
              auto-draw 
              stroke-linecap="round"
            ></v-sparkline>
          </v-container>
          <ul>
            <li>
              <b>Memory used:</b>
              {{ Number(memory).toFixed(3) }} MB
            </li>
            <li>
              <b>keyup listeners currently on document:</b>
              <i>In the Chrome DevTools Console, type: </i><code>window.getEventListeners(document).keyup.length</code>
            </li>
          </ul>
        </v-card>

        <v-card>
          <v-btn 
            ref="showAll"
            v-if="!(show1 && show2 && show3 && show4 && show5)"
            @click="showAll"
            @hook:updated="() => $refs.showAll.$el.focus()"
          >Show all</v-btn>
          <v-btn 
            ref="hideAll"
            v-if="show1 || show2 || show3 || show4 || show5"
            @click="hideAll"
            @hook:updated="() => $refs.hideAll.$el.focus()"
          >Hide all</v-btn>
          <br>
          <v-btn @click="() => show1=!show1">{{ show1 ? "Hide" : "Show" }} 1</v-btn>
          <v-btn @click="() => show2=!show2">{{ show2 ? "Hide" : "Show" }} 2</v-btn>
          <v-btn @click="() => show3=!show3">{{ show3 ? "Hide" : "Show" }} 3</v-btn>
          <v-btn @click="() => show4=!show4">{{ show4 ? "Hide" : "Show" }} 4</v-btn>
          <v-btn @click="() => show5=!show5">{{ show5 ? "Hide" : "Show" }} 5</v-btn>
        </v-card>

        <v-container fluid>
          <v-layout row wrap>
            <MyComponent v-if="show1" tile></MyComponent>
            <MyComponent v-if="show2" tile></MyComponent>
            <MyComponent v-if="show3" tile></MyComponent>
            <MyComponent v-if="show4" tile></MyComponent>
            <MyComponent v-if="show5" tile></MyComponent>
          </v-layout>
        </v-container>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import MyComponent from './MyComponent.vue'

export default {
  components: {
    MyComponent
  },
  data: function () {
    return {
      show1: true,
      show2: true,
      show3: true,
      show4: true,
      show5: true,
      memory: NaN,
      memoryHistory: [0, 0]
    }
  },
  mounted: function() {
    setInterval(() => {
      this.refreshStats()
      if (this.memory) this.memoryHistory.push(this.memory)
    }, 2000);
  },
  methods: {
    showAll: function () {
      this.show1 = true
      this.show2 = true
      this.show3 = true
      this.show4 = true
      this.show5 = true
      this.$nextTick(() => {
        this.refreshStats()
      })
    },
    hideAll: function () {
      this.show1 = false
      this.show2 = false
      this.show3 = false
      this.show4 = false
      this.show5 = false
      this.$nextTick(() => {
        this.refreshStats()
      })
    },
    refreshStats: function () {
      if (!window.performance) return
      if (window.gc) window.gc()  // start chrome with --js-flags="--expose-gc"
      this.memory = window.performance.memory.usedJSHeapSize / 1024 / 1024
    }
  }
}
</script>

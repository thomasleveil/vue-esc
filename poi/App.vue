<template>
  <div id="app">
    <h3>vue-esc 2.0.0 Memory Leak Example</h3>
    <p>To see the memory leak occur, open the Chrome Task Manager and then click the hide/show button 50 or so times.</p>
    <p>You should notice the memory continue to increase and not be reclaimed.</p>
    <ul>
      <li>
        <b>Memory used:</b>
        {{ memory }} Mo
      </li>
      <li>
        <b>keyup listeners currently on document:</b>
        <i>In the Chrome DevTools Console, type: </i><code>window.getEventListeners(document).keyup.length</code>
      </li>

      
      <li>vue-esc callback1 has been called {{ escCount1 }} times</li>
      <li>vue-esc callback2 has been called {{ escCount2 }} times</li>
      <li>vue-esc callback3 has been called {{ escCount3 }} times</li>
      <li>vue-esc callback4 has been called {{ escCount4 }} times</li>
      <li>vue-esc callback5 has been called {{ escCount5 }} times</li>
    </ul>
    <hr>

    <button v-if="showHuge" @click="hide">Hide</button>
    <button v-if="!showHuge" @click="show">Show</button>

    <div v-if="showHuge">
      <huge v-esc="() => onEsc1()"></huge>
      <huge v-esc="() => onEsc2()"></huge>
      <huge v-esc="() => onEsc3()"></huge>
      <huge v-esc="() => onEsc4()"></huge>
      <huge v-esc="() => onEsc5()"></huge>
    </div>
  </div>
</template>

<script>
import HugeComponent from './Huge.vue'

export default {
  components: {
    'huge': HugeComponent
  },
  data: function () {
    return {
      showHuge: true,
      escCount1: 0,
      escCount2: 0,
      escCount3: 0,
      escCount4: 0,
      escCount5: 0,
      memory: NaN
    }
  },
  mounted: function() {
    this.refreshStats()
  },
  methods: {
    show: function () {
      this.showHuge = true
      this.$nextTick(() => {
        this.refreshStats()
      })
    },
    hide: function () {
      this.showHuge = false
      this.refreshStats()
    },
    onEsc1: function () {
      this.escCount1++
    },
    onEsc2: function () {
      this.escCount2++
    },
    onEsc3: function () {
      this.escCount3++
    },
    onEsc4: function () {
      this.escCount4++
    },
    onEsc5: function () {
      this.escCount5++
    },
    refreshStats: function () {
      this.memory = window.performance ? Number(window.performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(3) : NaN
    }
  }
}
</script>



<template>
  <v-card>
    <v-card-title class="headline">MyComponent.vue</v-card-title>
    <v-card-text>
      <p>onEscape call counter: {{ callbackCount }}</p>

      <v-dialog
        v-esc="() => onEscape()"
        v-model="show_dialog"
        width=500
      >
        <div slot="activator">
          <v-btn>click to open dialog</v-btn>
        </div>

        <v-card>
          <h1 :data-foo="`x`.repeat(1024*1024)">This is huge</h1>
          <p>you can use the <code>ESC</code> key to close this dialog</p>
        </v-card>
      </v-dialog>
    </v-card-text>
  </v-card>
</template>

<script>

export default {
  data: function() {
    return {
      show_dialog: false,
      callbackCount: 0
    };
  },
  methods: {
    onEscape: function() {
      console.info("onEscape", this);
      this.callbackCount++;
      this.show_dialog = false;
    }
  }
};
</script>

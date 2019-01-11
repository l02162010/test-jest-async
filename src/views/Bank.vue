<template>
  <div class="bank">
    {{balance}}
    <button class="deposit" @click="deposit">存錢</button>
    <button class="withdraw" @click="withdraw">領錢</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "bank",
  data() {
    return {
      balance: 10,
      money: 0
    };
  },
  methods: {
    async deposit() {
      const response = await axios.get("mock/service");
      if (typeof this.money === "number" && this.money >= 0) {
        this.balance += response.data;
      }
    },
    async withdraw() {
      const response = await axios.get("mock/service");
      var result = /^\d+/.test(this.money);
      if (result && this.money <= this.balance) {
        this.balance -= response.data;
      }
    }
  }
};
</script>

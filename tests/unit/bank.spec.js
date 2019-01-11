import { shallowMount } from "@vue/test-utils";
import Bank from "@/views/Bank.vue";
//https://github.com/ctimmerm/axios-mock-adapter
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
let mock = new MockAdapter(axios);

describe("Bank.vue", () => {
  const wrapper = shallowMount(Bank);
  beforeEach(() => {
    wrapper.vm.balance = 10;
  });

  it("原本帳戶有 10 元，存入 5 元之後，帳戶餘額變 15 元", async () => {
    wrapper.find("button.deposit").trigger("click");
    mock.onGet("/mock/service").reply(200, { data: 5 });
    await axios.get("/mock/service");
    expect(wrapper.vm.balance).toBe(15);
  });

  it("原本帳戶有 10 元，存入 -5 元之後，帳戶餘額還是 10 元（不能存入小於等於零的金額）", () => {
    // 操作的錢
    wrapper.vm.money = -5;
    // 存錢的按鈕
    wrapper.find("button.deposit").trigger("click");
    // 期待結餘為10
    expect(wrapper.vm.balance).toBe(10);
  });

  it("原本帳戶有 10 元，存入 aa 元之後，帳戶餘額還是 10 元（得是數字）", () => {
    // 操作的錢
    wrapper.vm.money = "aa";
    // 存錢的按鈕
    wrapper.find("button.deposit").trigger("click");
    // 期待結餘為10

    expect(wrapper.vm.balance).toBe(10);
  });

  it("原本帳戶有 10 元，領出 5 元之後，帳戶餘額變 5 元", async () => {
    // 操作的錢
    wrapper.vm.money = 5;
    // 領錢的按鈕
    wrapper.find("button.withdraw").trigger("click");
    mock.onGet("/mock/service").reply(200, { data: 5 });
    await axios.get("/mock/service");
    expect(wrapper.vm.balance).toBe(5);
  });

  it("原本帳戶有 10 元，試圖領出 20 元，帳戶餘額還是 10 元，但無法領出（餘額不足）", () => {
    // 原本有10元
    expect(wrapper.vm.balance).toBe(10);
    // 操作的錢
    wrapper.vm.money = 20;
    // 領錢的按鈕
    wrapper.find("button.withdraw").trigger("click");
    // 期待結餘為10
    expect(wrapper.vm.balance).toBe(10);
  });

  it("原本帳戶有 10 元，領出 -5 元之後，帳戶餘額還是 10 元（不能領出小於或等於零的金額）", () => {
    // 原本有10元
    expect(wrapper.vm.balance).toBe(10);
    // 操作的錢
    wrapper.vm.money = -5;
    // 領錢的按鈕
    wrapper.find("button.withdraw").trigger("click");
    // 期待結餘為10
    expect(wrapper.vm.balance).toBe(10);
  });

  it("原本帳戶有 10 元，領出 aa 元之後，帳戶餘額還是 10 元（得是數字）", () => {
    // 操作的錢
    wrapper.vm.money = "aa";
    // 領錢的按鈕
    wrapper.find("button.withdraw").trigger("click");
    // 期待結餘為10
    expect(wrapper.vm.balance).toBe(10);
  });
});
// 存錢功能
// 原本帳戶有 10 元，存入 5 元之後，帳戶餘額變 15 元
// 原本帳戶有 10 元，存入 -5 元之後，帳戶餘額還是 10 元（不能存入小於等於零的金額）
// 領錢功能
// 原本帳戶有 10 元，領出 5 元之後，帳戶餘額變 5 元
// 原本帳戶有 10 元，試圖領出 20 元，帳戶餘額還是 10 元，但無法領出（餘額不足）
// 原本帳戶有 10 元，領出 -5 元之後，帳戶餘額還是 10 元（不能領出小於或等於零的金額）

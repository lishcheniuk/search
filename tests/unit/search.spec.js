import { shallowMount } from "@vue/test-utils";
import Search from "@/components/Search.vue";
import mock from "@/mock-data";

describe("Search.vue", () => {
  const wrapper = shallowMount(Search, {
    props: { data: mock },
  });

  it("очищается ли инпут, при клике на кнопку search__clear", () => {
    wrapper.find(".search__clear").trigger("click");

    expect(wrapper.vm.searchValue).toBe("");
    expect(wrapper.vm.isVisibleList).toBeFalsy();
    expect(wrapper.vm.activeListItem).toBe(0);
  });

  it("отображается ли выпадающий список, при вводе значения в инпут", async () => {
    const input = wrapper.find(".search__input");
    input.element.value = "андрей";
    await input.trigger("input");

    expect(wrapper.find(".search__item").exists()).toBe(true);
  });

  it("при клике по элементу выпадающего списка, устанавливается ли инпуту его значение", async () => {
    const input = wrapper.find(".search__input");
    input.setValue("сергей");
    await input.trigger("input");
    wrapper.find(".search__item").trigger("click");

    expect(wrapper.vm.searchValue).toBe("Сергей");
  });
});

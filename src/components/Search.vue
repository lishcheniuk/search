<template>
  <h2>Поиск</h2>

  <div class="search__group">
    <span class="material-icons search__icon" @click="search">search</span>
    <input
      class="search__input"
      type="text"
      placeholder="Введите поисковый запрос"
      :value="searchValue"
      @input="inputHandler"
      @keyup="keyupHandler"
      @focus="isVisibleList = true"
      @click.stop
    />
    <span class="search__clear" @click="select('')">&times;</span>

    <ul
      class="search__list"
      v-if="isVisibleList && searchValue && getSearchResult.length"
    >
      <li
        class="search__item"
        v-for="(s, index) of getSearchResult"
        :key="s.id"
        @click="select(s.name)"
        @mouseenter="activeListItem = index"
        :class="{ 'search__item--active': index === activeListItem }"
      >
        {{ s.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Search",
  props: {
    data: Array,
  },

  data() {
    return {
      searchValue: "",
      isVisibleList: false,
      activeListItem: 0,
    };
  },

  computed: {
    getSearchResult() {
      const result = [];

      for (let i = 0; i < this.data.length; i++) {
        if (
          this.data[i].name
            .toLowerCase()
            .includes(this.searchValue.toLowerCase())
        ) {
          result.push(this.data[i]);
          if (result.length === 6) break;
        }
      }
      return result;
    },
  },

  methods: {
    select(value) {
      this.searchValue = value;
      this.activeListItem = 0;
    },

    inputHandler(event) {
      if (!this.isVisibleList) this.isVisibleList = true;
      this.searchValue = event.target.value.trim();
    },
    keyupHandler(event) {
      switch (event.key) {
        case "ArrowDown":
          this.activeListItem =
            this.activeListItem >= this.getSearchResult.length - 1
              ? 0
              : this.activeListItem + 1;
          return;
        case "ArrowUp":
          this.activeListItem =
            this.activeListItem <= 0
              ? this.getSearchResult.length - 1
              : this.activeListItem - 1;
          return;
        case "Enter":
          this.select(this.getSearchResult[this.activeListItem].name);
          this.isVisibleList = false;
      }
    },
    search() {
      console.log(this.searchValue);
    },
  },
};
</script>

<style scoped lang="scss">
$color_grey: grey;

.search {
  &__group {
    display: inline-block;
    position: relative;
    margin-left: 20px;
  }

  &__icon {
    cursor: pointer;
    position: absolute;
    left: 2px;
    top: 50%;
    transform: translateY(-50%);
  }

  &__input {
    font-size: 16px;
    padding: 7px 30px;
    width: 300px;
    box-shadow: 0 0 5px $color_grey;
    border: none;

    &:focus {
      outline: none;
    }
  }

  &__clear {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    padding: 5px;
  }

  &__list {
    position: absolute;
    top: calc(100% + 2px);
    left: 0;
    right: 0;
    list-style-type: none;
    box-shadow: 0 0 5px $color_grey;
    background-color: #fff;
    padding-top: 2px;
  }

  &__item {
    padding: 7px 10px;
    &--active {
      background-color: lighten($color_grey, 10);
      cursor: pointer;
      color: #fff;
    }
  }
}
</style>

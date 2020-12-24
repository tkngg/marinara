<template>
  <div class="row">
    <div class="col-4">
      <h3>Context #1</h3>

      <draggable
        id="first"
        data-source="juju"
        :list="list"
        class="list-group"
        draggable=".item"
        group="a">

        <div
          class="list-group-item item"
          v-for="element in list"
          :key="element.name">
          {{ element.name }}
        </div>

        <div
          slot="header"
          class="btn-group list-group-item"
          role="group"
          aria-label="Basic example">
          <button class="btn btn-secondary" @click="add">Add</button>
          <button class="btn btn-secondary" @click="replace">Replace</button>
        </div>
      </draggable>
    </div>

    <div class="col-4">
      <h3>Context #2</h3>

      <draggable :list="list2" class="list-group" draggable=".item" group="a">
        <div
          class="list-group-item item"
          v-for="element in list2"
          :key="element.name">
          {{ element.name }}
        </div>

        <div
          slot="header"
          class="btn-group list-group-item"
          role="group"
          aria-label="Basic example">
          <button class="btn btn-secondary" @click="add2">Add</button>
          <button class="btn btn-secondary" @click="replace2">Replace</button>
        </div>
      </draggable>
    </div>

    <rawDisplayer class="col-2" :value="list" title="List" />

    <rawDisplayer class="col-2" :value="list2" title="List2" />
  </div>
</template>

<style lang="scss">
.col-4, .col-2{
    position: relative;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
}    
.row {
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -150px;
    margin-left: -15px;
    flex-direction: row;
}
.col-4 {
    -ms-flex: 0 0 33.333333%;
    -webkit-box-flex: 0;
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
}
.list-group {
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-direction: column;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
    min-height: 20px;
}
.item {
    background-color: #fbfbfd;
    border: 1px solid #f0f0f7;
    cursor: grab;
    touch-action: manipulation;
    margin: 0.5rem 0px;
    padding: 0.8rem 0.6rem 0;
    overflow: visible;
    box-shadow: none;
    width: 13rem;
    height: 2.2rem;
    -webkit-tap-highlight-color: #FFF;    
    text-align: center;
}

</style>

<script>
import draggable from "vuedraggable";
let id = 1;
export default {
  name: "two-list-headerslots",
  display: "Two list header slot",
  order: 14,
  components: {
    draggable
  },
  data() {
    return {
      list: [
        { name: "John 1", id: 0 },
        { name: "Joao 2", id: 1 },
        { name: "Jean 3", id: 2 }
      ],
      list2: [{ name: "Jonny 4", id: 3 }, { name: "Guisepe 5", id: 4 }]
    };
  },
  methods: {
    add: function() {
      this.list.push({ name: "Juan " + id, id: id++ });
    },
    replace: function() {
      this.list = [{ name: "Edgard", id: id++ }];
    },
    add2: function() {
      this.list2.push({ name: "Juan " + id, id: id++ });
    },
    replace2: function() {
      this.list2 = [{ name: "Edgard", id: id++ }];
    }
  }
};
</script>

<template>
  <div class="row">

    <carousel-3d>
        <slide v-for="(task, i) in tasks" :index="i" :key="i">
            <template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
                <h4>{{ task.name }}</h4>
                <div>{{ task.desc }}</div>
                <button @click="onClickTask"></button>
                <img :data-index="index" :class="{ current: isCurrent, onLeft: (leftIndex >= 0), onRight: (rightIndex >= 0) }" :src="task.src">
            </template>
        </slide>
    </carousel-3d>
    
    <div class="col-4">
      <h3>Current Context</h3>

      <draggable
        id="first"
        data-source="juju"
        :list="list"
        class="list-group"
        draggable=".item"
        group="a">

        <div
          class="list-group-item left-item item"
          v-for="element in list"
          :key="element.name">
          <span class="tab-icon" :style="{ backgroundImage: 'url(' + element.favIconUrl + ')' }"></span>
          <span class="tab-title">{{ element.name }}</span>
        </div>

        <div
          slot="header"
          class="btn-group list-group-item"
          role="group"
          aria-label="Basic example">
          <button class="btn btn-secondary" @click="reset">Reset</button>
        </div>
      </draggable>
    </div>

    <div class="col-4">
      <h3>Open Tabs</h3>

      <draggable :list="list2" class="list-group" draggable=".item" group="a">
        <div
          class="list-group-item right-item item"
          v-for="element in list2"
          :key="element.name">
          <span class="tab-icon" :style="{ backgroundImage: 'url(' + element.favIconUrl + ')' }"></span>
          <span class="tab-title">{{ element.name }}</span>
        </div>

        <div
          slot="header"
          class="btn-group list-group-item"
          role="group"
          aria-label="Basic example">
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
    background-color: #fbfbfd00;
    border: 1px solid #f0f0f7;
    cursor: grab;
    touch-action: manipulation;
    padding: 0.8rem;
    overflow: visible;
    box-shadow: none;
    width: 13rem;
    height: 2.2rem;
    -webkit-tap-highlight-color: #FFF;    
    display: flex;
    align-items: center;
}
.left-item {
    height: 2.2rem;
    margin: 0.5rem 0px;
}
.right-item {
    height: 1rem;
    margin: 0.2rem 0px;
}
.tab-icon {
    background-size: 1rem 1rem;
    height: 1rem;
    width: 1rem;
    display: block;
    flex: 0 0 1rem;
    margin-right: 0.5rem;
}
.tab-title {
    text-overflow: ellipsis;
    overflow: hidden;
    display: block;
    white-space: nowrap;  
    flex: 1 1; 
}

</style>

<script>
import draggable from "vuedraggable";
// import draggable from './components/vuedraggable/vuedraggable';
import Chrome from '../Chrome';
import { Carousel3d, Slide } from 'vue-carousel-3d';

let id = 1;
export default {
  name: "tab-page",
  display: "Tab Page",
  order: 14,
  components: {
    draggable,
    Carousel3d,
    Slide
  },
  data() {
    return {
      list: [
        { name: "Drag a Tab to this context here!", id: 0 }
      ],
      list2: null,
      tasks:[
        {
          name: "Task 1",
          desc: "asjfdlkasd asdfasdfa sdfasdf asdfas df asdfsa",
          src: "../images/brain2.png"
        },
        {
          name: "Task 2",
          desc: "asjfdlkasd asdfasdfa sdfasdf asdfas df asdfsa",
          src: "../images/brain3.png"
        },
        {
          name: "Task 3",
          desc: "asjfdlkasd asdfasdfa sdfasdf asdfas df asdfsa",
          src: "../images/brain4.png"
        },
        {
          name: "Task 4",
          src: "../images/brain5.png"
        },
        {
          name: "Task 5",
          src: "../images/brain6.png"
        },
        {
          name: "Task 6",
          src: "../images/brain7.png"
        }
      ]
    };
  },
  async mounted() {
    this.loadCurrentTabs();
  },
  methods: {
    async loadCurrentTabs() {
      let tabs = await Chrome.tabs.query({});
      let list2 = []

      for(let index in tabs){
        let tab = tabs[index];
        // console.log(tab);
        list2.push(
          {
            name: tab.title, 
            id: tab.id, 
            favIconUrl: tab.favIconUrl
          }
        )
      }
      this.list2 = list2;
    },
    reset: function() {
      this.loadCurrentTabs();
      this.list = [{ name: "Drag a Tab to this context here!", id: 0 }];
    },
    onClickTask: function(e) {
      console.log("Task clicked!");
      console.log(e);
    }
  }
};
</script>

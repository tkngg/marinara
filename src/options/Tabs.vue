<template>
  <div class="row">

    <carousel-3d>
        <slide v-for="(task, i) in tasks" :index="i" :key="task.id">
            <template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
              <div class="task-card">
                <h4>{{ task.name }}</h4>
                <span class="desc">Description: {{ task.desc }}</span>
                <span class="stats">Time Spent: {{ task.time }}</span>
                <span class="pomodoros">No. of Pomodoros: {{task.time}}</span>
                <span class="target"></span>
                <!-- <button @click="onClickTask(task)">See Tabs</button> -->
                <button @click="onClickRemoveTask(task)">Remove Task</button>
                <button @click="onClickStartFocus(task)">Start New Focus Session</button>
                <!-- <img :data-index="index" :class="{ current: isCurrent, onLeft: (leftIndex >= 0), onRight: (rightIndex >= 0) }" :src="task.src"> -->
                <!-- <draggable :list="list3a" class="list-group" draggable=".item" group="a">
                  <div class="list-group-item right-item item" v-for="element in list3a" :key="element.id">
                    <span class="tab-icon" :style="{ backgroundImage: 'url(' + element.favIconUrl + ')' }"></span>
                    <span class="tab-title">{{ element.name }}</span>
                  </div>
                </draggable> -->
              </div>
            </template>
        </slide>
    </carousel-3d>

    <div class="col-4">
      <h3>Task 1 Tabs</h3>
      <draggable id="first" data-source="juju" :list="lista" class="list-group" draggable=".item" group="a">
        <div class="list-group-item left-item item" v-for="element in lista" :key="element.id">
          <span class="tab-icon" :style="{ backgroundImage: 'url(' + element.favIconUrl + ')' }"></span>
          <span class="tab-title">{{ element.name }}</span>
        </div>
        <div slot="header" class="btn-group list-group-item" role="group" aria-label="Basic example">
          <button class="btn btn-secondary" @click="reset">Reset</button>
        </div>
      </draggable>
    </div>

    <div class="col-4">
      <h3>Task 2 Tabs</h3>
      <draggable id="first" data-source="juju" :list="listb" class="list-group" draggable=".item" group="a">
        <div class="list-group-item left-item item" v-for="element in listb" :key="element.id">
          <span class="tab-icon" :style="{ backgroundImage: 'url(' + element.favIconUrl + ')' }"></span>
          <span class="tab-title">{{ element.name }}</span>
        </div>
      </draggable>
    </div>

    <div class="col-4">
      <h3>Open Tabs</h3>
      <draggable :list="list2" class="list-group" draggable=".item" group="a">
        <div class="list-group-item right-item item" v-for="element in list2" :key="element.id">
          <span class="tab-icon" :style="{ backgroundImage: 'url(' + element.favIconUrl + ')' }"></span>
          <span class="tab-title">{{ element.name }}</span>
        </div>
      </draggable>
    </div>

    <!-- <rawDisplayer class="col-2" :value="lista" title="Lista" />
    <rawDisplayer class="col-2" :value="listb" title="Listb" />
    <rawDisplayer class="col-2" :value="list2" title="List2" /> -->

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
import Chrome from '../Chrome';
import { PomodoroClient } from '../background/Services';
import { Carousel3d, Slide } from 'vue-carousel-3d';
import draggable from "vuedraggable";

let json = require('./TabsData.json'); 
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
      lista: [
        { name: "Drag a Tab to this context here!", id: 0 }
      ],
      listb: [
        { name: "Drag a Tab to this context here!", id: 0 }
      ],
      list3a: [
        { name: "Drag a Tab to this context here!", id: 0 }
      ],
      list2: null,
      tasks: json.tasks
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
      this.lista = [{ name: "Drag a Tab to this context here!", id: 0 }];
      this.listb = [{ name: "Drag a Tab to this context here!", id: 0 }];
    },
    onClickTask: function(e) {
      console.log("Task clicked!");
      console.log(e);
    },
    onClickRemoveTask: function(e) {
      console.log("Remove Task");
      for (let i = 0; i < this.tasks.length; i++) {
          let obj = this.tasks[i];

          if (e.id === obj.id) {
              this.tasks.splice(i, 1);
          }
      }
    },
    async onClickStartFocus(e){
      console.log("Start Focus");
      PomodoroClient.once.restart();
      // here need to close all tabs and open task tabs
    }
  }
};
</script>

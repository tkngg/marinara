<template>
  <div class="row">

    <carousel-3d @after-slide-change="onAfterSlideChange" @before-slide-change="onBeforeSlideChange" @last-slide="onLastSlide">
        <slide v-for="(task, i) in tasks" :index="i" :key="task.id" :task-id="task.id">
            <template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
              <div class="task-card">
                <h4>{{ task.name }}</h4>
                <div class="task-container">
                  <div class="task-text-container">
                    <div class="task-text id">Id: {{ task.id }}</div>
                    <div class="task-text desc">Description: {{ task.desc }}</div>
                    <div class="task-text time-spent">Time Spent: {{ task.time }}</div>
                    <div class="task-text target">Target: {{ task.target }}</div>
                    <div class="task-text deadline">Deadline: {{ task.deadline }}</div>
                  </div>
                  <Progress :radius="50" :strokeWidth="10" v-bind:value="calculatePercentage(task)">
                    <template v-slot:footer>
                      <div class="">
                        <b>Completed</b>
                      </div>
                    </template>
                  </Progress>
                </div>
                <div class="task-button-container">
                  <!-- <button @click="onClickTask(task)">See Tabs</button> -->
                  <button class="task-button" @click="onClickRemoveTask(task)">Remove Task</button>
                  <button class="task-button" @click="onClickStartFocus(task)">Start Focus Session</button>
                </div>
                <!-- <img :data-index="index" :class="{ current: isCurrent, onLeft: (leftIndex >= 0), onRight: (rightIndex >= 0) }" :src="task.src"> -->
              </div>
            </template>
        </slide>
    </carousel-3d>

    <div class="col-4">
      <h3>Tabs for Task: {{this.currentTaskName}}</h3>
      <draggable id="first" data-source="juju" :list="currentTaskTabList" class="list-group" draggable=".item" group="a">
        <div class="list-group-item left-item item" v-for="element in currentTaskTabList" :key="element.id">
          <span class="tab-icon" :style="{ backgroundImage: 'url(' + element.favIconUrl + ')' }"></span>
          <span class="tab-title">{{ element.name }}</span>
        </div>
        <div slot="header" class="btn-group list-group-item" role="group" aria-label="Basic example">
          <button class="btn btn-secondary" @click="reset">Reset</button>
        </div>
      </draggable>
    </div>

    <div class="col-4">
      <h3>Open Tabs</h3>
      <draggable :list="openTabsList" class="list-group" draggable=".item" group="a">
        <div class="list-group-item right-item item" v-for="element in openTabsList" :key="element.id">
          <span class="tab-icon" :style="{ backgroundImage: 'url(' + element.favIconUrl + ')' }"></span>
          <span class="tab-title">{{ element.name }}</span>
        </div>
      </draggable>
    </div>

    <!-- <rawDisplayer class="col-2" :value="currentTaskTabList" title="currentTaskTabList" />
    <rawDisplayer class="col-2" :value="openTabsList" title="openTabsList" /> -->

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
.carousel-3d-slide {
    padding: 0 20px;
    background: -webkit-gradient(linear, left top, right top, from(#e09f9f), to(#db6c6c));
    background-image: -webkit-gradient(linear, 0% 0%, 100% 0%, from(#e09f9f), to(#db6c6c));
    // background: -webkit-gradient(linear, left top, right top, from(rgba(88,140,236,1)), to(rgba(106,106,207,1)));
    // background-image: -webkit-gradient(linear, 0% 0%, 100% 0%, from(rgb(88, 140, 236)), to(rgb(106, 106, 207)));
}
.task-container {
  display: flex;
  flex-direction: row;
}
.task-text {
  margin: 5px 0 0 0;
}
.task-card {
  position: relative;
  height: 90%;
}
.task-button-container {
  position: absolute;
  bottom: 0;
}
button.task-button {
    width: 150px;
}

</style>

<script>
import Chrome from '../Chrome';
import { PomodoroClient } from '../background/Services';
import { Carousel3d, Slide } from 'vue-carousel-3d';
import draggable from "vuedraggable";
import Progress from "easy-circular-progress";

let json = require('./TabsData.json'); 
let id = 1;
export default {
  name: "tab-page",
  display: "Tab Page",
  order: 14,
  components: {
    draggable,
    Carousel3d,
    Slide,
    Progress
  },
  data() {
    return {
      carouselElement: document.getElementsByClassName('carousel-3d-slider'),
      currentTaskTabList: [
        { name: "Drag a Tab to this context here!", id: 0 }
      ],
      currentTaskId: null,
      currentTaskName: "",
      openTabsList: [],
      tasks: json.tasks
    };
  },
  async mounted() {
    this.loadCurrentTabs();
    this.createCurrentTaskTabList(this.tasks[0].id);
  },
  methods: {
    async loadCurrentTabs() {
      this.openTabsList = [];
      let tabs = await Chrome.tabs.query({});
      for(let index in tabs){
        let tab = tabs[index];
        this.openTabsList.push(
          {
            name: tab.title, 
            id: tab.id, 
            favIconUrl: tab.favIconUrl,
            url: tab.url
          }
        )
      }
    },
    reset: function() {
      this.loadCurrentTabs();
      this.currentTaskTabList = [{ name: "Drag a Tab to this context here!", id: 0 }];
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
    },
    calculatePercentage: function(task){
      return (task.time/task.target*100).toString();
    },
    onAfterSlideChange(index) {
      // console.log('@onAfterSlideChange Callback Triggered', 'Slide Index ' + index);
    },
    onBeforeSlideChange(carouselIndex) {
      let taskId = this.carouselElement[0].children.item(carouselIndex).getAttribute("task-id");
      this.createCurrentTaskTabList(parseInt(taskId));
    },
    onLastSlide(index) {
      // console.log('@onLastSlide Callback Triggered', 'Slide Index ' + index);
    },
    createCurrentTaskTabList(task_index) {
      let task = null;

      for (let i = 0; i < this.tasks.length; i++) {
          let obj = this.tasks[i];
          if (task_index === obj.id) {
              task = obj;
          }
      }

      let tabs = task.tabs;
      this.currentTaskId = task_index;
      this.currentTaskName = task.name;
      this.currentTaskTabList = [];
      for(let index in tabs){
        let tab = tabs[index];
        this.currentTaskTabList.push(
          {
            name: tab.name, 
            id: tab.id, 
            favIconUrl: tab.favIconUrl,
            url: tab.url
          }
        )
      }
    }
  }
};
</script>

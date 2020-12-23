<template>
  <div v-if="stats" class="history">

<vue-select-image
  :dataImages="dataImages"
  @onselectimage="onSelectImage">
</vue-select-image>

    <div id="sparkline"></div>
    <div class="stats" v-if="active=='summary'">
      <div class="stat">
        <div class="value">{{ stats.day | integer }}</div>
        <div class="bucket">{{ M.today }}</div>
        <div class="average">{{ stats.dayAverage | float(2) | average_stat }}</div>
      </div>
      <div class="stat">
        <div class="value">{{ stats.week | integer }}</div>
        <div class="bucket">{{ M.this_week }}</div>
        <div class="average">{{ stats.weekAverage | float(2) | average_stat }}</div>
      </div>
      <div class="stat">
        <div class="value">{{ stats.month | integer }}</div>
        <div class="bucket">{{ new Date() | strftime('%B') | in_month }}</div>
        <div class="average">{{ stats.monthAverage | float(2) | average_stat }}</div>
      </div>
      <div class="stat">
        <div class="value">{{ stats.total | integer }}</div>
        <div class="bucket">{{ M.total }}</div>
      </div>
    </div>
    <section class="day-distribution chart" v-if="active=='daily'">
      <div class="title">
        <h2>{{ M.daily_distribution }}</h2>
        <div v-if="stats.total > 0" class="options" key="actions">
          <input type="radio" id="day-15" name="day-distribution" v-model.number="dayDistributionBucketSize" value="15">
          <label for="day-15">{{ M.min_suffix(15) }}</label>
          <input type="radio" id="day-30" name="day-distribution" v-model.number="dayDistributionBucketSize" value="30">
          <label for="day-30">{{ M.min_suffix(30) }}</label>
          <input type="radio" id="day-60" name="day-distribution" v-model.number="dayDistributionBucketSize" value="60">
          <label for="day-60">{{ M.hr_suffix(1) }}</label>
          <input type="radio" id="day-120" name="day-distribution" v-model.number="dayDistributionBucketSize" value="120">
          <label for="day-120">{{ M.hr_suffix(2) }}</label>
        </div>
      </div>
      <DayDistribution v-if="stats.total > 0" :pomodoros="stats.pomodoros" :bucketSize="dayDistributionBucketSize" key="chart"></DayDistribution>
      <div v-else class="empty" key="empty">{{ M.daily_empty_placeholder }}</div>
    </section>
    <section class="chart" v-if="active=='weekly'">
      <div class="title">
        <h2>{{ M.weekly_distribution }}</h2>
      </div>
      <WeekDistribution v-if="stats.total > 0" :pomodoros="stats.pomodoros" key="chart"></WeekDistribution>
      <div v-else class="empty" key="empty">{{ M.weekly_empty_placeholder }}</div>
    </section>
    <section class="chart" v-if="active=='monthly'">
      <div class="title">
        <h2>{{ stats.period | pomodoroCount | last_9_months }}</h2>
      </div>
      <Heatmap v-if="stats.total > 0" :pomodoros="stats.daily" :start="historyStart" key="chart"></Heatmap>
      <div v-else class="empty" key="empty">{{ M.history_empty_placeholder }}</div>
    </section>
    <section class="chart" v-if="active=='other'">
      <div class="title">{{ M.your_history }}</div>
      <div class="actions">
        <div class="action">
          <button @click="exportHistoryCSV">{{ M.save_as_csv }}</button>
          <p>{{ M.save_as_csv_description }}</p>
        </div>
        <div class="action">
          <button @click="exportHistory">{{ M.export }}</button>
          <p>{{ M.export_description }}</p>
        </div>
        <div class="action">
          <button @click="importHistory">{{ M.import }}</button>
          <p>{{ M.import_description }}</p>
        </div>
        <div class="action">
          <button @click="clearHistory">{{ M.clear_history }}</button>
          <p>{{ M.clear_history_description }}</p>
        </div>
      </div>
    </section>

    <!-- <div class="tab-bar">
      <router-link :to="{ name: 'summary' }">Summary</router-link>
      <router-link :to="{ name: 'daily' }">Daily</router-link>
      <router-link :to="{ name: 'weekly' }">Weeekly</router-link>
      <router-link :to="{ name: 'monthly' }">Monthly</router-link>
    </div>
    <div class="content">
      <div class="inner">
        <transition name="fade" mode="out-in">
          <keep-alive>
            <router-view class="tab-page"></router-view>
          </keep-alive>
        </transition>
      </div>
    </div> -->

  </div>
</template>

<style lang="scss">
.history {
  justify-content: space-between;
  .actions {
    .action {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      p {
        flex: 1 1 auto;
        margin: 0 0 0 15px;
      }
      button {
        flex: 0 0 185px;
        outline: 0 !important;
        font-size: 15px;
        cursor: pointer;
        background: transparent;
        color: #555;
        padding: 10px 10px;
        border: 1px solid #555;
        border-radius: 40px;
        text-decoration: none;
        display: inline-block;
        &:hover {
          color: #a00;
          border: 1px solid #a00;
          text-decoration: none;
        }
      }
    }
  }
}
.history section {
  margin-bottom: 60px;
}
.history .title {
  margin: 0 0 15px 0;
  border-bottom: 1px solid #aaa;
}
.history .title .options {
  float: right;
}
.history .title h2 {
  color: #444;
  font-size: 16px;
  display: inline;
  font-weight: normal;
}
.day-distribution .options input {
  display: none;
}
.day-distribution .options label {
  cursor: pointer;
  border: 0;
  background: transparent;
  text-transform: uppercase;
  outline: 0 !important;
  padding: 1px 6px;
  border-radius: 2px;
  font-size: 12px;
  position: relative;
  top: -1px;
}
.day-distribution .options input:checked + label {
  border-radius: 10px;
  background: #777;
  color: #fff;
}
.stats {
  margin: 20px 40px 80px 40px;
  display: flex;
  justify-content: space-between;
}
.stats .stat {
  display: flex;
  align-items: center;
  flex-flow: column;
}
.stats .stat .value {
  color: #a00;
  font-size: 30px;
  margin-bottom: 5px;
}
.stats .stat .bucket {
  color: #333;
  font-size: 17px;
}
.stats .stat .average {
  color: #555;
  margin-top: 3px;
}
.distribution rect {
  fill: #090;
  outline: 0 !important;
}
.distribution .domain {
  stroke: #777;
}
.chart .empty {
  display: flex;
  justify-content: center;
  padding: 50px 100px;
  font-size: 15px;
  background: #eee;
  color: #333;
  border-radius: 5px;
}
.tippy-tooltip {
  opacity: 0.9 !important;
  padding: 10px 17px;
  font-size: 16px;
}

//vue-select-image
.vue-select-image
{
    margin-bottom: 50px;
}
.vue-select-image__wrapper
{
    overflow:auto;
    list-style-image:none;
    list-style-position:outside;
    list-style-type:none;
    padding:0;margin:0
}
.vue-select-image__item
{
    margin:0 12px 12px 0;
    float:left
}
.vue-select-image__thumbnail
{
    cursor:pointer;
    padding:6px;
    display:block;
    padding:4px;
    line-height:20px;
    border:1px solid #ddd;
    border-radius:4px;
    box-shadow:0 1px 3px rgba(0,0,0,.055);
    transition:all .2s ease-in-out;
    width: 98px;
    height: 98px;
}
.vue-select-image__thumbnail--selected
{
    background:#08c
}
.vue-select-image__thumbnail--disabled
{
    background:#b9b9b9;
    cursor:not-allowed
}
.vue-select-image__thumbnail--disabled>.vue-select-image__img
{
    opacity:.5
}
.vue-select-image__img
{
    -webkit-user-drag:none;
    display:block;
    max-width:100%;
    margin-right:auto;
    margin-left:auto
}
.vue-select-image__lbl
{
    line-height:3
}
@media only screen and (min-width:1200px)
{
    .vue-select-image__item
    {
        margin-left:30px
    }
}

</style>

<script>
import { HistoryClient, PomodoroClient } from '../background/Services';
import { integer, float, strftime, pomodoroCount } from '../Filters';
import * as File from './File';
import Heatmap from './Heatmap';
import DayDistribution from './DayDistribution';
import WeekDistribution from './WeekDistribution';
import M from '../Messages';
import VueSelectImage from 'vue-select-image';
// require('vue-select-image/dist/vue-select-image.css');

export default {
  data() {
    return {
      historyClient: new HistoryClient(),
      pomodoroClient: new PomodoroClient(),
      stats: null,
      historyStart: null,
      dayDistributionBucketSize: 30,
      active: 'summary',
      dataImages: [{
                    id: '1',
                    src: '../images/summary.png',
                    alt: 'Summary',
                    name: 'summary'
                  }, {
                    id: '2',
                    src: '../images/daily.png',
                    alt: 'Daily',
                    name: 'daily'
                  }, {
                    id: '3',
                    src: '../images/weekly.png',
                    alt: 'Weekly',
                    name: 'weekly'
                  },{
                    id: '4',
                    src: '../images/monthly.png',
                    alt: 'Monthly',
                    name: 'monthly',
                    disabled: false
                  },{
                    id: '5',
                    src: '../images/other.png',
                    alt: 'Other',
                    name: 'other',
                    disabled: false
                  }]
    };
  },
  async mounted() {
    this.updateStats();
    this.pomodoroClient.on('expire', () => {
      this.updateStats();
    });
  },
  beforeDestroy() {
    this.historyClient.dispose();
    this.pomodoroClient.dispose();
  },
  methods: {
    onSelectImage(x){
      console.log(x.id);
      this.active = x.name;
    },
    async exportHistoryCSV() {
      let csv = await this.historyClient.getCSV();
      File.save('history.csv', csv);
    },
    async exportHistory() {
      let json = JSON.stringify(await this.historyClient.getAll());
      File.save('history.json', json);
    },
    async importHistory() {
      try {
        let content = await File.readText('.json');
        if (!content) {
          return;
        }

        let history = JSON.parse(content);
        if (!confirm(M.import_confirmation)) {
          return;
        }

        let count = await this.historyClient.merge(history);
        alert(M.pomodoros_imported(pomodoroCount(count)));
      } catch (e) {
        alert(M.import_failed(`${e}`));
        return;
      }

      await this.updateStats();
    },
    async clearHistory() {
      if (!confirm(M.clear_history_confirmation)) {
        return;
      }

      await this.historyClient.clearHistory();
      await this.updateStats();
    },
    async updateStats() {
      let now = new Date();
      let start = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      // Start at the first Sunday at least 39 weeks (~9 months) ago.
      start.setDate(start.getDate() - 273);
      start.setDate(start.getDate() - start.getDay());
      this.stats = await this.historyClient.getStats(+start);
      this.historyStart = start;
    }
  },
  filters: {
    integer,
    float,
    pomodoroCount,
    strftime,
    in_month: M.in_month,
    average_stat: M.average_stat,
    last_9_months: M.last_9_months
  },
  components: {
    VueSelectImage,
    Heatmap,
    DayDistribution,
    WeekDistribution
  }
};
</script>
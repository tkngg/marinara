<template>
  <form v-if="settings">
    
<div class="container">
  <div class="box"></div>
  <div class="container-forms">
    <div class="container-info">
      <div class="info-item">
        <div class="table">
          <div class="table-cell">
            <p>
              Have an account?
            </p>
            <div class="btn">
              Log in
            </div>
          </div>
        </div>
      </div>
      <div class="info-item">
        <div class="table">
          <div class="table-cell">
            <p>
              Don't have an account? 
            </p>
            <div class="btn">
              Sign up
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-form">
      <div class="form-item log-in">
        <div class="table">
          <div class="table-cell">
            <input name="Username" placeholder="Username" type="text"><input name="Password" placeholder="Password" type="Password">
            <div class="btn">
              Log in
            </div>
          </div>
        </div>
      </div>
      <div class="form-item sign-up">
        <div class="table">
          <div class="table-cell">
            <input name="email" placeholder="Email" type="text"><input name="fullName" placeholder="Full Name" type="text"><input name="Username" placeholder="Username" type="text"><input name="Password" placeholder="Password" type="Password">
            <div class="btn" >
              Sign up
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    <div class="section autostart">
      <h2>{{ M.autostart_title }}</h2>
      <p>{{ M.autostart_description }}</p>
      <p class="field">
        <label>
          <span>{{ M.time }}</span>
          <input type="time" v-model="settings.autostart.time" class="time" id="autostart-time">
        </label>
      </p>
    </div>
    <transition name="slide-up">
      <div v-if="showSettingsSaved" @click="dismissSettingsSaved" class="save">
        <p>
          <img src="/images/check.svg"> {{ M.settings_saved }}
        </p>
      </div>
    </transition>
  </form>
</template>

<style lang="scss">
@import '../fontello.css';
$width: 600px;
$height: 320px;
$padding: 10px 15px;
input[type="number"] {
  padding: 0;
}
.slide-up-enter-active {
  transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}
.slide-up-leave-active {
  transition: transform 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}
.slide-up-enter, .slide-up-leave-to {
  transform: translateY(300%);
}
.section.autostart {
  display: none;
}
.save {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  padding: 0;
  p {
    margin: 40px;
    padding: 10px 20px;
    display: inline-flex;
    align-items: center;
    color: #080;
    background: #fff;
    border: 1px solid #080;
    border-radius: 40px;
    font-size: 18px;
    img {
      width: 32px;
      height: 32px;
      margin-right: 10px;
    }
  }
}
.preview {
  margin-left: 10px;
  cursor: default;
  color: #a00;
  img {
    vertical-align: middle;
    margin-left: 10px;
    height: 8px;
    opacity: 1;
    transition: opacity 0.5s;
    &:not(.active) {
      opacity: 0;
    }
  }
}
.table {
  display: table;
  width: 100%;
  height: 100%;
}
.table-cell {
  display: table-cell;
  vertical-align: middle;
  // @include transition(all 0.5s);
  transition: all 0.5s;
}
.container {
  position: relative;
  width: $width;
  margin: 30px auto 0;
  height: $height;
  background-color: #de9999;
  top: 50%;
  // margin-top: -160px;
  // @include transition(all 0.5s);
  transition: all 0.5s;
  .box {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    &:before, &:after {
      content: " ";
      position: absolute;
      left: 152px;
      top: 50px;
      background-color: #e09292;
      transform: rotateX(52deg) rotateY(15deg) rotateZ(-38deg);
      width: 300px;
      height: 285px;
      // @include transition(all 0.5s);
      transition: all 0.5s;
    }
    &:after {
      background-color: #e4a5a5;
      top: -10px;
      left: 80px;
      width: 320px;
      height: 180px;
    }
  }
  .container-forms {
    position: relative;
  }
  .btn {
    cursor: pointer;
    text-align: center;
    margin: 0 auto;
    width: 60px;
    color: #fff;
    background-color: #ff73b3;
    opacity: 1;
    // @include transition(all 0.5s);
    transition: all 0.5s;
    &:hover {
      opacity: 0.7;
    }
  }
  .btn, input {
    padding: $padding
  }
  input {
    margin: 0 auto 15px;
    display: block;
    width: $width/2-80px;
    // @include transition(all 0.3s)
    transition: all 0.3s;
  }
  .container-forms {
    .container-info {
      text-align: left;
      font-size: 0;
      .info-item {
        text-align: center;
        font-size: 16px;
        width: $width/2;
        height: $height;
        display: inline-block;
        vertical-align: top;
        color: #fff;
        opacity: 1;
        // @include transition(all 0.3s);
        transition: all 0.3s;
        p {
          font-size: 20px;
          margin: 20px;
        }
        .btn {
          background-color: transparent;
          border: 1px solid #fff;
        }
        .table-cell {
          padding-right: 35px;
        }
        &:nth-child(2) {
          .table-cell {
            padding-left: 35px;
            padding-right: 0;
          }
        }
      }
    }
  }      
  .container-form {
    overflow: hidden;
    position: absolute;
    left: 30px;
    top: -30px;
    width: 305px;
    height: $height + 60px;
    background-color: #fff;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
    // @include transition(all 0.5s);
    transition: all 0.5s;
    &:before {
      content: "✔";
      position: absolute;
      left: 160px;
      top: -50px;
      color: #ad5353;
      font-size: 130px;
      opacity: 0;
      // @include transition(all 0.5s);
      transition: all 0.5s;
    }
    .btn {
      position: relative;
      box-shadow: 0 0 10px 1px #ff73b3;
      margin-top: 30px;
    }
  }
  .form-item {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 1;
    // @include transition(all 0.5s)
    transition: all 0.5s;
    &.sign-up {
      position: absolute;
      left: -100%;
      opacity: 0;
    }
  }
  &.log-in {
    .box {
      &:before {
        position: absolute;
        left: 180px;
        top: 62px;
        height: 265px;
      }
      &:after {
        top: 22px;
        left: 192px;
        width: 324px;
        height: 220px;
      }
    }
    .container-form {
      left: 265px;
      .form-item {
        &.sign-up {
          left: 0;
          opacity: 1;
        }
        &.log-in {
          left: -100%;
          opacity: 0;
        }
      }
    }
  }
  &.active {
    width: 260px;
    height: 140px;
    margin-top: -70px;
    .container-form {
      left: 30px;
      width: 200px;
      height: 200px;
      &:before {
        content: "✔";
        position: absolute;
        left: 51px;
        top: 5px;
        color: #ad5353;
        font-size: 130px;
        opacity: 1;
      }
    }
    input, .btn, .info-item {
      display: none;
      opacity: 0;
      padding: 0px;
      margin: 0 auto;
      height: 0;
    }
    .form-item {
      height: 100%;
    }
    .container-forms {
      .container-info {
        .info-item { 
          height: 0%;
          opacity: 0;
        }
      }
    }
  }
}

</style>

<script>
import { SettingsClient, SoundsClient } from '../background/Services';
import Mutex from '../Mutex';
import SoundSelect from './SoundSelect';
import CountdownSettings from './CountdownSettings';
import M from '../Messages';
import createTimerSound from '../TimerSound';
import { focus } from '../Directives';

export default {
  data() {
    return {
      settingsClient: new SettingsClient(),
      soundsClient: new SoundsClient(),
      settings: null,
      showSettingsSaved: false,
      showSettingsSavedTimeout: null,
      notificationSounds: null,
      timerSounds: null,
      timerSound: null,
      timerSoundMutex: new Mutex()
    };
  },
  async mounted() {
    [this.settings, this.notificationSounds, this.timerSounds] = await Promise.all([
      this.settingsClient.getSettings(),
      this.soundsClient.getNotificationSounds(),
      this.soundsClient.getTimerSounds()
    ]);
  },
  beforeDestroy() {
    this.settingsClient.dispose();
    this.soundsClient.dispose();
  },
  methods: {
    async saveSettings() {
      try {
        await this.settingsClient.setSettings(this.settings);
      } catch (e) {
        // Ignore errors when saving settings.
        return;
      }

      clearTimeout(this.showSettingsSavedTimeout);
      this.showSettingsSavedTimeout = setTimeout(() => {
        this.showSettingsSaved = false;
      }, 5000);

      this.showSettingsSaved = true;
    },
    async playTimerSound() {
      this.timerSoundMutex.exclusive(async () => {
        this.timerSound = await createTimerSound(this.settings.focus.timerSound);
        await this.timerSound.start();
      });
    },
    stopTimerSound() {
      this.timerSoundMutex.exclusive(async () => {
        await this.timerSound.close();
        this.timerSound = null;
      });
    },
    dismissSettingsSaved() {
      this.showSettingsSaved = false;
      clearTimeout(this.showSettingsSavedTimeout);
    }
  },
  computed: {
    focusTimerSound: {
      get() {
        let sound = this.settings.focus.timerSound;
        return sound && (sound.procedural || sound.metronome.files);
      },
      set(value) {
        let focus = this.settings.focus;
        if (!value) {
          focus.timerSound = null;
        } else if (!Array.isArray(value)) {
          focus.timerSound = {
            procedural: value
          };
        } else if (focus.timerSound && focus.timerSound.metronome) {
          focus.timerSound.metronome.files = value;
        } else {
          focus.timerSound = {
            metronome: {
              files: value,
              bpm: 60
            }
          };
        }
      }
    },
    focusTimerBpm: {
      get() {
        let sound = this.settings.focus.timerSound;
        return sound
            && sound.metronome
            && sound.metronome.bpm;
      },
      set(bpm) {
        let sound = this.settings.focus.timerSound;
        if (!sound || !sound.metronome) {
          return;
        }

        sound.metronome.bpm = bpm;
      }
    },
    canPlayTimerSound() {
      let bpm = this.focusTimerBpm;
      return this.focusTimerSound
          && ((bpm == null) || (bpm > 0 && bpm <= 1000));
    }
  },
  watch: {
    settings: {
      handler(to, from) {
        if (!from) {
          return;
        }

        // Settings changed, save them.
        this.saveSettings();
      },
      deep: true
    }
  },
  directives: {
    focus
  },
  components: {
    CountdownSettings,
    SoundSelect
  }
};
</script>
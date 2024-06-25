<template>
  <div class="page">
    <div class="box">
      <div class="left">
        <div class="left-content">
          <span class="word-title">考核项目</span>
          <el-select
            v-model="project"
            placeholder="请选择"
            clearable
            class="word-content"
          >
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="left-content">
          <span class="word-title">考核场次</span>
          <el-select
            v-model="venue"
            placeholder="请选择"
            clearable
            class="word-content"
          >
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="left-content">
          <div class="word-title-list">人员列表</div>
          <div
            v-for="(item, index) in personList"
            :key="item.id"
            class="person"
          >
            <div class="person-left">
              <span class="circle">0{{ index + 1 }}</span>
              <span class="word">{{ item.name }}</span>
            </div>
            <span class="person-right">{{ item.score }}分</span>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="right-title">考核科目：仰卧起坐</div>
        <div class="right-content">
          <div class="content1">
            <div class="name">张鸣</div>
            <div class="word">部职别：2师2军团2处3班</div>
            <div class="word">身份证：511011196504254621</div>
            <div class="word">性别：男</div>
            <div class="word">类别：一类人员</div>
          </div>
          <div class="content2">
            <div class="content2-title">合格指标：50</div>
            <div>
              <span class="words">有效个数：58</span>
              <span class="word">无效个数：5</span>
            </div>
            <div class="content2-foot">
              <div class="time">时间：180秒</div>
              <el-button class="btn">通过</el-button>
            </div>
          </div>
        </div>
        <img src="@/assets/show.png" class="img" alt />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "index",
  data() {
    return {
      project: 1,
      venue: 1,
      options: [
        {
          label: "1",
          value: 1
        },
        {
          label: "2",
          value: 2
        }
      ],
      personList: [
        {
          id: "1",
          name: "张小爱",
          score: 100
        },
        {
          id: "2",
          name: "李晓华",
          score: 96
        },
        {
          id: "3",
          name: "张小爱",
          score: 86
        },
        {
          id: "4",
          name: "李晓华",
          score: 80
        },
        {
          id: "5",
          name: "张小爱",
          score: 78
        }
      ]
    };
  }
};
</script>

<style scoped lang="scss">
.box {
  display: flex;
  padding: 50px 70px;
  background: #3d533d;

  .left {
    width: 30%;
    height: 800px;
    background: #fff;
    margin-right: 4%;
    border-radius: 6px;
    padding: 50px;

    .left-content {
      margin-bottom: 20px;

      .word-title,
      .word-title-list {
        color: #000d3e;
        font-family: "PingFang SC";
        font-size: 20px;
        line-height: 32px;
        margin-right: 10px;
      }

      .word-title-list {
        margin-bottom: 30px;
      }

      .word-content {
        width: 360px;
        display: inline-block;
      }

      .person {
        display: flex;
        justify-content: space-between;
        //align-items: center;
        padding: 0 20px;
        width: 410px;
        height: 48px;
        background: #f8f9fa;
        border-radius: 8px;
        margin: 12px 0;

        .person-left {
          display: flex;
          align-items: center;
          color: #000d3e;

          .circle {
            //display: inline-block;
            display: inline-block;
            font-size: 12px;
            line-height: 20px;
            text-align: center;
            width: 20px;
            height: 20px;
            background: rgba(65, 110, 65, 1);
            border-radius: 50%;
            color: white;
            margin-right: 10px;
          }

          .word {
            line-height: 48px;
          }
        }

        .person-right {
          line-height: 48px;
        }
      }
    }
  }

  .right {
    width: 65%;
    height: 800px;
    background: #003871;
    border-radius: 6px;
    padding: 50px 120px;

    .right-title {
      color: #fff;
      font-size: 24px;
      margin-bottom: 20px;
    }

    .right-content {
      display: flex;

      .content1,
      .content2 {
        width: 500px;
        height: 230px;
        background: #036eb4;
        border-radius: 10px;
        margin-right: 20px;
        padding: 20px;
        margin-bottom: 20px;

        .name {
          font-size: 24px;
          color: #fff;
          margin-bottom: 20px;
        }

        .word,
        .words {
          color: #dae5f0;
          font-size: 18px;
          margin-bottom: 10px;
        }

        .words {
          margin-right: 30px;
        }

        .content2-title {
          margin-top: 50px;
          color: #dae5f0;
          font-size: 18px;
          margin-bottom: 10px;
        }

        .content2-foot {
          display: flex;
          height: 80px;
          margin-top: 20px;

          .time {
            font-size: 26px;
            color: #fff;
            margin-right: 50px;
            margin-top: 16px;
          }

          .btn {
            background: #00945a;
            color: #fff;
            width: 120px;
            height: 70px;
            font-size: 26px;
          }
        }
      }
    }

    .img {
      border-radius: 10px;
      width: 900px;
    }
  }
}
</style>

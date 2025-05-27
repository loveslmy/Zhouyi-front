<template>

  <div class="common-layout">
    <el-container>
      <el-aside style="width: 76%;">
        <div v-if="yaoGuaDto" style="padding: 1%;">
          <el-row>
            <el-col :span="24" style="padding-top: 30px;">
              <el-text class="mx-1" style=" padding-right: 55px;" size="large" tag="b">起卦时间：{{
                yaoGuaDto.yangLi }}</el-text>
              <el-text class="mx-1" style=" padding-right: 55px;" size="large" tag="b">太岁：{{ yaoGuaDto.yearGan.name}}{{ yaoGuaDto.yearZhi.name}}（{{ yaoGuaDto.yearGan.wx}}{{ yaoGuaDto.yearZhi.wx}}）</el-text>
              <el-text class="mx-1" style=" padding-right: 55px;" size="large" tag="b">月令：{{
                yaoGuaDto.monthGan?.name }}{{ yaoGuaDto.monthZhi?.name }}（{{
                  yaoGuaDto.monthGan.wx }}{{ yaoGuaDto.monthZhi.wx }}）</el-text>
              <el-text class="mx-1" style=" padding-right: 55px;" size="large" tag="b">日令：{{ yaoGuaDto.dayGan?.name }}{{ yaoGuaDto.dayZhi?.name }}（{{
                yaoGuaDto.dayGan.wx }}{{ yaoGuaDto.dayZhi.wx }}）</el-text>
              <el-text class="mx-1" style=" padding-right: 55px;" size="large" tag="b">时辰：{{ yaoGuaDto.hourGan?.name
                }}{{ yaoGuaDto.hourZhi?.name }}（{{yaoGuaDto.hourGan.wx }}{{ yaoGuaDto.hourZhi.wx }}）</el-text>
              <el-text class="mx-1" style=" padding-right: 55px;" size="large" tag="b">旬空：{{
                yaoGuaDto.xunKong }}</el-text>
            </el-col>
          </el-row>
          <el-row style="padding-top: 30px;">
            <el-col :span="12">
              <el-text class="mx-1" style=" padding-right: 50px;" size="large" tag="b">占卜事项</el-text>
              <p style="padding-left: 50px;">{{ yaoGuaDto.matter }}</p>
            </el-col>
          </el-row>
          <el-row style="padding-top: 30px; padding-bottom: 10px;">
            <el-col :span="1">
              <el-text class="mx-1" size="large" tag="b">六神</el-text>
            </el-col>
            <el-col :span="3">
              <el-text class="mx-1" size="large" tag="b">藏爻</el-text>
            </el-col>
            <el-col :span="1">
              <el-text class="mx-1" style="padding-right: 10px;" size="large" tag="b">状态</el-text>
            </el-col>
            <el-col :span="2">
              <el-text class="mx-1" size="large" tag="b">主卦</el-text>
              <el-tag class="mx-1" style="margin-left: 10px;" v-if="yaoGuaDto.bodyUseStatuses[0]">{{ yaoGuaDto.bodyUseStatuses[0] }}</el-tag>
            </el-col>
            <el-col :span="3">
              <el-text class="mx-1" style="padding-right: 10px;" size="large" tag="b">{{ yaoGuaDto.originGua.gong
              }}宫:</el-text>
              <el-link @click="navigateToDetail(yaoGuaDto.originGua.code)"> <el-text class="mx-1"
                  style="padding-right: 10px;" size="large" tag="b">{{ yaoGuaDto.originGua.name }}{{
                    yaoGuaDto.originGua.type == '默认' ? '' : '(' + yaoGuaDto.originGua.type + ')' }}</el-text></el-link>
            </el-col>
            <el-col :span="1">
              <el-text class="mx-1" style="padding-right: 10px;" size="large" tag="b">状态</el-text>
            </el-col>
            <el-col :span="1">
              <div></div>
            </el-col>
            <template v-if="yaoGuaDto.changeGua">
              <el-col :span="2">
                <el-text class="mx-1" size="large" tag="b">变卦 </el-text>
                <el-tag class="mx-1" style="margin-left: 10px;" v-if="yaoGuaDto.bodyUseStatuses[1]">{{ yaoGuaDto.bodyUseStatuses[1] }}</el-tag>
              </el-col>
              <el-col :span="3">
                <el-text class="mx-1" style="padding-right: 10px;" size="large" tag="b">{{ yaoGuaDto.changeGua.gong
                }}宫:</el-text>
                <el-link @click="navigateToDetail(yaoGuaDto.changeGua.code)">
                  <el-text class="mx-1" style="padding-right: 10px;" size="large" tag="b">
                    {{ yaoGuaDto.changeGua.name }}{{ yaoGuaDto.changeGua.type == '默认' ? '' : '('
                      + yaoGuaDto.changeGua.type+')' }}</el-text></el-link>
              </el-col>
              <el-col :span="3">
                <el-text class="mx-1" style="padding-right: 10px;" size="large" tag="b">状态</el-text>
              </el-col>
            </template>

          </el-row>
          <el-row v-for="i in 6" :key="i" style="padding-top: 10px;">
            <el-col :span="1">
              <el-text class="mx-1">{{ yaoGuaDto.originYaos[i - 1]?.shen }}</el-text>
            </el-col>
            <el-col :span="3">
              <QinDetailsTable :name="yaoGuaDto.joinYaos[i - 1]?.qin">
                <el-text class="mx-1">{{ yaoGuaDto.joinYaos[i - 1]?.qin }}{{ yaoGuaDto.joinYaos[i - 1]?.zhi.name }}{{
                  yaoGuaDto.joinYaos[i - 1]?.zhi.wx }}</el-text>
                <template v-for="role in yaoGuaDto.joinYaos[i - 1].roles">
                  <el-tag class="mx-1" style="margin-left: 5px;" type="primary" v-if="role == '用神'" tag="b">{{
                    role}}</el-tag>
                  <el-tag class="mx-1" style="margin-left: 5px;" v-else-if="role == '伏神'" tag="b">{{ role }}</el-tag>
                </template>
              </QinDetailsTable>
            </el-col>
            <el-col :span="1">
              <el-tooltip class="box-item"
                :content="yaoGuaDto.joinYaos[i - 1].times[1] + ',' + yaoGuaDto.joinYaos[i - 1].times[2]"
                placement="right-start">
                <el-tag class="mx-1" style="margin-right: 5px;" type="success"
                  v-if="yaoGuaDto.joinScores[i - 1] > 0">旺相</el-tag>
                <el-tag class="mx-1" style="margin-right: 5px;" v-else-if="yaoGuaDto.joinScores[i - 1] < 0"
                  type="danger">休囚</el-tag>
                <el-tag class="mx-1" style="margin-right: 5px;" type="info" v-else>平象</el-tag>
              </el-tooltip>
              <template v-for="status in yaoGuaDto.joinYaos[i - 1].statuses">
                <el-tag class="mx-1" style="margin-left: 5px;" tag="b">{{ status }}</el-tag>
              </template>
            </el-col>
            <el-col :span="2">
              <el-text class="mx-1" size="large" v-html="yaosMap.get(yaoGuaDto.originYaos[i - 1].yinYang)"></el-text>
            </el-col>

            <el-col :span="3">
              <QinDetailsTable :name="yaoGuaDto.originYaos[i - 1]?.qin">
                <el-text class="mx-1">{{ yaoGuaDto.originYaos[i - 1]?.qin }}{{ yaoGuaDto.originYaos[i - 1]?.zhi.name
                  }}{{
                    yaoGuaDto.originYaos[i - 1]?.zhi.wx }}</el-text>
                <template v-for="role in yaoGuaDto.originYaos[i - 1].roles">
                  <el-tag class="mx-1" style="margin-left: 5px;" type="success" v-if="role == '原神'" tag="b">{{ role
                    }}</el-tag>
                  <el-tag class="mx-1" style="margin-left: 5px;" type="danger" v-else-if="role == '忌神'" tag="b">{{ role
                    }}</el-tag>
                  <el-tag class="mx-1" style="margin-left: 5px;" type="primary" v-else-if="role == '用神'" tag="b">{{ role
                    }}</el-tag>
                  <el-tag class="mx-1" style="margin-left: 5px;" type="warning" v-else-if="role == '仇神'" tag="b">{{
                    role}}</el-tag>
                  <el-tag class="mx-1" style="margin-left: 5px;"
                    v-else-if="role.indexOf('动爻') == -1 && role.indexOf('变爻') == -1" tag="b">{{ role }}</el-tag>
                </template>
              </QinDetailsTable>
            </el-col>

            <el-col :span="1">
              <el-tooltip class="box-item"
                :content="yaoGuaDto.originYaos[i - 1].times[1] + ',' + yaoGuaDto.originYaos[i - 1].times[2]"
                placement="right-start">
                <el-tag class="mx-1" style="margin-right: 5px;" type="success"
                  v-if="yaoGuaDto.originScores[i - 1] > 1">旺相</el-tag>
                <el-tag class="mx-1" style="margin-right: 5px;" v-else-if="yaoGuaDto.originScores[i - 1] < 0"
                  type="danger">休囚</el-tag>
                <el-tag class="mx-1" style="margin-right: 5px;" type="info" v-else>平象</el-tag>
              </el-tooltip>
              <template v-for="status in yaoGuaDto.originYaos[i - 1].statuses">
                <el-tag class="mx-1" style="margin-left: 5px;" tag="b">{{ status }}</el-tag>
              </template>
            </el-col>

            <el-col :span="1">
              <template v-for="role in yaoGuaDto.originYaos[i - 1].roles">
                <el-text class="mx-1" v-if="role == '动爻' && yaoGuaDto.originYaos[i - 1].yinYang" tag="b">O→</el-text>
                <el-text class="mx-1" v-else-if="role == '动爻'" tag="b">X→</el-text>
              </template>
            </el-col>
            <template v-if="yaoGuaDto.changeGua">

            <el-col :span="2">
              <el-text class="mx-1" size="large" v-html="yaosMap.get(yaoGuaDto.changeYaos[i - 1].yinYang)"></el-text>
            </el-col>

            <el-col :span="3">
              <QinDetailsTable :name="yaoGuaDto.changeYaos[i - 1]?.qin">
                <el-text class="mx-1">{{ yaoGuaDto.changeYaos[i - 1]?.qin }}{{ yaoGuaDto.changeYaos[i - 1]?.zhi.name
                  }}{{
                    yaoGuaDto.changeYaos[i - 1]?.zhi.wx }}</el-text>
                <template v-for="role in yaoGuaDto.changeYaos[i - 1].roles">
                  <el-tag class="mx-1" style="margin-left: 5px;" v-if="role.indexOf('动爻') == -1
                    && role.indexOf('变爻') == -1
                    && role.indexOf('原神') == -1
                    && role.indexOf('忌神') == -1
                    && role.indexOf('用神') == -1
                    && role.indexOf('仇神') == -1" tag="b">{{ role }}</el-tag>
                </template>
              </QinDetailsTable>
            </el-col>
            <el-col :span="3">
              <el-tooltip class="box-item"
                :content="yaoGuaDto.changeYaos[i - 1].times[1] + ',' + yaoGuaDto.changeYaos[i - 1].times[2]"
                placement="right-start">
                <el-tag class="mx-1" style="margin-right: 5px;" type="success"
                  v-if="yaoGuaDto.changeScores[i - 1] > 1">旺相</el-tag>
                <el-tag class="mx-1" style="margin-right: 5px;" v-else-if="yaoGuaDto.changeScores[i - 1] < 0"
                  type="danger">休囚</el-tag>
                <el-tag class="mx-1" style="margin-right: 5px;" type="info" v-else>平象</el-tag>
              </el-tooltip>
              <template v-for="status in yaoGuaDto.changeYaos[i - 1].statuses">
                <el-tag class="mx-1" style="margin-left: 5px;" tag="b">{{ status }}</el-tag>
              </template>
            </el-col>
          </template>
          </el-row>
          <el-row style="padding-top: 30px;">
            <el-col :span="24">
              <el-text class="mx-1" style=" padding-right: 50px;" size="large" tag="b">卦理分析</el-text>
              <template v-for="msg in yaoGuaDto.msgList">
                <p v-for="m in msg.split('\n')" style="padding-left: 50px;">{{ m }}</p>
              </template>
            </el-col>
          </el-row>
          <el-row style="padding-top: 30px;">
            <el-col :span="12">
              <el-text class="mx-1" style=" padding-right: 50px;" size="large" tag="b">动爻生合冲克害</el-text>
              <div v-if="yaoGuaDto.relations.length > 0">
                <template v-for="rel in yaoGuaDto.relations">
                  <p style="padding-left: 50px;">{{ rel.source.guaType }}-{{ rel.source.idx }}{{ rel.source.yinYang ? '九' : '六' }}-{{ rel.source.qin
                    }}{{ rel.source.zhi.name }}{{ rel.source.zhi.wx }}     
                    <span style="margin-left: 20px; margin-right: 20px;">
                      {{ rel.relationType }} → 
                    </span>
                    {{ rel.target.guaType }}-{{ rel.target.idx }}{{
                      rel.target.yinYang ? '九':'六'}}-{{ rel.target.qin }}{{ rel.target.zhi.name }}{{ rel.target.zhi.wx }}
                  </p>
                </template>
              </div>
              <div v-else>
                <p style="padding-left: 50px;">无</p>
              </div>
            </el-col>
          </el-row>
          <el-row style="padding-top: 30px;">
            <el-col :span="12">
              <el-text class="mx-1" style=" padding-right: 50px;" size="large" tag="b">备注</el-text>
              <p style="padding-left: 50px;">{{ yaoGuaDto.remark }}</p>
            </el-col>
          </el-row>
          <el-row style="padding-top: 30px;">
            <el-col :span="12">
              <el-text class="mx-1" style=" padding-right: 50px;" size="large" tag="b">结论</el-text>
              <p style="padding-left: 50px;">{{ yaoGuaDto.conclusion }}</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" style="padding: 10px;">
              <GuaxiangDetails :gongSeq="currentGongSeq" />
            </el-col>
          </el-row>
        </div>
        <div v-else>
          <p>加载中...</p>
        </div>
      </el-aside>
      <el-main>
        <HeXiangRelations />
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getBLiuYaoById } from '@/api/liuyao'; // 引入 API 请求函数
import { LiuYaoGuaDto } from '@/model/interfaces'; // 确保路径正确


const currentGongSeq = ref<number>(1);

const selectedDate = ref<string | null>(null);

function convertYaosToMap(yaos) {
  const yaosMap = new Map();
  yaos.forEach(yao => {
    yaosMap.set(yao.value, yao.label);
  });
  return yaosMap;
}

const yaos = [
  { value: true, label: '▄▄▄▄▄▄' },
  { value: false, label: '▄▄&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▄▄' }
];

export default {
  props: ['id'], // 接收路由传递的 id 参数
  setup(props) {
    const route = useRoute();
    const yaoGuaDto = ref<LiuYaoGuaDto | null>(null);
    const yaosMap = ref(convertYaosToMap(yaos));
    const fetchBLiuYao = async (id) => {
      try {
        const data = await getBLiuYaoById(id);
        yaoGuaDto.value = data;
        selectedDate.value = data.yangLi;
        currentGongSeq.value = data.originGua.code;
      } catch (error) {
        console.error('获取记录失败:', error);
      }
    };
    onMounted(() => {
      const id = props.id || route.params.id; // 优先使用 props 中的 id，如果没有则使用路由参数
      if (id) {
        fetchBLiuYao(id);
      }
    });

    return {
      yaoGuaDto,
      yaosMap,
      selectedDate,
      currentGongSeq
    };
  },
  methods: {
    navigateToDetail(code) {
      currentGongSeq.value = code
    }
  }
};
</script>

<style scoped>
/* 添加一些样式 */
</style>
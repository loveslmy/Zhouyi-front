<template>
  <div class="hexagram-container">
    <h1>六十四卦演示</h1>
    <div class="palace-grid">
      <div v-for="(palace, palaceIndex) in palaces" :key="palaceIndex" class="palace-item">
        <h2>{{ palace.name }}</h2>
        <div class="hexagram-grid">
          <div 
            v-for="(hexagram, hexagramIndex) in palace.hexagrams" 
            :key="hexagramIndex" 
            class="hexagram-item"
            @click="selectHexagram(hexagram)"
            :class="{ selected: hexagram === selectedHexagram }"
          >
            <div v-for="(line, lineIndex) in hexagram.lines" :key="lineIndex" class="line" :class="{ yang: line === 1, yin: line === 0 }">
              <span>{{ line === 1 ? '——' : '--' }}</span>
            </div>
            <div class="hexagram-name">{{ hexagram.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="selectedHexagram" class="details-container">
      <h2>{{ selectedHexagram.name }}</h2>
      <div class="detailed-lines">
        <div v-for="(line, lineIndex) in selectedHexagram.lines" :key="lineIndex" class="line" :class="{ yang: line === 1, yin: line === 0 }">
          <span>{{ line === 1 ? '——' : '--' }}</span>
        </div>
      </div>
      <p>{{ selectedHexagram.description || '暂无详细描述' }}</p>
    </div>
  </div>
</template>

<script>
const hexagrams = [
  { name: '乾', lines: [1, 1, 1, 1, 1, 1], description: '天干之卦，象征刚健不屈。' },
  { name: '坤', lines: [0, 0, 0, 0, 0, 0], description: '地坤之卦，象征柔顺包容。' },
  { name: '屯', lines: [0, 0, 1, 0, 0, 1], description: '初生之卦，象征艰难困苦。' },
  { name: '蒙', lines: [0, 1, 0, 0, 1, 0], description: '启蒙之卦，象征教化启发。' },
  { name: '需', lines: [0, 0, 1, 0, 1, 0], description: '等待之卦，象征耐心守信。' },
  { name: '讼', lines: [0, 1, 0, 0, 0, 1], description: '争执之卦，象征公正裁决。' },
  { name: '师', lines: [0, 1, 1, 0, 1, 1], description: '军队之卦，象征领导才能。' },
  { name: '比', lines: [1, 1, 0, 1, 1, 0], description: '亲密之卦，象征团结合作。' },
  { name: '小畜', lines: [0, 0, 1, 1, 0, 0], description: '蓄养之卦，象征积少成多。' },
  { name: '履', lines: [1, 0, 1, 1, 0, 1], description: '实践之卦，象征脚踏实地。' },
  { name: '泰', lines: [0, 1, 1, 1, 0, 0], description: '通泰之卦，象征天地交合。' },
  { name: '否', lines: [0, 0, 1, 1, 1, 0], description: '闭塞之卦，象征事物不通。' },
  { name: '同人', lines: [1, 1, 0, 1, 0, 0], description: '同志之卦，象征人心相通。' },
  { name: '大有', lines: [1, 1, 1, 0, 0, 0], description: '丰饶之卦，象征财物丰富。' },
  { name: '谦', lines: [0, 1, 0, 0, 0, 0], description: '谦逊之卦，象征谦虚美德。' },
  { name: '豫', lines: [0, 0, 0, 0, 1, 0], description: '喜悦之卦，象征安乐愉悦。' },
  { name: '随', lines: [0, 0, 0, 1, 0, 0], description: '顺应之卦，象征随遇而安。' },
  { name: '蛊', lines: [1, 0, 0, 1, 0, 0], description: '改革之卦，象征革新除弊。' },
  { name: '临', lines: [0, 1, 1, 0, 0, 0], description: '治理之卦，象征君主临民。' },
  { name: '观', lines: [0, 0, 0, 1, 1, 0], description: '观察之卦，象征审慎思考。' },
  { name: '噬嗑', lines: [1, 0, 1, 0, 1, 0], description: '咬合之卦，象征法律制裁。' },
  { name: '贲', lines: [0, 1, 0, 1, 0, 1], description: '装饰之卦，象征文采斐然。' },
  { name: '剥', lines: [0, 0, 1, 0, 1, 1], description: '剥落之卦，象征逐渐衰败。' },
  { name: '复', lines: [1, 1, 0, 1, 0, 0], description: '恢复之卦，象征重新开始。' },
  { name: '无妄', lines: [0, 1, 1, 0, 1, 1], description: '非实之卦，象征虚假行为。' },
  { name: '大畜', lines: [1, 1, 1, 0, 1, 1], description: '大蓄之卦，象征大量储备。' },
  { name: '颐', lines: [0, 1, 1, 1, 0, 1], description: '颐养之卦，象征滋养成长。' },
  { name: '大过', lines: [1, 0, 1, 1, 1, 0], description: '极端之卦，象征过度行为。' },
  { name: '坎', lines: [0, 0, 1, 0, 0, 0], description: '水坎之卦，象征困难险阻。' },
  { name: '离', lines: [1, 1, 0, 1, 1, 1], description: '火离之卦，象征光明温暖。' },
  { name: '咸', lines: [0, 1, 0, 1, 0, 1], description: '感应之卦，象征相互影响。' },
  { name: '恒', lines: [0, 1, 1, 0, 1, 0], description: '恒常之卦，象征持久不变。' },
  { name: '遯', lines: [1, 0, 0, 1, 1, 0], description: '遁退之卦，象征适时隐退。' },
  { name: '大壮', lines: [1, 1, 1, 0, 0, 1], description: '壮大之卦，象征力量强大。' },
  { name: '晋', lines: [0, 0, 1, 1, 0, 1], description: '晋升之卦，象征进步发展。' },
  { name: '明夷', lines: [0, 1, 0, 1, 1, 0], description: '明智之卦，象征明智行动。' },
  { name: '家人', lines: [1, 1, 0, 1, 1, 0], description: '家庭之卦，象征家庭和睦。' },
  { name: '睽', lines: [0, 1, 1, 0, 0, 1], description: '分离之卦，象征意见不合。' },
  { name: '蹇', lines: [0, 0, 1, 1, 1, 0], description: '艰难之卦，象征行路艰难。' },
  { name: '解', lines: [1, 1, 0, 0, 0, 1], description: '解脱之卦，象征困境解除。' },
  { name: '损', lines: [0, 1, 0, 0, 1, 0], description: '损失之卦，象征有所付出。' },
  { name: '益', lines: [0, 0, 1, 0, 0, 1], description: '增益之卦，象征得到好处。' },
  { name: '夬', lines: [1, 1, 0, 0, 1, 1], description: '决断之卦，象征果断决定。' },
  { name: '姤', lines: [1, 0, 1, 0, 0, 1], description: '偶发之卦，象征意外事件。' },
  { name: '萃', lines: [1, 1, 0, 1, 0, 0], description: '聚集之卦，象征人才汇聚。' },
  { name: '升', lines: [0, 1, 1, 0, 1, 0], description: '上升之卦，象征事业兴盛。' },
  { name: '困', lines: [0, 0, 1, 0, 1, 1], description: '困境之卦，象征遭遇困难。' },
  { name: '井', lines: [1, 0, 1, 1, 0, 1], description: '井底之卦，象征汲取资源。' },
  { name: '革', lines: [1, 1, 0, 1, 1, 0], description: '变革之卦，象征彻底改变。' },
  { name: '鼎', lines: [1, 1, 1, 0, 1, 0], description: '鼎立之卦，象征稳定局面。' },
  { name: '震', lines: [0, 1, 0, 0, 0, 0], description: '震动之卦，象征变动不安。' },
  { name: '艮', lines: [0, 0, 0, 0, 1, 0], description: '停止之卦，象征停滞不前。' },
  { name: '渐', lines: [0, 0, 0, 1, 0, 0], description: '渐进之卦，象征逐步进展。' },
  { name: '归妹', lines: [1, 0, 0, 1, 0, 0], description: '出嫁之卦，象征女性角色。' },
  { name: '丰', lines: [0, 1, 1, 0, 1, 1], description: '丰收之卦，象征收获成果。' },
  { name: '旅', lines: [0, 1, 0, 0, 1, 0], description: '旅行之卦，象征在外漂泊。' },
  { name: '巽', lines: [0, 0, 1, 0, 0, 1], description: '风巽之卦，象征柔和灵活。' },
  { name: '兑', lines: [1, 1, 0, 1, 0, 1], description: '悦泽之卦，象征愉快交流。' },
  { name: '涣', lines: [0, 1, 0, 1, 1, 0], description: '分散之卦，象征势力分散。' },
  { name: '节', lines: [0, 0, 1, 1, 0, 1], description: '节制之卦，象征自我控制。' },
  { name: '中孚', lines: [1, 1, 0, 0, 1, 0], description: '诚信之卦，象征信任可靠。' },
  { name: '小过', lines: [1, 0, 1, 0, 1, 0], description: '小有过失之卦，象征轻微失误。' },
  { name: '既济', lines: [1, 1, 0, 1, 1, 0], description: '成功之卦，象征事情成功。' },
  { name: '未济', lines: [0, 1, 1, 0, 0, 1], description: '未完成之卦，象征事情未竟。' }
];

const palaces = [
  { name: '乾宫', hexagrams: [hexagrams[0], hexagrams[13], hexagrams[31], hexagrams[39], hexagrams[47], hexagrams[55], hexagrams[56], hexagrams[59]] },
  { name: '兑宫', hexagrams: [hexagrams[11], hexagrams[14], hexagrams[22], hexagrams[26], hexagrams[34], hexagrams[42], hexagrams[43], hexagrams[44]] },
  { name: '离宫', hexagrams: [hexagrams[15], hexagrams[23], hexagrams[27], hexagrams[35], hexagrams[43], hexagrams[51], hexagrams[52], hexagrams[53]] },
  { name: '震宫', hexagrams: [hexagrams[7], hexagrams[20], hexagrams[28], hexagrams[36], hexagrams[44], hexagrams[52], hexagrams[53], hexagrams[54]] },
  { name: '巽宫', hexagrams: [hexagrams[12], hexagrams[19], hexagrams[29], hexagrams[37], hexagrams[45], hexagrams[53], hexagrams[54], hexagrams[55]] },
  { name: '坎宫', hexagrams: [hexagrams[8], hexagrams[16], hexagrams[24], hexagrams[32], hexagrams[40], hexagrams[48], hexagrams[49], hexagrams[50]] },
  { name: '艮宫', hexagrams: [hexagrams[9], hexagrams[21], hexagrams[30], hexagrams[38], hexagrams[46], hexagrams[54], hexagrams[55], hexagrams[56]] },
  { name: '坤宫', hexagrams: [hexagrams[1], hexagrams[25], hexagrams[33], hexagrams[41], hexagrams[49], hexagrams[57], hexagrams[58], hexagrams[59]] }
];

export default {
  data() {
    return {
      palaces,
      selectedHexagram: null
    };
  },
  methods: {
    selectHexagram(hexagram) {
      this.selectedHexagram = hexagram;
    }
  }
};
</script>

<style scoped>
.hexagram-container {
  text-align: center;
  padding: 20px;
}

.palace-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.palace-item {
  border: 1px solid #ccc;
  padding: 10px;
  box-sizing: border-box;
}

.palace-item h2 {
  margin-top: 0;
}

.hexagram-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.hexagram-item {
  border: 1px solid #ccc;
  padding: 10px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
}

.hexagram-item:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.hexagram-item.selected {
  background-color: #f0f0f0;
}

.line {
  font-size: 24px;
  margin: 5px 0;
  transition: transform 0.3s ease;
}

.yang {
  color: black;
}

.yin {
  color: gray;
}

.hexagram-name {
  margin-top: 10px;
  font-weight: bold;
}

.details-container {
  margin-top: 40px;
  border-top: 1px solid #ccc;
  padding-top: 20px;
  text-align: left;
}

.detailed-lines {
  margin-bottom: 20px;
}
</style>




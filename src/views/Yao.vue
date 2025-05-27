<template>
  <div class="table-container">
    <div class="button-container">
      <button @click="highlightRelations('hexagram')">六合</button>
      <button @click="highlightRelations('six_harms')">六害</button>
      <button @click="highlightRelations('six_clashes')">六冲</button>
    </div>
    <table ref="table">
      <tbody>
        <tr>
          <td class="right-align table-cell no-bottom-border" style="vertical-align: top;" data-relation="hexagram">
            巳
          </td>
          <td class="center-align table-cell" rowspan="2" style="vertical-align: top;" data-relation="hexagram">
            午
          </td>
          <td class="left-align table-cell no-bottom-border" style="vertical-align: top;" data-relation="hexagram">
            未
          </td>
        </tr>
        <tr>
          <td class="left-align table-cell no-top-border" data-relation="hexagram">
            辰
          </td>
          <td class="right-align table-cell no-top-border" data-relation="hexagram">
            申
          </td>
        </tr>
        <tr>
          <td class="left-align table-cell" rowspan="2" data-relation="hexagram">
            卯
          </td>
          <td class="table-cell" rowspan="2"></td>
          <td class="right-align table-cell" rowspan="2" data-relation="hexagram">
            酉
          </td>
        </tr>
        <tr></tr>
        <tr>
          <td class="left-align table-cell no-bottom-border" data-relation="hexagram">
            寅
          </td>
          <td class="center-align table-cell" rowspan="2" style="vertical-align: bottom;" data-relation="hexagram">
            子
          </td>
          <td class="right-align table-cell no-bottom-border" data-relation="hexagram">
            戌
          </td>
        </tr>
        <tr>
          <td class="right-align table-cell no-top-border" style="vertical-align: bottom;" data-relation="hexagram">
            丑
          </td>
          <td class="left-align table-cell no-top-border" style="vertical-align: bottom;" data-relation="hexagram">
            亥
          </td>
        </tr>
      </tbody>
    </table>
    <svg ref="svg" class="overlay-svg"></svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        ['巳', '午', '未'], // 第一行
        ['辰', '', '申'],   // 第二行
        ['卯', '', '酉'],   // 第三行
        ['', '', ''],       // 第四行
        ['寅', '子', '戌'], // 第五行
        ['丑', '', '亥']    // 第六行
      ],
      relations: {
        hexagram: [
          ['巳', '申'],
          ['辰', '酉'],
          ['卯', '戌'],
          ['寅', '亥'],
          ['子', '丑'],
          ['午', '未']
        ],
        six_harms: [          
          ['子', '未'],
          ['丑', '午'],
          ['寅', '巳'],
          ['申', '亥'],
          ['卯', '辰'],
          ['酉', '戌']
        ],
        six_clashes: [
          ['子', '午'],
          ['丑', '未'],
          ['寅', '申'],
          ['卯', '酉'],
          ['辰', '戌'],
          ['巳', '亥']
        ]
      },
      cellPositions: {}
    };
  },
  mounted() {
    this.calculateCellPositions();
  },
  methods: {
    calculateCellPositions() {
      const cells = Array.from(this.$refs.table.querySelectorAll('td'));
      this.cellPositions = {};
      cells.forEach(cell => {
        const relation = cell.getAttribute('data-relation');
        if (relation) {
          const textContent = cell.textContent.trim(); // 去掉左右空白字符
          const rect = cell.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          this.cellPositions[textContent] = { x: centerX, y: centerY };
          console.log(relation, textContent, centerX, centerY);
        }
      });
    },
    highlightRelations(type) {
      const svg = this.$refs.svg;
      svg.innerHTML = ''; // Clear previous lines

      if (!this.relations[type]) return;

      const colorMap = {
        hexagram: 'green',
        six_harms: 'red',
        six_clashes: 'orange'
      };

      this.relations[type].forEach(pair => {
        const [startCell, endCell] = pair;
        const start = this.cellPositions[startCell];
        const end = this.cellPositions[endCell];
        
        if (start && end) {
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', start.x - svg.getBoundingClientRect().left);
          line.setAttribute('y1', start.y - svg.getBoundingClientRect().top);
          line.setAttribute('x2', end.x - svg.getBoundingClientRect().left);
          line.setAttribute('y2', end.y - svg.getBoundingClientRect().top);
          line.setAttribute('stroke', colorMap[type]);
          line.setAttribute('stroke-width', '2');
          svg.appendChild(line);
        } else {
          console.warn(`Could not find positions for ${startCell} or ${endCell}`);
        }
      });
    }
  }
};
</script>

<style scoped>
.table-container {
  position: relative;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center; /* 使表格水平居中 */
}

.button-container {
  margin-bottom: 10px;
}

button {
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
}

table {
  width: 800px;
  border-collapse: collapse;
  border: 1px solid #ccc; /* 添加1px边框 */
}

tr {
  height: 30px;
}

td {
  background-color: #f9fafc;
  text-align: center;
  padding: 0 50px; /* 调整单元格的左右留白为50px */
  border: 1px solid #ccc; /* 添加1px边框 */
  position: relative;
}

.no-bottom-border {
  border-bottom: none;
}

.no-top-border {
  border-top: none;
}

.right-align {
  text-align: right;
}

.left-align {
  text-align: left;
}

.center-align {
  text-align: center;
}

.overlay-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* Ensure SVG does not interfere with table interactions */
}
</style>

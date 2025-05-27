<template>
  <div class="fish-diagram">
    <canvas ref="canvasRef" width="512" height="512" @click="handleCanvasClick"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, inject } from 'vue';

const WIDTH = 450;
const HEIGHT = 450;

const canvasRef = ref<HTMLCanvasElement | null>(null);
let rotationAngle = 0; // 初始角度为0度
let animationFrameId: number | null = null;

// 存储每个元素的位置信息
interface ElementPosition {
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
}

const elementsPositions: ElementPosition[] = [];

const fetchGong = inject<(name: string) => void>('fetchGong');

class Stage {
  paintBg(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(-WIDTH / 2, -HEIGHT / 2, WIDTH, HEIGHT);
    ctx.fillStyle = "black";
    ctx.fillRect(-WIDTH / 2, -HEIGHT / 2, WIDTH, HEIGHT);
  }

  paintInnerCircle(ctx: CanvasRenderingContext2D) {
    const r = 48;
    this.drawFish(ctx, -r, 'white', true);
    this.drawEye(ctx, 0, -r, r / 4, 'rgb(255,215,0)');
    this.drawFish(ctx, r, 'rgb(255,215,0)', false);
    this.drawEye(ctx, 0, r, r / 4, 'white');

    ctx.beginPath();
    ctx.arc(0, 0, 2 * r + 4, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgb(255,215,0)";
    ctx.stroke();
  }

  drawFish(ctx: CanvasRenderingContext2D, offset: number, fillColor: string, reverse: boolean) {
    const r = 48;
    ctx.beginPath();
    ctx.arc(0, offset, r, Math.PI * 0.5, Math.PI * 1.5, reverse);
    ctx.arc(0, 0, 2 * r, Math.PI * 1.5, Math.PI * 0.5, reverse);
    ctx.arc(0, -offset, r, Math.PI * 0.5, Math.PI * 1.5, !reverse);
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
  }

  drawEye(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

  paintOuterCircle(ctx: CanvasRenderingContext2D) {
    const r = 48;
    this.drawTrigramsAndText(ctx, r);
  }

  drawTrigramsAndText(ctx: CanvasRenderingContext2D, r: number) {
    const trigramData = [
      { code: "112", name: "兑", num: "辛酉庚" },
      { code: "111", name: "乾", num: "亥乾戌" },
      { code: "212", name: "坎", num: "癸子壬" },
      { code: "221", name: "艮", num: "寅艮丑" },
      { code: "122", name: "震", num: "乙卯甲" },
      { code: "211", name: "巽", num: "巳巽辰" },
      { code: "121", name: "离", num: "丁午丙" },
      { code: "222", name: "坤", num: "申坤未" }
    ];

    trigramData.forEach(({ code, name, num }, i) => {
      const theta = i * Math.PI / 4;
      const R = 2 * r + 10;
      const x = R * Math.cos(theta);
      const y = R * Math.sin(theta);

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(theta + Math.PI / 2);

      // Draw the trigram
      this.drawGua(ctx, code);

      ctx.restore();

      // Write the name and number text
      this.writeText(ctx, 2 * r + 100, theta, name, "24px 楷体", "rgb(255,215,0)");
      this.writeText(ctx, 2 * r + 125, theta, num, "24px 楷体", "rgb(255,215,0)");

      // Calculate bounding box for combined region with redundancy
      const guaHeight = 16 * 3; // Height estimation for trigram
      const guaWidth = 8 * 4; // Width estimation for trigram
      const textWidth = Math.max(ctx.measureText(name).width, ctx.measureText(num).width);
      const textHeight = 24; // Assuming font size is 24px

      // Define a larger bounding box that includes all three elements (trigram, name, num)
      const margin = 10; // Redundancy margin
      const combinedWidth = Math.max(guaWidth, textWidth) + 2 * margin;
      const combinedHeight = guaHeight + textHeight + 2 * margin;

      // Calculate center of the combined area
      const centerX = (2 * r + 112.5) * Math.cos(theta); // Midpoint between text positions
      const centerY = (2 * r + 112.5) * Math.sin(theta);

      // Store the position information for hit testing
      elementsPositions.push({
        x: centerX - combinedWidth / 2,
        y: centerY - combinedHeight / 2,
        width: combinedWidth,
        height: combinedHeight,
        name: `${name} (${num})`, // Combined name for display
      });
    });
  }

  drawGua(ctx: CanvasRenderingContext2D, txt: string) {
    const arr = txt.split("");
    const ratio = 4;
    const r = 48;

    for (let i = 0; i < arr.length; i++) {
      const letter = arr[i];
      const y = -16 - i * 3 * ratio;

      if (letter === "1") {
        ctx.fillStyle = "rgb(255,215,0)";
        ctx.fillRect(-4 * ratio, y, 8 * ratio, 2 * ratio);
      } else {
        ctx.fillStyle = "rgb(255,215,0)";
        ctx.fillRect(-4 * ratio, y, 3 * ratio, 2 * ratio);
        ctx.fillRect(1 * ratio, y, 3 * ratio, 2 * ratio);
      }
    }
  }

  writeText(ctx: CanvasRenderingContext2D, R: number, theta: number, text: string, font: string, color: string) {
    const x = R * Math.cos(theta);
    const y = R * Math.sin(theta);

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(theta - Math.PI / 2);
    ctx.textBaseline = "bottom";
    ctx.textAlign = "center";
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.fillText(text, 0, 0);
    ctx.restore();
  }

  paint(ctx: CanvasRenderingContext2D) {
    this.paintBg(ctx);
    ctx.save(); // Save the current state of the context

    // Apply rotation only to inner circle
    ctx.rotate(rotationAngle * Math.PI / 180); // Convert angle to radians

    // Draw inner circle with rotation applied
    this.paintInnerCircle(ctx);

    ctx.restore(); // Restore the previous state of the context

    // Draw outer circle without rotation
    this.paintOuterCircle(ctx);
  }
}

function updateCanvas() {
  if (!canvasRef.value) return;

  const canvas = canvasRef.value;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  // Translate origin to center of canvas
  ctx.translate(WIDTH / 2, HEIGHT / 2);

  // Clear previous elements positions
  elementsPositions.length = 0;

  const stage = new Stage();
  stage.paint(ctx);

  rotationAngle += 0.2; // Adjust rotation speed
  if (rotationAngle >= 360) rotationAngle -= 360;

  animationFrameId = requestAnimationFrame(updateCanvas);
}

function handleCanvasClick(event: MouseEvent) {
  if (!canvasRef.value) return;

  const canvas = canvasRef.value;
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left - WIDTH / 2;
  const y = event.clientY - rect.top - HEIGHT / 2;

  // Check if the click hit any element
  const hitElement = elementsPositions.find(element =>
    x >= element.x && x <= element.x + element.width &&
    y >= element.y && y <= element.y + element.height
  );

  if (hitElement) {
    if (fetchGong) {
      fetchGong(hitElement.name.split(' ')[0].charAt(0)); // 调用父组件提供的方法
    }
  } else {
    console.log('No element clicked');
  }
}

onMounted(() => {
  if (!canvasRef.value) return;

  const canvas = canvasRef.value;
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  updateCanvas();

  onUnmounted(() => {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
    }
  });
});
</script>

<style scoped>
.fish-diagram {
  position: relative;
  display: flex;
}

canvas {
  background-color: #fff;
  border: 1px solid #ccc;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
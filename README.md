# 瑪利歐動作淘汰賽 (Mario Action Elimination Game)

一個互動性高、視覺效果強烈的瑪利歐主題淘汰賽網頁遊戲。

## 功能特色

- 🎮 經典瑪利歐復古風格設計
- 📸 支援上傳 3-5 張自訂照片
- 🎲 吃角子老虎機式抽獎動畫
- 🔊 音效支援（可靜音）
- 📱 響應式設計，支援手機和電腦
- ✨ 流暢的 Framer Motion 動畫效果

## 技術堆疊

- **React** - 使用 Vite 建構
- **Tailwind CSS** - 樣式設計
- **Framer Motion** - 動畫效果
- **Lucide React** - 圖示庫
- **Press Start 2P** - 像素風格字體

## 安裝與執行

### 1. 安裝依賴

```bash
npm install
```

### 2. 啟動開發伺服器

```bash
npm run dev
```

專案將在 `http://localhost:5173` 啟動。

### 3. 建置生產版本

```bash
npm run build
```

### 4. 預覽生產版本

```bash
npm run preview
```

## 使用說明

1. **上傳照片**：點擊問號磚塊上傳 3-5 張瑪利歐動作照片（或使用預設圖片）
2. **開始遊戲**：點擊紅色 "START GAME" 按鈕
3. **觀看抽獎**：系統會以吃角子老虎機方式快速切換照片
4. **查看結果**：最終隨機選出一張照片，該動作的人淘汰！
5. **重置遊戲**：點擊 "RESET" 按鈕可重新開始

## 設計風格

- **瑪利歐紅** (#E52521) - 主要按鈕和強調色
- **吊帶褲藍** (#009DDC) - 次要按鈕
- **金幣黃** (#FBD000) - 問號磚塊
- **磚塊棕** (#8B4513) - 背景裝飾
- **像素風格** - Press Start 2P 字體

## 專案結構

```
mario-elimination-game/
├── src/
│   ├── App.jsx          # 主要遊戲組件
│   ├── main.jsx         # 入口文件
│   └── index.css        # 全局樣式
├── index.html           # HTML 模板
├── package.json         # 依賴配置
├── vite.config.js       # Vite 配置
├── tailwind.config.js   # Tailwind 配置
└── postcss.config.js    # PostCSS 配置
```

## 授權

MIT License

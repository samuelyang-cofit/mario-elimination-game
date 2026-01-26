# 部署指南

本文件提供多種部署方案，讓你可以輕鬆將瑪利歐動作淘汰賽遊戲部署到線上或在其他電腦執行。

## 方案一：Vercel 部署（推薦）⭐

Vercel 是最簡單快速的部署方式，免費且支援自動部署。

### 步驟：

1. **註冊 Vercel 帳號**
   - 前往 https://vercel.com
   - 使用 GitHub 帳號註冊

2. **上傳專案到 GitHub**
   ```bash
   cd mario-elimination-game
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

3. **在 Vercel 部署**
   - 登入 Vercel
   - 點擊 "New Project"
   - 選擇你的 GitHub 倉庫
   - Vercel 會自動偵測 Vite 專案
   - 點擊 "Deploy"

4. **完成！**
   - 幾分鐘後會獲得一個網址，例如：`your-project.vercel.app`
   - 每次推送到 GitHub，Vercel 會自動重新部署

---

## 方案二：Netlify 部署

Netlify 也是很受歡迎的免費部署平台。

### 步驟：

1. **建置專案**
   ```bash
   npm run build
   ```
   這會在 `dist` 資料夾產生靜態檔案。

2. **拖放部署（最簡單）**
   - 前往 https://app.netlify.com/drop
   - 將 `dist` 資料夾拖放到頁面上
   - 完成！獲得一個網址

3. **或使用 GitHub 自動部署**
   - 登入 Netlify
   - 選擇 "New site from Git"
   - 連接 GitHub 倉庫
   - Build command: `npm run build`
   - Publish directory: `dist`
   - 點擊 "Deploy site"

---

## 方案三：GitHub Pages 部署

免費使用 GitHub 託管靜態網站。

### 步驟：

1. **安裝 gh-pages 套件**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **修改 package.json**
   在 `scripts` 中加入：
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```

   在最上層加入（將 YOUR_USERNAME 和 YOUR_REPO 替換）：
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO"
   ```

3. **修改 vite.config.js**
   加入 base 路徑：
   ```js
   export default defineConfig({
     plugins: [react()],
     base: '/YOUR_REPO/',
   })
   ```

4. **部署**
   ```bash
   npm run deploy
   ```

5. **啟用 GitHub Pages**
   - 前往 GitHub 倉庫 Settings > Pages
   - Source 選擇 "gh-pages" 分支
   - 儲存後等待幾分鐘

---

## 方案四：建置成靜態檔案（任何伺服器）

如果你有自己的伺服器或主機空間：

### 步驟：

1. **建置專案**
   ```bash
   npm run build
   ```

2. **取得檔案**
   - 所有檔案都在 `dist` 資料夾中
   - 將 `dist` 資料夾內的所有檔案上傳到你的伺服器

3. **伺服器設定**
   - 確保伺服器支援 SPA（Single Page Application）
   - 所有路徑都應該指向 `index.html`

---

## 方案五：在其他電腦執行（開發模式）

如果要在其他電腦上開發或測試：

### 步驟：

1. **複製整個專案資料夾** 到目標電腦

2. **確保已安裝 Node.js**
   ```bash
   node --version  # 應該是 v16 以上
   npm --version
   ```

   如果沒有，從 https://nodejs.org 下載安裝

3. **安裝依賴**
   ```bash
   cd mario-elimination-game
   npm install
   ```

4. **啟動開發伺服器**
   ```bash
   npm run dev
   ```

5. **開啟瀏覽器**
   - 前往 http://localhost:5173

### 在區域網路分享（讓同網路其他裝置訪問）

1. **啟動時加上 --host**
   ```bash
   npm run dev -- --host
   ```

2. **記下你的 IP 位址**
   - Mac/Linux: `ifconfig | grep "inet "`
   - Windows: `ipconfig`

3. **其他裝置訪問**
   - 同網路的手機或電腦可以訪問：
   - `http://YOUR_IP:5173`
   - 例如：`http://192.168.1.100:5173`

---

## 方案六：打包成單一 HTML（離線使用）

如果需要完全離線使用（不推薦，因為會失去一些功能）：

### 使用 Vite 外掛：

1. **安裝 vite-plugin-singlefile**
   ```bash
   npm install --save-dev vite-plugin-singlefile
   ```

2. **修改 vite.config.js**
   ```js
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'
   import { viteSingleFile } from 'vite-plugin-singlefile'

   export default defineConfig({
     plugins: [react(), viteSingleFile()],
   })
   ```

3. **建置**
   ```bash
   npm run build
   ```

4. **結果**
   - `dist/index.html` 會包含所有內容
   - 可以直接雙擊開啟（但圖片上傳功能可能受限）

---

## 推薦方案總結

| 方案 | 適用情境 | 難度 | 費用 |
|------|---------|------|------|
| **Vercel** | 線上分享、正式使用 | ⭐ 簡單 | 免費 |
| **Netlify** | 線上分享、正式使用 | ⭐ 簡單 | 免費 |
| **GitHub Pages** | 開源專案、展示 | ⭐⭐ 中等 | 免費 |
| **靜態檔案** | 自有伺服器 | ⭐⭐ 中等 | 依伺服器 |
| **本地執行** | 開發、測試 | ⭐ 簡單 | 免費 |
| **區域網路** | 活動現場使用 | ⭐⭐ 中等 | 免費 |

---

## 常見問題

### Q: 部署後圖片上傳不能用？
A: 確保使用 HTTPS 連線，某些瀏覽器在 HTTP 下限制檔案上傳功能。

### Q: 如何更新已部署的網站？
A:
- Vercel/Netlify: 推送新代碼到 GitHub 會自動更新
- 靜態檔案: 重新 `npm run build` 並上傳新的 `dist` 檔案

### Q: 可以改域名嗎？
A:
- Vercel/Netlify: 可在設定中綁定自訂域名
- GitHub Pages: 可設定 CNAME

### Q: 需要持續運行伺服器嗎？
A: 不需要！這是靜態網站，部署後不需要 Node.js 伺服器。

---

## 技術支援

如有任何部署問題，可以查看：
- [Vite 文件](https://vitejs.dev/guide/static-deploy.html)
- [Vercel 文件](https://vercel.com/docs)
- [Netlify 文件](https://docs.netlify.com/)

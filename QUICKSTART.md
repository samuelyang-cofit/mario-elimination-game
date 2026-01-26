# 快速啟動指南 🚀

## 在新電腦上首次執行

### 方法一：直接使用（最簡單）

1. **複製整個 `mario-elimination-game` 資料夾** 到新電腦

2. **下載並安裝 Node.js**
   - 前往 https://nodejs.org
   - 下載 LTS 版本（建議 v18 或更新）
   - 安裝完成後，重啟終端機

3. **開啟終端機（Terminal / 命令提示字元）**
   - Mac: 開啟「終端機」應用程式
   - Windows: 開啟「命令提示字元」或「PowerShell」

4. **進入專案資料夾**
   ```bash
   cd mario-elimination-game
   ```

5. **安裝相依套件**（第一次需要，約需 1-2 分鐘）
   ```bash
   npm install
   ```

6. **啟動遊戲**
   ```bash
   npm run dev
   ```

7. **開啟瀏覽器**
   - 自動開啟，或手動前往：http://localhost:5173
   - 開始玩遊戲！

---

## 在活動現場使用（區域網路分享）

如果要讓現場其他裝置（手機、平板）也能玩：

1. **啟動時加上 --host 參數**
   ```bash
   npm run dev -- --host
   ```

2. **查看你的 IP 位址**

   **Mac 用戶：**
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```

   **Windows 用戶：**
   ```bash
   ipconfig
   ```
   找到「IPv4 位址」，通常是 `192.168.x.x` 格式

3. **讓其他裝置連線**
   - 確保所有裝置在同一個 Wi-Fi 網路
   - 在其他裝置的瀏覽器輸入：
   - `http://你的IP:5173`
   - 例如：`http://192.168.1.100:5173`

---

## 建置成網站檔案

如果要放到網站伺服器或分享給別人：

1. **建置專案**
   ```bash
   npm run build
   ```

2. **取得檔案**
   - 所有檔案都在 `dist` 資料夾
   - 將 `dist` 資料夾內的檔案上傳到任何網頁伺服器

3. **測試建置結果**
   ```bash
   npm run preview
   ```
   - 前往 http://localhost:4173 查看建置後的版本

---

## 上傳到 GitHub（準備線上部署）

1. **初始化 Git**
   ```bash
   git init
   git add .
   git commit -m "瑪利歐動作淘汰賽初始版本"
   ```

2. **在 GitHub 建立新倉庫**
   - 前往 https://github.com/new
   - 建立新倉庫（不要加入 README、.gitignore 或 License）

3. **推送到 GitHub**
   ```bash
   git branch -M main
   git remote add origin https://github.com/你的帳號/你的倉庫.git
   git push -u origin main
   ```

4. **部署到 Vercel（最簡單的線上部署）**
   - 前往 https://vercel.com
   - 用 GitHub 帳號登入
   - 點擊 "New Project"
   - 選擇你剛才的倉庫
   - 點擊 "Deploy"
   - 等待 2-3 分鐘，獲得一個網址！

---

## 常見問題排除

### ❌ 執行 `npm install` 時出錯

**解決方法：**
- 確認 Node.js 版本：`node --version`（需要 v16 以上）
- 刪除 `node_modules` 和 `package-lock.json`
- 重新執行 `npm install`

### ❌ 無法訪問 localhost:5173

**解決方法：**
- 檢查防火牆設定
- 確認沒有其他程式佔用 5173 port
- 或更改 port：`npm run dev -- --port 3000`

### ❌ 上傳圖片後無法顯示

**解決方法：**
- 確保圖片格式是 JPG、PNG、GIF
- 確保圖片檔案不要太大（建議 < 5MB）
- 重新整理頁面

### ❌ 其他裝置無法連線（區域網路）

**解決方法：**
- 確保所有裝置在同一個 Wi-Fi
- 確認防火牆沒有阻擋連線
- Windows: 設定 > 網路和網際網路 > 防火牆 > 允許應用程式通過防火牆
- Mac: 系統偏好設定 > 安全性與隱私權 > 防火牆選項

---

## 技術規格

- **Node.js**: v16 以上
- **npm**: v7 以上
- **瀏覽器**: Chrome, Firefox, Safari, Edge（最新版本）
- **網路**: 不需要網路（除了首次安裝套件）
- **系統**: Windows, macOS, Linux

---

## 需要協助？

如果遇到任何問題，請：
1. 檢查 Node.js 和 npm 版本
2. 查看終端機的錯誤訊息
3. 閱讀完整的 DEPLOYMENT.md 文件

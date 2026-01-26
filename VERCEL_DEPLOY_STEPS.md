# Vercel 部署步驟指南

## 📋 部署前準備

✅ Git 倉庫已初始化
✅ 所有檔案已提交
✅ 專案結構完整

---

## 🚀 步驟一：建立 GitHub 倉庫

1. **前往 GitHub 建立新倉庫**
   - 開啟瀏覽器前往：https://github.com/new
   - 如果還沒有 GitHub 帳號，先註冊一個

2. **填寫倉庫資訊**
   ```
   Repository name: mario-elimination-game
   Description: 瑪利歐動作淘汰賽遊戲
   Public 或 Private: 選擇你喜歡的（兩者都能部署到 Vercel）

   ⚠️ 重要：不要勾選以下選項
   [ ] Add a README file
   [ ] Add .gitignore
   [ ] Choose a license
   ```

3. **點擊 "Create repository"**

---

## 📤 步驟二：推送到 GitHub

1. **回到終端機**，執行以下指令：

   ```bash
   # 設定遠端倉庫（將 YOUR_USERNAME 替換成你的 GitHub 帳號）
   git remote add origin https://github.com/YOUR_USERNAME/mario-elimination-game.git

   # 推送到 GitHub
   git branch -M main
   git push -u origin main
   ```

2. **輸入 GitHub 認證資訊**
   - 如果要求登入，輸入你的 GitHub 帳號密碼
   - 如果使用 SSH，確保已設定 SSH Key

3. **確認推送成功**
   - 重新整理 GitHub 頁面
   - 應該能看到所有檔案

---

## 🌐 步驟三：部署到 Vercel

1. **前往 Vercel 網站**
   - 開啟瀏覽器：https://vercel.com
   - 點擊 "Sign Up" 或 "Login"

2. **使用 GitHub 帳號登入**
   - 選擇 "Continue with GitHub"
   - 授權 Vercel 訪問你的 GitHub

3. **建立新專案**
   - 登入後，點擊 "Add New..." > "Project"
   - 或直接前往：https://vercel.com/new

4. **選擇倉庫**
   - 在列表中找到 `mario-elimination-game`
   - 點擊 "Import"

5. **設定專案**（通常不需要修改）
   ```
   Framework Preset: Vite (Vercel 會自動偵測)
   Build Command: npm run build (已自動填入)
   Output Directory: dist (已自動填入)
   Install Command: npm install (已自動填入)
   ```

6. **點擊 "Deploy"**
   - 等待 1-3 分鐘，Vercel 會自動建置並部署你的專案
   - 你會看到建置過程的即時 log

7. **完成！**
   - 部署成功後，你會看到慶祝動畫 🎉
   - Vercel 會提供一個網址，例如：
     ```
     https://mario-elimination-game-abc123.vercel.app
     ```
   - 點擊 "Visit" 或複製網址分享給朋友！

---

## 🔄 之後如何更新網站？

每次修改代碼後：

```bash
# 1. 提交變更
git add .
git commit -m "描述你的修改"

# 2. 推送到 GitHub
git push

# 3. Vercel 會自動偵測並重新部署（不需要任何操作！）
```

---

## ⚙️ 進階設定（選用）

### 自訂域名

1. 在 Vercel 專案頁面，前往 "Settings" > "Domains"
2. 輸入你的域名，例如：`mario-game.com`
3. 按照指示設定 DNS

### 環境變數

1. 前往 "Settings" > "Environment Variables"
2. 加入你需要的環境變數

### 查看部署歷史

1. 前往專案的 "Deployments" 頁面
2. 可以看到所有部署記錄
3. 可以回滾到任何先前的版本

---

## ❓ 常見問題

### Q: GitHub 推送時要求密碼但無法登入？

A: GitHub 已停用密碼認證，需要使用 Personal Access Token：
1. 前往 GitHub Settings > Developer settings > Personal access tokens
2. 生成新 token，權限選擇 `repo`
3. 複製 token，在推送時將 token 當作密碼使用

### Q: Vercel 建置失敗？

A: 檢查建置 log，常見原因：
- Node.js 版本不相容（Vercel 預設使用 Node 18）
- 套件安裝失敗
- 建置過程有錯誤

解決方法：在本地執行 `npm run build` 確認能成功建置

### Q: 部署後網站空白？

A: 檢查瀏覽器 Console 是否有錯誤，通常是：
- 路徑問題
- 資源載入失敗

解決方法：確認 `vite.config.js` 中的 `base` 設定正確

### Q: 想要刪除部署？

A:
1. 前往 Vercel 專案 Settings
2. 滾動到最下方
3. 點擊 "Delete Project"

---

## 📱 分享你的遊戲

部署成功後，你可以：
- 📧 將網址用 Email 或訊息分享給朋友
- 📱 用手機掃描 QR Code（Vercel 會提供）
- 🔗 放在社群媒體上
- 👥 在活動中讓大家一起玩

---

## 🎮 享受你的遊戲！

現在你的瑪利歐動作淘汰賽已經在線上了！任何人都可以通過網址訪問和遊玩。

有任何問題歡迎隨時詢問！

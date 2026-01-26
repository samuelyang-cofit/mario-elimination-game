import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Play, RotateCcw, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react'

function App() {
  const [images, setImages] = useState([])
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [currentSpinImage, setCurrentSpinImage] = useState(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [previewIndex, setPreviewIndex] = useState(0)
  const audioRef = useRef(null)
  const resultAudioRef = useRef(null)

  // 預設的瑪利歐動作圖片（使用 placeholder）
  const defaultImages = [
    'https://placehold.co/400x400/E52521/FFFFFF?text=Mario+Jump',
    'https://placehold.co/400x400/009DDC/FFFFFF?text=Mario+Run',
    'https://placehold.co/400x400/FBD000/000000?text=Mario+Slide',
  ]

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length < 3 || files.length > 5) {
      alert('請上傳 3 到 5 張照片！')
      return
    }

    const imagePromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => resolve(e.target.result)
        reader.readAsDataURL(file)
      })
    })

    Promise.all(imagePromises).then((loadedImages) => {
      setImages(loadedImages)
      setIsPreviewMode(true)
      setPreviewIndex(0)
    })
  }

  const nextPreview = () => {
    setPreviewIndex((prev) => (prev + 1) % displayImages.length)
  }

  const prevPreview = () => {
    setPreviewIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length)
  }

  const exitPreview = () => {
    setIsPreviewMode(false)
  }

  const startGame = () => {
    const imagesToUse = images.length > 0 ? images : defaultImages
    setIsSpinning(true)
    setShowResult(false)
    setSelectedImage(null)

    // 播放音效
    if (!isMuted && audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    }

    let spinCount = 0
    const maxSpins = 30

    const spinInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * imagesToUse.length)
      setCurrentSpinImage(imagesToUse[randomIndex])
      spinCount++

      if (spinCount >= maxSpins) {
        clearInterval(spinInterval)
        setTimeout(() => {
          const finalIndex = Math.floor(Math.random() * imagesToUse.length)
          setSelectedImage(imagesToUse[finalIndex])
          setIsSpinning(false)
          setShowResult(true)

          // 播放結果音效
          if (!isMuted && resultAudioRef.current) {
            resultAudioRef.current.currentTime = 0
            resultAudioRef.current.play().catch(() => {})
          }
        }, 500)
      }
    }, 100)
  }

  const reset = () => {
    setImages([])
    setSelectedImage(null)
    setShowResult(false)
    setCurrentSpinImage(null)
    setIsPreviewMode(false)
    setPreviewIndex(0)
  }

  const displayImages = images.length > 0 ? images : defaultImages

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-blue to-blue-300 overflow-hidden">
      {/* 音效元素 */}
      <audio ref={audioRef} src="https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3" />
      <audio ref={resultAudioRef} src="https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3" />

      {/* 雲朵背景 */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-80"
            style={{
              width: `${100 + i * 20}px`,
              height: `${50 + i * 10}px`,
              top: `${20 + i * 15}%`,
              left: `${i * 20}%`,
            }}
            animate={{
              x: [0, 50, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* 標題 */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-pixel text-mario-red mb-4 drop-shadow-lg"
              style={{ textShadow: '4px 4px 0 #000' }}>
            MARIO
          </h1>
          <h2 className="text-3xl md:text-4xl font-chinese-cute text-white mb-2"
              style={{ textShadow: '3px 3px 0 #000' }}>
            動作淘汰賽
          </h2>
          <p className="text-xs md:text-sm font-pixel text-yellow-300">
            ACTION ELIMINATION GAME
          </p>
        </motion.div>

        {/* 音效開關 */}
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="bg-mario-yellow p-3 rounded-lg border-4 border-black hover:bg-yellow-400 transition-colors"
          >
            {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
          </button>
        </div>

        {/* 上傳區域 */}
        {images.length === 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="bg-white border-8 border-black rounded-2xl p-8 shadow-2xl">
              <label className="cursor-pointer block">
                <div className="question-block border-8 border-black rounded-2xl p-12 hover:scale-105 transition-transform">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="text-center">
                    <Upload className="w-16 h-16 mx-auto mb-4 text-white" />
                    <p className="font-chinese-cute text-lg md:text-xl text-white">
                      上傳 3-5 張照片
                    </p>
                    <p className="font-chinese-cute text-sm md:text-base text-white mt-2 opacity-90">
                      或使用預設圖片
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </motion.div>
        )}

        {/* 照片預覽 */}
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 max-w-4xl mx-auto mb-8">
          {displayImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: index * 0.1 }}
              className="aspect-square"
            >
              <div className="brick-pattern border-4 border-black rounded-lg overflow-hidden h-full">
                <img
                  src={img}
                  alt={`Action ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* 抽獎顯示區 */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white border-8 border-black rounded-2xl p-8 shadow-2xl min-h-[400px] flex items-center justify-center relative">
            <AnimatePresence mode="wait">
              {isPreviewMode && (
                <motion.div
                  key="preview"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="w-full text-center"
                >
                  <motion.div
                    key={previewIndex}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-4"
                  >
                    <img
                      src={displayImages[previewIndex]}
                      alt={`Action ${previewIndex + 1}`}
                      className="w-full max-w-md mx-auto rounded-xl border-8 border-mario-blue shadow-2xl"
                    />
                  </motion.div>

                  <div className="flex justify-between items-center mt-6 px-4">
                    <button
                      onClick={prevPreview}
                      className="bg-mario-yellow p-4 rounded-xl border-4 border-black hover:bg-yellow-400 transition-all hover:scale-110"
                    >
                      <ChevronLeft className="w-8 h-8" />
                    </button>

                    <div className="bg-mario-red border-4 border-black rounded-xl px-6 py-3">
                      <p className="font-pixel text-2xl text-white"
                         style={{ textShadow: '2px 2px 0 #000' }}>
                        {previewIndex + 1} / {displayImages.length}
                      </p>
                      <p className="font-chinese-cute text-base md:text-lg text-yellow-300 mt-1">
                        動作說明
                      </p>
                    </div>

                    <button
                      onClick={nextPreview}
                      className="bg-mario-yellow p-4 rounded-xl border-4 border-black hover:bg-yellow-400 transition-all hover:scale-110"
                    >
                      <ChevronRight className="w-8 h-8" />
                    </button>
                  </div>
                </motion.div>
              )}

              {isSpinning && currentSpinImage && !isPreviewMode && (
                <motion.div
                  key="spinning"
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 360] }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.1 }}
                  className="w-full max-w-md"
                >
                  <img
                    src={currentSpinImage}
                    alt="Spinning"
                    className="w-full h-auto rounded-xl border-4 border-mario-red"
                  />
                </motion.div>
              )}

              {showResult && selectedImage && !isPreviewMode && (
                <motion.div
                  key="result"
                  initial={{ scale: 0, y: 100 }}
                  animate={{ scale: 1, y: 0 }}
                  className="text-center"
                >
                  <motion.img
                    src={selectedImage}
                    alt="Selected"
                    className="w-full max-w-md mx-auto rounded-xl border-8 border-mario-red shadow-2xl mb-4"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity
                    }}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-mario-red border-4 border-black rounded-xl p-6 inline-block"
                  >
                    <p className="font-pixel text-xl md:text-3xl text-white mb-2"
                       style={{ textShadow: '3px 3px 0 #000' }}>
                      OUT!
                    </p>
                    <p className="font-chinese-cute text-lg md:text-2xl text-yellow-300">
                      這個動作的人淘汰！
                    </p>
                  </motion.div>
                </motion.div>
              )}

              {!isSpinning && !showResult && !isPreviewMode && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <div className="question-block w-32 h-32 mx-auto border-8 border-black rounded-2xl mb-4 animate-bounce-slow" />
                  <p className="font-chinese-cute text-xl md:text-2xl text-gray-600">
                    準備開始遊戲
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 控制按鈕 */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          {isPreviewMode ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={exitPreview}
              className="bg-mario-red text-white font-chinese-cute px-8 py-4 rounded-xl border-4 border-black
                       shadow-lg hover:bg-red-600 flex items-center gap-3 text-base md:text-xl"
            >
              <Play className="w-6 h-6" />
              完成預覽，開始遊戲
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              disabled={isSpinning}
              className="bg-mario-red text-white font-pixel px-8 py-4 rounded-xl border-4 border-black
                       shadow-lg hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed
                       flex items-center gap-3 text-sm md:text-base"
            >
              <Play className="w-6 h-6" />
              {isSpinning ? 'SPINNING...' : 'START GAME'}
            </motion.button>
          )}

          {(images.length > 0 || showResult) && !isPreviewMode && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={reset}
              className="bg-mario-blue text-white font-pixel px-8 py-4 rounded-xl border-4 border-black
                       shadow-lg hover:bg-blue-600 flex items-center gap-3 text-sm md:text-base"
            >
              <RotateCcw className="w-6 h-6" />
              RESET
            </motion.button>
          )}
        </div>

        {/* 遊戲說明 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="max-w-2xl mx-auto mt-12 bg-white border-4 border-black rounded-xl p-6"
        >
          <h3 className="font-chinese-cute text-2xl mb-6 text-center text-mario-red">遊戲規則</h3>
          <ol className="font-chinese-cute text-base md:text-lg space-y-3 text-gray-700 leading-relaxed">
            <li>1. 上傳 3-5 張瑪利歐動作照片</li>
            <li>2. 預覽並向玩家說明每個動作</li>
            <li>3. 點擊左右箭頭切換動作照片</li>
            <li>4. 完成預覽後點擊開始遊戲</li>
            <li>5. 系統隨機選出一張照片</li>
            <li>6. 做出該動作的人淘汰！</li>
            <li>7. 重複進行直到選出前三名</li>
          </ol>
        </motion.div>
      </div>
    </div>
  )
}

export default App

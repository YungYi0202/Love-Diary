# [109-1] Web Programming Final
## (Group 48) Love Diary
### Deployment: http://love-diary.anyday.com.tw/ 
### Demo link : https://www.youtube.com/watch?v=i9KwDC7gTMs

### 功能介紹：
  這是一款針對情侶來設計的手帳，有註冊和登入功能。設計成一本書的形式，就像翻頁一樣切換。
  
  登入後為Home頁，左頁顯示兩人的交往日期，右頁顯示重要事件作為時間軸。而重要事件的增加減少可由右邊書籤中進入Calendar頁裡面加入重要事件。

  Calendar頁面提供給兩人互相分享日程，右邊Add按鈕可以新增事件，並貼心地分成許多顏色來區分種類。事件會自動儲存，且只會顯示該帳號的資料。事件新增後可長按拖移來更改事件所發生的日期，點擊即可刪除事件。若Add時將事件設「喜愛」，則會自動顯示在Home頁的時間軸，若Add時將事件類型選擇Todo，則會變成待辦事項，新增後會顯示在右下列表，每一項都可拖移至行事曆上。若日曆一次選取多日，即可在右上列表查看所有被選取之事件。
  
  Diary頁面提供人們每日紀錄生活，左右有箭頭可切換日期，也可直接經由左上選擇特定日期。左頁有表情符號可以代表今日心情，並有輸入框可以記錄一天生活。右頁可以上傳照片，並增加照片敘述。按下Save後所有資料都會存進DB，且圖片會轉成imgur網址格式儲存。

### 使用/操作方式 : 
``` 
git clone 暫不公布網址
cd Love_Diary
yarn
```
開啟兩個終端機分別執行`cd Love_Diary & yarn start` 和 `cd Love_Diary & yarn server`

(由於deploy時改了相關內容，故git clone後若直接運作可能無法正常執行，需修改code內容)

### 使用與參考之框架/模組/原始碼
* antd
* fullcalendar
* imgur(API)

### 專題製作心得 : 

#### B08902029 陳咏誼 :
  我負責的部分是前端和後端，這次後端的寫法寫得不是很好，導致我們在deploy的時候出現很多bug，不過我還是寫得很開心，因為這是電資領域裡少數可以發揮美工興趣的地方，可以說是我這學期修的課裡面最喜歡的一堂。老師的上課內容很扎實，而且由淺入深，我在學期開始之前的暑假有自己學習寫網站，但學得很零碎，上了這門課之後才終於把相關知識比較有系統地在大腦建立起來，覺得很幸運能上到這堂課！
  
#### B08902006 陳姿穎 :
  一開始的想法很多，實際做起來後才發現要實現想像的模樣有些難度，儘管網路上很多套件，但每個人使用的環境、背景都不同，常常會有很多error需要解決。前端後端的溝通很不容易，常常一點小更動就很多份code都要改。而前端的排版以及後端的資料庫該存取的資料也是因沒有正確答案而令人苦惱。在寫這份Final時由於查了很多資料，學會了很多新的套件，也將很多語法都記熟了。Depoly成網站時雖然很不容易、重重難關，但最後成功讓別人從遠端使用自己的作品非常有成就感！
  
  
### 使用之第三方套件、框架、程式碼
* 程式前後端相關:

• Fullcalendar

• imgur(API)

• express

* 網頁美編設計相關:

• antd

• RoughNotation

• Fontawesome

• Material-UI

### 補充說明 : 
 因為我們想呈現親手寫手帳的感覺，所以排版方面(例如CSS)，是一步步徹底手刻出來的，沒有套用任何模板或套件。

# 期末專題報告 : 

### 分工介紹
(由於之中有無數的互相討論或查詢資料、較難以結果論述，以下均為概述)

#### 組長 : B08902029 陳咏誼 (主導後端與前端)
查資料、設計外觀、server(後端)的設計與連接、MongoDB之Schema、router前後端溝通與互動、日曆、時間線、除各式各樣的bug、增加使用上巧思與小驚喜、deploy網頁、做DEMO投影片

#### 組員 : B08902006 陳姿穎 (設計HTML、CSS與前端)
想主題、將前端排版至理想的模樣、前端堆疊與BrowserRouter切換、用Imgur API上傳圖片、日記、圖片牆、設計封面與書籤等背景、寫ReadMe、錄DEMO

### Deployed 連結 :
http://love-diary.anyday.com.tw/ 

### Demo link:
https://www.youtube.com/watch?v=i9KwDC7gTMs 

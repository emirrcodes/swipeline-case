**Tweet Analyzer – Swipeline Case**

Bu proje, Swipeline AI Studio Developer Intern teknik görevi kapsamında geliştirilen bir AI destekli Tweet analiz uygulamasıdır. Kullanıcıdan alınan bir tweet (ya link olarak ya da manuel girişle), Gemini API üzerinden analiz edilir ve sonuçlar Google Sheets’e otomatik kaydedilir.

Özellikler
	•	🔗 URL ile Analiz: Tweet linkini girerek analiz yapar (Not: Ücretsiz X API’da 15 dakikada 1 istek limiti vardır)
	•	📝 Manuel Giriş: Kullanıcı adı ve tweet metni elle girilerek analiz yapılabilir
	•	📊 Analiz Sonuçları: Tweet içeriği, kullanıcı adı, içerik özeti (1-2 cümle), duygu analizi (olumlu / olumsuz / nötr), tarih ve saat bilgisi
	•	📁 Google Sheets Entegrasyonu: Her analiz sonucu tabloya yeni bir satır olarak eklenir
	•	💻 Responsive Tasarım: Hem mobil hem desktop cihazlara uyumlu
	•	🔔 Toast Bildirimi: Sonuçlar başarılı şekilde kaydedildiğinde kullanıcıya bildirim gösterilir

Kurulum

1.	Repoyu Klonla:
````
git clone https://github.com/emirrcodes/swipeline-case.git
cd swipeline-case
````

2.	Bağımlılıkları Yükle:

Backend:
````
cd backend
npm install
`````

Frontend:
`````
cd ../frontend
npm install
`````

	3.	.env Dosyasını Oluştur:

backend/.env içinde:
````
----
````

4.	Google Sheets API için credentials.json dosyasını Google Cloud Console üzerinden oluştur, backend/safe/credentials.json konumuna koy. Bu klasör .gitignore ile korunmaktadır.

Çalıştırma

Backend:
`````
cd backend
node index.js
`````
Frontend:
````
cd frontend
npm run dev
`````
Uygulama tarayıcıdan http://localhost:5173 üzerinden erişilebilir.

Kullanım
	•	Tweet URL’si girerek analiz: Örnek → https://x.com/Swipeline_tr/status/1928468612395807155
	•	Manuel modda analiz: Örnek kullanıcı adı → @username, içerik → Hava bugün mükemmel!
	•	Sonuçlar ekranda görüntülenir ve otomatik olarak Google Sheets’e yazılır

Örnek Google Sheets (Read-Only):
https://docs.google.com/spreadsheets/d/1La3s4tSLambY-fUcVeAc2a4fnIwPxVQoxxazeJfUHhk

Notlar
	•	X API free plan’da 15 dakikada 1 istek hakkı var. Gelişmiş erişim önerilir.
	•	Google Sheets’teki sayfa adı “Sayfa1” olarak sabittir
	•	react-toastify ile analiz sonrası bildirim sağlanır
	•	UI sade tutulmuştur, odak backend + analiz işlevselliğidir

Kullanılan Teknolojiler
	•	Frontend: React, Axios, react-icons, react-toastify
	•	Backend: Node.js, Express, Axios, OAuth-1.0a
	•	API’ler: Gemini API, Google Sheets API (isteğe bağlı X API)

##Ahmet Emir Arslan

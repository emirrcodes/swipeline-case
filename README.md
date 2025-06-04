Tweet Analyzer - Swipeline Case
Swipeline AI Studio Developer Intern görevi için geliştirilen bir Tweet Analyzer uygulaması. Tweet’leri X API ile çekebilir veya manuel girişle analiz eder, Gemini API ile özet ve duygu analizi yapar, sonuçları Google Sheets’e kaydeder.
Özellikler

URL ile Analiz: X API üzerinden tweet URL’si ile analiz yapar (Ücretsiz planda 15 dakikada 1 istek limiti var, dikkat!).
Manuel Giriş: Kullanıcı adı ve tweet içeriği manuel girilip analiz yapılır.
Sonuçlar: Kullanıcı adı, tweet, özet, duygu analizi ve tarih bilgisi ekranda ve Google Sheets’te gösterilir.
Responsive Tasarım: Mobil ve desktop cihazlara uyumlu.
Toast Bildirimi: Analiz sonrası sonuçların Google Sheets’e kaydedildiği bildirimi.

Kurulum

Repoyu Klonla:git clone https://github.com/<kullanıcı-adın>/swipeline-case.git
cd swipeline-case


Bağımlılıkları Yükle:npm install

Frontend için:cd frontend
npm install


.env Dosyasını Oluştur:Proje kök dizininde .env dosyası oluştur ve şu bilgileri ekle:GEMINI_API_KEY=your-gemini-api-key
GOOGLE_SHEETS_ID=1La3s4tSLambY-fUcVeAc2a4fnIwPxVQoxxazeJfUHhk
X_API_KEY=your-x-api-key
X_API_SECRET=your-x-api-secret
X_ACCESS_TOKEN=your-x-access-token
X_ACCESS_TOKEN_SECRET=your-x-access-token-secret


Google Sheets API için Credentials:
Google Cloud’dan credentials.json dosyasını al, proje kök dizinine koy.


Backend’i Çalıştır:node index.js


Frontend’i Çalıştır:cd frontend
npm start



Kullanım

Tarayıcıda http://localhost:5173’e git.
URL ile Analiz: Tweet URL’si gir (ör: https://x.com/username/status/123456789), "Analyze"e bas. (Not: Ücretsiz X API’da 15 dakikada 1 istek limiti var.)
Manuel Giriş: Kullanıcı adı (ör: @kanka) ve tweet içeriği (ör: Hava güzel!) gir, "Analyze"e bas.
Sonuçlar ekranda gösterilir ve Google Sheets’e kaydedilir.

Örnek Tablo
Sonuçlar şu Google Sheets’e kaydediliyor (Salt okunur):Google Sheets Link
Notlar

X API limiti yüzünden "URL ile Analiz" modunda 15 dakikada 1 istek yapılabilir. Elevated Access önerilir.
Google Sheets’te sayfa adı Sayfa1 olarak tespit edildi, kod buna göre güncellendi.
Responsive tasarım mobil ve desktop’ta sorunsuz çalışır.
react-toastify ile analiz sonrası bildirim eklendi.

Teknolojiler

Frontend: React, Axios, react-icons, react-toastify
Backend: Node.js, Express, Axios, OAuth-1.0a
API’ler: X API, Gemini API, Google Sheets API


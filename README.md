# Algan Team Yönetim Sistemi — Backend API

Anavatanı gökler olan Algan İHA Takımı'nın ekip üyelerinin çalışma günlerini, giriş/çıkış saatlerini ve devam durumlarını dijital ortamda takip etmek amacıyla geliştirilmiş, katmanlı mimariye (Enterprise Architecture) sahip robust bir REST API sunucusudur.

## Proje Amacı ve Genel Bakış
Bu proje, üniversitedeki "Yapay Zeka Destekli Yazılım Geliştirme" dersi için akademik bir ödev olarak geliştirilmiştir. Frontend ve Backend olarak iki parçadan oluşan sistemin sunucu tarafını oluşturan bu proje, veritabanı yönetimini, yetkilendirme algoritmalarını ve iş mantığını (Business Logic) güvenli ve hızlı bir şekilde işletmek amacıyla tasarlanmıştır.

## 👥 Geliştirici Ekip
* **Yusuf KURT** - 22247010 (Elektrik-Elektronik Mühendisliği)
* **Hüseyin UYGUN** - 21247076
* **Ramdan Almjaidi** - 21247814
* **Yiğit ÇALIŞKAN** - 22247048

## 🚀 Teknolojik Altyapı (Tech Stack)
* **NestJS 11:** Güçlü, modüler ve TypeScript tabanlı yapısıyla API'nin ana çatısını oluşturur. Bağımlılık Enjeksiyonu (DI) sayesinde test edilebilirlik sağlar.
* **TypeORM (0.3):** SQL sorguları yazmadan, nesne-ilişkisel eşleme (Object-Relational Mapping) ile veritabanı tablolarını yönetmek için kullanılmıştır.
* **PostgreSQL:** Sistemin kalıcı veri depolama ihtiyacı için, bulut tabanlı (Neon / Render) ilişkisel veritabanı tercih edilmiştir.
* **Bcrypt:** Kullanıcı parolalarını veritabanında düz metin (plain text) olarak saklamamak, tek yönlü şifreleme ile güvenliği artırmak için kullanılmıştır.
* **Jest:** Controller ve Service katmanlarının izole bir şekilde test edilmesi (Unit Testing) amacıyla kullanılmıştır.

## 🏗️ Mimari ve Modüller
Backend projemiz Nesne Yönelimli Programlama (OOP) ve "SOLID" (özellikle Tek Sorumluluk - SRP) prensiplerine tam uyumlu geliştirilmiştir:
* **Controller Katmanı:** Sadece dışarıdan gelen HTTP (GET, POST vb.) isteklerini karşılar, veriyi alır ve Service katmanına iletir.
* **Service Katmanı (İş Mantığı):** Controller'dan gelen verileri işler, doğrulama yapar ve veritabanı katmanıyla iletişime geçer. Bu ayrım, kodun tekrarını önler ve bakımını kolaylaştırır.
* **Entity Katmanı (Veri Modeli):** TypeORM üzerinden veritabanı tablolarının şemalarını ve veri tiplerini tanımlar.
* **Global Hata Yönetimi:** Tüm sistemdeki istisnalar (Exceptions), tek bir merkezden (`GlobalExceptionFilter`) yönetilerek istemciye (Frontend) tutarlı ve anlaşılır hata mesajları (HTTP 4xx, 5xx) döndürülür.

## 🤖 Yapay Zeka (Gemini Pro 3.1) Kullanımı
Yazılım süreçlerinde **Gemini Pro 3.1** yapay zeka asistanı olarak şu alanlarda aktif rol almıştır:
* **Mimari Kurgulama ve Temiz Kod:** Backend içerisindeki bağımlılık karmaşası, yapay zekanın "Clean Architecture" önerileri doğrultusunda çözümlenmiş; kod, Service ve Controller yapılarına ayrıştırılmıştır.
* **Birim Test (Unit Test) Yazımı:** NestJS'in test modülü olan Jest konfigürasyonlarında ve test senaryolarının (`.spec.ts` dosyaları) mock (taklit) verilerle oluşturulmasında yapay zekanın sağladığı taslaklar sayesinde yüksek oranda test kapsamına ulaşılmıştır.
* **Veri Analitiği (AI Modülü):** Sisteme entegre edilen `/ai/analyze` rotasında toplanan log verileri, yine LLM altyapısıyla anlamlandırılarak yöneticilere performans ve motivasyon raporları (Prompt Engineering kullanılarak) sunulmaktadır.

## 📊 Kod Kalitesi ve SonarCloud.io Entegrasyonu
Projenin "Teknik Borç" (Technical Debt) oranının akademik ister olan **%5'in altında** tutulması için şu pratikler benimsenmiştir:
* **Statik Kod Analizi:** Kod tabanı **SonarCloud.io** ile taranmış; tanımlı olmayan türler (any kullanımı), potansiyel null-pointer hataları ve "Code Smell" (kötü kod pratikleri) tespit edilip düzeltilmiştir.
* **TypeScript Tür Güvenliği:** Sistemin daha güvenilir çalışması için DTO (Data Transfer Object) ve Entity sınıflarındaki eksik tür tanımlamaları tamamlanmış, çalışma zamanı (runtime) hatalarının önüne geçilmiştir.
* **Test Edilebilirlik:** Service'ler için oluşturulan test senaryoları sayesinde sistem güvenliği kanıtlanmış, Linter kurallarıyla (ESLint/Prettier) tüm kodlar homojen bir okuma standartına getirilmiştir.

## ⚙️ Kurulum ve Çalıştırma Talimatları
1. **Gereksinimler:** Bilgisayarınızda Node.js yüklü olmalıdır.
2. Bağımlılıkları yüklemek için terminalde şu komutu çalıştırın:
   ```bash
   npm install
   ```
3. Proje dizininde bir `.env` dosyası oluşturun ve `DATABASE_URL` değişkenine PostgreSQL bağlantı adresini (Örn: Neon.tech veya yerel DB) tanımlayın:
   ```env
   DATABASE_URL=postgresql://kullanici:sifre@localhost:5432/algan_db
   ```
4. Geliştirme sunucusunu başlatın:
   ```bash
   npm run start:dev
   ```
5. API varsayılan olarak `http://localhost:3000` adresinde çalışacaktır.
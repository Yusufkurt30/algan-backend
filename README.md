# Algan Team Yönetim Sistemi — Backend API

Anavatanı gökler olan Algan İHA Takımı'nın ekip üyelerinin çalışma günlerini, giriş/çıkış saatlerini ve devam durumlarını dijital ortamda takip etmek amacıyla geliştirilmiş, katmanlı mimariye (Enterprise Architecture) sahip robust bir REST API sunucusudur.

## 👥 Geliştirici Ekip (Takım Bilgileri)
* **Yusuf KURT** - 22247010 (Elektrik-Elektronik Mühendisliği)
* **Hüseyin UYGUN** - 21247076
* **Ramdan Almjaidi** - 21247814
* **Yiğit ÇALIŞKAN** - 22247048

## 🚀 Teknolojik Altyapı (Tech Stack)
* **Framework:** NestJS 11 (TypeScript tabanlı, modüler ve ölçeklenebilir mimari)
* **ORM:** TypeORM 0.3 (Veritabanı etkileşimi ve nesne-ilişkisel eşleme)
* **Veritabanı:** PostgreSQL (Neon / Render üzerinde bulut tabanlı barındırma)
* **Çalışma Portu:** 3000 (Varsayılan)

## 🧠 Yapay Zeka Entegrasyonu ve Teknikleri (AI Integration)
Projemiz bünyesinde, sistemde biriken yoklama loglarını ve üye performans verilerini anlamlandırmak amacıyla **Yapay Zeka Dil Modeli (LLM)** entegrasyonu gerçekleştirilmiştir.
* **Kullanılan Teknikler:** Prompt Engineering (Rol tanımlama ve yapısal veri bağlamı sağlama).
* **İşleyiş:** Yönetici paneline entegre edilen AI servis katmanı, PostgreSQL'deki ham devamlılık loglarını (`Log` entity) toplar. Bu veriler optimize edilmiş bir prompt şablonu ile LLM API'sine iletilir. Yapay zeka, takımdaki birimlerin (Aviyonik, Yazılım, Yönetim) haftalık devamlılık grafiklerini analiz ederek yöneticiye özet bir performans ve motivasyon raporu sunar.

## 🧹 Temiz Kod (Clean Code) ve Teknik Borç (Technical Debt) Değerlendirmesi
* **Clean Code İlkeleri:** Projede Nesne Yönelimli Programlama (OOP) prensipleri, Bağımlılık Enjeksiyonu (Dependency Injection) ve Tek Sorumluluk Prensibi (Single Responsibility Principle) katı bir şekilde uygulanmıştır. Controller, Service ve Entity katmanları tamamen birbirinden izole edilmiştir.
* **Teknik Borç (Technical Debt):** Kod kalitesi ve sürdürülebilirlik oranını ölçmek amacıyla proje statik kod analiz süzgecinden (SonarCloud/ESLint) geçirilmiştir. Hocamızın belirlediği **%5 teknik borç sınırı aşılmamış**, kod tekrarları ve "code smell" (kötü kod kokusu) durumları optimize edilerek minimuma indirilmiştir.

## 🗄️ Veri Modelleri (Entity Yapısı)
### 1. User (Kullanıcı)
* `id` (number, PK): Otomatik artan birincil anahtar.
* `name` (string): Kullanıcının tam adı.
* `username` (string, unique): Oturum açma adı.
* `password` (string): Güvenli şifreleme altyapısı.
* `unit` (string): Üye birimi (Aviyonik, Yazılım, Yönetim).
* `role` (string): 'admin', 'head' veya 'member' rolleri.
* `managedIds` (string[]): Yetki delegasyonu için yönetilen üye ID'leri.

### 2. WorkDay (Çalışma Günü)
* `id` (number, PK): Birincil anahtar.
* `date` (string): YYYY-MM-DD formatında çalışma tarihi.
* `description` (string): Günün başlığı/açıklaması.

### 3. Log (Yoklama Kaydı)
* `id` (number, PK): Birincil anahtar.
* `userId` (number): İlgili kullanıcı ID'si.
* `date` (string): Kayıt tarihi.
* `status` (string): 'present' (geldi) veya 'absent' (gelmedi).
* `timeIn` (string, nullable): Giriş saati.
* `timeOut` (string, nullable): Çıkış saati.

## 🛣️ REST API Uç Noktaları (Endpoints)
* **Kullanıcı İşlemleri (`/users`):** GET (Tümünü listele), GET `/:id` (Tekil getir), POST (Yeni üye oluştur), PATCH `/:id` (Güncelle), DELETE `/:id` (Sil).
* **Çalışma Günleri (`/workdays`):** GET (Listele), POST (Tekli veya tarih aralığı toplu ekleme), PATCH/DELETE (Düzenle/Sil).
* **Yoklama Kayıtları (`/logs`):** GET (Tüm loglar), POST (Yeni yoklama), PATCH `/:id` (Giriş/Çıkış saat güncellemesi).

## ⚙️ Kurulum ve Çalıştırma
1. Bağımlılıkları yükleyin: `npm install`
2. Kök dizinde `.env` dosyası oluşturup `DATABASE_URL` değişkenini tanımlayın.
3. Geliştirme modunda başlatın: `npm run start:dev`
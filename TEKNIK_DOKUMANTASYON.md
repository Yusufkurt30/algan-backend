# TEKNİK DOKÜMANTASYON — Backend API

Bu belge, "algan-WEB" projesinin "algan-backend" sunucu tarafındaki mimari yapısını, NestJS klasör hiyerarşisini ve projeye entegre edilen yapay zeka ile kalite kontrol araçlarının akademik değerini teknik bir perspektifle ele almaktadır.

## 1. Sunucu (Server) Mimarisi ve Haberleşme Altyapısı
Backend, mikroservis mantığına yakın, modüler ve yüksek ölçeklenebilir (Scalable) bir yapıda "NestJS" framework'ü ile kurgulanmıştır.

* **Sunucu Katmanı:** İstekleri karşılayan (Request) ve yanıtları (Response) HTTP protokolü üzerinden JSON formatında Frontend'e ulaştıran REST API servisidir.
* **Bağımlılık Enjeksiyonu (Dependency Injection):** Sınıfların birbirine sıkı sıkıya bağlı kalmasını önlemek için Inversion of Control (IoC) kapsayıcısı kullanılmış, böylece her bir servisin yaşam döngüsü merkezi olarak yönetilmiştir.
* **Veri Katmanı (ORM):** Veritabanı sorguları TypeORM (Object-Relational Mapping) ile yönetilmiş, SQL injection gibi güvenlik zafiyetlerinin önüne geçilmiş ve tablo ilişkileri (One-to-Many, Many-to-One) nesnesel olarak tanımlanmıştır.

## 2. Klasör Hiyerarşisi (Tree Formatı) ve Temel İşlevler

NestJS mimarisinin doğal modüler yapısına uygun olarak tasarlanan "Clean Architecture" tabanlı klasör yapısı aşağıdadır:

```
algan-backend/
├── node_modules/             # Proje bağımlılıkları (otomatik oluşturulur)
├── src/
│   ├── ai/                   # LLM entegrasyonu ve prompt işleme modülü
│   ├── audit-logs/           # Yoklama/log verilerinin işlendiği modül
│   ├── entities/             # TypeORM veritabanı modelleri (User, Log, WorkDay)
│   ├── users/                # Kullanıcı yönetimi, oturum (login) modülü
│   ├── workdays/             # Çalışma takvimi yönetimi modülü
│   ├── app.controller.ts     # Uygulamanın kök uç noktaları
│   ├── app.module.ts         # Projedeki tüm modüllerin birleştiği ana modül
│   └── main.ts               # Sunucuyu ayağa kaldıran (bootstrap) başlangıç dosyası
├── test/                     # Uçtan uca (e2e) testlerin bulunduğu dizin
├── .env                      # Veritabanı URL'si vb. gizli çevre değişkenleri (örnektir, git'e atılmaz)
├── .eslintrc.js / .mjs       # Statik kod analizi ve formatlama kuralları
├── package.json              # Proje kütüphaneleri ve komutları
├── tsconfig.json             # TypeScript derleyici konfigürasyonu
├── README.md                 # Proje genel dokümantasyonu
└── TEKNIK_DOKUMANTASYON.md   # Mimari ve akademik detayların belgesi
```

*Her bir modül kendi içinde Controller (`.controller.ts`), Service (`.service.ts`), DTO dosyaları ve test senaryolarını (`.spec.ts`) barındıracak şekilde kapsüllenmiştir (Encapsulation).*

## 3. Yapay Zeka Destekli Yazılım Geliştirme Araçlarının Katkısı

Sunucu tarafındaki geliştirme pratikleri, modern mühendislik yaklaşımlarını kapsayacak şekilde Yapay Zeka Destekli Kodlama araçları ve Otomatik Kod Analizi platformları ile zenginleştirilmiştir.

### LLM (Gemini Pro 3.1) Kullanımının Verimliliği
* **Karmaşık Algoritmaların Çözümü:** Kullanıcıların saat dilimi bazlı çalışma loglarının grafiksel veri yapısına uygun bir şekilde hesaplanıp Frontend'e dönülmesi (örneğin; çıkış yapılmamış bir log'un gün bittiğinde 23:59 olarak işaretlenmesi) gibi algoritmik senaryolar, Gemini asistanının mantıksal düzeltmeleri ile hatasız kurgulanmıştır.
* **Test Senaryosu Üretimi:** Backend'in test edilebilirliği (Testability) hedeflenerek, Jest için yazılan `.spec.ts` dosyalarındaki mock provider'ların ve birim test senaryolarının kurgulanmasında yapay zeka hızlandırıcı bir faktör olmuştur.

### Kod Kalite Metrikleri (SonarCloud) Katkısı
* **SOLID İhlallerinin Önlenmesi:** Controller içerisinde iş kurallarının (Business Logic) yazılması gibi tasarımsal hatalar statik analizle tespit edilmiş ve bu mantık Service katmanına taşınarak "Tek Sorumluluk" (Single Responsibility) ilkesi sağlanmıştır.
* **Teknik Borcun Minimize Edilmesi:** Statik kod analiz aracı olan SonarCloud.io'dan alınan raporlar doğrultusunda TypeScript tür kayıpları (`any` kullanımı) giderilmiş, Error Handling mekanizmaları optimize edilmiştir. Bu metrikler sayesinde Teknik Borç yüzdesi **%5 barajının altına** düşürülerek projenin akademik değeri ve sektör standartlarına uygunluğu maksimize edilmiştir.

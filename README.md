# Yapay Zeka Destekli Tasarım Projesi (Proje Adını Buraya Yaz)

## 👥 Takım Bilgileri
* **Yusuf KURT** - 22247010
* **Hüseyin UYGUN** - 21247076
* **Ramdan Almjaidi** - 21247814
* **Yiğit ÇALIŞKAN** - 22247048

## 🧠 Yapay Zeka Entegrasyonu ve Kullanılan Teknikler
Bu projede kullanıcıya / sisteme akıllı yanıtlar üretebilmek veya veri analizi yapabilmek için **[Gemini / OpenAI vs. hangisini kullandıysan]** dil modeli kullanılmıştır. 
* **Kullanılan Teknikler:** Sistem, kullanıcının girdiği verileri veya sistem loglarını alıp bir "Prompt (Komut)" olarak arka planda yapay zekaya iletmekte ve dönen anlamlı sonuçları frontend tarafına aktarmaktadır.

## 🏗️ Projenin Genel Mimarisi ve Teknoloji Altyapısı
Proje, "Clean Code" ilkelerine uygun olarak Frontend ve Backend olmak üzere iki bağımsız (decoupled) yapı olarak tasarlanmıştır.
* **Frontend Reposu:** [algan-frontend linkini buraya yapıştır]
* **Backend Reposu:** [Bu reponun linkini buraya yapıştır]
* **Kullanılan Teknolojiler:** Node.js / Python, React / HTML-CSS-JS *(Hangilerini kullandıysanız onları yazın)*

## 🗄️ Veritabanı Kullanımı
Projedeki verilerin kalıcı olarak saklanması için **[SQL / PostgreSQL / MongoDB vs. hangisi ise]** kullanılmıştır. Veritabanı, yapay zekadan gelen yanıtları, kullanıcı bilgilerini ve sistem verilerini güvenli bir şekilde depolamaktadır.

## 🧹 Teknik Değerlendirme ve Clean Code İlkeleri
* Kod yazımında Tek Sorumluluk Prensibi (Single Responsibility) gözetilmiş, fonksiyonlar karmaşadan uzak tutulmuştur.
* Anlamlı değişken ve fonksiyon isimleri kullanılarak kodun okunabilirliği artırılmıştır.
* **Teknik Borç (Technical Debt):** Projemiz statik kod analizinden geçirilmiş olup, teknik borç oranımız hocamızın belirlediği **%5 sınırının altındadır.**
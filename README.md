# Kampüs Film Kulübü

Süleyman Demirel Üniversitesi Film Kulübü için geliştirilmiş web tabanlı dizi arama ve gösterime girecekler uygulaması.

## Özellikler

- 🔍 **Dizi Arama**: TVMaze API kullanarak dizi arama
- 🎬 **Dizi Listeleme**: Kart görünümünde dizi listesi
- 📋 **Gösterime Girecekler**: Seçilen dizileri takip etme
- 🔎 **Filtreleme**: Tür, Dil ve Min Puan filtreleri
- 📄 **Sayfalama**: Her sayfada 6 dizi gösterimi
- 📺 **Detay Sayfası**: Dizi detayları ve bölüm listesi
- ⚡ **Modern UI**: Responsive ve kullanıcı dostu arayüz

## Teknolojiler

- React 18
- React Router DOM
- Axios
- Vite
- CSS3

## Kurulum

1. Projeyi klonlayın veya indirin
2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
3. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```
4. Tarayıcınızda `http://localhost:5173` adresine gidin

## Proje Yapısı

```
src/
├── components/          # React bileşenleri
│   ├── SearchBox.jsx    # Arama kutusu
│   ├── Filters.jsx      # Filtre bileşeni
│   ├── TVCard.jsx       # Dizi kartı
│   ├── TVList.jsx       # Dizi listesi
│   ├── Pagination.jsx   # Sayfalama
│   ├── WatchlistPanel.jsx # Gösterime girecekler paneli
│   ├── ShowDetail.jsx   # Dizi detay sayfası
│   ├── Home.jsx         # Ana sayfa
│   └── Footer.jsx       # Footer bileşeni
├── context/
│   └── AppReducer.js    # useReducer state yönetimi
├── services/
│   └── api.js          # API çağrıları (Axios)
├── utils/
│   └── filters.js      # Filtreleme fonksiyonları
├── App.jsx             # Ana uygulama bileşeni
├── App.css             # Stil dosyası
└── main.jsx            # Giriş noktası
```

## Kullanılan React Kavramları

- ✅ **Axios**: HTTP istekleri için
- ✅ **useEffect**: Asenkron veri yönetimi
- ✅ **useReducer**: Uygulama durumu yönetimi
- ✅ **Composition**: Bileşen yapısı
- ✅ **Conditional Rendering**: Yükleniyor, hata, boş durum gösterimi
- ✅ **Pagination**: Sayfalı listeleme

## API

Bu proje [TVMaze Public API](https://www.tvmaze.com/api) kullanmaktadır.

Kullanılan endpointler:
- `GET /search/shows?q={query}` - Dizi arama
- `GET /shows/{id}` - Dizi detayları
- `GET /shows/{id}/episodes` - Dizi bölümleri

## Lisans

Bu proje eğitim amaçlı geliştirilmiştir.



import { useState } from "react";
import { ShoppingCart, Search, Heart, Plus, TrendingUp, Tag, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export default function Marketplace() {
  const [cartCount, setCartCount] = useState(2);
  const [searchQuery, setSearchQuery] = useState("");
  const lang = (localStorage.getItem("lang") || "ID").toLowerCase() as 'en' | 'id';

  const t = {
    en: {
      title: "Store 🛍️",
      subtitle: "Find the best health products curated for you",
      searchPlaceholder: "Search test kits, vitamins...",
      popularCategories: "Popular Categories",
      testKits: "Test Kits",
      vitamins: "Vitamins",
      hygiene: "Hygiene",
      skincare: "Skincare",
      newArrivals: "New Arrivals",
      addToCart: "Add to Cart",
      buyNow: "Buy Now",
      sold: "sold",
      cartUpdated: "Added to Cart!",
      cartAdded: "has been added to your cart."
    },
    id: {
      title: "Toko 🛍️",
      subtitle: "Temukan produk kesehatan terbaik khusus untuk Anda",
      searchPlaceholder: "Cari alat tes, vitamin...",
      popularCategories: "Kategori Populer",
      testKits: "Alat Tes",
      vitamins: "Vitamin",
      hygiene: "Kebersihan",
      skincare: "Perawatan Kulit",
      newArrivals: "Produk Baru",
      addToCart: "Tambah ke Keranjang",
      buyNow: "Beli Sekarang",
      sold: "terjual",
      cartUpdated: "Ditambahkan ke Keranjang!",
      cartAdded: "telah ditambahkan ke keranjang Anda."
    }
  };

  const currentT = t[lang] || t.id;

  const allProducts = [
    {
      id: 1,
      name: "CERVISCAN™ Dip Test (Smart Kit)",
      category: lang === 'en' ? "Test Kits" : "Alat Tes",
      price: "Rp 150.000",
      rating: "4.9",
      sold: "1.2k",
      img: "https://images.unsplash.com/photo-1606015989047-2ecc98a23ae1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwc3VwcGxlbWVudHN8ZW58MXx8fHwxNzc4NDgxMzI2fDA&ixlib=rb-4.1.0&q=80&w=400",
      isNew: true
    },
    {
      id: 2,
      name: lang === 'en' ? "Women's Daily Multivitamin" : "Multivitamin Harian Wanita",
      category: lang === 'en' ? "Vitamins" : "Vitamin",
      price: "Rp 250.000",
      rating: "4.8",
      sold: "850",
      img: "https://images.unsplash.com/photo-1606015989047-2ecc98a23ae1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwc3VwcGxlbWVudHN8ZW58MXx8fHwxNzc4NDgxMzI2fDA&ixlib=rb-4.1.0&q=80&w=400",
    },
    {
      id: 3,
      name: lang === 'en' ? "Immune Support + Zinc" : "Dukungan Imun + Zinc",
      category: lang === 'en' ? "Vitamins" : "Vitamin",
      price: "Rp 180.000",
      rating: "4.7",
      sold: "530",
      img: "https://images.unsplash.com/photo-1606015989047-2ecc98a23ae1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwc3VwcGxlbWVudHN8ZW58MXx8fHwxNzc4NDgxMzI2fDA&ixlib=rb-4.1.0&q=80&w=400",
    },
    {
      id: 4,
      name: "CERVISCAN™ Premium Bundle",
      category: "Test Kits",
      price: "Rp 350.000",
      rating: "5.0",
      sold: "300",
      img: "https://images.unsplash.com/photo-1606015989047-2ecc98a23ae1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXRhbWluJTIwc3VwcGxlbWVudHN8ZW58MXx8fHwxNzc4NDgxMzI2fDA&ixlib=rb-4.1.0&q=80&w=400",
    }
  ];

  const filteredProducts = allProducts.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (productName: string) => {
    setCartCount(prev => prev + 1);
    toast.success(`${productName} ${currentT.cartAdded}`);
  };

  const handleCategoryClick = (cat: string) => {
    setSearchQuery(cat);
    toast.info(lang === 'en' ? `Filtering by: ${cat}` : `Menyaring berdasarkan: ${cat}`);
  };

  return (
    <div className="flex-1 p-4 md:p-8 lg:p-10 flex flex-col relative max-w-7xl mx-auto w-full">
      <header className="mb-8 flex justify-between items-end">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{currentT.title}</h1>
          <p className="text-gray-500 text-sm md:text-base mt-2 font-medium">{currentT.subtitle}</p>
        </motion.div>
        <motion.button 
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => toast.info(lang === 'en' ? `You have ${cartCount} items in your cart. Proceeding to checkout...` : `Anda memiliki ${cartCount} item di keranjang. Lanjut ke pembayaran...`)}
          className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center shadow-md relative text-gray-700 hover:text-[#D94F8A] transition-colors border border-gray-100"
        >
          <ShoppingCart size={24} />
          {cartCount > 0 && (
            <motion.span 
              initial={{ scale: 0 }} animate={{ scale: 1 }} key={cartCount}
              className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-[#D94F8A] text-white text-[10px] md:text-xs font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm"
            >
              {cartCount}
            </motion.span>
          )}
        </motion.button>
      </header>

      {/* Main Grid for Banner & Search */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        
        {/* Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 w-full h-40 md:h-48 bg-gradient-to-r from-[#D94F8A] to-[#F7A8C4] rounded-[2rem] relative overflow-hidden flex items-center px-6 md:px-10 shadow-lg shadow-pink-200/50"
        >
          <div className="absolute top-[-20px] right-[-20px] w-40 h-40 md:w-48 md:h-48 bg-white/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-[-20px] right-[20%] w-24 h-24 md:w-32 md:h-32 bg-pink-400/30 rounded-full blur-xl"></div>
          <div className="relative z-10 max-w-[85%] md:max-w-[70%]">
            <span className="text-white/90 text-[10px] md:text-sm font-bold tracking-widest uppercase mb-1.5 md:mb-2 flex items-center gap-1 block">
              <Tag size={12} className="md:w-[14px] md:h-[14px]" /> Flash Sale
            </span>
            <h2 className="text-white font-extrabold text-xl md:text-3xl leading-tight mb-3 md:mb-4 drop-shadow-md">{lang === 'en' ? "Get 20% Off" : "Diskon 20%"} <br/>{lang === 'en' ? "Test Kits Today!" : "Alat Tes Hari Ini!"}</h2>
            <button 
              onClick={() => handleCategoryClick(currentT.testKits)}
              className="bg-white text-[#D94F8A] text-xs md:text-sm font-bold px-4 py-2 md:px-6 md:py-2.5 rounded-full hover:bg-pink-50 transition-colors shadow-sm active:scale-95"
            >
              {lang === 'en' ? "Shop Now" : "Beli Sekarang"}
            </button>
          </div>
        </motion.div>

        {/* Search & Categories */}
        <div className="flex flex-col gap-4">
          <div className="relative group flex-1 flex">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#D94F8A] transition-colors" />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 shadow-sm rounded-2xl md:rounded-3xl text-sm focus:border-pink-300 focus:ring-4 focus:ring-pink-100 transition-all outline-none font-medium"
              placeholder={currentT.searchPlaceholder}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3 h-20">
            <button 
              onClick={() => handleCategoryClick(currentT.testKits)}
              className="bg-pink-50 rounded-2xl flex items-center justify-center gap-2 text-[#D94F8A] font-bold text-sm hover:bg-pink-100 transition-colors border border-pink-100"
            >
              <ShieldCheck size={18} /> {currentT.testKits}
            </button>
            <button 
              onClick={() => handleCategoryClick(currentT.vitamins)}
              className="bg-orange-50 rounded-2xl flex items-center justify-center gap-2 text-orange-500 font-bold text-sm hover:bg-orange-100 transition-colors border border-orange-100"
            >
              <TrendingUp size={18} /> {currentT.vitamins}
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          {searchQuery ? (lang === 'en' ? `Search Results for "${searchQuery}"` : `Hasil Pencarian untuk "${searchQuery}"`) : currentT.popularCategories}
        </h3>
        {searchQuery && (
          <button onClick={() => setSearchQuery("")} className="text-[#D94F8A] font-bold text-sm hover:underline">{lang === 'en' ? "Clear Search" : "Hapus Pencarian"}</button>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <Search size={48} className="text-gray-300 mb-4" />
          <p className="font-medium">{lang === 'en' ? "No products found matching your search." : "Tidak ada produk yang cocok dengan pencarian Anda."}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((prod, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
              key={prod.id} 
              className="bg-white rounded-3xl p-4 md:p-5 shadow-sm border border-gray-100 flex flex-col relative group hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {prod.isNew && (
                <span className="absolute top-4 left-4 z-10 bg-indigo-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm">New</span>
              )}
              <button 
                onClick={() => toast.success(lang === 'en' ? `${prod.name} added to your wishlist!` : `${prod.name} ditambahkan ke daftar keinginan Anda!`)}
                className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white shadow-sm transition-all"
              >
                <Heart size={18} />
              </button>
              
              <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gray-50 mb-4 relative p-4 flex items-center justify-center">
                <img src={prod.img} alt={prod.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
              </div>
              
              <div className="flex-1 flex flex-col">
                <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider font-extrabold mb-1.5">{prod.category}</p>
                <h4 className="font-bold text-gray-900 text-sm md:text-base leading-snug mb-3 group-hover:text-[#D94F8A] transition-colors line-clamp-2">{prod.name}</h4>
                
                <div className="mt-auto">
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-md border border-yellow-100">
                      <span className="text-yellow-500 text-[10px]">★</span>
                      <span className="text-xs font-bold text-yellow-700">{prod.rating}</span>
                    </div>
                    <span className="text-xs text-gray-400 font-semibold">{prod.sold} {currentT.sold}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <span className="font-extrabold text-[#D94F8A] text-base md:text-lg">{prod.price}</span>
                    <motion.button 
                      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                      onClick={() => handleAddToCart(prod.name)}
                      className="w-9 h-9 md:w-11 md:h-11 bg-gradient-to-br from-[#F7A8C4] to-[#D94F8A] text-white rounded-xl flex items-center justify-center shadow-md shadow-pink-200/50"
                    >
                      <Plus size={20} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

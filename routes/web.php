<?php

use App\Http\Controllers\Admin\AnnouncementController;
use App\Http\Controllers\Admin\CarouselController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\NewsController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\VerifyUMKMController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SuperAdmin\AccountController;
use App\Http\Controllers\UMKM\ProductUMKMController;
use App\Http\Controllers\UMKM\ProfileUMKMController;
use App\Http\Controllers\UMKM\RegisterUMKMController;
use App\Models\Announcement;
use App\Models\Carousel;
use App\Models\News;
use App\Models\PelakuUMKM;
use App\Models\ProductUMKM;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// GUEST
Route::get('/', function () {
    $listAllProdukUMKM = ProductUMKM::with('pelakuUmkm')->latest()->get();
    $listBerita = News::with('author')->latest()->get();
    $listPengumuman = Announcement::with('author')->latest()->get();
    $listCarousel = Carousel::active()->ordered()->get();

    // PRODUK UMKM
    $kategori = $_GET['kategori'] ?? '';
    $queryBuilder = ProductUMKM::with('pelakuUmkm')
        ->where('kategori', 'like', '%' . $kategori . '%');
    $paginator = $queryBuilder->latest()->paginate(15);


    return Inertia::render('Landing/Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'listProdukUMKM' => $paginator,
        'listAllProdukUMKM' => $listAllProdukUMKM,
        'listBerita' => $listBerita,
        'listPengumuman' => $listPengumuman,
        'listCarousel' => $listCarousel,
        'queryKategori' => $kategori,
    ]);
})->name('home');

// DETAIL
Route::get("/product/{slug}", [ProductUMKMController::class, 'detail'])->name('productUMKM.detail');
Route::get("/store/{id}", [ProductUMKMController::class, 'storeProfile'])->name('store.profile');
Route::get("/news/{slug}", [NewsController::class, 'detail'])->name('news.detail');
Route::get("/announcement/{id}", [AnnouncementController::class, 'detail'])->name('announcement.detail');

// FINDING
Route::get('/finding/products', [ProductUMKMController::class, 'find'])->name("productUMKM.find");
Route::get('/finding/gallery', [GalleryController::class, 'find'])->name("gallery.find");


// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    // profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // UMKM product actions (like & save)
    Route::post('/umkm/products/{id}/like', [ProductUMKMController::class, 'toggleLike'])->name('umkm.products.like');
    Route::post('/umkm/products/{id}/save', [ProductUMKMController::class, 'toggleSave'])->name('umkm.products.save');
});

Route::middleware('guest')->group(function () {
    // UMKM
    Route::get("/register/umkm", [RegisterUMKMController::class, 'create'])->name("registerUMKM.create");
    Route::post("/register/umkm/store", [RegisterUMKMController::class, 'store'])->name("registerUMKM.store");
    Route::get("/register/umkm/waiting", [RegisterUMKMController::class, 'waiting'])->name("registerUMKM.waiting");
});

// SUPERADMIN
Route::middleware(['user.role:superAdmin'])->group(function () {
    Route::get('/super-admin/dashboard', function () {
        return Inertia::render('SuperAdmin/Dashboard');
    })->name('superAdmin.dashboard');
    Route::get('/super-admin/accounts-management', [AccountController::class, 'show'])->name('accountManagement.show');
    Route::post('/super-admin/accounts-management/store', [AccountController::class, 'store'])->name('accountManagement.store');
    Route::post('/super-admin/accounts-management/update/{id}', [AccountController::class, 'update'])->name('accountManagement.update');
    Route::post('/super-admin/accounts-management/delete/{id}', [AccountController::class, 'delete'])->name('accountManagement.delete');
});

// ADMIN
Route::middleware(['user.role:admin'])->group(function () {
    Route::get('/admin/dashboard', function () {
        $totalProducts = count(ProductUMKM::all());
        $totalPelakuUMKM = count(PelakuUMKM::all());

        return Inertia::render('Admin/Dashboard', [
            'totalProducts' => $totalProducts,
            'totalPelakuUMKM' => $totalPelakuUMKM
        ]);
    })->name('admin.dashboard');
    Route::get('/admin/verify-umkm', [VerifyUMKMController::class, 'show'])->name('verifyUMKM.show');
    Route::post('/admin/verify-umkm/update/{userId}', [VerifyUMKMController::class, 'update'])->name('verifyUMKM.update');

    Route::get('/admin/news-management', [NewsController::class, 'show'])->name('news.show');
    Route::post('/admin/news-management/store', [NewsController::class, 'store'])->name('news.store');
    Route::post('/admin/news-management/update/{id}', [NewsController::class, 'update'])->name('news.update');
    Route::post('/admin/news-management/delete/{id}', [NewsController::class, 'delete'])->name('news.delete');

    Route::get('/admin/announcements-management', [AnnouncementController::class, 'show'])->name('announcement.show');
    Route::post('/admin/announcements-management/store', [AnnouncementController::class, 'store'])->name('announcement.store');
    Route::post('/admin/announcements-management/update/{id}', [AnnouncementController::class, 'update'])->name('announcement.update');
    Route::post('/admin/announcements-management/delete/{id}', [AnnouncementController::class, 'delete'])->name('announcement.delete');

    Route::get('/admin/products-management', [ProductController::class, 'show'])->name('product.show');
    Route::post('/admin/products-management/store', [ProductController::class, 'store'])->name('product.store');
    Route::post('/admin/products-management/update/{id}', [ProductController::class, 'update'])->name('product.update');
    Route::post('/admin/products-management/delete/{id}', [ProductController::class, 'delete'])->name('product.delete');

    Route::get('/admin/gallery-management', [GalleryController::class, 'show'])->name('gallery.show');
    Route::post('/admin/gallery-management/store', [GalleryController::class, 'store'])->name('gallery.store');
    Route::post('/admin/gallery-management/update/{id}', [GalleryController::class, 'update'])->name('gallery.update');
    Route::post('/admin/gallery-management/delete/{id}', [GalleryController::class, 'delete'])->name('gallery.delete');

    // Carousel Management
    Route::get('/admin/carousel-management', [CarouselController::class, 'index'])->name('carousel.index');
    Route::post('/admin/carousel-management/store', [CarouselController::class, 'store'])->name('carousel.store');
    Route::post('/admin/carousel-management/update/{id}', [CarouselController::class, 'update'])->name('carousel.update');
    Route::post('/admin/carousel-management/delete/{id}', [CarouselController::class, 'delete'])->name('carousel.delete');
    Route::post('/admin/carousel-management/toggle/{id}', [CarouselController::class, 'toggleActive'])->name('carousel.toggle');

    Route::post('/admin/pelaku-umkm/update', [ProfileUMKMController::class, 'update'])->name('pelakuUMKM.update');
    Route::get('/admin/pelaku-umkm/export', [AccountController::class, 'export'])->name('pelakuUMKM.export');
    Route::get('/admin/pelaku-umkm/import', [AccountController::class, 'import'])->name('pelakuUMKM.import');
});

// UMKMADMIN
Route::middleware(['user.role:umkmAdmin'])->group(function () {
    Route::get('/umkm-admin/dashboard', function () {
        $profileUMKM = PelakuUMKM::where('user_id', auth()->user()->id)->first();
        $productsUMKM = ProductUMKM::where('pelaku_umkm_id', $profileUMKM->id)->get();
        $productCounts = count($productsUMKM);
        $uniqueCategories = $productsUMKM->pluck('kategori')->unique();
        $categoryCounts = $uniqueCategories->count();

        return Inertia::render('UMKMAdmin/Dashboard', [
            'profileUMKM' => $profileUMKM,
            'productCounts' => $productCounts,
            'categoryCounts' => $categoryCounts
        ]);
    })->name('umkmAdmin.dashboard');
    Route::get('/umkm-admin/products-management', [ProductUMKMController::class, 'show'])->name('productUMKM.show');
    Route::post('/umkm-admin/products-management/store', [ProductUMKMController::class, 'store'])->name('productUMKM.store');
    Route::post('/umkm-admin/products-management/update/{id}', [ProductUMKMController::class, 'update'])->name('productUMKM.update');
    Route::post('/umkm-admin/products-management/delete/{id}', [ProductUMKMController::class, 'delete'])->name('productUMKM.delete');

    Route::get('/umkm-admin/likes', [ProductUMKMController::class, 'likes'])->name('productUMKM.likes');
    Route::get('/umkm-admin/saved', [ProductUMKMController::class, 'saved'])->name('productUMKM.saved');

    Route::post('/umkm-admin/profile-umkm/update', [ProfileUMKMController::class, 'update'])->name('profileUMKM.update');
});

require __DIR__ . '/auth.php';

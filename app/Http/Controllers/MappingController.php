<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UMKM\Umkm;
use App\Models\UMKM\UmkmLocation; // Pake model yang udah ada!
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class MappingController extends Controller
{
    public function index()
    {
        $userId = Auth::id();
        $umkm = Umkm::query()->where('user_id', $userId)->first();

        if (!$umkm) {
            return redirect()->back()->with('error', 'Data UMKM tidak ditemukan.');
        }

        // THE GOLDEN QUERY: Ambil titik unik & jumlah mangkal
        $routeNodes = UmkmLocation::selectRaw('latitude, longitude, COUNT(*) as total_mangkal, MIN(created_at) as first_visit')
            ->where('umkm_id', $umkm->id)
            ->where('status', 'MANGKAL')
            ->groupBy('latitude', 'longitude')
            ->orderBy('first_visit', 'asc')
            ->get();

        // Lempar data ke halaman React/Inertia
        // Sesuaikan path 'UMKM/MapPoint' dengan struktur folder Pages lu
        return Inertia::render('umkm/map-point', [
            'routeNodes' => $routeNodes
        ]);
    }
}

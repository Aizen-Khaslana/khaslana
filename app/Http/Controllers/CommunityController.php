<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\Post\Post;
use Exception;

class CommunityController extends Controller
{
    public function index() {
        $posts = Post::with(['user', 'postImages', 'postLikes'])
            ->latest()
            ->get();

        return Inertia::render('user/community/index', [
            'posts' => $posts,
        ]);
    }

    public function show(Post $post) {
        $post->loadMissing([
            'user',
            'postImages',
            'postLikes',
            'comments.user',
        ]);

        return Inertia::render('user/community/show', [
            'post' => $post,
        ]);
    }

    public function create() {
        return Inertia::render('user/community/create');
    }

    public function store(Request $request) {
        $request->validate([
            'content'       => 'required',
            'umkm_id'       => 'nullable|exists:umkms,id',
            'product_id'    => 'nullable|exists:products,id',
            'images'        => 'nullable|array',
            'images.*'      => 'image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        DB::beginTransaction();

        try {
            $post = Post::create([
                'user_id'       => Auth::id(),
                'umkm_id'       => $request->umkm_id,
                'product_id'    => $request->product_id,
                'content'       => $request->content,
                'post_date'     => now(),
            ]);

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $imageFile) {
                    if ($imageFile->isValid()) {
                        $path = $imageFile->store('posts/images', 'public');

                        $post->postImages()->create([
                            'image' => $path,
                        ]);
                    }
                }
            }

            DB::commit();

            return redirect()->route('community')->with('message', 'Post berhasil dibagikan!');
        } catch (Exception $e) {
            DB::rollBack();

            return redirect()->back()->withErrors(['error' => 'Gagal membuat postingan: ' . $e->getMessage()]);
        }
    }
}

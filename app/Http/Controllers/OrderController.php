<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product\Product;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index(Request $request, Product $product_id) {
        $product = Product::findOrFail($product_id);

        $variantId = $request->query('variant_id');
        $quantity = (int) $request->query('quantity', 1);
        return Inertia::render('user/order/index');
    }
    
    public function dialogStore($product_id) {
        
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Favorite;

class FavoriteController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  Int $review_id
     * @return array<string, string>
     */
    public function attach(Int $review_id)
    {
        $favorite = new Favorite;
        $loginUser = auth()->user();
        $is_favorite = $favorite->isFavorite($loginUser->id, $review_id);

        if (!$is_favorite) {
            $favorite->storeFavorite($loginUser->id, $review_id);
            return ['status' => 'success'];
        }
        return ['status' => 'error'];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $review_id
     * @return array<string, string>
     */
    public function detach(Int $review_id)
    {
        $favorite = new Favorite;
        $loginUser = auth()->user();
        $is_favorite = $favorite->isFavorite($loginUser->id, $review_id);
        $favorite_id = $favorite->where('user_id', $loginUser->id)->where('review_id', $review_id)->value('id');

        if ($is_favorite) {
            $favorite->destroyFavorite($favorite_id);
            return ['status' => 'success'];
        }
        return ['status' => 'error'];
    }
}

<?php

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Review;
use App\Models\Favorite;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'auth'], function() {

    Route::get('/reviews',function (Request $request, Review $review, User $user) {

        $timelines = Review::with('user')->with('comments')->with('favorites')->orderBy('created_at', 'DESC')->get();
        $populars = Review::withCount('favorites')->with('comments')->with('favorites')->with('user')->orderBy('favorites_count', 'DESC')->get();
        $loginUser = auth()->user();

        return response()->json(
            [
            'timelines' => $timelines,
            'populars' => $populars,
            'loginUser' => $loginUser
            ]);
    });

    Route::resource('favorites', 'Api/FavoritesController', ['only' => ['store', 'destroy']]);


    // Route::delete('reviews/{id}',function(Review $review){

    //     $review = App\Review::find($review->id);
    //     dd($review);
    //     $review->delete();

    //     return response()->json([
    //         'success' => '投稿を削除しました'
    //     ]);
    // });
});

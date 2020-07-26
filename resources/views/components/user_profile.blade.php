<div class="col-md-8 mb-3">
    <div class="card">
        <div class="d-inline-flex">
            <div class="p-3 d-flex flex-column">
                @include('components/user_image')
            <div class="mt-3 d-flex flex-column">
                    <h4 class="mb-0 font-weight-bold">{{ $user->name }}</h4>
                    <span class="text-secondary">{{ $user->screen_name }}</span>
                </div>
            </div>
            <div class="p-3 d-flex flex-column justify-content-between">
                <div class="d-flex">
                    <div class="d-flex">
                        @if($user == $login_user) {{-- プロフィール編集/ユーザー削除 --}}
                            <a href="{{ url('users/' .$login_user->id .'/edit') }}" class="btn btn-primary">プロフィールを編集する</a>
                            <form method="POST" action="{{ route('users.destroy', $login_user->id) }}">
                                @csrf
                                @method('DELETE')

                                <button type="submit" class="btn btn-danger ml-3">
                                    {{ __('アカウント削除') }}
                                </button>
                            </form>
                        @else {{-- フォロー/アンフォロー --}}
                            @if ($is_following)
                            <form action="{{ route('unfollow', $user->id) }}" method="POST">
                                @csrf
                                @method('DELETE')

                                <button type="submit" class="btn btn-danger shadow-sm">フォロー中</button>
                            </form>
                            @else
                            <form action="{{ route('follow', $user->id) }}" method="POST">
                                @csrf
                                <button type="submit" class="btn btn-primary shadow-sm">フォローする</button>
                            </form>
                            @endif

                            @if ($is_followed)
                            <span class="mt-2 px-1 bg-secondary text-light">フォローされています</span>
                            @endif
                        @endif
                    </div>
                </div>
                <div class="d-flex">
                    <p>{{ $user->description }}</p>
                </div>
                <div class="d-flex justify-content-end">
                    <div class="p-2 d-flex flex-column align-items-center">
                        <p class="font-weight-bold">レビュー数</p>
                        <span>{{ $review_count }}</span>
                    </div>
                    <div class="p-2 d-flex flex-column align-items-center">
                        <p class="font-weight-bold">フォロー数</p>
                        <a href="{{ url('/users/' .$user->id .'/following') }}">{{ $follow_count }}</a>
                    </div>
                    <div class="p-2 d-flex flex-column align-items-center">
                        <p class="font-weight-bold">フォロワー数</p>
                        <span>{{ $follower_count }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

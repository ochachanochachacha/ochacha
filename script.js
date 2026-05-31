/* ================================================================
   美容パック紹介サイト - JavaScriptスクリプト
   
   このファイルは、ウェブサイトのインタラクティブな機能を定義しています。
   例えば、ボタンをクリックしたときの動作、フォーム送信など。
   
   初心者向けに詳しくコメントを入れているので、
   各機能の意味を理解しながら読んでください。
   ================================================================ */

/* ================================================
   スムーススクロール機能
   
   ページ内のリンクをクリックしたときに、
   その場所まで滑らかにスクロールする機能です
   ================================================ */

/**
 * smoothScroll 関数
 * @param {string} targetId - スクロール先のセクション ID（例：'#products'）
 * 
 * 使い方：
 * <button onclick="smoothScroll('#products')">商品を見る</button>
 */
function smoothScroll(targetId) {
    // targetId で指定された要素を DOM から取得
    // document.querySelector() は CSS セレクタで要素を検索します
    const targetElement = document.querySelector(targetId);
    
    // 要素が実際に存在するか確認
    // （存在しない場合はエラーを防ぐため）
    if (targetElement) {
        // その要素までスクロール
        // behavior: 'smooth' により、滑らかなアニメーション付きでスクロール
        targetElement.scrollIntoView({
            behavior: 'smooth'  // 'smooth' = 滑らかなスクロール、'auto' = 即座にスクロール
        });
    }
}

/* ================================================
   商品詳細表示機能
   
   「詳しく見る」ボタンをクリックしたときに、
   商品の詳細情報をポップアップで表示する機能です
   ================================================ */

/**
 * handleProductClick 関数
 * @param {string} productName - 商品の名前
 * 
 * 使い方：
 * <button onclick="handleProductClick('保湿パック')">詳しく見る</button>
 */
function handleProductClick(productName) {
    // alert() は、ユーザーに通知をポップアップで表示します
    // \n は改行を意味します
    alert(
        '【' + productName + '】の詳細ページへ移動します\n\n' +
        '※このサイトはデモンストレーション目的で作成されています。\n' +
        '実際の販売ページについては、ストアをご確認ください。'
    );
    
    // console.log() は、ブラウザの開発者ツール（F12 キーで開く）に
    // メッセージを出力します。デバッグ（バグ修正）に便利です
    console.log('クリック：' + productName);
}

/* ================================================
   フォーム送信処理
   
   「送信する」ボタンをクリックしたときに、
   入力されたデータをチェックして処理する機能です
   ================================================ */

/**
 * handleFormSubmit 関数
 * @param {Event} event - フォーム送信イベント
 * 
 * 使い方：
 * <form onsubmit="handleFormSubmit(event)">...</form>
 */
function handleFormSubmit(event) {
    // event.preventDefault() は、フォームのデフォルト動作（ページ再読み込み）をキャンセル
    // これにより、ページを再読み込みせずにデータを処理できます
    event.preventDefault();
    
    // 各入力フィールドから値を取得
    // document.getElementById() は、id 属性で指定された要素を取得します
    // .value は、その要素に入力されたテキストを取得します
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // コンソールに入力内容を出力（デバッグ用）
    console.log('フォーム入力内容:', { name, email, message });
    
    /* ========== バリデーション（入力値の確認） ========== */
    
    // 1. 空白チェック：すべてのフィールドが入力されているか確認
    // if (!name || !email || !message) は
    // 「name が空でない かつ email が空でない かつ message が空でない」という意味の逆です
    if (!name || !email || !message) {
        // いずれかが空の場合、エラーメッセージを表示
        showFormMessage('すべての項目を入力してください。', 'error');
        // 処理を中止
        return;
    }
    
    // 2. メールアドレスの形式チェック
    // 正規表現を使ってメールアドレスが正しい形式か判定します
    // 正規表現は「ある文字列のパターンが存在するかどうか」を判定します
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // .test() は、正規表現にマッチするかどうかを true/false で返します
    
    if (!emailPattern.test(email)) {
        // メールアドレスの形式が正しくない場合
        showFormMessage('正しいメールアドレスを入力してください。', 'error');
        // 処理を中止
        return;
    }
    
    /* ========== バリデーション完了 ========== */
    
    // すべてのチェックが通った場合、成功メッセージを表示
    showFormMessage(
        '✓ ご送信ありがとうございます！\n' +
        '近日中にご連絡させていただきます。',
        'success'
    );
    
    // コンソールに成功ログを出力
    console.log('フォーム送信成功:', { name, email, message });
    
    // フォームをリセット（すべての入力をクリア）
    // .reset() は、フォーム内のすべての入力をクリアします
    document.querySelector('.contact-form').reset();
}

/* ================================================
   フォームメッセージ表示機能
   
   フォーム送信後のメッセージを画面に表示する機能です
   ================================================ */

/**
 * showFormMessage 関数
 * @param {string} message - 表示するメッセージ
 * @param {string} type - メッセージのタイプ（'success' = 成功、'error' = エラー）
 */
function showFormMessage(message, type) {
    // メッセージを表示する要素を取得
    // getElementById() は、id 属性 'formMessage' の要素を取得します
    const formMessage = document.getElementById('formMessage');
    
    // メッセージのテキストを設定
    // .textContent は、要素の中身のテキストを設定します
    formMessage.textContent = message;
    
    // メッセージのスタイルクラスを設定
    // className で CSS のクラスを設定します
    // これにより、CSS で定義した色や装飾が自動的に適用されます
    // 例：.form-message.success（背景が緑色）
    formMessage.className = 'form-message ' + type;
    
    // 5 秒後にメッセージを非表示にする
    // setTimeout() は、指定ミリ秒後に関数を実行します
    setTimeout(function() {
        // 5 秒後にクラスを削除（CSS で display: none になる）
        formMessage.className = 'form-message';
    }, 5000);  // 5000 ミリ秒 = 5 秒
}

/* ================================================
   ページロード時の処理
   
   ページが完全に読み込まれたときに実行される処理です
   ================================================ */

// DOMContentLoaded イベント：ページが読み込まれたときに発動
// これにより、ページ内のすべての要素にアクセスできます
document.addEventListener('DOMContentLoaded', function() {
    // コンソールにログを出力
    console.log('ページが読み込まれました');
    
    /* ========== スクロール連動アニメーション ========== */
    
    // Intersection Observer：ページをスクロールしながら、
    // 画面に入ってきた要素を自動的に検出する機能です
    const observer = new IntersectionObserver(function(entries) {
        // entries は、画面に入ってきた要素のリスト
        
        // forEach() で、リスト内のすべての要素に対して処理を実行
        entries.forEach(function(entry) {
            // 要素が画面に入ってきたか確認
            if (entry.isIntersecting) {
                // アニメーション（fadeInUp）を適用
                // style.animation で CSS のアニメーションを指定
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                
                // この要素の監視をやめる
                // これにより、アニメーションが 1 回だけ実行されます
                observer.unobserve(entry.target);
            }
        });
    });
    
    // 商品カード、ステップ、効果アイテムを監視対象に追加
    // querySelectorAll() は複数の要素を一度に取得します
    // .forEach() で、取得した要素すべてに対して処理を実行
    document.querySelectorAll('.product-card, .step-item, .benefit-item').forEach(function(element) {
        // opacity: 0 で透明にして初期化
        // （スクロールして見えるようになると、アニメーションで表示されます）
        element.style.opacity = '0';
        // 監視対象に追加
        observer.observe(element);
    });
    
    /* ========== ナビゲーションリンクのスムーススクロール ========== */
    
    // すべての # で始まるリンク（ページ内リンク）を取得
    // CSS セレクタ a[href^="#"] は「href 属性が # で始まる a タグ」を選択
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        // 各リンクにクリックイベントリスナーを追加
        // addEventListener() は「イベント発生時に実行する処理」を登録します
        anchor.addEventListener('click', function(event) {
            // デフォルト動作（ページジャンプ）をキャンセル
            event.preventDefault();
            
            // クリックされたリンクの href 属性値を取得
            // getAttribute() は、指定の属性値を取得します
            const targetId = this.getAttribute('href');
            
            // スムーススクロール関数を実行
            smoothScroll(targetId);
        });
    });
    
    /* ========== 商品ボタンのクリック処理 ========== */
    
    // すべての「詳しく見る」ボタンにクリックイベントリスナーを追加
    document.querySelectorAll('.product-btn').forEach(function(button) {
        button.addEventListener('click', function() {
            // クリックしたボタンのテキストをコンソールに出力
            console.log('ボタンクリック');
        });
    });
});

/* ================================================
   スクロール位置を記録（オプション）
   
   ページをスクロールした位置を監視する機能です
   ================================================ */

// scroll イベント：ページをスクロールするたびに発動
window.addEventListener('scroll', function() {
    // 現在のスクロール位置を取得
    // window.scrollY は、ページの上端からのスクロール距離（px）
    const scrollPosition = window.scrollY;
    
    // 必要に応じてスクロール位置を使用
    // 例：固定ナビゲーションの表示・非表示の切り替え
    
    /* 
    // ここにコードを書くことで、スクロール位置に応じた処理ができます
    if (scrollPosition > 100) {
        // スクロール距離が 100px を超えた場合の処理
    }
    */
});

/* ================================================
   ウィンドウサイズ変更時の処理
   
   ブラウザのサイズが変わったときに実行される処理です
   ================================================ */

// resize イベント：ブラウザのサイズが変わるたびに発動
window.addEventListener('resize', function() {
    // ウィンドウの幅を取得
    // window.innerWidth は、ブラウザウィンドウの幅（px）
    const windowWidth = window.innerWidth;
    
    // 必要に応じてウィンドウサイズに応じた処理ができます
    // 例：スマートフォン（768px 以下）とパソコンで異なる処理
    
    /* 
    if (windowWidth <= 768) {
        console.log('スマートフォンサイズです');
        // スマートフォン用の処理
    } else {
        console.log('パソコンサイズです');
        // パソコン用の処理
    }
    */
});
